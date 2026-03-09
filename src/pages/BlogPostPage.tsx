import { Link, useParams } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";
import { getPostBySlug } from "../data/blog";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24">
        <h1 className="font-playfair text-2xl text-black dark:text-white mb-4">Article non trouvé</h1>
        <Link to="/blog" className="font-sans text-waabi-pink hover:underline">Retour aux insights</Link>
      </div>
    );
  }

  return (
    <article className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-[48rem] mx-auto px-6 lg:px-16">
        <Link
          to="/blog"
          className="font-sans text-sm text-black/60 dark:text-white/60 hover:text-waabi-pink mb-8 inline-block"
        >
          ← Tous les insights
        </Link>

        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white font-sans text-xs font-medium">
              {post.category}
            </span>
            <span className="font-sans text-sm text-black/50 dark:text-white/50">{post.date}</span>
          </div>
          <h1 className="font-playfair font-bold text-4xl lg:text-5xl text-black dark:text-white leading-tight mb-6">
            {post.title}
          </h1>
          <p className="font-sans text-xl text-black/70 dark:text-white/70 leading-relaxed">
            {post.excerpt}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 mb-12 rounded-2xl overflow-hidden">
            <img
              src={post.image}
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="font-sans text-lg text-black/80 dark:text-white/80 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-16 pt-12 border-t border-black/10 dark:border-white/10">
            <p className="font-sans text-black/70 dark:text-white/70 mb-4">
              Des questions sur la gestion immobilière ? Contactez Gestion Velora.
            </p>
            <Link
              to="/#contact"
              className="inline-flex px-6 py-3 rounded-full bg-waabi-pink text-white font-sans font-semibold text-sm hover:bg-waabi-pink/90 transition-colors"
            >
              Planifiez un appel
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}
