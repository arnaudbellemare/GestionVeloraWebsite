import { useEffect, useMemo, useState } from "react";
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
    failure: "échec", failures: "échecs", loading: "Chargement…",
    properties: "propriétés",
    analyzed: "analysées",
    search: "Rechercher une ville, une adresse…",
    all: "Toutes les régions",
    positive: "Flux positif",
    results: "résultats", sorted: "Triés par score de rendement", perDoor: "/ porte",
    newDeal: "Nouveau au radar", mixedUse: "usage mixte", close: "Fermer l’analyse",
    prioritize: "À prioriser", analyze: "À analyser", watch: "À surveiller", lowPriority: "Rendement faible",
    cap: "Taux cap.", cash: "Flux / mois", score: "Score", published: "Analyse publiée",
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
    failure: "failure", failures: "failures", loading: "Loading…",
    search: "Search a city or address…", all: "All regions", positive: "Positive cash flow",
    results: "results", sorted: "Sorted by investment score", perDoor: "/ door",
    newDeal: "New to the radar", mixedUse: "mixed use", close: "Close analysis",
    prioritize: "Prioritize", analyze: "Analyze", watch: "Watch", lowPriority: "Low return",
    cap: "Cap rate", cash: "Cash flow / mo", score: "Score",
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

export default function PlexRadarPage() {
  const { locale, localePath } = useLocale();
  const l = (locale === "en" ? "en" : "fr") as RadarLocale;
  const t = copy[l];
  const [feed, setFeed] = useState<RadarFeed | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>(t.all);
  const [positive, setPositive] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [excluded, setExcluded] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/plex-radar", { signal: controller.signal, cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: RadarFeed) => { setFeed(payload); setSelectedId(payload.deals[0]?.listing.listing_id ?? ""); })
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, []);

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
  const stale = feed ? Date.now() - new Date(feed.generated_at).valueOf() > 30 * 60 * 60 * 1000 : false;

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
        <strong>{error ? t.unavailable : stale ? t.stale : t.daily}</strong>
        <span>{feed ? `${feed.release} · ${feed.failure_count ?? 0} ${(feed.failure_count ?? 0) === 1 ? t.failure : t.failures}` : t.loading}</span>
        <small>{feed?.expense_policy_version ?? RADAR_META[l].title}</small>
      </aside>

      <section className="radar-workspace">
        <div className="radar-list-side">
          <div className="radar-filters">
            <input aria-label={t.search} placeholder={t.search} value={query} onChange={(event) => setQuery(event.target.value)} />
            <span className="radar-select"><select aria-label={t.all} value={region} onChange={(event) => setRegion(event.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select></span>
            <label className="radar-positive"><input type="checkbox" checked={positive} onChange={(event) => setPositive(event.target.checked)} /><span aria-hidden="true" /> {t.positive}</label>
          </div>
          <div className="radar-count"><span>{filtered.length} {t.results}</span><span>{t.sorted}</span></div>
          <div className="radar-list">
            {filtered.map((deal, index) => {
              const verdict = dealVerdict(deal.live?.score ?? 0, t);
              const isSelected = selected?.listing.listing_id === deal.listing.listing_id;
              return <article key={deal.listing.listing_id} className={isSelected ? "is-selected" : ""}>
                <button className="radar-row-main" onClick={() => openDeal(deal.listing.listing_id)} aria-label={`${deal.listing.address} — ${verdict.label}`}>
                  <span className="radar-rank">{String(index + 1).padStart(2, "0")}</span>
                  <span className="radar-property"><strong>{deal.listing.address}</strong><small>{deal.listing.property_type} · {deal.listing.city} · {deal.listing.units} {l === "fr" ? "portes" : "doors"}{deal.listing.mixed_use ? ` · ${t.mixedUse}` : ""}</small>{deal.lifecycle?.event_type === "first-seen" && <em>{t.newDeal}</em>}</span>
                  <span className="radar-price"><strong>{money.format(deal.listing.price)}</strong><small>{money.format(deal.listing.price / Math.max(1, deal.listing.units))} {t.perDoor}</small></span>
                  <span className="radar-cap"><strong>{deal.live ? pct.format(deal.live.capRate) : "—"}</strong><small>CAP</small></span>
                  <span className="radar-flow"><strong>{deal.live ? money.format(deal.live.monthlyCashFlow) : "—"}</strong><small>{l === "fr" ? "CF / mois" : "CF / mo"}</small></span>
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
          <div className="radar-kpis"><article><span>{t.cap}</span><strong>{pct.format(selected.live.capRate)}</strong></article><article><span>Cash-on-cash</span><strong>{pct.format(selected.live.cashOnCash)}</strong></article><article><span>DSCR</span><strong>{selected.live.dscr.toFixed(2)}×</strong></article><article><span>MRB</span><strong>{selected.live.grm.toFixed(1)}×</strong></article></div>
          <div className="radar-cash"><span>{t.cash}</span><strong>{money.format(selected.live.monthlyCashFlow)}</strong><small>{money.format(selected.live.cashFlowPerDoor)} / porte</small></div>
          {selected.expense_policy && <section className="radar-expenses"><div><div><p>{t.expenses}</p><strong>{money.format(selected.live.operatingExpenses)}</strong></div>{selectedExcluded.length > 0 && <button onClick={() => setExcluded((current) => ({ ...current, [selected.listing.listing_id]: [] }))}>{t.restore}</button>}</div>
            <details><summary>{t.definitionTitle}</summary><p>{t.definition}</p></details>
            {selected.expense_policy.lines.map((line) => { const removed = selectedExcluded.includes(line.key); return <article className={removed ? "is-removed" : ""} key={line.key}><span><strong>{line.label}</strong><small>{line.rule}</small></span><span><b>{money.format(line.amount)}</b><em>{line.source === "reported" ? t.reported : t.estimated}</em></span>{line.source === "estimated" && <button aria-label={`${removed ? t.add : t.remove}: ${line.label}`} aria-pressed={removed} onClick={() => toggleExpense(selected.listing.listing_id, line.key)}>{removed ? "+" : "−"}</button>}</article>})}
            <small>{t.notice}</small>
          </section>}
          <div className="radar-actions"><Link to={calculatorUrl(selected, l)}>{t.calculator}</Link><a href={selected.listing.url} target="_blank" rel="noreferrer">{t.source} ↗</a></div>
        </aside>}
      </section>

      <section className="radar-method"><div><p>{t.methodology}</p><h2>{l === "fr" ? "Des règles visibles avant une décision." : "Visible rules before a decision."}</h2></div><p>{t.methodologyBody}</p></section>
      <section className="radar-cta"><div><h2>{t.cta}</h2><p>{t.ctaBody}</p></div><Link to={localePath("/#contact")}>{t.contact}</Link></section>
    </main>
  );
}
