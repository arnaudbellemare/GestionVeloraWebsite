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
export const RETIRED_LOCATION_REDIRECTS: Record<string, LocationRedirectTarget> = {};
export const RETIRED_LOCATION_GONE: readonly string[] = [];

const gone = new Set(RETIRED_LOCATION_GONE);

export function isRetiredLocationSlug(slug: string): boolean {
  return Boolean(RETIRED_LOCATION_REDIRECTS[slug]) || gone.has(slug);
}

export function isGoneLocationSlug(slug: string): boolean {
  return gone.has(slug);
}
