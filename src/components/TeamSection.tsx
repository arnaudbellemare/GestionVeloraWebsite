import { useTranslation } from "react-i18next";
import { InternalLink } from "./InternalLink";

export function TeamSection() {
  const { t } = useTranslation();
  const members = t("teamSection.members", { returnObjects: true }) as {
    name: string;
    role: string;
    bio: string;
  }[];

  return (
    <section className="relative py-20 lg:py-28 px-6 lg:px-12 bg-nd-canvas scroll-mt-24">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-nd-secondary mb-4">
            {t("teamSection.label")}
          </p>
          <h2 id="notre-equipe" className="font-sans font-medium text-3xl sm:text-4xl lg:text-[2.75rem] text-nd-display mb-4 tracking-[-0.02em]">
            {t("teamSection.title")}
          </h2>
          <p className="font-sans text-base text-nd-secondary leading-relaxed max-w-xl">
            {t("teamSection.intro")}
          </p>
        </div>

        <div className="border-y border-nd-border">
          {members.map((m) => (
            <article key={m.role + m.name} className="py-7 lg:py-9">
              <p className="font-sans font-semibold text-xl text-nd-display mb-1">
                {m.name}
              </p>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-nd-secondary mb-4">
                {m.role}
              </p>
              <p className="font-sans text-base text-nd-secondary leading-relaxed max-w-2xl">
                {m.bio}
              </p>
              <InternalLink
                to="/about"
                className="inline-flex mt-5 font-sans text-sm text-waabi-pink hover:underline underline-offset-2"
              >
                {t("teamSection.profileLink")}
              </InternalLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
