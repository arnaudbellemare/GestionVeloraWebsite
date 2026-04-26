import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { useLocale } from "../context/LocaleContext";
import { blogPosts } from "../data/blog";
import { trackBlogListView, trackBlogSelect } from "../lib/analytics";

export function BlogPage() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const listName = "blog_hub";
  const lastTrackedKey = useRef<string>("");

  useEffect(() => {
    const localizedPosts = blogPosts.map((post) => ({
      slug: post.slug,
      title: post[locale].title,
    }));
    const trackKey = localizedPosts.map((p) => `${p.slug}:${p.title}`).join("|");
    if (trackKey === lastTrackedKey.current) return;
    lastTrackedKey.current = trackKey;
    trackBlogListView(localizedPosts, listName);
  }, [locale, listName]);

  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
        <ScrollReveal>
          <h1 className="font-sans font-medium text-4xl lg:text-6xl text-nd-display leading-[1.05] tracking-[-0.02em] mb-4">
            {t("blog.title")}
          </h1>
          <p className="font-sans text-lg text-black/60 dark:text-white/60 max-w-2xl">
            {t("blog.subtitle")}
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => {
            const loc = post[locale];
            return (
            <ScrollReveal key={post.slug} delay={i * 0.05}>
              <InternalLink
                to={`/blog/${post.slug}`}
                onClick={() =>
                  trackBlogSelect(
                    { slug: post.slug, title: loc.title },
                    listName,
                    i
                  )
                }
                className="group block rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-waabi-pink/30 transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post[locale].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white font-sans text-xs font-medium">
                      {loc.category}
                    </span>
                    <span className="font-sans text-xs text-black/50 dark:text-white/50">{loc.date}</span>
                  </div>
                  <h2 className="font-sans font-bold text-lg text-black dark:text-white group-hover:text-waabi-pink transition-colors">
                    {loc.title}
                  </h2>
                  <p className="font-sans text-sm text-black/60 dark:text-white/60 mt-2 line-clamp-2">
                    {loc.excerpt}
                  </p>
                </div>
              </InternalLink>
            </ScrollReveal>
          );})}
        </div>

        <ScrollReveal delay={0.12}>
          <section className="mt-14 lg:mt-16 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-6 lg:p-8">
            <h2 className="font-sans font-semibold text-xl lg:text-2xl text-nd-display mb-2">
              {locale === "en" ? "Turn insights into an action plan" : "Transformez les insights en plan d'action"}
            </h2>
            <p className="font-sans text-sm lg:text-base text-black/70 dark:text-white/70 mb-6 max-w-3xl">
              {locale === "en"
                ? "Use the contact flow to request a quote, schedule a consultation, or book a direct call about your building."
                : "Utilisez le formulaire de contact pour demander une soumission, planifier une consultation ou reserver un appel direct."}
            </p>
            <div className="flex flex-wrap gap-3">
              <InternalLink
                to="/#contact-form"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-waabi-pink text-white font-sans font-semibold text-sm hover:bg-waabi-pink/90 transition-colors"
              >
                {locale === "en" ? "Request a Quote" : "Demander une soumission"}
              </InternalLink>
              <InternalLink
                to="/#contact-form"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full border border-black/20 dark:border-white/20 text-black/85 dark:text-white/85 font-sans text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {locale === "en" ? "Book a Consultation" : "Planifier une consultation"}
              </InternalLink>
              <a
                href="tel:+15147771731"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full border border-black/20 dark:border-white/20 text-black/85 dark:text-white/85 font-sans text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {locale === "en" ? "Call +1 514 777 1731" : "Appeler +1 514 777 1731"}
              </a>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
