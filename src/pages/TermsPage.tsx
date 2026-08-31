import { useTranslation } from "react-i18next";
import { InternalLink } from "../components/InternalLink";

const sections = [
  ["useTitle", "useText"],
  ["informationTitle", "informationText"],
  ["intellectualTitle", "intellectualText"],
  ["linksTitle", "linksText"],
  ["liabilityTitle", "liabilityText"],
] as const;

export function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32 bg-nd-surface">
      <div className="max-w-3xl mx-auto px-6 lg:px-16">
        <InternalLink
          to="/"
          className="font-sans text-sm text-black/60 dark:text-white/60 hover:text-waabi-pink mb-8 inline-block"
        >
          {t("terms.backHome")}
        </InternalLink>
        <article>
          <h1 className="font-sans font-medium text-4xl text-nd-display mb-3 tracking-[-0.02em]">
            {t("terms.title")}
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-nd-secondary mb-8">
            {t("terms.effectiveDate")}
          </p>
          <div className="font-sans text-black/80 dark:text-white/80 leading-relaxed space-y-6">
            <p>{t("terms.intro")}</p>
            {sections.map(([titleKey, textKey]) => (
              <section key={titleKey}>
                <h2 className="font-sans font-bold text-xl text-black dark:text-white mt-8 mb-3">
                  {t(`terms.${titleKey}`)}
                </h2>
                <p>{t(`terms.${textKey}`)}</p>
              </section>
            ))}
            <section>
              <h2 className="font-sans font-bold text-xl text-black dark:text-white mt-8 mb-3">
                {t("terms.contactTitle")}
              </h2>
              <p>
                {t("terms.contactText")} {" "}
                <a className="underline underline-offset-2" href="mailto:info@gestionvelora.com">
                  info@gestionvelora.com
                </a>
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
