export const RADAR_PATHS = {
  fr: "/immeubles-a-revenus-a-vendre-montreal",
  en: "/en/montreal-income-properties-for-sale",
} as const;

export type RadarLocale = "fr" | "en";

export type RadarExpenseLine = {
  key: string;
  label: string;
  amount: number;
  source: "reported" | "estimated";
  rule: string;
};

export type RadarListing = {
  listing_id: string;
  url: string;
  property_type: string;
  address: string;
  city: string;
  region: string;
  price: number;
  units: number;
  residential_units?: number;
  commercial_units?: number;
  mixed_use?: boolean;
  potential_gross_income: number | null;
  municipal_taxes: number | null;
  school_taxes: number | null;
  insurance: number | null;
  year_built: number | null;
  listed_at: string;
};

export type RadarDeal = {
  listing: RadarListing;
  status: "underwritten" | "needs-income";
  quality?: { score: number; label: string; estimated_fields: string[] };
  expense_policy?: {
    version: string;
    building_age: number | null;
    reported_total: number;
    estimated_total: number;
    total: number;
    lines: RadarExpenseLine[];
  };
  metrics: Record<string, number | string>;
  analysis: { verdict: string; score: number; max_score: number };
  lifecycle?: { event_type: string; changes: Array<{ field: string; before: unknown; after: unknown }> };
};

export type RadarFeed = {
  release: string;
  generated_at: string;
  underwriting_version?: string;
  expense_policy_version?: string;
  candidate_count?: number;
  failure_count?: number;
  deals: RadarDeal[];
};

export type RadarMetrics = {
  capRate: number;
  cashOnCash: number;
  dscr: number;
  grm: number;
  monthlyCashFlow: number;
  cashFlowPerDoor: number;
  noi: number;
  operatingExpenses: number;
  annualDebtService: number;
  loan: number;
  score: number;
  verdict: string;
};

const n = (deal: RadarDeal, key: string) => Number(deal.metrics[key] ?? 0);

/**
 * Comparable-sale fields are optional because older Radar releases predate
 * the valuation enrichment. Accept the stable key plus the two legacy names
 * used by early producer prototypes, without ever substituting asking price.
 */
function radarComparableValue(deal: RadarDeal): number {
  return [
    "comparable_value",
    "average_comparable_value",
    "comparables_average_value",
  ].map((key) => n(deal, key)).find((value) => value > 0) ?? 0;
}

function radarComparableCount(deal: RadarDeal): number {
  return Math.max(0, Math.round([
    "comparable_count",
    "comparables_count",
  ].map((key) => n(deal, key)).find((value) => value > 0) ?? 0));
}

/** Optional verified market assumptions produced outside the subject listing. */
function radarMarketCapRate(deal: RadarDeal): number {
  return ["market_cap_rate", "market_tga"].map((key) => n(deal, key))
    .find((value) => value > 0) ?? 0;
}

function radarMarketGrm(deal: RadarDeal): number {
  return ["market_grm", "market_mrb"].map((key) => n(deal, key))
    .find((value) => value > 0) ?? 0;
}

export function publishedRadarMetrics(deal: RadarDeal): RadarMetrics | null {
  if (deal.status !== "underwritten") return null;
  return {
    capRate: n(deal, "cap_rate"),
    cashOnCash: n(deal, "cash_on_cash"),
    dscr: n(deal, "dscr"),
    grm: n(deal, "grm"),
    monthlyCashFlow: n(deal, "monthly_cash_flow"),
    cashFlowPerDoor: n(deal, "monthly_cash_flow_per_door"),
    noi: n(deal, "noi"),
    operatingExpenses: n(deal, "operating_expenses"),
    annualDebtService: n(deal, "annual_debt_service"),
    loan: n(deal, "loan"),
    score: deal.analysis.score,
    verdict: deal.analysis.verdict,
  };
}

function periodicRate(annualRate: number) {
  return Math.pow(1 + annualRate / 2, 2 / 12) - 1;
}

function payment(rate: number, periods: number, principal: number) {
  if (principal <= 0 || periods <= 0) return 0;
  if (rate === 0) return principal / periods;
  const factor = Math.pow(1 + rate, periods);
  return principal * rate * factor / (factor - 1);
}

function presentValue(rate: number, periods: number, periodicPayment: number) {
  if (rate === 0) return periodicPayment * periods;
  return periodicPayment * (1 - Math.pow(1 + rate, -periods)) / rate;
}

