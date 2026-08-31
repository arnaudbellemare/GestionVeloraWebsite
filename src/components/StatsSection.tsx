import { useTranslation } from "react-i18next";
import { InternalLink } from "./InternalLink";
import { ScrollReveal } from "./ScrollReveal";
import { CountUp } from "./CountUp";
import { useGoToContact } from "../hooks/useGoToContact";

const statKeys = [
  { value: "500", key: "units" },
  { value: "10+", key: "buildings" },
  { value: "98%", key: "occupancy" },
  { value: "24/7", key: "response" },
  { value: "100%", key: "transparency" },
] as const;

const publicSources = [
  {
    href: "https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-data/data-tables/rental-market/rental-market-report-data-tables",
    labelKey: "stats.citationCmhc",
  },
  {
    href: "https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991",
    labelKey: "stats.citationQuebec",
  },
  {
    href: "https://montreal.ca/sujets/hebergement-touristique-court-terme",
    labelKey: "stats.citationMontreal",
  },
  {
    href: "https://www.citq.qc.ca/",
    labelKey: "stats.citationCitq",
  },
] as const;

export function StatsSection() {
  const { t } = useTranslation();
  const { contactHref, goToContact } = useGoToContact();

  return (
    <section id="proof-stats" className="pt-24 lg:pt-32 pb-12 lg:pb-16 px-6 lg:px-16 bg-nd-canvas scroll-mt-24">
      <div className="max-w-[90rem] mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
          <h2 className="font-sans font-medium text-3xl sm:text-4xl text-nd-display leading-[1.1] tracking-[-0.02em] mb-5">
            {t("stats.answerHeading")}
          </h2>
          <p className="font-sans text-base lg:text-lg text-nd-secondary leading-relaxed">
            <strong className="text-nd-primary">{t("stats.answerLead")}</strong>{" "}
            {t("stats.answerBody")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-0 sm:gap-8 lg:grid-cols-5 lg:gap-x-0 lg:gap-y-0 divide-y lg:divide-y-0 lg:divide-x divide-nd-border">
          {statKeys.map((stat, i) => (
            <ScrollReveal key={stat.key} delay={i * 0.08}>
              <div className="py-6 sm:py-8 lg:py-0 lg:px-6 xl:px-8 first:lg:pl-0 last:lg:pr-0 text-center min-w-0 max-lg:last:col-span-2">
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

        <div className="mt-10 lg:mt-12 rounded-2xl border border-nd-border bg-nd-surface px-6 py-7 lg:px-8 lg:py-8">
          <h3 className="font-sans font-semibold text-xl text-nd-display mb-3">
            {t("stats.sourcesHeading")}
          </h3>
          <p className="font-sans text-sm text-nd-secondary leading-relaxed max-w-4xl mb-5">
            {t("stats.sourcesIntro")}
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 font-sans text-sm text-nd-primary">
            {publicSources.map((source) => (
              <li key={source.href}>
                <cite className="not-italic">
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="underline underline-offset-2 decoration-nd-border-visible hover:text-nd-display"
                  >
                    {t(source.labelKey)}
                  </a>
                </cite>
              </li>
            ))}
          </ul>
          <p className="mt-5 pt-5 border-t border-nd-border font-sans text-xs text-nd-secondary">
            {t("stats.verifiedBy")} {" "}
            <InternalLink to="/about" rel="author" className="font-semibold text-nd-primary underline underline-offset-2">
              Arnaud Bellemare
            </InternalLink>{" "}
            — {t("stats.authorRole")}. {" "}
            <time dateTime="2026-08-31">{t("stats.updated")}</time>.
          </p>
          <p className="mt-2 font-sans text-xs text-nd-secondary">
            {t("stats.trustLinksIntro")} {" "}
            <a href={contactHref} onClick={goToContact} className="underline underline-offset-2">
              {t("stats.contactLink")}
            </a>{", "}
            <InternalLink to="/privacy" className="underline underline-offset-2">
              {t("stats.privacyLink")}
            </InternalLink>{" "}
            · {" "}
            <InternalLink to="/terms" className="underline underline-offset-2">
              {t("stats.termsLink")}
            </InternalLink>.
          </p>
        </div>

        <ScrollReveal delay={0.12} amount={0.2}>
          <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center px-2">
            <p className="font-sans text-base lg:text-lg text-nd-secondary max-w-md">
              {t("stats.afterLead")}
            </p>
            <a
              href={contactHref}
              onClick={goToContact}
              title={t("stats.afterCta")}
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
