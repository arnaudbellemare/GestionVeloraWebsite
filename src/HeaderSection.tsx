import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { InternalLink } from "./components/InternalLink";
import { ThemeToggle } from "./components/ThemeToggle";
import { useLocale } from "./context/LocaleContext";
import { PORTAL_URLS } from "./config";
import { useGoToContact } from "./hooks/useGoToContact";

const serviceLinkKeys = [
  { to: "/services", labelKey: "nav.allServices", descKey: "nav.allServicesDesc" },
  { to: "/services/syndicat-copropriete", labelKey: "nav.syndicat", descKey: "nav.syndicatDesc" },
  { to: "/services/airbnb", labelKey: "nav.airbnb", descKey: "nav.airbnbDesc" },
  { to: "/services/location", labelKey: "nav.location", descKey: "nav.locationDesc" },
  { to: "/services/gestion-condo", labelKey: "nav.gestionCondo", descKey: "nav.gestionCondoDesc" },
  { to: "/services/gestion-copropriete", labelKey: "nav.gestionCopropriete", descKey: "nav.gestionCoproprieteDesc" },
];

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const HeaderSection = (): JSX.Element => {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();
  const { contactHref, goToContact: scrollToContact } = useGoToContact();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setServicesOpen(false), 150);
  };
  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const goToContact = useCallback(
    (e?: React.MouseEvent) => {
      setMobileOpen(false);
      scrollToContact(e);
    },
    [scrollToContact]
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-2 sm:pt-4"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-[#333333] opacity-90" aria-hidden />

      <div className="max-w-[90rem] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 px-4 py-2.5 rounded-2xl bg-[#111111] border border-[#333333]">
          <InternalLink to="/" className="flex items-center gap-0.5 shrink-0 -m-1 p-1 rounded-lg">
            <img src="/logo.png" alt="Gestion Velora" className="h-10 w-10 object-contain" />
            <span className="font-sans font-medium text-[#E8E8E8] text-[15px] hidden sm:inline tracking-tight">
              Gestion Velora
            </span>
          </InternalLink>
          <nav className="hidden md:flex items-center gap-0.5 ml-2 pl-2 border-l border-[#333333]">
            <InternalLink
              to="/"
              className="font-sans text-sm text-[#999999] hover:text-white px-2.5 py-1.5 rounded-lg"
            >
              {t("nav.home")}
            </InternalLink>
            <div
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setServicesOpen(true);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className="font-sans text-sm text-[#999999] hover:text-white px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1"
              >
                {t("nav.services")}
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease }}
                  className="absolute top-full left-0 mt-1 py-2 min-w-[280px] rounded-xl bg-[#111111] border border-[#333333]"
                >
                  {serviceLinkKeys.map((s) => (
                    <InternalLink
                      key={s.to}
                      to={s.to}
                      className="block px-4 py-3 hover:bg-[#1A1A1A] transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-[#222222] last:border-0"
                      onClick={() => setServicesOpen(false)}
                    >
                      <span className="font-sans font-medium text-white block">{t(s.labelKey)}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#999999] mt-1 block">
                        {t(s.descKey)}
                      </span>
                    </InternalLink>
                  ))}
                </motion.div>
              )}
            </div>
            <InternalLink
              to="/blog"
              className="font-sans text-sm text-[#999999] hover:text-white px-2.5 py-1.5 rounded-lg"
            >
              {t("nav.insights")}
            </InternalLink>
          </nav>
          <button
            type="button"
            aria-label="Menu"
            className="md:hidden p-2 -mr-1 text-white rounded-lg hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#111111] border border-[#333333]">
          <div className="flex items-center gap-0.5 border-r border-[#333333] pr-2 mr-1">
            <button
              type="button"
              onClick={() => setLocale("fr")}
              className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-md transition-colors ${
                locale === "fr" ? "bg-[#1A1A1A] text-white" : "text-[#999999] hover:text-white"
              }`}
              aria-label="Français"
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-md transition-colors ${
                locale === "en" ? "bg-[#1A1A1A] text-white" : "text-[#999999] hover:text-white"
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>
          <ThemeToggle lightModeOverWhite={false} />
          <a
            href={contactHref}
            onClick={goToContact}
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full border border-[#444444] text-[#E8E8E8] font-sans font-medium text-sm hover:bg-[#1A1A1A]"
          >
            {t("nav.contact")}
          </a>
          <a
            href={PORTAL_URLS.service}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-white text-black font-sans font-medium text-sm hover:bg-white/90"
          >
            {t("nav.login")}
          </a>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease }}
          className="md:hidden mt-2 ml-4 py-4 px-4 rounded-2xl bg-[#111111] border border-[#333333] w-[calc(100%-2rem)] max-w-sm flex flex-col gap-1"
        >
          <InternalLink to="/" className="font-sans text-[#E8E8E8] py-2" onClick={() => setMobileOpen(false)}>
            {t("nav.home")}
          </InternalLink>
          <div className="py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#999999] block mb-2">
              {t("nav.services")}
            </span>
            <div className="flex flex-col gap-1 pl-2">
              {serviceLinkKeys.map((s) => (
                <InternalLink
                  key={s.to}
                  to={s.to}
                  className="font-sans text-[#E8E8E8] py-1.5 text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(s.labelKey)}
                </InternalLink>
              ))}
            </div>
          </div>
          <InternalLink to="/blog" className="font-sans text-[#E8E8E8] py-2" onClick={() => setMobileOpen(false)}>
            {t("nav.insights")}
          </InternalLink>
          <a href={contactHref} onClick={goToContact} className="font-sans text-[#E8E8E8] py-2">
            {t("nav.contact")}
          </a>
          <a
            href={PORTAL_URLS.service}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[#E8E8E8] py-2"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.login")}
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};
