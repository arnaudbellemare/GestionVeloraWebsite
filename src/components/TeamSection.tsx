import { useTranslation } from "react-i18next";

export function TeamSection() {
  const { t } = useTranslation();
  const members = t("teamSection.members", { returnObjects: true }) as {
    name: string;
    role: string;
    bio: string;
  }[];

  return (
    <section className="relative py-20 lg:py-28 px-6 lg:px-12 bg-[#f2f0ed] dark:bg-[#1a1a1a] bg-grain bg-grain-light scroll-mt-24">
      <div className="max-w-[90rem] mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <p className="text-[11px] tracking-[0.2em] uppercase text-black/50 dark:text-white/50 mb-4 font-sans">
            ◆ {t("teamSection.label")}
          </p>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-black dark:text-white mb-6">
            {t("teamSection.title")}
          </h2>
          <p className="font-sans text-base text-black/70 dark:text-white/70 leading-relaxed">
            {t("teamSection.intro")}
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          {members.map((m) => (
            <article key={m.role + m.name}>
              <div className="aspect-[4/5] max-h-[420px] rounded-2xl bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800 mb-5" />
              <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-black dark:text-white mb-2">
                {m.name} <span className="text-black/40 dark:text-white/40"> / </span> {m.role}
              </p>
              <p className="font-sans text-sm text-black/70 dark:text-white/65 leading-relaxed">
                {m.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
