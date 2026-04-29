import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { COMPARISON_PAGES } from "../data/comparisons";

export function CompareIndexPage() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const isEn = locale === "en";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pt-24 lg:pt-32 pb-24 lg:pb-32"
    >
      <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
        <Breadcrumbs
          items={[
            { label: t("breadcrumb.home"), to: "/" },
            { label: isEn ? "Comparison guides" : "Guides comparatifs" },
          ]}
        />

        <ScrollReveal>
          <h1 id="comparison-guides" className="font-sans font-medium text-4xl lg:text-5xl text-nd-display leading-[1.05] tracking-[-0.02em] mb-4">
            {isEn ? "Property management comparison guides" : "Guides comparatifs en gestion immobiliere"}
          </h1>
          <p className="font-sans text-lg text-black/70 dark:text-white/70 max-w-3xl mb-14">
            {isEn
              ? "Clear side-by-side frameworks for condo boards, landlords, and investors deciding between management models in Montreal."
              : "Des cadres de comparaison clairs pour les syndicats, proprietaires et investisseurs qui evaluent leurs options de gestion a Montreal."}
          </p>
        </ScrollReveal>

        <section id="comparison-list" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" aria-label={isEn ? "Comparison pages" : "Pages de comparaison"}>
          {COMPARISON_PAGES.map((page, i) => (
            <ScrollReveal key={page.slug} delay={i * 0.06}>
              <article className="h-full rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 lg:p-8">
                <h2 className="font-sans font-semibold text-xl text-nd-display mb-3">
                  {isEn ? page.titleEn : page.titleFr}
                </h2>
                <p className="font-sans text-sm text-black/70 dark:text-white/70 mb-6">
                  {isEn ? page.descriptionEn : page.descriptionFr}
                </p>
                <InternalLink
                  to={`/compare/${page.slug}`}
                  className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-black text-white font-sans font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  {isEn ? "Read comparison" : "Lire le comparatif"}
                </InternalLink>
              </article>
            </ScrollReveal>
          ))}
        </section>
      </div>
    </motion.div>
  );
}
