import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";
import {
  RADAR_FAQ,
  RADAR_META,
  RADAR_METRIC_DEFS,
  calculateRadarScenario,
  calculatorAreaKey,
  calculatorUrl,
  expenseRatioBand,
  publishedRadarMetrics,
  type RadarDeal,
  type RadarExpenseLine,
  type RadarFeed,
  type RadarLocale,
  type RadarMetrics,
  type RadarShocks,
} from "../data/plex-radar";
import {
  BENCHMARK_WINDOW_DAYS,
  cmhcRentSignal,
  dealClass,
  percentileOf,
  relativeRank,
  resolvePool,
  type RadarBenchmarks,
  type RelativeRank,
  type RelativeTier,
  type RentSignal,
} from "../lib/plex/radar-benchmarks";
import { BarChart, Gauge, Sankey, SpiderChart, Treemap, Waffle } from "../components/plex/RadarCharts";
import "../components/plex/plex-radar.css";

const money = new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("fr-CA", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 });
const pct0 = new Intl.NumberFormat("fr-CA", { style: "percent", maximumFractionDigits: 0 });

const SHOCK_RATE_DELTA = 0.01;
const SHOCK_VACANCY = 0.05;

const copy = {
  fr: {
    kicker: "PLEX RADAR PAR GESTION VELORA",
    title: "Immeubles à revenus à vendre à Montréal, analysés chaque jour.",
    intro: "Un premier tri des duplex, triplex, quadruplex et quintuplex récemment publiés, avec rendement, financement québécois et dépenses clairement identifiées.",
    daily: "Parution quotidienne",
    release: "Parution affichée", latest: "Plus récente", historical: "Parution historique", loadingRelease: "Chargement de la parution…",
    failure: "échec", failures: "échecs", loading: "Chargement…",
    properties: "propriétés",
    analyzed: "analysées",
    benchmarkBase: "base de comparaison", benchmarkWindow: `${BENCHMARK_WINDOW_DAYS} jours`,
    search: "Rechercher une ville, une adresse…",
    all: "Toutes les régions",
    anyPrice: "Tous les prix", under: "Moins de", anyUnits: "Toutes les portes", doors: "portes", fivePlus: "5 portes et plus",
    anyCap: "Tout rendement", capMin: "Taux cap. ≥",
    positive: "Flux positif",
    results: "résultats", sorted: `Classés par rang relatif · ${BENCHMARK_WINDOW_DAYS} jours`, sortedFallback: "Triés par score publié", perDoor: "/ porte",
    newDeal: "Nouveau au radar", mixedUse: "usage mixte", close: "Fermer l’analyse",
    prioritize: "À prioriser", analyze: "À analyser", watch: "À surveiller", lowPriority: "Rendement faible",
    tierTop: "Haut du marché", tierAbove: "Au-dessus du marché", tierInline: "Dans le marché", tierBelow: "Sous le marché",
    relativeHeading: "Rang relatif", relativeUnavailable: "Rang relatif indisponible : la base de comparaison n’a pas pu être chargée. Classement par score publié.",
    poolRegion: (n: number, region: string) => `vs ${n} immeubles comparables · ${region} · ${BENCHMARK_WINDOW_DAYS} derniers jours`,
    poolClass: (n: number, klass: string) => `vs ${n} immeubles de ${klass} au Québec · ${BENCHMARK_WINDOW_DAYS} derniers jours (région trop peu fournie)`,
    poolAll: (n: number) => `vs ${n} immeubles au Québec · ${BENCHMARK_WINDOW_DAYS} derniers jours`,
    classResidential: "2 à 4 logements", classCommercial: "5 logements et plus",
    compYield: "Rendement (taux cap.)", compCashFlow: "Flux par porte", compPrice: "Prix par porte", median: "méd.", percentile: "percentile",
    shocksHeading: "Tester la résistance", shockRate: "Taux +1 pt", shockVacancy: "Inoccupation 5 %", shockCmhc: "Loyers à la moyenne SCHL",
    shocksNote: "Chaque test recalcule le scénario avec les règles publiées. Le résultat publié reste inchangé.",
    rentHeading: "Loyers vs SCHL", inPlace: "Loyer moyen en place", benchmark: "Moyenne SCHL", gapBelow: "sous la moyenne SCHL", gapAbove: "au-dessus de la moyenne SCHL",
    upside: "Potentiel brut annuel", capAtBenchmark: "Taux cap. aux loyers SCHL", noUpside: "Aucun potentiel : les baux dépassent déjà la moyenne des logements occupés.",
    rentNote: (period: string, units: number) => `Moyenne des logements occupés (SCHL, ${period}), pondérée selon une composition typique de ${units} logements. Ce n’est pas le loyer demandé à la relocation.`,
    rentUnavailable: "Comparaison SCHL offerte uniquement dans la RMR de Montréal couverte par l’enquête.",
    lowReliability: "Échantillon SCHL mince (code d) : à utiliser avec prudence.",
    criteria: (score: number) => `Critères publiés · score ${score}/12`,
    scenarioCriteria: (score: number) => `Critères du scénario · score ${score}/12`,
    noi: "Revenu net d’exploitation", adjustedNoi: "RNE après réserve", belowNoi: "Sous le RNE : réduit le flux, pas le taux cap.",
    reserveNote: "La réserve de remplacement est présentée sous le revenu net d’exploitation, comme dans le calculateur complet. Elle réduit le flux de trésorerie et le rendement comptant, mais ni le taux de capitalisation ni la couverture de la dette.",
    factorLabels: { cap_rate: "Taux de capitalisation", cash_on_cash: "Rendement comptant", dscr: "Couverture de la dette", monthly_cash_flow_per_door: "Flux par porte", grm: "Multiplicateur de revenu brut", break_even_ratio: "Poids des charges", expense_ratio: "Poids des charges" } as Record<string, string>,
    positiveFlow: "CF positif / mois", negativeFlow: "Déficit / mois", neutralFlow: "CF nul / mois",
    cap: "Taux cap.", cash: "Flux / mois", score: "Score", published: "Analyse publiée",
    scenario: "Scénario personnalisé", reported: "Rapporté", estimated: "Estimé",
    expenses: "Dépenses d’exploitation", restore: "Revenir au publié",
    expenseRatio: "des revenus bruts", ratioBand: { thin: "sous la norme de 30 à 40 %", typical: "dans la norme de 30 à 40 %", heavy: "au-dessus de la norme de 30 à 40 %" },
    calculator: "Analyser dans le calculateur complet", source: "Voir la fiche source",
    definitionTitle: "Comprendre les estimations",
    definition: "Gestion couvre les honoraires d’un gestionnaire externe. Services publics propriétaire couvre l’électricité, le chauffage ou les services communs payés par le propriétaire.",
    remove: "Retirer du scénario", add: "Rétablir dans le scénario",
    notice: "Le bouton − retire une estimation du scénario uniquement. Les données rapportées et le résultat publié restent intacts.",
    stale: "La parution semble dater de plus de 30 heures.", unavailable: "La parution du jour est temporairement indisponible.",
    methodology: "Méthode transparente", methodologyBody: "Chaque résultat conserve les faits rapportés, les estimations, la règle appliquée et la version du modèle. Une présélection ne remplace pas la validation des baux, dépenses, travaux et conditions de financement.",
    live: "En direct", generated: "généré le",
    capDist: "Distribution des taux de capitalisation", capDistSub: (n: number) => `${n} immeubles · taux publié ou scénario`, p90: "p90",
    tierMix: "Répartition du classement", positiveCount: "Flux de trésorerie positif", newCount: "Nouveaux au radar",
    topPick: "Meilleure opportunité", topPickSub: "Première au classement après vos filtres", openFile: "Ouvrir le dossier", noPick: "Aucun immeuble ne passe vos filtres.",
    colProperty: "Immeuble", colPrice: "Prix demandé", colCap: "Taux cap.", colFlow: "Flux / mois", colRank: "Rang",
    regionCap: "Taux cap. médian par région", regionCapSub: "immeubles filtrés · médiane et effectif par région", typeMix: "Composition du flux", typeMixSub: "part des immeubles par type",
    incomeFlow: "Où va le revenu", incomeFlowSub: "revenu effectif annuel réparti selon les règles publiées", effectiveIncome: "Revenu effectif", deficit: "Déficit à combler", debtService: "Service de la dette", reserveLine: "Réserve de remplacement", annualFlow: "Flux de trésorerie",
    gaugeCaption: "rang / 100", spiderDeal: "Cet immeuble (percentile)", spiderMedian: "Médiane du bassin", spiderGrm: "MRB", spiderAxes: { yield: "Rendement", cashFlow: "Flux/porte", price: "Prix/porte", grm: "MRB", dscr: "DSCR", coc: "Cash-on-cash" } as Record<string, string>, spiderNote: (n: number) => `DSCR et cash-on-cash : percentile parmi les ${n} immeubles comparables de la parution affichée. Les quatre autres axes : fenêtre de ${BENCHMARK_WINDOW_DAYS} jours.`,
    cta: "Vous avez trouvé un immeuble à analyser?", ctaBody: "Gestion Velora peut valider les dépenses, préparer un budget d’exploitation et accompagner la mise en gestion.", contact: "Parler à Gestion Velora",
  },
  en: {
    kicker: "PLEX RADAR BY GESTION VELORA",
    title: "Montreal income properties for sale, analyzed daily.",
    intro: "A first-pass review of newly published duplexes, triplexes, fourplexes and fiveplexes using returns, Quebec financing and clearly identified expenses.",
    daily: "Daily release", properties: "properties", analyzed: "analyzed",
    benchmarkBase: "comparison base", benchmarkWindow: `${BENCHMARK_WINDOW_DAYS} days`,
    release: "Displayed release", latest: "Latest", historical: "Historical release", loadingRelease: "Loading release…",
    failure: "failure", failures: "failures", loading: "Loading…",
    search: "Search a city or address…", all: "All regions",
    anyPrice: "Any price", under: "Under", anyUnits: "Any door count", doors: "doors", fivePlus: "5+ doors",
    anyCap: "Any yield", capMin: "Cap rate ≥",
    positive: "Positive cash flow",
    results: "results", sorted: `Ranked by relative rank · ${BENCHMARK_WINDOW_DAYS} days`, sortedFallback: "Sorted by published score", perDoor: "/ door",
    newDeal: "New to the radar", mixedUse: "mixed use", close: "Close analysis",
    prioritize: "Prioritize", analyze: "Analyze", watch: "Watch", lowPriority: "Low return",
    tierTop: "Top of market", tierAbove: "Above market", tierInline: "In line with market", tierBelow: "Below market",
    relativeHeading: "Relative rank", relativeUnavailable: "Relative rank unavailable: the comparison base could not be loaded. Sorted by published score.",
    poolRegion: (n: number, region: string) => `vs ${n} comparable listings · ${region} · last ${BENCHMARK_WINDOW_DAYS} days`,
    poolClass: (n: number, klass: string) => `vs ${n} ${klass} listings across Quebec · last ${BENCHMARK_WINDOW_DAYS} days (region sample too thin)`,
    poolAll: (n: number) => `vs ${n} listings across Quebec · last ${BENCHMARK_WINDOW_DAYS} days`,
    classResidential: "2–4 unit", classCommercial: "5+ unit",
    compYield: "Yield (cap rate)", compCashFlow: "Cash flow per door", compPrice: "Price per door", median: "med.", percentile: "percentile",
    shocksHeading: "Stress the deal", shockRate: "Rate +1 pt", shockVacancy: "Vacancy 5%", shockCmhc: "Rents at CMHC average",
    shocksNote: "Each test recomputes the scenario with the published rules. The published result stays unchanged.",
    rentHeading: "Rents vs CMHC", inPlace: "Average in-place rent", benchmark: "CMHC average", gapBelow: "below the CMHC average", gapAbove: "above the CMHC average",
    upside: "Annual gross upside", capAtBenchmark: "Cap rate at CMHC rents", noUpside: "No upside: leases already exceed the occupied-unit average.",
    rentNote: (period: string, units: number) => `Occupied-unit average (CMHC, ${period}), weighted by a typical ${units}-unit mix. This is not turnover asking rent.`,
    rentUnavailable: "CMHC comparison is only available inside the Montréal CMA covered by the survey.",
    lowReliability: "Thin CMHC sample (code d): use with caution.",
    criteria: (score: number) => `Published criteria · score ${score}/12`,
    scenarioCriteria: (score: number) => `Scenario criteria · score ${score}/12`,
    noi: "Net operating income", adjustedNoi: "NOI after reserve", belowNoi: "Below NOI: lowers cash flow, not the cap rate.",
    reserveNote: "The replacement reserve sits below net operating income, as in the full calculator. It reduces cash flow and cash-on-cash, but neither the cap rate nor debt coverage.",
    factorLabels: { cap_rate: "Cap rate", cash_on_cash: "Cash-on-cash", dscr: "Debt coverage", monthly_cash_flow_per_door: "Cash flow per door", grm: "Gross rent multiplier", break_even_ratio: "Expense load", expense_ratio: "Expense load" } as Record<string, string>,
    positiveFlow: "Positive CF / mo", negativeFlow: "Deficit / mo", neutralFlow: "Break-even / mo",
    cap: "Cap rate", cash: "Cash flow / mo", score: "Score",
    published: "Published analysis", scenario: "Custom scenario", reported: "Reported", estimated: "Estimated",
    expenseRatio: "of gross income", ratioBand: { thin: "below the 30–40% norm", typical: "within the 30–40% norm", heavy: "above the 30–40% norm" },
    expenses: "Operating expenses", restore: "Restore published", calculator: "Open in the full calculator", source: "View source listing",
    definitionTitle: "Understanding estimates", definition: "Management covers an external manager’s fees. Owner-paid utilities cover electricity, heating or common services paid by the owner.",
    remove: "Remove from scenario", add: "Restore in scenario", notice: "The − button removes an estimate from the scenario only. Reported facts and the published result remain unchanged.",
    stale: "The release appears to be more than 30 hours old.", unavailable: "Today’s release is temporarily unavailable.",
    methodology: "Transparent methodology", methodologyBody: "Each result preserves reported facts, estimates, the applied rule and model version. Screening does not replace validation of leases, expenses, work and financing terms.",
    live: "Live", generated: "generated",
    capDist: "Cap rate distribution", capDistSub: (n: number) => `${n} listings · published or scenario rate`, p90: "p90",
    tierMix: "Ranking breakdown", positiveCount: "Positive cash flow", newCount: "New to the radar",
    topPick: "Best opportunity", topPickSub: "First in the ranking after your filters", openFile: "Open the file", noPick: "No listing passes your filters.",
    colProperty: "Property", colPrice: "Asking price", colCap: "Cap rate", colFlow: "Cash flow / mo", colRank: "Rank",
    regionCap: "Median cap rate by region", regionCapSub: "filtered listings · median and count per region", typeMix: "Feed composition", typeMixSub: "share of listings by type",
    incomeFlow: "Where the income goes", incomeFlowSub: "annual effective income split by the published rules", effectiveIncome: "Effective income", deficit: "Deficit to cover", debtService: "Debt service", reserveLine: "Replacement reserve", annualFlow: "Cash flow",
    gaugeCaption: "rank / 100", spiderDeal: "This listing (percentile)", spiderMedian: "Pool median", spiderGrm: "GRM", spiderAxes: { yield: "Yield", cashFlow: "Cash flow", price: "Price", grm: "GRM", dscr: "DSCR", coc: "Cash-on-cash" } as Record<string, string>, spiderNote: (n: number) => `DSCR and cash-on-cash: percentile among the ${n} comparable listings in the displayed release. The other four axes use the ${BENCHMARK_WINDOW_DAYS}-day window.`,
    cta: "Found a property worth analyzing?", ctaBody: "Gestion Velora can validate expenses, prepare an operating budget and support the transition into management.", contact: "Talk to Gestion Velora",
  },
} as const;

