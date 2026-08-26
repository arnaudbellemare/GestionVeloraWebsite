import {
  AREAS,
  DEFAULT_INPUTS,
  applyPropertyPreset,
  type DealInputs,
  type PropertyType,
} from "./calculator";

/**
 * Converts Plex Radar's aggregate listing data into calculator inputs.
 * Centris does not publish the rent roll. We therefore use the calculator's
 * area-adjusted typical mix as an explicit model estimate, then scale its
 * in-place rents so the advertised aggregate income reconciles exactly.
 */
export function createRadarPrefill(params: URLSearchParams): DealInputs {
  if (params.get("source") !== "plex-radar") return DEFAULT_INPUTS;

  const number = (key: string) => Math.max(0, Number(params.get(key) ?? 0) || 0);
  const units = Math.max(1, Math.round(number("units")));
  const type: PropertyType = units >= 5
    ? "fiveplex-plus"
    : units === 4 ? "quadruplex" : units === 3 ? "triplex" : "duplex";
  const grossAnnual = number("grossAnnual");
  const requestedArea = params.get("areaKey") ?? "villeray";
  const areaKey = AREAS[requestedArea] ? requestedArea : "outside-gma";
  const seeded = applyPropertyPreset(DEFAULT_INPUTS, type, areaKey);
  const commercial = units >= 5 || params.get("mixedUse") === "true";
  const estimatedMix = seeded.unitMix.map((unit) => ({ ...unit, count: 0, sqft: 0 }));
  let unitsRemaining = units;

  // Preserve the preset's typical distribution when possible. Extra doors in
  // larger properties go into the common 4½ bucket instead of creating a new
  // supposedly observed unit type.
  for (let index = 0; index < estimatedMix.length && unitsRemaining > 0; index += 1) {
    const count = Math.min(seeded.unitMix[index].count, unitsRemaining);
    estimatedMix[index].count = count;
    unitsRemaining -= count;
  }
  if (unitsRemaining > 0) {
    const commonIndex = estimatedMix.findIndex((unit) => unit.label === "4½");
    const targetIndex = commonIndex >= 0 ? commonIndex : estimatedMix.length - 1;
    estimatedMix[targetIndex].count += unitsRemaining;
  }

  const activeMix = estimatedMix.filter((unit) => unit.count > 0);
  const modeledAnnualIncome = activeMix.reduce(
    (sum, unit) => sum + unit.count * unit.currentRent * 12,
    0,
  );
  const incomeScale = modeledAnnualIncome > 0 ? grossAnnual / modeledAnnualIncome : 0;
  const unitMix = activeMix.map((unit) => ({
    ...unit,
    id: `radar-${unit.id}`,
    currentRent: unit.currentRent * incomeScale,
    // Market rent comes from the area's model; it is not a Centris fact.
    marketRent: unit.marketRent,
    // Centris does not provide per-unit rentable area in the Radar feed.
    sqft: 0,
  }));

  return {
    ...seeded,
    areaKey,
    askingPrice: number("askingPrice"),
    purchasePrice: number("purchasePrice"),
    // Never treat the listing price as a sold-comparable valuation. Radar
    // passes this only when its saved underwriting contains a real comp value.
    comparableValue: units <= 4 ? number("comparableValue") : 0,
    // Market valuation assumptions stay empty unless Radar has verified and
    // persisted them. The subject property's asking-price cap rate is not a
    // market cap-rate observation.
    marketCapRate: units >= 5 ? number("marketCapRate") : 0,
    marketGrm: units >= 5 ? number("marketGrm") : 0,
    buildingYear: number("buildingYear") || seeded.buildingYear,
    numberOfUnits: units,
    unitMix,
    propertyTaxes: number("municipalTaxes"),
    schoolTax: number("schoolTax"),
    insurance: number("insurance"),
    snowRemoval: number("snow"),
    lawnLandscaping: number("lawn"),
    commonHydro: number("hydro"),
    janitorial: number("janitorial"),
    heating: number("heating"),
    repairsMaintenancePct: grossAnnual > 0
      ? number("repairs") / grossAnnual
      : seeded.repairsMaintenancePct,
    propertyManagementPct: grossAnnual > 0
      ? number("management") / grossAnnual
      : seeded.propertyManagementPct,
    capexPerUnit: number("capex") / units,
    financingMode: commercial ? "commercial" : "residential",
    loanLifeYears: commercial ? 40 : 25,
    ownerOccupied: false,
    ownerOccupiedUnitId: null,
    isMontreal: (params.get("city") ?? "").toLocaleLowerCase("fr-CA").includes("montr"),
  };
}
