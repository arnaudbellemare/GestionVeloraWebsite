import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export function CountUp({ value, duration = 1.5, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");
  const [suffix, setSuffix] = useState("");
  const hasAnimated = useRef(false);

  // Native IntersectionObserver instead of framer-motion's useInView so the
  // (early-rendering) StatsSection doesn't drag the whole motion chunk into
  // the first-load critical path.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    const match = value.match(/^(\d+)(.*)$/);
    const target = match ? parseInt(match[1], 10) : 0;
    const endSuffix = match ? match[2] : "";
    setSuffix(endSuffix);

    hasAnimated.current = true;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplayValue(String(current));
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
}
