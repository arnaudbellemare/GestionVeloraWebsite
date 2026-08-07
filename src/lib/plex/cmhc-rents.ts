/**
 * CMHC Rental Market Survey — average rent by bedroom type, Montréal CMA.
 *
 * Survey date October 2025, read from CMHC's Housing Market Information Portal
 * (Primary Rental Market → Average Rent ($) → by Bedroom Type).
 *
 * IMPORTANT — what this number is, and is not.
 *
 * This is the average rent across *occupied* units in the surveyed stock. In a
 * province where the TAL constrains increases on sitting tenants, that average
 * sits well below what the same unit asks on turnover. So a building priced
 * against this figure is not "at market" in the listing sense — it is at the
 * survey average, which is the honest benchmark for judging whether existing
 * leases are under-set. Do not present it as achievable asking rent; the
 * calculator keeps `marketRent` (turnover asking) as a separate input.
 *
 * Reliability codes are CMHC's own: a excellent, b very good, c good,
 * d use with caution. They are carried through to the UI rather than dropped,
 * because a `d` on a thin sample deserves visible hedging.
 *
 * Values CMHC suppressed (**) for confidentiality or reliability fall back to
 * the next-coarser geography, and finally to the CMA average. The geography
 * actually used travels with every lookup so the UI can name it.
 *
 * Source: https://www03.cmhc-schl.gc.ca/hmip-pimh/en/TableMapChart/TableMatchingCriteria
 *         ?GeographyType=MetropolitanMajorArea&GeographyId=1060
 *         &CategoryLevel1=Primary+Rental+Market&CategoryLevel2=Average+Rent+($)
 */

export const CMHC_SURVEY_LABEL = "SCHL, Enquête sur les logements locatifs";
export const CMHC_SURVEY_LABEL_EN = "CMHC Rental Market Survey";
export const CMHC_SURVEY_PERIOD = "octobre 2025";
export const CMHC_SURVEY_PERIOD_EN = "October 2025";
export const CMHC_SURVEY_URL =
  "https://www03.cmhc-schl.gc.ca/hmip-pimh/en/TableMapChart/TableMatchingCriteria?GeographyType=MetropolitanMajorArea&GeographyId=1060&CategoryLevel1=Primary+Rental+Market&CategoryLevel2=Average+Rent+%28%24%29&ColumnField=2&RowField=24";

/** CMHC's estimate-quality code. `d` means the sample is thin — show a warning. */
export type CmhcReliability = "a" | "b" | "c" | "d";

export type CmhcGeoLevel = "neighbourhood" | "zone" | "cma";

/** Which CMHC column a unit falls in, keyed by bedroom count. */
export type CmhcBedroomBucket = "studio" | "br1" | "br2" | "br3plus";

export interface CmhcRentPoint {
  rent: number;
  reliability: CmhcReliability;
  /** CMHC's own name for the geography this figure describes. */
  geography: string;
  level: CmhcGeoLevel;
}

/** One bucket per bedroom count; null where CMHC suppressed the estimate. */
type BucketRow = Partial<Record<CmhcBedroomBucket, [number, CmhcReliability]>>;

interface AreaEntry {
  /** Geography name to show when the neighbourhood/zone figure is used. */
  geography: string;
  level: CmhcGeoLevel;
  rents: BucketRow;
  /**
   * Buckets CMHC suppressed at `level`, backfilled from the enclosing survey
   * zone. Kept separate so the UI can say which geography each figure is from.
   */
  zoneFallback?: { geography: string; rents: BucketRow };
  note?: string;
}

/** Montréal CMA totals — the last resort when every finer geography is suppressed. */
const CMA: Record<CmhcBedroomBucket, [number, CmhcReliability]> = {
  studio: [1005, "a"],
  br1: [1131, "a"],
  br2: [1346, "a"],
  br3plus: [1625, "a"],
};

const CMA_GEOGRAPHY = "Montréal RMR";

/**
 * Keyed by AREAS key in calculator.ts. Neighbourhood-level where CMHC publishes
 * one that matches the area; survey zone where the calculator's area spans
 * several neighbourhoods (rdp-pat, blainville/rosemère).
 */
