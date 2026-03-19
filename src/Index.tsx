import { FooterSection } from "./FooterSection";
import { HeaderSection } from "./HeaderSection";
import { ContactSection } from "./components/ContactSection";
import { HeroSection } from "./components/HeroSection";
import { InsightsSection } from "./components/InsightsSection";
import { OurStandardsSection } from "./components/OurStandardsSection";
import { StatsSection } from "./components/StatsSection";
import { OurProcessSection } from "./components/OurProcessSection";
import { TeamSection } from "./components/TeamSection";
import { TrustedPartnersSection } from "./components/TrustedPartnersSection";
import { ValueLabelsSection } from "./components/ValueLabelsSection";
import { WhatWeDoSection } from "./components/WhatWeDoSection";
import { WhoWeAreSection } from "./components/WhoWeAreSection";

export const Fr = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#f9f6f3] dark:bg-velora-charcoal">
      <HeaderSection />

      <HeroSection />
      <StatsSection />
      <WhoWeAreSection />
      <ValueLabelsSection />
      <WhatWeDoSection />
      <OurStandardsSection />
      <OurProcessSection />
      <TrustedPartnersSection />
      <TeamSection />
      <InsightsSection />
      <ContactSection />

      <FooterSection />
    </div>
  );
};
