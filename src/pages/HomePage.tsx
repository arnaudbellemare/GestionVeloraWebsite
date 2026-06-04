import { lazy, Suspense, type ReactNode, useEffect, useRef, useState } from "react";
import { HeroSection } from "../components/HeroSection";

const StatsSection = lazy(() =>
  import("../components/StatsSection").then((module) => ({
    default: module.StatsSection,
  }))
);
const WhoWeAreSection = lazy(() =>
  import("../components/WhoWeAreSection").then((module) => ({
    default: module.WhoWeAreSection,
  }))
);
const ValueLabelsSection = lazy(() =>
  import("../components/ValueLabelsSection").then((module) => ({
    default: module.ValueLabelsSection,
  }))
);
const WhatWeDoSection = lazy(() =>
  import("../components/WhatWeDoSection").then((module) => ({
    default: module.WhatWeDoSection,
  }))
);

const FromInspirationSection = lazy(() =>
  import("../components/FromInspirationSection").then((module) => ({
    default: module.FromInspirationSection,
  }))
);
const OurStandardsSection = lazy(() =>
  import("../components/OurStandardsSection").then((module) => ({
    default: module.OurStandardsSection,
  }))
);
const OurProcessSection = lazy(() =>
  import("../components/OurProcessSection").then((module) => ({
    default: module.OurProcessSection,
  }))
);
const TrustedPartnersSection = lazy(() =>
  import("../components/TrustedPartnersSection").then((module) => ({
    default: module.TrustedPartnersSection,
  }))
);
const TeamSection = lazy(() =>
  import("../components/TeamSection").then((module) => ({
    default: module.TeamSection,
  }))
);
const PortalAccessSection = lazy(() =>
  import("../components/PortalAccessSection").then((module) => ({
    default: module.PortalAccessSection,
  }))
);
const InsightsSection = lazy(() =>
  import("../components/InsightsSection").then((module) => ({
    default: module.InsightsSection,
  }))
);
const LeadCaptureSection = lazy(() =>
  import("../components/LeadCaptureSection").then((module) => ({
    default: module.LeadCaptureSection,
  }))
);
const FAQSection = lazy(() =>
  import("../components/FAQSection").then((module) => ({
    default: module.FAQSection,
  }))
);
const ContactSection = lazy(() =>
  import("../components/ContactSection").then((module) => ({
    default: module.ContactSection,
  }))
);

function SectionSpacer() {
  return <div className="h-px bg-nd-border" aria-hidden />;
}

interface ViewportSectionProps {
  children: ReactNode;
  minHeight: number;
  rootMargin?: string;
}

function ViewportSection({ children, minHeight, rootMargin = "900px 0px" }: ViewportSectionProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldRender) return;
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const timeoutId = globalThis.setTimeout(() => setShouldRender(true), 600);
      return () => globalThis.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={ref} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}

function DeferredHomeSections() {
  return (
    <>
      <ViewportSection minHeight={360} rootMargin="1100px 0px">
        <StatsSection />
      </ViewportSection>
      <ViewportSection minHeight={820}>
        <WhoWeAreSection />
      </ViewportSection>
      <ViewportSection minHeight={560}>
        <ValueLabelsSection />
      </ViewportSection>
      <ViewportSection minHeight={760}>
        <WhatWeDoSection />
      </ViewportSection>
      <ViewportSection minHeight={760}>
        <OurStandardsSection />
      </ViewportSection>
      <ViewportSection minHeight={900}>
        <FromInspirationSection />
      </ViewportSection>
      <SectionSpacer />
      <ViewportSection minHeight={760}>
        <OurProcessSection />
      </ViewportSection>
      <SectionSpacer />
      <ViewportSection minHeight={620}>
        <TrustedPartnersSection />
      </ViewportSection>
      <SectionSpacer />
      <ViewportSection minHeight={620}>
        <TeamSection />
      </ViewportSection>
      <SectionSpacer />
      <ViewportSection minHeight={700}>
        <PortalAccessSection />
      </ViewportSection>
      <ViewportSection minHeight={720}>
        <InsightsSection />
      </ViewportSection>
      <ViewportSection minHeight={700}>
        <LeadCaptureSection variant="homepage" />
      </ViewportSection>
      <ViewportSection minHeight={760}>
        <FAQSection />
      </ViewportSection>
      <ViewportSection minHeight={760}>
        <ContactSection />
      </ViewportSection>
    </>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <DeferredHomeSections />
    </>
  );
}