const AREA_RENTS: Record<string, AreaEntry> = {
  // ── Montréal ──
  plateau: {
    geography: "Plateau-Mont-Royal", level: "neighbourhood",
    rents: { studio: [1083, "b"], br1: [1298, "b"] },
    note: "2 et 3 chambres supprimés par la SCHL",
  },
  rosemont: {
    geography: "Rosemont/La Petite-Patrie", level: "neighbourhood",
    rents: { studio: [1010, "c"], br1: [1055, "d"], br2: [1348, "c"], br3plus: [1750, "c"] },
  },
  "sud-ouest": {
    geography: "South West", level: "neighbourhood",
    rents: { studio: [1190, "d"], br1: [1250, "d"], br2: [1563, "d"], br3plus: [1623, "d"] },
  },
  verdun: {
    geography: "Verdun", level: "neighbourhood",
    rents: { studio: [796, "c"], br1: [1105, "b"], br2: [1217, "c"], br3plus: [1534, "c"] },
  },
  "cdn-ndg": {
    geography: "Côte-des-Neiges", level: "neighbourhood",
    rents: { studio: [960, "b"], br1: [1123, "b"], br2: [1349, "b"], br3plus: [1872, "d"] },
    note: "CDN et NDG sont deux secteurs SCHL distincts; NDG est plus bas",
  },
  villeray: {
    geography: "Villeray", level: "neighbourhood",
    rents: { studio: [906, "c"], br1: [1019, "b"], br2: [1504, "d"] },
  },
  "saint-laurent": {
    geography: "Saint-Laurent", level: "neighbourhood",
    rents: { studio: [903, "a"], br1: [1163, "a"], br2: [1365, "a"], br3plus: [2125, "c"] },
  },
  ahuntsic: {
    geography: "Ahuntsic", level: "neighbourhood",
    rents: { studio: [779, "c"], br1: [937, "b"], br2: [1290, "b"], br3plus: [1393, "c"] },
  },
  hochelaga: {
    geography: "Hochelaga-Maisonneuve", level: "neighbourhood",
    rents: { studio: [901, "b"], br1: [1142, "b"], br2: [1333, "c"] },
    zoneFallback: { geography: "Hochelaga-Maisonneuve (zone)", rents: { br3plus: [1641, "d"] } },
  },
  lasalle: {
    geography: "LaSalle", level: "neighbourhood",
    rents: { studio: [862, "b"], br1: [1086, "a"], br2: [1349, "b"], br3plus: [1698, "c"] },
  },
  anjou: {
    geography: "Anjou", level: "neighbourhood",
    rents: { studio: [708, "b"], br1: [764, "c"], br2: [1049, "d"] },
  },
  "saint-leonard": {
    geography: "Saint-Léonard", level: "neighbourhood",
    rents: { br1: [1006, "c"], br2: [1258, "b"] },
    zoneFallback: { geography: "Anjou/Saint-Léonard (zone)", rents: { studio: [690, "c"] } },
  },
  lachine: {
    geography: "Lachine", level: "neighbourhood",
    rents: { studio: [919, "d"], br1: [904, "b"], br2: [1089, "b"] },
  },
  "rdp-pat": {
    geography: "Pte-aux-Trembles/Montréal-Est", level: "zone",
    rents: { studio: [763, "b"], br1: [977, "a"], br2: [1179, "b"], br3plus: [1629, "c"] },
    note: "RDP et PAT sont regroupés dans la zone SCHL",
  },
  "montreal-nord": {
    geography: "Montréal-Nord", level: "neighbourhood",
    rents: { studio: [801, "b"], br1: [1050, "b"], br2: [1126, "b"] },
  },

  // ── Rive-Sud ──
  "saint-lambert": {
    geography: "Saint-Lambert", level: "neighbourhood",
    rents: { studio: [1074, "c"], br1: [1372, "b"], br2: [1600, "c"], br3plus: [2525, "d"] },
  },
  boucherville: {
    geography: "Boucherville", level: "neighbourhood",
    rents: { br2: [1542, "d"], br3plus: [1476, "c"] },
    zoneFallback: {
      geography: "Boucherville/Brossard (zone)",
      rents: { studio: [971, "c"], br1: [1207, "b"] },
    },
  },
  "saint-bruno": {
    geography: "Saint-Bruno-de-Montarville", level: "neighbourhood",
    rents: { br2: [1311, "b"] },
    zoneFallback: {
      geography: "Boucherville/Brossard (zone)",
      rents: { studio: [971, "c"], br1: [1207, "b"], br3plus: [1635, "b"] },
    },
  },
  brossard: {
    geography: "Brossard", level: "neighbourhood",
    rents: { br1: [1328, "b"], br2: [1534, "c"], br3plus: [1475, "d"] },
    zoneFallback: { geography: "Boucherville/Brossard (zone)", rents: { studio: [971, "c"] } },
  },
  candiac: {
    geography: "Candiac", level: "neighbourhood",
    rents: { studio: [802, "a"], br1: [1440, "c"], br2: [1942, "b"] },
    zoneFallback: { geography: "Beauharnois/La Prairie (zone)", rents: { br3plus: [1596, "c"] } },
  },
  "la-prairie": {
    geography: "La Prairie", level: "neighbourhood",
    rents: { br1: [1193, "c"], br2: [1164, "d"] },
    zoneFallback: {
      geography: "Beauharnois/La Prairie (zone)",
      rents: { studio: [1112, "a"], br3plus: [1596, "c"] },
    },
  },
  longueuil: {
    geography: "Longueuil", level: "neighbourhood",
    rents: { studio: [995, "c"], br1: [1106, "b"], br2: [1194, "b"], br3plus: [1494, "c"] },
  },
  chambly: {
    geography: "Carignan/Chambly", level: "neighbourhood",
    rents: { br1: [786, "d"], br2: [1375, "c"], br3plus: [1391, "c"] },
  },
  "saint-hubert": {
    geography: "Saint-Hubert", level: "neighbourhood",
    rents: { studio: [924, "d"], br1: [1271, "c"], br2: [1393, "d"] },
    zoneFallback: { geography: "Longueuil (zone)", rents: { br3plus: [1494, "c"] } },
  },
  "greenfield-park": {
    geography: "Greenfield Park", level: "neighbourhood",
    rents: { studio: [775, "c"], br1: [1064, "b"], br2: [1418, "b"], br3plus: [1649, "c"] },
  },

  // ── Laval & couronne nord ──
  laval: {
    geography: CMA_GEOGRAPHY, level: "cma",
    rents: {},
    note: "Laval couvre 6 zones SCHL (Chomedey, Laval-des-Rapides, Pont-Viau, Vimont/Auteuil, Laval-Ouest, St-François) sans total publié; moyenne RMR utilisée",
  },
  rosemere: {
    geography: "Blainville/Sainte-Thérèse", level: "zone",
    rents: { br1: [1162, "b"], br2: [1300, "b"], br3plus: [1483, "b"] },
  },
  blainville: {
    geography: "Blainville/Sainte-Thérèse", level: "zone",
    rents: { br1: [1162, "b"], br2: [1300, "b"], br3plus: [1483, "b"] },
  },
  boisbriand: {
    geography: "Boisbriand", level: "neighbourhood",
    rents: { br1: [1288, "c"], br2: [1233, "c"] },
    zoneFallback: { geography: "Blainville/Sainte-Thérèse (zone)", rents: { br3plus: [1483, "b"] } },
  },
  mirabel: {
    geography: "Mirabel/Saint-Placide", level: "neighbourhood",
    rents: { br1: [1444, "d"], br2: [1379, "c"], br3plus: [1569, "d"] },
    zoneFallback: { geography: "Mirabel/Oka/Pointe-Calumet (zone)", rents: { studio: [833, "c"] } },
  },
  terrebonne: {
    geography: "Terrebonne", level: "neighbourhood",
    rents: { studio: [876, "c"], br1: [1181, "c"], br2: [1327, "c"], br3plus: [1484, "d"] },
  },
  mascouche: {
    geography: "Mascouche", level: "neighbourhood",
    rents: { br1: [1295, "b"], br2: [1750, "b"], br3plus: [1939, "c"] },
    zoneFallback: { geography: "Mascouche/Terrebonne (zone)", rents: { studio: [1099, "a"] } },
  },
  "saint-eustache": {
    geography: "Saint-Eustache", level: "neighbourhood",
    rents: { studio: [719, "d"], br1: [912, "b"], br2: [1078, "c"], br3plus: [1445, "c"] },
  },
  repentigny: {
    geography: "Repentigny", level: "neighbourhood",
    rents: { studio: [784, "a"], br1: [1123, "c"], br2: [1268, "c"] },
    zoneFallback: { geography: "L'Assomption/Lavaltrie (zone)", rents: { br3plus: [1455, "c"] } },
  },
};

