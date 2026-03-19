import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const HERO_VIDEO = "/videos/hero-bg.mp4";

export function HeroSection() {
  const { t } = useTranslation();
  const heroPartners = t("heroPartners", { returnObjects: true }) as string[];

  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-between items-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)",
      }}
      aria-label="Hero"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)",
        }}
        aria-hidden
      >
        <source src={HERO_VIDEO} type="video/mp4" />
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
          className="font-sans text-lg lg:text-xl text-white/75 max-w-xl mb-8 mx-auto"
        >
          {t("hero.subtitle")}
        </motion.p>

      </div>

      <div className="relative z-[2] w-full pb-12 lg:pb-16 px-6 lg:px-16">
        <div className="max-w-[90rem] mx-auto flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-80">
          {heroPartners.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
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
