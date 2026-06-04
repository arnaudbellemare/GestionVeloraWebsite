import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { HeaderSection } from "../HeaderSection";
import { dismissFirstPaintShell } from "../lib/dismissFirstPaint";
import { CanonicalUrl } from "../components/CanonicalUrl";
import { GtagPageView } from "../components/GtagPageView";
import { PageMeta } from "../components/PageMeta";
import { HreflangLinks } from "../components/HreflangLinks";
import { SchemaOrg } from "../components/SchemaOrg";

const FooterSection = lazy(() =>
  import("../FooterSection").then((module) => ({ default: module.FooterSection }))
);

function DeferredFooterSection() {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldRender) return;
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const timeoutId = globalThis.setTimeout(() => setShouldRender(true), 2000);
      return () => globalThis.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: "1000px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={ref}>
      {shouldRender ? (
        <Suspense fallback={null}>
          <FooterSection />
        </Suspense>
      ) : null}
    </div>
  );
}

export function Layout() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const [fadeRouteKey, setFadeRouteKey] = useState<string | null>(null);
  const isInitialRoute = useRef(true);

  useEffect(() => {
    if (isInitialRoute.current) {
      isInitialRoute.current = false;
      dismissFirstPaintShell();
    } else {
      setFadeRouteKey(location.pathname);
    }
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

      <div
        key={location.pathname}
        className={`flex-1 flex flex-col w-full min-w-0 min-h-0${fadeRouteKey === location.pathname ? " animate-fade-in" : ""}`}
      >
        <main className="flex-1 w-full min-w-0">{currentOutlet}</main>
      </div>
      <DeferredFooterSection />
    </div>
  );
}
