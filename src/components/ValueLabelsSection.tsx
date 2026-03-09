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
  { from: "rgba(72,92,17,0.25)", to: "rgba(72,92,17,0)" },
  { from: "rgba(142,156,120,0.2)", to: "rgba(142,156,120,0)" },
  { from: "rgba(212,168,83,0.3)", to: "rgba(212,168,83,0)" },
];

export function ValueLabelsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % values.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-16 bg-[#191818] dark:bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[90rem] mx-auto relative">
        <ScrollReveal>
          <h2 className="font-playfair text-4xl lg:text-5xl text-white leading-tight mb-16">
            Débloquer le potentiel dans le monde réel.
          </h2>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Labels with sliding accent */}
          <div className="relative flex gap-6 lg:flex-col lg:pr-6">
            <motion.div
              className="absolute left-0 top-0 w-0.5 h-5 bg-velora-gold rounded-full hidden lg:block"
              initial={false}
              animate={{ y: active * 44 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <div className="flex gap-6 lg:flex-col pl-4 sm:pl-0 sm:ml-2">
              {values.map((v, i) => (
                <motion.button
                  key={v.label}
                  onClick={() => setActive(i)}
                  whileHover={{ x: 4 }}
                  className={`font-sans text-sm uppercase tracking-widest transition-colors duration-300 text-left ${
                    active === i
                      ? "text-velora-gold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {v.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Description text */}
          <div className="flex-1 min-h-[120px] relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-sans text-xl lg:text-2xl text-white/80 max-w-2xl"
              >
                {values[active].text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: dynamic gradient orb - fills whitespace */}
        <ScrollReveal delay={0.2} direction="right" className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 -translate-x-8 pointer-events-none w-64 h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0 rounded-full blur-3xl opacity-80 dark:opacity-60"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${valueGradients[active].from}, ${valueGradients[active].to})`,
              }}
            />
          </AnimatePresence>
        </ScrollReveal>

        {/* Bottom accent line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-velora-gold/40 to-transparent"
        />
      </div>
    </section>
  );
}
