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
                    alt=""
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
      </div>
    </div>
  );
}
