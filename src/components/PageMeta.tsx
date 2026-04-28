import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE, SITE_URL } from "../config";
import { getPostBySlug } from "../data/blog";
import { getComparisonBySlug } from "../data/comparisons";
import { getLocalizedService, SERVICE_SLUGS, type ServiceSlug } from "../data/services";

const _TITLE_SUFFIX = " | Gestion Velora";
const _TITLE_MAX = 70;

function buildTitle(headline: string): string {
  const withSuffix = `${headline}${_TITLE_SUFFIX}`;
  if (withSuffix.length <= _TITLE_MAX) return withSuffix;
  if (headline.length <= _TITLE_MAX) return headline;
  const cut = headline.slice(0, _TITLE_MAX - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut) + "…";
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function PageMeta() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const isEn = locale === "en";
  const baseTitle = isEn ? "Property Management Montreal | Gestion Velora" : "Gestion immobilière Montréal | Gestion Velora";
  const baseDesc = isEn
    ? "Montreal property operations for condo boards, short-term rentals, and long-term rentals. Transparent reporting, 24/7 support, and proactive maintenance."
    : "Gestion Velora accompagne syndicats, locations courte duree et locations longue duree a Montreal avec des rapports transparents, une equipe 24/7 et une maintenance proactive.";

  useEffect(() => {
    document.documentElement.lang = isEn ? "en-CA" : "fr-CA";

    let title = baseTitle;
    let description = baseDesc;
    let ogImage = DEFAULT_OG_IMAGE;
    let twitterImage = DEFAULT_TWITTER_IMAGE;
    const url = SITE_URL + (pathname === "/" || pathname === "/en" || pathname === "/en/" ? "/" : pathname);

    const isServicesHub =
      pathname === "/services" ||
      pathname === "/en/services" ||
      pathname === "/en/services/";

    if (isServicesHub) {
      title = t("servicesHub.metaTitle");
      description = t("servicesHub.metaDescription");
    } else if (pathname === "/compare" || pathname === "/en/compare") {
      title = isEn
        ? "Property Management Comparison Guides | Gestion Velora"
        : "Guides comparatifs en gestion immobiliere | Gestion Velora";
      description = isEn
        ? "Side-by-side comparisons of key property management models in Montreal for condo boards, landlords, and investors."
        : "Comparatifs clairs entre les principaux modeles de gestion immobiliere a Montreal: autogestion, gestion professionnelle, location courte et longue duree.";
    } else if (pathname.startsWith("/compare/") || pathname.startsWith("/en/compare/")) {
      const compareSlug = pathname.split("/").filter(Boolean).pop();
      const page = compareSlug ? getComparisonBySlug(compareSlug) : null;
      if (page) {
        title = buildTitle(isEn ? page.titleEn : page.titleFr);
        description = isEn ? page.descriptionEn : page.descriptionFr;
      }
    } else if (pathname === "/locations" || pathname === "/en/locations") {
      title = isEn
        ? "City Property Management Pages | Gestion Velora"
        : "Pages locales gestion immobiliere | Gestion Velora";
      description = isEn
        ? "Local property management pages by city across Greater Montreal for condo boards, rentals, and Airbnb operations."
        : "Pages locales de gestion immobiliere par ville du Grand Montreal: copropriete, location et Airbnb.";
    } else if (pathname.startsWith("/services/") || pathname.startsWith("/en/services/")) {
      if (slug && SERVICE_SLUGS.includes(slug as ServiceSlug)) {
        const service = getLocalizedService(slug as ServiceSlug, t);
        title = buildTitle(service.title);
        description = service.description;
        ogImage = service.image;
        twitterImage = service.image;
      }
    } else if (pathname === "/blog" || pathname === "/en/blog" || pathname === "/en/blog/") {
      title = isEn ? "Condo, Airbnb & Rental Insights Montreal | Gestion Velora" : "Blog copropriété, Airbnb et location | Gestion Velora";
      description = isEn
        ? "Practical articles on property management in Montreal: condo compliance, preventive maintenance, NOI optimization, Airbnb regulation."
        : "Articles pratiques sur la gestion immobilière à Montréal : conformité copropriété, maintenance préventive, optimisation du NOI, réglementation Airbnb.";
    } else if (pathname.startsWith("/blog/") || pathname.startsWith("/en/blog/")) {
      if (slug) {
        const post = getPostBySlug(slug, locale);
        if (post) {
          title = buildTitle(post.metaTitle ?? post.title);
          description = post.excerpt;
          ogImage = post.image;
          twitterImage = post.image;
        }
      } else {
        title = isEn ? "Condo, Airbnb & Rental Insights Montreal | Gestion Velora" : "Blog copropriété, Airbnb et location | Gestion Velora";
        description = isEn
          ? "Practical articles on property management in Montreal: condo compliance, preventive maintenance, NOI optimization, Airbnb regulation."
          : "Articles pratiques sur la gestion immobilière à Montréal : conformité copropriété, maintenance préventive, optimisation du NOI, réglementation Airbnb.";
      }
    } else if (pathname === "/privacy" || pathname === "/en/privacy") {
      title = isEn ? "Privacy | Gestion Velora" : "Confidentialité | Gestion Velora";
      description = baseDesc;
    }

    document.title = title;
    setMeta("description", description);
    setMeta("twitter:card", "summary_large_image");
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", url, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:locale", isEn ? "en_CA" : "fr_CA", true);
    setMeta("og:locale:alternate", isEn ? "fr_CA" : "en_CA", true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:url", url);
    setMeta("twitter:image", twitterImage);
  }, [pathname, slug, locale, t]);

  return null;
}
