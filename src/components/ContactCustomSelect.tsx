import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  <svg className="h-4 w-4 shrink-0 text-black/45 dark:text-white/45" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
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
    <div ref={rootRef} className="relative">
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
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-black/20 bg-white px-4 py-3.5 text-left font-sans text-base text-black transition-shadow transition-colors hover:border-black/30 focus:border-velora-ocean focus:outline-none focus:ring-2 focus:ring-velora-ocean/25 dark:border-white/25 dark:bg-[#252525] dark:text-white dark:hover:border-white/35 dark:focus:border-sky-400 dark:focus:ring-sky-400/20"
      >
        <span className={showPlaceholder ? "text-black/45 dark:text-white/45" : ""}>
          {showPlaceholder ? placeholder : selectedLabel || placeholder}
        </span>
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>{chevron}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[60] mt-1 max-h-56 w-full overflow-auto rounded-xl border border-black/15 bg-white py-1 shadow-xl shadow-black/10 dark:border-white/15 dark:bg-[#2c2c2c] dark:shadow-black/40"
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
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      active
                        ? "bg-velora-ocean/12 text-black dark:bg-sky-400/15 dark:text-white"
                        : "text-black/90 hover:bg-black/[0.06] dark:text-white/90 dark:hover:bg-white/[0.08]"
                    } ${selected ? "font-medium" : "font-normal"}`}
                    onMouseEnter={() => setHighlighted(i)}
                    onClick={() => {
                      onChange(opt.value);
                      close();
                    }}
                  >
                    {selected ? (
                      <span className="text-velora-ocean dark:text-sky-400" aria-hidden>
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
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
