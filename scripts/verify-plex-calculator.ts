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
  calculatorAreaKey,
  calculatorUrl,
  publishedRadarMetrics,
  type RadarDeal,
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

console.log('Plex financial-model invariants passed.');
