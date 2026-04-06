import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useGoToContact } from "../hooks/useGoToContact";
import { useIdleReady } from "../hooks/useDeferredMedia";

const HERO_VIDEO = "/videos/hero-bg.mp4";

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
      className="relative w-full min-h-screen flex flex-col justify-between items-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)",
      }}
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
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)",
        }}
        aria-hidden
      >
        {idleReady ? <source src={HERO_VIDEO} type="video/mp4" /> : null}
      </video>
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.1) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-[2] max-w-4xl px-6 lg:px-16 w-full text-center flex flex-col items-center flex-1 justify-center pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-playfair font-bold text-[clamp(2.5rem,6vw,4.5rem)] lg:text-[clamp(3.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-white mb-5"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {t("hero.line1")}
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {t("hero.line2")}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="font-sans text-lg lg:text-xl text-white/75 max-w-xl mb-5 mx-auto"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.72 }}
          className="font-sans text-sm text-white/55 max-w-xl mb-8 mx-auto"
        >
          <span>{t("hero.trustLine")}</span>{" "}
          <a
            href="#testimonials"
            className="text-white/85 underline underline-offset-2 decoration-white/30 hover:text-white hover:decoration-white/60 transition-colors"
          >
            {t("hero.trustLink")}
          </a>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.78 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-lg"
        >
          <motion.a
            href={contactHref}
            onClick={goToContact}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-neutral-900 font-sans font-semibold text-sm shadow-lg shadow-black/20 hover:bg-white/95 transition-colors w-full sm:w-auto min-h-[44px]"
          >
            {t("hero.ctaContact")}
          </motion.a>
          <motion.a
            href="#specification"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-white/45 text-white font-sans font-semibold text-sm hover:bg-white/10 transition-colors w-full sm:w-auto min-h-[44px]"
          >
            {t("hero.ctaDiscover")}
          </motion.a>
        </motion.div>
      </div>

      <div className="relative z-[2] w-full pb-12 lg:pb-16 px-6 lg:px-16">
        <div className="max-w-[90rem] mx-auto flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-80">
          {heroPartners.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 + i * 0.05 }}
              className="font-sans text-sm lg:text-base font-semibold text-white/90 tracking-wide"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
