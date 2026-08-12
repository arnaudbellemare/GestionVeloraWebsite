import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../context/LocaleContext";
import {
  RADAR_META,
  calculateRadarScenario,
  calculatorUrl,
  publishedRadarMetrics,
  type RadarDeal,
  type RadarFeed,
  type RadarLocale,
} from "../data/plex-radar";
import "../components/plex/plex-radar.css";

const money = new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("fr-CA", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 });

const copy = {
  fr: {
    kicker: "PLEX RADAR · MONTRÉAL",
    title: "Immeubles à revenus à vendre, analysés chaque jour.",
    intro: "Un premier tri des duplex, triplex, quadruplex et quintuplex récemment publiés, avec rendement, financement québécois et dépenses clairement identifiées.",
    daily: "Parution quotidienne",
    release: "Parution affichée", latest: "Plus récente", historical: "Parution historique", loadingRelease: "Chargement de la parution…",
    failure: "échec", failures: "échecs", loading: "Chargement…",
    properties: "propriétés",
    analyzed: "analysées",
    search: "Rechercher une ville, une adresse…",
    all: "Toutes les régions",
    positive: "Flux positif",
    results: "résultats", sorted: "Triés par score de rendement", perDoor: "/ porte",
    newDeal: "Nouveau au radar", mixedUse: "usage mixte", close: "Fermer l’analyse",
    prioritize: "À prioriser", analyze: "À analyser", watch: "À surveiller", lowPriority: "Rendement faible",
    positiveFlow: "CF positif / mois", negativeFlow: "Déficit / mois", neutralFlow: "CF nul / mois",
    cap: "Taux cap.", cash: "Flux / mois", score: "Score", published: "Analyse publiée",
    capHelp: "Revenu net d’exploitation annuel divisé par le prix demandé. Il mesure le rendement de l’immeuble avant financement.",
    cashOnCashHelp: "Flux de trésorerie annuel après financement divisé par la mise de fonds et les frais initiaux estimés.",
    dscrHelp: "Revenu net d’exploitation divisé par les paiements annuels de la dette. Au-dessus de 1, l’immeuble couvre sa dette.",
    grmHelp: "Prix demandé divisé par les revenus locatifs bruts annuels. Un multiple plus bas indique généralement un prix plus favorable par rapport aux revenus.",
    scenario: "Scénario personnalisé", reported: "Rapporté", estimated: "Estimé",
    expenses: "Dépenses d’exploitation", restore: "Revenir au publié",
    calculator: "Analyser dans le calculateur complet", source: "Voir la fiche source",
    definitionTitle: "Comprendre les estimations",
    definition: "Gestion couvre les honoraires d’un gestionnaire externe. Services publics propriétaire couvre l’électricité, le chauffage ou les services communs payés par le propriétaire.",
    remove: "Retirer du scénario", add: "Rétablir dans le scénario",
    notice: "Le bouton − retire une estimation du scénario uniquement. Les données rapportées et le résultat publié restent intacts.",
    stale: "La parution semble dater de plus de 30 heures.", unavailable: "La parution du jour est temporairement indisponible.",
    methodology: "Méthode transparente", methodologyBody: "Chaque résultat conserve les faits rapportés, les estimations, la règle appliquée et la version du modèle. Une présélection ne remplace pas la validation des baux, dépenses, travaux et conditions de financement.",
    cta: "Vous avez trouvé un immeuble à analyser?", ctaBody: "Gestion Velora peut valider les dépenses, préparer un budget d’exploitation et accompagner la mise en gestion.", contact: "Parler à Gestion Velora",
  },
  en: {
    kicker: "PLEX RADAR · MONTREAL",
    title: "Income properties for sale, analyzed daily.",
    intro: "A first-pass review of newly published duplexes, triplexes, fourplexes and fiveplexes using returns, Quebec financing and clearly identified expenses.",
    daily: "Daily release", properties: "properties", analyzed: "analyzed",
    release: "Displayed release", latest: "Latest", historical: "Historical release", loadingRelease: "Loading release…",
    failure: "failure", failures: "failures", loading: "Loading…",
    search: "Search a city or address…", all: "All regions", positive: "Positive cash flow",
    results: "results", sorted: "Sorted by investment score", perDoor: "/ door",
    newDeal: "New to the radar", mixedUse: "mixed use", close: "Close analysis",
    prioritize: "Prioritize", analyze: "Analyze", watch: "Watch", lowPriority: "Low return",
    positiveFlow: "Positive CF / mo", negativeFlow: "Deficit / mo", neutralFlow: "Break-even / mo",
    cap: "Cap rate", cash: "Cash flow / mo", score: "Score",
    capHelp: "Annual net operating income divided by asking price. It measures the property return before financing.",
    cashOnCashHelp: "Annual cash flow after financing divided by the estimated down payment and initial cash invested.",
    dscrHelp: "Net operating income divided by annual debt payments. Above 1 means the property covers its debt.",
    grmHelp: "Asking price divided by annual gross rental income. A lower multiple generally indicates a more favorable price relative to income.",
    published: "Published analysis", scenario: "Custom scenario", reported: "Reported", estimated: "Estimated",
    expenses: "Operating expenses", restore: "Restore published", calculator: "Open in the full calculator", source: "View source listing",
    definitionTitle: "Understanding estimates", definition: "Management covers an external manager’s fees. Owner-paid utilities cover electricity, heating or common services paid by the owner.",
    remove: "Remove from scenario", add: "Restore in scenario", notice: "The − button removes an estimate from the scenario only. Reported facts and the published result remain unchanged.",
    stale: "The release appears to be more than 30 hours old.", unavailable: "Today’s release is temporarily unavailable.",
    methodology: "Transparent methodology", methodologyBody: "Each result preserves reported facts, estimates, the applied rule and model version. Screening does not replace validation of leases, expenses, work and financing terms.",
    cta: "Found a property worth analyzing?", ctaBody: "Gestion Velora can validate expenses, prepare an operating budget and support the transition into management.", contact: "Talk to Gestion Velora",
  },
} as const;

