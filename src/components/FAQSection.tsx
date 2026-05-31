import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

export function FAQSection() {
  const { t } = useTranslation();
  const faqItems = t("faqItems", { returnObjects: true }) as {
    question: string;
    answer: string;
  }[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="pt-12 pb-24 lg:pt-16 lg:pb-32 px-6 lg:px-16 bg-nd-canvas overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[48rem] mx-auto">
        <ScrollReveal>
          <h2 id="faq-section" className="font-sans font-medium text-4xl lg:text-5xl text-nd-display leading-[1.05] tracking-[-0.02em] mb-4">
            {t("faq.title")}
          </h2>
          <p className="font-sans text-base lg:text-lg text-black/60 dark:text-white/60 mb-12">
            {t("faq.subtitle")}
          </p>
        </ScrollReveal>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <ScrollReveal key={item.question} delay={i * 0.05}>
              <details
                open={open === i}
                onToggle={(event) => {
                  const isOpen = event.currentTarget.open;
                  setOpen(isOpen ? i : open === i ? null : open);
                }}
                className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-white dark:bg-white/[0.02]"
              >
                <summary
                  className="w-full px-6 py-5 flex cursor-pointer list-none items-center justify-between gap-4 text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors [&::-webkit-details-marker]:hidden"
                >
                  <span className="font-sans font-semibold text-base lg:text-lg text-black dark:text-white">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-black/50 dark:text-white/50"
                    aria-hidden
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </summary>
                <p className="px-6 pb-5 pt-0 font-sans text-base text-black/80 dark:text-white/80 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
