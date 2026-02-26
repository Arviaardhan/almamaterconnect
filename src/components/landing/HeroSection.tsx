import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Zap, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const liveActivities = [
  { user: "Rina S.", action: "joined", team: "Robotics Team", time: "2m ago", initials: "RS" },
  { user: "Adi P.", action: "opened", team: "Web Dev Marathon", time: "5m ago", initials: "AP" },
  { user: "Maya L.", action: "joined", team: "Data Science Cup", time: "8m ago", initials: "ML" },
  { user: "Budi K.", action: "posted", team: "Business Case Comp", time: "12m ago", initials: "BK" },
  { user: "Sari W.", action: "joined", team: "UI/UX Hackathon", time: "15m ago", initials: "SW" },
];

const trendingSlots = [
  { team: "Web Dev Team", slots: "1 slot left", urgent: true },
  { team: "AI Research Group", slots: "2 slots left", urgent: false },
  { team: "Mobile App Squad", slots: "1 slot left", urgent: true },
];

export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-28">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute top-1/2 -left-48 h-[400px] w-[400px] rounded-full bg-secondary/8 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px]" />
        {/* Mesh grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 items-start">
          {/* Left — Headline */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="secondary" className="w-fit mb-6 bg-accent text-accent-foreground border-0 px-4 py-1.5 text-sm font-medium">
              <Zap className="mr-1.5 h-3.5 w-3.5" /> Now in Beta — Join 500+ Students
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-[-0.03em] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl">
              Find Your{" "}
              <span className="gradient-text">Dream Team,</span>
              <br />
              Win the Competition.
            </h1>

            <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
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

            {/* Stacked Avatars social proof */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {["DK", "AS", "MR", "FN", "LW"].map((initials, i) => (
                  <Avatar key={i} className="h-8 w-8 border-2 border-background ring-0">
                    <AvatarFallback className="text-[10px] font-semibold bg-accent text-accent-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">500+</span> students already connected
              </p>
            </div>
          </motion.div>

          {/* Right — Live Activity Bento */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 gap-3">
              {/* Live Activity Feed */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                  </span>
                  <span className="text-sm font-semibold">Live Activity</span>
                </div>
                <div className="space-y-3 max-h-[220px] overflow-hidden">
                  {liveActivities.map((activity, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback className="text-[9px] font-semibold bg-muted text-muted-foreground">
                          {activity.initials}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-xs text-muted-foreground leading-snug flex-1 min-w-0">
                        <span className="font-medium text-foreground">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="font-medium text-foreground">{activity.team}</span>
                      </p>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{activity.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trending Slots */}
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-card rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold">Open Slots</span>
                  </div>
                  <div className="space-y-2">
                    {trendingSlots.map((slot, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-foreground truncate mr-2">{slot.team}</span>
                        <Badge
                          variant="outline"
                          className={`text-[9px] px-1.5 py-0 shrink-0 ${
                            slot.urgent
                              ? "border-warning text-warning"
                              : "border-primary/40 text-primary"
                          }`}
                        >
                          {slot.slots}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-3xl font-extrabold text-primary tracking-tight">45+</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Active Competitions</div>
                  <Link to="/explore" className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline">
                    Explore <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
