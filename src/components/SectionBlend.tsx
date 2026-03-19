import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionBlendProps {
  from: string;
  to: string;
  darkFrom?: string;
  darkTo?: string;
  height?: number;
  blobs?: boolean;
  blobColor?: string;
  flipBlobs?: boolean;
}

/**
 * Build an eased gradient with many color stops so the
 * perceptual transition between two colors is buttery smooth
 * (no visible banding). Uses an ease-in-out curve.
 */
function easedGradient(from: string, to: string): string {
  const stops = [
    [0, 0],
    [8, 0.02],
    [16, 0.06],
    [24, 0.14],
    [32, 0.24],
    [40, 0.38],
    [50, 0.5],
    [60, 0.62],
    [68, 0.76],
    [76, 0.86],
    [84, 0.94],
    [92, 0.98],
    [100, 1],
  ];

  const cssStops = stops
    .map(([pos, t]) => {
      return `color-mix(in oklab, ${to} ${Math.round(t! * 100)}%, ${from}) ${pos}%`;
    })
    .join(", ");

  return `linear-gradient(to bottom, ${cssStops})`;
}

export function SectionBlend({
  from,
  to,
  darkFrom,
  darkTo,
  height = 160,
  blobs = false,
  blobColor = "rgba(72,92,17,0.06)",
  flipBlobs = false,
}: SectionBlendProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const blobY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const blobScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.15, 0.9]);
  const blobOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  const hasDarkVariant = darkFrom && darkTo;

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden pointer-events-none select-none"
      style={{ height }}
      aria-hidden="true"
    >
      {/* Light mode gradient */}
      <div
        className={`absolute inset-0 ${hasDarkVariant ? "dark:hidden" : ""}`}
        style={{ background: easedGradient(from, to) }}
      />

      {/* Dark mode gradient (if different colors provided) */}
      {hasDarkVariant && (
        <div
          className="absolute inset-0 hidden dark:block"
          style={{ background: easedGradient(darkFrom, darkTo) }}
        />
      )}

      {blobs && (
        <>
          <motion.div
            className="absolute rounded-full blur-[80px]"
            style={{
              width: 280,
              height: 280,
              background: blobColor,
              left: flipBlobs ? "65%" : "15%",
              top: "50%",
              y: blobY,
              scale: blobScale,
              opacity: blobOpacity,
              translateY: "-50%",
            }}
          />
          <motion.div
            className="absolute rounded-full blur-[60px]"
            style={{
              width: 180,
              height: 180,
              background: blobColor,
              right: flipBlobs ? "65%" : "20%",
              top: "40%",
              y: useTransform(scrollYProgress, [0, 1], [-30, 50]),
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 0.85, 1.05]),
              opacity: blobOpacity,
              translateY: "-50%",
            }}
          />
        </>
      )}
    </div>
  );
}
