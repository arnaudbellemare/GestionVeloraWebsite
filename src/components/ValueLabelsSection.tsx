import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { RotatingSymbol3D } from "./RotatingSymbol3D";

const valueKeys = [
  { labelKey: "valueLabels.transparent", textKey: "valueLabels.transparentText" },
  { labelKey: "valueLabels.proactive", textKey: "valueLabels.proactiveText" },
  { labelKey: "valueLabels.reliable", textKey: "valueLabels.reliableText" },
] as const;

type BarRect = { top: number; left: number; width: number; height: number };

export function ValueLabelsSection() {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(0);
  const labelsContainerRef = useRef<HTMLDivElement>(null);
  const spacerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [barRect, setBarRect] = useState<BarRect | null>(null);
  const titleRaw = t("valueLabels.title");
  const titleParts = titleRaw.split("\n").map((s) => s.trim()).filter(Boolean);

  const measureBar = useCallback(() => {
    const container = labelsContainerRef.current;
    const spacer = spacerRefs.current[active];
    if (!container || !spacer) return;
    const c = container.getBoundingClientRect();
    const s = spacer.getBoundingClientRect();
    setBarRect({
      top: Math.round(s.top - c.top),
      left: Math.round(s.left - c.left),
      width: Math.max(1, Math.round(s.width)),
      height: Math.max(1, Math.round(s.height)),
    });
  }, [active]);

  useLayoutEffect(() => {
    measureBar();
    const container = labelsContainerRef.current;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measureBar) : null;
    if (container && ro) ro.observe(container);
    window.addEventListener("resize", measureBar);
    window.addEventListener("orientationchange", measureBar);
    document.fonts?.ready?.then(measureBar);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measureBar);
      window.removeEventListener("orientationchange", measureBar);
    };
  }, [measureBar, i18n.language]);

  useEffect(() => {
    const ti = setInterval(() => setActive((a) => (a + 1) % valueKeys.length), 4000);
    return () => clearInterval(ti);
  }, []);

  return (
    <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 lg:py-32 px-5 sm:px-6 lg:px-16 bg-black overflow-hidden border-y border-[#222222]">
      {/* 3D rotating symbol - behind all content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 lg:opacity-40">
        <RotatingSymbol3D className="w-[400px] h-[400px] lg:w-[600px] lg:h-[600px]" />
      </div>

      <div className="max-w-[90rem] mx-auto relative z-10">
        <ScrollReveal>
          <h2 id="nos-valeurs" className="font-playfair font-semibold text-2xl sm:text-3xl lg:text-5xl text-white leading-[1.08] tracking-[-0.02em] mb-10 sm:mb-16 max-w-3xl text-balance">
            {titleParts.length > 1 ? (
              <>
                <span className="block">{titleParts[0]}</span>
                <span className="block pl-8 sm:pl-12 lg:pl-16 mt-1">{titleParts.slice(1).join(" ")}</span>
              </>
            ) : (
              titleRaw
            )}
          </h2>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-start">
          {/* Labels: one measured bar animates between spacers (avoids mobile opacity flicker on thin lines) */}
          <div
            ref={labelsContainerRef}
            className="relative flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 lg:flex-col lg:gap-3 shrink-0 w-full lg:w-auto"
          >
            {barRect !== null && (
              <motion.div
                aria-hidden
                className="absolute z-[1] rounded-sm bg-white pointer-events-none will-change-[top,left,width,height]"
                initial={false}
                animate={{
                  top: barRect.top,
                  left: barRect.left,
                  width: barRect.width,
                  height: barRect.height,
                }}
                transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}
            {valueKeys.map((v, i) => (
              <motion.button
                key={v.labelKey}
                type="button"
                onClick={() => setActive(i)}
                className={`group flex items-center gap-1 text-left font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
                  active === i ? "text-white" : "text-[#999999] hover:text-[#E8E8E8]"
                }`}
              >
                <span
                  ref={(el) => {
                    spacerRefs.current[i] = el;
                  }}
                  className="w-0.5 h-[0.85em] shrink-0 rounded-sm bg-transparent"
                  aria-hidden
                />
                <span className="min-w-0">{t(v.labelKey)}</span>
              </motion.button>
            ))}
          </div>

          {/* Description text */}
          <div className="flex-1 min-h-[80px] sm:min-h-[100px] lg:min-h-[140px] relative min-w-0 w-full">
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-sans text-base sm:text-lg lg:text-2xl text-[#E8E8E8] max-w-2xl leading-relaxed"
              >
                {t(valueKeys[active].textKey)}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 sm:mt-12 lg:mt-16 h-px bg-[#333333] w-full max-w-[90rem]"
        />
      </div>
    </section>
  );
}
