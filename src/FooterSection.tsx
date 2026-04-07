import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { InternalLink } from "./components/InternalLink";
import { PORTAL_URLS } from "./config";

/** Encoded in the iframe bundle’s QR; opens the marketing site when scanned. */
const QR_SITE_URL = "https://www.gestionvelora.com/";

const QR_TREE_MSG = { channel: "gv-qr-tree", type: "setSeason" } as const;

/** Standalone bundle (`public/static/qr-tree-standalone.*`): WebGPU tree, tap/QR↔3D toggle — same as shipped JS. */
function qrTreeStandaloneIframeSrc(): string {
  return `/static/qr-tree-standalone.html?embed=1&q=${encodeURIComponent(QR_SITE_URL)}`;
}

export const FooterSection = (): JSX.Element => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const qrTreeIframeRef = useRef<HTMLIFrameElement>(null);
  /** Synced with bundle via postMessage (0–3). */
  const [qrSeason, setQrSeason] = useState(0);

  const postSeasonToQrTree = useCallback((season: number) => {
    qrTreeIframeRef.current?.contentWindow?.postMessage(
      { ...QR_TREE_MSG, season },
      window.location.origin
    );
  }, []);

  useEffect(() => {
    postSeasonToQrTree(qrSeason);
  }, [qrSeason, postSeasonToQrTree]);
  const navigationLinks = [
    { label: t("footer.home"), to: "/" },
    { label: t("footer.standards"), to: "/#standards" },
    { label: t("footer.faq"), to: "/#faq" },
    { label: t("footer.insights"), to: "/blog" },
    { label: t("footer.contactLink"), to: "/#contact" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative bg-[#1C1C1C] overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto relative z-10 px-6 lg:px-16 pt-16 lg:pt-20 pb-8">
        {/* Top: Contact, Connect, Subscribe columns */}
        <div className="flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap gap-12 lg:gap-16 xl:justify-between mb-8 lg:mb-12">
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/70 mb-4">
              {t("footer.contact")}
            </h4>
            <a
              href="tel:+15147771731"
              className="font-sans text-white/90 hover:text-white transition-colors duration-300 block mb-2"
            >
              (514) 777-1731
            </a>
            <a
              href="mailto:info@gestionvelora.com"
              className="font-sans text-white/90 hover:text-white transition-colors duration-300 block mb-4"
            >
              info@gestionvelora.com
            </a>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              Montréal, QC
            </p>
          </motion.div>

          {/* Connect - Portal access */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/70 mb-4">
              {t("footer.portals")}
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={PORTAL_URLS.manager}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-white/90 hover:text-white transition-colors duration-300"
              >
                {t("footer.managerPortal")}
              </a>
              <a
                href={PORTAL_URLS.service}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-white/90 hover:text-white transition-colors duration-300"
              >
                {t("footer.ownerPortal")}
              </a>
            </div>
          </motion.div>

          {/* Nav */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/70 mb-4">
              {t("footer.navigation")}
            </h4>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {navigationLinks.map((link) => (
                <InternalLink
                  key={link.to}
                  to={link.to}
                  className="font-sans text-white/90 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </InternalLink>
              ))}
            </nav>
          </motion.div>

          {/* QR: standalone WebGPU bundle (3D tree ↔ flat QR; QR encodes QR_SITE_URL) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="shrink-0 w-full min-w-0 max-w-[16rem] self-start text-left"
          >
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2">
              <h4 className="font-sans text-xs uppercase tracking-widest text-white/70 whitespace-nowrap">
                {t("footer.ourSite")}
              </h4>
              <p className="font-serif text-[10px] font-light italic tracking-[0.06em] text-white/50 leading-none whitespace-nowrap">
                {t("footer.qrClickMe")}
              </p>
            </div>
            <div className="relative aspect-square w-full max-w-[16rem] overflow-hidden rounded-sm bg-[#1C1C1C]">
              <iframe
                ref={qrTreeIframeRef}
                title={t("footer.qrIframeTitle")}
                src={qrTreeStandaloneIframeSrc()}
                className="absolute inset-0 h-full w-full border-0 bg-[#1C1C1C] block pointer-events-auto"
                loading="lazy"
                onLoad={() => postSeasonToQrTree(qrSeason)}
              />
            </div>
            <div
              role="group"
              aria-label={t("footer.qrSeasonGroup")}
              className="mt-2 grid w-full grid-cols-2 content-start gap-x-2.5 gap-y-1.5 [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)]"
            >
              {(
                [
                  { key: 0, label: t("footer.qrSeasonSpring") },
                  { key: 1, label: t("footer.qrSeasonSummer") },
                  { key: 2, label: t("footer.qrSeasonAutumn") },
                  { key: 3, label: t("footer.qrSeasonWinter") },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  title={label}
                  aria-label={label}
                  aria-pressed={qrSeason === key}
                  onClick={() => setQrSeason(key)}
                  className={`box-border min-w-0 w-full max-w-full px-1.5 py-1 font-sans text-[10px] leading-tight rounded-sm border text-center transition-colors duration-200 ${
                    qrSeason === key
                      ? "border-[rgba(200,80,120,0.45)] bg-[rgba(200,80,120,0.22)] text-white"
                      : "border-white/12 bg-white/[0.05] text-white/55 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Subscribe */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:flex-1 xl:max-w-xs"
          >
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/70 mb-4">
              {t("footer.newsletter")}
            </h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 border-b border-white/30 pb-2"
            >
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-white placeholder-white/50 font-sans text-sm focus:outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                aria-label={t("footer.subscribe")}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>

      </div>

      {/* 3D City Brand Image — light/dark mode, flush with bottom bar */}
      <div className="relative overflow-hidden">
        {/* Gradient fade from footer content into image */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1C1C1C] to-transparent z-10 pointer-events-none" />
        <img
          src="/images/footer-city-light.png?v=4"
          alt="Gestion Velora - 3D City"
          className="w-full h-auto block dark:hidden"
        />
        <img
          src="/images/footer-city-dark.png?v=4"
          alt="Gestion Velora - 3D City"
          className="w-full h-auto hidden dark:block"
        />
      </div>

      {/* Bottom bar: copyright, privacy, etc. */}
      <div className="border-t border-white/10">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <span>©{new Date().getFullYear()} Gestion Velora</span>
          <InternalLink to="/privacy" className="hover:text-white transition-colors duration-300">
            {t("footer.privacy")}
          </InternalLink>
          <a href="#" className="hover:text-white transition-colors duration-300">
            {t("footer.madeWith")}
          </a>
        </div>
      </div>
    </motion.footer>
  );
};
