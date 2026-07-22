export type PropertyType = 'duplex' | 'triplex' | 'quadruplex' | 'fiveplex-plus' | 'condo' | 'house-flip';

export interface PropertyUnitRule {
  min: number;
  max: number | null;
}

/** Unit-count constraints implied by the selected property type. */
export const PROPERTY_UNIT_RULES: Record<PropertyType, PropertyUnitRule> = {
  condo: { min: 1, max: 1 },
  duplex: { min: 2, max: 2 },
  triplex: { min: 3, max: 3 },
  quadruplex: { min: 4, max: 4 },
  'fiveplex-plus': { min: 5, max: null },
  'house-flip': { min: 1, max: 1 },
};

/**
 * Financing track. Which one applies is driven by unit count in Quebec:
 *  - residential:  1–4 units, residential underwriting, CMHC insurable under 20% down
 *  - commercial:   5+ units, loan sized by the lesser of LTV cap and DSCR constraint
 *  - mli-select:   5+ units, CMHC MLI Select, points buy higher LTV / longer amortization
 */
export type FinancingMode = 'residential' | 'commercial' | 'mli-select';

/** MLI Select tiers. Points are earned on affordability, energy efficiency, accessibility. */
export type MliPoints = 50 | 70 | 100;

/**
 * One row of the unit mix. Quebec labels rooms, not bedrooms: a 4½ is a
 * 2-bedroom. `currentRent` is the in-place (lease) rent, `marketRent` is what
 * the unit achieves on turnover. The gap between them is the whole thesis on
 * most Montreal plex and multifamily deals, because the TAL caps what you can
 * raise on a sitting tenant.
 */
export interface UnitRow {
  id: string;
  label: string;
  count: number;
  currentRent: number;
  marketRent: number;
  sqft: number;
}

/**
 * Keeps the editable unit mix compatible with its property type. For the
 * fixed-size plex types, a count edit is balanced against the other rows so
 * the user can change the mix without changing the number of doors. Five-plus
 * remains flexible, but can never fall below five units.
 */
export function reconcileUnitMixCount(
  mix: UnitRow[], type: PropertyType, preferredId?: string,
): UnitRow[] {
  if (mix.length === 0) return mix;

  const rule = PROPERTY_UNIT_RULES[type];
  const sanitized = mix.map((row) => ({
    ...row,
    count: Math.max(0, Math.floor(Number.isFinite(row.count) ? row.count : 0)),
  }));
  const total = sanitized.reduce((sum, row) => sum + row.count, 0);
  const target = total < rule.min
    ? rule.min
    : rule.max !== null && total > rule.max
      ? rule.max
      : total;

  if (target === total) return sanitized;

  const next = sanitized.map((row) => ({ ...row }));
  const preferredIndex = next.findIndex((row) => row.id === preferredId);

  if (target > total) {
    const deficit = target - total;
    // On a fixed-size plex, preserve the edited row and move the difference to
    // another unit type. On five-plus, clamp the edited row at the five-unit floor.
    const recipient = rule.max === null && preferredIndex >= 0
      ? preferredIndex
      : next.findIndex((_, index) => index !== preferredIndex);
    next[recipient >= 0 ? recipient : Math.max(0, preferredIndex)].count += deficit;
    return next;
  }

  let excess = total - target;
  const reductionOrder = next
    .map((row, index) => ({ index, count: row.count }))
    .sort((a, b) => {
      if (a.index === preferredIndex) return 1;
      if (b.index === preferredIndex) return -1;
      return b.count - a.count;
    });

  for (const { index } of reductionOrder) {
    if (excess === 0) break;
    const reduction = Math.min(next[index].count, excess);
    next[index].count -= reduction;
    excess -= reduction;
  }

  return next;
}

/**
 * Quebec names apartments by total room count, not bedrooms: the digit counts
 * living room, kitchen and bedrooms, and the ½ is the bathroom. So a 4½ is a
 * two-bedroom. Anyone reading a Centris listing works in these terms.
 */
export type UnitTypeLabel = 'Studio' | '2½' | '3½' | '4½' | '5½' | '6½';

export interface UnitTypeSpec {
  label: UnitTypeLabel;
  bedrooms: number;
  sqft: number;
  /** Typical rent on a lease already in place, held down by the TAL. */
  currentRent: number;
  /** Typical asking rent on turnover. */
  marketRent: number;
  note: string;
}

/**
 * Typical Montreal figures per unit size.
 *
 * The 3½ and 4½ rows are the anchored ones: CMHC's Rental Market Survey puts
 * the average occupied two-bedroom in Greater Montreal at $1,346, and asking
 * rents for a one-bedroom run near $1,588. The rest are scaled off those two
 * and should be treated as starting points, not survey data.
 */
export const UNIT_TYPES: Record<UnitTypeLabel, UnitTypeSpec> = {
  'Studio': { label: 'Studio', bedrooms: 0, sqft: 400, currentRent: 850, marketRent: 1150,
    note: 'One room plus bathroom' },
  '2½':     { label: '2½', bedrooms: 0, sqft: 500, currentRent: 950, marketRent: 1290,
    note: 'Separate kitchen, no bedroom' },
  '3½':     { label: '3½', bedrooms: 1, sqft: 600, currentRent: 1100, marketRent: 1588,
    note: 'One bedroom' },
  '4½':     { label: '4½', bedrooms: 2, sqft: 850, currentRent: 1346, marketRent: 1826,
    note: 'Two bedrooms' },
  '5½':     { label: '5½', bedrooms: 3, sqft: 1050, currentRent: 1600, marketRent: 2150,
    note: 'Three bedrooms' },
  '6½':     { label: '6½', bedrooms: 4, sqft: 1250, currentRent: 1850, marketRent: 2450,
    note: 'Four bedrooms' },
};

export const UNIT_TYPE_ORDER: UnitTypeLabel[] = ['Studio', '2½', '3½', '4½', '5½', '6½'];

/** Rebuilds a unit row from its type, keeping only the count the user set. */
export function applyUnitType(row: UnitRow, label: UnitTypeLabel): UnitRow {
  const spec = UNIT_TYPES[label];
  return {
    ...row,
    label: spec.label,
    sqft: spec.sqft,
    currentRent: spec.currentRent,
    marketRent: spec.marketRent,
  };
}

export interface DealInputs {
  /** Key into AREAS: drives price, rents, municipal tax and welcome-tax schedule. */
  areaKey: string;
  propertyType: PropertyType;
  /** Listing price. Informational: all math runs off `purchasePrice` (your offer). */
  askingPrice: number;
  purchasePrice: number;
  buildingYear: number;
  lotSizeSqft: number;
  unitMix: UnitRow[];
  rehabBudget: number;
  /** Retained as a fallback when `unitMix` is empty. Otherwise derived from the mix. */
  numberOfUnits: number;
  avgMonthlyRentPerUnit: number;
  vacancyRate: number;
  annualRentGrowth: number;
  propertyTaxes: number;
  insurance: number;
  snowRemoval: number;
  lawnLandscaping: number;
  commonHydro: number;
  repairsMaintenancePct: number;
  propertyManagementPct: number;
  otherExpenses: number;
  schoolTax: number;
  paySchoolTax: boolean;
  condoFees: number;
  // House flip fields
  afterRepairValue: number;
  holdingMonths: number;
  sellingCostsPct: number;
  // Financing
  /**
   * Whether the buyer will occupy a unit. This is the gate on CMHC homeowner
   * insurance: a pure rental purchase is conventional and needs 20% down.
   */
  ownerOccupied: boolean;
  financingMode: FinancingMode;
  /** Commercial/MLI: hard LTV ceiling before the DSCR test is applied. */
  maxLtv: number;
  /** Commercial/MLI: minimum DSCR the lender will underwrite to (1.10–1.30 typical). */
  dscrTarget: number;
  mliPoints: MliPoints;
  equityPct: number;
  pointsOnMortgagePct: number;
  otherInitialEquitySpent: number;
  annualInterestRate: number;
  loanLifeYears: number;
  paymentsPerYear: number;
  // Renovation / turnover program
  /** Units turned over and brought to market rent each year. */
  renoUnitsPerYear: number;
  renoCostPerUnit: number;
  /** First year of the turnover program (1 = starts immediately). */
  renoStartYear: number;
  /**
   * Manual proforma figures entered directly on the operating statement,
   * keyed by line. A line absent from this map follows its derived value -
   * that is how "taxes reassess after sale" or "I'll self-manage" get modelled
   * without disturbing the in-place numbers.
   */
  proformaOverrides: Partial<Record<ApodLineId, number>>;
  // Quebec tax
  marginalTaxBracket: number; // combined QC+Federal marginal rate
  // CCA (Capital Cost Allowance)
  ccaRate: number; // 4% for Class 1 residential
  ccaHalfYearRule: boolean; // first year = half rate
  buildingPct: number; // % of purchase price allocated to building (vs land)
  // Closing costs
  notaryFees: number;
  inspectionFees: number;
  environmentalAssessment: number;
  titleInsurance: number;
  // Appreciation
  annualAppreciation: number;
  annualExpenseGrowth: number;
  // TAL rent control
  talRentIncrease: number; // TAL-recommended max % increase
  usetalCap: boolean;
  // Municipality
  isMontreal: boolean; // Montreal has extra welcome tax bracket
  // Discount rate for NPV
  discountRate: number;
  // CapEx reserve
  capexPerUnit: number; // annual CapEx reserve per unit
  // Mortgage term (Canadian mortgages renew)
  mortgageTerm: number; // typically 5 years in Canada
  renewalRate: number; // expected rate at renewal
  // BRRRR
  brrrrRefiLtv: number; // refinance LTV after rehab (typically 75-80%)
  // Exit / Sale
  exitYear: number; // planned sale year for exit analysis
  capitalGainsInclusion: number; // 50% in Canada (66.7% proposed for >$250k)
}

export interface ClosingCostBreakdown {
  welcomeTax: number;
  cmhcPremium: number;
  cmhcOnLoan: boolean; // true if CMHC is added to mortgage
  notaryFees: number;
  inspectionFees: number;
  environmentalAssessment: number;
  titleInsurance: number;
  /** Quebec tax on the insurance premium. Not GST/QST: see INSURANCE_PREMIUM_TAX_RATE. */
  premiumTaxOnCmhc: number;
  totalClosingCosts: number;
  totalCashAtClosing: number; // down payment + closing costs (cash portion)
}

export interface DealResults {
  monthlyRentAll: number;
  annualRent: number;
  effectiveGrossIncome: number;
  repairsMaintenanceAnnual: number;
  propertyManagementAnnual: number;
  schoolTaxAnnual: number;
  condoFeesAnnual: number;
  totalOperatingExpenses: number;
  noi: number;
  loanAmountPct: number;
  equityAmount: number;
  loanAmount: number;
  effectiveLoanAmount: number; // loan + CMHC if applicable
  pointsOnMortgageDollar: number;
  initialEquityForPurchase: number;
  totalEquityInvested: number;
  totalNumberOfPayments: number;
  periodicInterestRate: number;
  paymentPerPeriod: number;
  sumOfPayments: number;
  interestCost: number;
  // CCA replaces straight-line depreciation
  ccaYear1: number;
  ccaUCC: number; // undepreciated capital cost (building portion)
  amortizationOfPointsYear1: number;
  interestYear1: number;
  btIncomeYear1: number;
  incomeTaxYear1: number;
  atIncomeYear1: number;
  annualDebtService: number;
  btCashFlowYear1: number;
  btCashFlowMonthly: number;
  atCashFlowYear1: number;
  atCashFlowMonthly: number;
  principalPaydownYear1: number;
  btCashPlusPrincipalYear1: number;
  btRoiYear1: number;
  atCashPlusPrincipalYear1: number;
  atRoiYear1: number;
  rentToPurchaseRatio: number;
  capRateYear1: number;
  cashOnCashBtYear1: number;
  atCashOnCashYear1: number;
  btCashFlowPerUnitYear1: number;
  atCashFlowPerUnitYear1: number;
  dscrYear1: number;
  // New metrics
  grm: number; // Gross Rent Multiplier
  operatingExpenseRatio: number;
  ltv: number; // Loan-to-Value
  breakEvenRatio: number;
  pricePerDoor: number;
  rentToPrice1Pct: number; // 1% rule check
  irr: number; // 10-year IRR
  npv: number; // NPV at discount rate
  // ─── Unit mix & proforma (in-place vs. market rents) ───
  totalUnits: number;
  netRSF: number;
  costPerRSF: number;
  pricePerUnit: number;
  currentMonthlyRent: number;
  proformaMonthlyRent: number;
  rentUpsideMonthly: number;
  purchaseCapRate: number;
  proformaCapRate: number;
  proformaNoi: number;
  proformaCashFlow: number;
  /** Cash-on-cash averaged across the hold, not just year 1. */
  avgCashOnCash: number;
  /** Total cash returned (flows + net sale proceeds) per dollar of equity. */
  equityMultiple: number;
  // ─── Financing outcome ───
  loanSizedBy: 'ltv' | 'dscr' | 'down-payment';
  maxLoanByLtv: number;
  maxLoanByDscr: number;
  mliPremiumPct: number;
  /** Why mortgage insurance is unavailable, when it is. */
  insuranceNote?: string;
  /** Smallest legal down payment for this property under the chosen structure. */
  minDownPayment: number;
  /** True when the entered down payment is below the legal minimum. */
  belowMinimumDown: boolean;
  // ─── APOD ───
  apod: ApodLine[];
  // Closing costs
  closingCosts: ClosingCostBreakdown;
  // CapEx
  capexReserveAnnual: number;
  // Stress test
  stressTestRate: number;
  stressTestPayment: number;
  stressTestPasses: boolean;
  // Exit analysis
  exitAnalysis: ExitAnalysis;
  // BRRRR
  brrrrAnalysis: BRRRRAnalysis;
  // Sensitivity
  sensitivityRenewal: SensitivityResult[];
  // House flip
  flipProfit: number;
  flipROI: number;
}

