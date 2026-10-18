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

    let observer: IntersectionObserver | null = null;

    const renderFooter = () => {
      setShouldRender(true);
      observer?.disconnect();
    };

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        renderFooter();
      },
      { rootMargin: "480px 0px" },
    );

    observer.observe(node);

    // Also mount once the page is idle after load, so the footer's links exist
    // for crawlers and visitors that never scroll. Still off the critical path.
    let idleHandle: number | undefined;
    let timer: number | undefined;
    const scheduleIdleRender = () => {
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(renderFooter, { timeout: 4000 });
      } else {
        timer = setTimeout(renderFooter, 2000) as unknown as number;
      }
    };
    if (document.readyState === "complete") {
      scheduleIdleRender();
    } else {
      window.addEventListener("load", scheduleIdleRender, { once: true });
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener("load", scheduleIdleRender);
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [shouldRender]);

  return (
    <div ref={ref} className="min-h-px w-full">
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
