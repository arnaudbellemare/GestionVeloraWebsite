import assert from 'node:assert/strict';
import {
  DEFAULT_INPUTS,
  applyPropertyPreset,
  calculateDeal,
  calculateEconomicValue,
  calculateWelcomeTax,
  mliSelectTerms,
  multiUnitPremiumPct,
  calculateEquityMilestones,
  calculatePaybackYears,
  calculateProjection,
  calculateReturnHorizons,
  compareFinancing,
  mortgagePeriodicRate,
  rentalUseFraction,
} from '../src/lib/plex/calculator';
import {
  RADAR_MODEL,
  calculateRadarScenario,
  calculatorAreaKey,
  calculatorUrl,
  expenseRatioBand,
  publishedRadarMetrics,
  radarAssumptions,
  radarReserveInsideExpenses,
  type RadarDeal,
  type RadarExpenseLine,
  type RadarFeed,
} from '../src/data/plex-radar';
import { createRadarPrefill } from '../src/lib/plex/radar-prefill';
import {
  BENCHMARK_MIN_SAMPLE,
  TYPICAL_BEDROOMS,
  buildBenchmarks,
  cmhcRentSignal,
  percentileOf,
  poolKey,
  quantiles,
  relativeRank,
  relativeTier,
  resolvePool,
} from '../src/lib/plex/radar-benchmarks';
import { PROPERTY_PRESETS, UNIT_TYPES } from '../src/lib/plex/calculator';

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
assert.equal(DEFAULT_INPUTS.marketCapRate, 0);
assert.equal(DEFAULT_INPUTS.marketGrm, 0);
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
closeTo(fivePlusResults.grm, fivePlus.purchasePrice / fivePlusResults.annualRent, 1e-12);
closeTo(fivePlusResults.purchaseCapRate, fivePlusResults.noi / fivePlus.purchasePrice, 1e-12);
closeTo(fivePlusResults.netIncomeMultiplier, 1 / fivePlusResults.purchaseCapRate, 1e-10);
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
    market_cap_rate: 0.041,
    market_grm: 17.2,
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
// The expense ratio reads against advertised gross income, the basis of the 30–40 % rule.
closeTo(radarBase.expenseRatio, radarBase.operatingExpenses / 100_000, 1e-12);
closeTo(radarWithoutEstimates.expenseRatio, radarBase.expenseRatio - 0.08, 1e-12);
assert.equal(expenseRatioBand(0.29), "thin");
assert.equal(expenseRatioBand(0.30), "typical");
assert.equal(expenseRatioBand(0.40), "typical");
assert.equal(expenseRatioBand(0.41), "heavy");

const radarCalculatorUrl = new URL(calculatorUrl(radarDeal, 'fr'), 'https://www.gestionvelora.com');
assert.equal(radarCalculatorUrl.pathname, '/calculateur-rendement-plex-montreal');
assert.equal(radarCalculatorUrl.searchParams.get('source'), 'plex-radar');
assert.equal(radarCalculatorUrl.searchParams.get('listingId'), '12345678');
assert.equal(radarCalculatorUrl.searchParams.get('purchasePrice'), '1000000');
assert.equal(radarCalculatorUrl.searchParams.get('management'), '5000');
assert.equal(radarCalculatorUrl.searchParams.get('hydro'), '3000');
// A bare "Montréal" has no borough: it gets the island-wide fallback area,
// not a specific neighbourhood's price and rent indices.
assert.equal(radarCalculatorUrl.searchParams.get('areaKey'), 'montreal-cma');
assert.equal(radarCalculatorUrl.searchParams.get('comparableValue'), '1281720');
assert.equal(radarCalculatorUrl.searchParams.get('comparableCount'), '10');
assert.equal(radarCalculatorUrl.searchParams.get('marketCapRate'), '0.041');
assert.equal(radarCalculatorUrl.searchParams.get('marketGrm'), '17.2');

// Centris provides aggregate advertised income, door count, property type and
// area. Radar preserves the exact total while building an explicitly modeled
// unit mix and local-rent estimate; rentable area remains unknown.
const radarInputs = createRadarPrefill(radarCalculatorUrl.searchParams);
assert.equal(radarInputs.unitMix.reduce((sum, unit) => sum + unit.count, 0), 5);
assert.ok(radarInputs.unitMix.every((unit) => unit.marketRent > 0));
assert.ok(radarInputs.unitMix.every((unit) => unit.sqft === 0));
closeTo(
  radarInputs.unitMix.reduce((sum, unit) => sum + unit.currentRent * unit.count * 12, 0),
  100_000,
  1e-8,
);
const radarResults = calculateDeal(radarInputs);
closeTo(radarResults.annualRent, 100_000, 1e-8);
closeTo(radarResults.grm, radarInputs.purchasePrice / 100_000, 1e-12);
closeTo(radarResults.purchaseCapRate, radarResults.noi / radarInputs.purchasePrice, 1e-12);
assert.equal(radarResults.netRSF, 0);
assert.equal(radarResults.cmhcUnits.length, radarInputs.unitMix.length);
assert.ok(radarResults.rentUpsideMonthly > 0);

