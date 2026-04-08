import type { TFunction } from "i18next";

export type ServiceSlug = "syndicat-copropriete" | "airbnb" | "location";
type ServiceOffering = { title: string; items: string[]; detailItems?: string[] };

const SERVICE_IMAGES: Record<ServiceSlug, string> = {
  "syndicat-copropriete":
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85",
  airbnb: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=85",
  location: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=85",
};

export const SERVICE_SLUGS: ServiceSlug[] = [
  "syndicat-copropriete",
  "airbnb",
  "location",
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
    image: SERVICE_IMAGES[slug],
    description: t(`${base}.description`),
    offerings,
  };
}

export function getLocalizedServices(t: TFunction) {
  return SERVICE_SLUGS.map((slug) => getLocalizedService(slug, t));
}
