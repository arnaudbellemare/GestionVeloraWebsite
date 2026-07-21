import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGoToContact } from "../hooks/useGoToContact";

const HERO_VIDEO_DESKTOP = "/videos/hero-bg-desktop-fast.mp4";
const HERO_IMAGE = "/hero-video-poster.webp?v=5";
const HERO_IMAGE_MEDIUM = "/hero-video-poster-960.webp?v=5";
const HERO_IMAGE_MOBILE = "/hero-video-poster-mobile.webp?v=5";
const HERO_IMAGE_AVIF = "/hero-video-poster.avif?v=5";
const HERO_IMAGE_AVIF_MEDIUM = "/hero-video-poster-960.avif?v=5";
const HERO_IMAGE_AVIF_MOBILE = "/hero-video-poster-mobile.avif?v=5";

export function HeroSection() {
  const { t } = useTranslation();
  const { contactHref, goToContact } = useGoToContact();
  const heroPartners = t("heroPartners", { returnObjects: true }) as string[];
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    // Keep the static poster and skip the video download entirely on data-saver /
    // slow links (also what Lighthouse mobile throttles to).
    if (reduceMotion || conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;

    const media = window.matchMedia("(max-width: 767px)");

    // A full-bleed video becomes a new, late LCP candidate once its first frame
    // paints. Keep mobile on the optimized poster: it saves more than 5 MB and
    // avoids turning decorative motion into a Core Web Vitals regression.
    if (media.matches) return;

    // Defer the multi-MB hero video off the first-paint critical path; the poster
    // image is the LCP element and is already painted.
    const load = () => setVideoSrc(HERO_VIDEO_DESKTOP);
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idleId = hasIdle
      ? window.requestIdleCallback(load, { timeout: 2500 })
      : window.setTimeout(load, 1200);

    return () => {
      if (hasIdle) window.cancelIdleCallback(idleId as number);
      else clearTimeout(idleId as number);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between items-center overflow-hidden bg-black"
      aria-label="Hero"
    >
      <picture>
        <source
          type="image/avif"
          media="(max-width: 767px)"
          srcSet={HERO_IMAGE_AVIF_MOBILE}
        />
        <source
          type="image/avif"
          media="(min-width: 768px)"
          srcSet={`${HERO_IMAGE_AVIF_MEDIUM} 960w, ${HERO_IMAGE_AVIF} 1200w`}
          sizes="100vw"
        />
        <source
          type="image/webp"
          media="(max-width: 767px)"
          srcSet={HERO_IMAGE_MOBILE}
        />
        <source
          type="image/webp"
          media="(min-width: 768px)"
          srcSet={`${HERO_IMAGE_MEDIUM} 960w, ${HERO_IMAGE} 1200w`}
          sizes="100vw"
        />
        <img
          src={HERO_IMAGE_MOBILE}
          alt="Gestion immobilière à Montréal par Gestion Velora"
          width={1200}
          height={676}
          decoding="sync"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {videoSrc && (
        <video
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out"
          style={{ opacity: videoReady ? 1 : 0 }}
          aria-hidden
          src={videoSrc}
        />
      )}
      <div className="absolute inset-0 z-[1] bg-black/50" aria-hidden />

      <div className="relative z-[2] max-w-4xl px-6 lg:px-16 w-full text-left sm:text-center flex flex-col items-start sm:items-center flex-1 justify-center pt-24">
        <h1
          className="font-playfair font-semibold text-[clamp(2.25rem,6vw,4rem)] lg:text-[clamp(3rem,7vw,4.75rem)] leading-[1.08] tracking-[-0.02em] text-white mb-6"
        >
          <span className="block">
            {t("hero.line1")}
          </span>
          <span className="block">
            {t("hero.line2")}
          </span>
        </h1>

        <p
          className="font-sans text-base lg:text-lg text-white/80 max-w-xl mb-4 sm:mx-auto"
        >
          {t("hero.subtitle")}
        </p>

        <p
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 max-w-xl mb-10 sm:mx-auto"
        >
          <span>{t("hero.trustLine")}</span>{" "}
          <a
            href="#testimonials"
            className="text-white/85 underline underline-offset-2 decoration-white/25 hover:text-white hover:decoration-white/50"
          >
            {t("hero.trustLink")}
          </a>
        </p>

        <div
          className="flex flex-col items-stretch sm:items-center justify-start sm:justify-center gap-3 w-full max-w-lg sm:mx-auto"
        >
          <a
            href={contactHref}
            onClick={goToContact}
            className="inline-flex items-center justify-center px-6 sm:px-9 py-3 sm:py-3.5 rounded-full min-h-[44px] w-full sm:w-auto font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.12em] text-white bg-black/40 backdrop-blur-md border border-white/45 shadow-[0_4px_28px_rgba(0,0,0,0.25)] hover:bg-black/55 hover:border-white/60 hover:shadow-[0_8px_36px_rgba(0,0,0,0.3)] active:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            {t("hero.ctaContact")}
          </a>
          <p className="font-sans text-xs text-white/65 text-center sm:text-left">
            {t("hero.ctaSubline")}
          </p>
          <a
            href="#specification"
            className="inline-flex items-center justify-center sm:justify-center px-2 py-1 text-[11px] sm:text-xs text-white/55 hover:text-white/90 font-mono uppercase tracking-[0.14em] underline underline-offset-[0.25em] decoration-white/25 hover:decoration-white/45"
          >
            {t("hero.ctaDiscover")}
          </a>
        </div>
      </div>

      <div className="relative z-[2] w-full pb-12 lg:pb-16 px-6 lg:px-16">
        <div className="max-w-[90rem] mx-auto flex flex-wrap justify-start sm:justify-center items-center gap-6 lg:gap-10">
          {heroPartners.map((name) => (
            <span
              key={name}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
