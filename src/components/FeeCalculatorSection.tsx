import { useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { InternalLink } from "./InternalLink";
import { ScrollReveal } from "./ScrollReveal";
import { useGoToContact } from "../hooks/useGoToContact";
import { useLocale } from "../context/LocaleContext";

/** Published condo-management rates, per unit per month, before taxes (see /tarifs). */
const BASE_RATE = 33;
const UPPER_RATE = 36;
const INTEGRATIONS_RATE = 40;
const MIN_UNITS = 6;
const MAX_UNITS = 999;

const FEE_STUDY_PATH = "/blog/etude-frais-gestion-immobiliere-quebec-2026";

const rateCards = [
  { rate: BASE_RATE, key: "base" },
  { rate: UPPER_RATE, key: "upper" },
  { rate: INTEGRATIONS_RATE, key: "integrations" },
] as const;

const includedKeys = ["aga", "reports", "registers", "reserve", "tenders", "emergency"] as const;

export function FeeCalculatorSection() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { contactHref, goToContact } = useGoToContact();
  const inputId = useId();
  const toggleId = useId();
  const [rawUnits, setRawUnits] = useState("");
  const [withIntegrations, setWithIntegrations] = useState(false);

  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
        style: "currency",
        currency: "CAD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const units = Number.parseInt(rawUnits, 10);
  const hasInput = rawUnits.trim() !== "" && Number.isFinite(units);
  const tooSmall = hasInput && units < MIN_UNITS;
  const valid = hasInput && units >= MIN_UNITS && units <= MAX_UNITS;
  const upper = withIntegrations ? INTEGRATIONS_RATE : UPPER_RATE;

  const monthlyFrom = valid ? units * BASE_RATE : 0;
  const monthlyTo = valid ? units * upper : 0;

  return (
    <section
      id="calculateur"
      aria-labelledby="fee-calculator-title"
      className="py-24 lg:py-32 px-6 lg:px-16 bg-nd-canvas scroll-mt-24"
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-start">
          {/* Copy, rate cards and what is included */}
          <div>
            <ScrollReveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-nd-secondary mb-4">
                {t("feeCalculator.eyebrow")}
              </p>
              <h2
                id="fee-calculator-title"
                className="font-sans font-medium text-3xl sm:text-4xl text-nd-display leading-[1.1] tracking-[-0.02em] mb-5"
              >
                {t("feeCalculator.title")}
              </h2>
              <p className="font-sans text-base lg:text-lg text-nd-secondary leading-relaxed max-w-[56ch]">
                {t("feeCalculator.lead")}
              </p>
            </ScrollReveal>

            <div className="mt-8 grid grid-cols-3 divide-x divide-nd-border border-y border-nd-border">
              {rateCards.map((card, i) => (
                <ScrollReveal key={card.key} delay={0.05 + i * 0.06}>
                  <div className="flex h-full flex-col py-5 px-3 sm:px-5 first:pl-0 last:pr-0 min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-nd-secondary mb-2 leading-snug min-h-[2.75em]">
                      {t(`feeCalculator.rates.${card.key}`)}
                    </p>
                    <p className="font-stat-numeral font-semibold text-2xl sm:text-3xl text-nd-display leading-none tracking-[-0.02em]">
                      {money.format(card.rate)}
                    </p>
                    <p className="font-sans text-xs text-nd-secondary mt-1.5">{t("feeCalculator.perUnit")}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.2}>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-nd-secondary mt-8 mb-3">
                {t("feeCalculator.includedHeading")}
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 font-sans text-sm text-nd-primary">
                {includedKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-nd-primary" />
                    <span>{t(`feeCalculator.included.${key}`)}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-xs text-nd-secondary mt-4 leading-relaxed">
                {t("feeCalculator.footnote")}{" "}
                <InternalLink to="/tarifs" className="underline underline-offset-2 text-nd-primary hover:text-nd-display">
                  {t("feeCalculator.fullGridLink")}
                </InternalLink>
                .
              </p>
            </ScrollReveal>
          </div>

          {/* Calculator */}
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-nd-border bg-white dark:bg-white/5 p-6 sm:p-8 lg:p-10 shadow-sm">
              <label htmlFor={inputId} className="block font-mono text-[11px] uppercase tracking-[0.12em] text-nd-secondary mb-2">
                {t("feeCalculator.inputLabel")}
              </label>
              <p className="font-sans text-sm text-nd-secondary mb-4">{t("feeCalculator.inputHelp")}</p>
              <input
                id={inputId}
                type="number"
                inputMode="numeric"
                min={MIN_UNITS}
                max={MAX_UNITS}
                step={1}
                value={rawUnits}
                onChange={(e) => setRawUnits(e.target.value)}
                placeholder={t("feeCalculator.inputPlaceholder")}
                aria-describedby={`${inputId}-result`}
                className="w-full rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-white/5 px-5 py-4 font-stat-numeral text-2xl sm:text-3xl text-nd-display placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-nd-primary/40"
              />

              <label htmlFor={toggleId} className="mt-5 flex items-start gap-3 cursor-pointer select-none">
                <input
                  id={toggleId}
                  type="checkbox"
                  checked={withIntegrations}
                  onChange={(e) => setWithIntegrations(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-black/30 dark:border-white/40 bg-white dark:bg-white/5 text-white dark:text-black transition-colors peer-checked:border-neutral-950 peer-checked:bg-neutral-950 dark:peer-checked:border-white dark:peer-checked:bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-nd-primary/40"
                >
                  <svg viewBox="0 0 16 16" className={`h-3 w-3 ${withIntegrations ? "opacity-100" : "opacity-0"}`} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                </span>
                <span className="font-sans text-sm text-nd-primary leading-snug">
                  {t("feeCalculator.integrationsToggle")}{" "}
                  <span className="text-nd-secondary">{t("feeCalculator.integrationsNote")}</span>
                </span>
              </label>

              <div
                id={`${inputId}-result`}
                aria-live="polite"
                className="mt-7 pt-7 border-t border-nd-border min-h-[7.5rem]"
              >
                {valid ? (
                  <>
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-nd-secondary mb-2">
                      {t("feeCalculator.resultLabel", { units })}
                    </p>
                    <p className="font-stat-numeral font-semibold text-4xl sm:text-5xl text-nd-display leading-none tracking-[-0.02em]">
                      {money.format(monthlyFrom)}
                      <span className="font-sans font-normal text-base text-nd-secondary tracking-normal">
                        {" "}
                        {t("feeCalculator.perMonth")}
                      </span>
                    </p>
                    <p className="font-sans text-sm text-nd-secondary mt-3 leading-relaxed">
                      {t("feeCalculator.rangeLine", {
                        from: money.format(monthlyFrom),
                        to: money.format(monthlyTo),
                        rateFrom: money.format(BASE_RATE),
                        rateTo: money.format(upper),
                      })}
                    </p>
                    <p className="font-sans text-sm text-nd-secondary mt-1">
                      {t("feeCalculator.annualLine", {
                        from: money.format(monthlyFrom * 12),
                        to: money.format(monthlyTo * 12),
                      })}
                    </p>
                  </>
                ) : tooSmall ? (
                  <p className="font-sans text-sm text-nd-primary leading-relaxed">
                    {t("feeCalculator.tooSmall", { min: MIN_UNITS })}
                  </p>
                ) : (
                  <p className="font-sans text-sm text-nd-secondary leading-relaxed">{t("feeCalculator.emptyState")}</p>
                )}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href={contactHref}
                  onClick={goToContact}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-neutral-950 text-white font-sans font-semibold text-sm hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white/90 transition-colors"
                >
                  {t("feeCalculator.ctaQuote")}
                </a>
                <InternalLink
                  to={FEE_STUDY_PATH}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-black/15 dark:border-white/20 font-sans font-medium text-sm text-nd-primary hover:border-black/40 dark:hover:border-white/50 transition-colors"
                >
                  {t("feeCalculator.ctaCompare")}
                </InternalLink>
              </div>
              <p className="font-sans text-xs text-nd-secondary mt-4">{t("feeCalculator.disclaimer")}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