function metric(deal: RadarDeal, excluded: string[]) {
  return excluded.length ? calculateRadarScenario(deal, excluded) : publishedRadarMetrics(deal);
}

function dealVerdict(score: number, t: typeof copy.fr | typeof copy.en) {
  if (score >= 9) return { label: t.prioritize, tone: "priority" };
  if (score >= 6) return { label: t.analyze, tone: "analyze" };
  if (score >= 3) return { label: t.watch, tone: "watch" };
  return { label: t.lowPriority, tone: "low" };
}

function cashFlowState(value: number, t: typeof copy.fr | typeof copy.en) {
  if (value > 0) return { tone: "positive", label: t.positiveFlow };
  if (value < 0) return { tone: "negative", label: t.negativeFlow };
  return { tone: "neutral", label: t.neutralFlow };
}

function MetricInfo({ id, label, description }: { id: string; label: string; description: string }) {
  return <span className="radar-metric-info">
    <button type="button" aria-label={`${label}: ${description}`} aria-describedby={id}>i</button>
    <span className="radar-metric-tooltip" id={id} role="tooltip">{description}</span>
  </span>;
}

export default function PlexRadarPage() {
  const { locale, localePath } = useLocale();
  const l = (locale === "en" ? "en" : "fr") as RadarLocale;
  const t = copy[l];
  const [feed, setFeed] = useState<RadarFeed | null>(null);
  const [releases, setReleases] = useState<string[]>([]);
  const [loadingRelease, setLoadingRelease] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>(t.all);
  const [positive, setPositive] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [excluded, setExcluded] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const controller = new AbortController();
    const requestedRelease = new URLSearchParams(window.location.search).get("release");
    const feedUrl = requestedRelease && /^\d{4}-\d{2}-\d{2}$/.test(requestedRelease)
      ? `/api/plex-radar?release=${encodeURIComponent(requestedRelease)}`
      : "/api/plex-radar";
    Promise.all([
      fetch(feedUrl, { signal: controller.signal, cache: "no-store" }),
      fetch("/api/plex-radar?history=1", { signal: controller.signal, cache: "no-store" }),
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
    return () => controller.abort();
  }, []);

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

  const modeled = useMemo(() => (feed?.deals ?? []).map((deal) => ({
    ...deal,
    live: metric(deal, excluded[deal.listing.listing_id] ?? []),
  })), [feed, excluded]);
  const regions = [t.all, ...Array.from(new Set(modeled.map((deal) => deal.listing.region).filter(Boolean)))];
  const filtered = modeled.filter((deal) => {
    const haystack = `${deal.listing.address} ${deal.listing.city} ${deal.listing.property_type}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (region === t.all || deal.listing.region === region)
      && (!positive || (deal.live?.monthlyCashFlow ?? -Infinity) > 0);
  }).sort((a, b) => (b.live?.score ?? -1) - (a.live?.score ?? -1) || (b.live?.capRate ?? -1) - (a.live?.capRate ?? -1));
  const selected = modeled.find((deal) => deal.listing.listing_id === selectedId) ?? filtered[0] ?? modeled[0];
  const selectedExcluded = selected ? excluded[selected.listing.listing_id] ?? [] : [];
  const isHistorical = Boolean(feed && releases[0] && feed.release !== releases[0]);
  const stale = feed && !isHistorical ? Date.now() - new Date(feed.generated_at).valueOf() > 30 * 60 * 60 * 1000 : false;
  const releaseLabel = (release: string) => new Intl.DateTimeFormat(l === "fr" ? "fr-CA" : "en-CA", {
    year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
  }).format(new Date(`${release}T12:00:00Z`));

  const toggleExpense = (dealId: string, key: string) => setExcluded((current) => {
    const keys = current[dealId] ?? [];
    return { ...current, [dealId]: keys.includes(key) ? keys.filter((item) => item !== key) : [...keys, key] };
  });

  const openDeal = (dealId: string) => {
    setSelectedId(dealId);
    setDetailOpen(true);
  };

  return (
    <main className="radar-page">
      <header className="radar-hero">
        <p>{t.kicker}</p><h1>{t.title}</h1><div className="radar-hero-bottom"><p>{t.intro}</p><dl><div><dt>{t.properties}</dt><dd>{feed?.deals.length ?? "—"}</dd></div><div><dt>{t.analyzed}</dt><dd>{modeled.filter((deal) => deal.live).length || "—"}</dd></div></dl></div>
      </header>
      <aside className={`radar-release ${stale || error ? "is-warning" : ""}`}>
        <div className="radar-release-status"><strong>{error ? t.unavailable : isHistorical ? t.historical : stale ? t.stale : t.daily}</strong>
        <span>{loadingRelease ? t.loadingRelease : feed ? `${feed.release} · ${feed.failure_count ?? 0} ${(feed.failure_count ?? 0) === 1 ? t.failure : t.failures}` : t.loading}</span></div>
        <div className="radar-history-picker" ref={historyRef}><span>{t.release}</span><div className="radar-history-select"><button type="button" aria-haspopup="listbox" aria-expanded={historyOpen} disabled={!feed || loadingRelease || releases.length < 2} onClick={() => setHistoryOpen((open) => !open)}>{feed ? releaseLabel(feed.release) : "—"}</button>{historyOpen && <div className="radar-history-menu" role="listbox" aria-label={t.release}>{releases.map((release, index) => <button type="button" role="option" aria-selected={release === feed?.release} key={release} onClick={() => loadRelease(release)}><span>{releaseLabel(release)}</span>{index === 0 && <small>{t.latest}</small>}</button>)}</div>}</div></div>
        <small>{feed?.expense_policy_version ?? RADAR_META[l].title}</small>
      </aside>

      <section className="radar-workspace">
        <div className="radar-list-side">
          <div className="radar-filters">
            <input aria-label={t.search} placeholder={t.search} value={query} onChange={(event) => setQuery(event.target.value)} />
            <span className="radar-select"><select aria-label={t.all} value={region} onChange={(event) => setRegion(event.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select></span>
            <label className="radar-positive">
              <input type="checkbox" checked={positive} onChange={(event) => setPositive(event.target.checked)} />
              <span className="radar-switch-track" aria-hidden="true" />
              <span className="radar-positive-label">{t.positive}</span>
            </label>
          </div>
          <div className="radar-count"><span>{filtered.length} {t.results}</span><span>{t.sorted}</span></div>
          <div className="radar-list">
            {filtered.map((deal, index) => {
              const verdict = dealVerdict(deal.live?.score ?? 0, t);
              const cashFlow = cashFlowState(deal.live?.monthlyCashFlow ?? 0, t);
              const isSelected = selected?.listing.listing_id === deal.listing.listing_id;
              return <article key={deal.listing.listing_id} className={isSelected ? "is-selected" : ""}>
                <button className="radar-row-main" onClick={() => openDeal(deal.listing.listing_id)} aria-label={`${deal.listing.address} — ${verdict.label}`}>
                  <span className="radar-rank">{String(index + 1).padStart(2, "0")}</span>
                  <span className="radar-property"><strong>{deal.listing.address}</strong><small>{deal.listing.property_type} · {deal.listing.city} · {deal.listing.units} {l === "fr" ? "portes" : "doors"}{deal.listing.mixed_use ? ` · ${t.mixedUse}` : ""}</small>{deal.lifecycle?.event_type === "first-seen" && <em>{t.newDeal}</em>}</span>
                  <span className="radar-price"><strong>{money.format(deal.listing.price)}</strong><small>{money.format(deal.listing.price / Math.max(1, deal.listing.units))} {t.perDoor}</small></span>
                  <span className="radar-cap"><strong>{deal.live ? pct.format(deal.live.capRate) : "—"}</strong><small>CAP</small></span>
                  <span className={`radar-flow is-${cashFlow.tone}`}><strong>{deal.live ? money.format(deal.live.monthlyCashFlow) : "—"}</strong><small>{cashFlow.label}</small></span>
                  <span className={`radar-verdict is-${verdict.tone}`}>{verdict.label}</span>
                </button>
              </article>;
            })}
          </div>
        </div>

        {detailOpen && <button className="radar-drawer-scrim" aria-label={t.close} onClick={() => setDetailOpen(false)} />}
        {detailOpen && selected?.live && <aside className="radar-analysis is-open" role="dialog" aria-modal="true" aria-labelledby="radar-dossier-title">
          <button className="radar-drawer-close" aria-label={t.close} onClick={() => setDetailOpen(false)}>×</button>
          <div className="radar-analysis-head"><div><p>{selectedExcluded.length ? t.scenario : t.published}</p><h2 id="radar-dossier-title">{selected.listing.address}</h2><small>{selected.listing.city} · {selected.listing.units} portes · {selected.listing.year_built ?? "—"}</small></div><strong>{selected.live.score}<small>/12</small></strong></div>
          <div className="radar-kpis">
            <article><div className="radar-kpi-label"><span>{t.cap}</span><MetricInfo id="radar-cap-help" label={t.cap} description={t.capHelp} /></div><strong>{pct.format(selected.live.capRate)}</strong></article>
            <article><div className="radar-kpi-label"><span>Cash-on-cash</span><MetricInfo id="radar-coc-help" label="Cash-on-cash" description={t.cashOnCashHelp} /></div><strong>{pct.format(selected.live.cashOnCash)}</strong></article>
            <article><div className="radar-kpi-label"><span>DSCR</span><MetricInfo id="radar-dscr-help" label="DSCR" description={t.dscrHelp} /></div><strong>{selected.live.dscr.toFixed(2)}×</strong></article>
            <article><div className="radar-kpi-label"><span>MRB</span><MetricInfo id="radar-grm-help" label="MRB" description={t.grmHelp} /></div><strong>{selected.live.grm.toFixed(1)}×</strong></article>
          </div>
          <div className={`radar-cash is-${cashFlowState(selected.live.monthlyCashFlow, t).tone}`}><span>{cashFlowState(selected.live.monthlyCashFlow, t).label}</span><strong>{money.format(selected.live.monthlyCashFlow)}</strong><small>{money.format(selected.live.cashFlowPerDoor)} / porte</small></div>
          {selected.expense_policy && <section className="radar-expenses"><div><div><p>{t.expenses}</p><strong>{money.format(selected.live.operatingExpenses)}</strong></div>{selectedExcluded.length > 0 && <button onClick={() => setExcluded((current) => ({ ...current, [selected.listing.listing_id]: [] }))}>{t.restore}</button>}</div>
            <details><summary>{t.definitionTitle}</summary><p>{t.definition}</p></details>
            {selected.expense_policy.lines.map((line) => { const removed = selectedExcluded.includes(line.key); return <article className={removed ? "is-removed" : ""} key={line.key}><span><strong>{line.label}</strong><small>{line.rule}</small></span><span><b>{money.format(line.amount)}</b><em>{line.source === "reported" ? t.reported : t.estimated}</em></span>{line.source === "estimated" && <button aria-label={`${removed ? t.add : t.remove}: ${line.label}`} aria-pressed={removed} onClick={() => toggleExpense(selected.listing.listing_id, line.key)}>{removed ? "+" : "−"}</button>}</article>})}
            <small>{t.notice}</small>
          </section>}
          <div className="radar-actions"><Link to={calculatorUrl(selected, l, selectedExcluded)}>{t.calculator}</Link><a href={selected.listing.url} target="_blank" rel="noreferrer">{t.source} ↗</a></div>
        </aside>}
      </section>

      <section className="radar-method"><div><p>{t.methodology}</p><h2>{l === "fr" ? "Des règles visibles avant une décision." : "Visible rules before a decision."}</h2></div><p>{t.methodologyBody}</p></section>
      <section className="radar-cta"><div><h2>{t.cta}</h2><p>{t.ctaBody}</p></div><Link to={localePath("/#contact")}>{t.contact}</Link></section>
    </main>
  );
}
