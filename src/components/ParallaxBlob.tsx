import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxBlobProps {
  /** CSS color string */
  color?: string;
  /** Size in px */
  size?: number;
  /** Blur in px */
  blur?: number;
  /** CSS positioning */
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  /** Parallax speed multiplier (negative = opposite direction) */
  speed?: number;
  /** Additional className */
  className?: string;
}

/**
 * Floating decorative blob with scroll-driven parallax.
 * Creates continuous morphing visual that ties sections together.
 */
export function ParallaxBlob({
  color = "rgba(72,92,17,0.05)",
  size = 300,
  blur = 80,
  top,
  left,
  right,
  bottom,
  speed = 1,
  className = "",
}: ParallaxBlobProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80 * speed, -80 * speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.9]);

  return (
    <motion.div
      ref={ref}
      className={`absolute rounded-full pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
        top,
        left,
        right,
        bottom,
        y,
        scale,
      }}
      aria-hidden="true"
    />
  );
}
