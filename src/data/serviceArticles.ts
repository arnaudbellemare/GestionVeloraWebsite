import { blogPosts } from "./blog";
import type { ServiceSlug } from "./services";

const ARTICLE_SLUGS: Record<ServiceSlug, string[]> = {
  "syndicat-copropriete": ["checklist-loi-16-syndicat-copropriete", "erreurs-syndicats-autogeres-loi-16", "cout-gestionnaire-copropriete-montreal"],
  "gestion-condo": ["fonds-prevoyance-copropriete-quebec", "gestion-condo-autogestion-ou-gestionnaire", "cout-gestionnaire-copropriete-montreal"],
  "gestion-copropriete": ["fonds-prevoyance-copropriete-quebec", "gestion-condo-autogestion-ou-gestionnaire", "cout-gestionnaire-copropriete-montreal"],
  airbnb: ["airbnb-montreal-permis-reglementation"],
  location: ["bail-logement-quebec-guide-complet-proprietaires", "augmentation-loyer-montreal-regles-calcul-tal"],
};

export function getServiceArticles(slug: string) {
  const slugs = ARTICLE_SLUGS[slug as ServiceSlug] ?? [];
  return slugs.flatMap((articleSlug) => {
    const article = blogPosts.find((post) => post.slug === articleSlug);
    return article ? [article] : [];
  });
}
