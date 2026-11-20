import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLocale } from "../context/LocaleContext";
import { ScrollReveal } from "../components/ScrollReveal";
import { useGoToContact } from "../hooks/useGoToContact";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { getPricingContent } from "../data/pricing";

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function TarifsPage() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { contactHref, goToContact } = useGoToContact();
  const isEn = locale === "en";

  useEffect(() => {
    document.title = isEn
      ? "Property Management Pricing Montreal | Gestion Velora"
      : "Tarifs gestion immobilière Montréal | Gestion Velora";
    setMeta(
      "description",
      isEn
        ? "Transparent property management pricing in Montreal. Condo board, Airbnb, and rental management fees with no hidden costs."
        : "Tarifs transparents pour la gestion immobilière à Montréal. Syndicat de copropriété, Airbnb et location longue durée, sans frais cachés."
    );
  }, [isEn]);

  const pricing = getPricingContent(locale);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="pt-24 lg:pt-32 pb-24 px-6 lg:px-16"
    >
      <div className="max-w-[90rem] mx-auto">
        <Breadcrumbs
          items={[
            { label: t("breadcrumb.home"), to: "/" },
            { label: pricing.breadcrumb },
          ]}
        />

        <div className="mb-16 mt-8">
          <h1 className="font-playfair font-semibold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-nd-display mb-4">
            {pricing.h1}
          </h1>
          <p className="font-sans text-base lg:text-lg text-nd-secondary max-w-2xl">
            {pricing.intro}
          </p>
        </div>

        {/* Syndicat section */}
        <section className="mb-20">
          <ScrollReveal className="mb-10">
            <h2 id="pricing-condo-board" className="font-sans font-semibold text-2xl lg:text-3xl text-nd-display tracking-[-0.015em]">
              {pricing.syndicat.heading}
            </h2>
            <p className="font-sans text-nd-secondary mt-2 max-w-3xl">
              {pricing.syndicat.intro}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {pricing.syndicat.tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.08}>
                <div
                  className={`rounded-2xl border p-8 flex flex-col h-full ${
                    tier.highlighted
                      ? "border-nd-primary bg-nd-primary/5"
                      : "border-nd-border bg-nd-canvas"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-nd-primary mb-3">
                      {pricing.syndicat.highlightLabel}
                    </span>
                  )}
                  <h3 id={`pricing-condo-tier-${i + 1}`} className="font-sans font-semibold text-xl text-nd-display mb-1">{tier.name}</h3>
                  <p className="font-sans font-medium text-nd-primary text-lg mb-3">{tier.priceNote}</p>
                  <p className="font-sans text-sm text-nd-secondary mb-6 leading-relaxed">{tier.description}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 font-sans text-sm text-nd-primary">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nd-primary" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={contactHref}
                    onClick={goToContact}
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-sans font-semibold text-sm uppercase tracking-[0.1em] transition-colors ${
                      tier.highlighted
                        ? "bg-nd-primary text-white hover:bg-nd-primary/90"
                        : "border border-nd-border text-nd-primary hover:border-nd-primary/50"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Location section */}
        <section className="mb-20">
          <ScrollReveal className="mb-10">
            <h2 id="pricing-rental-management" className="font-sans font-semibold text-2xl lg:text-3xl text-nd-display tracking-[-0.015em]">
              {pricing.location.heading}
            </h2>
            <p className="font-sans text-nd-secondary mt-2 max-w-3xl">
              {pricing.location.intro}
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            {pricing.location.tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.08}>
                <div
                  className={`rounded-2xl border p-8 flex flex-col h-full ${
                    tier.highlighted
                      ? "border-nd-primary bg-nd-primary/5"
                      : "border-nd-border bg-nd-canvas"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-nd-primary mb-3">
                      {pricing.location.highlightLabel}
                    </span>
                  )}
                  <h3 id={`pricing-rental-tier-${i + 1}`} className="font-sans font-semibold text-xl text-nd-display mb-1">{tier.name}</h3>
                  <p className="font-sans font-medium text-nd-primary text-lg mb-3">{tier.priceNote}</p>
                  <p className="font-sans text-sm text-nd-secondary mb-6 leading-relaxed">{tier.description}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 font-sans text-sm text-nd-primary">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nd-primary" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={contactHref}
                    onClick={goToContact}
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-sans font-semibold text-sm uppercase tracking-[0.1em] transition-colors ${
                      tier.highlighted
                        ? "bg-nd-primary text-white hover:bg-nd-primary/90"
                        : "border border-nd-border text-nd-primary hover:border-nd-primary/50"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Airbnb note */}
        <section className="mb-20">
          <ScrollReveal>
            <div className="rounded-2xl border border-nd-border bg-nd-surface p-8 max-w-2xl">
              <h2 id="pricing-airbnb-short-term" className="font-sans font-semibold text-xl text-nd-display mb-2">
                {pricing.airbnb.heading}
              </h2>
              <p className="font-sans text-nd-secondary mb-4">
                {pricing.airbnb.body}
              </p>
              <a
                href={contactHref}
                onClick={goToContact}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-sans font-semibold text-sm uppercase tracking-[0.1em] border border-nd-border text-nd-primary hover:border-nd-primary/50 transition-colors"
              >
                {pricing.airbnb.cta}
              </a>
            </div>
          </ScrollReveal>
        </section>

        {/* FAQ */}
        <section>
          <ScrollReveal className="mb-8">
            <h2 id="pricing-faq" className="font-sans font-semibold text-2xl text-nd-display">
              {pricing.faq.heading}
            </h2>
          </ScrollReveal>
          <div className="max-w-2xl space-y-6">
            {pricing.faq.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <div className="border-b border-nd-border pb-6">
                  <h3 id={`pricing-faq-item-${i + 1}`} className="font-sans font-medium text-nd-display mb-2">{item.q}</h3>
                  <p className="font-sans text-nd-secondary text-sm leading-relaxed">{item.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
