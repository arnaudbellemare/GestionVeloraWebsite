import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "./ScrollReveal";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1920&q=80";

export function OurStandardsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "15%", "0%"]);

  return (
    <section ref={ref} id="standards" className="relative min-h-[600px] flex overflow-hidden scroll-mt-24 pt-24 lg:pt-24">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={BG_IMAGE}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-white/50 dark:bg-black/40" />
      </motion.div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-[90rem] mx-auto px-6 lg:px-16 py-24 items-center gap-16">
        <div className="flex-1">
          <ScrollReveal>
            <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-velora-charcoal dark:text-white leading-tight mb-8">
              Établir de nouveaux standards en gestion immobilière.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <motion.a
              href="mailto:info@gestionvelora.com"
              rel="noopener noreferrer"
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-velora-charcoal text-velora-charcoal dark:border-white dark:text-white font-sans font-semibold text-sm hover:bg-velora-charcoal hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
            >
              Notre approche
              <span className="text-xs" aria-hidden="true">→</span>
            </motion.a>
          </ScrollReveal>
        </div>
        <div className="flex-1">
          <ScrollReveal delay={0.2}>
            <p className="font-sans text-lg text-velora-charcoal/90 dark:text-white/90 leading-relaxed max-w-xl">
              Pour nous, la gestion immobilière n&apos;est pas une case à cocher —
              c&apos;est un engagement que nous renforçons au quotidien avec une
              maintenance proactive, des rapports transparents et une culture où
              chaque immeuble est traité comme le nôtre.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
