import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const values = [
  {
    label: "Transparent",
    text: "Rapports financiers clairs, données en temps réel, et une visibilité totale sur chaque décision.",
  },
  {
    label: "Proactif",
    text: "Maintenance préventive et détection des problèmes avant qu'ils ne s'aggravent.",
  },
  {
    label: "Fiable",
    text: "Une équipe disponible 24/7, des processus éprouvés et un engagement sans faille.",
  },
];

const valueGradients = [
  { from: "rgba(72,92,17,0.35)", to: "rgba(72,92,17,0)" },
  { from: "rgba(142,156,120,0.3)", to: "rgba(142,156,120,0)" },
  { from: "rgba(212,168,83,0.4)", to: "rgba(212,168,83,0)" },
];

export function ValueLabelsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % values.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="pt-16 pb-24 sm:pt-24 sm:pb-32 lg:py-32 px-5 sm:px-6 lg:px-16 bg-[#191818] dark:bg-[#0a0a0a] overflow-x-hidden">
      <div className="max-w-[90rem] mx-auto relative">
        <ScrollReveal>
          <h2 className="font-playfair text-2xl sm:text-3xl lg:text-5xl text-white font-bold leading-tight mb-10 sm:mb-16 max-w-2xl">
            Débloquer le potentiel dans le monde réel.
          </h2>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-start">
          {/* Labels with sliding accent */}
          <div className="relative flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 lg:flex-col lg:pr-6 shrink-0 w-full lg:w-auto">
            <motion.div
              className="absolute left-0 top-0 w-0.5 h-5 bg-amber-300 rounded-full hidden lg:block"
              initial={false}
              animate={{ y: active * 44 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 lg:flex-col lg:pl-4 lg:ml-2">
              {values.map((v, i) => (
                <motion.button
                  key={v.label}
                  onClick={() => setActive(i)}
                  whileHover={{ x: 4 }}
                  className={`font-sans text-sm uppercase tracking-wide sm:tracking-widest transition-colors duration-300 text-left ${
                    active === i
                      ? "text-amber-300"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {v.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Description text */}
          <div className="flex-1 min-h-[80px] sm:min-h-[100px] lg:min-h-[140px] relative min-w-0 w-full">
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-sans text-base sm:text-lg lg:text-2xl text-white max-w-2xl leading-relaxed"
              >
                {values[active].text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Right/bottom: dynamic gradient orb - hidden on mobile to avoid overlap */}
        <div className="hidden sm:block absolute right-0 bottom-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 -translate-x-2 lg:-translate-x-4 pointer-events-none w-48 h-48 lg:w-72 lg:h-72 shrink-0">
          {valueGradients.map((grad, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: active === i ? 0.85 : 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 70% 70%, ${grad.from} 0%, ${grad.to} 70%)`,
                filter: "blur(60px)",
              }}
            />
          ))}
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 sm:mt-12 lg:mt-16 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent w-full max-w-[90rem]"
        />
      </div>
    </section>
  );
}
