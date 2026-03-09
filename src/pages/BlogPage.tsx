import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { blogPosts } from "../data/blog";

export function BlogPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
        <ScrollReveal>
          <h1 className="font-playfair font-bold text-4xl lg:text-6xl text-black dark:text-white leading-tight mb-4">
            Insights
          </h1>
          <p className="font-sans text-lg text-black/60 dark:text-white/60 max-w-2xl">
            Réflexions et actualités sur la gestion immobilière à Montréal par Gestion Velora.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.05}>
              <InternalLink
                to={`/blog/${post.slug}`}
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
                      {post.category}
                    </span>
                    <span className="font-sans text-xs text-black/50 dark:text-white/50">{post.date}</span>
                  </div>
                  <h2 className="font-sans font-bold text-lg text-black dark:text-white group-hover:text-waabi-pink transition-colors">
                    {post.title}
                  </h2>
                  <p className="font-sans text-sm text-black/60 dark:text-white/60 mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </InternalLink>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
