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
    <section className="relative py-12 lg:py-16 px-6 lg:px-12 bg-nd-canvas scroll-mt-24">
      <div className="max-w-[90rem] mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-7 lg:mb-8">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-nd-secondary mb-2">
            {t("teamSection.label")}
          </p>
          <h2 id="notre-equipe" className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl text-nd-display mb-3 tracking-[-0.02em]">
            {t("teamSection.title")}
          </h2>
          <p className="font-sans text-base text-nd-secondary leading-relaxed max-w-xl mx-auto">
            {t("teamSection.intro")}
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          {members.map((m) => (
            <article key={m.role + m.name} className="text-center">
              <img
                src="/images/team/arnaud-bellemare.png"
                alt={m.name}
                loading="lazy"
                decoding="async"
                width="800"
                height="800"
                className="mx-auto mb-4 aspect-square w-40 sm:w-48 rounded-full object-cover"
              />
              <p className="font-sans font-semibold text-xl text-nd-display mb-1">
                {m.name}
              </p>
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-nd-secondary mb-3">
                {m.role}
              </p>
              <p className="font-sans text-base text-nd-secondary leading-relaxed max-w-2xl">
                {m.bio}
              </p>
              <InternalLink
                to="/about"
                className="inline-flex mt-3 font-sans text-sm text-waabi-pink hover:underline underline-offset-2"
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
