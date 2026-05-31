import type { TFunction } from "i18next";

export type ServiceSlug = "syndicat-copropriete" | "airbnb" | "location" | "gestion-condo" | "gestion-copropriete";
type ServiceOffering = { title: string; items: string[]; detailItems?: string[] };

/** One distinct hero image per service (hub cards + service detail heroes). */
const SERVICE_IMAGES: Record<ServiceSlug, string> = {
  "syndicat-copropriete": "/images/portfolio/syndicat-enticy.webp",
  airbnb: "/images/airbnb-service.webp",
  location:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1280&fm=webp&q=80",
  "gestion-condo": "/images/portfolio/le-beaumont.webp",
  "gestion-copropriete":
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1280&fm=webp&q=80",
};

/** `/location/...` landing heroes: reuse service art where it matches intent; commercial stays distinct. */
export const LOCATION_LANDING_SERVICE_IMAGES: Record<string, string> = {
  "syndicat-copropriete": SERVICE_IMAGES["syndicat-copropriete"],
  "gestion-locative": SERVICE_IMAGES.location,
  "gestion-airbnb": SERVICE_IMAGES.airbnb,
  "conformite-loi-16":
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1280&fm=webp&q=80",
  "gestion-immobiliere-commerciale":
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&fm=webp&q=80",
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
    description: t(`${base}.description`),
    offerings,
  };
}

export function getLocalizedServices(t: TFunction) {
  return SERVICE_SLUGS.map((slug) => getLocalizedService(slug, t));
}
