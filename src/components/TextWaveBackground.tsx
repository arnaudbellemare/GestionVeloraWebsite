import { useEffect, useRef } from "react";

function rgbStr(c: number[]) {
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
function rgbaStr(c: number[], a: number) {
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

type Colors = { fg: number[]; bg: number[]; accent: number[] };

function drawTextWave(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  intensity: number,
  scale: number,
  colors: Colors,
  text: string
) {
  ctx.fillStyle = rgbStr(colors.bg);
  ctx.fillRect(0, 0, w, h);

  const displayText = text.toUpperCase();
  if (displayText.length === 0) return;

  const baseSize = Math.min(w, h);
  const fontSize = Math.max(12, Math.floor(14 * (baseSize / 800) * (scale / 4)));
  ctx.font = `bold ${fontSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const amp = intensity / 50;
  const rows = Math.floor(h / (fontSize * 1.3));
  const cx = w / 2;

  for (let row = 0; row < rows; row++) {
    const y = fontSize + row * fontSize * 1.3;
    const rowPhase = row * 0.3 + t * 2;
    const curve = Math.sin(rowPhase) * w * 0.15 * amp;
    const spacing =
      fontSize * 0.85 + Math.sin(rowPhase * 0.5) * fontSize * 0.3 * amp;

    for (let i = 0; i < displayText.length; i++) {
      const charOffset = (i - displayText.length / 2) * spacing;
      const x = cx + charOffset + curve;
      const charWave =
        Math.sin(t * 1.5 + i * 0.4 + row * 0.2) * 5 * amp;

      const alpha = 0.4 + 0.6 * (1 - Math.abs(charOffset) / (w * 0.5));
      if (alpha <= 0) continue;

      ctx.fillStyle = rgbaStr(
        colors.fg,
        Math.max(0, Math.min(1, alpha))
      );
      ctx.fillText(displayText[i], x, y + charWave);
    }
  }
}

interface TextWaveBackgroundProps {
  text?: string;
  className?: string;
}

export function TextWaveBackground({
  text = "Gestion Velora",
  className = "",
}: TextWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
    if (!ctx) return;

    const colors: Colors = {
      fg: [255, 255, 255],
      bg: [0, 0, 0],
      accent: [136, 136, 136],
    };

    let ticking = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
    }

    function draw() {
      if (!ticking || !ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      tRef.current += 0.016 * 0.7;

      drawTextWave(ctx, w, h, tRef.current, 57, 4, colors, text);

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

    return () => {
      ticking = false;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
      aria-hidden
    />
  );
}
