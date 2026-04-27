import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { useGoToContact } from "../hooks/useGoToContact";
import { useLoadWhenInView } from "../hooks/useDeferredMedia";

const BG_VIDEO_DESKTOP = "/videos/our-standards-bg-desktop.mp4";
const BG_VIDEO_MOBILE = "/videos/our-standards-bg-mobile.mp4";
const BG_IMAGE = "/images/our-standards-bg-clean.png";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export function OurStandardsSection() {
  const { t } = useTranslation();
  const { contactHref, goToContact } = useGoToContact();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  /** Start fetching while the section is still below the fold so playback can begin sooner. */
  const loadVideo = useLoadWhenInView(ref, "320px 0px");

  useEffect(() => {
    if (!loadVideo) return;
    videoRef.current?.load();
  }, [loadVideo]);

  const handleCanPlay = useCallback(() => {
    const v = videoRef.current;
    if (v) void v.play().catch(() => {});
    setVideoReady(true);
  }, []);

  return (
    <section
      ref={ref}
      id="standards"
      className="relative min-h-[600px] flex overflow-hidden pt-24 lg:pt-24 -mt-px bg-black"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black">
          {/* Static frame (matches video) until the MP4 can render - avoids an empty area before load */}
          <img
            src={BG_IMAGE}
            alt=""
            aria-hidden
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 60%" }}
          />
          <video
            ref={videoRef}
            poster={BG_IMAGE}
            autoPlay
            loop
            muted
            playsInline
            preload={loadVideo ? "auto" : "none"}
            onCanPlay={handleCanPlay}
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out"
            style={{
              objectPosition: "center 60%",
              opacity: videoReady ? 1 : 0,
            }}
          >
            {loadVideo ? (
              <>
                <source src={BG_VIDEO_MOBILE} type="video/mp4" media="(max-width: 767px)" />
                <source src={BG_VIDEO_DESKTOP} type="video/mp4" />
              </>
            ) : null}
          </video>
        </div>
        <div className="absolute inset-0 bg-black/42" aria-hidden />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-[90rem] mx-auto px-6 lg:px-16 py-24 items-center gap-12 lg:gap-14 border-b border-[#333333]">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease }}
        >
          <h2 id="nos-standards" className="font-sans font-medium text-4xl lg:text-6xl text-white leading-[1.08] tracking-[-0.02em] mb-6 max-w-[18ch]">
            {t("ourStandards.title")}
          </h2>
          <a
            href={contactHref}
            onClick={goToContact}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/70 text-white font-sans font-medium text-sm bg-white/5 hover:bg-white hover:text-black transition-colors"
          >
            {t("ourStandards.cta")}
            <span className="text-xs" aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.08, ease }}
        >
          <p className="font-sans text-[1.02rem] lg:text-[1.1rem] text-white/88 leading-relaxed max-w-[60ch]">
            {t("ourStandards.text")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
