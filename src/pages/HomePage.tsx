import { lazy, Suspense, useEffect, useState } from "react";
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

function DeferredHomeSections() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const show = () => setShouldRender(true);
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(show, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = globalThis.setTimeout(show, 900);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <StatsSection />
      <WhoWeAreSection />
      <ValueLabelsSection />
      <WhatWeDoSection />
      <OurStandardsSection />
      <FromInspirationSection />
      <SectionSpacer />
      <OurProcessSection />
      <SectionSpacer />
      <TrustedPartnersSection />
      <SectionSpacer />
      <TeamSection />
      <SectionSpacer />
      <PortalAccessSection />
      <InsightsSection />
      <LeadCaptureSection variant="homepage" />
      <FAQSection />
      <ContactSection />
    </Suspense>
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
