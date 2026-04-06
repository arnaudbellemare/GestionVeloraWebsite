import { type RefObject, useEffect, useLayoutEffect, useState } from "react";

/** After first paint / idle — keeps main thread and network free for JS, CSS, fonts. */
export function useIdleReady(timeoutMs = 2800): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (!cancelled) setReady(true);
    };
    const w = typeof window !== "undefined" ? window : undefined;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (w && "requestIdleCallback" in w) {
      idleId = w.requestIdleCallback(run, { timeout: timeoutMs });
    } else {
      timeoutId = setTimeout(run, 120);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && w && "cancelIdleCallback" in w) {
        w.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [timeoutMs]);
  return ready;
}

/** Load heavy media only when the element is near the viewport (below-the-fold video, etc.). */
export function useLoadWhenInView(
  ref: RefObject<Element | null>,
  rootMargin = "200px 0px"
): boolean {
  const [load, setLoad] = useState(false);

  useLayoutEffect(() => {
    if (load) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, load, rootMargin]);

  return load;
}
