import { useRef, useEffect } from "react";
import * as THREE from "three";
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/** World-units size of the largest bbox axis after fit (matches prior symbol framing). */
const TARGET_MAX_DIM = 2.5;

/**
 * Extruded / image-to-3D GLBs often lie in XZ with thin Y; tilt so the broad face reads toward the camera.
 * Use +π/2 or −π/2 on X depending on export; avoid stacking Z flips unless the mark is mirrored.
 */
const ORIENT_X = Math.PI / 2;
const ORIENT_Y = 0;
const ORIENT_Z = 0;

export function RotatingSymbol3D({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0x8e9c78, 0.5);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xd4a853, 0.3);
    rimLight.position.set(0, -3, -5);
    scene.add(rimLight);

    /** Spins on Y; inner root holds scale/center/orientation so the mark stays visually centered. */
    const turntable = new THREE.Group();
    scene.add(turntable);

    const loader = new GLTFLoader();
    loader.load("/models/symbl-3d.glb", (gltf: { scene: THREE.Group }) => {
      const root = gltf.scene;
      root.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#d4a853"),
            metalness: 0.6,
            roughness: 0.25,
          });
        }
      });

      root.rotation.set(ORIENT_X, ORIENT_Y, ORIENT_Z, "XYZ");
      root.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(root);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
      const s = TARGET_MAX_DIM / maxDim;

      root.scale.setScalar(s);
      root.position.copy(center).multiplyScalar(-s);

      turntable.add(root);
    });

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      turntable.rotation.y += 0.008;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