export interface ExitAnalysis {
  salePrice: number;
  sellingCosts: number;
  loanBalanceAtExit: number;
  netSaleProceeds: number;
  totalCCAclaimed: number;
  ccaRecapture: number;
  ccaRecaptureTax: number;
  capitalGain: number;
  taxableCapitalGain: number;
  capitalGainsTax: number;
  totalTaxOnSale: number;
  netProfitAfterTax: number;
  totalReturnOnInvestment: number;
  annualizedReturn: number;
}

export interface BRRRRAnalysis {
  arvAfterRehab: number;
  maxRefiLoan: number;
  cashOutAmount: number;
  moneyLeftInDeal: number;
  newPayment: number;
  newDebtService: number;
  newBtCashFlow: number;
  infiniteReturn: boolean; // true if all cash pulled out
  cashOnCashAfterRefi: number;
}

export interface SensitivityResult {
  rate: number;
  payment: number;
  annualDebtService: number;
  btCashFlow: number;
  dscr: number;
  cashOnCash: number;
}

export interface YearProjection {
  year: number;
  annualRent: number;
  egi: number;
  operatingExpenses: number;
  noi: number;
  annualDebtService: number;
  btCashFlow: number;
  atCashFlow: number;
  capRate: number;
  cocBt: number;
  cumulativeCashFlow: number;
  propertyValue: number;
  equity: number;
  loanBalance: number;
  ccaDeduction: number;
  totalReturn: number; // cash flow + principal paydown + appreciation
  /** Units at market rent by this year (cumulative turnover). */
  unitsRenovated: number;
  /** Renovation capital spent this year: excluded from btCashFlow, netted in cumulative. */
  renoSpend: number;
}

export interface AmortizationRow {
  period: number;
  openingBalance: number;
  payment: number;
  interest: number;
  principal: number;
  closingBalance: number;
}

/** Stable identifiers for the editable lines of the operating statement. */
export type ApodLineId =
  | 'gsi' | 'vacancy'
  | 'taxes' | 'schoolTax' | 'insurance' | 'snow' | 'landscaping' | 'hydro'
  | 'repairs' | 'management' | 'capex' | 'condoFees' | 'other';

/** One line of the Annual Property Operating Data statement. */
export interface ApodLine {
  label: string;
  current: number;
  proforma: number;
  /** Rendering hint: section headers and subtotals are emphasized. */
  kind: 'header' | 'line' | 'subtotal' | 'total';
  /** Percent of gross scheduled income, for expense lines. */
  pctOfGsi?: number;
  /** Present on lines the user can edit directly in the statement. */
  id?: ApodLineId;
  /** True when the proforma column currently carries a manual override. */
  overridden?: boolean;
}

// ─── Unit Mix ──────────────────────────────────────────────────────
export interface UnitMixSummary {
  totalUnits: number;
  netRSF: number;
  currentMonthlyRent: number;
  proformaMonthlyRent: number;
  avgCurrentRent: number;
  avgMarketRent: number;
}

/**
 * Collapses the unit mix into the totals the rest of the model runs on.
 * Falls back to the flat unit-count × average-rent inputs when no mix is
 * entered, so single-family and flip deals still work.
 */
export function summarizeUnitMix(inputs: DealInputs): UnitMixSummary {
  const mix = inputs.unitMix ?? [];
  const totalUnits = mix.reduce((s, u) => s + u.count, 0);

  if (totalUnits === 0) {
    const units = inputs.numberOfUnits;
    const rent = units * inputs.avgMonthlyRentPerUnit;
    return {
      totalUnits: units,
      netRSF: 0,
      currentMonthlyRent: rent,
      proformaMonthlyRent: rent,
      avgCurrentRent: inputs.avgMonthlyRentPerUnit,
      avgMarketRent: inputs.avgMonthlyRentPerUnit,
    };
  }

  const netRSF = mix.reduce((s, u) => s + u.count * u.sqft, 0);
  const currentMonthlyRent = mix.reduce((s, u) => s + u.count * u.currentRent, 0);
  // A market rent left at zero means "no upside identified": hold the in-place rent.
  const proformaMonthlyRent = mix.reduce(
    (s, u) => s + u.count * Math.max(u.marketRent, u.currentRent), 0,
  );

  return {
    totalUnits,
    netRSF,
    currentMonthlyRent,
    proformaMonthlyRent,
    avgCurrentRent: currentMonthlyRent / totalUnits,
    avgMarketRent: proformaMonthlyRent / totalUnits,
  };
}

// ─── CMHC MLI Select ───────────────────────────────────────────────
/**
 * MLI Select trades points (affordability, energy efficiency, accessibility)
 * for leverage and amortization. Figures below are the published tier
 * structure; premiums are ESTIMATES: CMHC prices each file individually and
 * the actual premium comes back on the certificate of insurance.
 */
export function mliSelectTerms(points: MliPoints): {
  maxLtv: number;
  maxAmortization: number;
  premiumDiscount: number;
} {
  if (points >= 100) return { maxLtv: 0.95, maxAmortization: 50, premiumDiscount: 0.30 };
  if (points >= 70) return { maxLtv: 0.90, maxAmortization: 45, premiumDiscount: 0.20 };
  return { maxLtv: 0.85, maxAmortization: 40, premiumDiscount: 0.10 };
}

/**
 * Base CMHC multi-unit premium by LTV, before any MLI Select discount.
 *
 * KNOWN TO UNDERSTATE. CMHC repriced multi-unit insurance on risk on 14 July
 * 2025 and effective premiums rose in the large majority of files: reported
 * cases moved from roughly 2.8% to near 5.4% after discounts. This table
 * predates that schedule, so treat every premium it produces as a floor.
 */
export function multiUnitPremiumPct(ltv: number): number {
  if (ltv <= 0.65) return 0.0175;
  if (ltv <= 0.70) return 0.0200;
  if (ltv <= 0.75) return 0.0250;
  if (ltv <= 0.80) return 0.0300;
  if (ltv <= 0.85) return 0.0375;
  if (ltv <= 0.90) return 0.0425;
  return 0.0450;
}

/**
 * Extended amortization is not free: CMHC adds 0.25% of premium for each
 * 5-year increment beyond 25 years, so a 50-year amortization carries a
 * 1.25% surcharge. Long amortization buys cash flow, not cheaper insurance.
 */
export function amortizationSurchargePct(amortYears: number): number {
  if (amortYears <= 25) return 0;
  return Math.ceil((amortYears - 25) / 5) * 0.0025;
}

/**
 * Present value of an annuity: how much loan a given periodic payment supports.
 * This is what turns a DSCR constraint into a dollar loan amount.
 */
function pv(rate: number, nper: number, payment: number): number {
  if (rate === 0) return payment * nper;
  return (payment * (1 - Math.pow(1 + rate, -nper))) / rate;
}

/**
 * Sizes a commercial loan the way a lender actually does: take the lesser of
 * the LTV ceiling and what the NOI supports at the target DSCR.
 */
// ─── Valeur économique (bank value) ────────────────────────────────
/**
 * The "economic value" is the number Quebec lenders actually finance against
 * on 5+ unit buildings, and it is routinely below the market price: in dense
 * Montreal markets a market cap rate near 4.5% against a bank-value cap near
 * 5.5% is normal, not a defect of the deal.
 *
 * Method (as taught by Collège MREX and applied, with variations, by every
 * lender):
 *   1. Normalize NOI: the bank substitutes its own expense standards so all
 *      buildings compare on equal footing: management at ~5% of gross revenue,
 *      maintenance ~$500/unit, janitorial ~$125–300/unit: regardless of what
 *      the owner actually spends.
 *   2. Maximum debt service = normalized NOI ÷ RCD (debt coverage ratio).
 *   3. Present-value that payment at the QUALIFICATION rate (stress-tested,
 *      higher than the contract rate) → maximum loan.
 *   4. Economic value = maximum loan ÷ maximum LTV.
 *
 * Two properties of the result worth understanding:
 *   - It moves daily with qualification rates, unlike market value which
 *     reflects past transactions.
 *   - Every lender normalizes differently; this is one defensible version,
 *     not the number any specific bank will produce.
 *
 * The practical consequence: when the economic value is below the purchase
 * price, the loan is capped by the bank's number and the buyer covers the
 * entire difference in cash: the real down payment becomes
 * price − maximum loan, not price × 20%.
 */
/**
 * Lowest vacancy a lender will underwrite, whatever the rent roll shows today.
 * Illustrative: each institution sets its own, generally drawing on CMHC
 * market data rather than the building's current occupancy.
 */
export const NORMALIZED_VACANCY_FLOOR = 0.03;

export interface EconomicValueResult {
  /** NOI after the bank's expense substitutions. */
  normalizedNoi: number;
  /** Vacancy actually applied: the owner's rate or the lender's floor. */
  normalizedVacancyRate: number;
  /** The bank's expense lines that replaced the owner's. */
  normalizedManagement: number;
  normalizedMaintenance: number;
  normalizedJanitorial: number;
  qualificationRate: number;
  maxAnnualDebtService: number;
  maxLoan: number;
  economicValue: number;
  /** Purchase price − economic value. Positive = the bank values it below your price. */
  gapToPrice: number;
  /** Cash actually required: price − maximum loan (floor: conventional down payment). */
  requiredCash: number;
  /** What the down payment would be if the bank financed the full price at max LTV. */
  conventionalCash: number;
  /** Extra cash the gap forces beyond the conventional down payment. */
  cashShortfall: number;
}

export function calculateEconomicValue(
  inputs: DealInputs,
  grossAnnualRent: number,
  actualOperatingExpenses: number,
  actualManagement: number,
  actualMaintenance: number,
): EconomicValueResult {
  const mix = summarizeUnitMix(inputs);
  const units = Math.max(1, mix.totalUnits);

  // Bank normalization: strip the owner's management and maintenance, apply
  // the standard substitutes. Midpoints of the published ranges.
  const normalizedManagement = grossAnnualRent * 0.05;
  const normalizedMaintenance = 500 * units;
  const normalizedJanitorial = 200 * units;
  const normalizedExpenses =
    actualOperatingExpenses - actualManagement - actualMaintenance +
    normalizedManagement + normalizedMaintenance + normalizedJanitorial;

  // Vacancy is the fourth normalized line, so the lender's own floor applies
  // rather than the owner's assumption: a building fully leased today is not
  // underwritten at 0% vacancy.
  const normalizedVacancyRate = Math.max(inputs.vacancyRate, NORMALIZED_VACANCY_FLOOR);
  const egi = grossAnnualRent * (1 - normalizedVacancyRate);
  const normalizedNoi = egi - normalizedExpenses;

  // Qualification rate: stress-tested above contract. Lenders differ; this
  // mirrors the residential stress-test convention as a defensible default.
  const qualificationRate = Math.max(inputs.annualInterestRate + 0.02, 0.0525);

  const rcd = Math.max(1, inputs.dscrTarget);
  const maxAnnualDebtService = Math.max(0, normalizedNoi) / rcd;

  const periodicRate = qualificationRate / inputs.paymentsPerYear;
  const nper = inputs.loanLifeYears * inputs.paymentsPerYear;
  const periodicPayment = maxAnnualDebtService / inputs.paymentsPerYear;
  const maxLoan = periodicRate === 0
    ? periodicPayment * nper
    : (periodicPayment * (1 - Math.pow(1 + periodicRate, -nper))) / periodicRate;

  const ltv = Math.min(0.95, Math.max(0.5, inputs.maxLtv));
  const economicValue = maxLoan / ltv;

  const price = inputs.purchasePrice;
  const conventionalCash = price * (1 - ltv);
  const requiredCash = Math.max(conventionalCash, price - maxLoan);

  return {
    normalizedNoi,
    normalizedVacancyRate,
    normalizedManagement,
    normalizedMaintenance,
    normalizedJanitorial,
    qualificationRate,
    maxAnnualDebtService,
    maxLoan,
    economicValue,
    gapToPrice: price - economicValue,
    requiredCash,
    conventionalCash,
    cashShortfall: Math.max(0, requiredCash - conventionalCash),
  };
}

