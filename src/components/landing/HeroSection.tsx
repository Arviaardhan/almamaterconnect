import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute top-1/2 -left-48 h-[400px] w-[400px] rounded-full bg-secondary/8 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          className="mx-auto max-w-2xl text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="secondary" className="w-fit mb-6 bg-accent text-accent-foreground border-0 px-4 py-1.5 text-sm font-medium">
            <Zap className="mr-1.5 h-3.5 w-3.5" /> Now in Public Beta — Find Your First Teammate
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-[-0.03em] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl">
            Find Your{" "}
            <span className="gradient-text">Dream Team,</span>
            <br />
            Win the Competition.
          </h1>

          <p className="mt-6 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
            Connect with talented students from your campus. Build the perfect team for any competition — from hackathons to business cases.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/explore">
              <Button size="lg" className="gap-2 px-8 text-base font-semibold shadow-lg shadow-primary/25 w-full sm:w-auto">
                <Search className="h-5 w-5" /> Find a Team
              </Button>
            </Link>
            <Link to="/create">
              <Button size="lg" variant="outline" className="gap-2 px-8 text-base font-semibold w-full sm:w-auto">
                <UserPlus className="h-5 w-5" /> Post a Recruitment
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
