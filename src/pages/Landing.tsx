import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, UserPlus, Search, Trophy, Zap, Target, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  { icon: UserPlus, title: "Register", desc: "Create your profile with skills and campus info" },
  { icon: Search, title: "Discover", desc: "Browse open teams or post your own recruitment" },
  { icon: Users, title: "Connect", desc: "Join teams that match your skills and interests" },
  { icon: Trophy, title: "Win", desc: "Compete together and build your portfolio" },
];

const competitions = [
  { title: "Hackathon UI/UX 2026", category: "Design", slots: "2/4", skills: ["Figma", "Research", "Prototyping"], urgent: true },
  { title: "National Data Science Cup", category: "Data", slots: "1/3", skills: ["Python", "ML", "Statistics"], urgent: false },
  { title: "Business Case Competition", category: "Business", slots: "3/5", skills: ["Strategy", "Finance", "Presentation"], urgent: false },
  { title: "Mobile App Challenge", category: "Mobile", slots: "1/3", skills: ["Flutter", "Firebase", "UI Design"], urgent: true },
  { title: "Web Dev Marathon", category: "Web", slots: "2/4", skills: ["React", "Node.js", "TypeScript"], urgent: false },
  { title: "IoT Innovation Contest", category: "Hardware", slots: "2/5", skills: ["Arduino", "Python", "3D Print"], urgent: false },
];

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-accent text-accent-foreground border-0 px-4 py-1.5 text-sm font-medium">
            <Zap className="mr-1.5 h-3.5 w-3.5" /> Now in Beta — Join 500+ Students
          </Badge>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Find Your Dream Team,{" "}
            <span className="gradient-text">Win the Competition.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Connect with talented students from your campus. Build the perfect team for any competition — from hackathons to business cases.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/explore">
              <Button size="lg" className="gap-2 px-8 text-base font-semibold shadow-lg shadow-primary/25">
                <Search className="h-5 w-5" /> Find a Team
              </Button>
            </Link>
            <Link to="/create">
              <Button size="lg" variant="outline" className="gap-2 px-8 text-base font-semibold">
                <UserPlus className="h-5 w-5" /> Post a Recruitment
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8">
            {[
              { value: "500+", label: "Active Students" },
              { value: "120+", label: "Teams Formed" },
              { value: "45+", label: "Competitions" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="mt-3 text-muted-foreground">Four simple steps to your next winning team</p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="group relative rounded-2xl border border-border bg-card p-6 text-center hover-lift"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:gradient-emerald group-hover:text-primary-foreground">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="mt-2 flex h-6 w-6 mx-auto items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                  {i + 1}
                </div>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Competitions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Featured Competitions</h2>
              <p className="mt-3 text-muted-foreground">Teams actively looking for members</p>
            </div>
            <Link to="/explore" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {competitions.map((comp) => (
              <Link
                key={comp.title}
                to="/explore/1"
                className="group rounded-2xl border border-border bg-card p-6 hover-lift"
              >
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="text-xs font-medium">
                    {comp.category}
                  </Badge>
                  {comp.urgent && (
                    <Badge className="bg-destructive/10 text-destructive border-0 text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors">
                  {comp.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {comp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{comp.slots} members</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/explore">
              <Button variant="outline" className="gap-2">
                View all competitions <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <Globe className="mx-auto h-12 w-12 text-primary animate-float" />
            <h2 className="mt-6 text-3xl font-bold md:text-4xl">
              Ready to Find Your Team?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join hundreds of students already building winning teams on AlmamaterConnect.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/signup">
                <Button size="lg" className="gap-2 px-8 font-semibold shadow-lg shadow-primary/25">
                  Get Started Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-emerald">
                <Trophy className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">AlmamaterConnect</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 AlmamaterConnect. Built for students, by students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