function grade(metrics: Omit<RadarMetrics, "score" | "verdict">, commercial: boolean) {
  let score = 0;
  const points = (value: number, good: number, warning: number, reverse = false) => {
    if (reverse ? value <= good : value >= good) score += 2;
    else if (reverse ? value <= warning : value >= warning) score += 1;
  };
  points(metrics.capRate, commercial ? 0.07 : 0.08, 0.05);
  points(metrics.cashOnCash, commercial ? 0.08 : 0.10, commercial ? 0.04 : 0.05);
  points(metrics.dscr, commercial ? 1.3 : 1.25, commercial ? 1.1 : 1);
  points(metrics.cashFlowPerDoor, commercial ? 150 : 200, 0);
  points(metrics.grm, 10, 15, true);
  points((metrics.operatingExpenses + metrics.annualDebtService) / Math.max(1, metrics.noi + metrics.operatingExpenses), 0.8, 1, true);
  return { score, verdict: score >= 9 ? "strong-buy" : score >= 6 ? "buy" : score >= 3 ? "hold" : "avoid" };
}

export function calculateRadarScenario(deal: RadarDeal, excludedKeys: string[]): RadarMetrics | null {
  const listing = deal.listing;
  const gross = listing.potential_gross_income ?? 0;
  if (deal.status !== "underwritten" || gross <= 0) return null;
  const excluded = new Set(excludedKeys);
  const removedLines = deal.expense_policy?.lines.filter((line) => line.source === "estimated" && excluded.has(line.key)) ?? [];
  const removed = removedLines.reduce((sum, line) => sum + line.amount, 0);
  const operatingExpenses = Math.max(0, n(deal, "operating_expenses") - removed);
  const noi = gross * 0.97 - operatingExpenses;
  const commercial = listing.units >= 5 || Boolean(listing.mixed_use) || (listing.commercial_units ?? 0) > 0;
  const years = commercial ? 40 : 25;
  let loan = listing.price * 0.75;
  if (commercial) {
    const lenderKeys = new Set(["insurance", "capex", "snow", "lawn", "utilities"]);
    const lenderRemoved = removedLines.filter((line) => lenderKeys.has(line.key)).reduce((sum, line) => sum + line.amount, 0);
    const normalizedExpenses = Math.max(0, n(deal, "normalized_expenses") - lenderRemoved);
    const normalizedNoi = gross * 0.97 - normalizedExpenses;
    loan = Math.min(loan, presentValue(periodicRate(0.0675), years * 12, Math.max(0, normalizedNoi) / 1.2 / 12));
  }
  const annualDebtService = payment(periodicRate(0.0475), years * 12, loan) * 12;
  const annualCashFlow = noi - annualDebtService;
  const totalEquity = listing.price - loan + n(deal, "closing_costs");
  const base = {
    capRate: noi / listing.price,
    cashOnCash: totalEquity > 0 ? annualCashFlow / totalEquity : 0,
    dscr: annualDebtService > 0 ? noi / annualDebtService : 0,
    grm: listing.price / gross,
    monthlyCashFlow: annualCashFlow / 12,
    cashFlowPerDoor: annualCashFlow / 12 / listing.units,
    noi,
    operatingExpenses,
    annualDebtService,
    loan,
  };
  return { ...base, ...grade(base, commercial) };
}

export function calculatorUrl(deal: RadarDeal, locale: RadarLocale, excluded: string[] = []): string {
  const listing = deal.listing;
  const lines = Object.fromEntries((deal.expense_policy?.lines ?? []).map((line) => [
    line.key,
    line.source === "estimated" && excluded.includes(line.key) ? 0 : line.amount,
  ]));
  const params = new URLSearchParams({
    source: "plex-radar",
    listingId: listing.listing_id,
    askingPrice: String(listing.price),
    purchasePrice: String(listing.price),
    units: String(listing.units),
    grossAnnual: String(listing.potential_gross_income ?? 0),
    buildingYear: String(listing.year_built ?? 0),
    municipalTaxes: String(listing.municipal_taxes ?? lines.municipal_taxes ?? 0),
    schoolTax: String(listing.school_taxes ?? lines.school_taxes ?? 0),
    insurance: String(lines.insurance ?? 0),
    snow: String(lines.snow ?? 0),
    lawn: String(lines.lawn ?? 0),
    hydro: String(lines.utilities ?? 0),
    repairs: String(lines.repairs ?? 0),
    management: String(lines.management ?? 0),
    capex: String(lines.capex ?? 0),
    mixedUse: String(Boolean(listing.mixed_use)),
    city: listing.city,
    areaKey: calculatorAreaKey(listing.city),
  });
  const comparableValue = radarComparableValue(deal);
  const comparableCount = radarComparableCount(deal);
  if (comparableValue > 0) params.set("comparableValue", String(comparableValue));
  if (comparableCount > 0) params.set("comparableCount", String(comparableCount));
  const marketCapRate = radarMarketCapRate(deal);
  const marketGrm = radarMarketGrm(deal);
  if (marketCapRate > 0) params.set("marketCapRate", String(marketCapRate));
  if (marketGrm > 0) params.set("marketGrm", String(marketGrm));
  const path = locale === "en" ? "/en/montreal-plex-investment-calculator" : "/calculateur-rendement-plex-montreal";
  return `${path}?${params.toString()}`;
}

