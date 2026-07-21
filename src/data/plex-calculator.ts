/**
 * Content and UI copy for the Montreal plex investment calculator and its
 * companion reference page.
 *
 * Follows the same shape as trust-pages.ts: one record per locale, read through
 * an accessor. Kept out of src/i18n/*.ts because this is page content rather
 * than chrome, and because prerender.ts imports it directly to build static HTML.
 *
 * Every externally-sourced figure is dated and attributed. These are indexed or
 * re-legislated annually: REFERENCE_FIGURES is the single place to update them,
 * and both the calculator engine and the reference page read from the same
 * research.
 */

import { LOCALIZED_ROUTE_PAIRS } from "./localized-routes";

export type PlexLocale = "fr" | "en";

// Derived from the shared pair list so the language switcher, these constants
// and the prerender script can never disagree about a slug.
export const CALCULATOR_PATHS = {
  fr: LOCALIZED_ROUTE_PAIRS[0][0],
  en: `/en${LOCALIZED_ROUTE_PAIRS[0][1]}`,
} as const;

export const REFERENCE_PATHS = {
  fr: LOCALIZED_ROUTE_PAIRS[1][0],
  en: `/en${LOCALIZED_ROUTE_PAIRS[1][1]}`,
} as const;

/** Date the external figures below were last verified against primary sources. */
export const FIGURES_VERIFIED = "2026-07";

// ---------------------------------------------------------------------------
// Reference figures: the citable core
// ---------------------------------------------------------------------------

export interface ReferenceFigure {
  id: string;
  label: { fr: string; en: string };
  value: { fr: string; en: string };
  source: string;
  sourceUrl: string;
}

