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
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
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
    : { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] };

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 px-6 lg:px-16 bg-nd-surface border-y border-nd-border scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <ScrollReveal amount={0.3}>
              <span className="inline-block font-mono text-[10px] tracking-[0.12em] uppercase text-nd-secondary">
                {t("trustedPartners.label")}
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.06} amount={0.25}>
              <h2 className="font-sans font-medium text-4xl lg:text-5xl text-nd-display leading-[1.05] tracking-[-0.02em]">
                {t("trustedPartners.title")}
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.12} direction="right" amount={0.25}>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <p className="font-sans max-w-md text-left text-base font-normal leading-relaxed tracking-[-0.015em] text-nd-primary sm:text-right lg:text-xl">
                {t("trustedPartners.subtitle")}
              </p>
              <a
                href={contactHref}
                onClick={goToContact}
                className="font-sans text-sm font-medium text-nd-secondary hover:text-nd-display dark:hover:text-white underline underline-offset-2 inline-flex items-center gap-1"
              >
                {t("trustedPartners.seeMore")}
                <span aria-hidden>→</span>
              </a>
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
                      className={`flex w-full items-center gap-1.5 text-left font-sans font-bold text-xl lg:text-2xl leading-tight transition-colors duration-300 ${
                        activeIndex === i
                          ? "text-nd-display"
                          : "text-nd-muted hover:text-nd-secondary dark:text-white/40 dark:hover:text-white/65"
                      }`}
                    >
                      <span
                        className="flex w-2 shrink-0 justify-center"
                        aria-hidden
                      >
                        {activeIndex === i ? (
                          <motion.span
                            layoutId="trustedPartnerListAccent"
                            className="w-[2px] shrink-0 rounded-none bg-black dark:bg-white h-[0.58em] lg:h-[0.6em]"
                            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
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
                duration: 0.4,
                delay: 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="relative rounded-2xl bg-[#111111] p-8 lg:p-12 min-h-[320px] flex flex-col border border-[#333333]">
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
                    >
                      {activeIndex === i && (
                        <motion.span
                          layoutId="trustedPartnerTab"
                          className="absolute inset-0 rounded-full bg-white"
                          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                      )}
                      <span className="relative z-10">{p.name}</span>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={contentTransition}
                    className="relative z-10 flex flex-1 flex-col justify-center"
                  >
                    <div className="relative mb-8">
                      {!reduceMotion && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -left-1 -top-4 font-playfair italic text-7xl leading-none text-white/[0.08] sm:text-8xl"
                        >
                          &ldquo;
                        </span>
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

        {/* Bottom: Partner logos marquee — inView on this box only; wide inner strip breaks IO ratio on mobile */}
        <motion.div
          className="mt-24 lg:mt-32 overflow-hidden relative rounded-xl border border-nd-border bg-nd-canvas/80 py-6 dark:border-white/[0.08] dark:bg-black/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -32px 0px" }}
          transition={{ duration: 0.45 }}
        >
          {reduceMotion ? (
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4">
              {partnerLogos.map((name) => (
                <span
                  key={name}
                  className="inline-block font-sans text-lg lg:text-2xl font-semibold tracking-tight text-nd-primary dark:text-zinc-300"
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex w-max animate-marquee">
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  className="flex gap-12 lg:gap-20 py-1 pr-12 lg:pr-20 shrink-0 items-center"
                >
                  {partnerLogos.map((name) => (
                    <span
                      key={`${name}-${dup}`}
                      className="inline-block font-sans text-lg lg:text-2xl font-semibold tracking-tight text-nd-primary hover:text-nd-display shrink-0 whitespace-nowrap cursor-default dark:text-zinc-300 dark:hover:text-white transition-colors"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
