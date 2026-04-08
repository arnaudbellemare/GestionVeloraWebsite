import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type ContactSelectOption = { value: string; label: string };

type Props = {
  id: string;
  /** `htmlFor` on the visible label */
  labelId?: string;
  options: ContactSelectOption[];
  value: string;
  onChange: (value: string) => void;
  /** Shown when `value` is `""` */
  placeholder?: string;
};

const chevron = (
  <svg className="h-4 w-4 shrink-0 text-nd-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export function ContactCustomSelect({
  id,
  labelId,
  options,
  value,
  onChange,
  placeholder,
}: Props): JSX.Element {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";
  const showPlaceholder = value === "" && Boolean(placeholder);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const idx = Math.max(
      0,
      options.findIndex((o) => o.value === value)
    );
    setHighlighted(idx);
  }, [open, options, value]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((h) => Math.min(h + 1, options.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((h) => Math.max(h - 1, 0));
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const opt = options[highlighted];
        if (opt) {
          onChange(opt.value);
          close();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, highlighted, options, onChange]);

  useEffect(() => {
    optionRefs.current[highlighted]?.scrollIntoView({ block: "nearest" });
  }, [highlighted]);

  const toggle = () => setOpen((o) => !o);

  return (
    <div
      ref={rootRef}
      className={`relative ${open ? "z-50" : "z-0"}`}
    >
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        onClick={toggle}
        onKeyDown={(e) => {
          if (open) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            return;
          }
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={`flex min-h-12 h-12 w-full items-center justify-between gap-2 rounded-lg border border-black/[0.22] px-4 text-left font-sans text-base text-nd-primary hover:border-black/35 dark:border-white/[0.22] dark:hover:border-white/35 focus:border-[#5B9BF6] focus:outline-none focus:ring-2 focus:ring-[#5B9BF6]/25 bg-white dark:bg-[#111111] ${reduceMotion ? "transition-colors" : "transition-[border-radius,colors,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"} ${open ? "relative z-[1] rounded-b-none border-b-0 ring-0" : ""}`}
      >
        <span className={showPlaceholder ? "text-nd-muted" : ""}>
          {showPlaceholder ? placeholder : selectedLabel || placeholder}
        </span>
        <span
          className={`${reduceMotion ? "" : "transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"} ${open ? "rotate-180" : ""}`}
        >
          {chevron}
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="contact-select-panel"
            layout={false}
            /** Clip-path keeps the panel opaque (no opacity fade) while opening/closing smoothly. */
            initial={reduceMotion ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={reduceMotion ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{
              duration: reduceMotion ? 0 : 0.26,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute left-0 right-0 top-full z-[2] isolate w-full overflow-hidden rounded-b-lg border border-t-0 border-black/[0.22] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.14)] dark:border-white/[0.22] dark:bg-[#111111] dark:shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
          >
            <ul
              id={listId}
              role="listbox"
              aria-labelledby={labelId}
              className="max-h-56 w-full overflow-y-auto py-1"
            >
              {options.map((opt, i) => {
                const selected = opt.value === value;
                const active = i === highlighted;
                return (
                  <li key={opt.value === "" ? "__empty__" : opt.value} role="presentation" className="px-1">
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      ref={(el) => {
                        optionRefs.current[i] = el;
                      }}
                      className={`flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                        active
                          ? "bg-[#f0f0f0] text-nd-primary dark:bg-[#1a1a1a]"
                          : "text-nd-primary hover:bg-[#f0f0f0] dark:hover:bg-[#1a1a1a]"
                      } ${selected ? "font-medium" : "font-normal"}`}
                      onMouseEnter={() => setHighlighted(i)}
                      onClick={() => {
                        onChange(opt.value);
                        close();
                      }}
                    >
                      {selected ? (
                        <span className="text-[#5B9BF6]" aria-hidden>
                          ✓
                        </span>
                      ) : (
                        <span className="w-4 shrink-0" aria-hidden />
                      )}
                      <span className="min-w-0 flex-1 leading-snug">{opt.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
