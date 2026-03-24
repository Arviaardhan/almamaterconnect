import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorks from "@/components/landing/HowItWorks";
import MarqueeSection from "@/components/landing/MarqueeSection";
import FeaturedCompetitions from "@/components/landing/FeaturedCompetitions";
import CTASection from "@/components/landing/CTASection";
import FooterSection from "@/components/landing/FooterSection";
import HallOfFame from "@/components/landing/HallOfFame";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

export default function Landing() {
  return (
    <div className="overflow-hidden custom-scrollbar space-y-0">
      <HeroSection />
      <MarqueeSection />
      <HowItWorks />
      <StatsSection />
      <FeaturedCompetitions />
      <HallOfFame />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
