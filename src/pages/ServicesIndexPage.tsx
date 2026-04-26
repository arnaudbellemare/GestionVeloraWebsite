import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SERVICE_SLUGS, getLocalizedService } from "../data/services";
import { trackServiceListView, trackServiceSelect } from "../lib/analytics";
import { useLocale } from "../context/LocaleContext";

export function ServicesIndexPage() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const services = SERVICE_SLUGS.map((slug) => getLocalizedService(slug, t));
  const listName = "services_hub";
  const lastTrackedKey = useRef<string>("");
  const isEn = locale === "en";

  useEffect(() => {
    const trackKey = services.map((s) => `${s.slug}:${s.title}`).join("|");
    if (trackKey === lastTrackedKey.current) return;
    lastTrackedKey.current = trackKey;
    trackServiceListView(services, listName);
  }, [services, listName]);

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
            { label: t("breadcrumb.services") },
          ]}
        />

        <ScrollReveal>
          <h1 className="font-sans font-medium text-4xl lg:text-5xl text-nd-display leading-[1.05] tracking-[-0.02em] mb-4">
            {t("servicesHub.title")}
          </h1>
          <p className="font-sans text-lg text-black/70 dark:text-white/70 max-w-2xl mb-14">
            {t("servicesHub.subtitle")}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 0.06}>
              <article className="group flex flex-col h-full rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-white dark:bg-white/[0.02] hover:border-waabi-pink/30 transition-colors">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} — Gestion Velora Montréal`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: "center 30%" }}
                  />
                </div>
                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  <h2 className="font-sans font-medium text-xl lg:text-2xl text-nd-display mb-2">
                    {service.title}
                  </h2>
                  <p className="font-sans text-sm text-black/70 dark:text-white/70 flex-1 mb-6 line-clamp-4">
                    {service.description}
                  </p>
                  <InternalLink
                    to={`/services/${service.slug}`}
                    onClick={() => trackServiceSelect(service, listName, i)}
                    className="inline-flex self-start px-5 py-2.5 rounded-full bg-waabi-pink text-white font-sans font-semibold text-sm hover:bg-waabi-pink/90 transition-colors"
                  >
                    {t("servicesHub.ctaLearn")}
                  </InternalLink>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.12}>
          <section className="mt-14 lg:mt-16 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-6 lg:p-8">
            <h2 className="font-sans font-semibold text-xl lg:text-2xl text-nd-display mb-2">
              {isEn ? "Ready to compare options?" : "Pret a comparer vos options?"}
            </h2>
            <p className="font-sans text-sm lg:text-base text-black/70 dark:text-white/70 mb-6 max-w-3xl">
              {isEn
                ? "Request a quote, book a consultation, or start with a quick call to map the right management model for your property."
                : "Demandez une soumission, planifiez une consultation ou lancez un appel rapide pour choisir le bon modele de gestion."}
            </p>
            <div className="flex flex-wrap gap-3">
              <InternalLink
                to="/#contact-form"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-waabi-pink text-white font-sans font-semibold text-sm hover:bg-waabi-pink/90 transition-colors"
              >
                {isEn ? "Request a Quote" : "Demander une soumission"}
              </InternalLink>
              <InternalLink
                to="/#contact-form"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full border border-black/20 dark:border-white/20 text-black/85 dark:text-white/85 font-sans text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {isEn ? "Book a Consultation" : "Planifier une consultation"}
              </InternalLink>
              <a
                href="tel:+15147771731"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full border border-black/20 dark:border-white/20 text-black/85 dark:text-white/85 font-sans text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {isEn ? "Call +1 514 777 1731" : "Appeler +1 514 777 1731"}
              </a>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </motion.div>
  );
}
