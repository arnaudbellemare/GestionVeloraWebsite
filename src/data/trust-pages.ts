/**
 * Trust / editorial pages — same routes were previously static HTML in public/.
 * Content is mirrored FR + EN for Layout + hreflang parity with the rest of the site.
 */

export type TrustPageId =
  | "about"
  | "editorial-policy"
  | "sources"
  | "methodology"
  | "trust-proof";

export type TrustBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "linkList"; items: { label: string; href: string; suffix?: string }[] };

export interface TrustSection {
  heading: string;
  blocks: TrustBlock[];
}

export interface TrustPageLocale {
  metaTitle: string;
  metaDescription: string;
  title: string;
  sections: TrustSection[];
}

export const TRUST_PAGE_PATHS_FR = [
  "/about",
  "/editorial-policy",
  "/sources",
  "/methodology",
  "/trust-proof",
] as const;

const PATH_TO_ID: Record<string, TrustPageId> = {
  "/about": "about",
  "/editorial-policy": "editorial-policy",
  "/sources": "sources",
  "/methodology": "methodology",
  "/trust-proof": "trust-proof",
};

export function trustPageIdFromPath(pathname: string): TrustPageId | null {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const withoutEn =
    normalized === "/en"
      ? "/"
      : normalized.startsWith("/en/")
        ? normalized.slice(3) || "/"
        : normalized;
  return PATH_TO_ID[withoutEn] ?? null;
}

