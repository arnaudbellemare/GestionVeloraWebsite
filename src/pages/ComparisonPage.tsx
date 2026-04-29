import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { useLocale } from "../context/LocaleContext";
import { getComparisonBySlug } from "../data/comparisons";
import { useGoToContact } from "../hooks/useGoToContact";

export function ComparisonPage() {
  const { comparisonSlug } = useParams<{ comparisonSlug: string }>();
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { contactHref, goToContact } = useGoToContact();
  const isEn = locale === "en";

  const page = comparisonSlug ? getComparisonBySlug(comparisonSlug) : null;
  if (!page) return <Navigate to="/compare" replace />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pt-24 lg:pt-32 pb-24 lg:pb-32"
    >
      <section className="px-6 lg:px-16 pb-14 lg:pb-16 border-b border-nd-border bg-nd-canvas">
        <div className="max-w-[90rem] mx-auto">
          <Breadcrumbs
            items={[
              { label: t("breadcrumb.home"), to: "/" },
              { label: isEn ? "Comparison guides" : "Guides comparatifs", to: "/compare" },
              { label: isEn ? page.titleEn : page.titleFr },
            ]}
          />
          <h1 id="comparison-hero" className="font-sans font-medium text-4xl lg:text-5xl text-nd-display leading-[1.05] tracking-[-0.02em] mt-4 mb-5 max-w-4xl">
            {isEn ? page.heroEn : page.heroFr}
          </h1>
          <p className="font-sans text-lg text-black/70 dark:text-white/70 max-w-3xl mb-8">
            {isEn ? page.descriptionEn : page.descriptionFr}
          </p>
          <a
            href={contactHref}
            onClick={goToContact}
            className="inline-flex items-center justify-center min-h-[44px] px-7 py-3.5 rounded-full bg-black text-white font-sans font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            {isEn ? page.ctaEn : page.ctaFr}
          </a>
        </div>
      </section>

      <section id="comparison-framework" className="px-6 lg:px-16 py-16 lg:py-20 bg-nd-canvas">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {page.sections.map((section, i) => (
            <ScrollReveal key={section.headingEn} delay={i * 0.06}>
              <article className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 lg:p-8 h-full">
                <h2 id={`comparison-section-${i + 1}`} className="font-sans font-semibold text-2xl text-nd-display mb-4">
                  {isEn ? section.headingEn : section.headingFr}
                </h2>
                <p className="font-sans text-sm lg:text-base text-black/75 dark:text-white/75 leading-relaxed mb-5">
                  {isEn ? section.bodyEn : section.bodyFr}
                </p>
                <ul className="space-y-2.5">
                  {(isEn ? section.pointsEn : section.pointsFr).map((point) => (
                    <li key={point} className="font-sans text-sm lg:text-base text-black/80 dark:text-white/80 flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-nd-primary shrink-0" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-16 py-12 lg:py-14 border-y border-nd-border bg-nd-surface">
        <div className="max-w-[90rem] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <p className="font-sans text-base lg:text-lg text-nd-secondary max-w-2xl">
            {isEn
              ? "Need a concrete recommendation based on your building constraints, board maturity, and risk profile?"
              : "Besoin d'une recommandation concrete selon vos contraintes d'immeuble, la maturite du CA et votre profil de risque?"}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={contactHref}
              onClick={goToContact}
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-full bg-black text-white font-sans font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              {isEn ? "Request a proposal" : "Demander une proposition"}
            </a>
            <InternalLink
              to="/compare"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full border border-black/20 dark:border-white/20 text-black/85 dark:text-white/85 font-sans text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {isEn ? "Back to all comparisons" : "Retour aux comparatifs"}
            </InternalLink>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
