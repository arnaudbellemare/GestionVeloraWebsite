import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getPostBySlug } from "../data/blog";
import { faqItems } from "../data/faq";
import { services, type ServiceSlug } from "../data/services";

const SITE_URL = "https://gestionvelora.com";

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
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const path = location.pathname;

  useEffect(() => {
    if (path === "/") {
      injectSchema({
        "@context": "https://schema.org",
        "@type": "FAQPage",
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

    if (path.startsWith("/services/") && slug && slug in services) {
      const service = services[slug as ServiceSlug];
      injectSchema({
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/services/${service.slug}`,
        image: service.image,
      });
      return () => removePageSchema();
    }

    if (path.startsWith("/blog/") && slug) {
      const post = getPostBySlug(slug);
      if (post) {
        const months: Record<string, number> = { Janvier: 0, Février: 1, Mars: 2, Avril: 3, Mai: 4, Juin: 5, Juillet: 6, Août: 7, Septembre: 8, Octobre: 9, Novembre: 10, Décembre: 11 };
        const dateMatch = post.date.match(/(\w+)\s+(\d{4})/);
        const dateStr = dateMatch && dateMatch[1] in months
          ? `${dateMatch[2]}-${String(months[dateMatch[1] as keyof typeof months] + 1).padStart(2, "0")}-01`
          : new Date().toISOString().slice(0, 10);
        injectSchema({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: dateStr,
          dateModified: dateStr,
          author: { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/blog/${post.slug}`,
          },
        });
        return () => removePageSchema();
      }
    }

    removePageSchema();
  }, [path, slug]);

  return null;
}
