import type { TFunction } from "i18next";

export type ServiceSlug = "syndicat-copropriete" | "airbnb" | "location" | "gestion-condo" | "gestion-copropriete";
type ServiceOffering = { title: string; items: string[]; detailItems?: string[] };

/** One distinct hero image per service (hub cards + service detail heroes). */
const SERVICE_IMAGES: Record<ServiceSlug, string> = {
  "syndicat-copropriete": "/images/portfolio/syndicat-enticy.webp",
  airbnb: "/images/airbnb-service.webp",
  location: "/hero-gestion-velora-1200.webp",
  "gestion-condo": "/images/portfolio/le-beaumont.webp",
  "gestion-copropriete": "/images/portfolio/syndicat-enticy.webp",
};

export const SERVICE_MOBILE_IMAGES: Record<ServiceSlug, string> = {
  "syndicat-copropriete": "/images/portfolio/syndicat-enticy-card.webp",
  airbnb: "/images/airbnb-service.webp",
  location: "/hero-gestion-velora-800.webp",
  "gestion-condo": "/images/portfolio/le-beaumont-card.webp",
  "gestion-copropriete": "/images/portfolio/syndicat-enticy-card.webp",
};

/** `/location/...` landing heroes: reuse service art where it matches intent; commercial stays distinct. */
export const LOCATION_LANDING_SERVICE_IMAGES: Record<string, string> = {
  "syndicat-copropriete": SERVICE_IMAGES["syndicat-copropriete"],
  "gestion-locative": SERVICE_IMAGES.location,
  "gestion-airbnb": SERVICE_IMAGES.airbnb,
  "conformite-loi-16": "/images/portfolio/le-beaumont.webp",
  "gestion-immobiliere-commerciale": "/hero-gestion-velora-1200.webp",
};

export const SERVICE_SLUGS: ServiceSlug[] = [
  "syndicat-copropriete",
  "airbnb",
  "location",
  "gestion-condo",
  "gestion-copropriete",
];

export function getLocalizedService(slug: ServiceSlug, t: TFunction) {
  const base = `services.${slug}`;
  const offerings = (t(`${base}.offerings`, {
    returnObjects: true,
  }) as ServiceOffering[]) || [];
  return {
    slug,
    title: t(`${base}.title`),
    subtitle: t(`${base}.subtitle`),
    metaTitle: t(`${base}.metaTitle`),
    metaDescription: t(`${base}.metaDescription`),
    image: SERVICE_IMAGES[slug],
    mobileImage: SERVICE_MOBILE_IMAGES[slug],
    description: t(`${base}.description`),
    offerings,
  };
}

export function getLocalizedServices(t: TFunction) {
  return SERVICE_SLUGS.map((slug) => getLocalizedService(slug, t));
}
