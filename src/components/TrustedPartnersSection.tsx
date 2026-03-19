import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const partnerLogos = [
  "Groupe Velora",
  "Atlas Immobilier",
  "Crown Properties",
  "Pinnacle Gestion",
  "Vertex Capital",
  "Harbor Corp",
];

export function TrustedPartnersSection() {
  const { t } = useTranslation();
  const partners = t("trustedPartners.partners", { returnObjects: true }) as {
    name: string;
    quote: string;
    author: string;
    role: string;
  }[];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = partners[activeIndex];

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 px-6 lg:px-16 bg-velora-darker scroll-mt-24"
    >
      <div className="max-w-[90rem] mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-16">
          <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-white leading-tight max-w-2xl">
            {t("trustedPartners.title")}
          </h2>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <p className="font-serif text-base lg:text-lg text-white/70 max-w-md text-left sm:text-right">
              {t("trustedPartners.subtitle")}
            </p>
            <a
              href="#contact"
              className="font-serif text-sm font-medium text-white/70 hover:text-white transition-colors underline underline-offset-2 inline-flex items-center gap-1"
            >
              {t("trustedPartners.seeMore")}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* Main content: left list + right card */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: Vertical company list */}
          <div className="lg:w-1/3">
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 flex-wrap lg:flex-nowrap">
              {partners.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setActiveIndex(i)}
                  className={`font-sans font-bold text-xl lg:text-2xl text-left transition-colors ${
                    activeIndex === i
                      ? "text-white"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Dark testimonial card */}
          <div className="flex-1 w-full min-w-0">
            <div className="rounded-2xl bg-neutral-900 p-8 lg:p-12 min-h-[320px] flex flex-col shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-white/5">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {partners.map((p, i) => (
                  <motion.button
                    key={p.name}
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`font-sans text-sm px-4 py-2 rounded-full transition-all ${
                      activeIndex === i
                        ? "bg-white text-neutral-900"
                        : "text-white/60 hover:text-white/90 hover:bg-white/10"
                    }`}
                  >
                    {p.name}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col justify-center"
                >
                  <blockquote className="font-sans text-xl lg:text-2xl text-white leading-relaxed mb-8">
                    &laquo; {active.quote} &raquo;
                  </blockquote>
                  <footer>
                    <cite className="font-sans font-bold text-white not-italic block">
                      {active.author}
                    </cite>
                    <p className="font-sans text-sm text-white/60 mt-1">
                      {active.role}
                    </p>
                  </footer>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom: Partner logos marquee */}
        <div className="mt-24 lg:mt-32 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 z-10 pointer-events-none bg-gradient-to-r from-velora-darker to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 z-10 pointer-events-none bg-gradient-to-l from-velora-darker to-transparent" />
          <motion.div
            className="flex gap-12 lg:gap-20 py-4"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...partnerLogos, ...partnerLogos, ...partnerLogos].map(
              (name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="font-sans text-lg lg:text-2xl font-bold text-white/25 shrink-0 whitespace-nowrap"
                >
                  {name}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
