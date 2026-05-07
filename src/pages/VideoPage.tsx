import { useLocale } from "../context/LocaleContext";
import { SITE_URL } from "../config";

const VIDEO_SRC = "/videos/hero-bg-mobile.mp4";
const VIDEO_POSTER = "/og-image.png";

export function VideoPage() {
  const { locale } = useLocale();
  const isEn = locale === "en";

  return (
    <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <h1 className="font-sans font-semibold text-3xl lg:text-5xl text-nd-display mb-4">
          {isEn ? "Gestion Velora - Hero video" : "Gestion Velora - Video hero"}
        </h1>
        <p className="font-sans text-base lg:text-lg text-black/70 dark:text-white/70 mb-8">
          {isEn
            ? "Official hero video used on the Gestion Velora homepage."
            : "Video officielle utilisee sur la page d'accueil de Gestion Velora."}
        </p>

        <video
          className="w-full rounded-2xl border border-black/10 dark:border-white/15 bg-black"
          controls
          preload="metadata"
          playsInline
          poster={VIDEO_POSTER}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          {isEn
            ? "Your browser does not support the video tag."
            : "Votre navigateur ne prend pas en charge la balise video."}
        </video>

        <p className="font-mono text-xs text-black/55 dark:text-white/55 mt-4 break-all">
          {SITE_URL}
          {VIDEO_SRC}
        </p>
      </div>
    </main>
  );
}
