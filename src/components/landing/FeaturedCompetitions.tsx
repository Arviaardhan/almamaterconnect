import { Link } from "react-router-dom";
import { ArrowRight, Users, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRef } from "react";

const competitions = [
  { title: "Hackathon UI/UX 2026", category: "Design", slots: "2/4", skills: ["Figma", "Research", "Prototyping"], urgent: true, applicants: 12, members: ["AS", "BK"] },
  { title: "National Data Science Cup", category: "Data", slots: "1/3", skills: ["Python", "ML", "Statistics"], urgent: false, applicants: 8, members: ["ML", "RP"] },
  { title: "Business Case Competition", category: "Business", slots: "3/5", skills: ["Strategy", "Finance", "Presentation"], urgent: false, applicants: 5, members: ["DK"] },
  { title: "Mobile App Challenge", category: "Mobile", slots: "1/3", skills: ["Flutter", "Firebase", "UI Design"], urgent: true, applicants: 15, members: ["FN", "SW"] },
  { title: "Web Dev Marathon", category: "Web", slots: "2/4", skills: ["React", "Node.js", "TypeScript"], urgent: false, applicants: 10, members: ["AP", "LW"] },
];

export default function FeaturedCompetitions() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">TRENDING</p>
            <h2 className="text-3xl font-bold md:text-4xl">Kompetisi Trending</h2>
            <p className="mt-3 text-muted-foreground">Tim yang sedang aktif mencari anggota</p>
          </div>
          <Link to="/explore" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex">
            Lihat semua <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Horizontal scrollable on mobile, grid on desktop */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
        >
          {competitions.slice(0, 3).map((comp, i) => (
            <motion.div
              key={comp.title}
              className="min-w-[280px] snap-start md:min-w-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to="/explore/1"
                className="group relative block glass-card rounded-2xl p-6 hover-glow transition-all duration-300 h-full"
              >
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                  <div className="flex items-center gap-1.5 glass-card rounded-full px-3 py-1.5 text-xs font-medium text-primary">
                    <Eye className="h-3 w-3" /> Quick Look
                  </div>
                </div>

                <div className="relative z-[1]">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className="text-xs font-medium">{comp.category}</Badge>
                    {comp.urgent && (
                      <Badge className="bg-destructive/15 text-destructive border-0 text-xs">Segera Tutup</Badge>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors">{comp.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {comp.skills.map((skill) => (
                      <span key={skill} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{skill}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-1.5">
                        {comp.members.map((m, j) => (
                          <Avatar key={j} className="h-6 w-6 border-2 border-card">
                            <AvatarFallback className="text-[8px] font-semibold bg-accent text-accent-foreground">{m}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span className="text-xs">{comp.slots}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/explore">
            <Button variant="outline" className="gap-2">
              Lihat semua kompetisi <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
