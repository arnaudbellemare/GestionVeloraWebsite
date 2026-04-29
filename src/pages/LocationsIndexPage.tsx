import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InternalLink } from "../components/InternalLink";
import { ScrollReveal } from "../components/ScrollReveal";
import { useLocale } from "../context/LocaleContext";
import { CITIES, LOCATION_SERVICES } from "../data/locations";

const FEATURED_CITY_SLUGS = [
  "montreal",
  "laval",
  "longueuil",
  "brossard",
  "westmount",
  "plateau-mont-royal",
  "verdun",
  "saint-laurent",
];

export function LocationsIndexPage() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const isEn = locale === "en";

  const cities = CITIES.filter((city) => FEATURED_CITY_SLUGS.includes(city.slug));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pt-24 lg:pt-32 pb-24 lg:pb-32"
    >
      <div className="max-w-[90rem] mx-auto px-6 lg:px-16">
        <Breadcrumbs
          items={[
            { label: t("breadcrumb.home"), to: "/" },
            { label: isEn ? "Location pages" : "Pages locales" },
          ]}
        />

        <ScrollReveal>
          <h1 id="location-pages" className="font-sans font-medium text-4xl lg:text-5xl text-nd-display leading-[1.05] tracking-[-0.02em] mb-4">
            {isEn ? "Property management by city" : "Gestion immobiliere par ville"}
          </h1>
          <p className="font-sans text-lg text-black/70 dark:text-white/70 max-w-3xl mb-14">
            {isEn
              ? "Explore service pages by city and mandate type across Greater Montreal."
              : "Explorez les pages de service par ville et type de mandat dans le Grand Montreal."}
          </p>
        </ScrollReveal>

        <section id="locations-grid" className="space-y-8" aria-label={isEn ? "Cities and services" : "Villes et services"}>
          {cities.map((city, cityIndex) => (
            <ScrollReveal key={city.slug} delay={cityIndex * 0.03}>
              <article className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 lg:p-8">
                <h2 className="font-sans font-semibold text-2xl text-nd-display mb-4">
                  {isEn ? city.nameEn : city.nameFr}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {LOCATION_SERVICES.map((service) => {
                    const pageSlug = `${service.slug}-${city.slug}`;
                    return (
                      <InternalLink
                        key={pageSlug}
                        to={`/location/${pageSlug}`}
                        className="inline-flex items-center justify-between rounded-xl border border-black/12 dark:border-white/12 px-4 py-3 text-sm font-sans text-black/85 dark:text-white/85 hover:border-nd-primary/45 transition-colors"
                      >
                        <span>{isEn ? service.nameEn : service.nameFr}</span>
                        <span aria-hidden>→</span>
                      </InternalLink>
                    );
                  })}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </section>
      </div>
    </motion.div>
  );
}