const metricsWithoutComps = { ...radarDeal.metrics };
delete metricsWithoutComps.comparable_value;
delete metricsWithoutComps.comparable_count;
delete metricsWithoutComps.market_cap_rate;
delete metricsWithoutComps.market_grm;
const radarUrlWithoutComps = new URL(calculatorUrl({
  ...radarDeal,
  metrics: metricsWithoutComps,
}, 'fr'), 'https://www.gestionvelora.com');
assert.equal(radarUrlWithoutComps.searchParams.has('comparableValue'), false);
assert.equal(radarUrlWithoutComps.searchParams.has('comparableCount'), false);
assert.equal(radarUrlWithoutComps.searchParams.has('marketCapRate'), false);
assert.equal(radarUrlWithoutComps.searchParams.has('marketGrm'), false);

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

// ─── Centris city → calculator area ─────────────────────────────────────────
// Every Montréal borough that has a calculator area must resolve to it; the
// earlier mapper sent Plateau, Rosemont, Sud-Ouest, CDN-NDG, Verdun, LaSalle,
// Lachine, RDP-PAT and Montréal-Nord listings to Villeray's benchmarks.
const boroughCases: Array<[string, string]> = [
  ['Montréal (Le Plateau-Mont-Royal)', 'plateau'],
  ['Montréal (Rosemont/La Petite-Patrie)', 'rosemont'],
  ['Montréal (Le Sud-Ouest)', 'sud-ouest'],
  ['Montréal (Verdun/Île-des-Soeurs)', 'verdun'],
  ['Montréal (Côte-des-Neiges/Notre-Dame-de-Grâce)', 'cdn-ndg'],
  ['Montréal (Villeray/Saint-Michel/Parc-Extension)', 'villeray'],
  ['Montréal (Mercier/Hochelaga-Maisonneuve)', 'hochelaga'],
  ['Montréal (Ahuntsic-Cartierville)', 'ahuntsic'],
  ['Montréal (LaSalle)', 'lasalle'],
  ['Montréal (Lachine)', 'lachine'],
  ['Montréal (Rivière-des-Prairies/Pointe-aux-Trembles)', 'rdp-pat'],
  ['Montréal (Montréal-Nord)', 'montreal-nord'],
  ['Montréal (Saint-Léonard)', 'saint-leonard'],
  ['Montréal (Ville-Marie)', 'montreal-cma'],
  ['Montréal (Pierrefonds-Roxboro)', 'montreal-cma'],
  ['Laval (Chomedey)', 'laval'],
  ['Longueuil (Le Vieux-Longueuil)', 'longueuil'],
  ['Saint-Hubert', 'saint-hubert'],
  ['Mascouche', 'mascouche'],
  ['Salaberry-de-Valleyfield', 'outside-gma'],
  ['Québec (Sainte-Foy/Sillery/Cap-Rouge)', 'outside-gma'],
];
for (const [city, expected] of boroughCases) {
  assert.equal(calculatorAreaKey(city), expected, `area for ${city}`);
}

// The Radar's typical bedroom mix must stay in step with the calculator presets
// it claims to mirror, or the CMHC weighting silently drifts.
for (const type of ['duplex', 'triplex', 'quadruplex', 'fiveplex-plus'] as const) {
  const presetBedrooms = PROPERTY_PRESETS[type].unitMix.flatMap((row) =>
    Array.from({ length: row.count }, () => UNIT_TYPES[row.label].bedrooms));
  assert.deepEqual([...TYPICAL_BEDROOMS[type]].sort(), [...presetBedrooms].sort(), `typical mix for ${type}`);
}

