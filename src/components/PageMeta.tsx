import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "../context/LocaleContext";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  INDEX_ROBOTS,
  SITE_URL,
  TWITTER_SITE,
} from "../config";
import { blogCoverUrl } from "../lib/blogImages";
import { getComparisonBySlug } from "../data/comparisons";
import { getLocalizedService, SERVICE_SLUGS, type ServiceSlug } from "../data/services";
import { getTrustPageLocale, trustPageIdFromPath } from "../data/trust-pages";
import {
  CALCULATOR_PATHS,
  REFERENCE_PATHS,
  CALCULATOR_PAGE,
  REFERENCE_PAGE,
} from "../data/plex-calculator";
import { RADAR_META, RADAR_PATHS } from "../data/plex-radar";

const _TITLE_SUFFIX = " | Gestion Velora";
const _TITLE_MAX = 70;
const DEFAULT_KEYWORDS = {
  fr: "gestion immobilière Montréal, gestion copropriété, syndicat de copropriété, gestion locative, gestion Airbnb",
  en: "property management Montreal, condo board management, rental management, Airbnb management, Gestion Velora",
} as const;

function canonicalPathFor(pathname: string): string {
  if (pathname === "/") return "/";
  if (pathname === "/en" || pathname === "/en/") return "/en/";
  return pathname;
}

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

