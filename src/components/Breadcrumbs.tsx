import { InternalLink } from "./InternalLink";

export type BreadcrumbItem = { label: string; to?: string };

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  /** Light text for use on dark hero imagery */
  theme?: "default" | "onDark";
};

export function Breadcrumbs({ items, theme = "default" }: BreadcrumbsProps) {
  const isDark = theme === "onDark";
  const muted = isDark ? "text-white/55" : "text-black/60 dark:text-white/60";
  const sep = isDark ? "text-white/35" : "text-black/35 dark:text-white/35";
  const current = isDark ? "text-white font-medium" : "text-black/85 dark:text-white/85 font-medium";
  const link = isDark
    ? "text-white/90 hover:text-waabi-pink transition-colors"
    : "hover:text-waabi-pink transition-colors";

  return (
    <nav aria-label="Breadcrumb" className={`font-sans text-sm ${muted} mb-6`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span className={sep} aria-hidden>
                  /
                </span>
              )}
              {item.to && !isLast ? (
                <InternalLink to={item.to} className={link}>
                  {item.label}
                </InternalLink>
              ) : (
                <span
                  className={
                    isLast ? `${current} max-w-[min(100%,28rem)] truncate` : ""
                  }
                  title={isLast ? item.label : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
