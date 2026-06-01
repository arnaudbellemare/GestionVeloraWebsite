import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  amount?: number;
  duration?: number;
  /** Slight scale-up on reveal - use sparingly (Nothing baseline: opacity + short travel) */
  scale?: boolean;
}

export function ScrollReveal(props: ScrollRevealProps) {
  return <div className={props.className ?? ""}>{props.children}</div>;
}
