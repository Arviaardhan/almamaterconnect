import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorks from "@/components/landing/HowItWorks";
import MarqueeSection from "@/components/landing/MarqueeSection";
import FeaturedCompetitions from "@/components/landing/FeaturedCompetitions";
import CTASection from "@/components/landing/CTASection";
import FooterSection from "@/components/landing/FooterSection";
import HallOfFame from "@/components/landing/HallOfFame";

export default function Landing() {
  return (
    <div className="overflow-hidden custom-scrollbar space-y-0">
      <HeroSection />
      <MarqueeSection />
      <div className="py-4" />
      <StatsSection />
      <HowItWorks />
      <div className="py-4" />
      <FeaturedCompetitions />
      <div className="py-4" />
      <HallOfFame />
      <CTASection />
      <FooterSection />
    </div>
  );
}
