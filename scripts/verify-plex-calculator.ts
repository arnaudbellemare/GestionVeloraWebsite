import assert from 'node:assert/strict';
import {
  DEFAULT_INPUTS,
  applyPropertyPreset,
  calculateDeal,
  calculateEconomicValue,
  calculateProjection,
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

// MREX/TGA valuation is forward-NOI driven: doubling the cap rate halves value.
const highCapInputs = { ...occupied, exitCapRate: occupied.exitCapRate * 2 };
const highCapResults = calculateDeal(highCapInputs);
const highCapProjection = calculateProjection(highCapInputs, highCapResults, 10);
closeTo(projection[9].propertyValue / 2, highCapProjection[9].propertyValue, 0.02);

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

// After-tax return must include annual income tax and disposition tax.
assert.ok(occupiedResults.afterTaxIrr <= occupiedResults.irr);

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

console.log('Plex financial-model invariants passed.');