function calculatorAreaKey(city: string): string {
  const value = city.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const matches: Array<[string, string[]]> = [
    ["saint-leonard", ["saint-leonard"]], ["hochelaga", ["hochelaga"]],
    ["ahuntsic", ["ahuntsic"]], ["anjou", ["anjou"]], ["villeray", ["villeray", "saint-michel", "parc-extension"]],
    ["saint-laurent", ["saint-laurent"]], ["longueuil", ["longueuil"]], ["greenfield-park", ["greenfield park"]],
    ["laval", ["laval"]], ["boisbriand", ["boisbriand"]], ["brossard", ["brossard"]],
    ["boucherville", ["boucherville"]], ["chambly", ["chambly"]], ["terrebonne", ["terrebonne"]],
    ["repentigny", ["repentigny"]], ["mirabel", ["mirabel"]], ["blainville", ["blainville"]],
  ];
  return matches.find(([, names]) => names.some((name) => value.includes(name)))?.[0]
    ?? (value.includes("montreal") ? "villeray" : "outside-gma");
}

/**
 * Metric definitions shown as tooltips on the page and mirrored verbatim in the
 * prerendered crawl shell (scripts/prerender.ts) so AI engines can quote them.
 * One source of truth — edit here, both surfaces follow.
 */
export const RADAR_METRIC_DEFS = {
  fr: {
    cap: { term: "Taux de capitalisation", def: "Revenu net d’exploitation annuel divisé par le prix demandé. Il mesure le rendement de l’immeuble avant financement." },
    cashOnCash: { term: "Rendement comptant (cash-on-cash)", def: "Flux de trésorerie annuel après financement divisé par la mise de fonds et les frais initiaux estimés." },
    dscr: { term: "Ratio de couverture de la dette (DSCR)", def: "Revenu net d’exploitation divisé par les paiements annuels de la dette. Au-dessus de 1, l’immeuble couvre sa dette." },
    grm: { term: "Multiplicateur de revenu brut (MRB)", def: "Prix demandé divisé par les revenus locatifs bruts annuels. Un multiple plus bas indique généralement un prix plus favorable par rapport aux revenus." },
  },
  en: {
    cap: { term: "Cap rate", def: "Annual net operating income divided by asking price. It measures the property return before financing." },
    cashOnCash: { term: "Cash-on-cash return", def: "Annual cash flow after financing divided by the estimated down payment and initial cash invested." },
    dscr: { term: "Debt service coverage ratio (DSCR)", def: "Net operating income divided by annual debt payments. Above 1 means the property covers its debt." },
    grm: { term: "Gross rent multiplier (GRM)", def: "Asking price divided by annual gross rental income. A lower multiple generally indicates a more favorable price relative to income." },
  },
} as const;

/**
 * FAQ rendered on the page and emitted as FAQPage JSON-LD (client + prerender).
 * Answers state the model's actual rules — keep in sync with
 * calculateRadarScenario() and the underwriting pipeline when they change.
 */
