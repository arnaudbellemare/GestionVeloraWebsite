import { useTranslation } from "react-i18next";

export function TeamSection() {
  const { t } = useTranslation();
  const members = t("teamSection.members", { returnObjects: true }) as {
    name: string;
    role: string;
    bio: string;
  }[];

  return (
    <section className="relative py-20 lg:py-28 px-6 lg:px-12 bg-nd-canvas scroll-mt-24">
      <div className="max-w-[90rem] mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-nd-secondary mb-4">
            {t("teamSection.label")}
          </p>
          <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[2.75rem] text-nd-display mb-6 tracking-[-0.02em]">
            {t("teamSection.title")}
          </h2>
          <p className="font-sans text-base text-nd-secondary leading-relaxed">
            {t("teamSection.intro")}
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          {members.map((m) => (
            <article key={m.role + m.name}>
              <div className="aspect-[4/5] rounded-2xl bg-nd-raised border border-nd-border mb-5" />
              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-nd-secondary mb-2">
                {m.name} <span className="text-nd-muted"> / </span> {m.role}
              </p>
              <p className="font-sans text-sm text-nd-secondary leading-relaxed">
                {m.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
