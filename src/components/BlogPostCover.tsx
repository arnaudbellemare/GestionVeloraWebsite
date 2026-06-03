import { useState } from "react";

interface BlogPostCoverProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}

export function BlogPostCover({
  src,
  alt,
  className = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
  width = 1200,
  height = 900,
  loading = "lazy",
  fetchPriority,
}: BlogPostCoverProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-black"
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
    />
  );
}
