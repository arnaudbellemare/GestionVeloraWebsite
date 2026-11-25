/**
 * Copy for the /tarifs page. Shared by TarifsPage.tsx and scripts/prerender.ts
 * so the raw HTML served to every visitor and crawler matches the hydrated page.
 */
export interface PricingTier {
  name: string;
  priceNote: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface PricingFaqItem {
  q: string;
  a: string;
}

export interface PricingContent {
  breadcrumb: string;
  h1: string;
  intro: string;
  syndicat: { heading: string; intro: string; highlightLabel: string; tiers: PricingTier[] };
  location: { heading: string; intro: string; highlightLabel: string; tiers: PricingTier[] };
  airbnb: { heading: string; body: string; cta: string };
  faq: { heading: string; items: PricingFaqItem[] };
}

const EN: PricingContent = {
  breadcrumb: "Pricing",
  h1: "Transparent pricing for every property type",
  intro:
    "All plans include onboarding, setup, and dedicated support. No hidden fees; pricing is based on the size and complexity of your mandate.",
  syndicat: {
    heading: "Condo board management",
    intro:
      "Per unit per month, minimum 6-unit buildings. Typical range is $33–$36 per unit depending on mandate specifics, management software included.",
    highlightLabel: "Most popular",
    tiers: [
      {
        name: "Essential",
        priceNote: "Typically $33–$36 / unit / month",
        description: "Core condo board administration for small buildings (up to 12 units). Final pricing depends on mandate specifics.",
        features: [
          "Management software included",
          "Annual general assembly",
          "Monthly financial reports",
          "Maintenance request tracking",
          "Email support",
        ],
        cta: "Request a quote",
      },
      {
        name: "Standard",
        priceNote: "Typically $33–$36 / unit / month",
        description: "Full administration with reserve fund management for mid-size buildings, including portals and operational tooling.",
        features: [
          "Everything in Essential",
          "App & portal integrations",
          "Reserve fund management (Loi 141)",
          "Major work coordination",
          "Owner portal access",
          "24/7 emergency line",
        ],
        cta: "Request a quote",
        highlighted: true,
      },
      {
        name: "Premium",
        priceNote: "Custom pricing",
        description: "White-glove management for large or complex condominiums.",
        features: [
          "Everything in Standard",
          "Dedicated property manager",
          "Custom reporting dashboard",
          "Annual reserve fund study",
          "Legal & compliance advisory",
        ],
        cta: "Contact us",
      },
    ],
  },
  location: {
    heading: "Rental management",
    intro:
      "Fees are structured as one month’s gross rent under the mandate (not a percentage of each month’s collections).",
    highlightLabel: "Recommended",
    tiers: [
      {
        name: "Basic",
        priceNote: "One month's rent",
        description: "Rent collection and tenant communications. Our fee is structured as one month's gross rent under the mandate terms.",
        features: [
          "Tenant screening",
          "Rent collection",
          "Monthly statements",
          "Basic maintenance coordination",
        ],
        cta: "Request a quote",
      },
      {
        name: "Full Service",
        priceNote: "One month's rent",
        description: "End-to-end rental management including leasing and maintenance, for the same one-month-rent fee structure with broader service scope.",
        features: [
          "Everything in Basic",
          "Lease drafting and renewals",
          "24/7 emergency maintenance",
          "Annual property inspection",
          "Owner portal access",
        ],
        cta: "Request a quote",
        highlighted: true,
      },
    ],
  },
  airbnb: {
    heading: "Airbnb & short-term rental",
    body: "Short-term rental management fees depend on volume, property type, and services required. Typically 18–25% of booking revenue. Contact us for a custom quote.",
    cta: "Get a quote",
  },
  faq: {
    heading: "Pricing FAQ",
    items: [
      {
        q: "Are there setup or onboarding fees?",
        a: "No. Onboarding, file transfer, and portal setup are included in your first month at no additional cost.",
      },
      {
        q: "Is there a minimum contract duration?",
        a: "Most mandates are 12-month agreements, renewable annually. We also offer month-to-month arrangements for smaller portfolios.",
      },
      {
        q: "What's not included?",
        a: "Maintenance and repair costs are paid directly by the property or condo board; we coordinate the work but don't mark up contractor invoices.",
      },
    ],
  },
};

const FR: PricingContent = {
  breadcrumb: "Tarifs",
  h1: "Tarifs transparents pour chaque type de bien",
  intro:
    "Tous les forfaits incluent l'intégration, la configuration et un support dédié. Aucun frais caché; les tarifs dépendent de la taille et de la complexité de votre mandat.",
  syndicat: {
    heading: "Gestion de syndicat de copropriété",
    intro:
      "Par unité par mois, immeubles de 6 unités minimum. Fourchette habituelle : 33 $ à 36 $ / unité selon les spécificités du mandat, logiciel de gestion inclus.",
    highlightLabel: "Le plus populaire",
    tiers: [
      {
        name: "Essentiel",
        priceNote: "Généralement 33 $ à 36 $ / unité / mois",
        description: "Administration de base pour petits syndicats (jusqu'à 12 unités). Montant selon les spécificités du mandat.",
        features: [
          "Logiciel de gestion inclus",
          "Assemblée générale annuelle",
          "Rapports financiers mensuels",
          "Suivi des demandes de maintenance",
          "Support par courriel",
        ],
        cta: "Obtenir une soumission",
      },
      {
        name: "Standard",
        priceNote: "Généralement 33 $ à 36 $ / unité / mois",
        description: "Administration complète avec portails et outils applicatifs, et gestion du fonds de prévoyance pour immeubles de taille moyenne.",
        features: [
          "Tout ce qui est inclus dans Essentiel",
          "Intégrations applicatives et portails",
          "Gestion du fonds de prévoyance (Loi 141)",
          "Coordination des travaux majeurs",
          "Accès au portail copropriétaires",
          "Ligne d'urgence 24/7",
        ],
        cta: "Obtenir une soumission",
        highlighted: true,
      },
      {
        name: "Premium",
        priceNote: "Tarif sur mesure",
        description: "Gestion sur mesure pour grands immeubles ou copropriétés complexes.",
        features: [
          "Tout ce qui est inclus dans Standard",
          "Gestionnaire dédié",
          "Tableau de bord personnalisé",
          "Étude de réserve annuelle",
          "Conseil juridique et conformité",
        ],
        cta: "Nous contacter",
      },
    ],
  },
  location: {
    heading: "Gestion locative longue durée",
    intro:
      "Honoraires calibrés sur un mois de loyer brut (forfait lié au mandat), et non sur un pourcentage mensuel des loyers perçus.",
    highlightLabel: "Recommandé",
    tiers: [
      {
        name: "Base",
        priceNote: "Honoraires : 1 mois de loyer",
        description: "Collecte des loyers et communications avec les locataires. Rémunération équivalente à un mois de loyer brut, selon modalités du mandat.",
        features: [
          "Sélection des locataires",
          "Collecte des loyers",
          "Relevés mensuels",
          "Coordination de base des travaux",
        ],
        cta: "Obtenir une soumission",
      },
      {
        name: "Complet",
        priceNote: "Honoraires : 1 mois de loyer",
        description: "Gestion locative complète incluant mise en location et maintenance. Même principe (un mois de loyer), périmètre de services élargi.",
        features: [
          "Tout ce qui est inclus dans Base",
          "Rédaction et renouvellement des baux",
          "Maintenance d'urgence 24/7",
          "Inspection annuelle",
          "Accès au portail propriétaire",
        ],
        cta: "Obtenir une soumission",
        highlighted: true,
      },
    ],
  },
  airbnb: {
    heading: "Airbnb et location courte durée",
    body: "Les frais de gestion Airbnb varient selon le volume, le type de bien et les services requis. Généralement 18–25 % des revenus de réservation. Contactez-nous pour une soumission sur mesure.",
    cta: "Obtenir une soumission",
  },
  faq: {
    heading: "FAQ sur les tarifs",
    items: [
      {
        q: "Y a-t-il des frais d'intégration ou de démarrage ?",
        a: "Non. L'intégration, le transfert de dossiers et la configuration du portail sont inclus dans votre premier mois sans frais supplémentaires.",
      },
      {
        q: "Quelle est la durée minimale du contrat ?",
        a: "La plupart des mandats sont des ententes de 12 mois, renouvelables annuellement. Nous offrons aussi des arrangements mensuels pour les petits portefeuilles.",
      },
      {
        q: "Qu'est-ce qui n'est pas inclus ?",
        a: "Les coûts de maintenance et de réparation sont payés directement par l'immeuble ou le syndicat; nous coordonnons les travaux mais ne majorons pas les factures des entrepreneurs.",
      },
    ],
  },
};

export function getPricingContent(locale: "fr" | "en"): PricingContent {
  return locale === "en" ? EN : FR;
}
