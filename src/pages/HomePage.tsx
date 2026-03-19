import { ContactSection } from "../components/ContactSection";
import { FAQSection } from "../components/FAQSection";
import { FromInspirationSection } from "../components/FromInspirationSection";
import { HeroSection } from "../components/HeroSection";
import { InsightsSection } from "../components/InsightsSection";
import { OurStandardsSection } from "../components/OurStandardsSection";
import { PortalAccessSection } from "../components/PortalAccessSection";
import { PropertyToolsSection } from "../components/PropertyToolsSection";
import { StatsSection } from "../components/StatsSection";
import { OurProcessSection } from "../components/OurProcessSection";
import { TeamSection } from "../components/TeamSection";
import { TrustedPartnersSection } from "../components/TrustedPartnersSection";
import { ValueLabelsSection } from "../components/ValueLabelsSection";
import { WhatWeDoSection } from "../components/WhatWeDoSection";
import { WhoWeAreSection } from "../components/WhoWeAreSection";
import { SectionBlend } from "../components/SectionBlend";

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
      {/* FromInspiration (light) → OurProcess (grain) */}
      <SectionBlend from="#f9f6f3" to="#f2f0ed" darkFrom="#191818" darkTo="#191818" height={80} />
      <OurProcessSection />
      {/* OurProcess (light grain) → TrustedPartners (dark) — dramatic */}
      <SectionBlend
        from="#f2f0ed"
        to="#121212"
        darkFrom="#191818"
        darkTo="#121212"
        height={160}
        blobs
        blobColor="rgba(255,255,255,0.04)"
        flipBlobs
      />
      <TrustedPartnersSection />
      {/* TrustedPartners (dark) → Team (light grain) */}
      <SectionBlend
        from="#121212"
        to="#f2f0ed"
        darkFrom="#121212"
        darkTo="#191818"
        height={140}
        blobs
        blobColor="rgba(72,92,17,0.06)"
      />
      <TeamSection />
      {/* Team (grain) → PropertyTools (cream) — subtle */}
      <SectionBlend from="#f2f0ed" to="#f9f6f3" darkFrom="#191818" darkTo="#191818" height={48} />
      <PropertyToolsSection />
      {/* PropertyTools (cream) → Portal (dark) */}
      <SectionBlend
        from="#f9f6f3"
        to="#1C1C1C"
        darkFrom="#191818"
        darkTo="#1C1C1C"
        height={140}
        blobs
        blobColor="rgba(255,255,255,0.03)"
        flipBlobs
      />
      <PortalAccessSection />
      <InsightsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