export function sizeCommercialLoan(
  noi: number,
  purchasePrice: number,
  maxLtv: number,
  dscrTarget: number,
  annualRate: number,
  amortYears: number,
  paymentsPerYear: number,
): { loan: number; byLtv: number; byDscr: number; constraint: 'ltv' | 'dscr' } {
  const byLtv = purchasePrice * maxLtv;

  const supportableAnnualDS = dscrTarget > 0 ? noi / dscrTarget : 0;
  const periodicRate = annualRate / paymentsPerYear;
  const nper = amortYears * paymentsPerYear;
  const byDscr = Math.max(0, pv(periodicRate, nper, supportableAnnualDS / paymentsPerYear));

  const loan = Math.min(byLtv, byDscr);
  return { loan, byLtv, byDscr, constraint: byDscr < byLtv ? 'dscr' : 'ltv' };
}

// ─── Quebec Welcome Tax (Droits de mutation) ───────────────────────
/**
 * Reference date for every externally-sourced rate in this file. All of these
 * are indexed or re-legislated periodically: re-verify against the primary
 * source before relying on an analysis for an offer.
 */
export const RULES_AS_OF = 'July 2026';

export interface TransferBracket {
  /** Upper bound of the bracket; the rate applies only to the portion inside it. */
  upTo: number;
  rate: number;
}

/**
 * City of Montreal schedule for transfers from 1 January 2026.
 * Source: montreal.ca, "Comment sont calculés les droits sur les mutations
 * immobilières". Montreal is the one municipality allowed to exceed the 3% cap,
 * which is why the top brackets run to 4%.
 */
export const MONTREAL_TRANSFER_BRACKETS: TransferBracket[] = [
  { upTo: 62900, rate: 0.005 },
  { upTo: 315000, rate: 0.01 },
  { upTo: 552300, rate: 0.015 },
  { upTo: 1104700, rate: 0.02 },
  { upTo: 2136500, rate: 0.025 },
  { upTo: 3113000, rate: 0.035 },
  { upTo: Infinity, rate: 0.04 },
];

/**
 * Statutory Quebec base schedule for 2026 (quebec.ca). Thresholds are indexed
 * annually to the Quebec CPI. Municipalities outside Montreal may add up to 3%
 * on the portion above $500,000 by bylaw, so check the specific town: this
 * base schedule is the floor, not necessarily what you will pay.
 */
export const QUEBEC_TRANSFER_BRACKETS: TransferBracket[] = [
  { upTo: 62900, rate: 0.005 },
  { upTo: 315000, rate: 0.01 },
  { upTo: Infinity, rate: 0.015 },
];

export function calculateWelcomeTax(purchasePrice: number, isMontreal: boolean): number {
  const brackets = isMontreal ? MONTREAL_TRANSFER_BRACKETS : QUEBEC_TRANSFER_BRACKETS;
  let tax = 0;
  let prevLimit = 0;

  for (const bracket of brackets) {
    const taxableInBracket = Math.min(purchasePrice - prevLimit, bracket.upTo - prevLimit);
    if (taxableInBracket <= 0) break;
    tax += taxableInBracket * bracket.rate;
    prevLimit = bracket.upTo;
  }

  return tax;
}

// ─── CMHC / Mortgage Default Insurance ─────────────────────────────

/** Insured homeowner loans are capped by purchase price (CMHC Purchase, 2026). */
export const CMHC_MAX_PRICE = 1_500_000;

/**
 * Longest amortization on a standard insured homeowner loan.
 *
 * Not an absolute ceiling: since 15 December 2024 first-time buyers and buyers
 * of newly built homes may amortize an insured loan over 30 years. Eligibility
 * depends on the buyer rather than the building, so the model keeps the
 * standard figure and leaves 30 years as a manual override.
 */
export const CMHC_MAX_AMORTIZATION = 25;

/**
 * Maximum insured loan-to-value, which steps down at three units.
 * Source: CMHC Purchase, 95% for 1–2 units, 90% for 3–4 units.
 */
export function maxInsuredLtv(units: number): number {
  return units <= 2 ? 0.95 : 0.90;
}

/**
 * Minimum down payment in dollars for an owner-occupied purchase.
 * 1–2 units: 5% of the first $500,000 plus 10% of the excess.
 * 3–4 units: a flat 10%.
 * Anything not owner-occupied is conventional: 20%.
 */
export function minimumDownPayment(
  purchasePrice: number, units: number, ownerOccupied: boolean,
): number {
  if (!ownerOccupied || units > 4 || purchasePrice >= CMHC_MAX_PRICE) {
    return purchasePrice * 0.20;
  }
  if (units <= 2) {
    return purchasePrice <= 500000
      ? purchasePrice * 0.05
      : 500000 * 0.05 + (purchasePrice - 500000) * 0.10;
  }
  return purchasePrice * 0.10;
}

/**
 * CMHC premium on owner-occupied 1–4 unit homeowner loans, by LTV.
 * This homeowner schedule is unchanged: the July 2025 move to risk-based
 * pricing applied to multi-unit MLI products, not here (see
 * `multiUnitPremiumPct`). Actual pricing still reflects credit score and
 * amortization, so treat this as the schedule floor rather than a quote.
 */
export function cmhcPremiumPct(ltv: number): number {
  if (ltv <= 0.65) return 0.0060;
  if (ltv <= 0.75) return 0.0170;
  if (ltv <= 0.80) return 0.0240;
  if (ltv <= 0.85) return 0.0280;
  if (ltv <= 0.90) return 0.0310;
  return 0.0400;
}

/**
 * Quebec's tax on insurance premiums (taxe sur les primes d'assurance).
 *
 * This is NOT GST/QST. Insurance is an exempt financial service, so no GST
 * applies, and Quebec levies its own premium tax instead of QST. The rate is
 * 9% and rises to 9.975% for premiums paid after 31 December 2026, harmonizing
 * it with the QST rate (Bill 99, assented 28 October 2025). Payable in cash at
 * closing: unlike the premium itself, it cannot be added to the mortgage.
 */
export const INSURANCE_PREMIUM_TAX_RATE = 0.09;
/** Rate for premiums paid from 1 January 2027. */
export const INSURANCE_PREMIUM_TAX_RATE_2027 = 0.09975;

export interface InsuranceResult {
  premium: number;
  premiumPct: number;
  applicable: boolean;
  /** Quebec tax on the premium, payable in cash at closing. */
  premiumTax: number;
  /** Why insurance is unavailable, when it is. */
  ineligibleReason?: string;
}

/**
 * Mortgage default insurance for a 1–4 unit homeowner purchase. Insurance is
 * only available where the buyer occupies a unit; a pure rental purchase is
 * conventional and needs 20% down.
 */
export function calculateCMHCPremium(
  purchasePrice: number,
  equityPct: number,
  units: number = 1,
  ownerOccupied: boolean = true,
): InsuranceResult {
  const none = (reason?: string): InsuranceResult => ({
    premium: 0, premiumPct: 0, applicable: false, premiumTax: 0, ineligibleReason: reason,
  });

  if (equityPct >= 0.20) return none();
  if (!ownerOccupied) return none('Not owner-occupied: conventional financing needs 20% down.');
  if (units > 4) return none('Five or more units is commercial: see MLI Select.');
  if (purchasePrice >= CMHC_MAX_PRICE) {
    return none(`Above the $${(CMHC_MAX_PRICE / 1e6).toFixed(1)}M insured price cap.`);
  }

  const ltv = 1 - equityPct;
  const ltvCap = maxInsuredLtv(units);
  if (ltv > ltvCap + 1e-9) {
    return none(`${units <= 2 ? '1–2' : '3–4'} units insure to ${(ltvCap * 100).toFixed(0)}% LTV, you need at least ${((1 - ltvCap) * 100).toFixed(0)}% down.`);
  }

  const premiumPct = cmhcPremiumPct(ltv);
  const premium = purchasePrice * ltv * premiumPct;

  return {
    premium,
    premiumPct,
    applicable: true,
    premiumTax: premium * INSURANCE_PREMIUM_TAX_RATE,
  };
}

// ─── Quebec + Federal Combined Marginal Tax Rates (2024) ───────────
export function getQuebecMarginalRate(taxableIncome: number): number {
  // Approximate combined QC+Federal marginal rates
  // These are simplified brackets for rental income
  if (taxableIncome <= 17183) return 0.2753; // 15% fed + 14% QC (approx after basic personal)
  if (taxableIncome <= 49275) return 0.2853;
  if (taxableIncome <= 55867) return 0.3653;
  if (taxableIncome <= 98540) return 0.3753;
  if (taxableIncome <= 111733) return 0.4053;
  if (taxableIncome <= 126000) return 0.4553;
  if (taxableIncome <= 155625) return 0.4753;
  if (taxableIncome <= 172600) return 0.4953;
  if (taxableIncome <= 221708) return 0.5053;
  return 0.5335; // top bracket
}

// ─── CCA (Capital Cost Allowance) ──────────────────────────────────
// Class 1: 4% declining balance for residential rental buildings
// Half-year rule: first year only 50% of CCA can be claimed
export function calculateCCA(
  purchasePrice: number,
  buildingPct: number,
  ccaRate: number,
  halfYearRule: boolean,
  year: number,
  previousUCC?: number,
): { cca: number; uccAfter: number } {
  const buildingCost = purchasePrice * buildingPct;

  if (year === 1) {
    const ucc = buildingCost;
    const cca = halfYearRule ? ucc * ccaRate * 0.5 : ucc * ccaRate;
    return { cca, uccAfter: ucc - cca };
  }

  const ucc = previousUCC ?? buildingCost;
  const cca = ucc * ccaRate;
  return { cca, uccAfter: ucc - cca };
}

// ─── PMT function ──────────────────────────────────────────────────
function pmt(rate: number, nper: number, pv: number): number {
  if (rate === 0) return pv / nper;
  return (pv * rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
}

// ─── IRR calculation (Newton's method) ─────────────────────────────
function calculateIRR(cashFlows: number[], guess: number = 0.1): number {
  let rate = guess;
  for (let i = 0; i < 1000; i++) {
    let npv = 0;
    let dnpv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t);
      dnpv -= t * cashFlows[t] / Math.pow(1 + rate, t + 1);
    }
    if (Math.abs(npv) < 0.001) return rate;
    if (dnpv === 0) return 0;
    rate = rate - npv / dnpv;
  }
  return rate;
}

// ─── NPV calculation ──────────────────────────────────────────────
function calculateNPV(cashFlows: number[], discountRate: number): number {
  return cashFlows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + discountRate, t), 0);
}

// ─── Area Bank ─────────────────────────────────────────────────────
export type Region = 'Montréal' | 'South Shore' | 'North Shore';

export interface AreaSpec {
  name: string;
  region: Region;
  /**
   * Whether the property sits in the Montreal agglomeration, which decides
   * which welcome-tax schedule applies. Off-island municipalities use the
   * provincial base and may add their own bracket above $500,000.
   */
  isMontrealAgglo: boolean;
  /** Multiplier on the property-type base price. 1.00 = Montreal CMA median. */
  priceIndex: number;
  /** Multiplier on the unit-type base rents. */
  rentIndex: number;
  /** Estimated effective total municipal tax rate as a share of value. */
  taxRate: number;
  /** True where the index is pinned to a published figure rather than inferred. */
  anchored?: boolean;
  note?: string;
}

