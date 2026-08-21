import { useEffect } from "react";
import { blogCoverUrl } from "../lib/blogImages";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import {
  ARTICLE_AUTHOR_NAME,
  ARTICLE_AUTHOR_SAME_AS,
  ARTICLE_AUTHOR_URL,
  ORGANIZATION_SCHEMA_ID,
  ORGANIZATION_SAME_AS,
  PUBLISHER_LOGO_URL,
  SITE_URL,
} from "../config";
import { getLocalizedService, getLocalizedServices, SERVICE_SLUGS, type ServiceSlug } from "../data/services";
import {
  CALCULATOR_PATHS,
  REFERENCE_PATHS,
  CALCULATOR_PAGE,
  REFERENCE_PAGE,
  REFERENCE_FIGURES,
  FIGURES_VERIFIED,
} from "../data/plex-calculator";
import { RADAR_FAQ, RADAR_META, RADAR_PATHS } from "../data/plex-radar";

// Inject one or multiple JSON-LD schemas into the document head.
// When given an array, uses the @graph pattern for clean multi-schema output.
function injectSchema(data: object | object[]) {
  const id = "schema-org-page";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  if (Array.isArray(data)) {
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": data.map((d) => {
        // Strip redundant @context from individual nodes in a @graph
        const { "@context": _ctx, ...rest } = d as Record<string, unknown>;
        return rest;
      }),
    });
  } else {
    el.textContent = JSON.stringify(data);
  }
}

function removePageSchema() {
  document.getElementById("schema-org-page")?.remove();
}

