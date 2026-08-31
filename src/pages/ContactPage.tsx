import { useTranslation } from "react-i18next";
import { ContactSection } from "../components/ContactSection";
import { InternalLink } from "../components/InternalLink";

export function ContactPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="bg-nd-surface px-6 pb-16 pt-24 lg:px-16 lg:pb-20 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <InternalLink
            to="/"
            className="mb-8 inline-block font-sans text-sm text-black/60 hover:text-waabi-pink dark:text-white/60"
          >
            {t("contactPage.backHome")}
          </InternalLink>
          <h1 className="mb-5 font-sans text-4xl font-medium tracking-[-0.02em] text-nd-display lg:text-5xl">
            {t("contactPage.title")}
          </h1>
          <p className="max-w-[64ch] font-sans text-base leading-relaxed text-nd-secondary lg:text-lg">
            {t("contactPage.answer")}
          </p>
          <address className="mt-8 flex flex-col gap-2 font-sans text-sm not-italic text-nd-primary">
            <a className="underline underline-offset-2" href="tel:+15147771731">
              (514) 777-1731
            </a>
            <a className="underline underline-offset-2" href="mailto:info@gestionvelora.com">
              info@gestionvelora.com
            </a>
            <span>Montréal, Québec</span>
          </address>
        </div>
      </div>
      <ContactSection />
    </>
  );
}
