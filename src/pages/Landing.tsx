import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorks from "@/components/landing/HowItWorks";
import MarqueeSection from "@/components/landing/MarqueeSection";
import TeamTeaserSection from "@/components/landing/TeamTeaserSection";
import CTASection from "@/components/landing/CTASection";
import FooterSection from "@/components/landing/FooterSection";

export default function Landing() {
  return (
    <div className="overflow-hidden custom-scrollbar space-y-0">
      <HeroSection />
      <MarqueeSection />
      <HowItWorks />
      <StatsSection />
      <TeamTeaserSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
