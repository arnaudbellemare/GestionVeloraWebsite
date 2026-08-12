import { useState, useMemo, useCallback } from "react";
import {
  DealInputs,
  UnitRow,
  FinancingMode,
  MliPoints,
  PropertyType,
  ApodLineId,
  UnitTypeLabel,
  DEFAULT_INPUTS,
  calculateDeal,
  calculateProjection,
  analyzeDeal,
  mliSelectTerms,
  applyPropertyPreset,
  applyArea,
  applyUnitType,
  reconcileUnitMixCount,
  AREAS,
  areasByRegion,
  UNIT_TYPES,
  UNIT_TYPE_ORDER,
  maxInsuredLtv,
  hasLot,
  calculateEconomicValue,
} from "../../lib/plex/calculator";
import { makeFormatters } from "../../lib/plex/format";
import { CALC_UI, type CalcUi } from "../../data/plex-calculator-ui";
import { REFERENCE_FIGURES } from "../../data/plex-calculator";
import { CONTACT_FORM_USE_API, WEB3FORMS_ACCESS_KEY } from "../../config";
import { Select, type SelectOption } from "./Select";
import { ProjectionChart } from "./ProjectionChart";

type Locale = "fr" | "en";

function radarPrefill(): DealInputs {
  if (typeof window === "undefined") return DEFAULT_INPUTS;
  const params = new URLSearchParams(window.location.search);
  if (params.get("source") !== "plex-radar") return DEFAULT_INPUTS;
  const number = (key: string) => Math.max(0, Number(params.get(key) ?? 0) || 0);
  const units = Math.max(1, Math.round(number("units")));
  const type: PropertyType = units >= 5 ? "fiveplex-plus" : units === 4 ? "quadruplex" : units === 3 ? "triplex" : "duplex";
  const grossAnnual = number("grossAnnual");
  const monthlyPerUnit = Math.round(grossAnnual / 12 / units);
  const seeded = applyPropertyPreset(DEFAULT_INPUTS, type);
  const requestedArea = params.get("areaKey") ?? "villeray";
  const areaKey = AREAS[requestedArea] ? requestedArea : "outside-gma";
  const commercial = units >= 5 || params.get("mixedUse") === "true";
  return {
    ...seeded,
    areaKey,
    askingPrice: number("askingPrice"),
    purchasePrice: number("purchasePrice"),
    buildingYear: number("buildingYear") || seeded.buildingYear,
    numberOfUnits: units,
    unitMix: [{ id: "radar", label: "4½", count: units, currentRent: monthlyPerUnit, marketRent: monthlyPerUnit, sqft: 850 }],
    propertyTaxes: number("municipalTaxes"),
    schoolTax: number("schoolTax"),
    insurance: number("insurance"),
    snowRemoval: number("snow"),
    lawnLandscaping: number("lawn"),
    commonHydro: number("hydro"),
    repairsMaintenancePct: grossAnnual > 0 ? number("repairs") / grossAnnual : seeded.repairsMaintenancePct,
    propertyManagementPct: grossAnnual > 0 ? number("management") / grossAnnual : seeded.propertyManagementPct,
    capexPerUnit: number("capex") / units,
    financingMode: commercial ? "commercial" : "residential",
    loanLifeYears: commercial ? 40 : 25,
    ownerOccupied: false,
    ownerOccupiedUnitId: null,
    isMontreal: (params.get("city") ?? "").toLocaleLowerCase("fr-CA").includes("montr"),
  };
}

// ─── Primitives ──────────────────────────────────────────────────────

function Field({
  label, value, onChange, prefix, suffix, step, min, max, help,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  help?: string;
}) {
  return (
    <div className="plexc-field">
      <label>{label}</label>
      <div className="plexc-input">
        {prefix && <span className="plexc-affix">{prefix}</span>}
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={step ?? 1}
          min={min}
          max={max}
        />
        {suffix && <span className="plexc-affix">{suffix}</span>}
      </div>
      {help && <p className="plexc-help">{help}</p>}
    </div>
  );
}

/** Percent field storing a decimal but edited as a whole number. */
function PctField({
  label, value, onChange, step = 0.1, help, max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  help?: string;
  max?: number;
}) {
  return (
    <Field
      label={label}
      // Two decimals: rates like 4.75% must not round to 4.8%.
      value={Math.round(value * 10000) / 100}
      onChange={(v) => onChange(v / 100)}
      suffix="%"
      step={step}
      min={0}
      max={max}
      help={help}
    />
  );
}

function SelectField<T extends string>({
  label, value, onChange, options, help,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: SelectOption<T>[];
  help?: string;
}) {
  return (
    <div className="plexc-field">
      <label>{label}</label>
      <Select value={value} options={options} onChange={onChange} ariaLabel={label} full />
      {help && <p className="plexc-help">{help}</p>}
    </div>
  );
}

function Toggle({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="plexc-check">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function Kpi({
  label, value, note, tone,
}: { label: string; value: string; note?: string; tone?: "good" | "warn" | "bad" }) {
  const cls = tone ? `plexc-v-${tone}` : "";
  return (
    <div className="plexc-kpi">
      <div className="plexc-kpi-label">{label}</div>
      <div className={`plexc-kpi-value ${cls}`}>{value}</div>
      {note && <div className="plexc-kpi-note">{note}</div>}
    </div>
  );
}

/**
 * A computed figure. `help` says where it comes from, so a derived number is
 * not mistaken for one the reader simply cannot change.
 */
function Readout({ label, value, help }: { label: string; value: string; help?: string }) {
  return (
    <div className="plexc-field">
      <label>{label}</label>
      <div className="plexc-readout">{value}</div>
      {help && <p className="plexc-help">{help}</p>}
    </div>
  );
}

/**
 * Editable figure inside the operating statement. Shows a grouped value at rest
 * so the column reads like a statement, and the raw number while focused so it
 * can be typed over. The draft is only shown while focused, so a cell can never
 * get stuck displaying a stale number.
 */
function MoneyCell({
  value, onChange, ariaLabel, override, format,
}: {
  value: number;
  onChange: (v: number) => void;
  ariaLabel: string;
  override?: boolean;
  format: (v: number) => string;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const rounded = Math.round(Math.abs(value));
  const display = focused && draft !== null ? draft : format(rounded);

  return (
    <span className={`plexc-cell ${override ? "is-override" : ""}`}>
      <span className="plexc-cell-affix">$</span>
      <input
        type="text"
        inputMode="numeric"
        aria-label={ariaLabel}
        value={display}
        onFocus={() => { setFocused(true); setDraft(String(rounded)); }}
        onBlur={() => { setFocused(false); setDraft(null); }}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9.]/g, "");
          setDraft(raw);
          onChange(Math.abs(parseFloat(raw) || 0));
        }}
      />
    </span>
  );
}

// ─── Component ───────────────────────────────────────────────────────

