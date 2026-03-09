import { useRef } from "react";
import { motion } from "framer-motion";
import { InternalLink } from "./InternalLink";
import { ScrollReveal } from "./ScrollReveal";
import { blogPosts } from "../data/blog";

const featuredPosts = blogPosts.slice(0, 4);

export function InsightsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 340;
      scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="insights"
      className="py-24 lg:py-32 px-6 lg:px-16 bg-white dark:bg-velora-charcoal"
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <ScrollReveal>
            <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-black dark:text-white leading-tight">
              Insights.
            </h2>
            <p className="font-sans text-black/60 dark:text-white/60 mt-2">
              Réflexions et actualités sur la gestion immobilière.
            </p>
          </ScrollReveal>
          <div className="flex items-center gap-3">
            <InternalLink
              to="/blog"
              className="px-6 py-3 rounded-full bg-waabi-pink text-white font-sans font-bold text-sm hover:bg-waabi-pink/90 transition-colors shrink-0"
            >
              Voir tout
            </InternalLink>
            <div className="flex gap-2">
              <motion.button
                onClick={() => scroll("left")}
                aria-label="Précédent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border-2 border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white hover:border-waabi-pink hover:text-waabi-pink transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                onClick={() => scroll("right")}
                aria-label="Suivant"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border-2 border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white hover:border-waabi-pink hover:text-waabi-pink transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {featuredPosts.map((post, i) => (
            <InternalLink
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="flex-shrink-0 w-[300px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="h-full rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-waabi-pink/30 transition-colors group"
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
                  <h3 className="font-sans font-bold text-black dark:text-white leading-snug group-hover:text-waabi-pink transition-colors">
                    {post.title}
                  </h3>
                </div>
              </motion.article>
            </InternalLink>
          ))}
        </div>
      </div>
    </section>
  );
}
