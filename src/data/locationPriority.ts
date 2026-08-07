import { CITIES, LOCATION_SERVICES } from "./locations";

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

export const PRIORITY_LOCATION_ROUTE_LIMIT = 100;

function cityWeight(citySlug: string): number {
  return CITY_WEIGHTS[citySlug] ?? 4;
}

function serviceWeight(serviceSlug: string): number {
  return SERVICE_WEIGHTS[serviceSlug] ?? 0;
}

function intentWeight(serviceSlug: string): number {
  return BEST_INTENT_WEIGHTS[serviceSlug] ?? 0;
}

export function locationSeoScore(serviceSlug: string, citySlug: string): number {
  return cityWeight(citySlug) * 10 + serviceWeight(serviceSlug) * 10 + intentWeight(serviceSlug) * 5;
}

// The limit counts slugs, not slug x locale rows. Each slug is scored once and
// deduped *before* the slice; ranking rows per locale first would let the fr/en
// pair of the same slug consume two of the 100 seats and silently halve the
// indexable set.
const PRIORITY_LOCATION_SLUGS = Array.from(
  new Set(
    LOCATION_SERVICES.flatMap((service) =>
      CITIES.map((city) => ({
        slug: `${service.slug}-${city.slug}`,
        score: locationSeoScore(service.slug, city.slug),
      }))
    )
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.slug)
  )
).slice(0, PRIORITY_LOCATION_ROUTE_LIMIT);

const PRIORITY_LOCATION_SLUG_SET = new Set(PRIORITY_LOCATION_SLUGS);

export function getPriorityLocationSlugs(): string[] {
  return PRIORITY_LOCATION_SLUGS;
}

export function isPriorityLocationSlug(slug: string): boolean {
  return PRIORITY_LOCATION_SLUG_SET.has(slug);
}
