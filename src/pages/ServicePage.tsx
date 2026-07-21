import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { useLocale } from "../context/LocaleContext";
import { useGoToContact } from "../hooks/useGoToContact";
import { getLocalizedService, SERVICE_SLUGS, type ServiceSlug } from "../data/services";

function toAnchorId(title: string) {
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return "#" + slug;
}

function scrollToBlock(e: React.MouseEvent, blockTitle: string) {
  e.preventDefault();
  const id = toAnchorId(blockTitle).slice(1);
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function getGeoSummary(slug: ServiceSlug, isEn: boolean) {
  if (slug === "airbnb") {
    return {
      price: isEn
        ? "Typical Airbnb management fee: 18-25% of booking revenue, depending on volume, property type, and service scope."
        : "Frais de gestion Airbnb typiques : 18-25 % des revenus de réservation, selon le volume, le type de bien et le périmètre du mandat.",
      proof: isEn
        ? "Includes listing optimization, dynamic pricing, guest messaging, cleaning coordination, maintenance, and 2026 Montreal/CITQ compliance monitoring."
        : "Inclut optimisation des annonces, tarification dynamique, messages voyageurs, ménage, maintenance et suivi de conformité Montréal/CITQ 2026.",
      compareTo: "/compare/airbnb-vs-location-longue-duree-montreal",
    };
  }

  if (slug === "location") {
    return {
      price: isEn
        ? "Long-term rental management fee: structured as one month's gross rent under the mandate terms."
        : "Honoraires de gestion locative longue durée : structure équivalente à un mois de loyer brut selon les modalités du mandat.",
      proof: isEn
        ? "Covers tenant screening, Quebec lease support, rent collection, maintenance coordination, TAL-aware follow-up, and monthly owner reporting."
        : "Couvre sélection locataire, baux du Québec, perception, maintenance, suivi conforme TAL et rapports mensuels propriétaire.",
      compareTo: "/compare/gestion-locative-interne-vs-externalisee",
    };
  }

  return {
    price: isEn
      ? "Condo board management pricing: typically $33-$36 per unit/month; up to $40 per unit/month with app and portal integrations."
      : "Tarifs de gestion de copropriété : généralement 33 $ à 36 $ / unité / mois ; jusqu'à 40 $ / unité / mois avec intégrations applicatives et portails.",
    proof: isEn
      ? "Covers AGM preparation, budgets, reserve fund oversight, maintenance logs, vendor coordination, owner communication, and 2026 Quebec co-ownership compliance."
      : "Couvre AGA, budgets, fonds de prévoyance, carnet d'entretien, fournisseurs, communications copropriétaires et conformité copropriété Québec 2026.",
    compareTo: "/compare/gestionnaire-vs-autogestion-condo",
  };
}

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { contactHref, goToContact } = useGoToContact();
  const [expandedDetail, setExpandedDetail] = useState<number | null>(null);
  const service =
    slug && SERVICE_SLUGS.includes(slug as ServiceSlug)
      ? getLocalizedService(slug as ServiceSlug, t)
      : null;

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24">
        <h1 className="font-sans font-medium text-2xl text-nd-display mb-4">{t("servicePage.notFound")}</h1>
        <InternalLink to="/services" className="font-sans text-waabi-pink hover:underline">
          {t("servicePage.backToServices")}
        </InternalLink>
      </div>
    );
  }

  const otherServices = SERVICE_SLUGS.filter((s) => s !== service.slug).map((s) => getLocalizedService(s, t));
  const isEn = locale === "en";
  const geoSummary = getGeoSummary(service.slug as ServiceSlug, isEn);

  const faqRaw = t(`services.${service.slug}.faq`, { returnObjects: true }) as unknown;
  const serviceFaq = Array.isArray(faqRaw)
    ? (faqRaw as { q: string; a: string }[])
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pt-24 lg:pt-32"
    >
      {/* Hero - Waabi style: clean, minimal */}
      <section className="relative min-h-[60vh] flex flex-col justify-end pb-16 lg:pb-24">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={`${service.title} — Gestion Velora`}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-16 w-full">
          <Breadcrumbs
            theme="onDark"
            items={[
              { label: t("breadcrumb.home"), to: "/" },
              { label: t("breadcrumb.services"), to: "/services" },
              { label: service.title },
            ]}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans font-medium text-4xl lg:text-6xl text-white leading-[1.05] tracking-[-0.02em] mb-4"
          >
            {service.subtitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-lg text-white/90 max-w-2xl"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      <section className="py-10 lg:py-12 bg-nd-canvas border-b border-nd-border">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
          <p className="font-sans text-base lg:text-lg text-black/80 dark:text-white/80 max-w-3xl mb-8">
            {t("servicePage.introLead")}
          </p>
          <aside className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] p-5 lg:p-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/65 dark:text-white/65 mb-2">
                {isEn ? "Pricing, proof, updated 2026" : "Tarif, preuve, mis à jour 2026"}
              </p>
              <p className="font-sans text-sm lg:text-base font-semibold text-nd-display leading-relaxed">
                {geoSummary.price}
              </p>
              <p className="mt-2 font-sans text-sm text-black/70 dark:text-white/70 leading-relaxed">
                {geoSummary.proof}
              </p>
            </div>
            <div className="flex flex-wrap content-start gap-2 lg:justify-end">
              <InternalLink
                to="/tarifs"
                className="inline-flex items-center justify-center rounded-full bg-waabi-pink px-4 py-2 text-sm font-semibold text-white hover:bg-waabi-pink/90"
              >
                {isEn ? "See pricing" : "Voir les tarifs"}
              </InternalLink>
              <InternalLink
                to={geoSummary.compareTo}
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-4 py-2 text-sm text-black/80 hover:border-waabi-pink/40 dark:border-white/15 dark:text-white/80"
              >
                {isEn ? "Compare options" : "Comparer"}
              </InternalLink>
              <InternalLink
                to="/trust-proof"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-4 py-2 text-sm text-black/80 hover:border-waabi-pink/40 dark:border-white/15 dark:text-white/80"
              >
                {isEn ? "Trust proof" : "Preuves"}
              </InternalLink>
            </div>
          </aside>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 sm:items-center">
            <InternalLink
              to="/blog"
              className="font-sans text-sm font-medium text-waabi-pink hover:underline underline-offset-2"
            >
              {t("servicePage.relatedInsightsLink")}
            </InternalLink>
            <span className="hidden sm:inline text-black/25 dark:text-white/25" aria-hidden>
              |
            </span>
            <div className="flex flex-wrap gap-3">
              {otherServices.map((s) => (
                <InternalLink
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="px-4 py-2 rounded-full border border-black/15 dark:border-white/15 text-black dark:text-white font-sans text-sm hover:border-waabi-pink/40 transition-colors"
                >
                  {s.title}
                </InternalLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      {serviceFaq.length > 0 && (
        <section
          className="py-10 lg:py-12 bg-nd-canvas border-b border-nd-border"
          aria-labelledby="service-faq-heading"
        >
          <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
            <h2
              id="service-faq-heading"
              className="font-sans font-medium text-xl lg:text-2xl text-nd-display tracking-[-0.02em] mb-6"
            >
              {t("servicePage.faqTitle")}
            </h2>
            <dl className="space-y-6 max-w-3xl">
              {serviceFaq.map((item) => (
                <div key={item.q}>
                  <dt className="font-sans font-semibold text-black dark:text-white text-base">{item.q}</dt>
                  <dd className="mt-2 font-sans text-sm lg:text-base text-black/75 dark:text-white/75 leading-relaxed">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Browse by - Category pills like Waabi */}
      <section className="py-12 lg:py-16 bg-nd-surface border-b border-nd-border">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
          <p className="font-sans text-sm text-black/60 dark:text-white/60 mb-4">{t("servicePage.browseBy")}</p>
          <div className="flex flex-wrap gap-3">
            {service.offerings.map((block) => (
              <a
                key={block.title}
                href={toAnchorId(block.title)}
                onClick={(e) => scrollToBlock(e, block.title)}
                className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white font-sans text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {block.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured - Cards like Waabi research */}
      <section className="py-16 lg:py-24 bg-nd-surface">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 id="service-offerings-heading" className="font-sans font-medium text-2xl lg:text-3xl text-nd-display mb-10 tracking-[-0.02em]">
              {t("servicePage.ourServices")}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {service.offerings.map((block, i) => (
              <ScrollReveal key={block.title} delay={i * 0.05}>
                <motion.article
                  id={toAnchorId(block.title).slice(1)}
                  className="group rounded-2xl border border-black/10 dark:border-white/10 p-7 lg:p-8 hover:border-waabi-pink/30 transition-colors bg-white dark:bg-white/[0.02] scroll-mt-24"
                >
                  <h3 className="font-sans font-medium text-xl lg:text-[1.6rem] text-nd-display mb-5 leading-[1.15]">
                    {block.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="font-sans text-sm lg:text-base text-black/80 dark:text-white/80 flex items-start gap-3"
                      >
                        <span className="text-waabi-pink mt-1 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Publications-style list */}
      <section className="py-16 lg:py-24 bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 id="service-details-heading" className="font-sans font-medium text-2xl lg:text-3xl text-nd-display mb-10 tracking-[-0.02em]">
              {t("servicePage.inDetail")}
            </h2>
          </ScrollReveal>

          <div className="space-y-1">
            {service.offerings.map((block, i) => {
              const isExpanded = expandedDetail === i;
              const detailItems = block.detailItems?.length ? block.detailItems : block.items;
              return (
                <ScrollReveal key={block.title} delay={i * 0.03}>
                  <div className="border-b border-black/5 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => setExpandedDetail(isExpanded ? null : i)}
                      className="w-full text-left py-5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group cursor-pointer flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1.5"
                    >
                      <span className="font-sans font-semibold text-lg text-black dark:text-white group-hover:text-waabi-pink transition-colors">
                        {block.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-sm text-black/65 dark:text-white/65">
                          {detailItems.length} {t("servicePage.items")}
                        </span>
                        <motion.span
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-black/40 dark:text-white/40 group-hover:text-waabi-pink transition-colors shrink-0"
                        >
                          →
                        </motion.span>
                      </div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <ul className="pl-0 lg:pl-4 pb-5 space-y-1.5">
                            {detailItems.map((item) => (
                              <li
                                key={item}
                                className="font-sans text-sm lg:text-base text-black/80 dark:text-white/80 flex items-start gap-3"
                              >
                                <span className="text-waabi-pink mt-0.5 shrink-0">•</span>
                                <span className="flex-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-12 border-y border-nd-border bg-nd-surface">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="font-sans font-medium text-nd-display mb-1">{t("servicePage.nextStepTitle")}</p>
            <p className="font-sans text-sm text-black/65 dark:text-white/65 max-w-xl">{t("servicePage.nextStepText")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={contactHref}
              onClick={goToContact}
              className="inline-flex shrink-0 items-center justify-center px-6 py-3 rounded-full bg-waabi-pink text-white font-sans font-bold text-sm hover:bg-waabi-pink/90 transition-colors min-h-[44px]"
            >
              {t("servicePage.planifyCall")}
            </a>
            <a
              href="tel:+15147771731"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full border border-black/20 dark:border-white/20 text-black/85 dark:text-white/85 font-sans text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              +1 514 777 1731
            </a>
          </div>
        </div>
      </section>

      {/* CTA - "We're just getting started" */}
      <section className="py-24 lg:py-32 bg-nd-surface">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 id="service-cta-heading" className="font-sans font-medium text-3xl lg:text-4xl text-nd-display mb-4 tracking-[-0.02em]">
              {t("servicePage.ctaTitle")}
            </h2>
            <p className="font-sans text-black/70 dark:text-white/70 mb-8 max-w-xl">
              {t("servicePage.ctaText")}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={contactHref}
                onClick={goToContact}
                className="inline-flex px-6 py-3 rounded-full bg-waabi-pink text-white font-sans font-bold text-sm hover:bg-waabi-pink/90 transition-colors"
              >
                {t("servicePage.scheduleCall")}
              </a>
              <a
                href="mailto:info@gestionvelora.com"
                className="inline-flex px-6 py-3 rounded-full border border-black/20 dark:border-white/20 text-black/80 dark:text-white/80 font-sans text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                info@gestionvelora.com
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}
