import assert from 'node:assert/strict';
import {
  DEFAULT_INPUTS,
  applyPropertyPreset,
  calculateDeal,
  calculateEconomicValue,
  calculateEquityMilestones,
  calculatePaybackYears,
  calculateProjection,
  calculateReturnHorizons,
  compareFinancing,
  mortgagePeriodicRate,
  rentalUseFraction,
} from '../src/lib/plex/calculator';
import {
  calculateRadarScenario,
  calculatorUrl,
  type RadarDeal,
} from '../src/data/plex-radar';

const closeTo = (actual: number, expected: number, tolerance = 0.01) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `Expected ${actual} to be within ${tolerance} of ${expected}`,
  );
};

// Canadian fixed-rate convention: nominal semi-annual converted to monthly.
const canadianMonthly = mortgagePeriodicRate(0.0475, 12, 'semi-annual');
closeTo(canadianMonthly, Math.pow(1 + 0.0475 / 2, 2 / 12) - 1, 1e-12);
assert.ok(canadianMonthly < 0.0475 / 12);

// Baselines are conservative investment examples: no invented turnover or
// duplicate day-one renovation, and conventional equity for 1–4 units.
assert.equal(DEFAULT_INPUTS.ownerOccupied, false);
assert.equal(DEFAULT_INPUTS.equityPct, 0.25);
assert.equal(DEFAULT_INPUTS.rehabBudget, 0);
assert.equal(DEFAULT_INPUTS.renoUnitsPerYear, 0);
assert.equal(DEFAULT_INPUTS.exitCapRate, 0);
assert.ok(DEFAULT_INPUTS.comparableValue > 0);

// Owner-occupied financing cannot also collect rent from the occupied unit.
const allRental = DEFAULT_INPUTS;
const occupied = {
  ...allRental,
  ownerOccupied: true,
  ownerOccupiedUnitId: allRental.unitMix[0]?.id ?? null,
};
const occupiedResults = calculateDeal(occupied);
const allRentalResults = calculateDeal(allRental);
const occupiedRow = occupied.unitMix.find((row) => row.id === occupied.ownerOccupiedUnitId);
assert.ok(occupiedRow);
closeTo(
  allRentalResults.annualRent - occupiedResults.annualRent,
  occupiedRow.currentRent * 12,
);

// Renewal must change Year-6 debt service and the amortization trajectory.
const projection = calculateProjection(occupied, occupiedResults, 10);
closeTo(projection[0].annualDebtService, projection[4].annualDebtService);
assert.notEqual(
  Math.round(projection[4].annualDebtService),
  Math.round(projection[5].annualDebtService),
);

// Initial rehab is already in equity: cumulative cash flow must not subtract it twice.
closeTo(
  projection[0].cumulativeCashFlow,
  -occupiedResults.totalEquityInvested + projection[0].btCashFlow - projection[0].renoSpend,
);

// Residential 1–4 unit valuation follows sold comparables, not a TGA.
closeTo(
  projection[9].propertyValue,
  occupied.comparableValue * Math.pow(1 + occupied.annualAppreciation, 10),
  0.02,
);

// CRA restriction: CCA cannot exceed rental income otherwise available or
// the half-year maximum on the income-producing building share.
if (occupiedResults.btIncomeYear1 < 0) assert.equal(occupiedResults.ccaYear1, 0);
assert.ok(occupiedResults.ccaYear1 <=
  occupied.purchasePrice * occupied.buildingPct * rentalUseFraction(occupied) * occupied.ccaRate * 0.5,
);
assert.ok(projection.every((row) => row.ccaDeduction >= 0));

// Five-plus financing must use the same normalized MREX RNN/qualification logic
// shown in the economic-value panel, rather than actual NOI at contract rate.
const fivePlus = applyPropertyPreset(occupied, 'fiveplex-plus');
const fivePlusResults = calculateDeal(fivePlus);
assert.equal(fivePlusResults.totalUnits, 6);
assert.equal(fivePlus.financingMode, 'commercial');
assert.equal(fivePlus.renoUnitsPerYear, 0);
const economicValue = calculateEconomicValue(
  fivePlus,
  fivePlusResults.annualRent,
  fivePlusResults.totalOperatingExpenses,
  fivePlusResults.propertyManagementAnnual,
  fivePlusResults.repairsMaintenanceAnnual,
);
closeTo(fivePlusResults.maxLoanByDscr, economicValue.maxLoan, 0.02);
closeTo(economicValue.economicValue, economicValue.maxLoan / fivePlus.maxLtv, 0.02);

// MREX/TGA valuation is forward-NOI driven for 5+ units: doubling the TGA
// halves the projected value.
const fivePlusProjection = calculateProjection(fivePlus, fivePlusResults, 10);
const highCapInputs = { ...fivePlus, exitCapRate: fivePlus.exitCapRate * 2 };
const highCapResults = calculateDeal(highCapInputs);
const highCapProjection = calculateProjection(highCapInputs, highCapResults, 10);
closeTo(fivePlusProjection[9].propertyValue / 2, highCapProjection[9].propertyValue, 0.02);

