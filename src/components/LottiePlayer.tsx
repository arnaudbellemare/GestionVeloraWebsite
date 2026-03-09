import { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface LottiePlayerProps {
  /** URL to Lottie JSON (e.g. from Jitter export or LottieFiles) */
  src?: string;
  /** Or pass animation data directly */
  animationData?: object;
  loop?: boolean;
  className?: string;
}

/**
 * Renders a Lottie animation from a URL or inline data.
 * Export your Jitter template as Lottie JSON, host it, and pass the URL via `src`.
 */
export function LottiePlayer({
  src,
  animationData,
  loop = true,
  className = "",
}: LottiePlayerProps) {
  const [data, setData] = useState<object | null>(animationData ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (animationData) {
      setData(animationData);
      setError(null);
      return;
    }
    if (!src) {
      setData(null);
      return;
    }
    setData(null);
    setError(null);
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load: ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, [src, animationData]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm ${className}`}
      >
        Lottie: {error}
      </div>
    );
  }
  if (!data) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse ${className}`}
      />
    );
  }

  return (
    <Lottie
      animationData={data}
      loop={loop}
      className={className}
    />
  );
}
