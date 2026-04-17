import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER_IMAGE, SITE_URL } from "../config";
import { getPostBySlug } from "../data/blog";
import { getLocalizedService, SERVICE_SLUGS, type ServiceSlug } from "../data/services";

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
  const baseTitle = isEn ? "Gestion Velora | Property Management Montreal" : "Gestion Velora | Gestion immobilière à Montréal";
  const baseDesc = isEn
    ? "Leading property management Montreal: condo management, Airbnb management, rental management. 98% occupancy, 24/7 support, full transparency."
    : "Votre tranquillité. Notre affaire. Gestion Velora offre syndicat de copropriété, gestion Airbnb et location longue durée à Montréal. Administration complète, maintenance proactive et rapports transparents.";

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
    } else if (pathname.startsWith("/services/") || pathname.startsWith("/en/services/")) {
      if (slug && SERVICE_SLUGS.includes(slug as ServiceSlug)) {
        const service = getLocalizedService(slug as ServiceSlug, t);
        title = isEn ? `${service.title} | Gestion Velora` : `${service.title} | Gestion Velora`;
        description = service.description;
        ogImage = service.image;
        twitterImage = service.image;
      }
    } else if (pathname === "/blog" || pathname === "/en/blog" || pathname === "/en/blog/") {
      title = isEn ? "Insights | Gestion Velora" : "Conseils | Gestion Velora";
      description = isEn
        ? "Thoughts and news on property management in Montreal."
        : "Réflexions et actualités sur la gestion immobilière.";
    } else if (pathname.startsWith("/blog/") || pathname.startsWith("/en/blog/")) {
      if (slug) {
        const post = getPostBySlug(slug, locale);
        if (post) {
          title = `${post.title} | Gestion Velora`;
          description = post.excerpt;
          ogImage = post.image;
          twitterImage = post.image;
        }
      } else {
        title = isEn ? "Insights | Gestion Velora" : "Conseils | Gestion Velora";
        description = isEn
          ? "Thoughts and news on property management in Montreal."
          : "Réflexions et actualités sur la gestion immobilière.";
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
