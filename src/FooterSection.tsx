import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { InternalLink } from "./components/InternalLink";
import { PORTAL_URLS } from "./config";
import { useLocale } from "./context/LocaleContext";

/** Encoded in the iframe bundle’s QR; opens the marketing site when scanned. */
const QR_SITE_URL = "https://www.gestionvelora.com/";

const QR_TREE_MSG = { channel: "gv-qr-tree", type: "setSeason" } as const;

/** Standalone bundle (`public/static/qr-tree-standalone.*`): WebGPU tree, tap/QR↔3D toggle - same as shipped JS. */
function qrTreeStandaloneIframeSrc(): string {
  return `/static/qr-tree-standalone.html?embed=1&q=${encodeURIComponent(QR_SITE_URL)}`;
}

export const FooterSection = (): JSX.Element => {
  const { t } = useTranslation();
  const { locale } = useLocale();
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
    { label: t("footer.allServices"), to: "/services" },
    { label: locale === "en" ? "Comparisons" : "Comparatifs", to: "/compare" },
    { label: locale === "en" ? "City pages" : "Pages locales", to: "/locations" },
    { label: t("footer.standards"), to: "/#standards" },
    { label: t("footer.process"), to: "/#process" },
    { label: t("footer.testimonials"), to: "/#testimonials" },
    { label: t("footer.portailsSection"), to: "/#portails" },
    { label: t("footer.faq"), to: "/faq" },
    { label: t("footer.tarifs"), to: "/tarifs" },
    { label: t("footer.insights"), to: "/blog" },
    { label: t("footer.contactLink"), to: "/#contact-form" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative bg-black overflow-hidden border-t border-[#222222]"
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
            <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#999999] mb-4">
              {t("footer.contact")}
            </h4>
            <a
              href="tel:+15147771731"
              className="font-sans text-[#E8E8E8] hover:text-white transition-colors block mb-2"
            >
              (514) 777-1731
            </a>
            <a
              href="mailto:info@gestionvelora.com"
              className="font-sans text-[#E8E8E8] hover:text-white transition-colors block mb-4"
            >
              info@gestionvelora.com
            </a>
            <p className="font-sans text-sm text-[#999999] leading-relaxed">
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
            <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#999999] mb-4">
              {t("footer.portals")}
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={PORTAL_URLS.manager}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[#E8E8E8] hover:text-white transition-colors"
              >
                {t("footer.managerPortal")}
              </a>
              <a
                href={PORTAL_URLS.service}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[#E8E8E8] hover:text-white transition-colors"
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
            <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#999999] mb-4">
              {t("footer.navigation")}
            </h4>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {navigationLinks.map((link) => (
                <InternalLink
                  key={`${link.to}-${link.label}`}
                  to={link.to}
                  className="font-sans text-[#E8E8E8] hover:text-white transition-colors"
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
              <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#999999] whitespace-nowrap">
                {t("footer.ourSite")}
              </h4>
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#666666] leading-none whitespace-nowrap">
                {t("footer.qrClickMe")}
              </p>
            </div>
            <div className="relative aspect-square w-full max-w-[16rem] overflow-hidden rounded-sm bg-black">
              <iframe
                ref={qrTreeIframeRef}
                title={t("footer.qrIframeTitle")}
                src={qrTreeStandaloneIframeSrc()}
                className="absolute inset-0 h-full w-full border-0 bg-black block pointer-events-auto"
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
                  className={`box-border min-w-0 w-full max-w-full px-1.5 py-1 font-mono text-[9px] uppercase tracking-wider leading-tight rounded-sm border text-center transition-colors ${
                    qrSeason === key
                      ? "border-[#D71921] bg-[rgba(215,25,33,0.15)] text-white"
                      : "border-[#333333] bg-transparent text-[#999999] hover:text-white hover:border-[#444444]"
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
            <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#999999] mb-4">
              {t("footer.newsletter")}
            </h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              data-toolname="newsletter-subscribe"
              data-tooldescription="Submit newsletter email"
              className="flex items-center gap-2 border-b border-white/30 pb-2"
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                {t("footer.emailPlaceholder")}
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                aria-label={t("footer.emailPlaceholder")}
                placeholder={t("footer.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-white placeholder-white/50 font-sans text-sm focus:outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                data-toolname="newsletter-submit"
                data-tooldescription="Confirm newsletter subscription"
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

      {/* 3D City Brand Image - top scrim fades footer black into the skyline */}
      <div className="relative overflow-hidden">
        <picture className="block dark:hidden">
          <source srcSet="/images/footer-city-light.webp" type="image/webp" />
          <img src="/images/footer-city-light.png?v=4" alt="Gestion Velora - vue aérienne Montréal" className="w-full h-auto" />
        </picture>
        <picture className="hidden dark:block">
          <source srcSet="/images/footer-city-dark.webp" type="image/webp" />
          <img src="/images/footer-city-dark.png?v=4" alt="Gestion Velora - vue aérienne Montréal" className="w-full h-auto" />
        </picture>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 sm:h-[5.25rem]"
          style={{
            background:
              "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.52) 22%, rgba(0,0,0,0.22) 48%, rgba(0,0,0,0.06) 72%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Bottom bar: copyright, privacy, etc. */}
      <div className="border-t border-[#222222]">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#999999]">
          <span>©{new Date().getFullYear()} Gestion Velora</span>
          <div className="flex flex-wrap items-center gap-4">
            <InternalLink to="/privacy" className="hover:text-white transition-colors duration-300">
              {t("footer.privacy")}
            </InternalLink>
            <a href="/about" className="hover:text-white transition-colors duration-300">
              {locale === "en" ? "About" : "À propos"}
            </a>
            <a href="/methodology" className="hover:text-white transition-colors duration-300">
              {locale === "en" ? "Methodology" : "Méthodologie"}
            </a>
            <a href="/trust-proof" className="hover:text-white transition-colors duration-300">
              {locale === "en" ? "Trust" : "Confiance"}
            </a>
          </div>
          <a href="#" className="hover:text-white transition-colors duration-300">
            {t("footer.madeWith")}
          </a>
        </div>
      </div>
    </motion.footer>
  );
};
