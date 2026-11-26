import { CITIES, LOCATION_SERVICES } from "./locations";
import { isRetiredLocationSlug } from "./locationRoutePolicy";

const CITY_WEIGHTS: Record<string, number> = {
  montreal: 10,
  laval: 9,
  longueuil: 9,
  brossard: 8,
  terrebonne: 7,
  repentigny: 7,
  boucherville: 7,
  "saint-lambert": 7,
  "saint-bruno-de-montarville": 7,
  "sainte-julie": 6,
  blainville: 6,
  mirabel: 6,
  boisbriand: 6,
  "saint-eustache": 6,
  westmount: 6,
  "saint-laurent": 6,
  "plateau-mont-royal": 6,
  "ville-marie": 6,
  verdun: 5,
  lasalle: 5,
  // Added 2026-11-24: the owner confirmed these are served. Each page carries
  // its own census section (syndicateLocalProfiles.ts), not only the template.
  "saint-jerome": 5,
  "saint-hyacinthe": 5,
  chateauguay: 5,
};

/**
 * Rough standing by search volume. A service missing from this table scores
 * zero here, which is enough on its own to keep every one of its pages out of
 * the indexable set — conformite-loi-16 sat at zero until 2026-08-07 for that
 * reason alone, not by decision.
 */
const SERVICE_WEIGHTS: Record<string, number> = {
  "syndicat-copropriete": 10,
  "gestion-locative": 9,
  "gestion-airbnb": 8,
  // Narrower volume than the parent syndicat term it belongs to, but wider
  // than commercial: every syndicat in the province carries these obligations.
  "conformite-loi-16": 7,
  "gestion-immobiliere-commerciale": 6,
};

/**
 * Commercial intent, which is not the same ranking as volume.
 *
 * conformite-loi-16 sits a full tier above its volume weight: a board
 * searching it has statutory obligations and deadlines running to 2027, so the
 * query carries far more buying intent per visit than its traffic implies.
 * Deliberately not equal to gestion-airbnb's 120-point total — a tie would be
 * resolved by declaration order in LOCATION_SERVICES, which is not a decision.
 */
const BEST_INTENT_WEIGHTS: Record<string, number> = {
  "syndicat-copropriete": 10,
  "gestion-locative": 9,
  "conformite-loi-16": 9,
  "gestion-airbnb": 8,
  "gestion-immobiliere-commerciale": 6,
};

/**
 * Per-service overrides on CITY_WEIGHTS.
 *
 * Sparse on purpose. CITY_WEIGHTS is service-agnostic, which is usually fine —
 * a dense, expensive borough is a good market for most of these services at
 * once. An entry belongs here only where something verifiable makes one service
 * materially weaker or stronger in one city than the shared weight implies.
 * A hunch about which neighbourhood "feels" strong for a service is not enough;
 * that is how invented statistics get encoded as if they were measured.
 */
const SERVICE_CITY_WEIGHTS: Record<string, Record<string, number>> = {
  "gestion-airbnb": {
    // These three slugs were retired on 2026-10-14 (301 to the Airbnb
    // service page; see locationRoutePolicy.ts for the sources). The weights
    // stay so the ranking cannot pull them back into a priority slot if the
    // retirement list is ever edited.
    lachine: 1,
    "saint-laurent": 1,
    "saint-leonard": 1,
  },
};

/**
 * Only syndicate pages are indexable, and only for the 23 cities in
 * CITY_WEIGHTS (Saint-Jérôme, Saint-Hyacinthe and Châteauguay added 2026-11-24),
 * minus any retired slug (Montréal since 2026-11-21: the syndicate service page
 * covers it), so 22 pages (every other city scores 4, so the top 23 syndicate slugs are
 * exactly those). Decided 2026-10-14: Gestion Velora is a syndicate
 * specialist, and the location template is identical from city to city once
 * the name is swapped, so 150 indexable pages read as filler. Every other
 * location page still renders, with `noindex, follow`, and stays out of the
 * sitemap. Raise the limit only for a city whose page carries real local
 * detail.
 */
const INDEXABLE_LOCATION_SERVICES: ReadonlySet<string> = new Set(["syndicat-copropriete"]);

export const PRIORITY_LOCATION_ROUTE_LIMIT = 23;

/**
 * Non-syndicate pages indexed one by one, on evidence, outside the ranking.
 *
 * gestion-immobiliere-commerciale-ville-marie (2026-11-26): it ranked at
 * position 6.3 for "gestion immobilière ville-marie" while still noindex, and
 * the owner confirmed Gestion Velora takes commercial mandates and serves
 * Montréal. Downtown Ville-Marie is where commercial buildings concentrate.
 */
const INDIVIDUALLY_INDEXED_LOCATION_SLUGS: readonly string[] = ["gestion-immobiliere-commerciale-ville-marie"];

function cityWeight(citySlug: string, serviceSlug?: string): number {
  if (serviceSlug) {
    const override = SERVICE_CITY_WEIGHTS[serviceSlug]?.[citySlug];
    if (override !== undefined) return override;
  }
  return CITY_WEIGHTS[citySlug] ?? 4;
}

function serviceWeight(serviceSlug: string): number {
  return SERVICE_WEIGHTS[serviceSlug] ?? 0;
}

function intentWeight(serviceSlug: string): number {
  return BEST_INTENT_WEIGHTS[serviceSlug] ?? 0;
}

export function locationSeoScore(serviceSlug: string, citySlug: string): number {
  return cityWeight(citySlug, serviceSlug) * 10
    + serviceWeight(serviceSlug) * 10
    + intentWeight(serviceSlug) * 5;
}

// The limit counts slugs, not slug x locale rows. Each slug is scored once and
// deduped *before* the slice; ranking rows per locale first would let the fr/en
// pair of the same slug consume two seats and silently halve the
// indexable set.
const PRIORITY_LOCATION_SLUGS = Array.from(
  new Set(
    LOCATION_SERVICES.filter((service) => INDEXABLE_LOCATION_SERVICES.has(service.slug)).flatMap((service) =>
      CITIES.map((city) => ({
        slug: `${service.slug}-${city.slug}`,
        score: locationSeoScore(service.slug, city.slug),
      }))
    )
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.slug)
  )
)
  .slice(0, PRIORITY_LOCATION_ROUTE_LIMIT)
  // Filter retired slugs after the cut, not before: removing one must not
  // promote the next-ranked city into the indexable set (every city outside
  // CITY_WEIGHTS ties at 4, so declaration order would pick it).
  .filter((slug) => !isRetiredLocationSlug(slug))
  .concat(INDIVIDUALLY_INDEXED_LOCATION_SLUGS);

const PRIORITY_LOCATION_SLUG_SET = new Set(PRIORITY_LOCATION_SLUGS);

export function getPriorityLocationSlugs(): string[] {
  return PRIORITY_LOCATION_SLUGS;
}

export function isPriorityLocationSlug(slug: string): boolean {
  return PRIORITY_LOCATION_SLUG_SET.has(slug);
}