export function DealAnalyzer({ locale }: { locale: Locale }) {
  const t: CalcUi = CALC_UI[locale];
  const f = useMemo(() => makeFormatters(locale), [locale]);

  const [inputs, setInputs] = useState<DealInputs>(radarPrefill);
  const [tab, setTab] = useState(0);
  const [emailPrompt, setEmailPrompt] = useState(false);
  const [email, setEmail] = useState("");

  const set = useCallback(<K extends keyof DealInputs>(field: K, value: DealInputs[K]) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  }, []);

  const results = useMemo(() => calculateDeal(inputs), [inputs]);
  const projection = useMemo(
    () => calculateProjection(inputs, results, Math.max(6, Math.min(inputs.exitYear, 15))),
    [inputs, results],
  );
  const analysis = useMemo(() => analyzeDeal(inputs, results), [inputs, results]);

  const area = AREAS[inputs.areaKey] ?? AREAS["villeray"];
  const isCommercialTrack = inputs.financingMode !== "residential";
  const mliTerms = mliSelectTerms(inputs.mliPoints);
  const isCondo = inputs.propertyType === "condo";
  const isFlip = inputs.propertyType === "house-flip";
  const units = results.totalUnits;
  const rentalUnits = Math.max(0, units - (inputs.ownerOccupied ? 1 : 0));
  const isCommercialProperty = units >= 5;

  // Bank value applies where lending is income-driven: the 5+ commercial tracks.
  const economicValue = useMemo(
    () => (isCommercialProperty
      ? calculateEconomicValue(
          inputs,
          results.currentMonthlyRent * 12,
          results.totalOperatingExpenses,
          results.propertyManagementAnnual,
          results.repairsMaintenanceAnnual,
        )
      : null),
    [inputs, results, isCommercialProperty],
  );

  const areaOptions: SelectOption<string>[] = useMemo(
    () => areasByRegion().flatMap(({ region, keys }) =>
      keys.map((k) => ({
        value: k,
        label: AREAS[k].name,
        hint: `${AREAS[k].priceIndex.toFixed(2)}×`,
        group: region,
      }))),
    [],
  );

  const bedNote: Record<UnitTypeLabel, string> = {
    "Studio": t.bed0a, "2½": t.bed0b, "3½": t.bed1, "4½": t.bed2, "5½": t.bed3, "6½": t.bed4,
  };

  const unitTypeOptions: SelectOption<UnitTypeLabel>[] = useMemo(
    () => UNIT_TYPE_ORDER.map((u) => ({ value: u, label: u, hint: bedNote[u] })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale],
  );

  const typeOptions: SelectOption<PropertyType>[] = [
    { value: "condo", label: t.typeCondo },
    { value: "duplex", label: t.typeDuplex },
    { value: "triplex", label: t.typeTriplex },
    { value: "quadruplex", label: t.typeQuadruplex },
    { value: "fiveplex-plus", label: t.typeFivePlus },
    { value: "house-flip", label: t.typeFlip },
  ];

  const TABS = isFlip
    ? [t.tabProperty, t.tabFinancing, t.tabRenovation, t.tabAssumptions, t.tabExit]
    : [t.tabProperty, t.tabUnitMix, t.tabFinancing, t.tabRenovation,
       t.tabExpenses, t.tabAssumptions, t.tabRefinancing, t.tabExit];
  const tabKey = TABS[Math.min(tab, TABS.length - 1)];

  const changePropertyType = (v: PropertyType) => {
    setInputs((prev) => applyPropertyPreset(prev, v));
    setTab(0);
  };

  const updateUnit = (id: string, patch: Partial<UnitRow>) =>
    set("unitMix", inputs.unitMix.map((u) => (u.id === id ? { ...u, ...patch } : u)));

  const updateUnitCount = (id: string, count: number) => {
    setInputs((prev) => {
      const edited = prev.unitMix.map((u) => (u.id === id ? { ...u, count } : u));
      const unitMix = reconcileUnitMixCount(edited, prev.propertyType, id);
      return {
        ...prev,
        unitMix,
        numberOfUnits: unitMix.reduce((sum, unit) => sum + unit.count, 0),
      };
    });
  };

  const setUnitType = (id: string, label: UnitTypeLabel) =>
    set("unitMix", inputs.unitMix.map((u) => (u.id === id ? applyUnitType(u, label) : u)));

  const addUnit = () => {
    const spec = UNIT_TYPES["4½"];
    setInputs((prev) => {
      const id = `u${prev.unitMix.length}-${prev.unitMix.reduce((s, u) => s + u.count, 0)}`;
      const added = [
        ...prev.unitMix,
        {
          id,
          label: spec.label, count: 1,
          currentRent: spec.currentRent, marketRent: spec.marketRent, sqft: spec.sqft,
        },
      ];
      const unitMix = reconcileUnitMixCount(added, prev.propertyType, id);
      return {
        ...prev,
        unitMix,
        numberOfUnits: unitMix.reduce((sum, unit) => sum + unit.count, 0),
      };
    });
  };

  const removeUnit = (id: string) => {
    setInputs((prev) => {
      if (prev.unitMix.length <= 1) return prev;
      const remaining = prev.unitMix.filter((u) => u.id !== id);
      const unitMix = reconcileUnitMixCount(remaining, prev.propertyType);
      return {
        ...prev,
        unitMix,
        numberOfUnits: unitMix.reduce((sum, unit) => sum + unit.count, 0),
      };
    });
  };

  // ── APOD editing ──────────────────────────────────────────
  const setApodCurrent = (id: ApodLineId, v: number) => {
    const gross = results.currentMonthlyRent * 12;
    const perGross = (x: number) => (gross > 0 ? x / gross : 0);
    switch (id) {
      case "gsi": break;
      case "vacancy": set("vacancyRate", perGross(v)); break;
      case "taxes": set("propertyTaxes", v); break;
      case "schoolTax": set("schoolTax", v); break;
      case "insurance": set("insurance", v); break;
      case "snow": set("snowRemoval", v); break;
      case "landscaping": set("lawnLandscaping", v); break;
      case "hydro": set("commonHydro", v); break;
      case "repairs": set("repairsMaintenancePct", perGross(v)); break;
      case "management": set("propertyManagementPct", perGross(v)); break;
      case "capex": set("capexPerUnit", units > 0 ? v / units : 0); break;
      case "condoFees": set("condoFees", v / 12); break;
      case "other": set("otherExpenses", v); break;
    }
  };

  const setProformaOverride = (id: ApodLineId, v: number | undefined) => {
    const next = { ...inputs.proformaOverrides };
    if (v === undefined) delete next[id];
    else next[id] = v;
    set("proformaOverrides", next);
  };

  const overrideCount = Object.keys(inputs.proformaOverrides ?? {}).length;

  // Localised APOD line labels, keyed off the engine's stable ids.
  const apodLabel = (id: ApodLineId | undefined, fallback: string): string => {
    switch (id) {
      case "gsi": return t.grossScheduledIncome;
      case "vacancy": return `${t.vacancyCreditLoss} (${f.percent(inputs.vacancyRate)})`;
      case "taxes": return t.municipalTaxes;
      case "schoolTax": return t.schoolTax;
      case "insurance": return t.insurance;
      case "snow": return t.snowRemoval;
      case "landscaping": return t.landscaping;
      case "hydro": return t.commonHydro;
      case "repairs": return t.repairsMaintenance;
      case "management": return t.propertyManagement;
      case "capex": return t.capexReserve;
      case "condoFees": return t.condoFeesLine;
      case "other": return t.other;
      default: break;
    }
    const map: Record<string, string> = {
      "Income": t.income,
      "Operating Expenses": t.operatingExpenses,
      "Effective Gross Income": t.effectiveGrossIncome,
      "Total Operating Expenses": t.totalOperatingExpenses,
      "Net Operating Income": t.netOperatingIncome,
      "Annual Debt Service": t.annualDebtService,
      "Cash Flow Before Tax": t.cashFlowBeforeTax,
    };
    return map[fallback] ?? fallback;
  };

  /**
   * The verdict factors come out of the engine with English labels and
   * English-formatted values (the engine is locale-agnostic and pre-formats
   * them). Rather than change its return type, they are mapped here: keyed on
   * the engine's stable label strings, so a French page never shows
   * "PAYBACK (TOTAL): 4 YEARS" or "$-688".
   */
  const VERDICT_LABELS: Record<string, { fr: string; en: string }> = {
    "Cap Rate": { fr: "Taux de capitalisation", en: "Cap rate" },
    "Cash-on-Cash (BT)": { fr: "Rendement comptant", en: "Cash-on-cash" },
    "DSCR": { fr: "Ratio de couverture", en: "DSCR" },
    "Monthly CF (BT)": { fr: "Flux mensuel", en: "Monthly cash flow" },
    "CF/Door/mo": { fr: "Flux / porte / mois", en: "Cash flow / door / mo" },
    "Payback (total)": { fr: "Retour sur investissement", en: "Payback (total)" },
    "CF Payback": { fr: "Retour par flux de trésorerie", en: "Cash-flow payback" },
    "1% Rule": { fr: "Règle du 1 %", en: "1% rule" },
    "GRM": { fr: "Multiplicateur de revenu brut", en: "GRM" },
    "Break-even Ratio": { fr: "Seuil de rentabilité", en: "Break-even ratio" },
    "Down Payment": { fr: "Mise de fonds", en: "Down payment" },
    "Flip ROI": { fr: "Rendement de revente", en: "Flip ROI" },
    "Flip Profit": { fr: "Profit de revente", en: "Flip profit" },
    "Profit Margin": { fr: "Marge de profit", en: "Profit margin" },
  };

  const verdictLabel = (label: string) => VERDICT_LABELS[label]?.[locale] ?? label;

  /**
   * Rewrites the engine's en-CA value strings into French conventions. The
   * engine emits plain toFixed() output, so dollar amounts arrive ungrouped -
   * they are re-formatted here rather than merely moved past the symbol.
   */
  const verdictValue = (value: string): string => {
    if (locale === "en") return value;
    return value
      .replace(/^\$(-?)(\d+)$/, (_m, sign, n) =>
        `${sign}${f.number(Number(n))} $`)
      .replace(/(\d)\.(\d)/g, "$1,$2")
      // "years" before "year", or the plural would be left half-translated.
      .replace(/\byears\b/gi, "ans")
      .replace(/\byear\b/gi, "an")
      .replace(/\bNever\b/gi, "Jamais")
      .replace(/(\d)%/, "$1 %")
      .replace(/need 25%\+/i, "25 % minimum requis");
  };

  // ── Export ────────────────────────────────────────────────
  const propertyName = `${area.name} ${typeOptions.find((o) => o.value === inputs.propertyType)?.label ?? ""}`;

  const downloadCsv = () => {
    const rows: string[][] = [];
    const q = (s: string | number) => `"${String(s).replace(/"/g, '""')}"`;
    rows.push([q(propertyName), q("Gestion Velora")]);
    rows.push([]);
    rows.push([q(t.apodHeading), q(t.colInPlace), q(t.colProforma)]);
    for (const line of results.apod) {
      const label = apodLabel(line.id, line.label);
      if (line.kind === "header") rows.push([q(label), q(""), q("")]);
      else rows.push([q(label), q(line.current.toFixed(0)), q(line.proforma.toFixed(0))]);
    }
    rows.push([]);
    rows.push([q(t.colYear), q(t.colGrossRent), q(t.colNoi), q(t.colDebtService),
      q(t.colCashFlow), q(t.colRenoSpend), q(t.colValue), q(t.colLoanBalance), q(t.colEquity)]);
    for (const p of projection) {
      rows.push([q(p.year), q(p.annualRent.toFixed(0)), q(p.noi.toFixed(0)),
        q(p.annualDebtService.toFixed(0)), q(p.btCashFlow.toFixed(0)), q(p.renoSpend.toFixed(0)),
        q(p.propertyValue.toFixed(0)), q(p.loanBalance.toFixed(0)), q(p.equity.toFixed(0))]);
    }
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${propertyName.replace(/\s+/g, "-").toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Export is never blocked on the email: the file downloads either way. The
   * address is an optional capture at the moment of highest intent, and the
   * tool stays fully crawlable because nothing is behind a gate.
   */
  const submitEmail = () => {
    // Only posts when the site's Web3Forms key is actually configured, using
    // the same config export the contact form uses: an unset key would
    // otherwise send an empty access_key and fail silently.
    if (email.trim() && CONTACT_FORM_USE_API) {
      void fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Calculateur plex: ${propertyName}`,
          email: email.trim(),
          message: `${propertyName}\nCap: ${f.percent2(results.purchaseCapRate)}\nNOI: ${f.currency(results.noi)}\nCash flow: ${f.currency(results.btCashFlowYear1)}`,
        }),
      }).catch(() => { /* export must not depend on the network */ });
    }
    downloadCsv();
    setEmailPrompt(false);
    setEmail("");
  };

  // ── Tones ─────────────────────────────────────────────────
  const capTone = results.purchaseCapRate >= 0.055 ? "good" : results.purchaseCapRate >= 0.04 ? "warn" : "bad";
  const dscrTone = results.dscrYear1 >= 1.25 ? "good" : results.dscrYear1 >= 1.1 ? "warn" : "bad";
  const cfTone = results.btCashFlowYear1 >= 0 ? "good" : "bad";
  const cocTone = results.cashOnCashBtYear1 >= 0.06 ? "good" : results.cashOnCashBtYear1 >= 0.03 ? "warn" : "bad";
  const discountFromAsk = inputs.askingPrice > 0
    ? (inputs.askingPrice - inputs.purchasePrice) / inputs.askingPrice : 0;

  return (
    <div className="plexc">
      {/* ── Controls ── */}
      <div className="plexc-bar">
        <div className="plexc-field plexc-bar-area">
          <label>{t.area}</label>
          <Select
            value={inputs.areaKey}
            options={areaOptions}
            onChange={(k) => setInputs((prev) => applyArea(prev, k))}
            ariaLabel={t.area}
            full
          />
        </div>
        <button className="plexc-btn plexc-btn-primary" onClick={() => setEmailPrompt((v) => !v)}>
          {t.exportCsv}
        </button>
      </div>

      {emailPrompt && (
        <div className="plexc-export">
          <p>{t.exportEmailPrompt}</p>
          <div className="plexc-export-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.exportEmailPlaceholder}
              aria-label={t.exportEmailPrompt}
            />
            <button className="plexc-btn plexc-btn-primary" onClick={submitEmail}>
              {email.trim() ? t.exportEmailSubmit : t.exportEmailSkip}
            </button>
          </div>
          <p className="plexc-help">{t.exportEmailNote}</p>
        </div>
      )}

      {/* ── KPIs ── */}
      {isFlip ? (
        <section className="plexc-kpis" aria-label={t.profit}>
          <Kpi label={t.afterRepairValue} value={f.currency(results.brrrrAnalysis.arvAfterRehab)} />
          <Kpi label={t.purchasePrice} value={f.currency(inputs.purchasePrice)} note={`${f.percent(discountFromAsk)} ${t.belowAsk}`} />
          <Kpi label={t.rehabBudget} value={f.currency(inputs.rehabBudget)} />
          <Kpi label={t.cashIn} value={f.currency(results.totalEquityInvested)} />
          <Kpi label={t.welcomeTax} value={f.currency(results.closingCosts.welcomeTax)} />
          <Kpi label={t.holdingCost} value={f.currency(results.paymentPerPeriod * inputs.holdingMonths)} note={`${inputs.holdingMonths} ${t.months}`} />
          <Kpi label={t.sellingCosts} value={f.currency(results.brrrrAnalysis.arvAfterRehab * inputs.sellingCostsPct)} />
          <Kpi label={t.profit} value={f.accounting(results.flipProfit)} tone={results.flipProfit > 0 ? "good" : "bad"} />
          <Kpi label={t.returnOnCash} value={f.percent2(results.flipROI)} tone={results.flipROI >= 0.2 ? "good" : results.flipROI >= 0.1 ? "warn" : "bad"} />
          <Kpi label={t.marginOnArv} value={f.percent2(results.brrrrAnalysis.arvAfterRehab > 0 ? results.flipProfit / results.brrrrAnalysis.arvAfterRehab : 0)} />
          <Kpi label={t.allInCost} value={f.currency(inputs.purchasePrice + inputs.rehabBudget + results.closingCosts.totalClosingCosts)} />
          <Kpi label={t.monthlyCarry} value={f.currency(results.paymentPerPeriod + results.totalOperatingExpenses / 12)} />
        </section>
      ) : (
        <section className="plexc-kpis" aria-label={t.purchaseCap}>
          <Kpi label={t.purchaseCap} value={f.percent2(results.purchaseCapRate)} tone={capTone} note={t.purchaseCapNote} />
          <Kpi label={t.proformaCap} value={f.percent2(results.proformaCapRate)} note={t.proformaCapNote} />
          <Kpi label={t.pricePerUnit} value={f.currency(results.pricePerUnit)} note={`${units} ${t.unitsSuffix}`} />
          <Kpi label={t.totalEquity} value={f.currency(results.totalEquityInvested)} note={t.totalEquityNote} />
          <Kpi label={t.cocYear1} value={f.percent2(results.cashOnCashBtYear1)} tone={cocTone} />
          <Kpi label={t.avgCoc} value={f.percent2(results.avgCashOnCash)} note={`${t.overYears} ${inputs.exitYear} ${locale === "fr" ? "ans" : "yrs"}`} />
          <Kpi label={t.dscr} value={f.number(results.dscrYear1, 2)} tone={dscrTone} />
          <Kpi label={t.currentNoi} value={f.currency(results.noi)} />
          <Kpi label={t.currentCashFlow} value={f.currency(results.btCashFlowYear1)} tone={cfTone} note={`${f.currency(results.btCashFlowMonthly)}${t.perMonth}`} />
          <Kpi label={t.irr} value={f.percent2(results.irr)} note={`${inputs.exitYear} ${t.yrHold}`} />
          <Kpi label={t.afterTaxIrr} value={f.percent2(results.afterTaxIrr)} note={`${inputs.exitYear} ${t.yrHold}`} />
          <Kpi label={t.equityMultiple} value={f.multiple(results.equityMultiple)} />
          <Kpi label={t.proformaCashFlow} value={f.currency(results.proformaCashFlow)} note={t.proformaCashFlowNote} />
        </section>
      )}

      {/* ── Tabs ── */}
      <div className="plexc-tabs" role="tablist">
        {TABS.map((label, i) => (
          <button
            key={label}
            role="tab"
            aria-selected={tab === i}
            className="plexc-tab"
            onClick={() => setTab(i)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="plexc-panel" role="tabpanel">
        {tabKey === t.tabProperty && (
          <div className="plexc-card">
            <h3>{t.propertyHeading}</h3>
            <p className="plexc-sub">{t.propertySub}</p>
            <div className="plexc-grid4">
              <SelectField<PropertyType>
                label={t.propertyType}
                value={inputs.propertyType}
                onChange={changePropertyType}
                help={t.propertyTypeHelp}
                options={typeOptions}
              />
              <Field label={t.askingPrice} value={inputs.askingPrice} onChange={(v) => set("askingPrice", v)} prefix="$" step={5000} />
              <Field label={t.offerPrice} value={inputs.purchasePrice} onChange={(v) => set("purchasePrice", v)} prefix="$" step={5000}
                help={discountFromAsk > 0 ? `${f.percent(discountFromAsk)} ${t.belowAsk}` : undefined} />
              <Field label={t.buildingYear} value={inputs.buildingYear} onChange={(v) => set("buildingYear", v)} step={1}
                help={`${Math.max(0, 2026 - inputs.buildingYear)} ${t.yearsOld}`} />
              {hasLot(inputs.propertyType) ? (
                <Field label={t.lotSize} value={inputs.lotSizeSqft} onChange={(v) => set("lotSizeSqft", v)} suffix={locale === "fr" ? "pi²" : "ft²"} step={100}
                  help={inputs.lotSizeSqft > 0 ? `${f.currency(inputs.purchasePrice / inputs.lotSizeSqft)}${t.perSqftLand}` : undefined} />
              ) : (
                <Field label={t.condoFeesMonthly} value={inputs.condoFees} onChange={(v) => set("condoFees", v)} prefix="$" step={25} help={t.condoFeesHelp} />
              )}
              <Readout label={isCondo ? t.units : t.totalUnits} value={f.number(units)} help={t.fromUnitMix} />
              <Readout
                label={isCondo ? t.unitArea : t.netRentableArea}
                value={results.netRSF > 0 ? f.sqft(results.netRSF) : "-"}
                help={t.fromUnitMixArea}
              />
              <Readout label={t.costPerSqft} value={results.costPerRSF > 0 ? f.currencyDetailed(results.costPerRSF) : "-"} />
            </div>

            <div className="plexc-tags">
              <span className={`plexc-tag ${inputs.isMontreal ? "plexc-tag-info" : ""}`}>
                {inputs.isMontreal ? t.montrealAgglo : t.offIsland}
              </span>
              <span className="plexc-tag">{area.region}</span>
              <span className={`plexc-tag ${area.anchored ? "plexc-tag-good" : ""}`}>
                {area.anchored ? t.publishedFigure : t.interpolated}
              </span>
              <span className="plexc-tag">{t.municipalTax} {f.percent2(area.taxRate)}</span>
              <span className="plexc-tag">
                {t.priceIndex} {area.priceIndex.toFixed(2)}× · {t.rents} {area.rentIndex.toFixed(2)}×
              </span>
            </div>

            <p className="plexc-note">
              {t.welcomeTaxOnPurchase} <strong>{f.currency(results.closingCosts.welcomeTax)}</strong>.{" "}
              {inputs.isMontreal ? t.welcomeTaxMontreal : t.welcomeTaxOffIsland}
            </p>
          </div>
        )}

        {tabKey === t.tabUnitMix && (
          <div className="plexc-card">
            <h3>{t.unitMixHeading}</h3>
            <p className="plexc-sub">{t.unitMixSub}</p>
            <div className="plexc-table-wrap">
              <table className="plexc-table">
                <thead>
                  <tr>
                    <th>{t.colType}</th><th>{t.colUnits}</th><th>{t.colInPlaceRent}</th>
                    <th>{t.colCmhcRent}</th>
                    <th>{t.colMarketRent}</th><th>{t.colSqftPerUnit}</th>
                    <th>{t.colMonthlyUpside}</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {inputs.unitMix.map((u) => {
                    const upside = u.count * Math.max(0, u.marketRent - u.currentRent);
                    const typeValue = (UNIT_TYPE_ORDER.includes(u.label as UnitTypeLabel)
                      ? u.label : "4½") as UnitTypeLabel;
                    const cmhc = results.cmhcUnits.find((c) => c.id === u.id);
                    return (
                      <tr key={u.id}>
                        <td>
                          <div style={{ maxWidth: 140 }}>
                            <Select<UnitTypeLabel>
                              value={typeValue}
                              options={unitTypeOptions}
                              onChange={(v) => setUnitType(u.id, v)}
                              ariaLabel={t.colType}
                              compact full
                            />
                          </div>
                        </td>
                        <td>
                          <div className="plexc-input" style={{ maxWidth: 88 }}>
                            <input type="number" min={0} value={u.count} aria-label={t.colUnits}
                              onChange={(e) => updateUnitCount(u.id, parseInt(e.target.value) || 0)} />
                          </div>
                        </td>
                        <td>
                          <div className="plexc-input" style={{ maxWidth: 130 }}>
                            <span className="plexc-affix">$</span>
                            <input type="number" min={0} step={25} value={u.currentRent} aria-label={t.colInPlaceRent}
                              onChange={(e) => updateUnit(u.id, { currentRent: parseFloat(e.target.value) || 0 })} />
                          </div>
                        </td>
                        <td>
                          {cmhc ? (
                            <div className="plexc-cmhc-cell">
                              <span className="plexc-cmhc-rent">{f.currency(cmhc.cmhcRent)}</span>
                              <span
                                className={
                                  "plexc-cmhc-delta " +
                                  (cmhc.deltaPct < -0.02 ? "is-under"
                                    : cmhc.deltaPct > 0.02 ? "is-over" : "is-at")
                                }
                              >
                                {cmhc.deltaPct >= 0 ? "+" : ""}
                                {(cmhc.deltaPct * 100).toFixed(0)}%
                              </span>
                              {cmhc.level !== "neighbourhood" && (
                                <span className="plexc-cmhc-geo">
                                  {cmhc.level === "zone" ? t.cmhcLevelZone : t.cmhcLevelCma}
                                </span>
                              )}
                              {cmhc.reliability === "d" && (
                                <span className="plexc-cmhc-warn" title={t.cmhcLowReliability}>!</span>
                              )}
                            </div>
                          ) : "-"}
                        </td>
                        <td>
                          <div className="plexc-input" style={{ maxWidth: 130 }}>
                            <span className="plexc-affix">$</span>
                            <input type="number" min={0} step={25} value={u.marketRent} aria-label={t.colMarketRent}
                              onChange={(e) => updateUnit(u.id, { marketRent: parseFloat(e.target.value) || 0 })} />
                          </div>
                        </td>
                        <td>
                          <div className="plexc-input" style={{ maxWidth: 110 }}>
                            <input type="number" min={0} step={25} value={u.sqft} aria-label={t.colSqftPerUnit}
                              onChange={(e) => updateUnit(u.id, { sqft: parseFloat(e.target.value) || 0 })} />
                          </div>
                        </td>
                        <td>{upside > 0 ? f.currency(upside) : "-"}</td>
                        <td>
                          <button className="plexc-btn" onClick={() => removeUnit(u.id)}>{t.remove}</button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="plexc-row-total">
                    <td>{t.total}</td>
                    <td>{units}</td>
                    <td>{f.currency(results.currentMonthlyRent)}</td>
                    <td>{f.currency(results.proformaMonthlyRent)}</td>
                    <td>{results.netRSF > 0 ? f.number(results.netRSF) : "-"}</td>
                    <td>{f.currency(results.rentUpsideMonthly)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 18 }}>
              <button className="plexc-btn" onClick={addUnit}>{t.addUnitType}</button>
            </div>

            <div className="plexc-cmhc-panel">
              <div className="plexc-cmhc-headline">
                <span className="plexc-cmhc-title">
                  {t.cmhcOptimizationLabel}
                  {/* The CMA geography already reads "Montréal RMR", so only the
                      zone level needs the qualifier spelled out. */}
                  <span className="plexc-cmhc-geo-tag">
                    {results.cmhcGeography}
                    {results.cmhcLevel === "zone" ? ` · ${t.cmhcLevelZone}` : ""}
                  </span>
                </span>
                <span
                  className={
                    "plexc-cmhc-total " +
                    (results.cmhcOptimizationAnnual > 0 ? "is-positive" : "is-neutral")
                  }
                >
                  {results.cmhcOptimizationAnnual > 0 ? "+" : ""}
                  {f.currency(results.cmhcOptimizationAnnual)}
                  {t.perYear}
                  {results.cmhcOptimizationPct > 0 && (
                    <span className="plexc-cmhc-total-pct">
                      {" "}(+{(results.cmhcOptimizationPct * 100).toFixed(1)}%)
                    </span>
                  )}
                </span>
              </div>
              <p className="plexc-cmhc-note">{t.cmhcOptimizationNote}</p>
              <p className="plexc-cmhc-note plexc-cmhc-caveat">{t.cmhcOccupiedCaveat}</p>
              <p className="plexc-cmhc-source">{t.cmhcSourceNote}</p>
            </div>

            <div className="plexc-grid4" style={{ marginTop: 26 }}>
              <Readout label={t.annualUpside} value={f.currency(results.rentUpsideMonthly * 12)} />
              <Readout label={t.grmInPlace} value={f.number(results.grm, 1)} />
              <Readout label={t.onePercentRule} value={f.percent2(results.rentToPrice1Pct)} />
              <Readout label={t.avgRentPerUnit} value={units > 0 ? f.currency(results.currentMonthlyRent / units) : "-"} />
            </div>
          </div>
        )}

        {tabKey === t.tabFinancing && (
          <>
            <div className="plexc-card">
              <h3>{t.financingHeading}</h3>
              <p className="plexc-sub">{t.financingSub}</p>
              <div className="plexc-segmented">
                {([
                  ["residential", t.modeResidential],
                  ["commercial", t.modeCommercial],
                  ["mli-select", t.modeMli],
                ] as [FinancingMode, string][]).map(([mode, label]) => {
                  const unavailable =
                    (mode === "residential" && isCommercialProperty) ||
                    (mode !== "residential" && !isCommercialProperty);
                  return (
                    <button key={mode} aria-pressed={inputs.financingMode === mode}
                      disabled={unavailable}
                      title={unavailable ? (mode === "residential" ? t.notAvailable5Plus : t.commercialStartsAt5) : undefined}
                      onClick={() => set("financingMode", mode)}>
                      {label}
                    </button>
                  );
                })}
              </div>

              {!isCommercialProperty && (
                <div style={{ marginTop: 18 }}>
                  <Toggle label={t.ownerOccupied} checked={inputs.ownerOccupied} onChange={(v) => {
                    setInputs((prev) => ({
                      ...prev,
                      ownerOccupied: v,
                      ownerOccupiedUnitId: v
                        ? (prev.ownerOccupiedUnitId ?? prev.unitMix.find((u) => u.count > 0)?.id ?? null)
                        : null,
                    }));
                  }} />
                  <p className="plexc-help">{t.ownerOccupiedHelp}</p>
                  {inputs.ownerOccupied && (
                    <div style={{ marginTop: 12, maxWidth: 360 }}>
                      <SelectField<string>
                        label={t.ownerOccupiedUnit}
                        value={inputs.ownerOccupiedUnitId ?? inputs.unitMix.find((u) => u.count > 0)?.id ?? ""}
                        onChange={(v) => set("ownerOccupiedUnitId", v)}
                        options={inputs.unitMix.filter((u) => u.count > 0).map((u, index) => ({
                          value: u.id,
                          label: `${locale === "fr" ? "Logement" : "Unit"} ${index + 1} · ${u.label}`,
                          hint: f.currency(u.currentRent),
                        }))}
                      />
                    </div>
                  )}
                </div>
              )}

              {results.belowMinimumDown && (
                <p className="plexc-note">
                  <span className="plexc-tag plexc-tag-bad">{t.belowMinimum}</span>{" "}
                  {t.needsAtLeast} <strong>{f.currency(results.minDownPayment)}</strong>{" "}
                  ({f.percent(results.minDownPayment / inputs.purchasePrice)}).{" "}
                  {units <= 2 ? t.minRule1to2 : t.minRule3to4}
                </p>
              )}

              {results.insuranceNote && inputs.equityPct < 0.2 && (
                <p className="plexc-note">
                  <span className="plexc-tag plexc-tag-warn">{t.noInsurance}</span> {results.insuranceNote}
                </p>
              )}

              <div className="plexc-grid4" style={{ marginTop: 22 }}>
                {inputs.financingMode === "residential" ? (
                  <PctField label={t.downPayment} value={inputs.equityPct} onChange={(v) => set("equityPct", v)} step={1}
                    help={inputs.equityPct >= 0.2 ? t.conventionalNoPremium
                      : inputs.ownerOccupied ? `${t.insurableTo} ${f.percent(maxInsuredLtv(units))}` : t.rentalNeeds20} />
                ) : (
                  <>
                    <PctField label={t.maxLtv} value={inputs.maxLtv} onChange={(v) => set("maxLtv", v)} step={1} />
                    <Field label={t.targetDscr} value={inputs.dscrTarget} onChange={(v) => set("dscrTarget", v)} step={0.05} help={t.targetDscrHelp} />
                  </>
                )}
                {inputs.financingMode === "mli-select" && (
                  <SelectField<string>
                    label={t.mliPoints}
                    value={String(inputs.mliPoints)}
                    onChange={(v) => set("mliPoints", parseInt(v) as MliPoints)}
                    options={[
                      { value: "50", label: "50", hint: "85% · 40" },
                      { value: "70", label: "70", hint: "90% · 45" },
                      { value: "100", label: "100", hint: "95% · 50" },
                    ]}
                    help={`${t.mliPointsHelp} ${f.percent(mliTerms.maxLtv)}, ${mliTerms.maxAmortization} ${locale === "fr" ? "ans" : "yr"}`}
                  />
                )}
                <PctField label={t.interestRate} value={inputs.annualInterestRate} onChange={(v) => set("annualInterestRate", v)} step={0.05} />
                <SelectField<string>
                  label={t.compounding}
                  value={inputs.mortgageCompounding}
                  onChange={(v) => set("mortgageCompounding", v as DealInputs["mortgageCompounding"])}
                  options={[
                    { value: "semi-annual", label: t.semiAnnual },
                    { value: "monthly", label: t.monthly },
                  ]}
                />
                <Field label={t.amortization} value={inputs.loanLifeYears} onChange={(v) => set("loanLifeYears", v)} suffix={locale === "fr" ? "ans" : "yrs"} step={1}
                  help={inputs.financingMode === "mli-select" ? `${t.amortCappedBy} ${mliTerms.maxAmortization}` : undefined} />
                <Field label={t.term} value={inputs.mortgageTerm} onChange={(v) => set("mortgageTerm", v)} suffix={locale === "fr" ? "ans" : "yrs"} step={1} help={t.termHelp} />
                <PctField label={t.lenderFee} value={inputs.pointsOnMortgagePct} onChange={(v) => set("pointsOnMortgagePct", v)} step={0.1} />
                <Field label={t.otherUpfront} value={inputs.otherInitialEquitySpent} onChange={(v) => set("otherInitialEquitySpent", v)} prefix="$" step={1000} />
              </div>
            </div>

            <div className="plexc-card">
              <h3>{t.loanOutcome}</h3>
              <div className="plexc-grid4">
                <Readout label={t.loanAmount} value={f.currency(results.loanAmount)} />
                <Readout label={t.sizedBy} value={
                  results.loanSizedBy === "dscr" ? t.byDscrTest
                    : results.loanSizedBy === "ltv" ? t.byLtvCap : t.byDownPayment} />
                {isCommercialTrack && <Readout label={t.maxByLtv} value={f.currency(results.maxLoanByLtv)} />}
                {isCommercialTrack && <Readout label={t.maxByDscr} value={f.currency(results.maxLoanByDscr)} />}
                <Readout label={t.downPayment} value={f.currency(results.equityAmount)} />
                <Readout label={t.effectiveLtv} value={f.percent2(results.ltv)} />
                <Readout label={t.monthlyPayment} value={f.currencyDetailed(results.paymentPerPeriod)} />
                <Readout label={t.annualDebtService} value={f.currency(results.annualDebtService)} />
              </div>
              {results.closingCosts.cmhcPremium > 0 && (
                <p className="plexc-note">
                  <strong>{f.currency(results.closingCosts.cmhcPremium)}</strong>{" "}
                  ({f.percent2(results.mliPremiumPct)}): {t.premiumNote}
                </p>
              )}
              <p className="plexc-note">
                {t.stressTest} {f.percent2(results.stressTestRate)}:{" "}
                <span className={`plexc-tag ${results.stressTestPasses ? "plexc-tag-good" : "plexc-tag-bad"}`}>
                  {results.stressTestPasses ? t.passes : t.fails}
                </span>{" "}
: {f.currencyDetailed(results.stressTestPayment)}{t.perMonth}.
              </p>
            </div>

            {economicValue && (
              <div className="plexc-card">
                <h3>{t.veHeading}</h3>
                <p className="plexc-sub">{t.veSub}</p>
                <div className="plexc-grid4">
                  <Readout label={t.veNormalizedNoi} value={f.currency(economicValue.normalizedNoi)} />
                  <Readout label={t.veQualificationRate} value={f.percent2(economicValue.qualificationRate)} />
                  <Readout label={t.veMaxDebtService} value={f.currency(economicValue.maxAnnualDebtService)} />
                  <Readout label={t.veMaxLoan} value={f.currency(economicValue.maxLoan)} />
                  <Readout label={t.veValue} value={f.currency(economicValue.economicValue)} />
                  <Readout label={t.veGap} value={f.accounting(economicValue.gapToPrice)} />
                  <Readout label={t.veCashRequired} value={f.currency(economicValue.requiredCash)} />
                  {economicValue.cashShortfall > 0 && (
                    <Readout label={t.veCashShortfall} value={f.currency(economicValue.cashShortfall)} />
                  )}
                </div>
                <p className="plexc-note">
                  <span className={`plexc-tag ${economicValue.gapToPrice > 0 ? "plexc-tag-warn" : "plexc-tag-good"}`}>
                    {economicValue.gapToPrice > 0 ? t.veBelowPrice : t.veAbovePrice}
                  </span>
                  {economicValue.cashShortfall > 0 && <> {t.veShortfallNote}</>}
                </p>
                <p className="plexc-note">{t.veVariesNote}</p>
              </div>
            )}

            <div className="plexc-card">
              <h3>{t.renewalSensitivity}</h3>
              <p className="plexc-sub">{t.renewalSub}</p>
              <div className="plexc-table-wrap">
                <table className="plexc-table">
                  <thead>
                    <tr>
                      <th>{t.colRate}</th><th>{t.colPaymentMo}</th><th>{t.annualDebtService}</th>
                      <th>{t.colCashFlow}</th><th>{t.dscr}</th><th>{t.colCoc}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.sensitivityRenewal.map((s) => (
                      <tr key={s.rate}>
                        <td>{f.percent2(s.rate)}</td>
                        <td>{f.currencyDetailed(s.payment)}</td>
                        <td>{f.currency(s.annualDebtService)}</td>
                        <td>{f.accounting(s.btCashFlow)}</td>
                        <td>{f.number(s.dscr, 2)}</td>
                        <td>{f.percent2(s.cashOnCash)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tabKey === t.tabRenovation && (
          <div className="plexc-card">
            <h3>{t.renoHeading}</h3>
            <p className="plexc-sub">{isFlip ? t.flipNote : t.renoSub}</p>
            <div className="plexc-grid4">
              <Field label={t.initialRehab} value={inputs.rehabBudget} onChange={(v) => set("rehabBudget", v)} prefix="$" step={1000} help={t.initialRehabHelp} />
              {isFlip ? (
                <>
                  <Field label={t.afterRepairValue} value={inputs.afterRepairValue} onChange={(v) => set("afterRepairValue", v)} prefix="$" step={10000} help={t.arvHelp} />
                  <Field label={t.holdingPeriod} value={inputs.holdingMonths} onChange={(v) => set("holdingMonths", v)} suffix={t.months} step={1} min={1} help={t.holdingPeriodHelp} />
                  <PctField label={t.sellingCostsPct} value={inputs.sellingCostsPct} onChange={(v) => set("sellingCostsPct", v)} step={0.5} />
                </>
              ) : (
                <>
                  <Field label={t.unitsTurnedPerYear} value={inputs.renoUnitsPerYear} onChange={(v) => set("renoUnitsPerYear", v)} step={1} min={0} />
                  <Field label={t.costPerUnit} value={inputs.renoCostPerUnit} onChange={(v) => set("renoCostPerUnit", v)} prefix="$" step={1000} />
                  <Field label={t.programStartsYear} value={inputs.renoStartYear} onChange={(v) => set("renoStartYear", v)} step={1} min={1} />
                </>
              )}
            </div>
            {!isFlip && (
              <>
                <div className="plexc-grid4" style={{ marginTop: 26 }}>
                  <Readout label={t.totalProgramCost} value={f.currency(rentalUnits * inputs.renoCostPerUnit)} />
                  <Readout label={t.yearsToFullTurnover} value={inputs.renoUnitsPerYear > 0 ? `${Math.ceil(rentalUnits / inputs.renoUnitsPerYear)}` : t.never} />
                  <Readout label={t.monthlyRentLift} value={f.currency(results.rentUpsideMonthly)} />
                  <Readout label={t.noiLift} value={f.currency(results.proformaNoi - results.noi)} />
                </div>
                <p className="plexc-note">{t.renoNote}</p>
              </>
            )}
            {isFlip && (
              <div className="plexc-grid4" style={{ marginTop: 26 }}>
                <Readout label={t.profit} value={f.accounting(results.flipProfit)} />
                <Readout label={t.returnOnCash} value={f.percent2(results.flipROI)} />
              </div>
            )}
          </div>
        )}

        {tabKey === t.tabExpenses && (
          <div className="plexc-card">
            <h3>{t.expensesHeading}</h3>
            <p className="plexc-sub">{isCondo ? t.expensesSubCondo : t.expensesSubPlex}</p>
            <div className="plexc-grid4">
              <Field label={t.municipalTaxes} value={inputs.propertyTaxes} onChange={(v) => set("propertyTaxes", v)} prefix="$" step={100} />
              <Field label={t.schoolTax} value={inputs.schoolTax} onChange={(v) => set("schoolTax", v)} prefix="$" step={50} />
              <Field label={t.insurance} value={inputs.insurance} onChange={(v) => set("insurance", v)} prefix="$" step={100} />
              {isCondo ? (
                <Field label={t.condoFeesMonthly} value={inputs.condoFees} onChange={(v) => set("condoFees", v)} prefix="$" step={25} />
              ) : (
                <>
                  <Field label={t.snowRemoval} value={inputs.snowRemoval} onChange={(v) => set("snowRemoval", v)} prefix="$" step={100} />
                  <Field label={t.landscaping} value={inputs.lawnLandscaping} onChange={(v) => set("lawnLandscaping", v)} prefix="$" step={50} />
                  <Field label={t.commonHydro} value={inputs.commonHydro} onChange={(v) => set("commonHydro", v)} prefix="$" step={100} />
                </>
              )}
              <Field label={t.otherExpenses} value={inputs.otherExpenses} onChange={(v) => set("otherExpenses", v)} prefix="$" step={100} />
              <Field label={t.capexPerUnit} value={inputs.capexPerUnit} onChange={(v) => set("capexPerUnit", v)} prefix="$" step={50} />
              <PctField label={t.repairsMaintenance} value={inputs.repairsMaintenancePct} onChange={(v) => set("repairsMaintenancePct", v)} step={0.5} help={t.ofGrossRent} />
              <PctField label={t.propertyManagement} value={inputs.propertyManagementPct} onChange={(v) => set("propertyManagementPct", v)} step={0.5} help={t.ofGrossRent} />
              <PctField label={t.vacancy} value={inputs.vacancyRate} onChange={(v) => set("vacancyRate", v)} step={0.5} />
            </div>
            <div style={{ marginTop: 18 }}>
              <Toggle label={t.ownerPaysSchoolTax} checked={inputs.paySchoolTax} onChange={(v) => set("paySchoolTax", v)} />
            </div>
            <div className="plexc-grid4" style={{ marginTop: 26 }}>
              <Readout label={t.totalOpEx} value={f.currency(results.totalOperatingExpenses)} />
              <Readout label={t.expenseRatio} value={f.percent2(results.operatingExpenseRatio)} />
              <Readout label={t.perUnitPerYear} value={units > 0 ? f.currency(results.totalOperatingExpenses / units) : "-"} />
              <Readout label={t.breakEvenRatio} value={f.percent2(results.breakEvenRatio)} />
            </div>
          </div>
        )}

        {tabKey === t.tabAssumptions && (
          <>
            <div className="plexc-card">
              <h3>{t.growthHeading}</h3>
              <div className="plexc-grid4">
                <PctField label={t.marketRentGrowth} value={inputs.annualRentGrowth} onChange={(v) => set("annualRentGrowth", v)} step={0.1} />
                <PctField label={t.talGuideline} value={inputs.talRentIncrease} onChange={(v) => set("talRentIncrease", v)} step={0.1} help={t.talGuidelineHelp} />
                <PctField label={t.appreciation} value={inputs.annualAppreciation} onChange={(v) => set("annualAppreciation", v)} step={0.1} />
                <PctField label={t.exitCapRate} value={inputs.exitCapRate} onChange={(v) => set("exitCapRate", v)} step={0.1} />
                <PctField label={t.expenseGrowth} value={inputs.annualExpenseGrowth} onChange={(v) => set("annualExpenseGrowth", v)} step={0.1} />
              </div>
              <div style={{ marginTop: 18 }}>
                <Toggle label={t.capAtTal} checked={inputs.usetalCap} onChange={(v) => set("usetalCap", v)} />
              </div>
            </div>

            <div className="plexc-card">
              <h3>{t.taxHeading}</h3>
              <p className="plexc-sub">{t.taxSub}</p>
              <div className="plexc-grid4">
                <PctField label={t.marginalRate} value={inputs.marginalTaxBracket} onChange={(v) => set("marginalTaxBracket", v)} step={0.5} help={t.marginalRateHelp} />
                <PctField label={t.ccaRate} value={inputs.ccaRate} onChange={(v) => set("ccaRate", v)} step={0.5} help={t.ccaRateHelp} />
                <PctField label={t.buildingPortion} value={inputs.buildingPct} onChange={(v) => set("buildingPct", v)} step={1} help={t.buildingPortionHelp} />
                <PctField label={t.capGainsInclusion} value={inputs.capitalGainsInclusion} onChange={(v) => set("capitalGainsInclusion", v)} step={0.5} />
              </div>
              <div style={{ marginTop: 18 }}>
                <Toggle label={t.halfYearRule} checked={inputs.ccaHalfYearRule} onChange={(v) => set("ccaHalfYearRule", v)} />
              </div>
              <div className="plexc-grid4" style={{ marginTop: 26 }}>
                <Readout label={t.ccaYear1} value={f.currency(results.ccaYear1)} />
                <Readout label={t.taxableIncomeY1} value={f.accounting(results.btIncomeYear1)} />
                <Readout label={t.incomeTaxY1} value={f.currency(results.incomeTaxYear1)} />
                <Readout label={t.afterTaxCashFlow} value={f.accounting(results.atCashFlowYear1)} />
              </div>
            </div>

            <div className="plexc-card">
              <h3>{t.closingHeading}</h3>
              <div className="plexc-grid4">
                <Field label={t.notaryFees} value={inputs.notaryFees} onChange={(v) => set("notaryFees", v)} prefix="$" step={100} />
                <Field label={t.inspection} value={inputs.inspectionFees} onChange={(v) => set("inspectionFees", v)} prefix="$" step={100} />
                <Field label={t.environmental} value={inputs.environmentalAssessment} onChange={(v) => set("environmentalAssessment", v)} prefix="$" step={500} help={t.environmentalHelp} />
                <Field label={t.titleInsurance} value={inputs.titleInsurance} onChange={(v) => set("titleInsurance", v)} prefix="$" step={50} />
                <PctField label={t.discountRate} value={inputs.discountRate} onChange={(v) => set("discountRate", v)} step={0.5} />
              </div>
              <div className="plexc-table-wrap" style={{ marginTop: 26 }}>
                <table className="plexc-table">
                  <tbody>
                    <tr><td>{t.welcomeTax}</td><td>{f.currency(results.closingCosts.welcomeTax)}</td></tr>
                    <tr><td>{t.notaryFees}</td><td>{f.currency(results.closingCosts.notaryFees)}</td></tr>
                    <tr><td>{t.inspection}</td><td>{f.currency(results.closingCosts.inspectionFees)}</td></tr>
                    {results.closingCosts.environmentalAssessment > 0 && (
                      <tr><td>{t.environmental}</td><td>{f.currency(results.closingCosts.environmentalAssessment)}</td></tr>
                    )}
                    <tr><td>{t.titleInsurance}</td><td>{f.currency(results.closingCosts.titleInsurance)}</td></tr>
                    {results.closingCosts.premiumTaxOnCmhc > 0 && (
                      <tr>
                        <td>{t.premiumTaxLine}</td>
                        <td>{f.currency(results.closingCosts.premiumTaxOnCmhc)}</td>
                      </tr>
                    )}
                    <tr className="plexc-row-sub"><td>{t.totalClosingCosts}</td><td>{f.currency(results.closingCosts.totalClosingCosts)}</td></tr>
                    <tr><td>{t.downPayment}</td><td>{f.currency(results.equityAmount)}</td></tr>
                    <tr><td>{t.initialRehabLine}</td><td>{f.currency(inputs.rehabBudget)}</td></tr>
                    <tr className="plexc-row-total"><td>{t.totalCashToClose}</td><td>{f.currency(results.totalEquityInvested)}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {tabKey === t.tabRefinancing && (
          <div className="plexc-card">
            <h3>{t.refiHeading}</h3>
            <p className="plexc-sub">{t.refiSub}</p>
            <div className="plexc-grid4">
              <Field label={t.valueAfterReposition} value={inputs.afterRepairValue} onChange={(v) => set("afterRepairValue", v)} prefix="$" step={10000} help={t.valueAfterRepositionHelp} />
              <PctField label={t.refiLtv} value={inputs.brrrrRefiLtv} onChange={(v) => set("brrrrRefiLtv", v)} step={1} />
              <PctField label={t.renewalRate} value={inputs.renewalRate} onChange={(v) => set("renewalRate", v)} step={0.05} />
            </div>
            <div className="plexc-grid4" style={{ marginTop: 26 }}>
              <Readout label={t.appraisedValue} value={f.currency(results.brrrrAnalysis.arvAfterRehab)} />
              <Readout label={t.newLoan} value={f.currency(results.brrrrAnalysis.maxRefiLoan)} />
              <Readout label={t.cashOut} value={f.currency(results.brrrrAnalysis.cashOutAmount)} />
              <Readout label={t.leftInDeal} value={f.currency(results.brrrrAnalysis.moneyLeftInDeal)} />
              <Readout label={t.newPayment} value={f.currencyDetailed(results.brrrrAnalysis.newPayment)} />
              <Readout label={t.cashFlowAfterRefi} value={f.accounting(results.brrrrAnalysis.newBtCashFlow)} />
              <Readout label={t.cocAfterRefi} value={results.brrrrAnalysis.infiniteReturn ? "∞" : f.percent2(results.brrrrAnalysis.cashOnCashAfterRefi)} />
            </div>
            {results.brrrrAnalysis.infiniteReturn && (
              <p className="plexc-note">
                <span className="plexc-tag plexc-tag-good">{t.allCapitalReturned}</span>{" "}
                {t.allCapitalReturnedNote}
              </p>
            )}
          </div>
        )}

        {tabKey === t.tabExit && (
          <div className="plexc-card">
            <h3>{t.exitHeading}</h3>
            <p className="plexc-sub">{t.exitSub}</p>
            <div className="plexc-grid4">
              <Field label={t.holdPeriod} value={inputs.exitYear} onChange={(v) => set("exitYear", v)} suffix={locale === "fr" ? "ans" : "yrs"} step={1} min={1} max={30} />
              <PctField label={t.sellingCostsPct} value={inputs.sellingCostsPct} onChange={(v) => set("sellingCostsPct", v)} step={0.5} />
              <PctField label={t.exitCapRate} value={inputs.exitCapRate} onChange={(v) => set("exitCapRate", v)} step={0.1} />
            </div>
            <div className="plexc-table-wrap" style={{ marginTop: 26 }}>
              <table className="plexc-table">
                <tbody>
                  <tr><td>{t.salePriceYear} {inputs.exitYear})</td><td>{f.currency(results.exitAnalysis.salePrice)}</td></tr>
                  <tr><td>{t.sellingCosts}</td><td>{f.accounting(-results.exitAnalysis.sellingCosts)}</td></tr>
                  <tr><td>{t.loanBalance}</td><td>{f.accounting(-results.exitAnalysis.loanBalanceAtExit)}</td></tr>
                  <tr className="plexc-row-sub"><td>{t.netSaleProceeds}</td><td>{f.currency(results.exitAnalysis.netSaleProceeds)}</td></tr>
                  <tr className="plexc-row-head"><td>{t.taxOnSale}</td><td></td></tr>
                  <tr><td>{t.totalCcaClaimed}</td><td>{f.currency(results.exitAnalysis.totalCCAclaimed)}</td></tr>
                  <tr><td>{t.ccaRecapture}</td><td>{f.currency(results.exitAnalysis.ccaRecapture)}</td></tr>
                  <tr><td>{t.taxOnRecapture}</td><td>{f.accounting(-results.exitAnalysis.ccaRecaptureTax)}</td></tr>
                  <tr><td>{t.capitalGain}</td><td>{f.currency(results.exitAnalysis.capitalGain)}</td></tr>
                  <tr><td>{t.taxablePortion}</td><td>{f.currency(results.exitAnalysis.taxableCapitalGain)}</td></tr>
                  <tr><td>{t.taxOnCapitalGain}</td><td>{f.accounting(-results.exitAnalysis.capitalGainsTax)}</td></tr>
                  <tr className="plexc-row-sub"><td>{t.totalTaxOnSale}</td><td>{f.accounting(-results.exitAnalysis.totalTaxOnSale)}</td></tr>
                  <tr className="plexc-row-total"><td>{t.netProfitAfterTax}</td><td>{f.accounting(results.exitAnalysis.netProfitAfterTax)}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="plexc-grid4" style={{ marginTop: 26 }}>
              <Readout label={t.returnOnInvestment} value={f.percent2(results.exitAnalysis.totalReturnOnInvestment)} />
              <Readout label={t.annualized} value={f.percent2(results.exitAnalysis.annualizedReturn)} />
              <Readout label={t.equityMultiple} value={f.multiple(results.equityMultiple)} />
              <Readout label={`${t.npvAt} ${f.percent(inputs.discountRate)}`} value={f.accounting(results.npv)} />
            </div>
          </div>
        )}
      </div>

      {/* ── APOD ── */}
      {!isFlip && (
        <section className="plexc-block">
          <h3>{t.apodHeading}</h3>
          <p className="plexc-sub">{t.apodIntro}</p>
          {overrideCount > 0 && (
            <div className="plexc-banner">
              <span className="plexc-tag plexc-tag-warn">{t.typedIn}</span>
              <span>
                {overrideCount === 1 ? t.typedInOne : `${overrideCount} ${t.typedInMany}`} {t.highlightedBelow}
              </span>
              <button className="plexc-btn" onClick={() => set("proformaOverrides", {})}>
                {overrideCount === 1 ? t.recalculateIt : t.recalculateThem}
              </button>
            </div>
          )}
          <div className="plexc-table-wrap">
            <table className="plexc-table">
              <thead>
                <tr>
                  <th>{t.colLine}</th>
                  <th>{t.colInPlace}<span className="plexc-th-sub">{t.colInPlaceSub}</span></th>
                  <th>{t.colPctGsi}</th>
                  <th>{t.colProforma}<span className="plexc-th-sub">{t.colProformaSub}</span></th>
                  <th>{t.colDelta}<span className="plexc-th-sub">{t.colDeltaSub}</span></th>
                </tr>
              </thead>
              <tbody>
                {results.apod.map((line, i) => {
                  const label = apodLabel(line.id, line.label);
                  const cls = line.kind === "header" ? "plexc-row-head"
                    : line.kind === "subtotal" ? "plexc-row-sub"
                      : line.kind === "total" ? "plexc-row-total" : "";
                  if (line.kind === "header") {
                    return <tr key={i} className={cls}><td>{label}</td><td /><td /><td /><td /></tr>;
                  }
                  if (!line.id) {
                    return (
                      <tr key={i} className={cls}>
                        <td>{label}</td>
                        <td>{f.accounting(line.current)}</td>
                        <td>{line.pctOfGsi !== undefined ? f.percent(line.pctOfGsi) : ""}</td>
                        <td>{f.accounting(line.proforma)}</td>
                        <td>{Math.abs(line.proforma - line.current) < 1 ? "" : f.accounting(line.proforma - line.current)}</td>
                      </tr>
                    );
                  }
                  const id = line.id;
                  const signed = line.current < 0 || line.proforma < 0;
                  return (
                    <tr key={i} className={cls}>
                      <td>{label}</td>
                      <td>
                        {id === "gsi" ? (
                          <span className="plexc-derived">{f.accounting(line.current)}</span>
                        ) : (
                          <MoneyCell ariaLabel={`${label}, ${t.colInPlace}`} value={line.current}
                            format={(v) => f.number(v)} onChange={(v) => setApodCurrent(id, v)} />
                        )}
                      </td>
                      <td>{line.pctOfGsi !== undefined ? f.percent(line.pctOfGsi) : ""}</td>
                      <td>
                        <MoneyCell ariaLabel={`${label}, ${t.colProforma}`} value={line.proforma}
                          override={line.overridden} format={(v) => f.number(v)}
                          onChange={(v) => setProformaOverride(id, v)} />
                        {line.overridden && (
                          <button className="plexc-reset" title={t.resetToCalculated}
                            aria-label={t.resetToCalculated}
                            onClick={() => setProformaOverride(id, undefined)}>×</button>
                        )}
                      </td>
                      <td>
                        {Math.abs(line.proforma - line.current) < 1 ? "" : f.accounting(
                          signed ? -(Math.abs(line.proforma) - Math.abs(line.current))
                            : line.proforma - line.current)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Projection ── */}
      {!isFlip && (
        <section className="plexc-block">
          <h3>{projection.length}-{locale === "fr" ? "ans" : "year"} {t.projectionHeading}</h3>
          <p className="plexc-sub">{t.chartHint}</p>
          <ProjectionChart
            rows={projection.map((p) => ({
              year: p.year,
              noi: p.noi,
              // Renovation capital is netted out so a turnover year shows the
              // cash actually leaving your pocket, matching the table.
              cashFlow: p.btCashFlow - p.renoSpend,
              equity: p.equity,
            }))}
            formatCurrency={f.currency}
            labelNoi={t.colNoi}
            labelCashFlow={t.colCashFlow}
            labelEquity={t.colEquity}
            ariaLabel={t.chartAria}
          />
          <div className="plexc-table-wrap">
            <table className="plexc-table">
              <thead>
                <tr>
                  <th>{t.colYear}</th><th>{t.colGrossRent}</th><th>{t.colNoi}</th>
                  <th>{t.colDebtService}</th><th>{t.colCashFlow}</th><th>{t.colRenoSpend}</th>
                  <th>{t.colAtMarket}</th><th>{t.colCapOnCost}</th><th>{t.colValue}</th>
                  <th>{t.colLoanBalance}</th><th>{t.colEquity}</th>
                </tr>
              </thead>
              <tbody>
                {projection.map((p) => (
                  <tr key={p.year}>
                    <td>{t.year} {p.year}</td>
                    <td>{f.currency(p.annualRent)}</td>
                    <td>{f.currency(p.noi)}</td>
                    <td>{f.accounting(-p.annualDebtService)}</td>
                    <td>{f.accounting(p.btCashFlow)}</td>
                    <td>{p.renoSpend > 0 ? f.accounting(-p.renoSpend) : "-"}</td>
                    <td>{p.unitsRenovated} / {rentalUnits}</td>
                    <td>{f.percent2(inputs.purchasePrice > 0 ? p.noi / inputs.purchasePrice : 0)}</td>
                    <td>{f.currency(p.propertyValue)}</td>
                    <td>{f.currency(p.loanBalance)}</td>
                    <td>{f.currency(p.equity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Verdict ── */}
      <section className="plexc-block">
        <h3>{t.verdictHeading}</h3>
        <p className="plexc-sub">{t.verdictSub}</p>
        <div className="plexc-chips">
          {analysis.factors.map((factor) => (
            <span key={factor.label}
              className={`plexc-tag ${factor.status === "good" ? "plexc-tag-good" : factor.status === "warning" ? "plexc-tag-warn" : "plexc-tag-bad"}`}>
              {verdictLabel(factor.label)}: {verdictValue(factor.value)}
            </span>
          ))}
        </div>
      </section>

      {/* ── Sources: the citable core, rendered as real text ── */}
      <section className="plexc-block" id="sources">
        <h3>{t.sourcesHeading}</h3>
        <p className="plexc-sub">{t.sourcesIntro}</p>
        <div className="plexc-table-wrap">
          <table className="plexc-table plexc-table-left">
            <thead>
              <tr><th>{t.colFigure}</th><th>{t.colValueHeader}</th><th>{t.colSource}</th></tr>
            </thead>
            <tbody>
              {REFERENCE_FIGURES.map((fig) => (
                <tr key={fig.id}>
                  <td>{fig.label[locale]}</td>
                  <td>{fig.value[locale]}</td>
                  <td>
                    <a href={fig.sourceUrl} target="_blank" rel="noopener">{fig.source}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="plexc-note">{t.disclaimer}</p>
      </section>
    </div>
  );
}

export default DealAnalyzer;