export const REFERENCE_FIGURES: ReferenceFigure[] = [
  {
    id: "droits-mutation-montreal",
    label: {
      fr: "Droits de mutation : Montréal (2026)",
      en: "Welcome tax: Montreal (2026)",
    },
    value: {
      fr: "0,5 % jusqu'à 62 900 $ · 1 % jusqu'à 315 000 $ · 1,5 % jusqu'à 552 300 $ · 2 % jusqu'à 1 104 700 $ · 2,5 % jusqu'à 2 136 500 $ · 3,5 % jusqu'à 3 113 000 $ · 4 % au-delà",
      en: "0.5% to $62,900 · 1% to $315,000 · 1.5% to $552,300 · 2% to $1,104,700 · 2.5% to $2,136,500 · 3.5% to $3,113,000 · 4% above",
    },
    source: "Ville de Montréal",
    sourceUrl:
      "https://montreal.ca/articles/comment-sont-calcules-les-droits-sur-les-mutations-immobilieres-9279",
  },
  {
    id: "droits-mutation-quebec",
    label: {
      fr: "Droits de mutation : barème québécois de base (2026)",
      en: "Welcome tax: Quebec base schedule (2026)",
    },
    value: {
      fr: "0,5 % jusqu'à 62 900 $ · 1 % jusqu'à 315 000 $ · 1,5 % au-delà. Les municipalités hors Montréal peuvent ajouter jusqu'à 3 % sur la tranche excédant 500 000 $.",
      en: "0.5% to $62,900 · 1% to $315,000 · 1.5% above. Municipalities outside Montreal may add up to 3% on the portion above $500,000.",
    },
    source: "Gouvernement du Québec",
    sourceUrl:
      "https://www.quebec.ca/gouvernement/gestion-municipale/finances-fiscalite-municipales/fiscalite/droits-mutations-immobilieres",
  },
  {
    id: "mise-de-fonds",
    label: {
      fr: "Mise de fonds minimale : immeuble occupé par le propriétaire",
      en: "Minimum down payment: owner-occupied",
    },
    value: {
      fr: "1 à 2 logements : 5 % sur la première tranche de 500 000 $ puis 10 % · 3 à 4 logements : 10 % · Immeuble non occupé par le propriétaire : 20 %",
      en: "1–2 units: 5% on the first $500,000 then 10% · 3–4 units: 10% · Not owner-occupied: 20%",
    },
    source: "SCHL / CMHC",
    sourceUrl:
      "https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mortgage-loan-insurance-homeownership-programs/purchase",
  },
  {
    id: "ratio-pret-valeur",
    label: {
      fr: "Ratio prêt-valeur assurable maximal",
      en: "Maximum insured loan-to-value",
    },
    value: {
      fr: "95 % pour 1 à 2 logements · 90 % pour 3 à 4 logements · Prix d'achat maximal de 1 500 000 $ · Amortissement de 25 ans, ou 30 ans pour les premiers acheteurs et les constructions neuves (depuis décembre 2024)",
      en: "95% for 1–2 units · 90% for 3–4 units · Maximum purchase price $1,500,000 · 25-year amortization, or 30 years for first-time buyers and new construction (since December 2024)",
    },
    source: "SCHL / CMHC",
    sourceUrl:
      "https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mortgage-loan-insurance-homeownership-programs/purchase",
  },
  {
    id: "prime-schl",
    label: {
      fr: "Prime d'assurance prêt hypothécaire",
      en: "Mortgage loan insurance premium",
    },
    value: {
      fr: "Immeubles de 1 à 4 logements (prêts propriétaires-occupants) : 0,60 % à 65 % RPV · 1,70 % à 75 % · 2,40 % à 80 % · 2,80 % à 85 % · 3,10 % à 90 % · 4,00 % à 95 %. Les primes multilogement (5+) sont tarifées au risque depuis le 14 juillet 2025 et ont augmenté dans la plupart des dossiers.",
      en: "1–4 unit homeowner loans: 0.60% at 65% LTV · 1.70% at 75% · 2.40% at 80% · 2.80% at 85% · 3.10% at 90% · 4.00% at 95%. Multi-unit (5+) premiums moved to risk-based pricing on July 14, 2025 and rose in most files.",
    },
    source: "SCHL / CMHC",
    sourceUrl:
      "https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mortgage-loan-insurance-homeownership-programs/purchase",
  },
  {
    id: "mli-select",
    label: {
      fr: "SCHL MLI Select: 5 logements et plus",
      en: "CMHC MLI Select: 5+ units",
    },
    value: {
      fr: "50 / 70 / 100 points donnent 10 / 20 / 30 % de réduction de prime, jusqu'à 95 % RPV et 50 ans d'amortissement. Surprime de 0,25 % par tranche de 5 ans au-delà de 25 ans. Depuis la tarification au risque du 14 juillet 2025, les primes effectives ont augmenté dans la majorité des dossiers : budgétez la prime avec votre courtier.",
      en: "50 / 70 / 100 points give a 10 / 20 / 30% premium discount, up to 95% LTV and 50-year amortization. Surcharge of 0.25% per 5-year increment beyond 25 years. Since risk-based pricing took effect on July 14, 2025, effective premiums rose in most files: budget the premium with your broker.",
    },
    source: "SCHL / CMHC",
    sourceUrl: "https://www.cmhc-schl.gc.ca/",
  },
  {
    id: "tal-2026",
    label: {
      fr: "Hausse de loyer suggérée par le TAL (2026)",
      en: "TAL suggested rent increase (2026)",
    },
    value: {
      fr: "3,1 % pour les baux débutant entre le 2 avril 2026 et le 1er avril 2027. S'applique aux locataires en place.",
      en: "3.1% for leases beginning between 2 April 2026 and 1 April 2027. Applies to sitting tenants.",
    },
    source: "Tribunal administratif du logement",
    sourceUrl: "https://www.tal.gouv.qc.ca/fr/calcul-pour-l-augmentation-de-loyer",
  },
  {
    id: "prix-medians",
    label: {
      fr: "Prix médians : RMR de Montréal (T1 2026)",
      en: "Median prices: Montreal CMA (Q1 2026)",
    },
    value: {
      fr: "Copropriété 425 000 $ · Duplex 710 000 $ · Triplex 900 000 $ · Quadruplex 1 100 000 $ · Unifamiliale 639 000 $ · Plex (toutes catégories) 865 000 $",
      en: "Condo $425,000 · Duplex $710,000 · Triplex $900,000 · Quadruplex $1,100,000 · Single-family $639,000 · Plex (all) $865,000",
    },
    source: "APCIQ",
    sourceUrl:
      "https://apciq.ca/en/residential-sales-stabilize-in-2026s-first-quarter-but-prices-remain-under-pressure/",
  },
  {
    id: "loyers-moyens",
    label: {
      fr: "Loyers : parc occupé contre loyers demandés",
      en: "Rents: occupied stock vs. asking",
    },
    value: {
      fr: "Un 4½ (2 chambres) occupé se loue en moyenne 1 346 $ dans le Grand Montréal, contre environ 1 826 $ demandés à la relocation. Cet écart est le potentiel de valorisation.",
      en: "An occupied 4½ (2-bedroom) averages $1,346 in Greater Montreal against roughly $1,826 asked on turnover. That spread is the value-add.",
    },
    source: "SCHL : Enquête sur les logements locatifs",
    sourceUrl:
      "https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-data/data-tables/rental-market/rental-market-report-data-tables",
  },
  {
    id: "valeur-economique",
    label: {
      fr: "Valeur économique : la valeur du prêteur (5 logements et plus)",
      en: "Economic value: the lender's value (5+ units)",
    },
    value: {
      fr: "Méthode : le prêteur normalise quatre postes de dépenses (gestion, entretien et réparations, conciergerie, inoccupation), divise le revenu net normalisé (RNN) par le ratio de couverture de la dette (RCD, généralement 1,10 à 1,30), actualise ce paiement au taux de qualification sur l'amortissement, puis divise le prêt obtenu par le ratio prêt-valeur (souvent 75 %). Les montants normalisés ne sont pas publics : chaque institution fixe les siens, en s'inspirant généralement des normes de la SCHL. Le calculateur utilise des valeurs illustratives (gestion 5 % des revenus, entretien 500 $/logement, conciergerie 200 $/logement, inoccupation d'au moins 3 %), ce ne sont pas les barèmes d'une banque précise. Quand la valeur économique est sous le prix d'achat, l'acheteur couvre l'écart comptant.",
      en: "Method: the lender normalizes four expense lines (management, maintenance and repairs, janitorial, vacancy), divides the normalized NOI by the debt coverage ratio (typically 1.10–1.30), discounts that payment at the qualification rate over the amortization, then divides the resulting loan by the loan-to-value ratio (often 75%). The normalized amounts are not public: each institution sets its own, generally drawing on CMHC standards. This calculator uses illustrative values (management 5% of revenue, maintenance $500/unit, janitorial $200/unit, vacancy floored at 3%), these are not any specific bank's schedule. When the economic value sits below the purchase price, the buyer covers the gap in cash.",
    },
    source: "Méthode : Collège MREX",
    sourceUrl:
      "https://mrex.co/comment-calculer-la-valeur-economique-dun-immeuble-multilogement/",
  },
  {
    id: "cca",
    label: {
      fr: "Déduction pour amortissement (DPA)",
      en: "Capital cost allowance (CCA)",
    },
    value: {
      fr: "Catégorie 1 : 4 % dégressif sur la portion bâtiment. Règle du demi-taux la première année. Le terrain n'est pas amortissable. La DPA réclamée est récupérée à la vente et imposée au taux marginal.",
      en: "Class 1: 4% declining balance on the building portion. Half-year rule in year one. Land is not depreciable. CCA claimed is recaptured on sale and taxed at the marginal rate.",
    },
    source: "Agence du revenu du Canada",
    sourceUrl: "https://www.canada.ca/fr/agence-revenu.html",
  },
];

