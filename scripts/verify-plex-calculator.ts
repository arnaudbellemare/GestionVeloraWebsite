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

// Owner-occupied financing cannot also collect rent from the occupied unit.
const occupied = DEFAULT_INPUTS;
const allRental = { ...occupied, ownerOccupied: false, ownerOccupiedUnitId: null };
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

console.log('Plex financial-model invariants passed.');
