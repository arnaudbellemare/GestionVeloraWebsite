import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useGoToContact } from "../hooks/useGoToContact";

export function OurProcessSection() {
  const { t } = useTranslation();
  const { contactHref, goToContact } = useGoToContact();
  const steps = t("ourProcess.steps", { returnObjects: true }) as {
    step: string;
    title: string;
    body: string;
  }[];
  const [i, setI] = useState(0);
  const n = steps.length;
  const prev = () => setI((j) => (j - 1 + n) % n);
  const next = () => setI((j) => (j + 1) % n);

  return (
    <section
      id="process"
      className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 px-6 lg:px-12 bg-nd-canvas nd-dot-grid scroll-mt-24"
    >
      <div className="max-w-[90rem] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-14">
          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-nd-secondary mb-4">
              {t("ourProcess.label")}
            </p>
            <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-[-0.02em] text-nd-display max-w-3xl">
              {t("ourProcess.title")}
            </h2>
          </div>
          <a
            href={contactHref}
            onClick={goToContact}
            className="inline-flex items-center gap-2 self-start lg:self-auto border border-nd-border-visible text-nd-primary px-5 py-3 text-[10px] tracking-[0.12em] uppercase font-mono hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <span className="text-sm" aria-hidden>
              ↗
            </span>
            {t("ourProcess.cta")}
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden flex flex-col lg:flex-row bg-black text-white min-h-[min(520px,70vh)] border border-[#333333]">
          <div className="lg:w-[min(52%,520px)] flex flex-col justify-between p-8 lg:p-12 lg:pr-8 shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#999999] mb-3">
                  {steps[i].step}
                </p>
                <h3 className="font-sans font-medium text-xl sm:text-2xl lg:text-3xl mb-5 leading-snug tracking-[-0.02em]">
                  {steps[i].title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#E8E8E8] leading-relaxed max-w-lg">
                  {steps[i].body}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-10 lg:mt-12">
              <button
                type="button"
                onClick={prev}
                className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Next"
              >
                →
              </button>
              <div className="flex gap-1.5 ml-2">
                {steps.map((_, j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => setI(j)}
                    className={`h-1 rounded-full transition-all ${
                      j === i ? "w-8 bg-white" : "w-5 bg-white/25 hover:bg-white/40"
                    }`}
                    aria-label={`Step ${j + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 relative min-h-[260px] lg:min-h-0 bg-neutral-900 overflow-hidden">
            <img
              src="/hero-gestion-velora.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center opacity-90 grayscale contrast-[1.05] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] lg:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%,0_32%)]"
            />
            <div className="absolute inset-0 bg-black/45 pointer-events-none" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
