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
  /** Underwriting assumptions the producer applied (vacancy_rate, management_pct, repairs_pct…). */
  assumptions?: Record<string, number | string>;
  analysis: {
    verdict: string;
    score: number;
    max_score: number;
    factors?: Array<{ label: string; value: number | string; status: "good" | "warning" | "bad" }>;
  };
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

/** Published model constants, mirrored from the producer's assumptions block. */
export const RADAR_MODEL = {
  vacancyRate: 0.03,
  contractRate: 0.0475,
  qualificationRate: 0.0675,
  dscrTarget: 1.2,
  maxLtv: 0.75,
} as const;

/**
 * What-if adjustments layered on the published scenario. Each is optional so
 * the unmodified call reproduces the published figures exactly.
 */
export type RadarShocks = {
  /** Added to the contract and qualification rates, e.g. 0.01 for +1 point. */
  rateDelta?: number;
  /** Replaces the 3% vacancy allowance. */
  vacancyRate?: number;
  /** Replaces the advertised gross income, e.g. rents lifted to the CMHC average. */
  grossIncome?: number;
};

export function calculateRadarScenario(deal: RadarDeal, excludedKeys: string[], shocks: RadarShocks = {}): RadarMetrics | null {
  const listing = deal.listing;
  const advertised = listing.potential_gross_income ?? 0;
  if (deal.status !== "underwritten" || advertised <= 0) return null;
  const gross = shocks.grossIncome && shocks.grossIncome > 0 ? shocks.grossIncome : advertised;
  const occupancy = 1 - Math.min(0.99, Math.max(0, shocks.vacancyRate ?? RADAR_MODEL.vacancyRate));
  const rateDelta = shocks.rateDelta ?? 0;
  const excluded = new Set(excludedKeys);
  const removedLines = deal.expense_policy?.lines.filter((line) => line.source === "estimated" && excluded.has(line.key)) ?? [];
  const removed = removedLines.reduce((sum, line) => sum + line.amount, 0);
  // Management and repairs are policy percentages of income; scale them when
  // the income itself is shocked so a rent lift does not read as pure profit.
  const incomeLinked = (deal.expense_policy?.lines ?? [])
    .filter((line) => line.source === "estimated" && (line.key === "management" || line.key === "repairs") && !excluded.has(line.key))
    .reduce((sum, line) => sum + line.amount, 0);
  const incomeScale = gross / advertised - 1;
  const operatingExpenses = Math.max(0, n(deal, "operating_expenses") - removed + incomeLinked * incomeScale);
  const noi = gross * occupancy - operatingExpenses;
  const commercial = listing.units >= 5 || Boolean(listing.mixed_use) || (listing.commercial_units ?? 0) > 0;
  const years = commercial ? 40 : 25;
  let loan = listing.price * RADAR_MODEL.maxLtv;
  if (commercial) {
    const lenderKeys = new Set(["insurance", "capex", "snow", "lawn", "utilities"]);
    const lenderRemoved = removedLines.filter((line) => lenderKeys.has(line.key)).reduce((sum, line) => sum + line.amount, 0);
    const normalizedExpenses = Math.max(0, n(deal, "normalized_expenses") - lenderRemoved + incomeLinked * incomeScale);
    const normalizedNoi = gross * occupancy - normalizedExpenses;
    loan = Math.min(loan, presentValue(periodicRate(RADAR_MODEL.qualificationRate + rateDelta), years * 12, Math.max(0, normalizedNoi) / RADAR_MODEL.dscrTarget / 12));
  }
  const annualDebtService = payment(periodicRate(RADAR_MODEL.contractRate + rateDelta), years * 12, loan) * 12;
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

/**
 * Maps a Centris city label ("Montréal (Rosemont/La Petite-Patrie)", "Laval
 * (Chomedey)", "Brossard") onto the calculator's AREAS key. Boroughs without a
 * calculator area of their own (Ville-Marie, Pierrefonds, Westmount…) fall back
 * to the CMA-level key `montreal-cma`, which the CMHC lookup resolves to the
 * Montréal RMR average; everything off-island and outside the covered suburbs
 * is `outside-gma` and keeps its reported figures.
 */
export function calculatorAreaKey(city: string): string {
  const value = city.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const matches: Array<[string, string[]]> = [
    // Montréal boroughs
    ["plateau", ["plateau"]], ["rosemont", ["rosemont", "petite-patrie"]], ["sud-ouest", ["sud-ouest"]],
    ["verdun", ["verdun"]], ["cdn-ndg", ["cote-des-neiges", "notre-dame-de-grace"]],
    ["villeray", ["villeray", "saint-michel", "parc-extension"]], ["saint-laurent", ["saint-laurent"]],
    ["ahuntsic", ["ahuntsic", "cartierville"]], ["hochelaga", ["hochelaga", "mercier"]],
    ["lasalle", ["lasalle"]], ["anjou", ["anjou"]], ["saint-leonard", ["saint-leonard"]],
    ["lachine", ["lachine"]], ["rdp-pat", ["riviere-des-prairies", "pointe-aux-trembles", "montreal-est"]],
    ["montreal-nord", ["montreal-nord"]],
    // Rive-Sud
    ["saint-lambert", ["saint-lambert"]], ["boucherville", ["boucherville"]], ["saint-bruno", ["saint-bruno"]],
    ["brossard", ["brossard"]], ["candiac", ["candiac"]], ["la-prairie", ["la prairie"]],
    ["greenfield-park", ["greenfield park"]], ["saint-hubert", ["saint-hubert"]], ["longueuil", ["longueuil"]],
    ["chambly", ["chambly"]],
    // Laval et couronne nord
    ["laval", ["laval"]], ["rosemere", ["rosemere"]], ["blainville", ["blainville", "sainte-therese"]],
    ["boisbriand", ["boisbriand"]], ["mirabel", ["mirabel"]], ["terrebonne", ["terrebonne"]],
    ["mascouche", ["mascouche"]], ["saint-eustache", ["saint-eustache"]], ["repentigny", ["repentigny"]],
  ];
  return matches.find(([, names]) => names.some((name) => value.includes(name)))?.[0]
    ?? (value.includes("montreal") ? "montreal-cma" : "outside-gma");
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
    relative: { term: "Rang relatif (sur 100)", def: "Position de l’immeuble parmi les immeubles comparables publiés au cours des 60 derniers jours dans la même région et la même classe (2 à 4 logements ou 5 et plus). Moyenne de trois percentiles : taux de capitalisation, flux de trésorerie par porte et prix par porte. 50 correspond à la médiane du marché observé." },
    rentGap: { term: "Écart de loyer SCHL", def: "Loyer moyen en place (revenus bruts annoncés divisés par le nombre de portes) comparé au loyer moyen de l’Enquête sur les logements locatifs de la SCHL pour le secteur, pondéré selon une composition typique de logements. Un écart positif signale des baux sous la moyenne des logements occupés, donc un potentiel d’optimisation lors des roulements." },
  },
  en: {
    cap: { term: "Cap rate", def: "Annual net operating income divided by asking price. It measures the property return before financing." },
    cashOnCash: { term: "Cash-on-cash return", def: "Annual cash flow after financing divided by the estimated down payment and initial cash invested." },
    dscr: { term: "Debt service coverage ratio (DSCR)", def: "Net operating income divided by annual debt payments. Above 1 means the property covers its debt." },
    grm: { term: "Gross rent multiplier (GRM)", def: "Asking price divided by annual gross rental income. A lower multiple generally indicates a more favorable price relative to income." },
    relative: { term: "Relative rank (out of 100)", def: "Where the property sits among comparable listings published over the last 60 days in the same region and class (2–4 units or 5+). Average of three percentiles: cap rate, cash flow per door and price per door. 50 is the median of the observed market." },
    rentGap: { term: "CMHC rent gap", def: "Average in-place rent (advertised gross income divided by doors) compared with the CMHC Rental Market Survey average for the area, weighted by a typical unit mix. A positive gap flags leases below the occupied-unit average, hence optimization potential on turnover." },
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
      q: "Comment le rang relatif et le score sur 12 sont-ils calculés?",
      a: "Le rang relatif (sur 100) situe l’immeuble parmi les immeubles comparables publiés au cours des 60 derniers jours dans la même région et la même classe : c’est la moyenne de trois percentiles, taux de capitalisation, flux de trésorerie par porte et prix par porte. 80 et plus signale le haut du marché observé, 60 à 79 au-dessus du marché, 40 à 59 dans le marché. Le score sur 12 reste affiché : six critères absolus valent chacun de 0 à 2 points (taux de capitalisation, rendement comptant, couverture de la dette, flux par porte, multiplicateur de revenu brut et poids des charges), mais ses seuils, calibrés sur des marchés à rendement élevé, sont rarement atteints au Québec.",
    },
    {
      id: "loyers-schl",
      q: "Que signifie l’écart de loyer SCHL?",
      a: "Le radar divise les revenus bruts annoncés par le nombre de portes pour obtenir le loyer moyen en place, puis le compare au loyer moyen de l’Enquête sur les logements locatifs de la SCHL pour le secteur, pondéré selon une composition typique de logements. Cette moyenne porte sur les logements occupés, donc en dessous des loyers demandés à la relocation : un immeuble sous la moyenne SCHL a des baux clairement sous-optimisés. Le potentiel affiché ne compte que les portes sous la moyenne, car un loyer en place ne peut pas être réduit. La comparaison n’est offerte que dans la région métropolitaine de Montréal couverte par l’enquête.",
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
      q: "How are the relative rank and the score out of 12 calculated?",
      a: "The relative rank (out of 100) places the property among comparable listings published over the last 60 days in the same region and class: it averages three percentiles, cap rate, cash flow per door and price per door. 80 and above flags the top of the observed market, 60 to 79 above market, 40 to 59 in line with it. The score out of 12 remains visible: six absolute criteria are each worth 0 to 2 points (cap rate, cash-on-cash, debt coverage, cash flow per door, gross rent multiplier and expense load), but its thresholds, calibrated on high-yield markets, are rarely met in Quebec.",
    },
    {
      id: "cmhc-rents",
      q: "What does the CMHC rent gap mean?",
      a: "The radar divides advertised gross income by the number of doors to get the average in-place rent, then compares it with the CMHC Rental Market Survey average for the area, weighted by a typical unit mix. That average covers occupied units, so it sits below turnover asking rents: a building under the CMHC average has clearly under-set leases. The displayed upside counts only doors below the average, since an in-place rent cannot be reduced. The comparison is offered only within the Montréal metropolitan area covered by the survey.",
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