type Copy = typeof copy.fr | typeof copy.en;
type DealShocks = { rate: boolean; vacancy: boolean; cmhc: boolean };
const NO_SHOCKS: DealShocks = { rate: false, vacancy: false, cmhc: false };

type ModeledDeal = RadarDeal & {
  live: RadarMetrics | null;
  rank: RelativeRank | null;
  rent: RentSignal | null;
  modified: boolean;
};

/**
 * Published figures when nothing is toggled; otherwise the scenario rebuilt
 * from the published rules. The CMHC rent lift needs the rent signal, which
 * itself needs a baseline NOI, so the baseline is computed first.
 */
function modelDeal(deal: RadarDeal, excluded: string[], shocks: DealShocks, benchmarks: RadarBenchmarks | null): ModeledDeal {
  const published = publishedRadarMetrics(deal);
  const areaKey = calculatorAreaKey(deal.listing.city);
  const baseShocks: RadarShocks = {
    rateDelta: shocks.rate ? SHOCK_RATE_DELTA : undefined,
    vacancyRate: shocks.vacancy ? SHOCK_VACANCY : undefined,
  };
  const baselineModified = excluded.length > 0 || shocks.rate || shocks.vacancy;
  const baseline = baselineModified ? calculateRadarScenario(deal, excluded, baseShocks) : published;
  const rent = baseline ? cmhcRentSignal(deal, areaKey, baseline) : null;
  const liftRents = shocks.cmhc && rent?.applies && rent.upsideAnnual > 0;
  const live = liftRents
    ? calculateRadarScenario(deal, excluded, { ...baseShocks, grossIncome: rent.benchmarkRent * deal.listing.units * 12 })
    : baseline;
  return {
    ...deal,
    live,
    rank: live ? relativeRank(deal, live, benchmarks) : null,
    rent,
    modified: baselineModified || Boolean(liftRents),
  };
}

