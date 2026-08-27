import {
  PublicNav,
  HeroSection,
  FeaturesSection,
  PricingSection,
  FaqSection,
  Footer,
} from "@/features/landing-page";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
