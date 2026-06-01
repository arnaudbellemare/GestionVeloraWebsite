import { lazy, Suspense, useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { HeaderSection } from "../HeaderSection";
import { CanonicalUrl } from "../components/CanonicalUrl";
import { GtagPageView } from "../components/GtagPageView";
import { PageMeta } from "../components/PageMeta";
import { HreflangLinks } from "../components/HreflangLinks";
import { SchemaOrg } from "../components/SchemaOrg";

const FooterSection = lazy(() =>
  import("../FooterSection").then((module) => ({ default: module.FooterSection }))
);

export function Layout() {
  const location = useLocation();
  const currentOutlet = useOutlet();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-nd-canvas text-nd-primary flex flex-col overflow-x-hidden">
      <PageMeta />
      <GtagPageView />
      <CanonicalUrl />
      <HreflangLinks />
      <SchemaOrg />

      <HeaderSection />

      <div key={location.pathname} className="flex-1 flex flex-col w-full min-w-0 min-h-0 animate-fade-in">
        <main className="flex-1 w-full min-w-0">{currentOutlet}</main>
      </div>
      <Suspense fallback={null}>
        <FooterSection />
      </Suspense>
    </div>
  );
}