// ---------------------------------------------------------------------------
// Page content
// ---------------------------------------------------------------------------

export interface FaqEntry {
  /** Used as the heading anchor so answers can be cited section by section. */
  id: string;
  q: string;
  a: string;
}

export interface PlexPageLocale {
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  intro: string;
  /** Short factual summary AI assistants can lift verbatim. */
  summary: string;
  sections: { id: string; heading: string; body: string[] }[];
  faq: FaqEntry[];
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
}

export const CALCULATOR_PAGE: Record<PlexLocale, PlexPageLocale> = {
  fr: {
    title: "Calculateur de rendement pour plex à Montréal",
    metaTitle: "Calculateur de rendement plex Montréal 2026",
    metaDescription:
      "Calculez le rendement d'un duplex ou triplex à Montréal : droits de mutation, mise de fonds SCHL, plafond du TAL et DPA. Chiffres 2026 vérifiés.",
    keywords:
      "calculateur rendement plex Montréal, calcul rentabilité duplex, triplex Montréal investissement, droits de mutation Montréal, taxe de bienvenue calcul, mise de fonds immeuble à revenus Québec, MLI Select",
    intro:
      "Un outil gratuit pour évaluer un immeuble à revenus au Québec avec les règles qui s'appliquent réellement ici : le barème de droits de mutation propre à Montréal, les plafonds de prêt de la SCHL selon le nombre de logements, la limite de hausse de loyer du TAL et la récupération de la DPA à la revente.",
    summary:
      "Ce calculateur évalue duplex, triplex, quadruplex, immeubles de 5 logements et plus, copropriétés et projets de revente au Québec. Il applique le barème de droits de mutation de Montréal (jusqu'à 4 % au-delà de 3 113 000 $), les ratios prêt-valeur de la SCHL (95 % pour 1 à 2 logements, 90 % pour 3 à 4), la hausse suggérée du TAL de 3,1 % pour 2026 et la déduction pour amortissement de catégorie 1 à 4 %.",
    sections: [
      {
        id: "ce-qui-change-au-quebec",
        heading: "Ce qui change au Québec",
        body: [
          "La plupart des calculateurs d'immeubles à revenus sont américains. Ils ignorent quatre règles qui déterminent le rendement d'un plex québécois.",
          "Les droits de mutation : Montréal est la seule municipalité autorisée à dépasser le plafond provincial de 3 %. Son barème atteint 4 % sur la tranche excédant 3 113 000 $. Hors de l'île, le barème provincial de base s'applique et coûte nettement moins cher sur le même prix.",
          "Le plafond du TAL : la hausse suggérée pour 2026 est de 3,1 %. Elle s'applique aux locataires en place. Un loyer ne rejoint le marché qu'au départ du locataire, ce qui étale la valorisation sur plusieurs années.",
          "Le financement : à cinq logements, l'immeuble passe du résidentiel au commercial. Le prêt n'est plus fixé par la mise de fonds mais par le ratio de couverture de la dette calculé sur le revenu net.",
          "La DPA : le Canada utilise l'amortissement dégressif de catégorie 1 à 4 %, et la déduction réclamée est récupérée à la vente. C'est un report d'impôt, pas une économie.",
        ],
      },
      {
        id: "comment-utiliser",
        heading: "Comment utiliser le calculateur",
        body: [
          "Choisissez d'abord le secteur. Les prix, les loyers et le taux de taxe municipale s'ajustent selon le quartier montréalais, la ville de la Rive-Sud ou de la Rive-Nord retenue, et le barème de droits de mutation bascule automatiquement hors agglomération.",
          "Choisissez ensuite le type d'immeuble. La composition des logements, le mode de financement et les dépenses se réinitialisent selon les médianes du secteur.",
          "Ajustez enfin la composition réelle : loyers en place, loyers du marché, superficie. L'écart entre le loyer perçu aujourd'hui et le loyer atteignable à la relocation est le cœur du calcul.",
        ],
      },
      {
        id: "limites",
        heading: "Limites de l'outil",
        body: [
          "Les chiffres proviennent de sources publiques datées de juillet 2026 et servent de point de départ, pas d'évaluation. Les taux de taxe municipale sont approximés à partir du prix : remplacez-les par le compte de taxes réel. Les primes MLI Select sont indicatives, la SCHL tarifant chaque dossier individuellement.",
          "Les indices de prix par secteur sont ancrés sur des chiffres publiés pour six secteurs; les autres sont interpolés selon leur position relative. L'outil l'indique pour chaque secteur.",
          "Cet outil ne remplace ni un courtier hypothécaire, ni un comptable, ni une inspection.",
        ],
      },
    ],
    faq: [
      {
        id: "faq-taxe-bienvenue-montreal",
        q: "Combien coûte la taxe de bienvenue à Montréal en 2026 ?",
        a: "Montréal applique son propre barème progressif : 0,5 % jusqu'à 62 900 $, 1 % jusqu'à 315 000 $, 1,5 % jusqu'à 552 300 $, 2 % jusqu'à 1 104 700 $, 2,5 % jusqu'à 2 136 500 $, 3,5 % jusqu'à 3 113 000 $ et 4 % au-delà. Sur un triplex de 900 000 $, cela représente environ 13 400 $. Hors de l'agglomération, le barème provincial de base plafonne à 1,5 % au-delà de 315 000 $, ce qui coûte sensiblement moins cher sur le même prix.",
      },
      {
        id: "faq-mise-de-fonds-triplex",
        q: "Quelle mise de fonds faut-il pour un triplex à Montréal ?",
        a: "Si vous occupez un des logements, un triplex est assurable jusqu'à 90 % de la valeur, donc 10 % de mise de fonds minimum. Pour un duplex occupé par le propriétaire, le plafond monte à 95 % : 5 % sur la première tranche de 500 000 $ puis 10 % sur le reste. Si vous n'occupez pas l'immeuble, l'assurance prêt hypothécaire n'est pas disponible et la mise de fonds minimale est de 20 %.",
      },
      {
        id: "faq-cinq-logements",
        q: "Pourquoi le financement change-t-il à cinq logements ?",
        a: "À cinq logements et plus, l'immeuble est financé comme un actif commercial. Le prêteur ne fixe plus le prêt en fonction de votre mise de fonds mais du revenu net d'exploitation : il retient le moindre du plafond prêt-valeur et du montant que le revenu supporte au ratio de couverture visé, généralement entre 1,10 et 1,30. Sur un immeuble à faible revenu, c'est le ratio de couverture qui limite, et la mise de fonds requise peut dépasser largement 25 %.",
      },
      {
        id: "faq-tal-hausse-loyer",
        q: "De combien puis-je augmenter le loyer après l'achat ?",
        a: "Pour un locataire en place, la hausse suggérée par le TAL est de 3,1 % pour les baux débutant entre le 2 avril 2026 et le 1er avril 2027, à laquelle peuvent s'ajouter certains éléments comme la hausse des taxes municipales et scolaires, des assurances et une portion des travaux majeurs. Un loyer ne rejoint le loyer du marché qu'au moment d'une relocation.",
      },
      {
        id: "faq-dpa-recuperation",
        q: "La déduction pour amortissement est-elle avantageuse ?",
        a: "La DPA de catégorie 1 réduit le revenu imposable de 4 % par année sur la portion bâtiment, en dégressif, avec la règle du demi-taux la première année. Mais la totalité de la DPA réclamée est récupérée à la vente et imposée à votre taux marginal, pas au taux réduit du gain en capital. C'est un report d'impôt, utile si votre taux marginal baisse d'ici la revente, coûteux dans le cas contraire.",
      },
      {
        id: "faq-valeur-economique",
        q: "Qu'est-ce que la valeur économique d'un immeuble ?",
        a: "C'est la valeur que le prêteur calcule lui-même pour décider du financement d'un immeuble de 5 logements et plus, et elle diffère du prix du marché. La banque remplace quatre postes de dépenses par ses propres normes (gestion, entretien et réparations, conciergerie, inoccupation), divise le revenu net normalisé par son ratio de couverture de la dette, actualise ce paiement à un taux de qualification majoré et divise le prêt obtenu par le ratio prêt-valeur. Si cette valeur est inférieure à votre prix d'achat, le prêt est plafonné par le chiffre de la banque et vous couvrez tout l'écart comptant : la mise de fonds réelle devient le prix moins le prêt maximal, pas 20 % du prix. Les barèmes normalisés ne sont pas publics et varient d'une institution à l'autre (elles s'inspirent généralement des normes de la SCHL), et la valeur bouge avec les taux de qualification.",
      },
      {
        id: "faq-rentabilite-plex-montreal",
        q: "Un plex à Montréal est-il rentable en 2026 ?",
        a: "Les rendements bruts se situent généralement entre 4 et 5 %, et les rendements nets entre 2,5 et 4 % selon le secteur. À 20 % de mise de fonds et aux taux actuels, beaucoup de plex montréalais aux loyers réglementés ne génèrent pas de flux de trésorerie positif dès la première année : le rendement provient du remboursement du capital, de l'appréciation et de la remise à niveau des loyers à la relocation. Les secteurs centraux affichent des taux de capitalisation plus faibles que les secteurs périphériques.",
      },
    ],
    ctaHeading: "Vous avez trouvé un immeuble qui tient la route ?",
    ctaBody:
      "Gestion Velora administre des syndicats de copropriété, des immeubles locatifs et des locations de courte durée dans le Grand Montréal. Les frais de gestion sont une ligne de votre calcul : parlons du chiffre réel pour votre immeuble.",
    ctaButton: "Parler à l'équipe",
  },
  en: {
    title: "Montreal plex investment calculator",
    metaTitle: "Montreal Plex Investment Calculator 2026",
    metaDescription:
      "Underwrite a Montreal duplex or triplex with Quebec rules: welcome tax, CMHC down payment caps, TAL rent limit and CCA. Verified 2026 figures.",
    keywords:
      "Montreal plex investment calculator, duplex triplex cash flow Quebec, welcome tax calculator Montreal, CMHC down payment multiplex, MLI Select calculator, Quebec rental property returns",
    intro:
      "A free tool for underwriting Quebec income property with the rules that actually apply here: Montreal's own welcome-tax schedule, CMHC lending caps by unit count, the TAL rent-increase ceiling, and CCA recapture on sale.",
    summary:
      "This calculator underwrites duplexes, triplexes, quadruplexes, 5+ unit buildings, condos and flips in Quebec. It applies Montreal's welcome-tax schedule (reaching 4% above $3,113,000), CMHC loan-to-value caps (95% for 1–2 units, 90% for 3–4), the TAL's 3.1% suggested increase for 2026, and Class 1 capital cost allowance at 4%.",
    sections: [
      {
        id: "what-is-different-in-quebec",
        heading: "What is different in Quebec",
        body: [
          "Most income-property calculators are American. They miss four rules that decide whether a Quebec plex works.",
          "Welcome tax: Montreal is the only municipality permitted to exceed the 3% provincial ceiling, and its schedule reaches 4% on the portion above $3,113,000. Off the island, the provincial base schedule applies and costs materially less on the same price.",
          "The TAL ceiling: the suggested increase for 2026 is 3.1%, and it applies to sitting tenants. A rent only reaches market when the unit turns over, which spreads the value-add across years.",
          "Financing: at five units a building stops being residential and becomes commercial. The loan is no longer set by your down payment but by the debt-service coverage the net operating income supports.",
          "CCA: Canada uses declining-balance Class 1 depreciation at 4%, and everything claimed is recaptured on sale. It is a deferral, not a saving.",
        ],
      },
      {
        id: "how-to-use-it",
        heading: "How to use the calculator",
        body: [
          "Start with the area. Prices, rents and the municipal tax rate adjust to the borough or off-island city you pick, and the welcome-tax schedule switches automatically once you leave the Montreal agglomeration.",
          "Then choose the property type. Unit mix, financing track and operating expenses reseed to that type's area medians.",
          "Finally enter the real rent roll: in-place rents, market rents, unit sizes. The gap between what the leases collect today and what the units achieve on turnover is the heart of the calculation.",
        ],
      },
      {
        id: "limitations",
        heading: "Limitations",
        body: [
          "Figures come from public sources dated July 2026 and are a starting point, not an appraisal. Municipal tax rates are estimated from price: replace them with the actual tax bill. MLI Select premiums are indicative; CMHC prices each file individually.",
          "Area price indices are anchored to published figures for six areas; the rest are interpolated by relative standing, and the tool labels which is which.",
          "This tool does not replace a mortgage broker, an accountant or an inspection.",
        ],
      },
    ],
    faq: [
      {
        id: "faq-welcome-tax-montreal",
        q: "How much is the welcome tax in Montreal in 2026?",
        a: "Montreal applies its own progressive schedule: 0.5% to $62,900, 1% to $315,000, 1.5% to $552,300, 2% to $1,104,700, 2.5% to $2,136,500, 3.5% to $3,113,000, and 4% above that. On a $900,000 triplex that is roughly $13,400. Outside the agglomeration the provincial base schedule tops out at 1.5% above $315,000, which costs considerably less on the same price.",
      },
      {
        id: "faq-down-payment-triplex",
        q: "What down payment do you need for a triplex in Montreal?",
        a: "If you occupy one of the units, a triplex is insurable to 90% loan-to-value, so 10% down is the minimum. An owner-occupied duplex insures to 95%: 5% on the first $500,000 then 10% on the balance. If you do not occupy the building, mortgage loan insurance is unavailable and the minimum down payment is 20%.",
      },
      {
        id: "faq-five-units",
        q: "Why does financing change at five units?",
        a: "At five units and above the building is financed as a commercial asset. The lender no longer sizes the loan from your down payment but from net operating income: it takes the lesser of the loan-to-value cap and the amount the income supports at the target debt-service coverage ratio, typically 1.10 to 1.30. On a low-income building the coverage test binds, and the equity required can far exceed 25%.",
      },
      {
        id: "faq-tal-rent-increase",
        q: "How much can you raise the rent after buying?",
        a: "For a sitting tenant the TAL's suggested increase is 3.1% for leases beginning between 2 April 2026 and 1 April 2027, plus certain additions such as increases in municipal and school taxes, insurance, and a portion of major work. A rent only reaches market level when the unit turns over.",
      },
      {
        id: "faq-cca-recapture",
        q: "Is claiming capital cost allowance worth it?",
        a: "Class 1 CCA reduces taxable income by 4% a year on the building portion, declining balance, with the half-year rule in year one. But everything claimed is recaptured on sale and taxed at your full marginal rate rather than the lower capital-gains rate. It is a tax deferral: useful if your marginal rate falls before you sell, costly if it does not.",
      },
      {
        id: "faq-economic-value",
        q: "What is a building's economic value?",
        a: "It is the value the lender computes for itself to decide the financing on a 5+ unit building, and it differs from the market price. The bank substitutes its own standards for four expense lines (management, maintenance and repairs, janitorial, vacancy), divides the normalized net income by its debt coverage ratio, discounts that payment at a stress-tested qualification rate, and divides the resulting loan by the loan-to-value ratio. If that value comes in below your purchase price, the loan is capped by the bank's number and you cover the entire gap in cash: the real down payment becomes price minus maximum loan, not 20% of price. The normalized figures are not public and vary by institution, they generally draw on CMHC standards, and the value moves with qualification rates.",
      },
      {
        id: "faq-are-montreal-plexes-profitable",
        q: "Are Montreal plexes profitable in 2026?",
        a: "Gross yields generally run 4–5% and net yields 2.5–4% depending on the area. At 20% down and current rates, many Montreal plexes with rent-controlled leases do not produce positive cash flow in year one: the return comes from principal paydown, appreciation and resetting rents on turnover. Central boroughs show lower cap rates than peripheral ones.",
      },
    ],
    ctaHeading: "Found a building that works?",
    ctaBody:
      "Gestion Velora manages condo boards, rental buildings and short-term rentals across Greater Montreal. Management fees are a line in your own calculation: let's talk about the real number for your building.",
    ctaButton: "Talk to the team",
  },
};