// ─── Relative benchmarks ────────────────────────────────────────────────────
assert.deepEqual(quantiles([1, 2, 3, 4, 5], 5), [1, 2, 3, 4, 5]);
assert.deepEqual(quantiles([10], 3), [10, 10, 10]);
const table = quantiles([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 11);
assert.equal(percentileOf(table, 0), 0);
assert.equal(percentileOf(table, 1), 0);
assert.equal(percentileOf(table, 6), 50);
assert.equal(percentileOf(table, 6.5), 55);
assert.equal(percentileOf(table, 11), 100);
assert.equal(percentileOf(table, 50), 100);
// Flat runs resolve to their midpoint rather than the first or last match.
assert.equal(percentileOf([0, 5, 5, 5, 10], 5), 50);

const radarListing = (id: string, region: string, units: number, price: number, gross: number, cap: number, cfDoor: number): RadarDeal => ({
  ...radarDeal,
  listing: { ...radarDeal.listing, listing_id: id, region, units, price, potential_gross_income: gross, mixed_use: false, commercial_units: 0 },
  metrics: { ...radarDeal.metrics, cap_rate: cap, monthly_cash_flow_per_door: cfDoor, price_per_door: price / units, grm: price / gross },
});
const regionA = Array.from({ length: 20 }, (_, i) => radarListing(`a${i}`, 'Montréal (Île)', 3, 900_000 + i * 10_000, 60_000 + i * 1_000, 0.03 + i * 0.001, -200 + i * 20));
const regionB = Array.from({ length: 5 }, (_, i) => radarListing(`b${i}`, 'Mauricie', 2, 200_000 + i * 5_000, 24_000 + i * 500, 0.06 + i * 0.002, 100 + i * 10));
const older: RadarFeed = { release: '2026-08-01', generated_at: '2026-08-01T10:00:00Z', deals: regionA.slice(0, 10) };
const newer: RadarFeed = { release: '2026-08-19', generated_at: '2026-08-19T10:00:00Z', deals: [...regionA.slice(10), ...regionB] };
// A listing republished in a later release counts once, at the newer figures.
const republished: RadarFeed = { release: '2026-08-20', generated_at: '2026-08-20T10:00:00Z', deals: [radarListing('a0', 'Montréal (Île)', 3, 850_000, 60_000, 0.05, 50)] };
const stale: RadarFeed = { release: '2026-05-01', generated_at: '2026-05-01T10:00:00Z', deals: regionB.map((deal) => ({ ...deal, listing: { ...deal.listing, listing_id: `old-${deal.listing.listing_id}` } })) };
const benchmarks = buildBenchmarks([older, newer, republished, stale]);
assert.equal(benchmarks.release, '2026-08-20');
assert.deepEqual(benchmarks.releases, ['2026-08-20', '2026-08-19', '2026-08-01'], 'releases outside the 60-day window are excluded');
assert.equal(benchmarks.listing_count, 25);
const islandPool = benchmarks.pools[poolKey('Montréal (Île)', 'residential')];
assert.ok(islandPool && islandPool.count === 20);
assert.equal(islandPool.quantiles.capRate.length, 21);
assert.ok(islandPool.quantiles.capRate.every((value, index, all) => index === 0 || value >= all[index - 1]), 'quantiles ascend');
closeTo(islandPool.quantiles.capRate[20], 0.05, 1e-9, );
assert.equal(benchmarks.pools[poolKey('Mauricie', 'residential')].count, 5);
assert.equal(benchmarks.pools[poolKey(null, 'residential')].count, 25);
assert.equal(benchmarks.pools[poolKey(null, null)].count, 25);

// Region with enough listings resolves to itself; a thin region falls back to
// the province-wide pool of the same class rather than being scored on five.
assert.equal(resolvePool(benchmarks, 'Montréal (Île)', 'residential')?.scope, 'region');
assert.ok(BENCHMARK_MIN_SAMPLE > 5);
assert.equal(resolvePool(benchmarks, 'Mauricie', 'residential')?.scope, 'class');
assert.equal(resolvePool(benchmarks, 'Nulle part', 'commercial')?.scope, 'all');

const bestIsland = regionA[19];
const worstIsland = regionA[1];
const bestRank = relativeRank(bestIsland, publishedRadarMetrics(bestIsland)!, benchmarks);
const worstRank = relativeRank(worstIsland, publishedRadarMetrics(worstIsland)!, benchmarks);
assert.ok(bestRank && worstRank);
assert.equal(bestRank.pool.scope, 'region');
assert.ok(bestRank.score > worstRank.score);
assert.ok(bestRank.components.find((c) => c.key === 'yield')!.percentile > 90);
// Price per door is oriented so a cheaper door scores higher.
assert.ok(worstRank.components.find((c) => c.key === 'price')!.percentile > bestRank.components.find((c) => c.key === 'price')!.percentile);
assert.equal(relativeTier(80), 'top');
assert.equal(relativeTier(79), 'above');
assert.equal(relativeTier(40), 'inline');
assert.equal(relativeTier(39), 'below');
assert.equal(relativeRank(bestIsland, publishedRadarMetrics(bestIsland)!, null), null);

// ─── CMHC rent signal ───────────────────────────────────────────────────────
const belowMarket: RadarDeal = {
  ...radarDeal,
  listing: { ...radarDeal.listing, city: 'Montréal (Villeray/Saint-Michel/Parc-Extension)', region: 'Montréal (Île)', units: 3, potential_gross_income: 3 * 900 * 12, price: 800_000 },
  assumptions: { vacancy_rate: 0.03, management_pct: 0.05, repairs_pct: 0.08 },
};
const belowSignal = cmhcRentSignal(belowMarket, calculatorAreaKey(belowMarket.listing.city), { noi: 20_000 });
assert.ok(belowSignal.applies);
if (belowSignal.applies) {
  closeTo(belowSignal.inPlaceRent, 900, 1e-9);
  assert.ok(belowSignal.benchmarkRent > 900);
  assert.ok(belowSignal.gapPct > 0);
  closeTo(belowSignal.upsideAnnual, (belowSignal.benchmarkRent - 900) * 36, 1e-6);
  closeTo(belowSignal.capAtBenchmark, (20_000 + belowSignal.upsideAnnual * 0.84) / 800_000, 1e-9);
  assert.equal(belowSignal.geography, 'Villeray');
}
// Above the average there is no upside: sitting tenants' rents cannot drop.
const aboveMarket: RadarDeal = { ...belowMarket, listing: { ...belowMarket.listing, potential_gross_income: 3 * 2_500 * 12 } };
const aboveSignal = cmhcRentSignal(aboveMarket, calculatorAreaKey(aboveMarket.listing.city), { noi: 40_000 });
assert.ok(aboveSignal.applies && aboveSignal.gapPct < 0 && aboveSignal.upsideAnnual === 0);
if (aboveSignal.applies) closeTo(aboveSignal.capAtBenchmark, 40_000 / 800_000, 1e-9);
// Unknown island borough still benchmarks against the CMA average.
const villeMarie = { ...belowMarket, listing: { ...belowMarket.listing, city: 'Montréal (Ville-Marie)' } };
const villeMarieSignal = cmhcRentSignal(villeMarie, calculatorAreaKey(villeMarie.listing.city), { noi: 20_000 });
assert.ok(villeMarieSignal.applies && villeMarieSignal.level === 'cma');
// Outside the survey the signal declines rather than borrowing Montréal rents.
const quebecCity = { ...belowMarket, listing: { ...belowMarket.listing, city: 'Québec (Sainte-Foy)', region: 'Capitale-Nationale' } };
assert.deepEqual(cmhcRentSignal(quebecCity, calculatorAreaKey(quebecCity.listing.city), { noi: 20_000 }), { applies: false, reason: 'no-benchmark' });
const noIncome = { ...belowMarket, listing: { ...belowMarket.listing, potential_gross_income: null } };
assert.deepEqual(cmhcRentSignal(noIncome, 'villeray', { noi: 0 }), { applies: false, reason: 'no-income' });

// ─── Scenario shocks ────────────────────────────────────────────────────────
const shockBase = calculateRadarScenario(radarDeal, [])!;
const rateShock = calculateRadarScenario(radarDeal, [], { rateDelta: 0.01 })!;
const vacancyShock = calculateRadarScenario(radarDeal, [], { vacancyRate: 0.05 })!;
const rentLift = calculateRadarScenario(radarDeal, [], { grossIncome: 110_000 })!;
assert.ok(rateShock.annualDebtService > shockBase.annualDebtService);
assert.ok(rateShock.loan <= shockBase.loan, 'higher qualification rate cannot enlarge a DSCR-sized loan');
assert.equal(rateShock.noi, shockBase.noi);
assert.ok(vacancyShock.noi < shockBase.noi);
closeTo(vacancyShock.noi, 100_000 * 0.95 - 33_000, 1e-9);
// Lifted rents carry their management share (5% of income line) with them.
closeTo(rentLift.operatingExpenses, 33_000 + 5_000 * 0.1, 1e-9);
closeTo(rentLift.noi, 110_000 * 0.97 - 33_500, 1e-9);
assert.ok(rentLift.capRate > shockBase.capRate);
// No shocks reproduces the unmodified scenario exactly.
assert.deepEqual(calculateRadarScenario(radarDeal, [], {}), shockBase);

// ─── Capital reserve below NOI: Radar ↔ calculator parity ───────────────────
// Rebuilds a producer (plex-screening/2.2.0) deal from its published rules so
// the website can be checked against the exact statement the feed carries.
const pmt = (rate: number, periods: number, principal: number) =>
  rate === 0 ? principal / periods : principal * rate * Math.pow(1 + rate, periods) / (Math.pow(1 + rate, periods) - 1);
const pv = (rate: number, periods: number, paymentPerPeriod: number) =>
  rate === 0 ? paymentPerPeriod * periods : paymentPerPeriod * (1 - Math.pow(1 + rate, -periods)) / rate;
const PRODUCER_ASSUMPTIONS = {
  vacancy_rate: 0.03, repairs_pct: 0.08, management_pct: 0.05, capex_per_unit: 500, down_payment_pct: 0.25,
  annual_interest_rate: 0.0475, residential_amortization_years: 25, commercial_amortization_years: 40,
  dscr_target: 1.2, max_ltv: 0.75, mortgage_compounding: 'semi-annual', payments_per_year: 12,
  notary_fees: 2000, inspection_fees: 600, title_insurance: 350, appraisal_fees: 500,
};
type ProducerSpec = {
  id: string; type: string; price: number; units: number; gross: number; year: number;
  municipal: number; school: number;
  insurance: number; repairsPct: number; managementPct: number; capexPerUnit: number;
  snow: number; lawn: number; utilities: number;
  rate?: number; amortization?: number;
};
function producerDeal(spec: ProducerSpec): RadarDeal {
  const commercial = spec.units >= 5;
  const line = (key: string, label: string, amount: number, source: RadarExpenseLine['source'] = 'estimated'): RadarExpenseLine =>
    ({ key, label, amount, source, rule: 'test' });
  const lines = [
    line('municipal_taxes', 'Taxes municipales', spec.municipal, 'reported'),
    line('school_taxes', 'Taxes scolaires', spec.school, 'reported'),
    line('insurance', 'Assurance', spec.insurance),
    line('repairs', 'Entretien et réparations', spec.gross * spec.repairsPct),
    line('management', 'Gestion', spec.gross * spec.managementPct),
    line('capex', 'Réserve de remplacement', spec.units * spec.capexPerUnit),
    line('snow', 'Déneigement', spec.snow),
    line('lawn', 'Entretien extérieur', spec.lawn),
    line('utilities', 'Services publics propriétaire', spec.utilities),
  ];
  const total = lines.reduce((sum, l) => sum + l.amount, 0);
  const capex = spec.units * spec.capexPerUnit;
  const operatingExpenses = total - capex;
  const egi = spec.gross * 0.97;
  const noi = egi - operatingExpenses;
  const rate = spec.rate ?? 0.0475;
  const years = spec.amortization ?? (commercial ? 40 : 25);
  const periodic = mortgagePeriodicRate(rate, 12, 'semi-annual');
  let normalizedExpenses = operatingExpenses;
  let normalizedNoi = noi;
  let qualificationRate = rate;
  let byDscr = 0;
  const byLtv = spec.price * (commercial ? 0.75 : 0.75);
  let loan = byLtv;
  let loanSizedBy: 'ltv' | 'dscr' | 'down-payment' = 'down-payment';
  if (commercial) {
    normalizedExpenses = operatingExpenses - spec.gross * spec.managementPct - spec.gross * spec.repairsPct
      + spec.gross * 0.05 + spec.units * 500 + spec.units * 200;
    normalizedNoi = spec.gross * 0.97 - normalizedExpenses;
    qualificationRate = Math.max(rate + 0.02, 0.0525);
    byDscr = pv(mortgagePeriodicRate(qualificationRate, 12, 'semi-annual'), years * 12, Math.max(0, normalizedNoi) / 1.2 / 12);
    loan = Math.min(byLtv, byDscr);
    loanSizedBy = byDscr < byLtv ? 'dscr' : 'ltv';
  }
  const annualDebtService = pmt(periodic, years * 12, loan) * 12;
  const annualCashFlow = noi - capex - annualDebtService;
  const closingCosts = calculateWelcomeTax(spec.price, true) + 2000 + 600 + 350 + 500;
  const totalEquity = spec.price - loan + closingCosts;
  const metrics = {
    gross_income: spec.gross, effective_gross_income: egi, operating_expenses: operatingExpenses,
    capex_reserve: capex, adjusted_noi: noi - capex, normalized_expenses: normalizedExpenses, noi,
    cap_rate: noi / spec.price, grm: spec.price / spec.gross, price_per_door: spec.price / spec.units,
    loan, loan_sized_by: loanSizedBy, max_loan_by_ltv: byLtv, max_loan_by_dscr: byDscr,
    normalized_noi: normalizedNoi, qualification_rate: qualificationRate,
    annual_debt_service: annualDebtService, annual_cash_flow: annualCashFlow,
    monthly_cash_flow: annualCashFlow / 12, monthly_cash_flow_per_door: annualCashFlow / 12 / spec.units,
    cash_on_cash: totalEquity > 0 ? annualCashFlow / totalEquity : 0,
    dscr: annualDebtService > 0 ? noi / annualDebtService : 0,
    break_even_ratio: (operatingExpenses + annualDebtService) / egi,
    total_equity: totalEquity, closing_costs: closingCosts,
  };
  const draft: RadarDeal = {
    listing: {
      listing_id: spec.id, url: `https://www.centris.ca/fr/plex/${spec.id}`, property_type: spec.type,
      address: `1 rue Test`, city: 'Montréal (Villeray/Saint-Michel/Parc-Extension)', region: 'Montréal (Île)',
      price: spec.price, units: spec.units, residential_units: spec.units, commercial_units: 0, mixed_use: false,
      potential_gross_income: spec.gross, municipal_taxes: spec.municipal, school_taxes: spec.school,
      insurance: null, year_built: spec.year, listed_at: '2026-09-11',
    },
    status: 'underwritten',
    assumptions: { ...PRODUCER_ASSUMPTIONS, annual_interest_rate: rate,
      residential_amortization_years: commercial ? 25 : years, commercial_amortization_years: commercial ? years : 40 },
    expense_policy: {
      version: 'quebec-plex-expenses/1.1.0', building_age: 2026 - spec.year,
      reported_total: spec.municipal + spec.school, estimated_total: total - spec.municipal - spec.school, total, lines,
    },
    metrics,
    analysis: { verdict: 'avoid', score: 0, max_score: 12, factors: [] },
  };
  // The producer grades on the same six criteria the website re-derives.
  const graded = calculateRadarScenario(draft, [])!;
  return { ...draft, analysis: { verdict: graded.verdict, score: graded.score, max_score: 12, factors: graded.factors } };
}
/** The same deal as plex-screening/2.1.0 published it: reserve folded into expenses and NOI. */
function legacyRelease(deal: RadarDeal, id = `${deal.listing.listing_id}-legacy`): RadarDeal {
  const capex = Number(deal.metrics.capex_reserve);
  const metrics: Record<string, number | string> = { ...deal.metrics };
  delete metrics.capex_reserve;
  delete metrics.adjusted_noi;
  metrics.operating_expenses = Number(metrics.operating_expenses) + capex;
  metrics.normalized_expenses = Number(metrics.normalized_expenses) + capex;
  metrics.noi = Number(metrics.noi) - capex;
  metrics.cap_rate = Number(metrics.noi) / deal.listing.price;
  metrics.dscr = Number(metrics.noi) / Number(metrics.annual_debt_service);
  metrics.break_even_ratio = (Number(metrics.operating_expenses) + Number(metrics.annual_debt_service)) / Number(metrics.effective_gross_income);
  return {
    ...deal,
    listing: { ...deal.listing, listing_id: id },
    expense_policy: { ...deal.expense_policy!, version: 'quebec-plex-expenses/1.0.0' },
    metrics,
    analysis: { verdict: 'avoid', score: 0, max_score: 12, factors: [] },
  };
}
const NUMERIC_KEYS = ['capRate', 'cashOnCash', 'dscr', 'grm', 'monthlyCashFlow', 'cashFlowPerDoor', 'noi', 'operatingExpenses', 'capexReserve', 'adjustedNoi', 'breakEvenRatio', 'annualDebtService', 'loan'] as const;

// Duplex, 66 years old: 11% repairs, $900/door reserve, insurance +10% (producer rules).
const duplex = producerDeal({
  id: 'res-2026', type: 'Duplex', price: 800_000, units: 2, gross: 36_000, year: 1960,
  municipal: 5_000, school: 500, insurance: 2_640, repairsPct: 0.11, managementPct: 0.05, capexPerUnit: 900,
  snow: 900, lawn: 350, utilities: 600,
});
const duplexPublished = publishedRadarMetrics(duplex)!;
const duplexScenario = calculateRadarScenario(duplex, [])!;
assert.equal(radarReserveInsideExpenses(duplex), false);
closeTo(duplexPublished.operatingExpenses, 15_750, 1e-9);
closeTo(duplexPublished.capexReserve, 1_800, 1e-9);
closeTo(duplexPublished.noi, 34_920 - 15_750, 1e-9);
closeTo(duplexPublished.adjustedNoi, duplexPublished.noi - 1_800, 1e-9);
closeTo(duplexPublished.capRate, duplexPublished.noi / 800_000, 1e-12);
closeTo(duplexPublished.dscr, duplexPublished.noi / duplexPublished.annualDebtService, 1e-12);
closeTo(duplexPublished.breakEvenRatio, (15_750 + duplexPublished.annualDebtService) / 34_920, 1e-12);
// Cash flow is the conservative figure: NOI less the reserve less debt service.
closeTo(duplexPublished.monthlyCashFlow * 12, duplexPublished.adjustedNoi - duplexPublished.annualDebtService, 1e-8);
// The unmodified scenario reproduces the published statement to the cent.
for (const key of NUMERIC_KEYS) closeTo(duplexScenario[key], duplexPublished[key], 1e-8);
assert.equal(duplexScenario.score, duplexPublished.score);
assert.deepEqual(duplexScenario.factors.map((f) => f.label), ['cap_rate', 'cash_on_cash', 'dscr', 'monthly_cash_flow_per_door', 'grm', 'break_even_ratio']);

// Removing the reserve from a scenario raises cash flow only: NOI, cap rate,
// DSCR and the loan are untouched because the reserve was never above NOI.
const duplexNoReserve = calculateRadarScenario(duplex, ['capex'])!;
assert.equal(duplexNoReserve.capexReserve, 0);
closeTo(duplexNoReserve.noi, duplexScenario.noi, 1e-9);
closeTo(duplexNoReserve.capRate, duplexScenario.capRate, 1e-12);
closeTo(duplexNoReserve.dscr, duplexScenario.dscr, 1e-12);
closeTo(duplexNoReserve.loan, duplexScenario.loan, 1e-9);
closeTo(duplexNoReserve.monthlyCashFlow - duplexScenario.monthlyCashFlow, 1_800 / 12, 1e-9);
// Removing an operating estimate moves NOI and cap rate as before.
const duplexNoSnow = calculateRadarScenario(duplex, ['snow'])!;
closeTo(duplexNoSnow.noi - duplexScenario.noi, 900, 1e-9);
closeTo(duplexNoSnow.operatingExpenses, 15_750 - 900, 1e-9);

// A release underwritten before 2.2.0 reads the same statement once normalised,
// including its regrade, so history and today's releases rank on one basis.
const duplexLegacy = legacyRelease(duplex);
assert.equal(radarReserveInsideExpenses(duplexLegacy), true);
const duplexLegacyPublished = publishedRadarMetrics(duplexLegacy)!;
const duplexLegacyScenario = calculateRadarScenario(duplexLegacy, [])!;
for (const key of NUMERIC_KEYS) {
  closeTo(duplexLegacyPublished[key], duplexPublished[key], 1e-8);
  closeTo(duplexLegacyScenario[key], duplexScenario[key], 1e-8);
}
assert.equal(duplexLegacyPublished.score, duplexPublished.score);
assert.equal(duplexLegacyPublished.verdict, duplexPublished.verdict);
// Reserve inside expenses can also move the grade: cap rate 4.6% vs 5.0%.
const boundary = producerDeal({
  id: 'res-boundary', type: 'Duplex', price: 380_000, units: 2, gross: 36_000, year: 1960,
  municipal: 5_000, school: 500, insurance: 2_640, repairsPct: 0.11, managementPct: 0.05, capexPerUnit: 900,
  snow: 900, lawn: 350, utilities: 600,
});
const boundaryLegacy = legacyRelease(boundary);
assert.ok(Number(boundaryLegacy.metrics.cap_rate) < 0.05 && Number(boundary.metrics.cap_rate) >= 0.05);
assert.equal(publishedRadarMetrics(boundaryLegacy)!.score, publishedRadarMetrics(boundary)!.score);
assert.equal(publishedRadarMetrics(boundaryLegacy)!.factors.find((f) => f.label === 'cap_rate')!.status, 'warning');

// Benchmarks sample the normalised cap rate, so a legacy release pools with a
// current one at the same value.
const mixedFeed: RadarFeed = { release: '2026-09-11', generated_at: '2026-09-11T10:00:00Z', deals: [duplex, duplexLegacy] };
const mixedBenchmarks = buildBenchmarks([mixedFeed]);
const mixedPool = mixedBenchmarks.pools[poolKey(null, null)];
assert.equal(mixedPool.count, 2);
closeTo(mixedPool.quantiles.capRate[0], duplexPublished.capRate, 1e-7);
closeTo(mixedPool.quantiles.capRate[20], duplexPublished.capRate, 1e-7);

// Stored release assumptions drive the scenario; a release without them falls
// back to the published model, and one underwritten at 6% over 30 years does not.
const duplexNoAssumptions = { ...duplex, assumptions: undefined };
assert.deepEqual(radarAssumptions(duplexNoAssumptions), {
  vacancyRate: RADAR_MODEL.vacancyRate, contractRate: RADAR_MODEL.contractRate, qualificationRate: RADAR_MODEL.contractRate,
  dscrTarget: RADAR_MODEL.dscrTarget, maxLtv: RADAR_MODEL.maxLtv, downPaymentPct: RADAR_MODEL.downPaymentPct,
  amortizationYears: RADAR_MODEL.residentialAmortizationYears,
});
for (const key of NUMERIC_KEYS) closeTo(calculateRadarScenario(duplexNoAssumptions, [])![key], duplexScenario[key], 1e-8);
const duplexDearMoney = producerDeal({
  id: 'res-6pct', type: 'Duplex', price: 800_000, units: 2, gross: 36_000, year: 1960,
  municipal: 5_000, school: 500, insurance: 2_640, repairsPct: 0.11, managementPct: 0.05, capexPerUnit: 900,
  snow: 900, lawn: 350, utilities: 600, rate: 0.06, amortization: 30,
});
assert.equal(radarAssumptions(duplexDearMoney).contractRate, 0.06);
assert.equal(radarAssumptions(duplexDearMoney).amortizationYears, 30);
const dearScenario = calculateRadarScenario(duplexDearMoney, [])!;
closeTo(dearScenario.annualDebtService, Number(duplexDearMoney.metrics.annual_debt_service), 1e-8);
assert.notEqual(Math.round(dearScenario.annualDebtService), Math.round(duplexScenario.annualDebtService));

// Opening the Radar deal in the full calculator must reproduce its cap rate,
// DSCR and cash flow exactly: both now keep the reserve below NOI.
const duplexInputs = createRadarPrefill(new URL(calculatorUrl(duplex, 'fr'), 'https://www.gestionvelora.com').searchParams);
const duplexCalc = calculateDeal(duplexInputs);
closeTo(duplexCalc.totalOperatingExpenses, duplexPublished.operatingExpenses, 1e-6);
closeTo(duplexCalc.capexReserveAnnual, duplexPublished.capexReserve, 1e-9);
closeTo(duplexCalc.noi, duplexPublished.noi, 1e-6);
closeTo(duplexCalc.purchaseCapRate, duplexPublished.capRate, 1e-9);
closeTo(duplexCalc.dscrYear1, duplexPublished.dscr, 1e-9);
closeTo(duplexCalc.annualDebtService, duplexPublished.annualDebtService, 1e-6);
closeTo(duplexCalc.btCashFlowYear1, duplexPublished.monthlyCashFlow * 12, 1e-6);
closeTo(duplexCalc.cashOnCashBtYear1, duplexPublished.cashOnCash, 1e-9);
closeTo(duplexCalc.breakEvenRatio, duplexPublished.breakEvenRatio, 1e-9);
closeTo(duplexCalc.closingCosts.totalClosingCosts, Number(duplex.metrics.closing_costs), 1e-6);

// Five doors, DSCR-sized: the lender-normalised statement also excludes the
// reserve, on both sides, so the loan and DSCR agree.
const quintuplex = producerDeal({
  id: 'com-2026', type: 'Quintuplex', price: 1_200_000, units: 5, gross: 100_000, year: 1990,
  municipal: 8_000, school: 1_000, insurance: 5_200, repairsPct: 0.09, managementPct: 0.06, capexPerUnit: 700,
  snow: 2_200, lawn: 700, utilities: 1_800,
});
assert.equal(quintuplex.metrics.loan_sized_by, 'dscr');
const quintuplexPublished = publishedRadarMetrics(quintuplex)!;
const quintuplexScenario = calculateRadarScenario(quintuplex, [])!;
for (const key of NUMERIC_KEYS) closeTo(quintuplexScenario[key], quintuplexPublished[key], 1e-6);
closeTo(calculateRadarScenario(quintuplex, ['capex'])!.loan, quintuplexScenario.loan, 1e-6);
const quintuplexLegacy = legacyRelease(quintuplex);
for (const key of NUMERIC_KEYS) closeTo(calculateRadarScenario(quintuplexLegacy, [])![key], quintuplexScenario[key], 1e-6);
closeTo(publishedRadarMetrics(quintuplexLegacy)!.noi, quintuplexPublished.noi, 1e-8);
closeTo(publishedRadarMetrics(quintuplexLegacy)!.capRate, quintuplexPublished.capRate, 1e-12);
const quintuplexInputs = createRadarPrefill(new URL(calculatorUrl(quintuplex, 'fr'), 'https://www.gestionvelora.com').searchParams);
assert.equal(quintuplexInputs.financingMode, 'commercial');
const quintuplexCalc = calculateDeal(quintuplexInputs);
assert.equal(quintuplexCalc.loanSizedBy, 'dscr');
closeTo(quintuplexCalc.totalOperatingExpenses, quintuplexPublished.operatingExpenses, 1e-6);
closeTo(quintuplexCalc.noi, quintuplexPublished.noi, 1e-6);
closeTo(quintuplexCalc.loanAmount, quintuplexPublished.loan, 1e-4);
closeTo(quintuplexCalc.purchaseCapRate, quintuplexPublished.capRate, 1e-9);
closeTo(quintuplexCalc.dscrYear1, quintuplexPublished.dscr, 1e-9);
closeTo(quintuplexCalc.btCashFlowYear1, quintuplexPublished.monthlyCashFlow * 12, 1e-4);
closeTo(quintuplexCalc.cashOnCashBtYear1, quintuplexPublished.cashOnCash, 1e-9);

// Door-count boundary: a listing published with fewer doors than its type
// (a 1-door "Duplex" from a release before the producer's floor) keeps its
// income and its single door; the calculator must not invent a second one.
const oneDoor = { ...duplex, listing: { ...duplex.listing, units: 1, residential_units: 1 } };
const oneDoorInputs = createRadarPrefill(new URL(calculatorUrl(oneDoor, 'fr'), 'https://www.gestionvelora.com').searchParams);
assert.equal(oneDoorInputs.unitMix.reduce((sum, unit) => sum + unit.count, 0), 1);
closeTo(calculateDeal(oneDoorInputs).annualRent, 36_000, 1e-8);

// ─── CMHC multi-unit premiums (schedule effective 14 July 2025) ────────────
assert.deepEqual([0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95].map(multiUnitPremiumPct), [0.0260, 0.0285, 0.0335, 0.0435, 0.0535, 0.0590, 0.0615]);
assert.ok([0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95].every((ltv, index, all) => index === 0 || multiUnitPremiumPct(ltv) > multiUnitPremiumPct(all[index - 1])));
assert.deepEqual(mliSelectTerms(50), { maxLtv: 0.85, maxAmortization: 40, premiumDiscount: 0.10 });
assert.deepEqual(mliSelectTerms(70), { maxLtv: 0.95, maxAmortization: 40, premiumDiscount: 0.20 });
assert.deepEqual(mliSelectTerms(100), { maxLtv: 0.95, maxAmortization: 50, premiumDiscount: 0.30 });
const mli100 = calculateDeal({ ...fivePlus, financingMode: 'mli-select', mliPoints: 100, maxLtv: 0.95, loanLifeYears: 50 });
closeTo(mli100.mliPremiumPct, (multiUnitPremiumPct(mli100.loanAmountPct) + 0.0125) * 0.70, 1e-12);

console.log('Plex financial-model invariants passed.');
