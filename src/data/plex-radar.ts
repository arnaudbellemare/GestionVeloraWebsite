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
