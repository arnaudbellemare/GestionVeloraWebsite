import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLocale } from "../context/LocaleContext";
import { resolveLocation, LOCATION_FEATURES, CITIES } from "../data/locations";
import { LOCATION_LANDING_SERVICE_IMAGES } from "../data/services";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { useGoToContact } from "../hooks/useGoToContact";
import { SITE_URL } from "../config";
import { COMPARISON_PAGES } from "../data/comparisons";

/** Explicit definitional lead per service — GEO/AEO “definition in first ~300 words”. */
const SERVICE_DEFINITION: Record<string, { fr: (cityFr: string) => string; en: (cityEn: string) => string }> = {
  "syndicat-copropriete": {
    fr: (cityFr) =>
      `Au Québec, le syndicat de copropriété pour un immeuble à ${cityFr} est l’organe qui administre le condominium au nom des copropriétaires, selon la Loi sur la copropriété des immeubles (RLRQ, c. C-6.1). La gestion professionnelle du syndicat couvre budgets, assemblées générales, fonds de prévoyance et entretien documenté des parties communes.`,
    en: (cityEn) =>
      `In Quebec, the condo board (“syndicat”) for a building in ${cityEn} is the legal entity that administers the condominium on behalf of owners under the Act respecting the co-ownership of buildings (CQLR c. C-6.1). Professional board administration covers budgets, annual general meetings, reserve funding, and documented upkeep of common elements.`,
  },
  "gestion-locative": {
    fr: (cityFr) =>
      `La gestion locative à ${cityFr}, c’est le mandat confié au gestionnaire pour louer, encaisser les loyers, faire respecter le bail et coordonner l’entretien, dans les règles du bail résidentiel au Québec (Tribunal administratif du logement, formulaires et obligations du propriétaire).`,
    en: (cityEn) =>
      `Rental management in ${cityEn} is the mandate given to a manager to lease units, collect rent, enforce the lease, and coordinate maintenance under Quebec residential tenancy rules (TAL, prescribed lease forms, and landlord obligations).`,
  },
  "gestion-airbnb": {
    fr: (cityFr) =>
      `La gestion Airbnb (location courte durée) à ${cityFr}, c’est l’exploitation encadrée des séjours de courte durée : annonces, réservations, ménage et conformité aux règlements municipaux applicables en plus du cadre civil et fiscal provincial.`,
    en: (cityEn) =>
      `Airbnb-style short-term rental management in ${cityEn} is the structured operation of short stays—listings, bookings, housekeeping, and compliance with applicable municipal bylaws on top of provincial civil and tax rules.`,
  },
  "conformite-loi-16": {
    fr: (cityFr) =>
      `La conformité Loi 16 à ${cityFr}, c’est la mise en œuvre du carnet d’entretien, du registre de copropriété et des études reliées au fonds de prévoyance selon les délais fixés pour les syndicats au Québec (modernisation de la copropriété).`,
    en: (cityEn) =>
      `Bill 16 compliance in ${cityEn} means implementing the maintenance logbook, condo register, and reserve-related studies on the schedule set for Quebec syndicates under the province’s co-ownership modernization framework.`,
  },
  "gestion-immobiliere-commerciale": {
    fr: (cityFr) =>
      `La gestion immobilière commerciale à ${cityFr}, c’est l’administration des baux commerciaux, des charges d’exploitation et de l’entretien des espaces pour stabiliser la valeur locative et respecter les obligations contractuelles du propriétaire.`,
    en: (cityEn) =>
      `Commercial property management in ${cityEn} is the administration of commercial leases, operating costs, and space upkeep to stabilize rental value and meet the owner’s contractual obligations.`,
  },
};

function serviceShortLabel(serviceSlug: string, isEn: boolean): string {
  if (serviceSlug === "syndicat-copropriete") return isEn ? "Condo board" : "Syndicat";
  if (serviceSlug === "gestion-locative") return isEn ? "Rental management" : "Gestion locative";
  if (serviceSlug === "gestion-airbnb") return isEn ? "Airbnb" : "Airbnb";
  if (serviceSlug === "conformite-loi-16") return isEn ? "Bill 16" : "Loi 16";
  if (serviceSlug === "gestion-immobiliere-commerciale") return isEn ? "Commercial" : "Commercial";
  return isEn ? "Service" : "Service";
}

