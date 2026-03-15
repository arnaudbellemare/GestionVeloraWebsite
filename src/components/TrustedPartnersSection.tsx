import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const MOBILE_BREAKPOINT = 1024;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsMobile(mq.matches);
    const fn = () => setIsMobile(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return isMobile;
}

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
  const isMobile = useIsMobile();
  const partners = t("trustedPartners.partners", { returnObjects: true }) as {
    name: string;
    quote: string;
    author: string;
    role: string;
  }[];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = partners[activeIndex];

  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-16 overflow-hidden isolate">
      {/* Background layer: isolated so switching partners doesn’t repaint or change it */}
      <div
        className="absolute inset-0 z-0 overflow-hidden [transform:translateZ(0)] [contain:paint]"
        aria-hidden
      >
        {/* Mobile: 1280×720 sharp; desktop: 4K. Add trusted-partners-halftone-mobile.png (1280×720) for crisp mobile. */}
        <picture>
          <source
            media="(max-width: 1023px)"
            srcSet="/images/trusted-partners-halftone-mobile.png"
          />
          <img
            src="/images/trusted-partners-halftone.png"
            alt=""
            width={3840}
            height={2160}
            className="absolute inset-0 w-full h-full object-cover object-[center_42%] [transform:translateZ(0)]"
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
          />
        </picture>
        <div
          className="absolute inset-0 bg-velora-darker/35 pointer-events-none"
          aria-hidden
        />
      </div>
      <div className="relative z-10 max-w-[90rem] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-16 -mt-4">
          <ScrollReveal>
            <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-white leading-tight max-w-2xl">
              {t("trustedPartners.title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="flex flex-col items-start sm:items-end gap-2">
            <p className="font-serif text-base lg:text-lg max-w-md text-left sm:text-right text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,.6)]">
              {t("trustedPartners.subtitle")}
            </p>
            <motion.a
              href="#contact"
              whileHover={{ x: 4 }}
              className="font-serif text-sm font-medium text-white/90 hover:text-waabi-pink transition-colors underline underline-offset-2 inline-flex items-center gap-1 [text-shadow:0_1px_2px_rgba(0,0,0,.5)]"
            >
              {t("trustedPartners.seeMore")}
              <span aria-hidden>→</span>
            </motion.a>
          </ScrollReveal>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: Vertical company list */}
          <ScrollReveal delay={0.1} className="lg:w-1/3">
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 flex-wrap lg:flex-nowrap">
              {partners.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setActiveIndex(i)}
                  type="button"
                  className={`font-sans font-bold text-xl lg:text-2xl text-left transition-colors [touch-action:manipulation] [text-shadow:0_1px_2px_rgba(0,0,0,.4)] ${
                    activeIndex === i
                      ? "text-white"
                      : "text-white/80 sm:text-white/70 lg:text-white/40 hover:text-white/90 lg:hover:text-white/60"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: Dark testimonial card */}
          <ScrollReveal delay={0.2} className="flex-1 w-full min-w-0">
            <div className="rounded-2xl bg-neutral-900 p-8 lg:p-12 min-h-[320px] flex flex-col shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/10 dark:ring-white/5">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {partners.map((p, i) => (
                <motion.button
                  key={p.name}
                  onClick={() => setActiveIndex(i)}
                  className={`font-sans text-sm px-4 py-2 rounded-full transition-all [touch-action:manipulation] ${
                      activeIndex === i
                        ? "bg-white text-neutral-900"
                        : "text-white/60 hover:text-white/90 hover:bg-white/10"
                    }`}
                  >
                    {p.name}
                  </motion.button>
                ))}
              </div>

              {isMobile ? (
                <div key={activeIndex} className="flex-1 flex flex-col justify-center">
                  <blockquote className="font-sans text-xl lg:text-2xl text-white leading-relaxed mb-8">
                    « {active.quote} »
                  </blockquote>
                  <footer>
                    <cite className="font-sans font-bold text-white not-italic block">
                      {active.author}
                    </cite>
                    <p className="font-sans text-sm text-white/60 mt-1">
                      {active.role}
                    </p>
                  </footer>
                </div>
              ) : (
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
                      « {active.quote} »
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
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom: Partner logos marquee — high contrast, no side overlays */}
        <div className="mt-24 lg:mt-32 overflow-hidden">
          <motion.div
            className="flex gap-12 lg:gap-20 py-4"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-sans text-lg lg:text-2xl font-bold shrink-0 whitespace-nowrap text-white/95 [text-shadow:0_1px_3px_rgba(0,0,0,.6)]"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