export const RADAR_FAQ: Record<RadarLocale, ReadonlyArray<{ id: string; q: string; a: string }>> = {
  fr: [
    {
      id: "mise-a-jour",
      q: "À quelle fréquence les immeubles à revenus sont-ils mis à jour?",
      a: "Une nouvelle parution est publiée chaque jour à partir des duplex, triplex, quadruplex et quintuplex récemment mis en vente au Québec. Les parutions précédentes restent consultables depuis le sélecteur d’historique.",
    },
    {
      id: "donnees",
      q: "D’où viennent les revenus et les dépenses affichés?",
      a: "Les revenus, taxes et l’assurance proviennent de la fiche publiée par le courtier lorsqu’ils sont divulgués; ils sont alors marqués « rapporté ». Les dépenses manquantes (réparations, gestion, réserve de remplacement, déneigement, entretien extérieur, services publics) sont estimées selon des règles explicites et marquées « estimé ».",
    },
    {
      id: "score",
      q: "Comment le score sur 12 est-il calculé?",
      a: "Six critères valent chacun de 0 à 2 points : taux de capitalisation, rendement comptant, ratio de couverture de la dette, flux de trésorerie par porte, multiplicateur de revenu brut et poids des charges totales. Un score de 9 ou plus signale un immeuble à prioriser, 6 à 8 à analyser, 3 à 5 à surveiller.",
    },
    {
      id: "financement",
      q: "Quelles hypothèses de financement le radar applique-t-il?",
      a: "Le modèle suppose une mise de fonds de 25 %, un amortissement de 25 ans pour le résidentiel de 2 à 4 logements et de 40 ans pour les immeubles de 5 logements et plus ou à usage mixte, dont le prêt est aussi limité par un test de couverture de dette de 1,2. Une provision pour inoccupation de 3 % est appliquée aux revenus bruts.",
    },
    {
      id: "verification",
      q: "Le radar remplace-t-il une vérification diligente?",
      a: "Non. C’est une présélection : chaque résultat conserve les faits rapportés, les estimations, la règle appliquée et la version du modèle, mais il faut valider les baux, les dépenses réelles, l’état de l’immeuble et les conditions de financement avant d’acheter.",
    },
    {
      id: "calculateur",
      q: "Peut-on pousser l’analyse d’une fiche plus loin?",
      a: "Oui. Chaque immeuble peut préremplir le calculateur de rendement plex de Gestion Velora, qui ajoute les droits de mutation de Montréal, les plafonds SCHL, les projections et la revente.",
    },
  ],
  en: [
    {
      id: "updates",
      q: "How often are the income properties updated?",
      a: "A new release is published every day from recently listed Quebec duplexes, triplexes, fourplexes and fiveplexes. Previous releases remain available from the history selector.",
    },
    {
      id: "data",
      q: "Where do the displayed income and expenses come from?",
      a: "Income, taxes and insurance come from the broker's published listing when disclosed and are marked \"reported\". Missing expenses (repairs, management, replacement reserves, snow removal, exterior care, utilities) are estimated with explicit rules and marked \"estimated\".",
    },
    {
      id: "score",
      q: "How is the score out of 12 calculated?",
      a: "Six criteria are each worth 0 to 2 points: cap rate, cash-on-cash return, debt service coverage ratio, cash flow per door, gross rent multiplier and total expense load. A score of 9 or more flags a property to prioritize, 6 to 8 to analyze, 3 to 5 to watch.",
    },
    {
      id: "financing",
      q: "What financing assumptions does the radar apply?",
      a: "The model assumes a 25% down payment, a 25-year amortization for 2-4 unit residential and 40 years for buildings with 5+ units or mixed use, whose loan is also capped by a 1.2 debt-coverage test. A 3% vacancy allowance is applied to gross income.",
    },
    {
      id: "diligence",
      q: "Does the radar replace due diligence?",
      a: "No. It is a screening tool: each result preserves reported facts, estimates, the applied rule and the model version, but leases, actual expenses, building condition and financing terms must be validated before buying.",
    },
    {
      id: "calculator",
      q: "Can a listing be analyzed in more depth?",
      a: "Yes. Every property can prefill Gestion Velora's Quebec plex investment calculator, which adds Montreal transfer duties, CMHC loan limits, projections and resale analysis.",
    },
  ],
} as const;

export const RADAR_META = {
  fr: {
    title: "Immeubles à revenus à vendre à Montréal — Analyse quotidienne",
    description: "Découvrez les duplex, triplex, quadruplex et quintuplex récemment publiés à Montréal, classés selon leur rendement, leur flux de trésorerie et la qualité des données.",
  },
  en: {
    title: "Montreal Income Properties for Sale — Daily Deal Analysis",
    description: "Explore recently published Montreal duplexes, triplexes, fourplexes and fiveplexes, ranked by return, cash flow and data quality.",
  },
} as const;