export const REFERENCE_PAGE: Record<PlexLocale, {
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  intro: string;
  figuresHeading: string;
  figuresNote: string;
}> = {
  fr: {
    title: "Guide de l'acheteur de plex à Montréal : règles et chiffres 2026",
    metaTitle: "Guide achat plex Montréal : règles et chiffres 2026",
    metaDescription:
      "Droits de mutation de Montréal, mise de fonds et ratios SCHL, MLI Select, hausse du TAL, prix médians APCIQ. Chiffres 2026, chaque source citée.",
    keywords:
      "droits de mutation Montréal 2026, taxe de bienvenue barème, mise de fonds duplex triplex Québec, SCHL ratio prêt-valeur, MLI Select points, hausse loyer TAL 2026, prix médian plex Montréal",
    intro:
      "Les règles et les chiffres qui déterminent l'achat d'un immeuble à revenus au Québec, avec la source de chacun. Ces valeurs sont indexées ou révisées chaque année : vérifiez-les auprès de la source avant de déposer une offre.",
    figuresHeading: "Chiffres de référence",
    figuresNote:
      "Dernière vérification auprès des sources primaires : juillet 2026. Les barèmes de droits de mutation et les seuils sont indexés annuellement.",
  },
  en: {
    title: "Montreal plex buyer's guide: 2026 rules and figures",
    metaTitle: "Montreal Plex Buyer's Guide: 2026 Rules & Figures",
    metaDescription:
      "Montreal welcome tax, CMHC down payment and LTV caps, MLI Select, TAL rent increase and APCIQ median prices. 2026 figures, every source cited.",
    keywords:
      "Montreal welcome tax 2026, Quebec transfer duties brackets, duplex triplex down payment Quebec, CMHC loan to value multiplex, MLI Select points, TAL rent increase 2026, Montreal plex median price",
    intro:
      "The rules and figures that decide a Quebec income-property purchase, each with its source. These values are indexed or revised annually: verify them at the source before making an offer.",
    figuresHeading: "Reference figures",
    figuresNote:
      "Last verified against primary sources: July 2026. Transfer-duty brackets and thresholds are indexed annually.",
  },
};

export function getCalculatorPage(locale: PlexLocale): PlexPageLocale {
  return CALCULATOR_PAGE[locale];
}
