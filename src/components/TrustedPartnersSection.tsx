import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { useGoToContact } from "../hooks/useGoToContact";

const partnerLogos = [
  "Groupe Velora",
  "Atlas Immobilier",
  "Crown Properties",
  "Pinnacle Gestion",
  "Vertex Capital",
  "Harbor Corp",
];

const listContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

const listItem = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function TrustedPartnersSection() {
  const { t } = useTranslation();
  const { contactHref, goToContact } = useGoToContact();
  const reduceMotion = useReducedMotion();
  const partners = t("trustedPartners.partners", { returnObjects: true }) as {
    name: string;
    quote: string;
    author: string;
    role: string;
  }[];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = partners[activeIndex];

  const contentTransition = reduceMotion
    ? { duration: 0.2 }
    : { type: "spring" as const, stiffness: 320, damping: 32, mass: 0.85 };

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 px-6 lg:px-16 bg-velora-darker scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <ScrollReveal amount={0.3}>
              <span className="inline-block font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-amber-300/90">
                {t("trustedPartners.label")}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.06} amount={0.25} scale>
              <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-white leading-tight">
                {t("trustedPartners.title")}
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.12} direction="right" amount={0.25}>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <p className="font-serif text-base lg:text-lg text-white/70 max-w-md text-left sm:text-right">
                {t("trustedPartners.subtitle")}
              </p>
              <motion.a
                href={contactHref}
                onClick={goToContact}
                className="font-serif text-sm font-medium text-white/70 hover:text-white transition-colors underline underline-offset-2 inline-flex items-center gap-1"
                whileHover={reduceMotion ? undefined : { x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {t("trustedPartners.seeMore")}
                {reduceMotion ? (
                  <span aria-hidden>→</span>
                ) : (
                  <motion.span
                    aria-hidden
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                )}
              </motion.a>
            </div>
          </ScrollReveal>
        </div>

        {/* Main content: left list + right card */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: Vertical company list */}
          <LayoutGroup>
            <div className="lg:w-1/3">
              <motion.div
                className="flex flex-row lg:flex-col gap-4 lg:gap-6 flex-wrap lg:flex-nowrap"
                variants={listContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {partners.map((p, i) => (
                  <motion.div key={p.name} variants={listItem}>
                    <motion.button
                      onClick={() => setActiveIndex(i)}
                      className={`flex w-full items-center gap-3 text-left font-sans font-bold text-xl lg:text-2xl transition-colors duration-300 ${
                        activeIndex === i
                          ? "text-white"
                          : "text-white/40 hover:text-white/65"
                      }`}
                      whileHover={reduceMotion ? undefined : { x: 4 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                    >
                      {/* Fixed-width rail so labels line up whether the bar is visible */}
                      <span
                        className="flex h-8 w-3 shrink-0 items-center justify-center"
                        aria-hidden
                      >
                        {activeIndex === i ? (
                          <motion.span
                            layoutId="trustedPartnerListAccent"
                            className="h-8 w-0.5 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.35)]"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        ) : null}
                      </span>
                      <span className="relative min-w-0">{p.name}</span>
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Dark testimonial card */}
            <motion.div
              className="flex-1 w-full min-w-0"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="relative rounded-2xl bg-neutral-900 p-8 lg:p-12 min-h-[320px] flex flex-col shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.06]">
                {!reduceMotion && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-400/[0.07] blur-3xl"
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.5, 0.75, 0.5],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Tabs */}
                <div className="relative z-10 flex flex-wrap gap-2 mb-8">
                  {partners.map((p, i) => (
                    <motion.button
                      key={p.name}
                      onClick={() => setActiveIndex(i)}
                      className={`relative z-0 font-sans text-sm px-4 py-2 rounded-full transition-colors ${
                        activeIndex === i
                          ? "text-neutral-900"
                          : "text-white/60 hover:text-white/90"
                      }`}
                      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                    >
                      {activeIndex === i && (
                        <motion.span
                          layoutId="trustedPartnerTab"
                          className="absolute inset-0 rounded-full bg-white shadow-[0_4px_20px_rgba(255,255,255,0.12)]"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      )}
                      <span className="relative z-10">{p.name}</span>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 14, filter: "blur(6px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -10, filter: "blur(4px)" }
                    }
                    transition={contentTransition}
                    className="relative z-10 flex flex-1 flex-col justify-center"
                  >
                    <div className="relative mb-8">
                      {!reduceMotion && (
                        <motion.span
                          aria-hidden
                          className="pointer-events-none absolute -left-1 -top-4 font-playfair text-7xl leading-none text-white/[0.06] sm:text-8xl"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            ...contentTransition,
                            delay: 0.04,
                          }}
                        >
                          &ldquo;
                        </motion.span>
                      )}
                      <blockquote className="relative font-sans text-xl lg:text-2xl text-white leading-relaxed">
                        &laquo; {active.quote} &raquo;
                      </blockquote>
                    </div>
                    <footer>
                      <cite className="font-sans font-bold text-white not-italic block">
                        <motion.span
                          className="not-italic"
                          initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ ...contentTransition, delay: 0.06 }}
                        >
                          {active.author}
                        </motion.span>
                      </cite>
                      <motion.p
                        className="font-sans text-sm text-white/60 mt-1"
                        initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ ...contentTransition, delay: 0.1 }}
                      >
                        {active.role}
                      </motion.p>
                    </footer>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </LayoutGroup>
        </div>

        {/* Bottom: Partner logos marquee */}
        <div className="mt-24 lg:mt-32 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 z-10 pointer-events-none bg-gradient-to-r from-velora-darker to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 z-10 pointer-events-none bg-gradient-to-l from-velora-darker to-transparent" />
          <motion.div
            className="flex w-max animate-marquee"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {[0, 1].map((dup) => (
              <div
                key={dup}
                className="flex gap-12 lg:gap-20 py-4 pr-12 lg:pr-20 shrink-0"
              >
                {partnerLogos.map((name) => (
                  <motion.span
                    key={`${name}-${dup}`}
                    className="inline-block font-sans text-lg lg:text-2xl font-bold text-white/25 shrink-0 whitespace-nowrap cursor-default"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { color: "rgba(255,255,255,0.45)", y: -2 }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {name}
                  </motion.span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
