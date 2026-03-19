import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { getLocalizedService, SERVICE_SLUGS, type ServiceSlug } from "../data/services";

function toAnchorId(title: string) {
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return "#" + slug;
}

function scrollToBlock(e: React.MouseEvent, blockTitle: string) {
  e.preventDefault();
  const id = toAnchorId(blockTitle).slice(1);
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [expandedDetail, setExpandedDetail] = useState<number | null>(null);
  const service =
    slug && SERVICE_SLUGS.includes(slug as ServiceSlug)
      ? getLocalizedService(slug as ServiceSlug, t)
      : null;

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24">
        <h1 className="font-playfair text-2xl text-black dark:text-white mb-4">{t("servicePage.notFound")}</h1>
        <Link to="/" className="font-sans text-waabi-pink hover:underline">{t("servicePage.backHome")}</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pt-24 lg:pt-32"
    >
      {/* Hero - Waabi style: clean, minimal */}
      <section className="relative min-h-[60vh] flex flex-col justify-end pb-16 lg:pb-24">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-16 w-full">
          <InternalLink
            to="/#specification"
            className="font-sans text-sm text-white/80 hover:text-white mb-6 inline-flex items-center gap-1.5 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full transition-colors duration-200 hover:bg-black/30"
          >
            {t("servicePage.backToServices")}
          </InternalLink>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair font-bold text-4xl lg:text-6xl text-white leading-tight mb-4"
          >
            {service.subtitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-lg text-white/90 max-w-2xl"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Browse by - Category pills like Waabi */}
      <section className="py-12 lg:py-16 bg-white dark:bg-velora-charcoal border-b border-black/5 dark:border-white/5">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
          <p className="font-sans text-sm text-black/60 dark:text-white/60 mb-4">{t("servicePage.browseBy")}</p>
          <div className="flex flex-wrap gap-3">
            {service.offerings.map((block) => (
              <a
                key={block.title}
                href={toAnchorId(block.title)}
                onClick={(e) => scrollToBlock(e, block.title)}
                className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white font-sans text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {block.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured - Cards like Waabi research */}
      <section className="py-16 lg:py-24 bg-white dark:bg-velora-charcoal">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="font-playfair font-bold text-2xl lg:text-3xl text-black dark:text-white mb-12">
              {t("servicePage.ourServices")}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {service.offerings.map((block, i) => (
              <ScrollReveal key={block.title} delay={i * 0.05}>
                <motion.article
                  id={toAnchorId(block.title).slice(1)}
                  className="group rounded-2xl border border-black/10 dark:border-white/10 p-8 lg:p-10 hover:border-waabi-pink/30 transition-colors bg-white dark:bg-white/[0.02] scroll-mt-24"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white font-sans text-xs font-medium mb-4">
                    {block.title}
                  </span>
                  <h3 className="font-playfair font-bold text-xl lg:text-2xl text-black dark:text-white mb-6">
                    {block.title}
                  </h3>
                  <ul className="space-y-3">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="font-sans text-sm lg:text-base text-black/80 dark:text-white/80 flex items-start gap-3"
                      >
                        <span className="text-waabi-pink mt-1 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Publications-style list */}
      <section className="py-16 lg:py-24 bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="font-playfair font-bold text-2xl lg:text-3xl text-black dark:text-white mb-12">
              {t("servicePage.inDetail")}
            </h2>
          </ScrollReveal>

          <div className="space-y-1">
            {service.offerings.map((block, i) => {
              const isExpanded = expandedDetail === i;
              return (
                <ScrollReveal key={block.title} delay={i * 0.03}>
                  <div className="border-b border-black/5 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => setExpandedDetail(isExpanded ? null : i)}
                      className="w-full text-left py-6 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group cursor-pointer flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2"
                    >
                      <h4 className="font-sans font-bold text-lg text-black dark:text-white group-hover:text-waabi-pink transition-colors">
                        {block.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-sm text-black/50 dark:text-white/50">
                          {block.items.length} {t("servicePage.items")}
                        </span>
                        <motion.span
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-black/40 dark:text-white/40 group-hover:text-waabi-pink transition-colors shrink-0"
                        >
                          →
                        </motion.span>
                      </div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <ul className="pl-0 lg:pl-4 pb-6 space-y-2">
                            {block.items.map((item) => (
                              <li
                                key={item}
                                className="font-sans text-sm lg:text-base text-black/80 dark:text-white/80 flex items-start gap-3"
                              >
                                <span className="text-waabi-pink mt-0.5 shrink-0">•</span>
                                <span className="flex-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA - "We're just getting started" */}
      <section className="py-24 lg:py-32 bg-white dark:bg-velora-charcoal">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="font-playfair font-bold text-3xl lg:text-4xl text-black dark:text-white mb-4">
              {t("servicePage.ctaTitle")}
            </h2>
            <p className="font-sans text-black/70 dark:text-white/70 mb-8 max-w-xl">
              {t("servicePage.ctaText")}
            </p>
            <div className="flex flex-wrap gap-4">
              <InternalLink
                to="/#contact"
                className="inline-flex px-6 py-3 rounded-full bg-waabi-pink text-white font-sans font-bold text-sm hover:bg-waabi-pink/90 transition-colors"
              >
                {t("servicePage.planifyCall")}
              </InternalLink>
              <a
                href="mailto:info@gestionvelora.com"
                className="inline-flex px-6 py-3 rounded-full border-2 border-black/20 dark:border-white/20 text-black dark:text-white font-sans font-semibold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                info@gestionvelora.com
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}
