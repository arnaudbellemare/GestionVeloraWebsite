import { ScrollReveal } from "./ScrollReveal";
import { CountUp } from "./CountUp";

const stats = [
  { value: "35+", label: "Immeubles sous gestion" },
  { value: "98%", label: "Taux d'occupation" },
  { value: "24/7", label: "Équipe de réponse" },
  { value: "100%", label: "Transparence financière" },
];

export function StatsSection() {
  return (
    <section className="pt-24 lg:pt-32 pb-12 lg:pb-16 px-6 lg:px-16 bg-[#f9f6f3] dark:bg-velora-charcoal">
      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-velora-charcoal/10 dark:divide-white/10">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} scale>
              <div className="py-8 lg:py-0 lg:px-12 first:lg:pl-0 last:lg:pr-0 text-center">
                <p
                  className={`font-crimson font-semibold text-4xl lg:text-5xl text-velora-charcoal dark:text-white mb-2 leading-tight ${
                    stat.value === "24/7" ? "tracking-[0em]" : "tracking-tight"
                  }`}
                >
                  <CountUp value={stat.value} duration={1.5} />
                </p>
                <p className="font-sans font-normal text-xs sm:text-sm text-velora-charcoal/70 dark:text-white/50 tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
