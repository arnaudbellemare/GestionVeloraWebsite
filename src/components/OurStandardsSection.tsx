import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const BG_VIDEO = "/videos/our-standards-bg.mp4";
const BG_IMAGE = "/images/our-standards-bg-clean.png";

export function OurStandardsSection() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "8%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.3, 0.7, 1, 0.7, 0.3]);
  const leftY = useTransform(scrollYProgress, [0, 0.25, 0.5], [40, 0, -20]);
  const rightY = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [30, 0, -15]);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
  }, []);

  return (
    <section ref={ref} id="standards" className="relative min-h-[600px] flex overflow-hidden pt-24 lg:pt-24 -mt-px bg-[#faf9f7] dark:bg-[#0f0f0f]">
      {/* Background: poster image + video with smooth crossfade */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 w-full h-full">
          {/* Poster image — always visible behind */}
          <img
            src={BG_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 60%" }}
          />
          {/* Video — fades in over poster once loaded */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlayThrough={handleCanPlay}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out"
            style={{
              objectPosition: "center 60%",
              opacity: videoReady ? 1 : 0,
            }}
          >
            <source src={BG_VIDEO} type="video/mp4" />
          </video>
        </div>
        {/* Fade vers la section suivante */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none dark:hidden"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 70%, #fff 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none hidden dark:block"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(18,18,18,0.6) 60%, #121212 100%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-[90rem] mx-auto px-6 lg:px-16 py-24 items-center gap-16">
        <motion.div className="flex-1" style={{ opacity, y: leftY }}>
          <h2
            className="font-playfair font-bold text-4xl lg:text-6xl text-white leading-[1.1] mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          >
            {t("ourStandards.title")}
          </h2>
          <motion.a
            href="mailto:info@gestionvelora.com"
            rel="noopener noreferrer"
            target="_blank"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white text-white font-sans font-semibold text-sm hover:bg-white hover:text-black transition-colors duration-300 shadow-[0_2px_16px_rgba(0,0,0,0.3)]"
          >
            {t("ourStandards.cta")}
            <span className="text-xs" aria-hidden="true">→</span>
          </motion.a>
        </motion.div>
        <motion.div className="flex-1" style={{ opacity, y: rightY }}>
          <p className="font-sans text-lg text-white leading-relaxed max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
            {t("ourStandards.text")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
