import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTransition } from "../context/TransitionContext";

export function PageTransition() {
  const { pathname } = useLocation();
  const { isTransitioning, endTransition } = useTransition();
  const [shouldFade, setShouldFade] = useState(false);
  const pathWhenStarted = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (isTransitioning && pathname !== pathWhenStarted.current) {
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      html.style.scrollBehavior = prevBehavior;
    }
  }, [isTransitioning, pathname]);

  useEffect(() => {
    if (isTransitioning) {
      if (pathWhenStarted.current === null) {
        pathWhenStarted.current = pathname;
      }
      if (pathname !== pathWhenStarted.current) {
        setShouldFade(true);
      }
    } else {
      pathWhenStarted.current = null;
      setShouldFade(false);
    }
  }, [isTransitioning, pathname]);

  const handleAnimationComplete = () => {
    endTransition();
  };

  if (!isTransitioning) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldFade ? 0 : 1 }}
      transition={{
        duration: shouldFade ? 0.45 : 0.22,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onAnimationComplete={handleAnimationComplete}
      className="fixed inset-0 z-[9999] w-full h-full min-h-screen bg-white dark:bg-velora-charcoal pointer-events-none"
      style={{ top: 0, left: 0 }}
      aria-hidden="true"
    />
  );
}
