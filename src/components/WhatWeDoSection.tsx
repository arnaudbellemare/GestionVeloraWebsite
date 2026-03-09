import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InternalLink } from "./InternalLink";
import { ScrollReveal } from "./ScrollReveal";

const serviceTags = [
  { label: "Syndicat de copropriété", dot: "#3b82f6" },
  { label: "Airbnb", dot: "#f97316" },
  { label: "Location", dot: "#8b5cf6" },
];

const services = [
  {
    slug: "syndicat-copropriete",
    label: "Syndicat de copropriété",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
    details:
      "Administration complète, assemblées générales, gestion des fonds de prévoyance et des travaux majeurs. Transparence et rigueur pour chaque copropriété.",
  },
  {
    slug: "airbnb",
    label: "Airbnb",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
    details:
      "Gestion des réservations, coordination des entrées et sorties, ménage et maintenance. Maximisez vos revenus en toute sérénité.",
  },
  {
    slug: "location",
    label: "Location",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=85",
    details:
      "Sélection des locataires, rédaction des baux, suivi des loyers et des entretiens. Une gestion locative professionnelle et humaine.",
  },
];

export function WhatWeDoSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="specification"
      className="pt-28 pb-24 lg:pt-32 lg:pb-32 bg-white dark:bg-velora-charcoal overflow-hidden scroll-mt-24"
    >
      <ScrollReveal className="text-center px-6 mb-16 lg:mb-20">
        <h2 className="font-playfair font-bold text-4xl lg:text-5xl xl:text-6xl text-black dark:text-white leading-tight max-w-4xl mx-auto mb-4">
          Une gestion adaptée à <span className="italic">chaque type.</span>
        </h2>
        <p className="font-sans text-base lg:text-lg text-black/60 dark:text-white/60 mb-8">
          syndicats, Airbnb, locations longue durée — une approche sur mesure pour chaque bien
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {serviceTags.map((tag, i) => (
            <motion.span
              key={tag.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-white/10 text-black dark:text-white font-sans text-sm cursor-default"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: tag.dot }}
              />
              {tag.label}
            </motion.span>
          ))}
        </div>
      </ScrollReveal>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 lg:gap-8 px-6 lg:px-12 xl:px-16 max-w-[90rem] mx-auto">
        {services.map((s, i) => {
          const isExpanded = expanded === i;
          return (
            <InternalLink
              key={s.slug}
              to={`/services/${s.slug}`}
              className="relative w-[min(340px,90vw)] sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[400px] rounded-2xl overflow-hidden cursor-pointer block"
              style={{ zIndex: isExpanded ? 10 : 1 }}
            >
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={() => setExpanded(i)}
                onMouseLeave={() => setExpanded(null)}
                className="h-full"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={s.image}
                    alt={s.label}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: isExpanded ? "scale(1.05)" : "scale(1)" }}
                  />

                  {/* Label - always visible at bottom */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)",
                    }}
                  >
                    <span className="font-sans font-bold text-white text-lg lg:text-xl">
                      {s.label}
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
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        exit={{ y: -20 }}
                        transition={{ duration: 0.25 }}
                          className="space-y-2"
                        >
                          <span className="font-sans font-bold text-white text-lg block">
                            {s.label}
                          </span>
                          <p className="font-sans text-sm lg:text-base text-white/95 leading-relaxed">
                            {s.details}
                          </p>
                          <span className="inline-block font-sans text-sm text-waabi-pink font-semibold mt-2">
                            Voir la page →
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

      <p className="font-sans text-center text-sm text-black/50 dark:text-white/50 px-6 mt-10 lg:mt-12">
        Cliquez sur une carte ou survolez pour voir les détails
      </p>
    </section>
  );
}