export function SchemaOrg() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const path = pathname;
  const isEn = path.startsWith("/en");
  const base = isEn ? `${SITE_URL}/en` : SITE_URL;

  // Breadcrumb label helpers (translated)
  const bcHome = t("breadcrumb.home");
  const bcServices = t("breadcrumb.services");
  const bcInsights = t("breadcrumb.insights");

  function buildBreadcrumb(items: Array<{ name: string; url?: string }>) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        ...(item.url ? { item: item.url } : {}),
      })),
    };
  }

  useEffect(() => {
    let cancelled = false;

    // ── Plex calculator & buyer guide ─────────────────────────────────────────
    // The calculator publishes WebApplication + FAQPage so answer engines can
    // both recognise the tool and lift individual answers. The guide publishes
    // Article + FAQ-free Dataset-style facts, each anchored on the page.
    const isCalculator = path === CALCULATOR_PATHS.fr || path === CALCULATOR_PATHS.en;
    const isGuide = path === REFERENCE_PATHS.fr || path === REFERENCE_PATHS.en;
    const isRadar = path === RADAR_PATHS.fr || path === RADAR_PATHS.en;

    if (isRadar) {
      const loc = isEn ? "en" : "fr";
      const url = `${SITE_URL}${path}`;
      injectSchema([
        buildBreadcrumb([
          { name: bcHome, url: `${base}/` },
          { name: loc === "en" ? "Montreal income properties for sale" : "Immeubles à revenus à vendre" },
        ]),
        {
          "@type": "WebApplication",
          "@id": `${url}#app`,
          name: "Plex Radar",
          alternateName: loc === "en"
            ? "Montreal income properties for sale"
            : "Immeubles à revenus à vendre à Montréal",
          url,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          inLanguage: isEn ? "en-CA" : "fr-CA",
          description: RADAR_META[loc].description,
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
          publisher: { "@id": ORGANIZATION_SCHEMA_ID },
          areaServed: { "@type": "AdministrativeArea", name: "Québec, Canada" },
          audience: { "@type": "Audience", audienceType: "Quebec plex investors" },
          featureList: isEn ? [
            "Daily income-property screening", "Cap rate", "Cash-on-cash return", "DSCR",
            "Gross rent multiplier", "Monthly cash flow", "Editable operating-expense scenarios",
          ] : [
            "Présélection quotidienne d’immeubles à revenus", "Taux de capitalisation", "Rendement comptant",
            "DSCR", "Multiplicateur de revenu brut", "Flux de trésorerie mensuel",
            "Scénarios de dépenses d’exploitation modifiables",
          ],
        },
        {
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: RADAR_FAQ[loc].map((entry) => ({
            "@type": "Question",
            name: entry.q,
            acceptedAnswer: { "@type": "Answer", text: entry.a },
          })),
        },
      ]);
      return () => removePageSchema();
    }

    if (isCalculator || isGuide) {
      const loc = isEn ? "en" : "fr";
      const calc = CALCULATOR_PAGE[loc];
      const guide = REFERENCE_PAGE[loc];
      const url = `${SITE_URL}${path}`;

      const graph: object[] = [
        buildBreadcrumb([
          { name: bcHome, url: `${base}/` },
          { name: isGuide ? guide.title : calc.title },
        ]),
      ];

      if (isCalculator) {
        graph.push({
          "@type": "WebApplication",
          "@id": `${url}#app`,
          name: calc.metaTitle,
          url,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          inLanguage: isEn ? "en-CA" : "fr-CA",
          description: calc.metaDescription,
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
          featureList: calc.sections.map((s) => s.heading),
          publisher: { "@id": ORGANIZATION_SCHEMA_ID },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Montréal, Québec, Canada",
          },
          dateModified: `${FIGURES_VERIFIED}-01`,
          about: (isEn
            ? [
                "Montreal transfer duties (welcome tax)",
                "CMHC multi-unit financing limits",
                "Quebec rental board (TAL) rent-setting framework",
                "Capital cost allowance (CCA) recapture at resale",
              ]
            : [
                "Droits de mutation de Montréal (taxe de bienvenue)",
                "Plafonds de financement SCHL pour immeubles à logements",
                "Cadre de fixation de loyer du TAL",
                "Récupération de la déduction pour amortissement (DPA) à la revente",
              ]
          ).map((name) => ({ "@type": "Thing", name })),
          citation: REFERENCE_FIGURES.map((f) => ({
            "@type": "CreativeWork",
            name: f.source,
            url: f.sourceUrl,
          })),
        });
        graph.push({
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: calc.faq.map((entry) => ({
            "@type": "Question",
            name: entry.q,
            acceptedAnswer: { "@type": "Answer", text: entry.a },
          })),
        });
      } else {
        graph.push({
          "@type": "Article",
          "@id": `${url}#article`,
          headline: guide.metaTitle,
          description: guide.metaDescription,
          url,
          inLanguage: isEn ? "en-CA" : "fr-CA",
          author: { "@type": "Person", name: ARTICLE_AUTHOR_NAME, url: ARTICLE_AUTHOR_URL },
          publisher: { "@id": ORGANIZATION_SCHEMA_ID },
          // Dated because every figure on the page is annually indexed.
          dateModified: `${FIGURES_VERIFIED}-01`,
          about: REFERENCE_FIGURES.map((figure) => ({
            "@type": "Thing",
            name: figure.label[loc],
          })),
          citation: REFERENCE_FIGURES.map((figure) => ({
            "@type": "CreativeWork",
            name: figure.source,
            url: figure.sourceUrl,
          })),
        });
      }

      injectSchema(graph);
      return () => {
        cancelled = true;
        removePageSchema();
      };
    }

    // ── Services hub ──────────────────────────────────────────────────────────
    const isServicesHub =
      path === "/services" || path === "/en/services" || path === "/en/services/";

    if (isServicesHub) {
      const services = getLocalizedServices(t);
      injectSchema({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: t("servicesHub.schemaName"),
        description: t("servicesHub.metaDescription"),
        itemListElement: services.map((svc, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: svc.title,
            description: svc.description,
            url: `${base}/services/${svc.slug}`,
          },
        })),
      });
      return () => removePageSchema();
    }

    // ── Service detail page ───────────────────────────────────────────────────
    if (
      (path.startsWith("/services/") || path.startsWith("/en/services/")) &&
      slug &&
      SERVICE_SLUGS.includes(slug as ServiceSlug)
    ) {
      const service = getLocalizedService(slug as ServiceSlug, t);
      injectSchema([
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: { "@id": ORGANIZATION_SCHEMA_ID },
          url: `${base}/services/${service.slug}`,
          image: service.image,
        },
        buildBreadcrumb([
          { name: bcHome, url: SITE_URL + "/" },
          { name: bcServices, url: `${base}/services` },
          { name: service.title },
        ]),
      ]);
      return () => removePageSchema();
    }

    // ── Blog (index + post): defer heavy blog module ───────────────────────────
    const isBlogIndex =
      path === "/blog" || path === "/en/blog" || path === "/en/blog/";
    const isBlogPost =
      Boolean(slug) && (path.startsWith("/blog/") || path.startsWith("/en/blog/")) && !isBlogIndex;

    if (isBlogIndex || isBlogPost) {
      const blogLang = isEn ? "en" : "fr";
      void import("../data/blog").then(({ blogPosts, getPostBySlug }) => {
        if (cancelled) return;
        if (isBlogIndex) {
          const name = isEn
            ? "Montreal Property Management Insights"
            : "Conseils et articles sur la gestion immobilière à Montréal";
          const description = isEn
            ? "Practical articles on property management in Montreal: condo compliance, preventive maintenance, NOI optimization, Airbnb regulation."
            : "Articles pratiques sur la gestion immobilière à Montréal : conformité copropriété, maintenance préventive, optimisation du NOI, réglementation Airbnb.";
          injectSchema({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name,
            description,
            itemListElement: blogPosts.map((post, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Article",
                name: post[blogLang].title,
                url: `${base}/blog/${post.slug}`,
                datePublished: post.datePublished,
                image: blogCoverUrl(post.image),
              },
            })),
          });
          return;
        }
        if (slug) {
          const post = getPostBySlug(slug, blogLang);
          if (post) {
            const articleUrl = `${base}/blog/${post.slug}`;
            injectSchema([
              {
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.excerpt,
                image: blogCoverUrl(post.image),
                datePublished: post.datePublished,
                dateModified: post.dateModified,
                author: {
                  "@type": "Person",
                  name: ARTICLE_AUTHOR_NAME,
                  url: ARTICLE_AUTHOR_URL,
                  ...(ARTICLE_AUTHOR_SAME_AS.length ? { sameAs: ARTICLE_AUTHOR_SAME_AS } : {}),
                },
                publisher: {
                  "@type": "Organization",
                  "@id": ORGANIZATION_SCHEMA_ID,
                  name: "Gestion Velora",
                  url: SITE_URL,
                  ...(ORGANIZATION_SAME_AS.length ? { sameAs: ORGANIZATION_SAME_AS } : {}),
                  logo: { "@type": "ImageObject", url: PUBLISHER_LOGO_URL },
                },
                mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
              },
              buildBreadcrumb([
                { name: bcHome, url: SITE_URL + "/" },
                { name: bcInsights, url: `${base}/blog` },
                { name: post.title },
              ]),
            ]);
          }
        }
      });
      return () => {
        cancelled = true;
        removePageSchema();
      };
    }

    // ── Homepage FAQ (same URL as visible FAQSection; canonical + #faq) ───
    const isHome =
      path === "/" || path === "/en" || path === "/en/" || path === "";
    if (isHome) {
      const canonical = isEn ? `${SITE_URL}/en/` : `${SITE_URL}/`;
      const faqItems = t("faqItems", { returnObjects: true }) as Array<{
        question: string;
        answer: string;
      }>;
      injectSchema({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        url: canonical,
        inLanguage: isEn ? "en-CA" : "fr-CA",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      });
      return () => removePageSchema();
    }

    // ── Video watch page ───────────────────────────────────────────────────
    const isVideoWatchPage =
      path === "/video/hero-bg-mobile" || path === "/en/video/hero-bg-mobile";
    if (isVideoWatchPage) {
      const watchUrl = `${base}/video/hero-bg-mobile`;
      const videoName = isEn ? "Gestion Velora - Hero video" : "Gestion Velora - Video hero";
      const videoDescription = isEn
        ? "Official hero video used on the Gestion Velora homepage."
        : "Video officielle utilisee sur la page d'accueil de Gestion Velora.";
      injectSchema([
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: videoName,
          description: videoDescription,
          thumbnailUrl: `${SITE_URL}/og-image.png`,
          uploadDate: "2026-04-30",
          duration: "PT29S",
          contentUrl: `${SITE_URL}/videos/hero-bg-mobile-ultra.mp4`,
          embedUrl: watchUrl,
          inLanguage: isEn ? "en-CA" : "fr-CA",
          publisher: {
            "@type": "Organization",
            "@id": ORGANIZATION_SCHEMA_ID,
            name: "Gestion Velora",
            url: SITE_URL,
            ...(ORGANIZATION_SAME_AS.length ? { sameAs: ORGANIZATION_SAME_AS } : {}),
            logo: { "@type": "ImageObject", url: PUBLISHER_LOGO_URL },
          },
        },
        buildBreadcrumb([
          { name: bcHome, url: SITE_URL + "/" },
          { name: "Video" },
        ]),
      ]);
      return () => removePageSchema();
    }

    removePageSchema();
    return () => removePageSchema();
  }, [path, slug, t, bcHome, bcServices, bcInsights, base, isEn]);

  return null;
}
