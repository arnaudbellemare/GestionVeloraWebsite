/**
 * Routes whose slug differs between locales.
 *
 * Almost every page on the site shares one slug across languages, so switching
 * locale is just adding or removing the /en prefix. These pages do not: their
 * slugs carry the keywords each language actually gets searched with, so the
 * switcher has to translate the path as well as the prefix.
 *
 * Deliberately dependency-free. The language switcher, the page data module and
 * the prerender script all read from here, so the pairs can never drift apart.
 * EN paths are stored WITHOUT the /en prefix, matching what
 * getPathWithoutLocale() returns.
 */
export const LOCALIZED_ROUTE_PAIRS: ReadonlyArray<readonly [fr: string, en: string]> = [
  ["/calculateur-rendement-plex-montreal", "/montreal-plex-investment-calculator"],
  ["/guide-achat-plex-montreal", "/montreal-plex-buyer-guide"],
] as const;

/**
 * Maps a locale-stripped path to its equivalent in the target locale.
 * Paths that are not locale-specific pass straight through.
 */
export function translateRoute(pathWithoutLocale: string, target: "fr" | "en"): string {
  const path = pathWithoutLocale.replace(/\/+$/, "") || "/";
  for (const [fr, en] of LOCALIZED_ROUTE_PAIRS) {
    if (path === fr || path === en) return target === "en" ? en : fr;
  }
  return pathWithoutLocale;
}
