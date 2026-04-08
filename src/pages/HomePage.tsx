import { ContactSection } from "../components/ContactSection";
import { FAQSection } from "../components/FAQSection";
import { FromInspirationSection } from "../components/FromInspirationSection";
import { HeroSection } from "../components/HeroSection";
import { InsightsSection } from "../components/InsightsSection";
import { OurStandardsSection } from "../components/OurStandardsSection";
import { PortalAccessSection } from "../components/PortalAccessSection";
import { StatsSection } from "../components/StatsSection";
import { OurProcessSection } from "../components/OurProcessSection";
import { TeamSection } from "../components/TeamSection";
import { TrustedPartnersSection } from "../components/TrustedPartnersSection";
import { ValueLabelsSection } from "../components/ValueLabelsSection";
import { WhatWeDoSection } from "../components/WhatWeDoSection";
import { WhoWeAreSection } from "../components/WhoWeAreSection";

function SectionSpacer() {
  return <div className="h-px bg-nd-border" aria-hidden />;
}

export function HomePage() {
  return (
    <>
      <HeroSection />
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
      <FAQSection />
      <ContactSection />
    </>
  );
}
