import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1920&q=80";

export function OurStandardsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.3, 0.7, 1, 0.7, 0.3]);
  const leftY = useTransform(scrollYProgress, [0, 0.25, 0.5], [40, 0, -20]);
  const rightY = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [30, 0, -15]);

  return (
    <section ref={ref} id="standards" className="relative min-h-[600px] flex overflow-hidden pt-24 lg:pt-24 -mt-px">
      {/* Fixed background container - never moves, always covers section */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Parallax image - moves inside the fixed container */}
        <motion.img
          src={BG_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-[120%] object-cover"
          style={{ y: bgY, objectPosition: "center 30%", top: "-10%" }}
        />
        {/* Overlay gradients */}
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
        {/* Bottom fade for smooth transition to next section */}
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
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-[90rem] mx-auto px-6 lg:px-16 py-24 items-center gap-16">
        <motion.div className="flex-1" style={{ opacity, y: leftY }}>
          <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-white leading-tight mb-8">
            Établir de nouveaux standards en gestion immobilière.
          </h2>
          <motion.a
            href="mailto:info@gestionvelora.com"
            rel="noopener noreferrer"
            target="_blank"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white text-white font-sans font-semibold text-sm hover:bg-white hover:text-black transition-colors duration-300"
          >
            Notre approche
            <span className="text-xs" aria-hidden="true">→</span>
          </motion.a>
        </motion.div>
        <motion.div className="flex-1" style={{ opacity, y: rightY }}>
          <p className="font-sans text-lg text-white/90 leading-relaxed max-w-xl">
            Pour nous, la gestion immobilière n&apos;est pas une case à cocher —
            c&apos;est un engagement que nous renforçons au quotidien avec une
            maintenance proactive, des rapports transparents et une culture où
            chaque immeuble est traité comme le nôtre.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
