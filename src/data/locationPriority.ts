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

const SERVICE_WEIGHTS: Record<string, number> = {
  "syndicat-copropriete": 10,
  "gestion-locative": 9,
  "gestion-airbnb": 8,
  "gestion-immobiliere-commerciale": 6,
};

const BEST_INTENT_WEIGHTS: Record<string, number> = {
  "syndicat-copropriete": 10,
  "gestion-locative": 9,
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

const PRIORITY_LOCATION_SLUGS = Array.from(
  new Set(
    (["fr", "en"] as const)
      .flatMap((locale) =>
        LOCATION_SERVICES.flatMap((service) =>
          CITIES.map((city) => ({
            slug: `${service.slug}-${city.slug}`,
            route:
              locale === "fr"
                ? `/location/${service.slug}-${city.slug}`
                : `/en/location/${service.slug}-${city.slug}`,
            score: locationSeoScore(service.slug, city.slug),
          }))
        )
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, PRIORITY_LOCATION_ROUTE_LIMIT)
      .map((entry) => entry.slug)
  )
);

const PRIORITY_LOCATION_SLUG_SET = new Set(PRIORITY_LOCATION_SLUGS);

export function getPriorityLocationSlugs(): string[] {
  return PRIORITY_LOCATION_SLUGS;
}

export function isPriorityLocationSlug(slug: string): boolean {
  return PRIORITY_LOCATION_SLUG_SET.has(slug);
}
