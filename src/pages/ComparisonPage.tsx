import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { useLocale } from "../context/LocaleContext";
import { getComparisonBySlug } from "../data/comparisons";
import { useGoToContact } from "../hooks/useGoToContact";

function StatusMark({ positive }: { positive: boolean }) {
  return (
    <span
      aria-label={positive ? "Oui" : "Non"}
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm ${
        positive ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-600 dark:bg-white/10 dark:text-white/70"
      }`}
    >
      {positive ? "✅" : "❌"}
    </span>
  );
}

export function ComparisonPage() {
  const { comparisonSlug } = useParams<{ comparisonSlug: string }>();
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { contactHref, goToContact } = useGoToContact();
  const isEn = locale === "en";

  const page = comparisonSlug ? getComparisonBySlug(comparisonSlug) : null;
  if (!page) return <Navigate to="/compare" replace />;

  const copy = (en: string, fr: string) => (isEn ? en : fr);
  const listCopy = (en: string[], fr: string[]) => (isEn ? en : fr);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pt-24 lg:pt-32 pb-24 lg:pb-32 bg-nd-canvas"
    >
      <section className="px-6 lg:px-16 pb-14 lg:pb-16 border-b border-nd-border">
        <div className="max-w-[90rem] mx-auto">
          <Breadcrumbs
            items={[
              { label: t("breadcrumb.home"), to: "/" },
              { label: isEn ? "Comparison guides" : "Guides comparatifs", to: "/compare" },
              { label: copy(page.titleEn, page.titleFr) },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-10 lg:gap-16 mt-4">
            <div>
              <h1 id="comparison-hero" className="font-sans font-medium text-4xl lg:text-6xl text-nd-display leading-[1.03] tracking-[-0.02em] mb-5 max-w-5xl">
                {copy(page.h1En, page.h1Fr)}
              </h1>
              <p className="font-sans text-xl lg:text-2xl text-black/78 dark:text-white/78 max-w-4xl mb-5 leading-snug">
                {copy(page.heroEn, page.heroFr)}
              </p>
              <p className="font-sans text-base lg:text-lg text-black/68 dark:text-white/68 max-w-3xl mb-8 leading-relaxed">
                {copy(page.descriptionEn, page.descriptionFr)}
              </p>
              <a
                href={contactHref}
                onClick={goToContact}
                className="inline-flex items-center justify-center min-h-[44px] px-7 py-3.5 rounded-full bg-black text-white font-sans font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                {copy(page.ctaEn, page.ctaFr)}
              </a>
            </div>

            <aside className="border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5 lg:p-6 h-fit">
              <h2 className="font-sans font-semibold text-sm uppercase tracking-[0.08em] text-black/55 dark:text-white/55 mb-4">
                {isEn ? "Fast fit check" : "Fit rapide"}
              </h2>
              <div className="space-y-5">
                <div>
                  <h3 className="font-sans font-semibold text-base text-nd-display mb-2">{isEn ? "Best for" : "Meilleur pour"}</h3>
                  <ul className="space-y-2">
                    {listCopy(page.bestForEn, page.bestForFr).map((item) => (
                      <li key={item} className="font-sans text-sm text-black/72 dark:text-white/72 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-base text-nd-display mb-2">{isEn ? "Not best for" : "Moins adapte pour"}</h3>
                  <ul className="space-y-2">
                    {listCopy(page.notBestForEn, page.notBestForFr).map((item) => (
                      <li key={item} className="font-sans text-sm text-black/72 dark:text-white/72 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="comparison-tradeoffs" className="px-6 lg:px-16 py-14 lg:py-16 border-b border-nd-border bg-nd-surface">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14">
          <ScrollReveal>
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.08em] text-black/55 dark:text-white/55 mb-3">
                {isEn ? "Honest comparison" : "Comparatif honnete"}
              </p>
              <h2 className="font-sans font-semibold text-3xl lg:text-4xl text-nd-display leading-tight">
                {isEn ? "Where the other option genuinely wins" : "La ou l'autre option gagne vraiment"}
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {listCopy(page.whereAlternativeWinsEn, page.whereAlternativeWinsFr).map((item) => (
                <li key={item} className="border-l-2 border-nd-primary pl-4 font-sans text-sm lg:text-base text-black/74 dark:text-white/74 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section id="comparison-framework" className="px-6 lg:px-16 py-16 lg:py-20">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {page.sections.map((section, i) => (
            <ScrollReveal key={section.headingEn} delay={i * 0.06}>
              <article className="border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 lg:p-8 h-full">
                <h2 id={`comparison-section-${i + 1}`} className="font-sans font-semibold text-2xl text-nd-display mb-4">
                  {copy(section.headingEn, section.headingFr)}
                </h2>
                <p className="font-sans text-sm lg:text-base text-black/75 dark:text-white/75 leading-relaxed mb-5">
                  {copy(section.bodyEn, section.bodyFr)}
                </p>
                <ul className="space-y-2.5">
                  {listCopy(section.pointsEn, section.pointsFr).map((point) => (
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

      <section id="feature-comparison" className="px-6 lg:px-16 py-16 lg:py-20 border-y border-nd-border bg-nd-surface">
        <div className="max-w-[90rem] mx-auto">
          <div className="max-w-3xl mb-8">
            <p className="font-sans text-sm uppercase tracking-[0.08em] text-black/55 dark:text-white/55 mb-3">
              {isEn ? "Feature comparison" : "Comparaison des fonctionnalites"}
            </p>
            <h2 className="font-sans font-semibold text-3xl lg:text-4xl text-nd-display leading-tight">
              {isEn ? "Side-by-side operating fit" : "Fit operationnel cote a cote"}
            </h2>
          </div>
          <div className="overflow-x-auto border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02]">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10">
                  <th className="w-[22%] p-4 lg:p-5 font-sans text-sm font-semibold text-black/62 dark:text-white/62">
                    {isEn ? "Decision factor" : "Critere"}
                  </th>
                  <th className="w-[39%] p-4 lg:p-5 font-sans text-sm font-semibold text-nd-display">
                    {copy(page.primaryColumnEn, page.primaryColumnFr)}
                  </th>
                  <th className="w-[39%] p-4 lg:p-5 font-sans text-sm font-semibold text-nd-display">
                    {copy(page.alternativeColumnEn, page.alternativeColumnFr)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {page.featureRows.map((row) => (
                  <tr key={row.labelEn} className="border-b border-black/8 dark:border-white/10 last:border-b-0">
                    <th className="p-4 lg:p-5 align-top font-sans text-sm lg:text-base font-semibold text-nd-display">
                      {copy(row.labelEn, row.labelFr)}
                    </th>
                    <td className="p-4 lg:p-5 align-top">
                      <div className="flex items-start gap-3">
                        <StatusMark positive={row.veloraPositive} />
                        <p className="font-sans text-sm lg:text-base text-black/74 dark:text-white/74 leading-relaxed">{copy(row.veloraEn, row.veloraFr)}</p>
                      </div>
                    </td>
                    <td className="p-4 lg:p-5 align-top">
                      <div className="flex items-start gap-3">
                        <StatusMark positive={row.alternativePositive} />
                        <p className="font-sans text-sm lg:text-base text-black/74 dark:text-white/74 leading-relaxed">{copy(row.alternativeEn, row.alternativeFr)}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="pricing-comparison" className="px-6 lg:px-16 py-16 lg:py-20">
        <div className="max-w-[90rem] mx-auto">
          <div className="max-w-3xl mb-8">
            <p className="font-sans text-sm uppercase tracking-[0.08em] text-black/55 dark:text-white/55 mb-3">
              {isEn ? "Pricing comparison" : "Comparaison des prix"}
            </p>
            <h2 className="font-sans font-semibold text-3xl lg:text-4xl text-nd-display leading-tight">
              {isEn ? "Compare the real cost, not only the quote" : "Comparer le cout reel, pas seulement le devis"}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {page.pricingRows.map((row) => (
              <article key={row.itemEn} className="border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 lg:p-7">
                <h3 className="font-sans font-semibold text-xl text-nd-display mb-5">{copy(row.itemEn, row.itemFr)}</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-sans text-xs uppercase tracking-[0.08em] text-black/50 dark:text-white/50 mb-1">{copy(page.primaryColumnEn, page.primaryColumnFr)}</dt>
                    <dd className="font-sans text-sm lg:text-base text-black/74 dark:text-white/74">{copy(row.veloraEn, row.veloraFr)}</dd>
                  </div>
                  <div>
                    <dt className="font-sans text-xs uppercase tracking-[0.08em] text-black/50 dark:text-white/50 mb-1">{copy(page.alternativeColumnEn, page.alternativeColumnFr)}</dt>
                    <dd className="font-sans text-sm lg:text-base text-black/74 dark:text-white/74">{copy(row.alternativeEn, row.alternativeFr)}</dd>
                  </div>
                </dl>
                <p className="mt-5 pt-5 border-t border-black/10 dark:border-white/10 font-sans text-sm text-black/62 dark:text-white/62 leading-relaxed">
                  {copy(row.noteEn, row.noteFr)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {page.alternatives ? (
        <section id="alternatives-list" className="px-6 lg:px-16 py-16 lg:py-20 border-y border-nd-border bg-nd-surface">
          <div className="max-w-[90rem] mx-auto">
            <div className="max-w-3xl mb-8">
              <p className="font-sans text-sm uppercase tracking-[0.08em] text-black/55 dark:text-white/55 mb-3">
                {isEn ? "Alternatives list" : "Liste d'alternatives"}
              </p>
              <h2 className="font-sans font-semibold text-3xl lg:text-4xl text-nd-display leading-tight">
                {isEn ? "Montreal property management alternatives" : "Alternatives en gestion immobiliere a Montreal"}
              </h2>
            </div>
            <div className="space-y-4">
              {page.alternatives.map((alternative, index) => (
                <article key={alternative.name} className="grid grid-cols-1 lg:grid-cols-[12rem_minmax(0,1fr)_minmax(0,1fr)] gap-5 border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5 lg:p-6">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.08em] text-black/45 dark:text-white/45 mb-2">
                      #{index + 1}
                    </p>
                    <h3 className="font-sans font-semibold text-xl text-nd-display">
                      {alternative.name}
                    </h3>
                    {alternative.isVelora ? (
                      <p className="mt-2 font-sans text-xs uppercase tracking-[0.08em] text-nd-primary">
                        {isEn ? "Our pick" : "Notre choix"}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.08em] text-black/50 dark:text-white/50 mb-2">{isEn ? "Best for" : "Meilleur pour"}</p>
                    <p className="font-sans text-sm lg:text-base text-black/74 dark:text-white/74 leading-relaxed mb-4">
                      {copy(alternative.bestForEn, alternative.bestForFr)}
                    </p>
                    <p className="font-sans text-xs uppercase tracking-[0.08em] text-black/50 dark:text-white/50 mb-2">{isEn ? "Not best for" : "Moins adapte pour"}</p>
                    <p className="font-sans text-sm lg:text-base text-black/74 dark:text-white/74 leading-relaxed">
                      {copy(alternative.notBestForEn, alternative.notBestForFr)}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.08em] text-black/50 dark:text-white/50 mb-2">{isEn ? "Strengths" : "Forces"}</p>
                      <ul className="space-y-2">
                        {listCopy(alternative.strengthsEn, alternative.strengthsFr).map((item) => (
                          <li key={item} className="font-sans text-sm text-black/74 dark:text-white/74 leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.08em] text-black/50 dark:text-white/50 mb-2">{isEn ? "Check first" : "A verifier"}</p>
                      <ul className="space-y-2">
                        {listCopy(alternative.cautionsEn, alternative.cautionsFr).map((item) => (
                          <li key={item} className="font-sans text-sm text-black/74 dark:text-white/74 leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="switching-story" className="px-6 lg:px-16 py-16 lg:py-20">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14">
          <div>
            <p className="font-sans text-sm uppercase tracking-[0.08em] text-black/55 dark:text-white/55 mb-3">
              {isEn ? "Switching story" : "Histoire de bascule"}
            </p>
            <h2 className="font-sans font-semibold text-3xl lg:text-4xl text-nd-display leading-tight">
              {copy(page.switchingStory.titleEn, page.switchingStory.titleFr)}
            </h2>
            <p className="mt-4 font-sans text-sm text-black/55 dark:text-white/55 leading-relaxed">
              {copy(page.switchingStory.disclosureEn, page.switchingStory.disclosureFr)}
            </p>
          </div>
          <article className="border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 lg:p-8">
            <p className="font-sans text-base lg:text-lg text-black/76 dark:text-white/76 leading-relaxed mb-6">
              {copy(page.switchingStory.contextEn, page.switchingStory.contextFr)}
            </p>
            <ul className="space-y-3 mb-6">
              {listCopy(page.switchingStory.actionsEn, page.switchingStory.actionsFr).map((item) => (
                <li key={item} className="flex items-start gap-3 font-sans text-sm lg:text-base text-black/78 dark:text-white/78 leading-relaxed">
                  <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-black text-white text-[11px] flex items-center justify-center">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="pt-6 border-t border-black/10 dark:border-white/10 font-sans text-base lg:text-lg text-nd-display leading-relaxed">
              {copy(page.switchingStory.outcomeEn, page.switchingStory.outcomeFr)}
            </p>
          </article>
        </div>
      </section>

      <section id="comparison-faq" className="px-6 lg:px-16 py-16 lg:py-20 border-y border-nd-border bg-nd-surface">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-14">
          <div>
            <p className="font-sans text-sm uppercase tracking-[0.08em] text-black/55 dark:text-white/55 mb-3">
              FAQ
            </p>
            <h2 className="font-sans font-semibold text-3xl lg:text-4xl text-nd-display leading-tight">
              {isEn ? "Questions buyers ask before switching" : "Questions avant de changer"}
            </h2>
          </div>
          <div className="divide-y divide-black/10 dark:divide-white/10 border-y border-black/10 dark:border-white/10">
            {page.faqs.map((faq) => (
              <details key={faq.questionEn} className="group py-5">
                <summary className="cursor-pointer list-none font-sans font-semibold text-lg text-nd-display flex items-center justify-between gap-4">
                  <span>{copy(faq.questionEn, faq.questionFr)}</span>
                  <span className="text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 font-sans text-sm lg:text-base text-black/70 dark:text-white/70 leading-relaxed pr-8">
                  {copy(faq.answerEn, faq.answerFr)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-16 py-12 lg:py-14 bg-nd-canvas">
        <div className="max-w-[90rem] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="font-sans text-base lg:text-lg text-nd-secondary max-w-2xl mb-4">
              {isEn
                ? "Need a recommendation based on your building constraints, board maturity, and risk profile?"
                : "Besoin d'une recommandation selon vos contraintes d'immeuble, la maturite du CA et votre profil de risque?"}
            </p>
            <nav className="flex flex-wrap gap-2" aria-label={isEn ? "Related pages" : "Pages reliees"}>
              {page.internalLinks.map((link) => (
                <InternalLink
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-full border border-black/15 dark:border-white/15 text-black/75 dark:text-white/75 font-sans text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {copy(link.labelEn, link.labelFr)}
                </InternalLink>
              ))}
            </nav>
          </div>
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
