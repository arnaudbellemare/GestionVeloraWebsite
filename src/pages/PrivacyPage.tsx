import { useTranslation } from "react-i18next";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";

export function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32 bg-nd-surface">
      <div className="max-w-3xl mx-auto px-6 lg:px-16">
        <InternalLink to="/" className="font-sans text-sm text-black/60 dark:text-white/60 hover:text-waabi-pink mb-8 inline-block">
          {t("privacy.backHome")}
        </InternalLink>
        <ScrollReveal>
          <h1 className="font-sans font-medium text-4xl text-nd-display mb-8 tracking-[-0.02em]">
            {t("privacy.title")}
          </h1>
          <div className="font-sans text-black/80 dark:text-white/80 leading-relaxed space-y-6">
            <p>{t("privacy.p1")}</p>
            <h2 className="font-sans font-bold text-xl text-black dark:text-white mt-8">{t("privacy.collectTitle")}</h2>
            <p>{t("privacy.collectText")}</p>
            <h2 className="font-sans font-bold text-xl text-black dark:text-white mt-8">{t("privacy.useTitle")}</h2>
            <p>{t("privacy.useText")}</p>
            <h2 className="font-sans font-bold text-xl text-black dark:text-white mt-8">{t("privacy.contactTitle")}</h2>
            <p>{t("privacy.contactText")}</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
