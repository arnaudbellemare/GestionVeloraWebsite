interface TextWaveBackgroundProps {
  className?: string;
}

/** Solid black background — static, no animation. */
export function TextWaveBackground({ className = "" }: TextWaveBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 w-full h-full min-w-full min-h-full bg-black ${className}`}
      aria-hidden
    />
  );
}