/**
 * Approximate area adjustments for the Montreal CMA.
 *
 * `priceIndex` scales the property-type base price; 1.00 is the CMA median
 * ($865k plex / $425k condo / $639k single-family, APCIQ Q1 2026).
 *
 * Anchored entries are pinned to published 2026 figures: Villeray plexes
 * average $881k (1.02), Rosemont $1.02M (1.18), Laval plexes $923k (1.07),
 * a Plateau duplex $1.05M against $710k CMA, Montréal-Nord duplexes $550–650k,
 * and a Longueuil quadruplex $1.02M. The South Shore generally runs 5–15%
 * under the CMA, and North Shore plexes trade at roughly $195k–$285k a door.
 *
 * Everything not marked `anchored` is interpolated from those points and from
 * relative standing: treat it as a starting point, not an appraisal. Tax rates
 * are estimates of the effective total bill (Montreal's *general* residential
 * rate alone is 0.4631% before borough and service levies).
 */
export const AREAS: Record<string, AreaSpec> = {
  // ── Montreal ──
  'plateau':        { name: 'Le Plateau-Mont-Royal', region: 'Montréal', isMontrealAgglo: true, priceIndex: 1.35, rentIndex: 1.15, taxRate: 0.0068, anchored: true, note: 'Duplexes near $1.05M' },
  'rosemont':       { name: 'Rosemont–La Petite-Patrie', region: 'Montréal', isMontrealAgglo: true, priceIndex: 1.18, rentIndex: 1.08, taxRate: 0.0068, anchored: true, note: 'Plexes average $1.02M' },
  'sud-ouest':      { name: 'Le Sud-Ouest', region: 'Montréal', isMontrealAgglo: true, priceIndex: 1.12, rentIndex: 1.06, taxRate: 0.0068 },
  'verdun':         { name: 'Verdun', region: 'Montréal', isMontrealAgglo: true, priceIndex: 1.10, rentIndex: 1.05, taxRate: 0.0068, note: 'REM effect' },
  'cdn-ndg':        { name: 'Côte-des-Neiges–NDG', region: 'Montréal', isMontrealAgglo: true, priceIndex: 1.05, rentIndex: 1.02, taxRate: 0.0068 },
  'villeray':       { name: 'Villeray–Saint-Michel–Parc-Ex', region: 'Montréal', isMontrealAgglo: true, priceIndex: 1.02, rentIndex: 1.00, taxRate: 0.0068, anchored: true, note: 'Plexes average $881k' },
  'saint-laurent':  { name: 'Saint-Laurent', region: 'Montréal', isMontrealAgglo: true, priceIndex: 0.98, rentIndex: 0.98, taxRate: 0.0068 },
  'ahuntsic':       { name: 'Ahuntsic-Cartierville', region: 'Montréal', isMontrealAgglo: true, priceIndex: 0.95, rentIndex: 0.98, taxRate: 0.0068 },
  'hochelaga':      { name: 'Mercier–Hochelaga-Maisonneuve', region: 'Montréal', isMontrealAgglo: true, priceIndex: 0.88, rentIndex: 0.95, taxRate: 0.0068, note: 'Higher yields, 4–5%' },
  'lasalle':        { name: 'LaSalle', region: 'Montréal', isMontrealAgglo: true, priceIndex: 0.88, rentIndex: 0.94, taxRate: 0.0068 },
  'anjou':          { name: 'Anjou', region: 'Montréal', isMontrealAgglo: true, priceIndex: 0.86, rentIndex: 0.92, taxRate: 0.0068 },
  'saint-leonard':  { name: 'Saint-Léonard', region: 'Montréal', isMontrealAgglo: true, priceIndex: 0.85, rentIndex: 0.92, taxRate: 0.0068, note: 'Yields 4.5–5.5%' },
  'lachine':        { name: 'Lachine', region: 'Montréal', isMontrealAgglo: true, priceIndex: 0.85, rentIndex: 0.92, taxRate: 0.0068 },
  'rdp-pat':        { name: 'Rivière-des-Prairies–P.-a.-T.', region: 'Montréal', isMontrealAgglo: true, priceIndex: 0.80, rentIndex: 0.88, taxRate: 0.0068 },
  'montreal-nord':  { name: 'Montréal-Nord', region: 'Montréal', isMontrealAgglo: true, priceIndex: 0.80, rentIndex: 0.88, taxRate: 0.0068, anchored: true, note: 'Duplexes $550–650k, yields 5–6%' },

  // ── South Shore ──
  'saint-lambert':  { name: 'Saint-Lambert', region: 'South Shore', isMontrealAgglo: false, priceIndex: 1.10, rentIndex: 1.00, taxRate: 0.0072 },
  'boucherville':   { name: 'Boucherville', region: 'South Shore', isMontrealAgglo: false, priceIndex: 1.02, rentIndex: 0.95, taxRate: 0.0065 },
  'saint-bruno':    { name: 'Saint-Bruno-de-Montarville', region: 'South Shore', isMontrealAgglo: false, priceIndex: 1.02, rentIndex: 0.95, taxRate: 0.0068 },
  'brossard':       { name: 'Brossard', region: 'South Shore', isMontrealAgglo: false, priceIndex: 1.00, rentIndex: 0.95, taxRate: 0.0068, note: 'REM terminus' },
  'candiac':        { name: 'Candiac', region: 'South Shore', isMontrealAgglo: false, priceIndex: 0.98, rentIndex: 0.92, taxRate: 0.0068 },
  'la-prairie':     { name: 'La Prairie', region: 'South Shore', isMontrealAgglo: false, priceIndex: 0.90, rentIndex: 0.90, taxRate: 0.0070 },
  'longueuil':      { name: 'Longueuil (Vieux-Longueuil)', region: 'South Shore', isMontrealAgglo: false, priceIndex: 0.90, rentIndex: 0.92, taxRate: 0.0075, anchored: true, note: 'Quadruplex near $1.02M' },
  'chambly':        { name: 'Chambly', region: 'South Shore', isMontrealAgglo: false, priceIndex: 0.85, rentIndex: 0.88, taxRate: 0.0072 },
  'saint-hubert':   { name: 'Saint-Hubert', region: 'South Shore', isMontrealAgglo: false, priceIndex: 0.82, rentIndex: 0.88, taxRate: 0.0075, note: 'Single-family near $520k' },
  'greenfield-park':{ name: 'Greenfield Park', region: 'South Shore', isMontrealAgglo: false, priceIndex: 0.80, rentIndex: 0.88, taxRate: 0.0075, note: 'Most affordable sector, $490k' },

  // ── North Shore ──
  'laval':          { name: 'Laval', region: 'North Shore', isMontrealAgglo: false, priceIndex: 1.07, rentIndex: 0.95, taxRate: 0.0070, anchored: true, note: 'Plexes average $923k' },
  'rosemere':       { name: 'Rosemère', region: 'North Shore', isMontrealAgglo: false, priceIndex: 0.95, rentIndex: 0.90, taxRate: 0.0065 },
  'blainville':     { name: 'Blainville', region: 'North Shore', isMontrealAgglo: false, priceIndex: 0.92, rentIndex: 0.88, taxRate: 0.0065, anchored: true, note: '$255–295k a door' },
  'boisbriand':     { name: 'Boisbriand', region: 'North Shore', isMontrealAgglo: false, priceIndex: 0.88, rentIndex: 0.87, taxRate: 0.0068 },
  'mirabel':        { name: 'Mirabel', region: 'North Shore', isMontrealAgglo: false, priceIndex: 0.85, rentIndex: 0.85, taxRate: 0.0062 },
  'terrebonne':     { name: 'Terrebonne', region: 'North Shore', isMontrealAgglo: false, priceIndex: 0.82, rentIndex: 0.85, taxRate: 0.0068, anchored: true, note: '$200–250k a door' },
  'mascouche':      { name: 'Mascouche', region: 'North Shore', isMontrealAgglo: false, priceIndex: 0.80, rentIndex: 0.85, taxRate: 0.0068 },
  'saint-eustache': { name: 'Saint-Eustache', region: 'North Shore', isMontrealAgglo: false, priceIndex: 0.80, rentIndex: 0.85, taxRate: 0.0070, anchored: true, note: '$200–250k a door' },
  'repentigny':     { name: 'Repentigny', region: 'North Shore', isMontrealAgglo: false, priceIndex: 0.80, rentIndex: 0.85, taxRate: 0.0070 },
};

export const REGION_ORDER: Region[] = ['Montréal', 'South Shore', 'North Shore'];

/** Area keys grouped by region, for a grouped picker. */
export function areasByRegion(): { region: Region; keys: string[] }[] {
  return REGION_ORDER.map((region) => ({
    region,
    keys: Object.keys(AREAS).filter((k) => AREAS[k].region === region),
  }));
}

// ─── Property Type Presets ─────────────────────────────────────────
/**
 * Starting figures per property type, anchored on Montreal CMA medians.
 *
 * Prices: APCIQ, Q1 2026, condo $425k, duplex $710k, triplex $900k,
 * quadruplex $1.1M, single-family $639k. Five-plus is priced off the
 * quadruplex per-door figure, since APCIQ reports plexes as one category.
 *
 * Rents deliberately split two ways, because they are two different markets:
 *   in-place  ≈ CMHC Rental Market Survey occupied stock (2-bed Greater
 *               Montreal average $1,346): what rent-controlled leases collect
 *   market    ≈ current asking rents on listings (2-bed ~$1,826)
 * The gap between them is the value-add the TAL makes you wait for.
 *
 * Taxes are estimated off price (Montreal municipal ≈ 0.75%, school ≈ 0.1%)
 * and should be replaced with the actual tax bills before making an offer.
 */
export interface PropertyPreset {
  askingPrice: number;
  offerDiscount: number;
  /**
   * Typical Montreal lot. The classic residential lot is a 25-foot frontage on
   * 80–100 feet of depth; plex frontage widens with unit count. A condo owns no
   * land, so the field is suppressed rather than seeded.
   */
  lotSizeSqft: number;
  /** Representative construction era for this segment of the Montreal stock. */
  buildingYear: number;
  unitMix: UnitRow[];
  financingMode: FinancingMode;
  ownerOccupied: boolean;
  equityPct: number;
  condoFeesMonthly: number;
  /** Condo fees cover exterior upkeep, so these drop out. */
  snowRemoval: number;
  lawnLandscaping: number;
  commonHydro: number;
  insurance: number;
  capexPerUnit: number;
}

/** A condo owner holds a unit and a share of the common areas, not a lot. */
export function hasLot(type: PropertyType): boolean {
  return type !== 'condo';
}

/** Builds a preset unit row from the shared unit-type table. */
function unitRow(id: string, label: UnitTypeLabel, count: number): UnitRow {
  const s = UNIT_TYPES[label];
  return { id, label: s.label, count, currentRent: s.currentRent, marketRent: s.marketRent, sqft: s.sqft };
}

// Municipal rate now comes from the area; school tax is provincial and flat.
const SCHOOL_TAX_RATE = 0.001;

export const PROPERTY_PRESETS: Record<PropertyType, PropertyPreset> = {
  condo: {
    askingPrice: 425000, offerDiscount: 0.02,
    lotSizeSqft: 0, buildingYear: 2008,
    unitMix: [unitRow('c1', '4½', 1)],
    financingMode: 'residential', ownerOccupied: false, equityPct: 0.20,
    condoFeesMonthly: 320, snowRemoval: 0, lawnLandscaping: 0, commonHydro: 0,
    insurance: 700, capexPerUnit: 300,
  },
  duplex: {
    askingPrice: 710000, offerDiscount: 0.02,
    lotSizeSqft: 2500, buildingYear: 1950,
    unitMix: [unitRow('d1', '5½', 1), unitRow('d2', '4½', 1)],
    financingMode: 'residential', ownerOccupied: true, equityPct: 0.05,
    condoFeesMonthly: 0, snowRemoval: 900, lawnLandscaping: 350, commonHydro: 600,
    insurance: 2400, capexPerUnit: 500,
  },
  triplex: {
    askingPrice: 900000, offerDiscount: 0.025,
    lotSizeSqft: 2800, buildingYear: 1955,
    unitMix: [unitRow('t1', '4½', 1), unitRow('t2', '5½', 2)],
    financingMode: 'residential', ownerOccupied: true, equityPct: 0.10,
    condoFeesMonthly: 0, snowRemoval: 1200, lawnLandscaping: 400, commonHydro: 900,
    insurance: 2800, capexPerUnit: 500,
  },
  quadruplex: {
    askingPrice: 1100000, offerDiscount: 0.025,
    lotSizeSqft: 3600, buildingYear: 1962,
    unitMix: [unitRow('q1', '3½', 1), unitRow('q2', '4½', 2), unitRow('q3', '5½', 1)],
    financingMode: 'residential', ownerOccupied: true, equityPct: 0.10,
    condoFeesMonthly: 0, snowRemoval: 1500, lawnLandscaping: 500, commonHydro: 1200,
    insurance: 3600, capexPerUnit: 550,
  },
  'fiveplex-plus': {
    // ~$275k/door, carried across from the quadruplex median.
    askingPrice: 1650000, offerDiscount: 0.03,
    lotSizeSqft: 6000, buildingYear: 1975,
    unitMix: [unitRow('f1', '3½', 2), unitRow('f2', '4½', 2), unitRow('f3', '5½', 1)],
    financingMode: 'mli-select', ownerOccupied: false, equityPct: 0.20,
    condoFeesMonthly: 0, snowRemoval: 2200, lawnLandscaping: 700, commonHydro: 1800,
    insurance: 5200, capexPerUnit: 600,
  },
  'house-flip': {
    askingPrice: 639000, offerDiscount: 0.06,
    lotSizeSqft: 4000, buildingYear: 1968,
    unitMix: [{ id: 'h1', label: '6½', count: 1, currentRent: 0, marketRent: 0, sqft: 1400 }],
    financingMode: 'residential', ownerOccupied: false, equityPct: 0.20,
    condoFeesMonthly: 0, snowRemoval: 800, lawnLandscaping: 400, commonHydro: 0,
    insurance: 1800, capexPerUnit: 0,
  },
};

