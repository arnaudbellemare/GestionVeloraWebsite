import { useTranslation } from "react-i18next";
import { ScrollReveal } from "./ScrollReveal";
import { PORTAL_URLS } from "../config";

export function PortalAccessSection() {
  const { t } = useTranslation();
  return (
    <section
      id="portails"
      className="py-24 lg:py-32 px-6 lg:px-16 bg-black overflow-hidden border-y border-[#222222]"
    >
      <div className="max-w-[90rem] mx-auto">
        <ScrollReveal>
          <h2 className="font-sans font-medium text-3xl lg:text-4xl text-white leading-[1.05] tracking-[-0.02em] mb-4">
            {t("portalAccess.title")}
          </h2>
          <p className="font-sans text-[#999999] mb-12 max-w-xl">
            {t("portalAccess.subtitle")}
          </p>
        </ScrollReveal>
        <div className="flex flex-col sm:flex-row gap-6">
          <ScrollReveal delay={0.1}>
            <a
              href={PORTAL_URLS.manager}
              target="_blank"
              rel="noopener noreferrer"
              className="group block flex-1 p-8 rounded-2xl bg-[#111111] hover:bg-[#1A1A1A] border border-[#333333] transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] border border-[#333333] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-sans font-medium text-xl text-white">{t("portalAccess.manager")}</span>
              </div>
              <p className="font-sans text-sm text-[#999999]">
                {t("portalAccess.managerDesc")}
              </p>
              <span className="inline-flex items-center gap-2 mt-4 font-mono text-[10px] uppercase tracking-wider text-[#E8E8E8]">
                Accéder au portail
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <a
              href={PORTAL_URLS.service}
              target="_blank"
              rel="noopener noreferrer"
              className="group block flex-1 p-8 rounded-2xl bg-[#111111] hover:bg-[#1A1A1A] border border-[#333333] transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] border border-[#333333] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="font-sans font-medium text-xl text-white">{t("portalAccess.owner")}</span>
              </div>
              <p className="font-sans text-sm text-[#999999]">
                {t("portalAccess.ownerDesc")}
              </p>
              <span className="inline-flex items-center gap-2 mt-4 font-mono text-[10px] uppercase tracking-wider text-[#E8E8E8]">
                Accéder au portail
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.3}>
          <p className="mt-8 font-sans text-sm text-white/50">
            {t("portalAccess.learnMore")}{" "}
            <a
              href="https://nestreva.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline transition-colors"
            >
              {t("portalAccess.more")}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