function buildMetaDescription(excerpt: string, brief?: string): string {
  if (excerpt.length >= 120) return excerpt;
  const source = `${excerpt} ${brief ?? ""}`.replace(/\s+/g, " ").trim();
  if (source.length <= 160) return source;
  const cut = source.slice(0, 157);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 120 ? lastSpace : 157)}…`;
}

function buildKeywords(locale: "fr" | "en", parts: string[] = []): string {
  const normalized = parts
    .map((part) => part.replace(/[—–:|]/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 4);
  return Array.from(
    new Set([...normalized, ...DEFAULT_KEYWORDS[locale].split(",").map((part) => part.trim())])
  ).join(", ");
}

function setAmpHtml(href?: string) {
  let el = document.querySelector('link[rel="amphtml"]') as HTMLLinkElement | null;
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.rel = "amphtml";
    document.head.appendChild(el);
  }
  el.href = href;
}

function applyDocumentMeta(opts: {
  title: string;
  description: string;
  ogImage: string;
  twitterImage: string;
  url: string;
  isEn: boolean;
  robots?: string;
  keywords?: string;
}) {
  const { title, description, ogImage, twitterImage, url, isEn, robots, keywords } = opts;
  document.title = title;
  setMeta("description", description);
  setMeta("keywords", keywords ?? DEFAULT_KEYWORDS[isEn ? "en" : "fr"]);
  setMeta("robots", robots ?? INDEX_ROBOTS);
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:site", TWITTER_SITE);
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
  setMeta("twitter:image:alt", title);
}

export function PageMeta() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const isEn = locale === "en";
  const baseTitle = isEn
    ? "Property Management Montreal | Gestion Velora"
    : "Gestion immobilière Montréal | Gestion Velora";
  const baseDesc = isEn
    ? "Montreal property operations for condo boards, short-term rentals, and long-term rentals. Transparent reporting, 24/7 support, and proactive maintenance."
    : "Gestion immobilière à Montréal pour copropriétés, locations longue durée et Airbnb. Rapports clairs, soutien 24/7 et entretien proactif.";

  useEffect(() => {
    document.documentElement.lang = isEn ? "en-CA" : "fr-CA";

    const url = SITE_URL + canonicalPathFor(pathname);
    const robots =
      pathname.startsWith("/video/") || pathname.startsWith("/en/video/")
        ? "noindex, follow"
        : INDEX_ROBOTS;

    const isBlogPostPath =
      Boolean(slug) &&
      (pathname.startsWith("/blog/") || pathname.startsWith("/en/blog/")) &&
      pathname !== "/blog" &&
      pathname !== "/en/blog" &&
      pathname !== "/en/blog/";

    if (isBlogPostPath && slug) {
      let cancelled = false;
      void import("../data/blog").then(({ getPostBySlug }) => {
        if (cancelled) return;
        const post = getPostBySlug(slug, locale);
        if (post) {
          setAmpHtml(
            `${SITE_URL}${isEn ? `/en/amp/blog/${post.slug}` : `/amp/blog/${post.slug}`}`
          );
          applyDocumentMeta({
            title: buildTitle(post.metaTitle ?? post.title),
            description: buildMetaDescription(post.excerpt, post.brief),
            ogImage: blogCoverUrl(post.image),
            twitterImage: blogCoverUrl(post.image),
            url,
            isEn,
            robots,
            keywords: buildKeywords(locale, [
              post.metaTitle ?? post.title,
              post.category,
              post.sections[0]?.heading ?? "",
            ]),
          });
        } else {
          setAmpHtml();
          applyDocumentMeta({
            title: isEn
              ? "Montreal Property Management Blog — Advice & News | Gestion Velora"
              : "Blog gestion immobilière Montréal | Conseils & actualités",
            description: isEn
              ? "Practical articles on property management in Montreal: condo compliance, preventive maintenance, NOI optimization, Airbnb regulation."
              : "Conseils sur la gestion immobilière à Montréal : copropriété, Airbnb, location, réglementation, entretien et rentabilité.",
            ogImage: DEFAULT_OG_IMAGE,
            twitterImage: DEFAULT_TWITTER_IMAGE,
            url,
            isEn,
            robots,
          });
        }
      });
      return () => {
        cancelled = true;
      };
    }

    let title = baseTitle;
    let description = baseDesc;
    let ogImage = DEFAULT_OG_IMAGE;
    let twitterImage = DEFAULT_TWITTER_IMAGE;
    let keywords: string | undefined;
    setAmpHtml();

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
        keywords = buildKeywords(locale, [
          isEn ? page.h1En : page.h1Fr,
          isEn ? page.titleEn : page.titleFr,
          ...(isEn ? page.whereAlternativeWinsEn : page.whereAlternativeWinsFr),
        ]);
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
        title = service.metaTitle;
        description = service.metaDescription;
        ogImage = service.image;
        twitterImage = service.image;
      }
    } else if (pathname === "/blog" || pathname === "/en/blog" || pathname === "/en/blog/") {
      title = isEn
        ? "Montreal Property Management Blog — Advice & News | Gestion Velora"
        : "Blog gestion immobilière Montréal | Conseils & actualités";
      description = isEn
        ? "Practical articles on property management in Montreal: condo compliance, preventive maintenance, NOI optimization, Airbnb regulation."
        : "Conseils sur la gestion immobilière à Montréal : copropriété, Airbnb, location, réglementation, entretien et rentabilité.";
    } else if (pathname === "/privacy" || pathname === "/en/privacy") {
      title = isEn ? "Privacy | Gestion Velora" : "Confidentialité | Gestion Velora";
      description = baseDesc;
    } else if (pathname === "/terms" || pathname === "/en/terms") {
      title = isEn ? "Terms of Use | Gestion Velora" : "Conditions d’utilisation | Gestion Velora";
      description = isEn
        ? "Terms governing use of the Gestion Velora website and its general property management information."
        : "Conditions encadrant l’utilisation du site Gestion Velora et de ses informations générales en gestion immobilière.";
    } else if (pathname === "/contact" || pathname === "/en/contact") {
      title = isEn ? "Contact Gestion Velora | Montreal" : "Contact Gestion Velora | Montréal";
      description = isEn
        ? "Contact Gestion Velora for condo board, rental, or Airbnb property management in Greater Montreal. Initial response within one business day."
        : "Contactez Gestion Velora pour la gestion de copropriété, location ou Airbnb dans le Grand Montréal. Première réponse sous un jour ouvrable.";
    } else if (pathname === RADAR_PATHS.fr || pathname === RADAR_PATHS.en) {
      const meta = RADAR_META[isEn ? "en" : "fr"];
      title = buildTitle(meta.title);
      description = meta.description;
      keywords = isEn
        ? "Montreal income properties for sale, duplex for sale Montreal, triplex for sale Montreal, real estate investment Montreal"
        : "immeubles à revenus à vendre Montréal, duplex à vendre Montréal, triplex à vendre Montréal, investissement immobilier Montréal";
    } else if (
      pathname === CALCULATOR_PATHS.fr ||
      pathname === CALCULATOR_PATHS.en ||
      pathname === REFERENCE_PATHS.fr ||
      pathname === REFERENCE_PATHS.en
    ) {
      const isReference =
        pathname === REFERENCE_PATHS.fr || pathname === REFERENCE_PATHS.en;
      const loc = isEn ? "en" : "fr";
      const page = isReference ? REFERENCE_PAGE[loc] : CALCULATOR_PAGE[loc];
      title = buildTitle(page.metaTitle);
      description = page.metaDescription;
      keywords = page.keywords;
    } else {
      const trustId = trustPageIdFromPath(pathname);
      if (trustId) {
        const tp = getTrustPageLocale(trustId, isEn ? "en" : "fr");
        title = buildTitle(tp.metaTitle);
        description = tp.metaDescription;
      }
    }

    applyDocumentMeta({ title, description, ogImage, twitterImage, url, isEn, robots, keywords });
  }, [pathname, slug, locale, t, isEn, baseTitle, baseDesc]);

  return null;
}
