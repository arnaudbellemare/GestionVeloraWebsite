import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { InternalLink } from "./InternalLink";
import { ScrollReveal } from "./ScrollReveal";

/** Three gray steps: light → mid → dark (readable on nd-canvas in both themes). */
const serviceTagKeys = [
  {
    labelKey: "whatWeDo.syndicat",
    dotClass: "bg-[#a1a1aa] dark:bg-[#d4d4d4]",
  },
  {
    labelKey: "whatWeDo.airbnb",
    dotClass: "bg-[#71717a] dark:bg-[#a1a1aa]",
  },
  {
    labelKey: "whatWeDo.location",
    dotClass: "bg-[#3f3f46] dark:bg-[#71717a]",
  },
];

const serviceData = [
  { slug: "syndicat-copropriete", labelKey: "whatWeDo.syndicat", detailsKey: "whatWeDo.syndicatDetails" },
  { slug: "airbnb", labelKey: "whatWeDo.airbnb", detailsKey: "whatWeDo.airbnbDetails" },
  { slug: "location", labelKey: "whatWeDo.location", detailsKey: "whatWeDo.locationDetails" },
];

const serviceImages = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85",
];

export function WhatWeDoSection() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="specification"
      className="pt-28 pb-24 lg:pt-32 lg:pb-32 bg-nd-surface overflow-hidden scroll-mt-24"
    >
      <ScrollReveal className="text-center px-6 mb-16 lg:mb-20">
        <h2 id="nos-services" className="font-sans font-medium text-4xl lg:text-5xl xl:text-6xl text-nd-display leading-[1.05] tracking-[-0.02em] max-w-4xl mx-auto mb-4">
          {t("whatWeDo.title")}{" "}
          <span className="text-nd-secondary font-normal">{t("whatWeDo.titleItalic")}</span>
        </h2>
        <p className="font-sans text-base lg:text-lg text-nd-secondary mb-8">
          {t("whatWeDo.subtitle")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {serviceTagKeys.map((tag, i) => (
            <motion.span
              key={tag.labelKey}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nd-border bg-nd-canvas text-nd-primary font-sans text-sm cursor-default"
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${tag.dotClass}`} aria-hidden />
              {t(tag.labelKey)}
            </motion.span>
          ))}
        </div>
      </ScrollReveal>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 lg:gap-8 px-6 lg:px-12 xl:px-16 max-w-[90rem] mx-auto">
        {serviceData.map((s, i) => {
          const isExpanded = expanded === i;
          return (
            <InternalLink
              key={s.slug}
              to={`/services/${s.slug}`}
              className="relative w-[min(340px,90vw)] sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[400px] rounded-2xl overflow-hidden cursor-pointer block"
              style={{ zIndex: isExpanded ? 10 : 1 }}
            >
              <motion.article
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                onMouseEnter={() => setExpanded(i)}
                onMouseLeave={() => setExpanded(null)}
                className="h-full"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-nd-border-visible">
                  <img
                    src={serviceImages[i]}
                    alt={t(s.labelKey) + " Montréal | Gestion Velora"}
                    className="w-full h-full object-cover transition-opacity duration-200"
                    style={{ opacity: isExpanded ? 0.35 : 1 }}
                  />

                  {/* Label - always visible at bottom */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 pointer-events-none bg-black/55">
                    <span className="font-sans font-medium text-white text-lg lg:text-xl">
                      {t(s.labelKey)}
                    </span>
                  </div>

                  {/* Details overlay - appears on hover/tap */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/90 flex flex-col justify-start p-6 lg:p-8"
                      >
<motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                          className="space-y-2"
                        >
                          <span className="font-sans font-medium text-white text-lg block">
                            {t(s.labelKey)}
                          </span>
                          <p className="font-sans text-sm lg:text-base text-[#E8E8E8] leading-relaxed">
                            {t(s.detailsKey)}
                          </p>
                          <span className="inline-block font-sans text-sm text-[#5B9BF6] font-medium mt-2">
                            {t("whatWeDo.viewPage")}
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            </InternalLink>
          );
        })}
      </div>

      <p className="font-mono text-center text-[10px] uppercase tracking-[0.1em] text-nd-secondary px-6 mt-10 lg:mt-12">
        {t("whatWeDo.hint")}
      </p>
    </section>
  );
}