// After-tax return must include annual income tax and disposition tax.
assert.ok(occupiedResults.afterTaxIrr <= occupiedResults.irr);
assert.ok(occupiedResults.afterTaxNpv <= occupiedResults.npv);
closeTo(
  occupiedResults.breakEvenRatio,
  (occupiedResults.totalOperatingExpenses + occupiedResults.annualDebtService) /
    occupiedResults.effectiveGrossIncome,
  1e-12,
);
closeTo(
  occupiedResults.noi,
  occupiedResults.effectiveGrossIncome - occupiedResults.totalOperatingExpenses,
  1e-12,
);
closeTo(
  occupiedResults.adjustedNoi,
  occupiedResults.noi - occupiedResults.capexReserveAnnual,
  1e-12,
);
closeTo(
  occupiedResults.btCashFlowYear1,
  occupiedResults.adjustedNoi - occupiedResults.annualDebtService,
  1e-12,
);
closeTo(
  occupiedResults.proformaAdjustedNoi,
  occupiedResults.proformaNoi - occupiedResults.capexReserveAnnual,
  1e-12,
);
closeTo(
  occupiedResults.proformaCashFlow,
  occupiedResults.proformaAdjustedNoi - occupiedResults.annualDebtService,
  1e-12,
);
for (const line of occupiedResults.apod.filter((row) => row.pctOfRbe !== undefined)) {
  closeTo(line.pctOfRbe ?? 0, Math.abs(line.current) / occupiedResults.effectiveGrossIncome, 1e-12);
}

// MRN, 5/10-year returns and after-tax VAN all come from the same engine.
closeTo(
  fivePlusResults.netIncomeMultiplier,
  fivePlus.purchasePrice / fivePlusResults.noi,
  1e-10,
);
const returnHorizons = calculateReturnHorizons(fivePlus);
assert.deepEqual(returnHorizons.map((row) => row.years), [5, 10]);
for (const horizon of returnHorizons) {
  const direct = calculateDeal({ ...fivePlus, exitYear: horizon.years });
  closeTo(horizon.beforeTaxIrr, direct.irr, 1e-12);
  closeTo(horizon.beforeTaxNpv, direct.npv, 1e-8);
  closeTo(horizon.afterTaxIrr, direct.afterTaxIrr, 1e-12);
  closeTo(horizon.afterTaxNpv, direct.afterTaxNpv, 1e-8);
}

// Financing comparison models Standard for 5–6 units and every available
// commercial/insured structure respects its DSCR sizing target.
const financing = compareFinancing(fivePlus);
assert.deepEqual(financing.map((scenario) => scenario.key), [
  'conventional', 'cmhc-standard', 'mli-50', 'mli-70', 'mli-100',
]);
const standard = financing.find((scenario) => scenario.key === 'cmhc-standard');
assert.ok(standard && !standard.unavailable);
assert.ok(standard.insurancePremium > 0);
assert.equal(standard.amortizationYears, 25);
for (const scenario of financing.filter((row) => !row.unavailable)) {
  assert.ok(scenario.dscr >= fivePlus.dscrTarget);
  assert.ok(Number.isFinite(scenario.irr5));
  assert.ok(Number.isFinite(scenario.irr10));
}

// Amortization milestones reconcile to the projection and grow cumulative
// principal monotonically. The recovery row can safely join the standard set.
const payback = calculatePaybackYears(fivePlus, fivePlusResults);
const milestoneYears = [1, 5, 10, ...(payback.totalReturnPayback ? [payback.totalReturnPayback] : [])];
const milestones = calculateEquityMilestones(fivePlus, fivePlusResults, milestoneYears);
assert.equal(milestones[0].year, 1);
assert.ok(milestones.every((row, index) => index === 0 || row.cumulativePrincipalPaid >= milestones[index - 1].cumulativePrincipalPaid));
closeTo(milestones[0].loanBalance, fivePlusProjection[0].loanBalance, 0.02);

// Empty inputs must render zeroes, not NaN/Infinity, throughout the model.
const zeroInputs = {
  ...DEFAULT_INPUTS,
  askingPrice: 0,
  purchasePrice: 0,
  comparableValue: 0,
  propertyTaxes: 0,
  schoolTax: 0,
  insurance: 0,
  snowRemoval: 0,
  lawnLandscaping: 0,
  commonHydro: 0,
  otherExpenses: 0,
  capexPerUnit: 0,
  rehabBudget: 0,
  unitMix: DEFAULT_INPUTS.unitMix.map((unit) => ({
    ...unit,
    currentRent: 0,
    marketRent: 0,
  })),
};
const zeroResults = calculateDeal(zeroInputs);
const assertFiniteNumbers = (value: unknown, path = 'result'): void => {
  if (typeof value === 'number') {
    assert.ok(Number.isFinite(value), `${path} must be finite`);
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      assertFiniteNumbers(child, `${path}.${key}`);
    }
  }
};
assertFiniteNumbers(zeroResults);

