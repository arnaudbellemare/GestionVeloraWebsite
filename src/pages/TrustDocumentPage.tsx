import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { useLocale } from "../context/LocaleContext";
import {
  getTrustPageLocale,
  trustPageIdFromPath,
  type TrustBlock,
} from "../data/trust-pages";

function TrustBlocks({ blocks }: { blocks: TrustBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.kind === "p") {
          return (
            <p key={i} className="font-sans text-black/80 dark:text-white/80">
              {block.text}
            </p>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={i} className="font-sans text-black/80 dark:text-white/80 list-disc pl-6 space-y-2">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <ul key={i} className="font-sans text-black/80 dark:text-white/80 list-disc pl-6 space-y-3">
            {block.items.map((item, j) => (
              <li key={j}>
                {item.href.startsWith("http") ? (
                  <a
                    href={item.href}
                    className="text-waabi-pink hover:underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <InternalLink to={item.href} className="text-waabi-pink hover:underline underline-offset-2">
                    {item.label}
                  </InternalLink>
                )}
                {item.suffix ? (
                  <span className="text-black/70 dark:text-white/70"> {item.suffix}</span>
                ) : null}
              </li>
            ))}
          </ul>
        );
      })}
    </>
  );
}

export function TrustDocumentPage() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const id = trustPageIdFromPath(pathname);

  if (!id) {
    return null;
  }

  const content = getTrustPageLocale(id, locale);

  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32 bg-nd-surface">
      <div className="max-w-3xl mx-auto px-6 lg:px-16">
        <InternalLink
          to="/"
          className="font-sans text-sm text-black/60 dark:text-white/60 hover:text-waabi-pink mb-8 inline-block"
        >
          {t("privacy.backHome")}
        </InternalLink>
        <ScrollReveal>
          <h1 className="font-sans font-medium text-4xl text-nd-display mb-8 tracking-[-0.02em]">{content.title}</h1>
          <div className="font-sans leading-relaxed space-y-10">
            {content.sections.map((section, si) => (
              <section key={`${section.heading}-${si}`} aria-labelledby={`trust-section-${si}`}>
                <h2 id={`trust-section-${si}`} className="font-sans font-bold text-xl text-black dark:text-white mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  <TrustBlocks blocks={section.blocks} />
                </div>
              </section>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
