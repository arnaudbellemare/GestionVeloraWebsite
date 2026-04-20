import { useEffect } from "react";
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
import { blogPosts, getPostBySlug } from "../data/blog";
import { getLocalizedService, getLocalizedServices, SERVICE_SLUGS, type ServiceSlug } from "../data/services";

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
  const locale = isEn ? "en-CA" : "fr-CA";
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
        inLanguage: locale,
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

    // ── Homepage ──────────────────────────────────────────────────────────────
    if (path === "/" || path === "/en" || path === "/en/") {
      const faqItems = t("faqItems", { returnObjects: true }) as {
        question: string;
        answer: string;
      }[];
      injectSchema({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
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

    // ── Blog index ────────────────────────────────────────────────────────────
    const isBlogIndex =
      path === "/blog" ||
      path === "/en/blog" ||
      path === "/en/blog/";
    if (isBlogIndex) {
      const blogLang = isEn ? "en" : "fr";
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
        inLanguage: locale,
        itemListElement: blogPosts.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Article",
            name: post[blogLang].title,
            url: `${base}/blog/${post.slug}`,
            datePublished: post.datePublished,
            image: post.image,
          },
        })),
      });
      return () => removePageSchema();
    }

    // ── Blog post ─────────────────────────────────────────────────────────────
    if ((path.startsWith("/blog/") || path.startsWith("/en/blog/")) && slug) {
      const blogLocale = isEn ? "en" : "fr";
      const post = getPostBySlug(slug, blogLocale);
      if (post) {
        const articleUrl = `${base}/blog/${post.slug}`;
        injectSchema([
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            author: {
              "@type": "Person",
              name: ARTICLE_AUTHOR_NAME,
              url: ARTICLE_AUTHOR_URL,
              sameAs: ARTICLE_AUTHOR_SAME_AS,
            },
            publisher: {
              "@type": "Organization",
              "@id": ORGANIZATION_SCHEMA_ID,
              name: "Gestion Velora",
              url: SITE_URL,
              sameAs: ORGANIZATION_SAME_AS,
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
        return () => removePageSchema();
      }
    }

    removePageSchema();
  }, [path, slug, t, bcHome, bcServices, bcInsights, base, locale]);

  return null;
}