// Plex Radar scenarios can remove estimates, but never reported facts.
const radarDeal: RadarDeal = {
  listing: {
    listing_id: '12345678',
    url: 'https://www.centris.ca/fr/plex/12345678',
    property_type: 'Quintuplex',
    address: '1234, rue Exemple',
    city: 'Montréal',
    region: 'Montréal',
    price: 1_000_000,
    units: 5,
    mixed_use: false,
    potential_gross_income: 100_000,
    municipal_taxes: 8_000,
    school_taxes: 1_000,
    insurance: null,
    year_built: 1965,
    listed_at: '2026-08-11',
  },
  status: 'underwritten',
  expense_policy: {
    version: 'test/1.0.0',
    building_age: 61,
    reported_total: 9_000,
    estimated_total: 24_000,
    total: 33_000,
    lines: [
      { key: 'municipal_taxes', label: 'Taxes municipales', amount: 8_000, source: 'reported', rule: 'Centris' },
      { key: 'school_taxes', label: 'Taxes scolaires', amount: 1_000, source: 'reported', rule: 'Centris' },
      { key: 'management', label: 'Gestion', amount: 5_000, source: 'estimated', rule: '5 %' },
      { key: 'utilities', label: 'Services publics propriétaire', amount: 3_000, source: 'estimated', rule: 'Estimation' },
    ],
  },
  metrics: {
    cap_rate: 0.064,
    cash_on_cash: 0.04,
    dscr: 1.2,
    grm: 10,
    monthly_cash_flow: 500,
    monthly_cash_flow_per_door: 100,
    noi: 64_000,
    operating_expenses: 33_000,
    normalized_expenses: 33_000,
    annual_debt_service: 58_000,
    loan: 750_000,
    closing_costs: 20_000,
    comparable_value: 1_281_720,
    comparable_count: 10,
  },
  analysis: { verdict: 'hold', score: 5, max_score: 12 },
};
const radarBase = calculateRadarScenario(radarDeal, []);
const radarWithoutEstimates = calculateRadarScenario(radarDeal, ['management', 'utilities']);
const radarWithoutReportedTaxes = calculateRadarScenario(radarDeal, ['municipal_taxes', 'school_taxes']);
assert.ok(radarBase && radarWithoutEstimates && radarWithoutReportedTaxes);
assert.equal(radarBase.operatingExpenses - radarWithoutEstimates.operatingExpenses, 8_000);
assert.ok(radarWithoutEstimates.noi > radarBase.noi);
assert.ok(radarWithoutEstimates.capRate > radarBase.capRate);
assert.equal(radarWithoutReportedTaxes.operatingExpenses, radarBase.operatingExpenses);
assert.equal(radarWithoutReportedTaxes.noi, radarBase.noi);

const radarCalculatorUrl = new URL(calculatorUrl(radarDeal, 'fr'), 'https://www.gestionvelora.com');
assert.equal(radarCalculatorUrl.pathname, '/calculateur-rendement-plex-montreal');
assert.equal(radarCalculatorUrl.searchParams.get('source'), 'plex-radar');
assert.equal(radarCalculatorUrl.searchParams.get('listingId'), '12345678');
assert.equal(radarCalculatorUrl.searchParams.get('purchasePrice'), '1000000');
assert.equal(radarCalculatorUrl.searchParams.get('management'), '5000');
assert.equal(radarCalculatorUrl.searchParams.get('hydro'), '3000');
assert.equal(radarCalculatorUrl.searchParams.get('areaKey'), 'villeray');
assert.equal(radarCalculatorUrl.searchParams.get('comparableValue'), '1281720');
assert.equal(radarCalculatorUrl.searchParams.get('comparableCount'), '10');

const metricsWithoutComps = { ...radarDeal.metrics };
delete metricsWithoutComps.comparable_value;
delete metricsWithoutComps.comparable_count;
const radarUrlWithoutComps = new URL(calculatorUrl({
  ...radarDeal,
  metrics: metricsWithoutComps,
}, 'fr'), 'https://www.gestionvelora.com');
assert.equal(radarUrlWithoutComps.searchParams.has('comparableValue'), false);
assert.equal(radarUrlWithoutComps.searchParams.has('comparableCount'), false);

const radarScenarioUrl = new URL(
  calculatorUrl(radarDeal, 'fr', ['management', 'utilities']),
  'https://www.gestionvelora.com',
);
assert.equal(radarScenarioUrl.searchParams.get('management'), '0');
assert.equal(radarScenarioUrl.searchParams.get('hydro'), '0');

const outsideMontrealUrl = new URL(calculatorUrl({
  ...radarDeal,
  listing: { ...radarDeal.listing, city: 'Québec (La Haute-Saint-Charles)' },
}, 'fr'), 'https://www.gestionvelora.com');
assert.equal(outsideMontrealUrl.searchParams.get('areaKey'), 'outside-gma');

console.log('Plex financial-model invariants passed.');
