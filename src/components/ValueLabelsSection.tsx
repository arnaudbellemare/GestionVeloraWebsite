import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { RotatingSymbol3D } from "./RotatingSymbol3D";

const valueKeys = [
  { labelKey: "valueLabels.transparent", textKey: "valueLabels.transparentText" },
  { labelKey: "valueLabels.proactive", textKey: "valueLabels.proactiveText" },
  { labelKey: "valueLabels.reliable", textKey: "valueLabels.reliableText" },
] as const;

export function ValueLabelsSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ti = setInterval(() => setActive((a) => (a + 1) % valueKeys.length), 4000);
    return () => clearInterval(ti);
  }, []);

  return (
    <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 lg:py-32 px-5 sm:px-6 lg:px-16 bg-black overflow-hidden border-y border-[#222222]">
      {/* 3D rotating symbol — behind all content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 lg:opacity-40">
        <RotatingSymbol3D className="w-[400px] h-[400px] lg:w-[600px] lg:h-[600px]" />
      </div>

      <div className="max-w-[90rem] mx-auto relative z-10">
        <ScrollReveal>
          <h2 className="font-playfair font-semibold text-2xl sm:text-3xl lg:text-5xl text-white leading-[1.08] tracking-[-0.02em] mb-10 sm:mb-16 max-w-3xl">
            {t("valueLabels.title")}
          </h2>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-start">
          {/* Labels with sliding accent */}
          <div className="relative flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 lg:flex-col lg:pr-6 shrink-0 w-full lg:w-auto">
            <motion.div
              className="absolute left-0 top-0 w-0.5 h-5 bg-white rounded-sm hidden lg:block"
              initial={false}
              animate={{ y: active * 44 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 lg:flex-col lg:pl-4 lg:ml-2">
              {valueKeys.map((v, i) => (
                <motion.button
                  key={v.labelKey}
                  onClick={() => setActive(i)}
                  className={`font-mono text-xs uppercase tracking-[0.1em] transition-colors text-left ${
                    active === i ? "text-white" : "text-[#999999] hover:text-[#E8E8E8]"
                  }`}
                >
                  {t(v.labelKey)}
                </motion.button>
              ))}
            </div>
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
