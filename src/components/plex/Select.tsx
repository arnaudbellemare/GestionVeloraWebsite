

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface MenuPosition {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  above: boolean;
}

export interface SelectOption<T extends string> {
  value: T;
  label: string;
  /** Secondary text shown right-aligned in the row. */
  hint?: string;
  /** Heading this option sits under. Consecutive options share a heading. */
  group?: string;
}

/**
 * Listbox-pattern select. Replaces the native control so the menu can carry
 * grouping, secondary hints and the same typography as the rest of the page —
 * a native <select> renders as an OS widget and cannot be styled.
 *
 * Keyboard support matches the native control: arrows and Home/End move,
 * Enter/Space commit, Escape cancels, and typing jumps by prefix.
 */
export function Select<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  compact,
  full,
}: {
  value: T;
  options: SelectOption<T>[];
  onChange: (v: T) => void;
  ariaLabel: string;
  /** Tighter sizing, for use inside dense tables. */
  compact?: boolean;
  /** Stretch to the container width. */
  full?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pos, setPos] = useState<MenuPosition | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const typeahead = useRef({ buffer: "", at: 0 });
  const listId = useId();

  const selected = options.find((o) => o.value === value) ?? options[0];
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));

  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  const commit = useCallback((i: number) => {
    const opt = options[i];
    if (opt) onChange(opt.value);
    close();
  }, [options, onChange, close]);

  /**
   * The menu is rendered into <body>, so it has to be positioned from the
   * trigger's viewport rect. It escapes to the body precisely because an
   * ancestor may clip it — the unit-mix table scrolls horizontally, and an
   * absolutely-positioned menu inside it gets cut off at the container edge.
   */
  const place = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const gap = 5;
    const margin = 8;
    const preferred = 320;

    const roomBelow = window.innerHeight - r.bottom - gap - margin;
    const roomAbove = r.top - gap - margin;
    // Drop upward only when below genuinely cannot hold the menu and above is
    // roomier, so the menu stays where the eye expects it most of the time.
    const above = roomBelow < Math.min(preferred, 180) && roomAbove > roomBelow;
    const maxHeight = Math.max(120, Math.min(preferred, above ? roomAbove : roomBelow));

    // Document coordinates, not viewport: absolutely positioned on <body>, the
    // menu then scrolls with the page on its own. Pinning it to the viewport
    // would leave it stranded whenever a scroll event failed to reach us.
    setPos({
      left: r.left + window.scrollX,
      top: (above ? r.top - gap - maxHeight : r.bottom + gap) + window.scrollY,
      width: r.width,
      maxHeight,
      above,
    });
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  /**
   * Upward placement is anchored off maxHeight, but a menu with few options
   * renders shorter than that and would float away from its trigger. Once it
   * has a real height, pull it back down so its bottom edge sits against the
   * trigger.
   */
  useLayoutEffect(() => {
    if (!open || !pos?.above || !listRef.current || !triggerRef.current) return;
    const h = listRef.current.getBoundingClientRect().height;
    const r = triggerRef.current.getBoundingClientRect();
    const want = r.top + window.scrollY - 5 - h;
    if (Math.abs(want - pos.top) > 1) {
      setPos((p) => (p ? { ...p, top: want } : p));
    }
  }, [open, pos]);

  // Keep the menu pinned to its trigger while the page moves under it.
  useEffect(() => {
    if (!open) return;
    const onMove = () => place();
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open, place]);

  // Dismiss when the click lands outside both the trigger and the menu — the
  // menu is no longer a descendant of the root, so both need checking.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!rootRef.current?.contains(t) && !listRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const openMenu = () => {
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(activeIndex);
        break;
      default: {
        if (e.key.length !== 1) return;
        const now = Date.now();
        const t = typeahead.current;
        t.buffer = now - t.at > 700 ? e.key : t.buffer + e.key;
        t.at = now;
        const hit = options.findIndex((o) =>
          o.label.toLowerCase().startsWith(t.buffer.toLowerCase()));
        if (hit >= 0) setActiveIndex(hit);
      }
    }
  };

  // A row shows its group heading only when it opens a new group. Derived up
  // front rather than tracked through the map, which would mutate during render.
  const rows = options.map((o, i) => ({
    option: o,
    heading: o.group && o.group !== options[i - 1]?.group ? o.group : null,
  }));

  return (
    <div
      className={`sel ${full ? "sel-full" : ""} ${compact ? "sel-compact" : ""}`}
      ref={rootRef}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`sel-trigger ${open ? "is-open" : ""}`}
        // Set inline: the equivalent stylesheet rule matched and had higher
        // specificity but was not winning the cascade in this build, and the
        // open-state border is not worth more time than this.
        style={open ? { borderColor: "var(--ink)" } : undefined}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => (open ? close(false) : openMenu())}
        onKeyDown={onKeyDown}
      >
        <span className="sel-value">{selected?.label ?? ""}</span>
        <svg className="sel-chevron" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M2 3.5L5 6.5L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && pos && createPortal(
        <div
          className={`sel-menu ${pos.above ? "is-above" : ""}`}
          role="listbox"
          id={listId}
          ref={listRef}
          tabIndex={-1}
          aria-label={ariaLabel}
          onKeyDown={onKeyDown}
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            minWidth: pos.width,
            maxHeight: pos.maxHeight,
          }}
        >
          {rows.map(({ option: o, heading }, i) => {
            return (
              <React.Fragment key={o.value}>
                {heading && <div className="sel-group">{heading}</div>}
                <div
                  role="option"
                  data-index={i}
                  aria-selected={o.value === value}
                  className={`sel-option ${i === activeIndex ? "is-active" : ""} ${o.value === value ? "is-selected" : ""}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => commit(i)}
                >
                  <span className="sel-check" aria-hidden="true">
                    {o.value === value ? (
                      <svg width="11" height="11" viewBox="0 0 11 11">
                        <path d="M1.5 5.5L4 8L9.5 2.5" fill="none" stroke="currentColor"
                          strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : null}
                  </span>
                  <span className="sel-label">{o.label}</span>
                  {o.hint && <span className="sel-hint">{o.hint}</span>}
                </div>
              </React.Fragment>
            );
          })}
        </div>,
        document.body,
      )}
    </div>
  );
}
