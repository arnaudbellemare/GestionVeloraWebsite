import { useTranslation } from "react-i18next";
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
    <section className="pt-24 lg:pt-32 pb-12 lg:pb-16 px-6 lg:px-16 bg-nd-canvas">
      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-2 gap-x-4 gap-y-0 sm:gap-8 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0 divide-y lg:divide-y-0 lg:divide-x divide-nd-border">
          {statKeys.map((stat, i) => (
            <ScrollReveal key={stat.key} delay={i * 0.08}>
              <div className="py-6 sm:py-8 lg:py-0 lg:px-12 first:lg:pl-0 last:lg:pr-0 text-center min-w-0">
                <p
                  className={`font-stat-numeral font-semibold text-3xl sm:text-4xl lg:text-5xl text-nd-display mb-2 leading-none tracking-[-0.02em] ${
                    stat.value === "24/7" ? "tracking-[0em]" : ""
                  }`}
                >
                  <CountUp value={stat.value} duration={1.5} />
                </p>
                <p className="font-stat-numeral font-semibold text-[11px] sm:text-xs text-nd-secondary tracking-[0.11em] uppercase">
                  {t(`stats.${stat.key}`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.12} amount={0.2}>
          <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center px-2">
            <p className="font-sans text-base lg:text-lg text-nd-secondary max-w-md">
              {t("stats.afterLead")}
            </p>
            <a
              href={contactHref}
              onClick={goToContact}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-black text-white font-sans font-medium text-sm hover:opacity-90 whitespace-nowrap min-h-[44px] border border-nd-border-visible dark:bg-white dark:text-black"
            >
              {t("stats.afterCta")}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