/** Maps a unit's bedroom count onto the CMHC column that covers it. */
export function bedroomBucket(bedrooms: number): CmhcBedroomBucket {
  if (bedrooms <= 0) return "studio";
  if (bedrooms === 1) return "br1";
  if (bedrooms === 2) return "br2";
  return "br3plus";
}

/**
 * CMHC average rent for an area and unit size, walking
 * neighbourhood → survey zone → CMA until it finds a published figure.
 */
export function lookupCmhcRent(areaKey: string, bedrooms: number): CmhcRentPoint {
  const bucket = bedroomBucket(bedrooms);
  const entry = AREA_RENTS[areaKey];

  const direct = entry?.rents[bucket];
  if (direct) {
    return { rent: direct[0], reliability: direct[1], geography: entry.geography, level: entry.level };
  }

  const viaZone = entry?.zoneFallback?.rents[bucket];
  if (viaZone && entry?.zoneFallback) {
    return {
      rent: viaZone[0], reliability: viaZone[1],
      geography: entry.zoneFallback.geography, level: "zone",
    };
  }

  const [rent, reliability] = CMA[bucket];
  return { rent, reliability, geography: CMA_GEOGRAPHY, level: "cma" };
}

/** True when CMHC flagged the estimate as thin enough to warrant caution. */
export function isLowReliability(r: CmhcReliability): boolean {
  return r === "d";
}

export function getAreaNote(areaKey: string): string | undefined {
  return AREA_RENTS[areaKey]?.note;
}

/** Areas with a CMHC figure of their own, for tests and coverage checks. */
export function cmhcCoveredAreas(): string[] {
  return Object.keys(AREA_RENTS);
}
