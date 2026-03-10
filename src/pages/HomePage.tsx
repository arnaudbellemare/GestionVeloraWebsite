import { ContactSection } from "../components/ContactSection";
import { FAQSection } from "../components/FAQSection";
import { FromInspirationSection } from "../components/FromInspirationSection";
import { HeroSection } from "../components/HeroSection";
import { InsightsSection } from "../components/InsightsSection";
import { OurStandardsSection } from "../components/OurStandardsSection";
import { PortalAccessSection } from "../components/PortalAccessSection";
import { PropertyToolsSection } from "../components/PropertyToolsSection";
import { StatsSection } from "../components/StatsSection";
import { TrustedPartnersSection } from "../components/TrustedPartnersSection";
import { ValueLabelsSection } from "../components/ValueLabelsSection";
import { WhatWeDoSection } from "../components/WhatWeDoSection";
import { WhoWeAreSection } from "../components/WhoWeAreSection";

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
      <TrustedPartnersSection />
      <PropertyToolsSection />
      <PortalAccessSection />
      <InsightsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
