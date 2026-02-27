import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorks from "@/components/landing/HowItWorks";
import MarqueeSection from "@/components/landing/MarqueeSection";
import FeaturedCompetitions from "@/components/landing/FeaturedCompetitions";
import CTASection from "@/components/landing/CTASection";
import FooterSection from "@/components/landing/FooterSection";

export default function Landing() {
  return (
    <div className="overflow-hidden custom-scrollbar">
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <HowItWorks />
      <FeaturedCompetitions />
      <CTASection />
      <FooterSection />
    </div>
  );
}