function dealVerdict(score: number, t: Copy) {
  if (score >= 9) return { label: t.prioritize, tone: "priority" };
  if (score >= 6) return { label: t.analyze, tone: "analyze" };
  if (score >= 3) return { label: t.watch, tone: "watch" };
  return { label: t.lowPriority, tone: "low" };
}

function tierLabel(tier: RelativeTier, t: Copy) {
  return tier === "top" ? t.tierTop : tier === "above" ? t.tierAbove : tier === "inline" ? t.tierInline : t.tierBelow;
}

function poolLabel(rank: RelativeRank, t: Copy) {
  const klass = rank.pool.class === "commercial" ? t.classCommercial : t.classResidential;
  if (rank.pool.scope === "region") return t.poolRegion(rank.pool.count, rank.pool.region ?? "");
  if (rank.pool.scope === "class") return t.poolClass(rank.pool.count, klass);
  return t.poolAll(rank.pool.count);
}

function cashFlowState(value: number, t: Copy) {
  if (value > 0) return { tone: "positive", label: t.positiveFlow };
  if (value < 0) return { tone: "negative", label: t.negativeFlow };
  return { tone: "neutral", label: t.neutralFlow };
}

function factorValue(label: string, value: number | string): string {
  if (typeof value === "string") return value;
  if (label === "cap_rate" || label === "cash_on_cash" || label === "break_even_ratio" || label === "expense_ratio") return pct.format(value);
  if (label === "dscr" || label === "grm") return `${value.toFixed(2)}×`;
  if (label === "monthly_cash_flow_per_door") return money.format(value);
  return String(Math.round(value * 100) / 100);
}

function MetricInfo({ id, label, description }: { id: string; label: string; description: string }) {
  return <span className="radar-metric-info">
    <button type="button" aria-label={`${label}: ${description}`} aria-describedby={id}>i</button>
    <span className="radar-metric-tooltip" id={id} role="tooltip">{description}</span>
  </span>;
}

function ExpenseLine({ line, removed, t, note, onToggle }: { line: RadarExpenseLine; removed: boolean; t: Copy; note?: string; onToggle: () => void }) {
  return <article className={removed ? "is-removed" : ""}>
    <span><strong>{line.label}</strong><small>{line.rule}</small>{note && <small>{note}</small>}</span>
    <span><b>{money.format(line.amount)}</b><em>{line.source === "reported" ? t.reported : t.estimated}</em></span>
    {line.source === "estimated" && <button aria-label={`${removed ? t.add : t.remove}: ${line.label}`} aria-pressed={removed} onClick={onToggle}>{removed ? "+" : "−"}</button>}
  </article>;
}

const PRICE_CAPS = [500_000, 750_000, 1_000_000, 1_500_000, 2_500_000];
const CAP_FLOORS = [0.03, 0.04, 0.05, 0.06];
const HIST_BINS = 16;

const GEIST_URL = "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap";

/** Loads Geist only for this page, so the rest of the site keeps its font-free first paint. */
function useGeist() {
  useEffect(() => {
    if (document.getElementById("radar-geist")) return;
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.gstatic.com";
    preconnect.crossOrigin = "anonymous";
    const sheet = document.createElement("link");
    sheet.id = "radar-geist";
    sheet.rel = "stylesheet";
    sheet.href = GEIST_URL;
    document.head.append(preconnect, sheet);
  }, []);
}