export const TRUST_PAGES: Record<TrustPageId, { fr: TrustPageLocale; en: TrustPageLocale }> = {
  about: {
    fr: {
      metaTitle: "À propos de Gestion Velora | Firme de gestion immobilière à Montréal",
      metaDescription:
        "Gestion Velora est une firme de gestion immobilière à Montréal : syndicats de copropriété, gestion locative et Airbnb dans le Grand Montréal.",
      title: "À propos de Gestion Velora",
      sections: [
        {
          heading: "Notre mission",
          blocks: [
            {
              kind: "p",
              text: "Notre mission est simple : alléger la charge administrative, financière et technique des propriétaires et des conseils d’administration de syndicats de copropriété. Chaque mandat est géré avec rigueur, transparence et communication proactive.",
            },
          ],
        },
        {
          heading: "Nos services de gestion immobilière",
          blocks: [
            {
              kind: "p",
              text: "Gestion Velora couvre trois grandes catégories de mandats immobiliers à Montréal et dans les environs :",
            },
            {
              kind: "ul",
              items: [
                "Syndicat de copropriété : administration complète du syndicat — AGA, fonds de prévoyance, budget, charges communes, registre de copropriété, parties communes et conformité Loi 141.",
                "Gestion locative longue durée : sélection des locataires, baux, perception des loyers, entretien, rapports financiers mensuels.",
                "Gestion Airbnb et location courte durée : tarification, réservations, voyageurs, ménage et conformité réglementaire.",
              ],
            },
          ],
        },
        {
          heading: "Notre territoire de service",
          blocks: [
            {
              kind: "p",
              text: "Nous sommes actifs dans l’ensemble du Grand Montréal : arrondissements centraux, Rive-Sud, Laval et villes de banlieue desservies — avec une connaissance des cadres municipaux et provinciaux applicables à chaque mandat.",
            },
          ],
        },
        {
          heading: "Notre approche",
          blocks: [
            {
              kind: "p",
              text: "Chaque mandat commence par une évaluation de départ : état du bien, finances, contrats et obligations réglementaires. Nous établissons un calendrier annuel et des rapports structurés pour les propriétaires et les conseils d’administration.",
            },
          ],
        },
        {
          heading: "Coordonnées",
          blocks: [
            {
              kind: "ul",
              items: [
                "Courriel : info@gestionvelora.com",
                "Téléphone : +1 514 777-1731",
                "Montréal, Québec, Canada",
              ],
            },
          ],
        },
        {
          heading: "Affiliations professionnelles",
          blocks: [
            {
              kind: "p",
              text: "Gestion Velora est membre du RGCQ — Regroupement des gestionnaires et copropriétaires du Québec, organisme de référence pour la gouvernance des copropriétés au Québec.",
            },
          ],
        },
        {
          heading: "Références et politiques",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "Politique éditoriale", href: "/editorial-policy" },
                { label: "Politique de confidentialité", href: "/privacy" },
              ],
            },
          ],
        },
      ],
    },
    en: {
      metaTitle: "About Gestion Velora | Montreal Property Management Firm",
      metaDescription:
        "Gestion Velora is a Montreal property management firm serving condo boards, long-term rentals, and short-term rentals across Greater Montreal.",
      title: "About Gestion Velora",
      sections: [
        {
          heading: "Our mission",
          blocks: [
            {
              kind: "p",
              text: "Our mission is straightforward: reduce the administrative, financial, and technical burden on owners and condo boards. Every mandate is delivered with rigor, transparency, and proactive communication.",
            },
          ],
        },
        {
          heading: "Our property management services",
          blocks: [
            {
              kind: "p",
              text: "Gestion Velora focuses on three core mandate types in Montreal and the surrounding region:",
            },
            {
              kind: "ul",
              items: [
                "Condo board management: full syndicate administration — AGM, reserve fund, annual budget, common fees, condo register, common elements, and Loi 141 compliance.",
                "Long-term rental management: tenant screening, leases, rent collection, maintenance, and monthly financial reporting.",
                "Airbnb / short-term rental: pricing, bookings, guest operations, turnover cleaning, and regulatory compliance.",
              ],
            },
          ],
        },
        {
          heading: "Where we operate",
          blocks: [
            {
              kind: "p",
              text: "We operate across Greater Montreal — central boroughs, the South Shore, Laval, and key suburban municipalities — with attention to municipal and provincial requirements for each mandate.",
            },
          ],
        },
        {
          heading: "How we work",
          blocks: [
            {
              kind: "p",
              text: "Every mandate starts with a baseline assessment: building condition, finances, contracts, and regulatory obligations. We then maintain an annual obligation calendar and structured reporting for owners and boards.",
            },
          ],
        },
        {
          heading: "Contact",
          blocks: [
            {
              kind: "ul",
              items: ["Email: info@gestionvelora.com", "Phone: +1 514 777-1731", "Montreal, Quebec, Canada"],
            },
          ],
        },
        {
          heading: "Professional affiliations",
          blocks: [
            {
              kind: "p",
              text: "Gestion Velora is a member of RGCQ (Regroupement des gestionnaires et copropriétaires du Québec), Quebec’s reference organization for condo governance and professional standards.",
            },
          ],
        },
        {
          heading: "Policies",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "Editorial policy", href: "/editorial-policy" },
                { label: "Privacy policy", href: "/privacy" },
              ],
            },
          ],
        },
      ],
    },
  },
  "editorial-policy": {
    fr: {
      metaTitle: "Politique éditoriale | Gestion Velora",
      metaDescription:
        "Normes de sourcing, révision et correction du contenu publié par Gestion Velora sur la gestion immobilière à Montréal.",
      title: "Politique éditoriale",
      sections: [
        {
          heading: "Objectif",
          blocks: [
            {
              kind: "p",
              text: "Cette page décrit les normes appliquées à la création, la mise à jour et la correction du contenu publié sur gestionvelora.com. Notre objectif est de fournir des informations exactes et utiles sur la gestion immobilière au Québec.",
            },
            {
              kind: "p",
              text: "Le contenu est rédigé par des professionnels de la gestion immobilière avec une expérience directe des cadres québécois et des opérations sur le marché montréalais.",
            },
          ],
        },
        {
          heading: "Périmètre éditorial",
          blocks: [
            {
              kind: "p",
              text: "Le site couvre notamment : gestion de syndicat et copropriété, gestion locative, location courte durée (Airbnb), et marchés locaux du Grand Montréal. Le contenu est informatif et ne constitue pas un avis juridique, fiscal ou financier.",
            },
          ],
        },
        {
          heading: "Normes de sourcing",
          blocks: [
            {
              kind: "ul",
              items: [
                "Sources primaires officielles en priorité : textes sur LégisQuébec, sites gouvernementaux, Ville de Montréal, TAL, SCHL.",
                "Liens près des affirmations factuelles lorsque l’obligation ou l’indicateur cité le permet.",
                "Dates de publication et de révision indiquées sur les articles lorsque pertinent.",
                "Distinction claire entre faits vérifiables et recommandations issues de notre pratique.",
              ],
            },
          ],
        },
        {
          heading: "Révision et mise à jour",
          blocks: [
            {
              kind: "ul",
              items: [
                "Révision lors d’un changement légal ou réglementaire affectant un contenu — visée : mise à jour sous 30 jours lorsque possible.",
                "Révision annuelle des pages à fort volume même sans changement réglementaire.",
                "Correction des liens externes institutionnels lorsque repérés comme brisés.",
              ],
            },
          ],
        },
        {
          heading: "Corrections",
          blocks: [
            {
              kind: "p",
              text: "Pour signaler une erreur matérielle ou un lien brisé : écrivez à info@gestionvelora.com en indiquant l’URL et la nature du problème.",
            },
          ],
        },
        {
          heading: "Pages connexes",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "Sources de référence", href: "/sources" },
                { label: "Méthodologie opérationnelle", href: "/methodology" },
                { label: "Preuves de confiance", href: "/trust-proof" },
                { label: "À propos", href: "/about" },
                { label: "Politique de confidentialité", href: "/privacy" },
              ],
            },
          ],
        },
      ],
    },
    en: {
      metaTitle: "Editorial Policy | Gestion Velora",
      metaDescription:
        "How Gestion Velora sources, reviews, and updates editorial content about Montreal property management.",
      title: "Editorial policy",
      sections: [
        {
          heading: "Purpose",
          blocks: [
            {
              kind: "p",
              text: "This page describes the standards we apply when publishing content on gestionvelora.com. Our goal is accurate, practical information about Quebec property management.",
            },
            {
              kind: "p",
              text: "Content is prepared by property-management professionals with direct experience of Quebec regulatory frameworks and Montreal operations.",
            },
          ],
        },
        {
          heading: "Editorial scope",
          blocks: [
            {
              kind: "p",
              text: "Topics include condo board administration, long-term rentals, short-term rentals (Airbnb), and Greater Montreal market context. Content is informational and is not legal, tax, or financial advice.",
            },
          ],
        },
        {
          heading: "Sourcing standards",
          blocks: [
            {
              kind: "ul",
              items: [
                "Prefer primary sources: statutes and regulations on LégisQuébec, government portals, City of Montreal, TAL, CMHC where applicable.",
                "Place citations close to factual claims when linking is meaningful.",
                "Publish/update dates on articles when relevant.",
                "Separate verifiable facts from operational recommendations based on experience.",
              ],
            },
          ],
        },
        {
          heading: "Review cadence",
          blocks: [
            {
              kind: "ul",
              items: [
                "Trigger reviews when legal/regulatory changes affect published guidance — target meaningful updates within ~30 days when feasible.",
                "Annual review pass for high-traffic pages even without regulatory changes.",
                "Fix or replace broken institutional outbound links when identified.",
              ],
            },
          ],
        },
        {
          heading: "Corrections",
          blocks: [
            {
              kind: "p",
              text: "To report a substantive error or broken link, email info@gestionvelora.com with the URL and a short description of the issue.",
            },
          ],
        },
        {
          heading: "Related pages",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "Reference sources", href: "/sources" },
                { label: "Operational methodology", href: "/methodology" },
                { label: "Trust proof points", href: "/trust-proof" },
                { label: "About", href: "/about" },
                { label: "Privacy policy", href: "/privacy" },
              ],
            },
          ],
        },
      ],
    },
  },
  sources: {
    fr: {
      metaTitle: "Sources de référence | Gestion Velora",
      metaDescription:
        "Sources institutionnelles et réglementaires utilisées pour la gestion immobilière à Montréal : copropriété, location, Airbnb.",
      title: "Sources de référence",
      sections: [
        {
          heading: "Introduction",
          blocks: [
            {
              kind: "p",
              text: "Cette page recense les sources officielles et les références statistiques utilisées pour étayer les informations publiées sur nos services. Nous privilégions les sources primaires.",
            },
          ],
        },
        {
          heading: "Copropriété (Québec)",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "RGCQ — Regroupement des gestionnaires et copropriétaires du Québec", href: "https://www.rgcq.org/" },
                { label: "Code civil du Québec (RLRQ c. CCQ-1991)", href: "https://www.legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991" },
                { label: "Loi sur la copropriété divise (RLRQ c. C-6.1)", href: "https://www.legisquebec.gouv.qc.ca/fr/document/lc/C-6.1" },
              ],
            },
          ],
        },
        {
          heading: "Location et TAL",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "Tribunal administratif du logement (TAL)", href: "https://www.tal.gouv.qc.ca/" },
                { label: "Éducaloi", href: "https://www.educaloi.qc.ca/", suffix: "(vulgarisation juridique)" },
              ],
            },
          ],
        },
        {
          heading: "Location courte durée",
          blocks: [
            {
              kind: "linkList",
              items: [
                {
                  label: "Québec — Hébergement touristique",
                  href: "https://www.quebec.ca/tourisme-loisirs-sport/hebergement-touristique",
                },
                { label: "CITQ", href: "https://www.cithq.org/" },
              ],
            },
          ],
        },
        {
          heading: "Données de marché",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "SCHL / CMHC", href: "https://www.cmhc-schl.gc.ca/" },
                { label: "Statistique Canada", href: "https://www150.statcan.gc.ca/" },
              ],
            },
          ],
        },
        {
          heading: "Utilisation",
          blocks: [
            {
              kind: "p",
              text: "Ces sources sont utilisées à titre informatif. Le contenu du site ne constitue pas un avis juridique. Pour une situation précise, consultez un professionnel qualifié.",
            },
          ],
        },
        {
          heading: "Pages connexes",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "Politique éditoriale", href: "/editorial-policy" },
                { label: "Méthodologie opérationnelle", href: "/methodology" },
                { label: "Politique de confidentialité", href: "/privacy" },
              ],
            },
          ],
        },
      ],
    },
    en: {
      metaTitle: "Reference Sources | Gestion Velora",
      metaDescription:
        "Institutional and regulatory references used in Gestion Velora content about Montreal property management.",
      title: "Reference sources",
      sections: [
        {
          heading: "Introduction",
          blocks: [
            {
              kind: "p",
              text: "This page lists authoritative sources used to support factual statements in our published content. We prioritize primary sources wherever possible.",
            },
          ],
        },
        {
          heading: "Condominiums (Quebec)",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "RGCQ", href: "https://www.rgcq.org/" },
                { label: "Civil Code of Québec (CCQ-1991)", href: "https://www.legisquebec.gouv.qc.ca/en/document/cs/CCQ-1991" },
                { label: "Condominium Act (C-6.1)", href: "https://www.legisquebec.gouv.qc.ca/en/document/cs/C-6.1" },
              ],
            },
          ],
        },
        {
          heading: "Rentals and the TAL",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "Administrative Housing Tribunal (TAL)", href: "https://www.tal.gouv.qc.ca/" },
                { label: "Éducaloi", href: "https://www.educaloi.qc.ca/", suffix: "(plain-language legal information)" },
              ],
            },
          ],
        },
        {
          heading: "Short-term rentals",
          blocks: [
            {
              kind: "linkList",
              items: [
                {
                  label: "Quebec — Tourist accommodation",
                  href: "https://www.quebec.ca/en/tourism-and-recreation/tourist-accommodation",
                },
                { label: "CITQ", href: "https://www.cithq.org/" },
              ],
            },
          ],
        },
        {
          heading: "Market data",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "CMHC", href: "https://www.cmhc-schl.gc.ca/" },
                { label: "Statistics Canada", href: "https://www150.statcan.gc.ca/" },
              ],
            },
          ],
        },
        {
          heading: "How we use these sources",
          blocks: [
            {
              kind: "p",
              text: "These references support explanatory content on regulatory context and market background. Nothing on this site is legal advice; consult a qualified professional for case-specific guidance.",
            },
          ],
        },
        {
          heading: "Related pages",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "Editorial policy", href: "/editorial-policy" },
                { label: "Operational methodology", href: "/methodology" },
                { label: "Privacy policy", href: "/privacy" },
              ],
            },
          ],
        },
      ],
    },
  },
  methodology: {
    fr: {
      metaTitle: "Méthodologie opérationnelle | Gestion Velora",
      metaDescription:
        "Cadre opérationnel : évaluation initiale, tableau de bord, conformité réglementaire et amélioration continue.",
      title: "Méthodologie opérationnelle",
      sections: [
        {
          heading: "Vue d’ensemble",
          blocks: [
            {
              kind: "p",
              text: "Gestion Velora applique un cadre structuré à chaque mandat — syndicat de copropriété, location longue durée ou location courte durée — pour livrer une exécution reproductible et une visibilité complète aux clients.",
            },
          ],
        },
        {
          heading: "1. Évaluation initiale",
          blocks: [
            {
              kind: "p",
              text: "Avant la prise en charge : état physique du bien, finances récentes, conformité réglementaire et dossiers administratifs (registre, baux, assurances, PV). Un rapport de départ peut être remis avec priorités et calendrier.",
            },
          ],
        },
        {
          heading: "2. Tableau de bord et indicateurs",
          blocks: [
            {
              kind: "ul",
              items: [
                "Occupation et vacance",
                "Délais de réponse sur les demandes d’entretien",
                "Travaux préventifs vs correctifs",
                "Écarts budgétaires et trésorerie",
                "Fonds de prévoyance (copropriété) ou rendement (Airbnb)",
              ],
            },
          ],
        },
        {
          heading: "3. Obligations légales et réglementaires",
          blocks: [
            {
              kind: "p",
              text: "Cartographie des échéances : AGA, études de fonds de prévoyance, registre de copropriété, avis TAL pour les baux, permis et règlements pour la location courte durée.",
            },
          ],
        },
        {
          heading: "4. Amélioration continue",
          blocks: [
            {
              kind: "p",
              text: "Revue opérationnelle régulière : analyse des écarts, ajustements documentés et communication client pour stabiliser la performance dans le temps.",
            },
          ],
        },
        {
          heading: "Pages connexes",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "À propos", href: "/about" },
                { label: "Preuves de confiance", href: "/trust-proof" },
                { label: "Politique éditoriale", href: "/editorial-policy" },
                { label: "Sources de référence", href: "/sources" },
              ],
            },
          ],
        },
      ],
    },
    en: {
      metaTitle: "Operational Methodology | Gestion Velora",
      metaDescription:
        "How Gestion Velora runs mandates: onboarding assessment, KPI tracking, compliance calendars, and continuous improvement.",
      title: "Operational methodology",
      sections: [
        {
          heading: "Overview",
          blocks: [
            {
              kind: "p",
              text: "We apply a structured operating framework across mandates — condo boards, long-term rentals, and short-term rentals — to deliver repeatable execution and transparent reporting.",
            },
          ],
        },
        {
          heading: "1. Initial assessment",
          blocks: [
            {
              kind: "p",
              text: "Before takeover: physical condition, recent finances, regulatory posture, and administrative records (register, leases, insurance, minutes). A baseline memo may include priorities and a compliance calendar.",
            },
          ],
        },
        {
          heading: "2. Dashboards and KPIs",
          blocks: [
            {
              kind: "ul",
              items: [
                "Occupancy and vacancy",
                "Maintenance response times",
                "Preventive vs corrective work mix",
                "Budget variance and cash flow",
                "Reserve posture (condo) or revenue metrics (Airbnb)",
              ],
            },
          ],
        },
        {
          heading: "3. Regulatory obligations",
          blocks: [
            {
              kind: "p",
              text: "Mapped deadlines for AGM cycles, reserve studies and condo register upkeep, TAL notices for residential leases, and municipal/provincial requirements for short-term rentals.",
            },
          ],
        },
        {
          heading: "4. Continuous improvement",
          blocks: [
            {
              kind: "p",
              text: "Periodic operational reviews with documented adjustments and client communication to stabilize performance over time.",
            },
          ],
        },
        {
          heading: "Related pages",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "About", href: "/about" },
                { label: "Trust proof points", href: "/trust-proof" },
                { label: "Editorial policy", href: "/editorial-policy" },
                { label: "Reference sources", href: "/sources" },
              ],
            },
          ],
        },
      ],
    },
  },
  "trust-proof": {
    fr: {
      metaTitle: "Preuves de confiance | Gestion Velora",
      metaDescription:
        "Engagements de service, cadre réglementaire et coordonnées pour évaluer Gestion Velora comme partenaire de gestion à Montréal.",
      title: "Preuves de confiance",
      sections: [
        {
          heading: "Pourquoi cette page",
          blocks: [
            {
              kind: "p",
              text: "Cette page centralise des éléments vérifiables — conformité, méthode et contact — pour aider propriétaires et conseils d’administration à évaluer Gestion Velora comme partenaire de gestion.",
            },
          ],
        },
        {
          heading: "Cadre réglementaire",
          blocks: [
            {
              kind: "p",
              text: "La gestion immobilière professionnelle au Québec s’appuie sur des cadres clairs (copropriété, location, hébergement touristique). Nous alignons nos mandats sur ces obligations et documentons les cycles qui les concernent.",
            },
          ],
        },
        {
          heading: "Transparence et communication",
          blocks: [
            {
              kind: "p",
              text: "Rapports structurés, traçabilité des décisions importantes et disponibilité pour les urgences opérationnelles font partie de nos standards de service.",
            },
          ],
        },
        {
          heading: "Coordonnées",
          blocks: [
            {
              kind: "ul",
              items: ["info@gestionvelora.com", "+1 514 777-1731", "Montréal, Québec"],
            },
          ],
        },
        {
          heading: "Pour aller plus loin",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "Méthodologie opérationnelle", href: "/methodology" },
                { label: "Politique éditoriale", href: "/editorial-policy" },
                { label: "Sources de référence", href: "/sources" },
              ],
            },
          ],
        },
      ],
    },
    en: {
      metaTitle: "Trust & Proof | Gestion Velora",
      metaDescription:
        "Verifiable signals — regulatory alignment, operating standards, and contact points — for evaluating Gestion Velora as a Montreal management partner.",
      title: "Trust and proof",
      sections: [
        {
          heading: "Why this page exists",
          blocks: [
            {
              kind: "p",
              text: "This page collects concrete, checkable signals — compliance framing, operating discipline, and direct contact — so boards and owners can evaluate Gestion Velora as a management partner.",
            },
          ],
        },
        {
          heading: "Regulatory alignment",
          blocks: [
            {
              kind: "p",
              text: "Professional property management in Quebec sits inside clear statutory frameworks for condominiums, residential tenancy, and tourist accommodation where applicable. We align mandates to those obligations and document recurring compliance cycles.",
            },
          ],
        },
        {
          heading: "Transparency and communication",
          blocks: [
            {
              kind: "p",
              text: "Structured reporting, traceability for major decisions, and real operational availability for urgent issues are baseline expectations for how we run mandates.",
            },
          ],
        },
        {
          heading: "Contact",
          blocks: [
            {
              kind: "ul",
              items: ["info@gestionvelora.com", "+1 514 777-1731", "Montreal, Quebec"],
            },
          ],
        },
        {
          heading: "Related pages",
          blocks: [
            {
              kind: "linkList",
              items: [
                { label: "Operational methodology", href: "/methodology" },
                { label: "Editorial policy", href: "/editorial-policy" },
                { label: "Reference sources", href: "/sources" },
              ],
            },
          ],
        },
      ],
    },
  },
};

export function getTrustPageLocale(id: TrustPageId, locale: "fr" | "en"): TrustPageLocale {
  return TRUST_PAGES[id][locale];
}