const RELATED_POSTS: Record<string, { slug: string; titleEn: string; titleFr: string }[]> = {
  "gestion-airbnb": [
    { slug: "airbnb-montreal-permis-reglementation", titleEn: "Airbnb in Montreal: permits, regulation and best practices", titleFr: "Airbnb à Montréal : permis, réglementation et bonnes pratiques" },
    { slug: "experience-locataire-avantage-concurrentiel", titleEn: "Tenant experience: the new competitive advantage", titleFr: "L'expérience locataire : le nouvel avantage concurrentiel" },
    { slug: "avenir-gestion-immobiliere-intelligente-2026", titleEn: "The future of intelligent property management in 2026", titleFr: "L'avenir de la gestion immobilière intelligente en 2026" },
  ],
  "syndicat-copropriete": [
    { slug: "gestion-copropriete-montreal-reglementation", titleEn: "Condo management in Montreal: regulation guide", titleFr: "Gestion de copropriété à Montréal : réglementation" },
    { slug: "fonds-prevoyance-copropriete-quebec", titleEn: "Condo reserve fund: obligations and best practices", titleFr: "Fonds de prévoyance en copropriété : obligations" },
    { slug: "maintenance-preventive-economise-millions", titleEn: "Preventive maintenance: why it saves millions", titleFr: "Maintenance préventive : pourquoi ça économise des millions" },
  ],
  "gestion-locative": [
    { slug: "augmentation-loyer-montreal-regles-calcul-tal", titleEn: "Rent increases in Montreal: rules, calculation and TAL process", titleFr: "Augmentation de loyer à Montréal : règles, calcul et procédure TAL" },
    { slug: "bail-logement-quebec-guide-complet-proprietaires", titleEn: "Quebec residential lease: complete guide for landlords", titleFr: "Bail de logement au Québec : guide complet pour les propriétaires" },
    { slug: "releve-31-rl31-guide-proprietaires-locataires-quebec", titleEn: "RL-31 (Relevé 31) in Quebec: complete guide for landlords", titleFr: "Relevé 31 (RL-31) au Québec : guide complet pour les propriétaires" },
  ],
  "gestion-immobiliere-commerciale": [
    { slug: "maximiser-noi-approche-donnees", titleEn: "Maximize NOI in Montreal: a data-driven approach", titleFr: "Maximiser le NOI à Montréal : approche basée sur les données" },
    { slug: "req-neq-verifier-gestionnaire-immobilier-montreal", titleEn: "REQ and NEQ: how to verify a property manager's Quebec registration", titleFr: "REQ et NEQ : vérifier le registre d'un gestionnaire immobilier au Québec" },
    { slug: "choisir-gestionnaire-immobilier-montreal", titleEn: "How to choose a property manager in Montreal", titleFr: "Comment choisir son gestionnaire immobilier à Montréal" },
  ],
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
    const path = `${isEn ? "/en" : ""}/location/${locationSlug}`;
    const url = `${SITE_URL}${path}`;
    const img =
      LOCATION_LANDING_SERVICE_IMAGES[loc.service.slug] ??
      LOCATION_LANDING_SERVICE_IMAGES["syndicat-copropriete"];

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
          "@id": `${url}#localbusiness`,
          name: "Gestion Velora",
          url: url,
          description: desc,
          image: img,
          telephone: "+1-514-777-1731",
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
              item: url,
            },
          ],
        },
      ],
    });

    return () => {
      document.getElementById("schema-org-location")?.remove();
    };
  }, [loc, isEn, locationSlug]);

  useEffect(() => {
    if (loc) return;
    const prevTitle = document.title;
    document.title = isEn ? "Page not found | Gestion Velora" : "Page introuvable | Gestion Velora";
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    const prevRobots = meta.getAttribute("content");
    meta.setAttribute("content", "noindex, nofollow");
    return () => {
      document.title = prevTitle;
      if (createdMeta) {
        meta?.remove();
      } else {
        if (prevRobots != null) meta?.setAttribute("content", prevRobots);
        else meta?.removeAttribute("content");
      }
    };
  }, [loc, isEn]);

  if (!loc) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-28 lg:pt-36 pb-24 max-w-xl mx-auto px-6"
      >
        <p className="text-sm font-sans uppercase tracking-[0.12em] text-neutral-500 mb-2">404</p>
        <h1 className="font-playfair text-3xl font-semibold text-neutral-900 mb-4">
          {isEn ? "This location page doesn’t exist" : "Cette page de localisation n’existe pas"}
        </h1>
        <p className="font-sans text-neutral-600 mb-8 leading-relaxed">
          {isEn
            ? "That URL isn’t part of our published service areas. Use the city list to find a valid page."
            : "Cette adresse ne fait pas partie de nos pages publiées par ville. Consultez la liste des villes pour trouver une page valide."}
        </p>
        <InternalLink
          to="/locations"
          className="inline-flex font-sans font-semibold text-sm text-neutral-900 underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900"
        >
          {isEn ? "Cities we serve" : "Villes desservies"}
        </InternalLink>
      </motion.div>
    );
  }

  const h1 = isEn ? loc.h1En : loc.h1Fr;
  const desc = isEn ? loc.descEn : loc.descFr;
  const features = LOCATION_FEATURES[loc.service.slug];
  const featureList = isEn ? features?.en : features?.fr;
  const heroImg =
    LOCATION_LANDING_SERVICE_IMAGES[loc.service.slug] ??
    LOCATION_LANDING_SERVICE_IMAGES["syndicat-copropriete"];

  const otherServices = ["syndicat-copropriete", "gestion-locative", "gestion-airbnb"].filter(
    (s) => s !== loc.service.slug
  );
  const localePrefix = isEn ? "/en" : "";
  const nearbyCities = CITIES.filter((city) => city.slug !== loc.city.slug && city.region === loc.city.region).slice(0, 3);
  const serviceComparisons = COMPARISON_PAGES.slice(0, 2);

  const defEntry = SERVICE_DEFINITION[loc.service.slug];
  const definitionSentence = defEntry
    ? isEn
      ? defEntry.en(loc.city.nameEn)
      : defEntry.fr(loc.city.nameFr)
    : "";

  const attributedStatsParagraph = isEn
    ? "Regulatory basis (co-ownership): CQLR c. C-6.1; Bill 16 (2019) adds maintenance logbooks, the condo register, and reserve-related obligations with Quebec-published compliance milestones through 2027—see official provincial notices for dates. Rental-market context: CMHC rental-market data and Statistics Canada housing indicators are public benchmarks; they do not replace your syndicate’s financial statements or engineer reserve studies."
    : "Références légales (copropriété) : RLRQ, c. C-6.1 ; Loi 16 (2019) pour carnet d’entretien, registre de copropriété et obligations reliées au fonds de prévoyance, avec échéances publiées jusqu’en 2027 par le gouvernement du Québec. Contexte locatif : les portraits du marché locatif de la SCHL et les indicateurs habitation de Statistique Canada sont des sources publiques ; ils ne remplacent ni vos états financiers ni vos études de fonds.";

  const crossLinks = otherServices.slice(0, 2);
  const nearbyForIntro = nearbyCities[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pt-24 lg:pt-32"
    >
      {/* Hero */}
      <section id="location-hero" className="relative min-h-[55vh] flex flex-col justify-end pb-16 lg:pb-24">
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

      {/* GEO/AEO: definitional lead + attributed facts + /location/* links within opening content */}
      <section
        id="location-definition"
        className="relative z-10 px-6 lg:px-16 pt-10 pb-8 bg-nd-canvas border-b border-nd-border"
        aria-labelledby="location-definition-heading"
      >
        <div className="max-w-[90rem] mx-auto max-w-3xl">
          <h2 id="location-definition-heading" className="font-sans font-semibold text-sm uppercase tracking-[0.14em] text-nd-secondary mb-3">
            {isEn ? "Definition" : "Définition"}
          </h2>
          {definitionSentence ? (
            <p className="font-sans text-base text-nd-primary leading-relaxed">{definitionSentence}</p>
          ) : null}
          <p className="font-sans text-base text-nd-primary leading-relaxed mt-4">
            {isEn ? (
              <>
                <span className="font-medium text-nd-display">
                  {loc.service.nameEn} in {loc.city.nameEn}
                </span>{" "}
                is the focus of this URL. For the same city, see{" "}
                {crossLinks.map((svc, i) => (
                  <span key={svc}>
                    {i > 0 ? (crossLinks.length === 2 && i === 1 ? " and " : ", ") : null}
                    <InternalLink
                      to={`/location/${svc}-${loc.city.slug}`}
                      className="text-waabi-pink font-medium hover:underline underline-offset-2"
                    >
                      {serviceShortLabel(svc, true)} ({loc.city.nameEn})
                    </InternalLink>
                  </span>
                ))}
                {nearbyForIntro ? (
                  <>
                    {" "}
                    ; same service in{" "}
                    <InternalLink
                      to={`/location/${loc.service.slug}-${nearbyForIntro.slug}`}
                      className="text-waabi-pink font-medium hover:underline underline-offset-2"
                    >
                      {nearbyForIntro.nameEn}
                    </InternalLink>
                  </>
                ) : null}
                . Browse{" "}
                <InternalLink to="/locations" className="text-waabi-pink font-medium hover:underline underline-offset-2">
                  all cities we serve
                </InternalLink>
                .
              </>
            ) : (
              <>
                Cette URL détaille{" "}
                <span className="font-medium text-nd-display">
                  {loc.service.nameFr} à {loc.city.nameFr}
                </span>
                . Pour la même ville, voir{" "}
                {crossLinks.map((svc, i) => (
                  <span key={svc}>
                    {i > 0 ? (crossLinks.length === 2 && i === 1 ? " et " : ", ") : null}
                    <InternalLink
                      to={`/location/${svc}-${loc.city.slug}`}
                      className="text-waabi-pink font-medium hover:underline underline-offset-2"
                    >
                      {serviceShortLabel(svc, false)} ({loc.city.nameFr})
                    </InternalLink>
                  </span>
                ))}
                {nearbyForIntro ? (
                  <>
                    {" "}
                    ; le même service à{" "}
                    <InternalLink
                      to={`/location/${loc.service.slug}-${nearbyForIntro.slug}`}
                      className="text-waabi-pink font-medium hover:underline underline-offset-2"
                    >
                      {nearbyForIntro.nameFr}
                    </InternalLink>
                  </>
                ) : null}
                . Voir{" "}
                <InternalLink to="/locations" className="text-waabi-pink font-medium hover:underline underline-offset-2">
                  toutes les villes desservies
                </InternalLink>
                .
              </>
            )}
          </p>
          <aside
            className="mt-6 rounded-xl border border-nd-border bg-nd-surface p-4 lg:p-5"
            aria-labelledby="location-attributed-stats-heading"
          >
            <h3 id="location-attributed-stats-heading" className="font-sans font-semibold text-sm text-nd-display mb-2">
              {isEn ? "Sources & figures (attributed)" : "Sources et chiffres (attribués)"}
            </h3>
            <p className="font-sans text-sm text-nd-secondary leading-relaxed">{attributedStatsParagraph}</p>
          </aside>
        </div>
      </section>

      {(isEn ? loc.city.localLeadEn : loc.city.localLeadFr) && (
        <section
          id="location-local-context"
          aria-labelledby="location-local-context-heading"
          className="relative z-10 px-6 lg:px-16 -mt-6 pb-10 lg:pb-14"
        >
          <div className="max-w-[90rem] mx-auto rounded-2xl border border-white/25 bg-black/35 backdrop-blur-md px-6 py-6 lg:px-8 lg:py-7">
            <h2
              id="location-local-context-heading"
              className="font-sans font-semibold text-sm uppercase tracking-[0.12em] text-white/90 mb-3"
            >
              {isEn ? "Local operating context" : "Contexte local d'exploitation"}
            </h2>
            <p className="font-sans text-base text-white/88 leading-relaxed max-w-4xl">
              {isEn ? loc.city.localLeadEn : loc.city.localLeadFr}
            </p>
          </div>
        </section>
      )}

      {/* Features list */}
      <section id="location-included" className="py-20 lg:py-28 px-6 lg:px-16 bg-nd-canvas">
        <div className="max-w-[90rem] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-nd-secondary block mb-4">
              {isEn ? loc.service.nameEn : loc.service.nameFr}
            </span>
            <h2 id="location-services-included" className="font-sans font-medium text-3xl lg:text-4xl text-nd-display leading-[1.1] tracking-[-0.02em] mb-6">
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

      {/* Answer-first + internal links */}
      <section id="location-answer-first" className="py-14 lg:py-16 px-6 lg:px-16 bg-nd-surface border-y border-nd-border">
        <div className="max-w-[90rem] mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
          <ScrollReveal>
            <h2 className="font-sans font-medium text-2xl lg:text-3xl text-nd-display leading-[1.1] tracking-[-0.02em] mb-4">
              {isEn
                ? `What is the best ${loc.service.nameEn.toLowerCase()} approach in ${loc.city.nameEn}?`
                : `Quelle approche de ${loc.service.nameFr.toLowerCase()} est la plus efficace à ${loc.city.nameFr} ?`}
            </h2>
            <p className="font-sans text-base text-nd-secondary leading-relaxed">
              {isEn
                ? `For most buildings in ${loc.city.nameEn}, the best approach is a documented operating cadence: preventive maintenance, monthly reporting, and fast incident response. Gestion Velora applies this framework with local vendor coordination, clear compliance checkpoints, and one accountable team so owners and boards keep visibility without operational overload.`
                : `Pour la majorité des immeubles à ${loc.city.nameFr}, l'approche la plus efficace combine un rythme d'exploitation documenté : maintenance préventive, reporting mensuel et réponse rapide aux incidents. Gestion Velora applique ce cadre avec une coordination locale des fournisseurs, des jalons de conformité clairs et une équipe responsable pour garder de la visibilité sans surcharge opérationnelle.`}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <div className="rounded-2xl border border-nd-border bg-nd-canvas p-6">
              <h3 className="font-sans font-semibold text-nd-display mb-3">
                {isEn ? "Compare your options" : "Comparer vos options"}
              </h3>
              <div className="space-y-2.5">
                {serviceComparisons.map((comparison) => (
                  <InternalLink
                    key={comparison.slug}
                    to={`${localePrefix}/compare/${comparison.slug}`}
                    className="block text-sm text-nd-secondary hover:text-nd-primary transition-colors"
                  >
                    {isEn ? comparison.titleEn : comparison.titleFr} →
                  </InternalLink>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Velora */}
      <section id="location-why-velora" className="py-20 lg:py-28 px-6 lg:px-16 bg-nd-surface border-y border-nd-border">
        <div className="max-w-[90rem] mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 id="location-why-velora-title" className="font-sans font-medium text-3xl lg:text-4xl text-nd-display leading-[1.1] tracking-[-0.02em] mb-4">
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
                  <h3 id={`location-benefit-${i + 1}`} className="font-sans font-semibold text-lg text-nd-display mb-3">{card.title}</h3>
                  <p className="font-sans text-base text-nd-secondary leading-relaxed">{card.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section id="location-related-services" className="py-20 lg:py-28 px-6 lg:px-16 bg-nd-canvas">
        <div className="max-w-[90rem] mx-auto">
          <ScrollReveal className="mb-10">
            <h2 id="location-related-services-title" className="font-sans font-medium text-2xl lg:text-3xl text-nd-display leading-[1.1] tracking-[-0.02em]">
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
                    to={`${localePrefix}/location/${pageSlug}`}
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

      {/* Nearby city links */}
      {nearbyCities.length > 0 && (
        <section id="location-nearby-cities" className="py-16 lg:py-20 px-6 lg:px-16 bg-nd-canvas border-t border-nd-border">
          <div className="max-w-[90rem] mx-auto">
            <ScrollReveal className="mb-8">
              <h2 className="font-sans font-medium text-2xl lg:text-3xl text-nd-display leading-[1.1] tracking-[-0.02em]">
                {isEn ? "Nearby cities we also serve" : "Villes voisines aussi desservies"}
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-4">
              {nearbyCities.map((city) => (
                <InternalLink
                  key={city.slug}
                  to={`${localePrefix}/location/${loc.service.slug}-${city.slug}`}
                  className="inline-flex items-center justify-between rounded-xl border border-nd-border bg-nd-surface px-4 py-3 font-sans text-sm text-nd-secondary hover:border-nd-primary/40 transition-colors"
                >
                  <span>{isEn ? city.nameEn : city.nameFr}</span>
                  <span aria-hidden>→</span>
                </InternalLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related articles */}
      {RELATED_POSTS[loc.service.slug] && (
        <section id="location-related-articles" className="py-20 lg:py-28 px-6 lg:px-16 bg-nd-canvas border-t border-nd-border">
          <div className="max-w-[90rem] mx-auto">
            <ScrollReveal className="mb-10">
              <h2 id="location-related-articles-title" className="font-sans font-medium text-2xl lg:text-3xl text-nd-display leading-[1.1] tracking-[-0.02em]">
                {isEn ? "Related articles" : "Articles associés"}
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-6">
              {RELATED_POSTS[loc.service.slug].map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.07}>
                  <InternalLink
                    to={`${localePrefix}/blog/${post.slug}`}
                    className="block rounded-2xl border border-nd-border bg-nd-surface p-6 hover:border-nd-primary/40 transition-colors"
                  >
                    <span className="font-sans font-medium text-nd-display block mb-1 text-sm leading-snug">
                      {isEn ? post.titleEn : post.titleFr}
                    </span>
                    <span className="font-sans text-xs text-nd-secondary">
                      {isEn ? "Read article →" : "Lire l'article →"}
                    </span>
                  </InternalLink>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section id="location-cta" className="py-20 lg:py-28 px-6 lg:px-16 bg-nd-surface border-t border-nd-border text-center">
        <ScrollReveal>
          <h2 id="location-cta-title" className="font-sans font-medium text-3xl lg:text-4xl text-nd-display leading-[1.1] tracking-[-0.02em] mb-4">
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
