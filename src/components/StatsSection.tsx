import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { CountUp } from "./CountUp";
import { useGoToContact } from "../hooks/useGoToContact";

const statKeys = [
  { value: "10+", key: "buildings" },
  { value: "98%", key: "occupancy" },
  { value: "24/7", key: "response" },
  { value: "100%", key: "transparency" },
] as const;

export function StatsSection() {
  const { t } = useTranslation();
  const { contactHref, goToContact } = useGoToContact();

  return (
    <section className="pt-24 lg:pt-32 pb-12 lg:pb-16 px-6 lg:px-16 bg-[#f9f6f3] dark:bg-velora-charcoal">
      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-2 gap-x-4 gap-y-0 sm:gap-8 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0 divide-y lg:divide-y-0 lg:divide-x divide-velora-charcoal/10 dark:divide-white/10">
          {statKeys.map((stat, i) => (
            <ScrollReveal key={stat.key} delay={i * 0.1} scale>
              <div className="py-6 sm:py-8 lg:py-0 lg:px-12 first:lg:pl-0 last:lg:pr-0 text-center min-w-0">
                <p
                  className={`font-crimson font-semibold text-3xl sm:text-4xl lg:text-5xl text-velora-charcoal dark:text-white mb-2 leading-tight ${
                    stat.value === "24/7" ? "tracking-[0em]" : "tracking-tight"
                  }`}
                >
                  <CountUp value={stat.value} duration={1.5} />
                </p>
                <p className="font-sans font-normal text-[11px] sm:text-sm text-velora-charcoal/70 dark:text-white/50 tracking-widest uppercase">
                  {t(`stats.${stat.key}`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.25} amount={0.2}>
          <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center px-2">
            <p className="font-sans text-base lg:text-lg text-velora-charcoal/80 dark:text-white/70 max-w-md">
              {t("stats.afterLead")}
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href={contactHref}
                onClick={goToContact}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-velora-charcoal text-white dark:bg-white dark:text-neutral-900 font-sans font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap min-h-[44px]"
              >
                {t("stats.afterCta")}
              </a>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
