import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  amount?: number;
  duration?: number;
  /** Slight scale-up on reveal — use sparingly (Nothing baseline: opacity + short travel) */
  scale?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  amount = 0.2,
  duration = 0.35,
  scale = false,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  const directions = {
    up: { y: 14, x: 0 },
    down: { y: -14, x: 0 },
    left: { y: 0, x: 14 },
    right: { y: 0, x: -14 },
  };

  const { y, x } = directions[direction];

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y,
        x,
        scale: scale ? 0.98 : 1,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, scale: 1 }
          : { opacity: 0, y, x, scale: scale ? 0.98 : 1 }
      }
      transition={{
        duration,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