/**
 * Rebuilds the inputs for a property type, carrying over the assumptions the
 * user has tuned (rates, growth, tax position) while replacing everything that
 * is genuinely type-specific.
 */
export function applyPropertyPreset(
  inputs: DealInputs, type: PropertyType, areaKey?: string,
): DealInputs {
  const p = PROPERTY_PRESETS[type];
  const key = areaKey ?? inputs.areaKey;
  const area = AREAS[key] ?? AREAS['villeray'];

  // The area moves price and rents together: a Plateau plex costs more and
  // commands more, and the two do not move by the same factor, which is
  // exactly why cap rates compress downtown and widen out in the east end.
  const askingPrice = Math.round(p.askingPrice * area.priceIndex);
  const purchasePrice = Math.round(askingPrice * (1 - p.offerDiscount));
  const presetMix = reconcileUnitMixCount(p.unitMix, type);
  const units = presetMix.reduce((s, u) => s + u.count, 0);

  const unitMix = presetMix.map((u) => ({
    ...u,
    currentRent: Math.round(u.currentRent * area.rentIndex),
    marketRent: Math.round(u.marketRent * area.rentIndex),
  }));

  return {
    ...inputs,
    areaKey: key,
    isMontreal: area.isMontrealAgglo,
    propertyType: type,
    askingPrice,
    purchasePrice,
    lotSizeSqft: p.lotSizeSqft,
    buildingYear: p.buildingYear,
    unitMix,
    numberOfUnits: units,
    financingMode: p.financingMode,
    ownerOccupied: p.ownerOccupied,
    equityPct: p.equityPct,
    condoFees: p.condoFeesMonthly,
    snowRemoval: p.snowRemoval,
    lawnLandscaping: p.lawnLandscaping,
    commonHydro: p.commonHydro,
    insurance: p.insurance,
    capexPerUnit: p.capexPerUnit,
    propertyTaxes: Math.round(purchasePrice * area.taxRate),
    schoolTax: Math.round(purchasePrice * SCHOOL_TAX_RATE),
    // Amortization has to come back inside the insured limit for 1–4 units.
    loanLifeYears: type === 'fiveplex-plus' ? 40 : 25,
    renoUnitsPerYear: Math.max(1, Math.round(units / 3)),
    afterRepairValue: type === 'house-flip' ? Math.round(purchasePrice * 1.22) : 0,
    proformaOverrides: {},
  };
}

/** Re-seeds the deal for a different area, keeping the property type. */
export function applyArea(inputs: DealInputs, areaKey: string): DealInputs {
  return applyPropertyPreset(inputs, inputs.propertyType, areaKey);
}

// ─── Default Inputs ────────────────────────────────────────────────
const BASE_INPUTS: DealInputs = {
  areaKey: 'villeray',
  propertyType: 'triplex',
  // Montreal triplex at the APCIQ Q1 2026 median of $900k.
  askingPrice: 900000,
  purchasePrice: 877500,
  buildingYear: 1955,
  lotSizeSqft: 2800,
  unitMix: [unitRow('u1', '4½', 1), unitRow('u2', '5½', 2)],
  rehabBudget: 25000,
  numberOfUnits: 3,
  avgMonthlyRentPerUnit: 1415,
  vacancyRate: 0.03,
  annualRentGrowth: 0.025,
  propertyTaxes: 6581,
  insurance: 2800,
  snowRemoval: 1200,
  lawnLandscaping: 400,
  commonHydro: 900,
  repairsMaintenancePct: 0.08,
  propertyManagementPct: 0.05,
  otherExpenses: 0,
  schoolTax: 878, // ~0.1% of valuation, Quebec school tax rate
  paySchoolTax: true,
  condoFees: 0,
  afterRepairValue: 0,
  holdingMonths: 6,
  sellingCostsPct: 0.06,
  ownerOccupied: true,
  financingMode: 'residential',
  maxLtv: 0.75,
  dscrTarget: 1.20,
  mliPoints: 70,
  equityPct: 0.10, // 3–4 units insure to 90% LTV

  pointsOnMortgagePct: 0,
  otherInitialEquitySpent: 0,
  annualInterestRate: 0.0475,
  loanLifeYears: 25,
  paymentsPerYear: 12,
  renoUnitsPerYear: 1,
  renoCostPerUnit: 25000,
  renoStartYear: 1,
  proformaOverrides: {},
  marginalTaxBracket: 0.4053, // ~$100k combined QC+Fed
  ccaRate: 0.04, // Class 1: 4%
  ccaHalfYearRule: true,
  buildingPct: 0.80, // 80% building, 20% land (typical Quebec)
  notaryFees: 2000,
  inspectionFees: 600,
  environmentalAssessment: 0,
  titleInsurance: 350,
  annualAppreciation: 0.03,
  annualExpenseGrowth: 0.02,
  talRentIncrease: 0.031, // TAL 2026: 3.1% for leases from 2 Apr 2026
  usetalCap: true,
  isMontreal: true,
  discountRate: 0.06,
  capexPerUnit: 500, // $500/unit/year CapEx reserve
  mortgageTerm: 5, // 5-year term (standard Canadian)
  renewalRate: 0.05, // expected renewal rate
  brrrrRefiLtv: 0.75, // 75% LTV refinance
  exitYear: 10,
  capitalGainsInclusion: 0.50, // 50% inclusion rate
};

/**
 * Opens on a Villeray triplex, built through the same preset path the pickers
 * use so the starting state can never drift from what re-selecting produces.
 */
export const DEFAULT_INPUTS: DealInputs = applyPropertyPreset(BASE_INPUTS, 'triplex', 'villeray');

// ─── Amortization Schedule ─────────────────────────────────────────
export function calculateAmortization(inputs: DealInputs, effectiveLoan?: number): AmortizationRow[] {
  const loanAmount = effectiveLoan ?? inputs.purchasePrice * (1 - inputs.equityPct);
  const periodicRate = inputs.annualInterestRate / inputs.paymentsPerYear;
  const totalPayments = inputs.loanLifeYears * inputs.paymentsPerYear;
  const payment = pmt(periodicRate, totalPayments, loanAmount);
  const rows: AmortizationRow[] = [];
  let balance = loanAmount;
  for (let i = 1; i <= totalPayments; i++) {
    const interest = balance * periodicRate;
    const principal = payment - interest;
    const closing = balance - principal;
    rows.push({
      period: i,
      openingBalance: balance,
      payment,
      interest,
      principal,
      closingBalance: Math.max(0, closing),
    });
    balance = closing;
  }
  return rows;
}

