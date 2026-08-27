"use client";

import {
  PublicNav,
  HeroSection,
  FeaturesSection,
  ShowcaseSection,
  RosterSection,
  PricingSection,
  FaqSection,
  Footer,
  Global3DBackground,
} from "@/features/landing-page";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Global3DBackground />

      <PublicNav />
      <main className="flex-1 relative z-10 bg-transparent shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <RosterSection />

        <div className="relative z-20 bg-transparent">
          <PricingSection />
          <FaqSection />
          <Footer />
        </div>
      </main>
    </div>
  );
}

