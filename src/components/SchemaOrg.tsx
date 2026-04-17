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
import { getPostBySlug } from "../data/blog";
import { getLocalizedService, getLocalizedServices, SERVICE_SLUGS, type ServiceSlug } from "../data/services";

function injectSchema(data: object) {
  const id = "schema-org-page";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removePageSchema() {
  document.getElementById("schema-org-page")?.remove();
}

export function SchemaOrg() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const path = pathname;
  const locale = path.startsWith("/en") ? "en-CA" : "fr-CA";

  useEffect(() => {
    const isServicesHub =
      path === "/services" || path === "/en/services" || path === "/en/services/";

    if (isServicesHub) {
      const services = getLocalizedServices(t);
      const base = path.startsWith("/en") ? `${SITE_URL}/en` : SITE_URL;
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

    if (path === "/" || path === "/en" || path === "/en/") {
      const faqItems = t("faqItems", { returnObjects: true }) as { question: string; answer: string }[];
      injectSchema({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      });
      return () => removePageSchema();
    }

    if ((path.startsWith("/services/") || path.startsWith("/en/services/")) && slug && SERVICE_SLUGS.includes(slug as ServiceSlug)) {
      const service = getLocalizedService(slug as ServiceSlug, t);
      injectSchema({
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": ORGANIZATION_SCHEMA_ID },
        url: `${SITE_URL}${path.startsWith("/en") ? "/en" : ""}/services/${service.slug}`,
        image: service.image,
      });
      return () => removePageSchema();
    }

    if ((path.startsWith("/blog/") || path.startsWith("/en/blog/")) && slug) {
      const blogLocale = path.startsWith("/en") ? "en" : "fr";
      const post = getPostBySlug(slug, blogLocale);
      if (post) {
        const articleUrl = `${SITE_URL}${path.startsWith("/en") ? "/en" : ""}/blog/${post.slug}`;
        injectSchema({
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
            logo: {
              "@type": "ImageObject",
              url: PUBLISHER_LOGO_URL,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
          },
        });
        return () => removePageSchema();
      }
    }

    removePageSchema();
  }, [path, slug, t]);

  return null;
}