// ─── Main Deal Calculator ──────────────────────────────────────────
export function calculateDeal(inputs: DealInputs): DealResults {
  const mix = summarizeUnitMix(inputs);
  const totalUnits = mix.totalUnits;
  const netRSF = mix.netRSF;

  // In-place income: what the rent roll actually collects today.
  const monthlyRentAll = mix.currentMonthlyRent;
  const annualRent = monthlyRentAll * 12;
  const effectiveGrossIncome = annualRent * (1 - inputs.vacancyRate);

  // Proforma income: every unit turned over to market rent, unless the
  // statement carries a manual override for that line.
  const ov = inputs.proformaOverrides ?? {};
  const ovOr = (id: ApodLineId, derived: number) =>
    ov[id] !== undefined ? (ov[id] as number) : derived;

  const proformaMonthlyRent = mix.proformaMonthlyRent;
  const proformaAnnualRent = ovOr('gsi', proformaMonthlyRent * 12);
  const proformaVacancyLoss = ovOr('vacancy', proformaAnnualRent * inputs.vacancyRate);
  const proformaEgi = proformaAnnualRent - proformaVacancyLoss;

  const repairsMaintenanceAnnual = annualRent * inputs.repairsMaintenancePct;
  const propertyManagementAnnual = annualRent * inputs.propertyManagementPct;
  const schoolTaxAnnual = inputs.paySchoolTax ? inputs.schoolTax : 0;
  const condoFeesAnnual = inputs.propertyType === 'condo' ? inputs.condoFees * 12 : 0;
  const capexReserveAnnual = inputs.capexPerUnit * totalUnits;

  // Fixed expenses don't move with rent; the percentage-based ones do.
  const fixedExpenses =
    inputs.propertyTaxes +
    inputs.insurance +
    inputs.snowRemoval +
    inputs.lawnLandscaping +
    inputs.commonHydro +
    inputs.otherExpenses +
    schoolTaxAnnual +
    condoFeesAnnual +
    capexReserveAnnual;

  const totalOperatingExpenses = fixedExpenses + repairsMaintenanceAnnual + propertyManagementAnnual;
  const noi = effectiveGrossIncome - totalOperatingExpenses;

  // Every proforma expense line falls back to its derived value until the user
  // types over it on the statement.
  const proformaTaxes = ovOr('taxes', inputs.propertyTaxes);
  const proformaSchoolTax = ovOr('schoolTax', schoolTaxAnnual);
  const proformaInsurance = ovOr('insurance', inputs.insurance);
  const proformaSnow = ovOr('snow', inputs.snowRemoval);
  const proformaLandscaping = ovOr('landscaping', inputs.lawnLandscaping);
  const proformaHydro = ovOr('hydro', inputs.commonHydro);
  const proformaRepairs = ovOr('repairs', proformaAnnualRent * inputs.repairsMaintenancePct);
  const proformaMgmt = ovOr('management', proformaAnnualRent * inputs.propertyManagementPct);
  const proformaCapex = ovOr('capex', capexReserveAnnual);
  const proformaCondoFees = ovOr('condoFees', condoFeesAnnual);
  const proformaOther = ovOr('other', inputs.otherExpenses);

  const proformaOpEx =
    proformaTaxes + proformaSchoolTax + proformaInsurance + proformaSnow +
    proformaLandscaping + proformaHydro + proformaRepairs + proformaMgmt +
    proformaCapex + proformaCondoFees + proformaOther;
  const proformaNoi = proformaEgi - proformaOpEx;

  // ─── Financing ─────────────────────────────────────────
  // The loan has to be sized before the deal can be costed, because on the
  // commercial side the loan amount drives the down payment, not the reverse.
  const welcomeTax = calculateWelcomeTax(inputs.purchasePrice, inputs.isMontreal);

  let baseLoanAmount: number;
  let maxLoanByLtv: number;
  let maxLoanByDscr = 0;
  let loanSizedBy: 'ltv' | 'dscr' | 'down-payment';
  let amortYears = inputs.loanLifeYears;
  let mliPremiumPct = 0;
  let insurancePremium = 0;
  let premiumTax = 0;
  let insured = false;
  let insuranceNote: string | undefined;

  if (inputs.financingMode === 'residential') {
    // 1–4 units: your down payment sets the loan. CMHC kicks in under 20% down.
    maxLoanByLtv = inputs.purchasePrice * (1 - inputs.equityPct);
    baseLoanAmount = maxLoanByLtv;
    loanSizedBy = 'down-payment';

    const cmhc = calculateCMHCPremium(
      inputs.purchasePrice, inputs.equityPct, totalUnits, inputs.ownerOccupied,
    );
    insured = cmhc.applicable;
    insurancePremium = cmhc.premium;
    mliPremiumPct = cmhc.premiumPct;
    premiumTax = cmhc.premiumTax;
    insuranceNote = cmhc.ineligibleReason;
  } else {
    // 5+ units: the lender sizes the loan off NOI. Whichever of the LTV cap
    // and the DSCR test bites first is what you get.
    const isMli = inputs.financingMode === 'mli-select';
    const terms = mliSelectTerms(inputs.mliPoints);
    const ltvCap = isMli ? Math.min(inputs.maxLtv, terms.maxLtv) : inputs.maxLtv;
    amortYears = isMli ? Math.min(inputs.loanLifeYears, terms.maxAmortization) : inputs.loanLifeYears;

    const sized = sizeCommercialLoan(
      noi, inputs.purchasePrice, ltvCap, inputs.dscrTarget,
      inputs.annualInterestRate, amortYears, inputs.paymentsPerYear,
    );
    baseLoanAmount = sized.loan;
    maxLoanByLtv = sized.byLtv;
    maxLoanByDscr = sized.byDscr;
    loanSizedBy = sized.constraint;

    if (isMli) {
      insured = true;
      const actualLtv = inputs.purchasePrice > 0 ? baseLoanAmount / inputs.purchasePrice : 0;
      // Points discount the base premium; long amortization adds it back.
      mliPremiumPct = multiUnitPremiumPct(actualLtv) * (1 - terms.premiumDiscount)
        + amortizationSurchargePct(amortYears);
      insurancePremium = baseLoanAmount * mliPremiumPct;
      premiumTax = insurancePremium * INSURANCE_PREMIUM_TAX_RATE;
    }
  }

  const closingCosts: ClosingCostBreakdown = {
    welcomeTax,
    cmhcPremium: insurancePremium,
    cmhcOnLoan: insured, // premium is capitalized into the mortgage
    notaryFees: inputs.notaryFees,
    inspectionFees: inputs.inspectionFees,
    environmentalAssessment: inputs.environmentalAssessment,
    titleInsurance: inputs.titleInsurance,
    premiumTaxOnCmhc: premiumTax,
    totalClosingCosts: welcomeTax + inputs.notaryFees + inputs.inspectionFees +
      inputs.environmentalAssessment + inputs.titleInsurance +
      premiumTax, // cash portion (the premium itself goes on the loan)
    totalCashAtClosing: 0, // calculated below
  };

  const minDownPayment = inputs.financingMode === 'residential'
    ? minimumDownPayment(inputs.purchasePrice, totalUnits, inputs.ownerOccupied)
    : inputs.purchasePrice - baseLoanAmount;
  const belowMinimumDown = inputs.financingMode === 'residential'
    && inputs.purchasePrice * inputs.equityPct < minDownPayment - 1;

  const loanAmountPct = inputs.purchasePrice > 0 ? baseLoanAmount / inputs.purchasePrice : 0;
  const equityAmount = Math.max(0, inputs.purchasePrice - baseLoanAmount);
  const effectiveLoanAmount = insured ? baseLoanAmount + insurancePremium : baseLoanAmount;

  // Amortization can be shortened by the MLI tier, so downstream schedules
  // run off this rather than the raw input.
  const finInputs: DealInputs = { ...inputs, loanLifeYears: amortYears };

  const pointsOnMortgageDollar = baseLoanAmount * inputs.pointsOnMortgagePct;
  const initialEquityForPurchase = equityAmount + pointsOnMortgageDollar;
  const totalEquityInvested = equityAmount + pointsOnMortgageDollar +
    inputs.otherInitialEquitySpent + inputs.rehabBudget + closingCosts.totalClosingCosts;

  closingCosts.totalCashAtClosing = totalEquityInvested;

  const totalNumberOfPayments = amortYears * inputs.paymentsPerYear;
  const periodicInterestRate = inputs.annualInterestRate / inputs.paymentsPerYear;
  const paymentPerPeriod = pmt(periodicInterestRate, totalNumberOfPayments, effectiveLoanAmount);
  const sumOfPayments = paymentPerPeriod * totalNumberOfPayments;
  const interestCost = sumOfPayments - effectiveLoanAmount;

  // ─── CCA (Canadian depreciation) ──────────────────────
  const { cca: ccaYear1, uccAfter: ccaUCC } = calculateCCA(
    inputs.purchasePrice, inputs.buildingPct, inputs.ccaRate, inputs.ccaHalfYearRule, 1
  );

  const amortizationOfPointsYear1 = amortYears > 0 ? pointsOnMortgageDollar / amortYears : 0;

  const amort = calculateAmortization(finInputs, effectiveLoanAmount);
  const interestYear1 = amort.slice(0, inputs.paymentsPerYear).reduce((s, r) => s + r.interest, 0);
  const principalPaydownYear1 = amort.slice(0, inputs.paymentsPerYear).reduce((s, r) => s + r.principal, 0);

  // Tax calculation using CCA
  const btIncomeYear1 = noi - interestYear1 - ccaYear1 - amortizationOfPointsYear1;
  const incomeTaxYear1 = Math.max(0, btIncomeYear1 * inputs.marginalTaxBracket);
  const atIncomeYear1 = btIncomeYear1 - incomeTaxYear1;

  const annualDebtService = paymentPerPeriod * inputs.paymentsPerYear;
  const btCashFlowYear1 = noi - annualDebtService;
  const btCashFlowMonthly = btCashFlowYear1 / 12;
  const atCashFlowYear1 = btCashFlowYear1 - incomeTaxYear1;
  const atCashFlowMonthly = atCashFlowYear1 / 12;

  const btCashPlusPrincipalYear1 = btCashFlowYear1 + principalPaydownYear1;
  const btRoiYear1 = totalEquityInvested > 0 ? btCashPlusPrincipalYear1 / totalEquityInvested : 0;
  const atCashPlusPrincipalYear1 = atCashFlowYear1 + principalPaydownYear1;
  const atRoiYear1 = totalEquityInvested > 0 ? atCashPlusPrincipalYear1 / totalEquityInvested : 0;

  // Guarded: clearing the price field yields 0, and an unguarded ratio would
  // surface as "Infinity%" in the verdict chips.
  const rentToPurchaseRatio = inputs.purchasePrice > 0 ? annualRent / inputs.purchasePrice : 0;
  const capRateYear1 = inputs.purchasePrice > 0 ? noi / inputs.purchasePrice : 0;
  const cashOnCashBtYear1 = totalEquityInvested > 0 ? btCashFlowYear1 / totalEquityInvested : 0;
  const atCashOnCashYear1 = totalEquityInvested > 0 ? atCashFlowYear1 / totalEquityInvested : 0;
  const btCashFlowPerUnitYear1 = totalUnits > 0 ? btCashFlowYear1 / totalUnits : 0;
  const atCashFlowPerUnitYear1 = totalUnits > 0 ? atCashFlowYear1 / totalUnits : 0;
  const dscrYear1 = annualDebtService > 0 ? noi / annualDebtService : 0;

  // ─── New Metrics ───────────────────────────────────────
  const grm = annualRent > 0 ? inputs.purchasePrice / annualRent : 0;
  const operatingExpenseRatio = effectiveGrossIncome > 0 ? totalOperatingExpenses / effectiveGrossIncome : 0;
  const ltv = inputs.purchasePrice > 0 ? effectiveLoanAmount / inputs.purchasePrice : 0;
  const breakEvenRatio = annualRent > 0 ? (totalOperatingExpenses + annualDebtService) / annualRent : 0;
  const pricePerDoor = totalUnits > 0 ? inputs.purchasePrice / totalUnits : 0;
  // 1% rule: should be >= 0.01
  const rentToPrice1Pct = inputs.purchasePrice > 0 ? monthlyRentAll / inputs.purchasePrice : 0;

  // ─── Purchase vs. proforma pricing ────────────────────
  const purchaseCapRate = inputs.purchasePrice > 0 ? noi / inputs.purchasePrice : 0;
  const proformaCapRate = inputs.purchasePrice > 0 ? proformaNoi / inputs.purchasePrice : 0;
  const proformaCashFlow = proformaNoi - annualDebtService;
  const costPerRSF = netRSF > 0 ? inputs.purchasePrice / netRSF : 0;
  const rentUpsideMonthly = proformaMonthlyRent - monthlyRentAll;

  // ─── IRR & NPV (10-year) ──────────────────────────────
  const projForIRR = calculateProjection(finInputs, {
    annualRent, totalOperatingExpenses, annualDebtService, totalEquityInvested,
    effectiveLoanAmount, noi, paymentPerPeriod,
  }, 10, effectiveLoanAmount);

  const irrCashFlows: number[] = [-totalEquityInvested];
  for (let i = 0; i < projForIRR.length; i++) {
    if (i === projForIRR.length - 1) {
      // Terminal year: cash flow + estimated sale proceeds (value - loan balance - selling costs)
      const saleProceeds = projForIRR[i].propertyValue * (1 - inputs.sellingCostsPct) - projForIRR[i].loanBalance;
      irrCashFlows.push(projForIRR[i].btCashFlow - projForIRR[i].renoSpend + saleProceeds);
    } else {
      irrCashFlows.push(projForIRR[i].btCashFlow - projForIRR[i].renoSpend);
    }
  }
  const irr = calculateIRR(irrCashFlows);
  const npv = calculateNPV(irrCashFlows, inputs.discountRate);

  // ─── Hold-period returns ──────────────────────────────
  const holdYears = Math.max(1, Math.min(inputs.exitYear, projForIRR.length));
  const holdRows = projForIRR.slice(0, holdYears);
  const avgCashOnCash = totalEquityInvested > 0 && holdRows.length > 0
    ? holdRows.reduce((s, p) => s + p.btCashFlow - p.renoSpend, 0) / holdRows.length / totalEquityInvested
    : 0;
  const cumulativeFlows = holdRows.reduce((s, p) => s + p.btCashFlow - p.renoSpend, 0);
  const exitRow = holdRows[holdRows.length - 1];
  const exitProceeds = exitRow
    ? exitRow.propertyValue * (1 - inputs.sellingCostsPct) - exitRow.loanBalance
    : 0;
  const equityMultiple = totalEquityInvested > 0
    ? (cumulativeFlows + exitProceeds) / totalEquityInvested
    : 0;

  // ─── APOD (Annual Property Operating Data) ────────────
  const pctG = (v: number) => (annualRent > 0 ? v / annualRent : 0);
  const isOv = (id: ApodLineId) => ov[id] !== undefined;
  const apod: ApodLine[] = [
    { label: 'Income', current: 0, proforma: 0, kind: 'header' },
    {
      id: 'gsi', label: 'Gross Scheduled Income',
      current: annualRent, proforma: proformaAnnualRent,
      kind: 'line', overridden: isOv('gsi'),
    },
    {
      id: 'vacancy',
      label: `Vacancy & Credit Loss (${(inputs.vacancyRate * 100).toFixed(1)}%)`,
      current: -(annualRent - effectiveGrossIncome),
      proforma: -proformaVacancyLoss,
      kind: 'line', overridden: isOv('vacancy'),
    },
    { label: 'Effective Gross Income', current: effectiveGrossIncome, proforma: proformaEgi, kind: 'subtotal' },

    { label: 'Operating Expenses', current: 0, proforma: 0, kind: 'header' },
    { id: 'taxes', label: 'Municipal Taxes', current: inputs.propertyTaxes, proforma: proformaTaxes, kind: 'line', pctOfGsi: pctG(inputs.propertyTaxes), overridden: isOv('taxes') },
    ...(schoolTaxAnnual > 0
      ? [{ id: 'schoolTax' as const, label: 'School Tax', current: schoolTaxAnnual, proforma: proformaSchoolTax, kind: 'line' as const, pctOfGsi: pctG(schoolTaxAnnual), overridden: isOv('schoolTax') }]
      : []),
    { id: 'insurance', label: 'Insurance', current: inputs.insurance, proforma: proformaInsurance, kind: 'line', pctOfGsi: pctG(inputs.insurance), overridden: isOv('insurance') },
    { id: 'snow', label: 'Snow Removal', current: inputs.snowRemoval, proforma: proformaSnow, kind: 'line', pctOfGsi: pctG(inputs.snowRemoval), overridden: isOv('snow') },
    { id: 'landscaping', label: 'Landscaping', current: inputs.lawnLandscaping, proforma: proformaLandscaping, kind: 'line', pctOfGsi: pctG(inputs.lawnLandscaping), overridden: isOv('landscaping') },
    { id: 'hydro', label: 'Common Hydro', current: inputs.commonHydro, proforma: proformaHydro, kind: 'line', pctOfGsi: pctG(inputs.commonHydro), overridden: isOv('hydro') },
    { id: 'repairs', label: 'Repairs & Maintenance', current: repairsMaintenanceAnnual, proforma: proformaRepairs, kind: 'line', pctOfGsi: pctG(repairsMaintenanceAnnual), overridden: isOv('repairs') },
    { id: 'management', label: 'Property Management', current: propertyManagementAnnual, proforma: proformaMgmt, kind: 'line', pctOfGsi: pctG(propertyManagementAnnual), overridden: isOv('management') },
    { id: 'capex', label: 'CapEx Reserve', current: capexReserveAnnual, proforma: proformaCapex, kind: 'line', pctOfGsi: pctG(capexReserveAnnual), overridden: isOv('capex') },
    ...(condoFeesAnnual > 0
      ? [{ id: 'condoFees' as const, label: 'Condo Fees', current: condoFeesAnnual, proforma: proformaCondoFees, kind: 'line' as const, pctOfGsi: pctG(condoFeesAnnual), overridden: isOv('condoFees') }]
      : []),
    { id: 'other', label: 'Other', current: inputs.otherExpenses, proforma: proformaOther, kind: 'line', pctOfGsi: pctG(inputs.otherExpenses), overridden: isOv('other') },
    { label: 'Total Operating Expenses', current: totalOperatingExpenses, proforma: proformaOpEx, kind: 'subtotal' },

    { label: 'Net Operating Income', current: noi, proforma: proformaNoi, kind: 'total' },
    { label: 'Annual Debt Service', current: -annualDebtService, proforma: -annualDebtService, kind: 'line' },
    { label: 'Cash Flow Before Tax', current: btCashFlowYear1, proforma: proformaCashFlow, kind: 'total' },
  ];

  // ─── House flip ────────────────────────────────────────
  const arv = inputs.afterRepairValue || (inputs.purchasePrice + inputs.rehabBudget);
  const flipSellingCosts = arv * inputs.sellingCostsPct;
  // No welcome tax on the sale side: in Quebec the buyer pays it, not the seller.
  const holdingCosts = (paymentPerPeriod * inputs.holdingMonths) + (totalOperatingExpenses / 12 * inputs.holdingMonths);
  const flipTotalCost = inputs.purchasePrice + inputs.rehabBudget + flipSellingCosts +
    holdingCosts + welcomeTax + inputs.notaryFees + inputs.inspectionFees;
  const flipProfit = inputs.propertyType === 'house-flip' ? arv - flipTotalCost : 0;
  const flipROI = inputs.propertyType === 'house-flip' && flipTotalCost > 0 ? flipProfit / (equityAmount + inputs.rehabBudget + closingCosts.totalClosingCosts) : 0;

  // ─── Mortgage Stress Test ──────────────────────────────
  // Canadian qualifying rate: max(contract + 2%, 5.25%)
  const stressTestRate = Math.max(inputs.annualInterestRate + 0.02, 0.0525);
  const stressTestPeriodicRate = stressTestRate / inputs.paymentsPerYear;
  const stressTestPayment = pmt(stressTestPeriodicRate, totalNumberOfPayments, effectiveLoanAmount);
  const stressTestAnnualDS = stressTestPayment * inputs.paymentsPerYear;
  const stressTestPasses = noi > 0 && (noi / stressTestAnnualDS) >= 1.0;

  // ─── Exit Analysis (Capital Gains + CCA Recapture) ─────
  const exitProj = projForIRR;
  const exitIdx = Math.min(inputs.exitYear, exitProj.length) - 1;
  const exitData = exitIdx >= 0 ? exitProj[exitIdx] : null;

  // Calculate total CCA claimed over holding period
  let totalCCAClaimed = 0;
  let uccTrack = inputs.purchasePrice * inputs.buildingPct;
  for (let y = 1; y <= inputs.exitYear && y <= 50; y++) {
    const { cca, uccAfter } = calculateCCA(
      inputs.purchasePrice, inputs.buildingPct, inputs.ccaRate,
      inputs.ccaHalfYearRule, y, y > 1 ? uccTrack : undefined,
    );
    totalCCAClaimed += cca;
    uccTrack = uccAfter;
  }

  const exitSalePrice = exitData ? exitData.propertyValue : inputs.purchasePrice;
  const exitSellingCosts = exitSalePrice * inputs.sellingCostsPct;
  const exitLoanBalance = exitData ? exitData.loanBalance : effectiveLoanAmount;
  const exitNetSaleProceeds = exitSalePrice - exitSellingCosts - exitLoanBalance;

  // CCA Recapture: taxed at full marginal rate
  const buildingSaleValue = exitSalePrice * inputs.buildingPct;
  const ccaRecapture = Math.min(totalCCAClaimed, Math.max(0, buildingSaleValue - uccTrack));
  const ccaRecaptureTax = ccaRecapture * inputs.marginalTaxBracket;

  // Capital Gain: 50% inclusion rate
  const acb = inputs.purchasePrice + inputs.rehabBudget; // adjusted cost base
  const capitalGain = Math.max(0, exitSalePrice - exitSellingCosts - acb);
  const taxableCapitalGain = capitalGain * inputs.capitalGainsInclusion;
  const capitalGainsTax = taxableCapitalGain * inputs.marginalTaxBracket;
  const totalTaxOnSale = ccaRecaptureTax + capitalGainsTax;

  // Total cumulative cash flows during holding
  let totalCashFlows = 0;
  for (const p of exitProj.slice(0, inputs.exitYear)) {
    totalCashFlows += p.btCashFlow - p.renoSpend;
  }

  const netProfitAfterTax = exitNetSaleProceeds + totalCashFlows - totalTaxOnSale;
  const totalReturnOnInvestment = totalEquityInvested > 0 ? netProfitAfterTax / totalEquityInvested : 0;
  const annualizedReturn = totalEquityInvested > 0 && inputs.exitYear > 0
    ? Math.pow(1 + totalReturnOnInvestment, 1 / inputs.exitYear) - 1 : 0;

  const exitAnalysis: ExitAnalysis = {
    salePrice: exitSalePrice,
    sellingCosts: exitSellingCosts,
    loanBalanceAtExit: exitLoanBalance,
    netSaleProceeds: exitNetSaleProceeds,
    totalCCAclaimed: totalCCAClaimed,
    ccaRecapture,
    ccaRecaptureTax,
    capitalGain,
    taxableCapitalGain,
    capitalGainsTax,
    totalTaxOnSale,
    netProfitAfterTax,
    totalReturnOnInvestment,
    annualizedReturn,
  };

  // ─── BRRRR Analysis ────────────────────────────────────
  const brrrrARV = inputs.afterRepairValue || (inputs.purchasePrice + inputs.rehabBudget);
  const maxRefiLoan = brrrrARV * inputs.brrrrRefiLtv;
  const cashOutAmount = maxRefiLoan - effectiveLoanAmount;
  const moneyLeftInDeal = Math.max(0, totalEquityInvested - Math.max(0, cashOutAmount));
  const newRefiPayment = pmt(periodicInterestRate, totalNumberOfPayments, maxRefiLoan);
  const newDebtService = newRefiPayment * inputs.paymentsPerYear;
  const newBtCashFlow = noi - newDebtService;
  const infiniteReturn = moneyLeftInDeal <= 0;
  const cashOnCashAfterRefi = moneyLeftInDeal > 0 ? newBtCashFlow / moneyLeftInDeal : (newBtCashFlow > 0 ? Infinity : 0);

  const brrrrAnalysis: BRRRRAnalysis = {
    arvAfterRehab: brrrrARV,
    maxRefiLoan,
    cashOutAmount: Math.max(0, cashOutAmount),
    moneyLeftInDeal,
    newPayment: newRefiPayment,
    newDebtService,
    newBtCashFlow,
    infiniteReturn,
    cashOnCashAfterRefi,
  };

  // ─── Sensitivity: Mortgage Renewal Rates ───────────────
  const sensitivityRenewal: SensitivityResult[] = [];
  const rateSteps = [-0.02, -0.01, -0.005, 0, 0.005, 0.01, 0.015, 0.02, 0.03];
  for (const delta of rateSteps) {
    const r = inputs.annualInterestRate + delta;
    if (r <= 0) continue;
    const pr = r / inputs.paymentsPerYear;
    const pmt_ = pmt(pr, totalNumberOfPayments, effectiveLoanAmount);
    const ads = pmt_ * inputs.paymentsPerYear;
    const btcf = noi - ads;
    sensitivityRenewal.push({
      rate: r,
      payment: pmt_,
      annualDebtService: ads,
      btCashFlow: btcf,
      dscr: ads > 0 ? noi / ads : 0,
      cashOnCash: totalEquityInvested > 0 ? btcf / totalEquityInvested : 0,
    });
  }

  return {
    monthlyRentAll, annualRent, effectiveGrossIncome,
    repairsMaintenanceAnnual, propertyManagementAnnual,
    schoolTaxAnnual, condoFeesAnnual,
    totalOperatingExpenses, noi,
    loanAmountPct, equityAmount, loanAmount: baseLoanAmount, effectiveLoanAmount,
    pointsOnMortgageDollar, initialEquityForPurchase, totalEquityInvested,
    totalNumberOfPayments, periodicInterestRate, paymentPerPeriod,
    sumOfPayments, interestCost,
    ccaYear1, ccaUCC,
    amortizationOfPointsYear1,
    interestYear1, btIncomeYear1, incomeTaxYear1, atIncomeYear1,
    annualDebtService, btCashFlowYear1, btCashFlowMonthly,
    atCashFlowYear1, atCashFlowMonthly,
    principalPaydownYear1, btCashPlusPrincipalYear1, btRoiYear1,
    atCashPlusPrincipalYear1, atRoiYear1,
    rentToPurchaseRatio, capRateYear1, cashOnCashBtYear1,
    atCashOnCashYear1, btCashFlowPerUnitYear1, atCashFlowPerUnitYear1,
    dscrYear1,
    grm, operatingExpenseRatio, ltv, breakEvenRatio, pricePerDoor, rentToPrice1Pct,
    irr, npv,
    totalUnits, netRSF, costPerRSF, pricePerUnit: pricePerDoor,
    currentMonthlyRent: monthlyRentAll, proformaMonthlyRent, rentUpsideMonthly,
    purchaseCapRate, proformaCapRate, proformaNoi, proformaCashFlow,
    avgCashOnCash, equityMultiple,
    loanSizedBy, maxLoanByLtv, maxLoanByDscr, mliPremiumPct,
    insuranceNote, minDownPayment, belowMinimumDown,
    apod,
    closingCosts,
    capexReserveAnnual,
    stressTestRate, stressTestPayment, stressTestPasses,
    exitAnalysis,
    brrrrAnalysis,
    sensitivityRenewal,
    flipProfit, flipROI,
  };
}

