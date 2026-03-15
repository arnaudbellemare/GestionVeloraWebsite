import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BG_IMAGE = "/images/our-standards-bg-clean.png";

export function OurStandardsSection() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "8%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.3, 0.7, 1, 0.7, 0.3]);
  const leftY = useTransform(scrollYProgress, [0, 0.25, 0.5], [40, 0, -20]);
  const rightY = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [30, 0, -15]);

  return (
    <section ref={ref} id="standards" className="relative min-h-[600px] flex overflow-hidden pt-24 lg:pt-24 -mt-px bg-[#faf9f7] dark:bg-[#0f0f0f]">
      {/* Background: oversized to avoid black bars when parallax shifts */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: bgY }}
      >
        <div className="absolute -top-[30%] -left-[15%] -right-[15%] -bottom-[15%] w-[130%] h-[160%]">
          <img
            src={BG_IMAGE}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </div>
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Fade vers la section suivante pour éviter la coupure nette */}
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
          <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-white leading-tight mb-8">
            {t("ourStandards.title")}
          </h2>
          <motion.a
            href="mailto:info@gestionvelora.com"
            rel="noopener noreferrer"
            target="_blank"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white text-white font-sans font-semibold text-sm hover:bg-white hover:text-black transition-colors duration-300"
          >
            {t("ourStandards.cta")}
            <span className="text-xs" aria-hidden="true">→</span>
          </motion.a>
        </motion.div>
        <motion.div className="flex-1" style={{ opacity, y: rightY }}>
          <p className="font-sans text-lg text-white/90 leading-relaxed max-w-xl">
            {t("ourStandards.text")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
