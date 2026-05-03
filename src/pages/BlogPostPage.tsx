import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { ARTICLE_AUTHOR_NAME, ARTICLE_AUTHOR_LINKEDIN } from "../config";
import { useLocale } from "../context/LocaleContext";
import { useGoToContact } from "../hooks/useGoToContact";
import { getPostBySlug, getRelatedPosts, type RichParagraph } from "../data/blog";
import { LeadCaptureSection } from "../components/LeadCaptureSection";
import { getLocalizedService, SERVICE_SLUGS } from "../data/services";

function toHeadingId(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function RichPara({ p, id }: { p: RichParagraph; id: string }) {
  if (typeof p === "string") return <p>{p}</p>;
  return (
    <p>
      {p.map((seg, i) =>
        typeof seg === "string" ? (
          <span key={`${id}-${i}`}>{seg}</span>
        ) : (
          <InternalLink
            key={`${id}-${i}`}
            to={seg.to}
            className="text-waabi-pink font-medium hover:underline underline-offset-2"
          >
            {seg.text}
          </InternalLink>
        )
      )}
    </p>
  );
}

export function BlogPostPage() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { contactHref, goToContact } = useGoToContact();
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug, locale) : null;
  const related = slug ? getRelatedPosts(slug, locale, 3) : [];
  const serviceCards = SERVICE_SLUGS.map((s) => getLocalizedService(s, t));

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24">
        <h1 className="font-sans font-medium text-2xl text-nd-display mb-4">{t("blog.notFound")}</h1>
        <InternalLink to="/blog" className="font-sans text-waabi-pink hover:underline">
          {t("blog.backToInsightsLink")}
        </InternalLink>
      </div>
    );
  }

  return (
    <article className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-[48rem] mx-auto px-6 lg:px-16">
        <Breadcrumbs
          items={[
            { label: t("breadcrumb.home"), to: "/" },
            { label: t("breadcrumb.insights"), to: "/blog" },
            { label: post.title },
          ]}
        />

        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white font-sans text-xs font-medium">
              {post.category}
            </span>
            <span className="font-sans text-sm text-black/50 dark:text-white/50">{post.date}</span>
          </div>
          <h1 className="font-sans font-medium text-4xl lg:text-5xl text-nd-display leading-[1.05] tracking-[-0.02em] mb-6">
            {post.title}
          </h1>
          <p className="font-sans text-xl text-black/70 dark:text-white/70 leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <aside className="rounded-2xl border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] px-5 py-4 lg:px-6 lg:py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/45 dark:text-white/45 mb-2">
              {t("blog.briefLabel")}
            </p>
            <p className="font-sans text-base text-black/85 dark:text-white/85 leading-relaxed">
              {post.brief}
            </p>
          </aside>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <p className="mt-8 font-sans text-sm text-black/65 dark:text-white/65">
            {t("blog.exploreServicesIntro")}{" "}
            {serviceCards.map((s, i) => (
              <span key={s.slug}>
                {i > 0 && " · "}
                <InternalLink to={`/services/${s.slug}`} className="text-waabi-pink hover:underline underline-offset-2">
                  {s.title}
                </InternalLink>
              </span>
            ))}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 mb-12 rounded-2xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
              width={1200}
              height={800}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </ScrollReveal>

        <div className="mt-12 font-sans text-lg text-black/80 dark:text-white/80 leading-relaxed space-y-10">
          {post.sections.map((section, sectionIndex) => (
            <ScrollReveal key={section.heading} amount={0.05}>
              <section className="scroll-mt-24">
                <h2 id={`post-section-${toHeadingId(section.heading)}`} className="font-sans font-medium text-xl lg:text-2xl text-nd-display mb-4 leading-snug tracking-[-0.02em]">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((p, i) => (
                    <RichPara key={`${section.heading}-${i}`} p={p} id={`${section.heading}-${i}`} />
                  ))}
                </div>
                {sectionIndex === 1 && (
                  <div className="mt-8 p-5 lg:p-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
                    <p className="font-sans text-sm text-black/70 dark:text-white/70 mb-3">
                      {t("blog.contactQuestion")}
                    </p>
                    <a
                      href={contactHref}
                      onClick={goToContact}
                      className="inline-flex px-5 py-2.5 rounded-full bg-waabi-pink text-white font-sans font-semibold text-sm hover:bg-waabi-pink/90 transition-colors"
                    >
                      {t("blog.contactUs")}
                    </a>
                  </div>
                )}
              </section>
            </ScrollReveal>
          ))}
        </div>

        <LeadCaptureSection variant="blog" />

        {/* ── Author bio — visible EEAT signal for Google quality raters ── */}
        <ScrollReveal delay={0.15}>
          <div className="mt-16 pt-10 border-t border-black/10 dark:border-white/10">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/40 dark:text-white/40 mb-4">
              {locale === "en" ? "Written by" : "Écrit par"}
            </p>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full bg-nd-raised border border-nd-border flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <span className="font-sans font-semibold text-sm text-nd-display select-none">AB</span>
              </div>
              <div>
                <p className="font-sans font-semibold text-base text-nd-display leading-tight">
                  {ARTICLE_AUTHOR_NAME}
                </p>
                <p className="font-sans text-sm text-black/55 dark:text-white/55 mt-0.5">
                  {locale === "en" ? "Founder, Gestion Velora" : "Fondateur, Gestion Velora"}
                </p>
              </div>
            </div>
            <p className="font-sans text-sm text-black/60 dark:text-white/60 leading-relaxed mt-4 max-w-lg">
              {locale === "en"
                ? "Property management professional specializing in condo boards, long-term rentals, and short-term rentals in Greater Montreal."
                : "Professionnel de la gestion immobilière spécialisé en syndicats de copropriété, location longue durée et Airbnb dans le Grand Montréal."}
            </p>
            <a
              href={ARTICLE_AUTHOR_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 font-sans text-sm text-waabi-pink hover:underline underline-offset-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              {locale === "en" ? "View LinkedIn profile" : "Voir le profil LinkedIn"}
            </a>
          </div>
        </ScrollReveal>

        {related.length > 0 && (
          <ScrollReveal delay={0.18}>
            <div className="mt-16 pt-12 border-t border-black/10 dark:border-white/10">
              <h2 id="post-related-articles" className="font-sans font-medium text-xl text-nd-display mb-6">{t("blog.relatedPostsTitle")}</h2>
              <ul className="space-y-4">
                {related.map((r) => (
                  <li key={r.slug}>
                    <InternalLink
                      to={`/blog/${r.slug}`}
                      className="group block font-sans text-base text-black/85 dark:text-white/85 hover:text-waabi-pink transition-colors"
                    >
                      <span className="font-medium">{r.title}</span>
                      <span className="block text-sm text-black/50 dark:text-white/50 mt-0.5">{r.date}</span>
                    </InternalLink>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.2}>
          <div className="mt-16 pt-12 border-t border-black/10 dark:border-white/10">
            <p className="font-sans text-black/70 dark:text-white/70 mb-4">{t("blog.contactQuestion")}</p>
            <a
              href={contactHref}
              onClick={goToContact}
              className="inline-flex px-6 py-3 rounded-full bg-waabi-pink text-white font-sans font-semibold text-sm hover:bg-waabi-pink/90 transition-colors"
            >
              {t("blog.planifyCall")}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}