// ─── Multi-Year Projection ─────────────────────────────────────────
export function calculateProjection(
  inputs: DealInputs,
  results: Pick<DealResults, 'annualRent' | 'totalOperatingExpenses' | 'annualDebtService' | 'totalEquityInvested' | 'effectiveLoanAmount' | 'noi' | 'paymentPerPeriod'>,
  years: number = 10,
  effectiveLoan?: number,
): YearProjection[] {
  const projections: YearProjection[] = [];
  const mix = summarizeUnitMix(inputs);
  const totalUnits = mix.totalUnits;
  let opEx = results.totalOperatingExpenses;
  let propertyValue = inputs.purchasePrice;
  let cumulativeCashFlow = -results.totalEquityInvested - inputs.rehabBudget;
  let uccBalance = inputs.purchasePrice * inputs.buildingPct;
  let prevRenovated = 0;
  const loan = effectiveLoan ?? results.effectiveLoanAmount;

  // Build amortization for loan balance tracking
  const amort = calculateAmortization(inputs, loan);
  const periodsPerYear = inputs.paymentsPerYear;

  // Sitting tenants: increases are capped by the TAL guideline.
  const sittingRentGrowth = inputs.usetalCap
    ? Math.min(inputs.annualRentGrowth, inputs.talRentIncrease)
    : inputs.annualRentGrowth;

  for (let y = 1; y <= years; y++) {
    if (y > 1) {
      opEx *= 1 + inputs.annualExpenseGrowth;
      propertyValue *= 1 + inputs.annualAppreciation;
    }

    // Turnover program: a unit only resets to market rent when it turns over.
    // Everything still occupied by a sitting tenant stays under the TAL cap.
    // This gap is what makes or breaks most Montreal value-add deals.
    const yearsRunning = Math.max(0, y - inputs.renoStartYear + 1);
    const unitsRenovated = Math.min(totalUnits, Math.floor(yearsRunning * inputs.renoUnitsPerYear));
    const unitsSitting = Math.max(0, totalUnits - unitsRenovated);

    const sittingFactor = Math.pow(1 + sittingRentGrowth, y - 1);
    const marketFactor = Math.pow(1 + inputs.annualRentGrowth, y - 1);
    const annualRent = totalUnits > 0
      ? (unitsSitting * mix.avgCurrentRent * sittingFactor +
         unitsRenovated * mix.avgMarketRent * marketFactor) * 12
      : results.annualRent * sittingFactor;

    const renoSpend = (unitsRenovated - prevRenovated) * inputs.renoCostPerUnit;
    prevRenovated = unitsRenovated;

    const egi = annualRent * (1 - inputs.vacancyRate);
    const noi = egi - opEx;
    const btCashFlow = noi - results.annualDebtService;

    // CCA for this year
    const { cca: ccaDeduction, uccAfter } = calculateCCA(
      inputs.purchasePrice, inputs.buildingPct, inputs.ccaRate,
      inputs.ccaHalfYearRule, y, y > 1 ? uccBalance : undefined,
    );
    uccBalance = uccAfter;

    // Tax calculation
    const yearStart = (y - 1) * periodsPerYear;
    const yearEnd = y * periodsPerYear;
    const yearInterest = amort.slice(yearStart, yearEnd).reduce((s, r) => s + r.interest, 0);
    const yearPrincipal = amort.slice(yearStart, yearEnd).reduce((s, r) => s + r.principal, 0);
    const taxableIncome = noi - yearInterest - ccaDeduction;
    const tax = Math.max(0, taxableIncome * inputs.marginalTaxBracket);
    const atCashFlow = btCashFlow - tax;

    cumulativeCashFlow += btCashFlow - renoSpend;

    // Loan balance at end of year
    const endPeriod = Math.min(y * periodsPerYear, amort.length);
    const loanBalance = endPeriod > 0 && endPeriod <= amort.length ? amort[endPeriod - 1].closingBalance : 0;

    const equity = propertyValue - loanBalance;
    const totalReturn = btCashFlow + yearPrincipal + (propertyValue * inputs.annualAppreciation);

    projections.push({
      year: y,
      annualRent,
      egi,
      operatingExpenses: opEx,
      noi,
      annualDebtService: results.annualDebtService,
      btCashFlow,
      atCashFlow,
      capRate: propertyValue > 0 ? noi / propertyValue : 0,
      cocBt: results.totalEquityInvested > 0 ? btCashFlow / results.totalEquityInvested : 0,
      cumulativeCashFlow,
      propertyValue,
      equity,
      loanBalance,
      ccaDeduction,
      totalReturn,
      unitsRenovated,
      renoSpend,
    });
  }
  return projections;
}

