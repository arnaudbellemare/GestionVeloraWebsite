export interface LocationRedirectTarget {
  fr: string;
  en: string;
}

/**
 * Evidence-reviewed location retirements only.
 *
 * Populate these after running the GSC/backlink/conversion evaluation. Keeping
 * the policy in source makes prerendering, SPA resolution, and edge handling
 * share one durable decision instead of relying on noindex alone.
 */
export const RETIRED_LOCATION_REDIRECTS: Record<string, LocationRedirectTarget> = {
  // Retired 2026-10-14. The City of Montréal prohibits renting a principal
  // residence to tourists in these three boroughs
  // (https://montreal.ca/demarches/louer-sa-residence-principale-des-touristes,
  // updated 2026-09-11). Lachine also prohibits tourist rental of any dwelling
  // under 31 days (https://montreal.ca/articles/hebergement-touristique-lachine-87046);
  // Saint-Léonard prohibits commercial tourist residences across the borough;
  // the City's commercial page lists no permitted sector in Saint-Laurent
  // (https://montreal.ca/demarches/exploiter-une-residence-de-tourisme-commerciale,
  // updated 2026-09-10). A page selling Airbnb management there had no lawful
  // form of the service to describe, so it now 301s to the service page, which
  // states the borough prohibitions.
  "gestion-airbnb-lachine": { fr: "/services/airbnb", en: "/en/services/airbnb" },
  "gestion-airbnb-saint-laurent": { fr: "/services/airbnb", en: "/en/services/airbnb" },
  "gestion-airbnb-saint-leonard": { fr: "/services/airbnb", en: "/en/services/airbnb" },
};
export const RETIRED_LOCATION_GONE: readonly string[] = [];

const gone = new Set(RETIRED_LOCATION_GONE);

export function isRetiredLocationSlug(slug: string): boolean {
  return Boolean(RETIRED_LOCATION_REDIRECTS[slug]) || gone.has(slug);
}

export function isGoneLocationSlug(slug: string): boolean {
  return gone.has(slug);
}