export default function PlexRadarPage() {
  useGeist();
  const { locale, localePath } = useLocale();
  const l = (locale === "en" ? "en" : "fr") as RadarLocale;
  const t = copy[l];
  const [feed, setFeed] = useState<RadarFeed | null>(null);
  const [benchmarks, setBenchmarks] = useState<RadarBenchmarks | null>(null);
  const [benchmarksFailed, setBenchmarksFailed] = useState(false);
  const [releases, setReleases] = useState<string[]>([]);
  const [loadingRelease, setLoadingRelease] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>(t.all);
  const [maxPrice, setMaxPrice] = useState(0);
  const [unitsFilter, setUnitsFilter] = useState("");
  const [minCap, setMinCap] = useState(0);
  const [positive, setPositive] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [excluded, setExcluded] = useState<Record<string, string[]>>({});
  const [shocks, setShocks] = useState<Record<string, DealShocks>>({});

  useEffect(() => {
    const controller = new AbortController();
    const requestedRelease = new URLSearchParams(window.location.search).get("release");
    const feedUrl = requestedRelease && /^\d{4}-\d{2}-\d{2}$/.test(requestedRelease)
      ? `/api/plex-radar?release=${encodeURIComponent(requestedRelease)}`
      : "/api/plex-radar";
    Promise.all([
      fetch(feedUrl, { signal: controller.signal, cache: "no-store" }),
      fetch(`/api/plex-radar?history=1&t=${Date.now()}`, { signal: controller.signal, cache: "no-store" }),
    ])
      .then(async ([feedResponse, historyResponse]) => {
        if (!feedResponse.ok) throw new Error("feed-unavailable");
        const payload = await feedResponse.json() as RadarFeed;
        setFeed(payload);
        setSelectedId(payload.deals[0]?.listing.listing_id ?? "");
        if (historyResponse.ok) {
          const history = await historyResponse.json() as { releases?: string[] };
          setReleases(history.releases ?? []);
        }
      })
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    // The comparison base is small and cacheable; its failure degrades the
    // ranking to the published score rather than blocking the page.
    fetch("/api/plex-radar?benchmarks=1", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("benchmarks-unavailable")))
      .then((payload: RadarBenchmarks) => setBenchmarks(payload))
      .catch(() => { if (!controller.signal.aborted) setBenchmarksFailed(true); });
    return () => controller.abort();
  }, []);

  const openHistory = () => {
    if (!feed || loadingRelease || loadingHistory) return;
    if (historyOpen) {
      setHistoryOpen(false);
      return;
    }
    setLoadingHistory(true);
    fetch(`/api/plex-radar?history=1&t=${Date.now()}`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("history-unavailable")))
      .then((payload: { releases?: string[] }) => {
        setReleases(payload.releases?.length ? payload.releases : [feed.release]);
        setHistoryOpen(true);
      })
      .catch(() => {
        setReleases((current) => current.length ? current : [feed.release]);
        setHistoryOpen(true);
      })
      .finally(() => setLoadingHistory(false));
  };

  const loadRelease = (release: string) => {
    if (!release || release === feed?.release) return;
    setHistoryOpen(false);
    setLoadingRelease(true);
    setError(false);
    fetch(`/api/plex-radar?release=${encodeURIComponent(release)}`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("release-unavailable")))
      .then((payload: RadarFeed) => {
        setFeed(payload);
        setSelectedId(payload.deals[0]?.listing.listing_id ?? "");
        setDetailOpen(false);
        setExcluded({});
        setShocks({});
        const url = new URL(window.location.href);
        const latestRelease = releases[0];
        if (latestRelease && payload.release !== latestRelease) url.searchParams.set("release", payload.release);
        else url.searchParams.delete("release");
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      })
      .catch(() => setError(true))
      .finally(() => setLoadingRelease(false));
  };

  useEffect(() => {
    if (!historyOpen) return;
    const closeHistory = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      if (event instanceof MouseEvent && historyRef.current?.contains(event.target as Node)) return;
      setHistoryOpen(false);
    };
    document.addEventListener("mousedown", closeHistory);
    document.addEventListener("keydown", closeHistory);
    return () => {
      document.removeEventListener("mousedown", closeHistory);
      document.removeEventListener("keydown", closeHistory);
    };
  }, [historyOpen]);

  useEffect(() => {
    if (!detailOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [detailOpen]);

  const modeled = useMemo(() => (feed?.deals ?? []).map((deal) => modelDeal(
    deal,
    excluded[deal.listing.listing_id] ?? [],
    shocks[deal.listing.listing_id] ?? NO_SHOCKS,
    benchmarks,
  )), [feed, excluded, shocks, benchmarks]);
  const ranked = Boolean(benchmarks);
  const regions = [t.all, ...Array.from(new Set(modeled.map((deal) => deal.listing.region).filter(Boolean)))];
  const filtered = modeled.filter((deal) => {
    const haystack = `${deal.listing.address} ${deal.listing.city} ${deal.listing.property_type}`.toLowerCase();
    const units = deal.listing.units;
    const unitsMatch = !unitsFilter || (unitsFilter === "5+" ? units >= 5 : units === Number(unitsFilter));
    return haystack.includes(query.toLowerCase()) && (region === t.all || deal.listing.region === region)
      && (!maxPrice || deal.listing.price < maxPrice)
      && unitsMatch
      && (!minCap || (deal.live?.capRate ?? -Infinity) >= minCap)
      && (!positive || (deal.live?.monthlyCashFlow ?? -Infinity) > 0);
  }).sort((a, b) => (b.rank?.score ?? -1) - (a.rank?.score ?? -1)
    || (b.live?.score ?? -1) - (a.live?.score ?? -1)
    || (b.live?.capRate ?? -1) - (a.live?.capRate ?? -1));
  const selected = modeled.find((deal) => deal.listing.listing_id === selectedId) ?? filtered[0] ?? modeled[0];
  const selectedExcluded = selected ? excluded[selected.listing.listing_id] ?? [] : [];
  const selectedShocks = selected ? shocks[selected.listing.listing_id] ?? NO_SHOCKS : NO_SHOCKS;
  const isHistorical = Boolean(feed && releases[0] && feed.release !== releases[0]);
  const stale = feed && !isHistorical ? Date.now() - new Date(feed.generated_at).valueOf() > 30 * 60 * 60 * 1000 : false;
  const releaseLabel = (release: string) => new Intl.DateTimeFormat(l === "fr" ? "fr-CA" : "en-CA", {
    year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
  }).format(new Date(`${release}T12:00:00Z`));

  const toggleExpense = (dealId: string, key: string) => setExcluded((current) => {
    const keys = current[dealId] ?? [];
    return { ...current, [dealId]: keys.includes(key) ? keys.filter((item) => item !== key) : [...keys, key] };
  });
  const toggleShock = (dealId: string, key: keyof DealShocks) => setShocks((current) => {
    const state = current[dealId] ?? NO_SHOCKS;
    return { ...current, [dealId]: { ...state, [key]: !state[key] } };
  });
  const restorePublished = (dealId: string) => {
    setExcluded((current) => ({ ...current, [dealId]: [] }));
    setShocks((current) => ({ ...current, [dealId]: NO_SHOCKS }));
  };

  const openDeal = (dealId: string) => {
    setSelectedId(dealId);
    setDetailOpen(true);
  };

  const selectedRent = selected?.rent;
  const selectedRank = selected?.rank;

  // Overview panels follow the filtered list so the cards answer the filters.
  const capValues = filtered
    .map((deal) => deal.live?.capRate)
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value))
    .sort((a, b) => a - b);
  const quantile = (p: number) => capValues.length ? capValues[Math.min(capValues.length - 1, Math.round(p * (capValues.length - 1)))] : null;
  const capLow = capValues[0] ?? 0;
  const capSpan = Math.max((capValues[capValues.length - 1] ?? 0) - capLow, 0.0001);
  const capBins = Array.from({ length: HIST_BINS }, () => 0);
  capValues.forEach((value) => { capBins[Math.min(HIST_BINS - 1, Math.floor(((value - capLow) / capSpan) * HIST_BINS))] += 1; });
  const capBinMax = Math.max(1, ...capBins);
  const capMarker = (value: number) => `${Math.max(0, Math.min(100, ((value - capLow) / capSpan) * 100))}%`;
  const capMedian = quantile(0.5);
  const capP90 = quantile(0.9);
  const tierKeys: string[] = ranked ? ["top", "above", "inline", "below"] : ["priority", "analyze", "watch", "low"];
  const tierNames: Record<string, string> = ranked
    ? { top: t.tierTop, above: t.tierAbove, inline: t.tierInline, below: t.tierBelow }
    : { priority: t.prioritize, analyze: t.analyze, watch: t.watch, low: t.lowPriority };
  const tierCounts = filtered.reduce<Record<string, number>>((acc, deal) => {
    const key = deal.rank ? deal.rank.tier : dealVerdict(deal.live?.score ?? 0, t).tone;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const positiveCount = filtered.filter((deal) => (deal.live?.monthlyCashFlow ?? 0) > 0).length;
  const newCount = filtered.filter((deal) => deal.lifecycle?.event_type === "first-seen").length;
  const topPick = filtered[0];
  const generatedLabel = feed ? new Intl.DateTimeFormat(l === "fr" ? "fr-CA" : "en-CA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(feed.generated_at)) : "";

  const regionBars = Array.from(filtered.reduce<Map<string, number[]>>((acc, deal) => {
    if (deal.live && Number.isFinite(deal.live.capRate)) {
      const key = deal.listing.region || "—";
      acc.set(key, [...(acc.get(key) ?? []), deal.live.capRate]);
    }
    return acc;
  }, new Map()))
    .map(([label, values]) => {
      const sorted = [...values].sort((a, b) => a - b);
      return { label, value: sorted[Math.floor((sorted.length - 1) / 2)], count: sorted.length };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
  const typeTiles = Array.from(filtered.reduce<Map<string, number>>((acc, deal) => acc.set(deal.listing.property_type, (acc.get(deal.listing.property_type) ?? 0) + 1), new Map()))
    .map(([label, value]) => ({ key: label, label, value }));
  const selectedPool = selected && benchmarks ? resolvePool(benchmarks, selected.listing.region || "Autre", dealClass(selected)) : null;
  const selectedGrmPercentile = selectedPool && selected?.live ? Math.round((100 - percentileOf(selectedPool.pool.quantiles.grm, selected.live.grm)) * 10) / 10 : null;
  // Same-release comparison for metrics the 60-day benchmark tables do not carry.
  const releasePool = selected ? (() => {
    const klass = dealClass(selected);
    const sameClass = modeled.filter((deal) => deal.live && dealClass(deal) === klass);
    const sameRegion = sameClass.filter((deal) => deal.listing.region === selected.listing.region);
    return sameRegion.length >= 8 ? sameRegion : sameClass.length >= 8 ? sameClass : modeled.filter((deal) => deal.live);
  })() : [];
  const releasePercentile = (pick: (metrics: RadarMetrics) => number) => {
    if (!selected?.live || releasePool.length === 0) return null;
    const value = pick(selected.live);
    const values = releasePool.map((deal) => pick(deal.live as RadarMetrics)).filter(Number.isFinite);
    const below = values.filter((item) => item < value).length;
    const equal = values.filter((item) => item === value).length;
    return Math.round(((below + equal / 2) / values.length) * 100);
  };
  const selectedDscrPercentile = releasePercentile((metrics) => metrics.dscr);
  const selectedCocPercentile = releasePercentile((metrics) => metrics.cashOnCash);
  const selectedFlow = selected?.live ? (() => {
    const live = selected.live;
    const effectiveIncome = live.noi + live.operatingExpenses;
    const annualCashFlow = live.monthlyCashFlow * 12;
    return {
      sources: [
        { key: "income", label: t.effectiveIncome, value: effectiveIncome, tone: "green" },
        { key: "deficit", label: t.deficit, value: Math.max(0, -annualCashFlow), tone: "red" },
      ],
      targets: [
        { key: "opex", label: t.expenses, value: live.operatingExpenses, tone: "amber" },
        { key: "debt", label: t.debtService, value: live.annualDebtService, tone: "purple" },
        { key: "capex", label: t.reserveLine, value: live.capexReserve, tone: "blue" },
        { key: "cash", label: t.annualFlow, value: Math.max(0, annualCashFlow), tone: "green" },
      ],
    };
  })() : null;
  const gaugeBands = [
    { from: 0, to: 40, tone: "below", label: t.tierBelow },
    { from: 40, to: 60, tone: "inline", label: t.tierInline },
    { from: 60, to: 80, tone: "above", label: t.tierAbove },
    { from: 80, to: 100.01, tone: "top", label: t.tierTop },
  ];

  return (
    <main className="radar-page">
      <div className="radar-shell">
        <header className="radar-topbar">
          <div className="radar-topbar-copy">
            <p className="radar-kicker">{t.kicker}</p>
            <h1>{t.title}</h1>
            <p className="radar-intro">{t.intro}</p>
          </div>
          <div className="radar-topbar-status">
            <div className="radar-status-row">
              <span className={`radar-pill ${error ? "is-error" : isHistorical || stale ? "is-warning" : "is-live"}`} role="status"><i aria-hidden="true" />{error ? t.unavailable : isHistorical ? t.historical : stale ? t.stale : t.live}</span>
              <div className="radar-history-picker" ref={historyRef}><span>{t.release}</span><div className="radar-history-select"><button type="button" aria-haspopup="listbox" aria-expanded={historyOpen} disabled={!feed || loadingRelease || loadingHistory} onClick={openHistory}>{loadingHistory ? t.loading : loadingRelease ? t.loadingRelease : feed ? releaseLabel(feed.release) : "—"}</button>{historyOpen && <div className="radar-history-menu" role="listbox" aria-label={t.release}>{(releases.length ? releases : feed ? [feed.release] : []).map((release, index) => <button type="button" role="option" aria-selected={release === feed?.release} key={release} onClick={() => loadRelease(release)}><span>{releaseLabel(release)}</span>{index === 0 && <small>{t.latest}</small>}</button>)}</div>}</div></div>
            </div>
            <div className="radar-chips" aria-label={t.daily}>
              <span className="radar-chip"><i className="is-blue" aria-hidden="true" />{t.properties} <b>{feed?.deals.length ?? "—"}</b></span>
              <span className="radar-chip"><i className="is-green" aria-hidden="true" />{t.analyzed} <b>{modeled.filter((deal) => deal.live).length || "—"}</b></span>
              <span className="radar-chip"><i className="is-purple" aria-hidden="true" />{t.benchmarkBase} <b>{benchmarks?.listing_count ?? "—"}</b> <small>· {t.benchmarkWindow}</small></span>
              <span className={`radar-chip ${(feed?.failure_count ?? 0) > 0 ? "is-warning" : ""}`}><i className={(feed?.failure_count ?? 0) > 0 ? "is-amber" : "is-muted"} aria-hidden="true" />{(feed?.failure_count ?? 0) === 1 ? t.failure : t.failures} <b>{feed ? feed.failure_count ?? 0 : "—"}</b></span>
            </div>
            <small className="radar-generated">{feed ? `${feed.release} · ${t.generated} ${generatedLabel} · ${feed.expense_policy_version ?? RADAR_META[l].title}` : t.loading}</small>
          </div>
        </header>

        <section className="radar-overview" aria-label={t.capDist}>
          <article className="radar-card radar-card-hist">
            <div className="radar-card-head"><div><h3>{t.capDist}</h3><p>{t.capDistSub(capValues.length)}</p></div>
              <dl className="radar-card-stats">{capMedian !== null && <div><dt>{t.median}</dt><dd className="is-green">{pct.format(capMedian)}</dd></div>}{capP90 !== null && <div><dt>{t.p90}</dt><dd className="is-amber">{pct.format(capP90)}</dd></div>}</dl>
            </div>
            <div className="radar-hist" aria-hidden="true">
              {capBins.map((count, index) => <i key={index} style={{ height: `${Math.max(count > 0 ? 6 : 2, (count / capBinMax) * 100)}%` }} />)}
              {capMedian !== null && <span className="radar-hist-mark is-green" style={{ left: capMarker(capMedian) }}><b>p50</b></span>}
              {capP90 !== null && <span className="radar-hist-mark is-amber" style={{ left: capMarker(capP90) }}><b>p90</b></span>}
            </div>
            <div className="radar-hist-axis" aria-hidden="true"><span>{capValues.length ? pct.format(capLow) : "—"}</span><span>{capValues.length ? pct.format(capLow + capSpan / 2) : ""}</span><span>{capValues.length ? pct.format(capLow + capSpan) : "—"}</span></div>
          </article>

          <article className="radar-card">
            <div className="radar-card-head"><div><h3>{t.tierMix}</h3><p>{ranked ? t.sorted : t.sortedFallback}</p></div><strong className="radar-card-total">{filtered.length}<small>{t.results}</small></strong></div>
            <Waffle title={t.tierMix} slices={tierKeys.map((key) => ({ key, label: tierNames[key], count: tierCounts[key] ?? 0, tone: key }))} />
            <div className="radar-card-foot"><span><i className="is-green" aria-hidden="true" />{t.positiveCount} <b>{positiveCount}</b></span><span><i className="is-blue" aria-hidden="true" />{t.newCount} <b>{newCount}</b></span></div>
          </article>

          <article className="radar-card">
            <div className="radar-card-head"><div><h3>{t.topPick}</h3><p>{t.topPickSub}</p></div></div>
            {topPick?.live ? <div className="radar-pick">
              <span className="radar-pick-check" aria-hidden="true">✓</span>
              <div className="radar-pick-body">
                <strong>{topPick.listing.address}</strong>
                <small>{topPick.listing.property_type} · {topPick.listing.city} · {topPick.listing.units} {l === "fr" ? "portes" : "doors"}</small>
                <dl>
                  <div><dt>{t.colRank}</dt><dd>{topPick.rank ? `${topPick.rank.score}/100` : `${topPick.live.score}/12`}</dd></div>
                  <div><dt>{t.cap}</dt><dd>{pct.format(topPick.live.capRate)}</dd></div>
                  <div><dt>{t.cash}</dt><dd className={`is-${cashFlowState(topPick.live.monthlyCashFlow, t).tone}`}>{money.format(topPick.live.monthlyCashFlow)}</dd></div>
                </dl>
                <button type="button" onClick={() => openDeal(topPick.listing.listing_id)}>{t.openFile} →</button>
              </div>
            </div> : <p className="radar-pick-empty">{feed ? t.noPick : t.loading}</p>}
          </article>

          <article className="radar-card radar-card-regions">
            <div className="radar-card-head"><div><h3>{t.regionCap}</h3><p>{t.regionCapSub}</p></div></div>
            {regionBars.length > 0
              ? <BarChart title={t.regionCap} bars={regionBars} average={capMedian} averageLabel={t.median} format={(value) => pct.format(value)} />
              : <p className="radar-pick-empty">{feed ? t.noPick : t.loading}</p>}
          </article>

          <article className="radar-card">
            <div className="radar-card-head"><div><h3>{t.typeMix}</h3><p>{t.typeMixSub}</p></div><strong className="radar-card-total">{typeTiles.length}<small>types</small></strong></div>
            {typeTiles.length > 0
              ? <Treemap title={t.typeMix} items={typeTiles} formatShare={(share) => pct0.format(share)} />
              : <p className="radar-pick-empty">{feed ? t.noPick : t.loading}</p>}
          </article>
        </section>

        <section className="radar-workspace" aria-label={t.results}>
          <div className="radar-filters">
            <input className="radar-search" aria-label={t.search} placeholder={t.search} value={query} onChange={(event) => setQuery(event.target.value)} />
            <span className="radar-select"><select aria-label={t.all} value={region} onChange={(event) => setRegion(event.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select></span>
            <span className="radar-select"><select aria-label={t.anyPrice} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))}><option value={0}>{t.anyPrice}</option>{PRICE_CAPS.map((cap) => <option key={cap} value={cap}>{t.under} {money.format(cap)}</option>)}</select></span>
            <span className="radar-select"><select aria-label={t.anyUnits} value={unitsFilter} onChange={(event) => setUnitsFilter(event.target.value)}><option value="">{t.anyUnits}</option>{["2", "3", "4"].map((units) => <option key={units} value={units}>{units} {t.doors}</option>)}<option value="5+">{t.fivePlus}</option></select></span>
            <span className="radar-select"><select aria-label={t.anyCap} value={minCap} onChange={(event) => setMinCap(Number(event.target.value))}><option value={0}>{t.anyCap}</option>{CAP_FLOORS.map((floor) => <option key={floor} value={floor}>{t.capMin} {pct0.format(floor)}</option>)}</select></span>
            <label className="radar-positive">
              <input type="checkbox" checked={positive} onChange={(event) => setPositive(event.target.checked)} />
              <span className="radar-switch-track" aria-hidden="true" />
              <span className="radar-positive-label">{t.positive}</span>
            </label>
          </div>
          {benchmarksFailed && <p className="radar-benchmark-warning" role="status">{t.relativeUnavailable}</p>}
          <div className="radar-table">
            <div className="radar-count"><span>{filtered.length} {t.results}</span><span>{ranked ? t.sorted : t.sortedFallback}</span></div>
            <div className="radar-thead" aria-hidden="true"><span>#</span><span>{t.colProperty}</span><span>{t.colPrice}</span><span>{t.colCap}</span><span>{t.colFlow}</span><span>{t.colRank}</span></div>
            <div className="radar-list">
              {filtered.map((deal, index) => {
                const verdict = dealVerdict(deal.live?.score ?? 0, t);
                const cashFlow = cashFlowState(deal.live?.monthlyCashFlow ?? 0, t);
                const isSelected = selected?.listing.listing_id === deal.listing.listing_id;
                const rank = deal.rank;
                const tone = rank ? rank.tier : verdict.tone;
                const scoreWidth = rank ? rank.score : ((deal.live?.score ?? 0) / 12) * 100;
                return <article key={deal.listing.listing_id} className={isSelected ? "is-selected" : ""}>
                  <button className="radar-row-main" onClick={() => openDeal(deal.listing.listing_id)} aria-label={`${deal.listing.address} — ${rank ? tierLabel(rank.tier, t) : verdict.label}`}>
                    <span className="radar-rank">{String(index + 1).padStart(2, "0")}</span>
                    <span className="radar-property"><strong>{deal.listing.address}</strong><small>{deal.listing.property_type} · {deal.listing.city} · {deal.listing.units} {l === "fr" ? "portes" : "doors"}{deal.listing.mixed_use ? ` · ${t.mixedUse}` : ""}{deal.lifecycle?.event_type === "first-seen" && <em>{t.newDeal}</em>}</small></span>
                    <span className="radar-price"><strong>{money.format(deal.listing.price)}</strong><small>{money.format(deal.listing.price / Math.max(1, deal.listing.units))} {t.perDoor}</small></span>
                    <span className="radar-cap"><strong>{deal.live ? pct.format(deal.live.capRate) : "—"}</strong></span>
                    <span className={`radar-flow is-${cashFlow.tone}`}><strong>{deal.live ? money.format(deal.live.monthlyCashFlow) : "—"}</strong><small>{cashFlow.label}</small></span>
                    <span className={`radar-verdict is-${tone}`}><span className="radar-verdict-pill"><i aria-hidden="true" />{rank ? tierLabel(rank.tier, t) : verdict.label}</span><span className="radar-verdict-score"><span className="radar-verdict-bar" aria-hidden="true"><i style={{ width: `${Math.max(2, Math.min(100, scoreWidth))}%` }} /></span><small>{rank ? `${rank.score}/100` : `${deal.live?.score ?? "—"}/12`}</small></span></span>
                  </button>
                </article>;
              })}
            </div>
          </div>
        </section>
      </div>

      {detailOpen && selected?.live && typeof document !== "undefined" && createPortal(<>
        <button className="radar-drawer-scrim" aria-label={t.close} onClick={() => setDetailOpen(false)} />
        <aside className="radar-analysis is-open" role="dialog" aria-modal="true" aria-labelledby="radar-dossier-title">
          <div className="radar-drawer-toolbar">
            <span>{l === "fr" ? "Dossier de propriété" : "Property file"}</span>
            <button className="radar-drawer-close" type="button" autoFocus aria-label={t.close} onClick={() => setDetailOpen(false)}>×</button>
          </div>
          <div className="radar-analysis-body">
            <div className="radar-analysis-head"><div><p>{selected.modified ? t.scenario : t.published}</p><h2 id="radar-dossier-title">{selected.listing.address}</h2><small>{selected.listing.city} · {selected.listing.units} portes · {selected.listing.year_built ?? "—"}</small></div>
              {selectedRank
                ? <Gauge title={t.relativeHeading} value={selectedRank.score} bands={gaugeBands} caption={t.gaugeCaption} />
                : <strong>{selected.live.score}<small>/12</small></strong>}
            </div>

            {selectedRank && <section className="radar-relative" aria-label={t.relativeHeading}>
              <div className="radar-section-label"><span>{t.relativeHeading}</span><MetricInfo id="radar-relative-help" label={t.relativeHeading} description={RADAR_METRIC_DEFS[l].relative.def} /></div>
              <p className={`radar-relative-tier is-${selectedRank.tier}`}>{tierLabel(selectedRank.tier, t)}</p>
              <small>{poolLabel(selectedRank, t)}</small>
              <div className="radar-relative-grid">
              <SpiderChart
                title={t.relativeHeading}
                baseline={50}
                seriesLabel={t.spiderDeal}
                baselineLabel={t.spiderMedian}
                axes={[
                  ...selectedRank.components.map((component) => ({ label: t.spiderAxes[component.key], value: component.percentile })),
                  ...(selectedGrmPercentile !== null ? [{ label: t.spiderAxes.grm, value: selectedGrmPercentile }] : []),
                  ...(selectedDscrPercentile !== null ? [{ label: t.spiderAxes.dscr, value: selectedDscrPercentile }] : []),
                  ...(selectedCocPercentile !== null ? [{ label: t.spiderAxes.coc, value: selectedCocPercentile }] : []),
                ]}
                note={t.spiderNote(releasePool.length)}
              />
              <ul>
                {selectedRank.components.map((component) => {
                  const label = component.key === "yield" ? t.compYield : component.key === "cashFlow" ? t.compCashFlow : t.compPrice;
                  const format = component.metric === "capRate" ? pct.format : money.format;
                  return <li key={component.key}>
                    <span><strong>{label}</strong><small>{format(component.value)} · {t.median} {format(component.median)}</small></span>
                    <span className="radar-relative-bar" aria-hidden="true"><i style={{ width: `${Math.max(2, Math.min(100, component.percentile))}%` }} /></span>
                    <b>{Math.round(component.percentile)}<small>e {t.percentile}</small></b>
                  </li>;
                })}
              </ul>
              </div>
            </section>}

            <div className="radar-kpis">
              <article><div className="radar-kpi-label"><span>{t.cap}</span><MetricInfo id="radar-cap-help" label={t.cap} description={RADAR_METRIC_DEFS[l].cap.def} /></div><strong>{pct.format(selected.live.capRate)}</strong></article>
              <article><div className="radar-kpi-label"><span>Cash-on-cash</span><MetricInfo id="radar-coc-help" label="Cash-on-cash" description={RADAR_METRIC_DEFS[l].cashOnCash.def} /></div><strong>{pct.format(selected.live.cashOnCash)}</strong></article>
              <article><div className="radar-kpi-label"><span>DSCR</span><MetricInfo id="radar-dscr-help" label="DSCR" description={RADAR_METRIC_DEFS[l].dscr.def} /></div><strong>{selected.live.dscr.toFixed(2)}×</strong></article>
              <article><div className="radar-kpi-label"><span>MRB</span><MetricInfo id="radar-grm-help" label="MRB" description={RADAR_METRIC_DEFS[l].grm.def} /></div><strong>{selected.live.grm.toFixed(1)}×</strong></article>
            </div>
            <div className={`radar-cash is-${cashFlowState(selected.live.monthlyCashFlow, t).tone}`}><span>{cashFlowState(selected.live.monthlyCashFlow, t).label}</span><strong>{money.format(selected.live.monthlyCashFlow)}</strong><small>{money.format(selected.live.cashFlowPerDoor)} / porte</small></div>

            <section className="radar-shocks" aria-label={t.shocksHeading}>
              <div className="radar-section-label"><span>{t.shocksHeading}</span>{selected.modified && <button type="button" onClick={() => restorePublished(selected.listing.listing_id)}>{t.restore}</button>}</div>
              <div className="radar-shock-row">
                <button type="button" aria-pressed={selectedShocks.rate} onClick={() => toggleShock(selected.listing.listing_id, "rate")}>{t.shockRate}</button>
                <button type="button" aria-pressed={selectedShocks.vacancy} onClick={() => toggleShock(selected.listing.listing_id, "vacancy")}>{t.shockVacancy}</button>
                {selectedRent?.applies && selectedRent.upsideAnnual > 0 && <button type="button" aria-pressed={selectedShocks.cmhc} onClick={() => toggleShock(selected.listing.listing_id, "cmhc")}>{t.shockCmhc}</button>}
              </div>
              <small>{t.shocksNote}</small>
            </section>

            <section className="radar-rent" aria-label={t.rentHeading}>
              <div className="radar-section-label"><span>{t.rentHeading}</span><MetricInfo id="radar-rent-help" label={t.rentHeading} description={RADAR_METRIC_DEFS[l].rentGap.def} /></div>
              {selectedRent?.applies ? <>
                <div className="radar-rent-grid">
                  <div><span>{t.inPlace}</span><strong>{money.format(selectedRent.inPlaceRent)}</strong><small>/ {l === "fr" ? "porte / mois" : "door / mo"}</small></div>
                  <div><span>{t.benchmark}</span><strong>{money.format(selectedRent.benchmarkRent)}</strong><small>{selectedRent.geography}</small></div>
                  <div className={selectedRent.gapPct > 0 ? "is-upside" : "is-above"}><span>{l === "fr" ? "Écart" : "Gap"}</span><strong>{pct0.format(Math.abs(selectedRent.gapPct))}</strong><small>{selectedRent.gapPct > 0 ? t.gapBelow : t.gapAbove}</small></div>
                </div>
                {selectedRent.upsideAnnual > 0
                  ? <dl className="radar-rent-upside"><div><dt>{t.upside}</dt><dd>+{money.format(selectedRent.upsideAnnual)}</dd></div><div><dt>{t.capAtBenchmark}</dt><dd>{pct.format(selectedRent.capAtBenchmark)}</dd></div></dl>
                  : <p className="radar-rent-flat">{t.noUpside}</p>}
                {selectedRent.lowReliability && <p className="radar-rent-caution">{t.lowReliability}</p>}
                <small>{t.rentNote(selectedRent.surveyPeriod[l], selected.listing.units)}</small>
              </> : <p className="radar-rent-flat">{t.rentUnavailable}</p>}
            </section>

            {selected.live.factors.length > 0 && <details className="radar-factors">
              <summary>{selected.modified ? t.scenarioCriteria(selected.live.score) : t.criteria(selected.live.score)}</summary>
              <ul>
                {selected.live.factors.map((factor) => <li key={factor.label} className={`is-${factor.status}`}><i aria-hidden="true" /><span>{t.factorLabels[factor.label] ?? factor.label.replace(/_/g, " ")}</span><b>{factorValue(factor.label, factor.value)}</b></li>)}
              </ul>
            </details>}

            {selectedFlow && <section className="radar-flowchart" aria-label={t.incomeFlow}>
              <div className="radar-section-label"><span>{t.incomeFlow}</span></div>
              <Sankey title={t.incomeFlow} sources={selectedFlow.sources} targets={selectedFlow.targets} format={(value) => money.format(value)} />
              <small>{t.incomeFlowSub}</small>
            </section>}

            {selected.expense_policy && <section className="radar-expenses"><div><div><p>{t.expenses}</p><strong>{money.format(selected.live.operatingExpenses)}</strong><small className={`radar-ratio is-${expenseRatioBand(selected.live.expenseRatio)}`}>{pct.format(selected.live.expenseRatio)} {t.expenseRatio} · {t.ratioBand[expenseRatioBand(selected.live.expenseRatio)]}</small></div>{selectedExcluded.length > 0 && <button onClick={() => setExcluded((current) => ({ ...current, [selected.listing.listing_id]: [] }))}>{t.restore}</button>}</div>
              <details><summary>{t.definitionTitle}</summary><p>{t.definition}</p></details>
              {selected.expense_policy.lines.filter((line) => line.key !== "capex").map((line) => <ExpenseLine key={line.key} line={line} removed={selectedExcluded.includes(line.key)} t={t} onToggle={() => toggleExpense(selected.listing.listing_id, line.key)} />)}
              <div className="radar-noi"><div><p>{t.noi}</p><strong>{money.format(selected.live.noi)}</strong></div><div><p>{t.adjustedNoi}</p><strong>{money.format(selected.live.adjustedNoi)}</strong></div></div>
              {selected.expense_policy.lines.filter((line) => line.key === "capex").map((line) => <ExpenseLine key={line.key} line={line} removed={selectedExcluded.includes(line.key)} t={t} note={t.belowNoi} onToggle={() => toggleExpense(selected.listing.listing_id, line.key)} />)}
              <small>{t.notice}</small>
              <small>{t.reserveNote}</small>
            </section>}
            <div className="radar-actions"><Link to={calculatorUrl(selected, l, selectedExcluded)}>{t.calculator}</Link><a href={selected.listing.url} target="_blank" rel="noreferrer">{t.source} ↗</a></div>
          </div>
        </aside>
      </>, document.body)}

      <section className="radar-method"><div><p>{t.methodology}</p><h2>{l === "fr" ? "Des règles visibles avant une décision." : "Visible rules before a decision."}</h2></div><p>{t.methodologyBody}</p></section>
      <section className="radar-faq" aria-labelledby="radar-faq-title">
        <div><p>FAQ</p><h2 id="radar-faq-title">{l === "fr" ? "Questions fréquentes" : "Frequently asked questions"}</h2></div>
        <div className="radar-faq-list">
          {RADAR_FAQ[l].map((item) => <details key={item.id} id={item.id}><summary>{item.q}</summary><p>{item.a}</p></details>)}
        </div>
      </section>
      <section className="radar-cta"><div><h2>{t.cta}</h2><p>{t.ctaBody}</p></div><Link to={localePath("/#contact")}>{t.contact}</Link></section>
    </main>
  );
}