export function calculatePaybackYears(inputs: DealInputs, results: DealResults): { cashFlowPayback: number | null; totalReturnPayback: number | null } {
  const projections = calculateProjection(inputs, results, 50);
  let cashFlowPayback: number | null = null;
  let totalReturnPayback: number | null = null;
  let cumulativeTotalReturn = -results.totalEquityInvested;

  for (const p of projections) {
    // Total return = cash flow + principal paydown + appreciation gain
    cumulativeTotalReturn += p.totalReturn;

    if (cashFlowPayback === null && p.cumulativeCashFlow >= 0) {
      cashFlowPayback = p.year;
    }
    if (totalReturnPayback === null && cumulativeTotalReturn >= 0) {
      totalReturnPayback = p.year;
    }
    if (cashFlowPayback !== null && totalReturnPayback !== null) break;
  }

  return { cashFlowPayback, totalReturnPayback };
}

// ─── Deal Analysis / Verdict ───────────────────────────────────────
export type DealVerdict = 'strong-buy' | 'buy' | 'hold' | 'avoid';

export interface DealAnalysis {
  verdict: DealVerdict;
  score: number;
  factors: { label: string; value: string; status: 'good' | 'warning' | 'bad' }[];
}

export function analyzeDeal(inputs: DealInputs, results: DealResults): DealAnalysis {
  const factors: DealAnalysis['factors'] = [];
  let score = 0;

  if (inputs.propertyType === 'house-flip') {
    if (results.flipROI >= 0.20) { score += 3; factors.push({ label: 'Flip ROI', value: `${(results.flipROI * 100).toFixed(1)}%`, status: 'good' }); }
    else if (results.flipROI >= 0.10) { score += 2; factors.push({ label: 'Flip ROI', value: `${(results.flipROI * 100).toFixed(1)}%`, status: 'warning' }); }
    else { factors.push({ label: 'Flip ROI', value: `${(results.flipROI * 100).toFixed(1)}%`, status: 'bad' }); }

    if (results.flipProfit >= 50000) { score += 3; factors.push({ label: 'Flip Profit', value: `$${results.flipProfit.toFixed(0)}`, status: 'good' }); }
    else if (results.flipProfit >= 20000) { score += 2; factors.push({ label: 'Flip Profit', value: `$${results.flipProfit.toFixed(0)}`, status: 'warning' }); }
    else { factors.push({ label: 'Flip Profit', value: `$${results.flipProfit.toFixed(0)}`, status: 'bad' }); }

    const margin = results.flipProfit / (inputs.afterRepairValue || 1);
    if (margin >= 0.15) { score += 3; factors.push({ label: 'Profit Margin', value: `${(margin * 100).toFixed(1)}%`, status: 'good' }); }
    else if (margin >= 0.08) { score += 1; factors.push({ label: 'Profit Margin', value: `${(margin * 100).toFixed(1)}%`, status: 'warning' }); }
    else { factors.push({ label: 'Profit Margin', value: `${(margin * 100).toFixed(1)}%`, status: 'bad' }); }

    let verdict: DealVerdict;
    if (score >= 7) verdict = 'strong-buy';
    else if (score >= 5) verdict = 'buy';
    else if (score >= 3) verdict = 'hold';
    else verdict = 'avoid';
    return { verdict, score, factors };
  }

  const isCommercial = results.totalUnits >= 5;
  const capGood = isCommercial ? 0.07 : 0.08;
  const capWarn = isCommercial ? 0.05 : 0.05;
  const cocGood = isCommercial ? 0.08 : 0.10;
  const cocWarn = isCommercial ? 0.04 : 0.05;
  const dscrGood = isCommercial ? 1.30 : 1.25;
  const dscrWarn = isCommercial ? 1.10 : 1.0;
  const cfGood = isCommercial ? 150 : 200;

  const payback = calculatePaybackYears(inputs, results);

  if (results.capRateYear1 >= capGood) { score += 2; factors.push({ label: 'Cap Rate', value: `${(results.capRateYear1 * 100).toFixed(1)}%`, status: 'good' }); }
  else if (results.capRateYear1 >= capWarn) { score += 1; factors.push({ label: 'Cap Rate', value: `${(results.capRateYear1 * 100).toFixed(1)}%`, status: 'warning' }); }
  else { factors.push({ label: 'Cap Rate', value: `${(results.capRateYear1 * 100).toFixed(1)}%`, status: 'bad' }); }

  if (results.cashOnCashBtYear1 >= cocGood) { score += 2; factors.push({ label: 'Cash-on-Cash (BT)', value: `${(results.cashOnCashBtYear1 * 100).toFixed(1)}%`, status: 'good' }); }
  else if (results.cashOnCashBtYear1 >= cocWarn) { score += 1; factors.push({ label: 'Cash-on-Cash (BT)', value: `${(results.cashOnCashBtYear1 * 100).toFixed(1)}%`, status: 'warning' }); }
  else { factors.push({ label: 'Cash-on-Cash (BT)', value: `${(results.cashOnCashBtYear1 * 100).toFixed(1)}%`, status: 'bad' }); }

  if (results.dscrYear1 >= dscrGood) { score += 2; factors.push({ label: 'DSCR', value: results.dscrYear1.toFixed(2), status: 'good' }); }
  else if (results.dscrYear1 >= dscrWarn) { score += 1; factors.push({ label: 'DSCR', value: results.dscrYear1.toFixed(2), status: 'warning' }); }
  else { factors.push({ label: 'DSCR', value: results.dscrYear1.toFixed(2), status: 'bad' }); }

  const cfPerDoor = results.totalUnits > 0 ? results.btCashFlowMonthly / results.totalUnits : results.btCashFlowMonthly;
  if (cfPerDoor >= cfGood) { score += 2; factors.push({ label: isCommercial ? 'CF/Door/mo' : 'Monthly CF (BT)', value: `$${cfPerDoor.toFixed(0)}`, status: 'good' }); }
  else if (cfPerDoor >= 0) { score += 1; factors.push({ label: isCommercial ? 'CF/Door/mo' : 'Monthly CF (BT)', value: `$${cfPerDoor.toFixed(0)}`, status: 'warning' }); }
  else { factors.push({ label: isCommercial ? 'CF/Door/mo' : 'Monthly CF (BT)', value: `$${cfPerDoor.toFixed(0)}`, status: 'bad' }); }

  const pb = payback.totalReturnPayback;
  if (pb && pb <= 10) { score += 2; factors.push({ label: 'Payback (total)', value: `${pb} year${pb === 1 ? '' : 's'}`, status: 'good' }); }
  else if (pb && pb <= 20) { score += 1; factors.push({ label: 'Payback (total)', value: `${pb} year${pb === 1 ? '' : 's'}`, status: 'warning' }); }
  else { factors.push({ label: 'Payback (total)', value: pb ? `${pb} year${pb === 1 ? '' : 's'}` : 'Never', status: 'bad' }); }

  const cfPb = payback.cashFlowPayback;
  if (cfPb && cfPb <= 15) { score += 1; factors.push({ label: 'CF Payback', value: `${cfPb} year${cfPb === 1 ? '' : 's'}`, status: 'good' }); }
  else if (cfPb && cfPb <= 30) { factors.push({ label: 'CF Payback', value: `${cfPb} year${cfPb === 1 ? '' : 's'}`, status: 'warning' }); }
  else { factors.push({ label: 'CF Payback', value: cfPb ? `${cfPb} year${cfPb === 1 ? '' : 's'}` : 'Never', status: 'bad' }); }

  // 1% Rule
  if (results.rentToPrice1Pct >= 0.01) { score += 1; factors.push({ label: '1% Rule', value: `${(results.rentToPrice1Pct * 100).toFixed(2)}%`, status: 'good' }); }
  else if (results.rentToPrice1Pct >= 0.007) { factors.push({ label: '1% Rule', value: `${(results.rentToPrice1Pct * 100).toFixed(2)}%`, status: 'warning' }); }
  else { factors.push({ label: '1% Rule', value: `${(results.rentToPrice1Pct * 100).toFixed(2)}%`, status: 'bad' }); }

  // GRM
  if (results.grm <= 10) { score += 1; factors.push({ label: 'GRM', value: results.grm.toFixed(1), status: 'good' }); }
  else if (results.grm <= 15) { factors.push({ label: 'GRM', value: results.grm.toFixed(1), status: 'warning' }); }
  else { factors.push({ label: 'GRM', value: results.grm.toFixed(1), status: 'bad' }); }

  // Break-even ratio
  if (results.breakEvenRatio < 0.80) { score += 1; factors.push({ label: 'Break-even Ratio', value: `${(results.breakEvenRatio * 100).toFixed(0)}%`, status: 'good' }); }
  else if (results.breakEvenRatio < 1.0) { factors.push({ label: 'Break-even Ratio', value: `${(results.breakEvenRatio * 100).toFixed(0)}%`, status: 'warning' }); }
  else { factors.push({ label: 'Break-even Ratio', value: `${(results.breakEvenRatio * 100).toFixed(0)}%`, status: 'bad' }); }

  if (isCommercial) {
    if (inputs.equityPct >= 0.25) { score += 1; factors.push({ label: 'Down Payment', value: `${(inputs.equityPct * 100).toFixed(0)}%`, status: 'good' }); }
    else { factors.push({ label: 'Down Payment', value: `${(inputs.equityPct * 100).toFixed(0)}% (need 25%+)`, status: 'bad' }); }
  }

  const maxScore = isCommercial ? 17 : 16;
  let verdict: DealVerdict;
  if (score >= maxScore * 0.75) verdict = 'strong-buy';
  else if (score >= maxScore * 0.50) verdict = 'buy';
  else if (score >= maxScore * 0.25) verdict = 'hold';
  else verdict = 'avoid';

  return { verdict, score, factors };
}
