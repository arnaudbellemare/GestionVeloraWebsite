import { Matrix4, PerspectiveCamera, Vector3, WebGPUCoordinateSystem } from "three";
import { useCallback, useEffect, useRef, useState } from "react";
import { buildVoxelInstances } from "../qrTree/qrTreeGeometry";
import { qrTextToBooleanGrid } from "../qrTree/qrTreeMatrix";
import { QR_TREE_SHADER, QR_TREE_UNIFORM_BYTE_LENGTH } from "../qrTree/qrTreeShaders";

type Props = {
  url: string;
  /** `2d` = flat scannable QR; `3d` = tree morphs toward 2D as the camera tilts toward top-down. */
  viewMode: "2d" | "3d";
  season?: number;
  className?: string;
  /** Tap canvas to force flat QR (footer). */
  onTapToScan?: () => void;
};

/** Match reference scene: bright off-white void (not charcoal). */
const CLEAR: GPUColor = { r: 0.94, g: 0.95, b: 0.96, a: 1 };

function getGpu(): GPU | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { gpu?: GPU }).gpu;
}

/** Smooth 0–1 for shader morph; eases the transition. */
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function QrTreeWebgpu({
  url,
  viewMode,
  season = 0,
  className = "",
  onTapToScan,
}: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewModeRef = useRef(viewMode);
  viewModeRef.current = viewMode;
  const seasonRef = useRef(season);
  seasonRef.current = season;
  const gpuSupported = typeof window !== "undefined" && Boolean(getGpu());
  const [gpuInitFailed, setGpuInitFailed] = useState(false);

  useEffect(() => {
    if (!gpuSupported || !canvasRef.current || !containerRef.current) return;

    let cancelled = false;
    setGpuInitFailed(false);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const gpu = getGpu()!;
    let animationId = 0;
    let dispose: (() => void) | undefined;
    let pendingDevice: GPUDevice | null = null;
    let bootOuter = 0;
    let bootInner = 0;

    const grid = qrTextToBooleanGrid(url);
    const { instances, instanceCount, gridSize } = buildVoxelInstances(grid);

    /** 256-byte scratch: WGSL uniform binding + zero padding (some drivers are picky). */
    const uniformScratch = new Uint8Array(QR_TREE_UNIFORM_BYTE_LENGTH);
    /** viewProj(16) + gridSize,time,season,progress(4) — rest zero-padded to 256 B. */
    const uniformData = new Float32Array(
      uniformScratch.buffer,
      uniformScratch.byteOffset,
      64
    );
    /** Projection-only camera (never positioned — orbit cam supplies the view matrix). */
    const persp = new PerspectiveCamera(45, 1, 0.08, 50);
    persp.up.set(0, 1, 0);
    /** Raw WebGPU expects NDC z in [0,1]; Three defaults to WebGL [-1,1]. */
    persp.coordinateSystem = WebGPUCoordinateSystem;
    persp.updateProjectionMatrix();

    /**
     * Must be a Camera subclass: only Camera.updateMatrixWorld() maintains matrixWorldInverse.
     * Object3D + matrixWorld.invert() missed that path and broke the view on some setups.
     */
    const orbitCam = new PerspectiveCamera(45, 1, 0.08, 50);
    orbitCam.up.set(0, 1, 0);
    orbitCam.coordinateSystem = WebGPUCoordinateSystem;
    orbitCam.updateProjectionMatrix();

    const eye = new Vector3();
    /** Filled each frame: 3D needs a higher Y (tree mass); flat QR sits on the slab ~BLOCK/2. */
    const lookTarget = new Vector3();
    const viewMatrix = new Matrix4();
    const viewProj = new Matrix4();

    const runInit = async () => {
      const adapter = await gpu.requestAdapter({ powerPreference: "high-performance" });
      if (!adapter) {
        if (!cancelled) setGpuInitFailed(true);
        return;
      }
      if (cancelled) return;
      const device = await adapter.requestDevice();
      pendingDevice = device;
      device.lost.then((info) => {
        if (import.meta.env.DEV) {
          console.warn("[QrTreeWebgpu] GPU device lost:", info.message);
        }
      });
      if (cancelled) {
        device.destroy();
        pendingDevice = null;
        return;
      }

      const ctx = canvas.getContext("webgpu") as GPUCanvasContext | null;
      if (!ctx) {
        if (!cancelled) setGpuInitFailed(true);
        device.destroy();
        pendingDevice = null;
        return;
      }

      const format = gpu.getPreferredCanvasFormat();

      const shaderModule = device.createShaderModule({ label: "qr-tree", code: QR_TREE_SHADER });
      if (import.meta.env.DEV) {
        const info = await shaderModule.getCompilationInfo();
        for (const m of info.messages) {
          if (m.type === "error") {
            console.error("[QrTreeWebgpu] WGSL:", m.message, m.lineNum);
          }
        }
      }

      const bindGroupLayout = device.createBindGroupLayout({
        label: "qr-tree-bgl",
        entries: [
          {
            binding: 0,
            visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
            buffer: { type: "uniform" },
          },
          {
            binding: 1,
            visibility: GPUShaderStage.VERTEX,
            buffer: { type: "read-only-storage" },
          },
        ],
      });

      const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout],
      });

      let pipeline: GPURenderPipeline;
      try {
        pipeline = device.createRenderPipeline({
          label: "qr-tree-pipeline",
          layout: pipelineLayout,
          vertex: {
            module: shaderModule,
            entryPoint: "vs_main",
          },
          fragment: {
            module: shaderModule,
            entryPoint: "fs_main",
            targets: [{ format }],
          },
          primitive: { topology: "triangle-list", cullMode: "none" },
          depthStencil: {
            depthWriteEnabled: true,
            depthCompare: "less",
            format: "depth24plus",
          },
        });
      } catch (e) {
        if (import.meta.env.DEV) console.error("[QrTreeWebgpu] createRenderPipeline failed", e);
        if (!cancelled) setGpuInitFailed(true);
        device.destroy();
        pendingDevice = null;
        return;
      }

      const instanceBuffer = device.createBuffer({
        label: "qr-tree-instances",
        size: Math.max(instances.byteLength, 16),
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      });
      device.queue.writeBuffer(instanceBuffer, 0, instances);

      const uniformBuffer = device.createBuffer({
        label: "qr-tree-uniforms",
        size: QR_TREE_UNIFORM_BYTE_LENGTH,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      const bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [
          { binding: 0, resource: { buffer: uniformBuffer } },
          { binding: 1, resource: { buffer: instanceBuffer } },
        ],
      });

      let depthTexture: GPUTexture | null = null;
      let depthView: GPUTextureView | null = null;

      const ensureDepth = (w: number, h: number) => {
        depthTexture?.destroy();
        depthTexture = device.createTexture({
          size: [w, h],
          format: "depth24plus",
          usage: GPUTextureUsage.RENDER_ATTACHMENT,
        });
        depthView = depthTexture.createView();
      };

      const resize = () => {
        const rect = container.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(
          1,
          Math.floor(rect.height),
          Math.floor((rect.width * 11) / 10)
        );
        const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.configure({
          device,
          format,
          alphaMode: "opaque",
        });
        ensureDepth(canvas.width, canvas.height);
        const aspect = canvas.width / canvas.height;
        persp.aspect = aspect;
        persp.updateProjectionMatrix();
      };

      const ro = new ResizeObserver(resize);
      ro.observe(container);
      resize();

      let frameCancelled = false;
      const t0 = performance.now();
      let progressLinear = viewModeRef.current === "2d" ? 1 : 0;
      let lastFrameTime = performance.now();

      const frame = () => {
        if (frameCancelled || cancelled) return;
        const now = performance.now();
        const dt = Math.min(0.1, (now - lastFrameTime) / 1000);
        lastFrameTime = now;
        const t = (now - t0) / 1000;

        const targetProgress = viewModeRef.current === "2d" ? 1 : 0;
        progressLinear += (targetProgress - progressLinear) * Math.min(1, dt * 10);
        if (Math.abs(targetProgress - progressLinear) < 0.0015) {
          progressLinear = targetProgress;
        }
        const progressForShader = easeInOutCubic(progressLinear);

        persp.updateProjectionMatrix();
        const p = progressForShader;
        // Single target — lerping Y during morph made the whole frame slide and feel like “spin”.
        lookTarget.set(0, 0.1, 0);
        // Keep azimuth fixed for the whole morph. If angleY eased toward 0 with progress, the camera
        // would spin horizontally while tilting — the flat QR looks “mirrored” / flipped vs 3D.
        const AZIMUTH = 0.78;
        const angleY = AZIMUTH;
        const angleX = (1 - p) * -0.55 + p * -1.5708;
        const dist = 1.35;
        const cp = Math.cos(angleX);
        const sp = Math.sin(angleX);
        const cy = Math.cos(angleY);
        const sy = Math.sin(angleY);
        eye.set(
          lookTarget.x + dist * cp * sy,
          lookTarget.y - dist * sp,
          lookTarget.z + dist * cp * cy
        );
        orbitCam.position.copy(eye);
        // Don’t lerp up over p — that slowly rolls the camera (reads as spin). Snap +Z only when
        // nearly top-down so lookAt stays stable; Y-up for the oblique 3D view.
        if (p > 0.88) {
          orbitCam.up.set(0, 0, 1);
        } else {
          orbitCam.up.set(0, 1, 0);
        }
        orbitCam.lookAt(lookTarget);
        orbitCam.updateMatrixWorld(true);
        viewMatrix.copy(orbitCam.matrixWorldInverse);
        viewProj.multiplyMatrices(persp.projectionMatrix, viewMatrix);

        uniformScratch.fill(0);
        viewProj.toArray(uniformData.subarray(0, 16));
        uniformData[16] = gridSize;
        uniformData[17] = t;
        uniformData[18] = seasonRef.current;
        uniformData[19] = progressForShader;
        device.queue.writeBuffer(uniformBuffer, 0, uniformScratch);

        const encoder = device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
          colorAttachments: [
            {
              view: ctx.getCurrentTexture().createView(),
              clearValue: CLEAR,
              loadOp: "clear",
              storeOp: "store",
            },
          ],
          depthStencilAttachment: {
            view: depthView!,
            depthClearValue: 1,
            depthLoadOp: "clear",
            depthStoreOp: "store",
          },
        });
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindGroup);
        if (instanceCount > 0) {
          pass.draw(36, instanceCount, 0, 0);
        }
        pass.end();
        device.queue.submit([encoder.finish()]);
        animationId = requestAnimationFrame(frame);
      };

      animationId = requestAnimationFrame(frame);

      dispose = () => {
        frameCancelled = true;
        cancelAnimationFrame(animationId);
        ro.disconnect();
        depthTexture?.destroy();
        pendingDevice = null;
        device.destroy();
      };

      if (cancelled) dispose();
    };

    bootOuter = requestAnimationFrame(() => {
      bootInner = requestAnimationFrame(() => {
        void runInit();
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(bootOuter);
      cancelAnimationFrame(bootInner);
      dispose?.();
      pendingDevice?.destroy();
      pendingDevice = null;
    };
  }, [gpuSupported, url]);

  const onCanvasClick = useCallback(() => {
    onTapToScan?.();
  }, [onTapToScan]);

  if (!gpuSupported) {
    return (
      <div
        className={`flex h-full min-h-[120px] items-center justify-center px-2 text-center text-[11px] leading-snug text-white/55 ${className}`}
      >
        WebGPU is not available in this browser. Use Chrome or Edge; the scannable QR is shown below.
      </div>
    );
  }

  if (gpuInitFailed) {
    return (
      <div
        className={`flex h-full min-h-[120px] items-center justify-center px-2 text-center text-[11px] leading-snug text-white/55 ${className}`}
      >
        WebGPU could not start (no GPU context or adapter). Try Chrome or Edge on desktop; the scannable
        QR is shown below.
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative h-full w-full min-h-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="block h-full w-full cursor-pointer touch-manipulation"
        onClick={onCanvasClick}
        aria-hidden
      />
      {onTapToScan ? (
        <span className="pointer-events-none absolute bottom-1 left-0 right-0 text-center text-[10px] text-white/40">
          Toggle QR or tap to scan
        </span>
      ) : null}
    </div>
  );
}
