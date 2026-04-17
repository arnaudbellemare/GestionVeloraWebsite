import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useGoToContact } from "../hooks/useGoToContact";
import { useIdleReady } from "../hooks/useDeferredMedia";

const HERO_VIDEO = "/videos/hero-bg.mp4";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export function HeroSection() {
  const { t } = useTranslation();
  const { contactHref, goToContact } = useGoToContact();
  const heroPartners = t("heroPartners", { returnObjects: true }) as string[];
  const videoRef = useRef<HTMLVideoElement>(null);
  const idleReady = useIdleReady(2800);

  useEffect(() => {
    if (!idleReady) return;
    videoRef.current?.load();
  }, [idleReady]);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-between items-center overflow-hidden bg-black"
      aria-label="Hero"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ backgroundColor: "#000" }}
        aria-hidden
      >
        {idleReady ? <source src={HERO_VIDEO} type="video/mp4" /> : null}
      </video>
      <div className="absolute inset-0 z-[1] bg-black/50" aria-hidden />

      <div className="relative z-[2] max-w-4xl px-6 lg:px-16 w-full text-left sm:text-center flex flex-col items-start sm:items-center flex-1 justify-center pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease }}
          className="font-playfair font-semibold text-[clamp(2.25rem,6vw,4rem)] lg:text-[clamp(3rem,7vw,4.75rem)] leading-[1.08] tracking-[-0.02em] text-white mb-6"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.22, ease }}
          >
            {t("hero.line1")}
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.32, ease }}
          >
            {t("hero.line2")}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.42, ease }}
          className="font-sans text-base lg:text-lg text-white/80 max-w-xl mb-4 sm:mx-auto"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.5, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 max-w-xl mb-10 sm:mx-auto"
        >
          <span>{t("hero.trustLine")}</span>{" "}
          <a
            href="#testimonials"
            className="text-white/85 underline underline-offset-2 decoration-white/25 hover:text-white hover:decoration-white/50"
          >
            {t("hero.trustLink")}
          </a>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.55, ease }}
          className="flex flex-col items-stretch sm:items-center justify-start sm:justify-center gap-3 w-full max-w-lg sm:mx-auto"
        >
          <a
            href={contactHref}
            onClick={goToContact}
            className="inline-flex items-center justify-center px-6 sm:px-9 py-3 sm:py-3.5 rounded-full min-h-[44px] w-full sm:w-auto font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.12em] text-white bg-black/40 backdrop-blur-md border border-white/45 shadow-[0_4px_28px_rgba(0,0,0,0.25)] transition-[color,background-color,box-shadow,border-color] duration-200 ease-out hover:bg-black/55 hover:border-white/60 hover:shadow-[0_8px_36px_rgba(0,0,0,0.3)] active:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            {t("hero.ctaContact")}
          </a>
          <a
            href="#specification"
            className="inline-flex items-center justify-center sm:justify-center px-2 py-1 text-[11px] sm:text-xs text-white/55 hover:text-white/90 font-mono uppercase tracking-[0.14em] underline underline-offset-[0.25em] decoration-white/25 hover:decoration-white/45 transition-colors"
          >
            {t("hero.ctaDiscover")}
          </a>
        </motion.div>
      </div>

      <div className="relative z-[2] w-full pb-12 lg:pb-16 px-6 lg:px-16">
        <div className="max-w-[90rem] mx-auto flex flex-wrap justify-start sm:justify-center items-center gap-6 lg:gap-10">
          {heroPartners.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ duration: 0.35, delay: 0.65 + i * 0.04, ease }}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
