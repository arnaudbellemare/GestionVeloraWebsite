import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLocale } from "../context/LocaleContext";
import { resolveLocation, LOCATION_FEATURES } from "../data/locations";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { useGoToContact } from "../hooks/useGoToContact";
import { SITE_URL } from "../config";

const SERVICE_IMAGES: Record<string, string> = {
  "syndicat-copropriete":
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85",
  "gestion-locative":
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=85",
  "gestion-airbnb":
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=85",
  "gestion-immobiliere-commerciale":
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85",
};

function injectLocationSchema(data: object) {
  const id = "schema-org-location";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function LocationPage() {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { contactHref, goToContact } = useGoToContact();
  const isEn = locale === "en";

  const loc = locationSlug ? resolveLocation(locationSlug) : null;

  useEffect(() => {
    if (!loc) return;

    const title = isEn ? loc.metaTitleEn : loc.metaTitleFr;
    const desc = isEn ? loc.metaDescEn : loc.metaDescFr;
    const url = `${SITE_URL}/${locationSlug}/`;
    const img = SERVICE_IMAGES[loc.service.slug] ?? SERVICE_IMAGES["syndicat-copropriete"];

    document.title = title;

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

    setMeta("description", desc);
    setMeta("og:title", title, true);
    setMeta("og:description", desc, true);
    setMeta("og:url", url, true);
    setMeta("og:image", img, true);
    setMeta("og:locale", isEn ? "en_CA" : "fr_CA", true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);

    // LocalBusiness schema
    injectLocationSchema({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/${locationSlug}/#localbusiness`,
          name: "Gestion Velora",
          url: url,
          description: desc,
          image: img,
          telephone: "+1-514-000-0000",
          address: {
            "@type": "PostalAddress",
            addressLocality: loc.city.nameFr,
            addressRegion: "QC",
            addressCountry: "CA",
          },
          areaServed: {
            "@type": "City",
            name: loc.city.nameFr,
          },
          serviceType: isEn ? loc.service.nameEn : loc.service.nameFr,
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Accueil", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: isEn ? loc.service.nameEn : loc.service.nameFr,
              item: `${SITE_URL}/${locationSlug}/`,
            },
          ],
        },
      ],
    });

    return () => {
      document.getElementById("schema-org-location")?.remove();
    };
  }, [loc, isEn, locationSlug]);

  if (!loc) return <Navigate to="/" replace />;

  const h1 = isEn ? loc.h1En : loc.h1Fr;
  const desc = isEn ? loc.descEn : loc.descFr;
  const features = LOCATION_FEATURES[loc.service.slug];
  const featureList = isEn ? features?.en : features?.fr;
  const heroImg = SERVICE_IMAGES[loc.service.slug] ?? SERVICE_IMAGES["syndicat-copropriete"];

  const otherServices = ["syndicat-copropriete", "gestion-locative", "gestion-airbnb"].filter(
    (s) => s !== loc.service.slug
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pt-24 lg:pt-32"
    >
      {/* Hero */}
      <section className="relative min-h-[55vh] flex flex-col justify-end pb-16 lg:pb-24">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt={`${isEn ? loc.service.nameEn : loc.service.nameFr} ${loc.city.nameFr}`}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-16 w-full">
          <Breadcrumbs
            theme="onDark"
            items={[
              { label: t("breadcrumb.home"), to: "/" },
              { label: isEn ? loc.service.nameEn : loc.service.nameFr },
            ]}
          />
          <h1 className="font-playfair font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] tracking-[-0.02em] text-white max-w-3xl mt-4 mb-6">
            {h1}
          </h1>
          <p className="font-sans text-base lg:text-lg text-white/85 max-w-2xl mb-8 leading-relaxed">
            {desc}
          </p>
          <a
            href={contactHref}
            onClick={goToContact}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-sans font-semibold text-sm uppercase tracking-[0.1em] text-white bg-black/40 backdrop-blur-md border border-white/45 shadow-[0_4px_28px_rgba(0,0,0,0.25)] transition-all duration-200 hover:bg-black/55 hover:border-white/60"
          >
            {isEn ? "Request a quote" : "Demander une soumission"}
          </a>
        </div>
      </section>

      {/* Features list */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 bg-nd-canvas">
        <div className="max-w-[90rem] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-nd-secondary block mb-4">
              {isEn ? loc.service.nameEn : loc.service.nameFr}
            </span>
            <h2 className="font-sans font-medium text-3xl lg:text-4xl text-nd-display leading-[1.1] tracking-[-0.02em] mb-6">
              {isEn
                ? `${loc.service.nameEn} in ${loc.city.nameEn}: what's included`
                : `${loc.service.nameFr} à ${loc.city.nameFr} : ce qui est inclus`}
            </h2>
            <p className="font-sans text-base text-nd-secondary leading-relaxed mb-8">
              {isEn
                ? `Gestion Velora serves property owners and condo boards across ${loc.city.nameEn} and the ${loc.city.region} area. Every mandate is handled with the same rigor: transparent reports, 24/7 responsiveness, and full regulatory compliance.`
                : `Gestion Velora accompagne les propriétaires et syndicats de toute la région de ${loc.city.nameFr} (${loc.city.region}). Chaque mandat est géré avec la même rigueur : rapports transparents, réactivité 24/7 et conformité réglementaire complète.`}
            </p>
            <a
              href={contactHref}
              onClick={goToContact}
              className="inline-flex items-center justify-center px-7 py-3 rounded-full font-sans font-semibold text-sm uppercase tracking-[0.1em] text-white bg-nd-primary hover:bg-nd-primary/90 transition-colors"
            >
              {isEn ? "Get started" : "Commencer"}
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ul className="space-y-4">
              {featureList?.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  className="flex items-start gap-3 font-sans text-base text-nd-primary"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nd-primary" aria-hidden />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Velora */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 bg-nd-surface border-y border-nd-border">
        <div className="max-w-[90rem] mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-sans font-medium text-3xl lg:text-4xl text-nd-display leading-[1.1] tracking-[-0.02em] mb-4">
              {isEn
                ? `Why choose Gestion Velora in ${loc.city.nameEn}?`
                : `Pourquoi choisir Gestion Velora à ${loc.city.nameFr} ?`}
            </h2>
            <p className="font-sans text-base text-nd-secondary max-w-2xl mx-auto">
              {isEn
                ? "A local team, transparent processes, and a proven track record across the Greater Montreal area."
                : "Une équipe locale, des processus transparents et un bilan éprouvé dans tout le Grand Montréal."}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                title: isEn ? "24/7 responsiveness" : "Réactivité 24/7",
                body: isEn
                  ? "Emergencies don't wait. Our team is reachable around the clock for urgent situations."
                  : "Les urgences n'attendent pas. Notre équipe est joignable en tout temps pour les situations urgentes.",
              },
              {
                title: isEn ? "Transparent reporting" : "Rapports transparents",
                body: isEn
                  ? "Monthly financial reports, maintenance logs, and meeting minutes, always accessible."
                  : "Rapports financiers mensuels, suivi des travaux et procès-verbaux, toujours accessibles.",
              },
              {
                title: isEn ? "Local expertise" : "Expertise locale",
                body: isEn
                  ? `Deep knowledge of ${loc.city.nameEn}'s real estate market, regulations, and building stock.`
                  : `Connaissance approfondie du marché immobilier de ${loc.city.nameFr}, des règlements locaux et du parc immobilier.`,
              },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-nd-border bg-nd-canvas p-8">
                  <h3 className="font-sans font-semibold text-lg text-nd-display mb-3">{card.title}</h3>
                  <p className="font-sans text-base text-nd-secondary leading-relaxed">{card.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 bg-nd-canvas">
        <div className="max-w-[90rem] mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-sans font-medium text-2xl lg:text-3xl text-nd-display leading-[1.1] tracking-[-0.02em]">
              {isEn
                ? `Other services in ${loc.city.nameEn}`
                : `Autres services à ${loc.city.nameFr}`}
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {otherServices.map((svcSlug, i) => {
              const pageSlug = `${svcSlug}-${loc.city.slug}`;
              const label =
                svcSlug === "syndicat-copropriete"
                  ? isEn ? "Condo board management" : "Syndicat de copropriété"
                  : svcSlug === "gestion-locative"
                  ? isEn ? "Rental management" : "Gestion locative"
                  : isEn ? "Airbnb management" : "Gestion Airbnb";
              return (
                <ScrollReveal key={svcSlug} delay={i * 0.07}>
                  <InternalLink
                    to={`/${pageSlug}`}
                    className="block rounded-2xl border border-nd-border bg-nd-surface p-6 hover:border-nd-primary/40 transition-colors"
                  >
                    <span className="font-sans font-medium text-nd-display block mb-1">{label}</span>
                    <span className="font-sans text-sm text-nd-secondary">
                      {loc.city.nameFr} →
                    </span>
                  </InternalLink>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 bg-nd-surface border-t border-nd-border text-center">
        <ScrollReveal>
          <h2 className="font-sans font-medium text-3xl lg:text-4xl text-nd-display leading-[1.1] tracking-[-0.02em] mb-4">
            {isEn
              ? `Ready to work with a property manager in ${loc.city.nameEn}?`
              : `Prêt à confier votre bien à un gestionnaire immobilier à ${loc.city.nameFr} ?`}
          </h2>
          <p className="font-sans text-base text-nd-secondary max-w-xl mx-auto mb-8">
            {isEn
              ? "Contact us for a free quote. We respond within one business day."
              : "Contactez-nous pour une soumission gratuite. Nous répondons sous un jour ouvrable."}
          </p>
          <a
            href={contactHref}
            onClick={goToContact}
            className="inline-flex items-center justify-center px-9 py-3.5 rounded-full font-sans font-semibold text-sm uppercase tracking-[0.12em] text-white bg-nd-primary hover:bg-nd-primary/90 transition-colors shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
          >
            {isEn ? "Contact Gestion Velora" : "Contacter Gestion Velora"}
          </a>
        </ScrollReveal>
      </section>
    </motion.div>
  );
}
