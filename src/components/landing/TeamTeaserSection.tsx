import { Link } from "react-router-dom";
import { ArrowRight, Users, Calendar, Eye, AlertTriangle, CheckCircle2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const teaserTeams = [
  {
    title: "Hackathon UI/UX 2026",
    category: "Design",
    campus: "Universitas Indonesia",
    desc: "Mencari desainer berbakat untuk prototipe aplikasi kesehatan.",
    slots: "2/4",
    deadline: "15 Apr",
    daysLeft: 18,
    neededSkills: ["Prototyping", "UI Design"],
    filledSkills: ["Figma", "Research"],
    members: ["AS", "BK"],
    applicants: 5,
  },
  {
    title: "National Data Science Cup",
    category: "Data Science",
    campus: "ITB",
    desc: "Butuh ML engineer dan statistikawan untuk analisis dataset iklim.",
    slots: "1/3",
    deadline: "28 Mar",
    daysLeft: 3,
    neededSkills: ["Statistics"],
    filledSkills: ["Python", "ML"],
    members: ["RF", "DS"],
    applicants: 12,
  },
  {
    title: "Business Case Competition",
    category: "Business",
    campus: "UGM",
    desc: "Mencari ahli keuangan dan strategi untuk kompetisi business case.",
    slots: "3/5",
    deadline: "10 Apr",
    daysLeft: 14,
    neededSkills: ["Finance", "Presentation"],
    filledSkills: ["Strategy"],
    members: ["DK"],
    applicants: 8,
  },
  {
    title: "Mobile App Challenge",
    category: "Mobile",
    campus: "ITS",
    desc: "Membangun aplikasi fitness komunitas. Butuh UI designer.",
    slots: "1/3",
    deadline: "30 Mar",
    daysLeft: 5,
    neededSkills: ["UI Design"],
    filledSkills: ["Flutter", "Firebase"],
    members: ["FN", "SW"],
    applicants: 3,
  },
];

// Duplicate for seamless loop
const loopTeams = [...teaserTeams, ...teaserTeams];

export default function TeamTeaserSection() {
  return (
    <section className="py-20 border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          className="flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">SEDANG MENCARI ANGGOTA</p>
            <h2 className="text-3xl font-bold md:text-4xl">Tim Sedang Mencari Kamu</h2>
            <p className="mt-3 text-muted-foreground">Jelajahi tim yang aktif merekrut sekarang</p>
          </div>
          <Link to="/explore" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex">
            Lihat semua <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Infinite scrolling carousel */}
      <div className="relative">
        <motion.div
          className="flex gap-5 pl-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {loopTeams.map((team, i) => (
            <Link
              key={`${team.title}-${i}`}
              to="/explore/1"
              className="group block shrink-0 w-[340px]"
            >
              <div className="relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 h-full">
                {/* Urgency bar */}
                <div className={`h-1 w-full ${team.daysLeft <= 3 ? "bg-destructive" : team.daysLeft <= 7 ? "bg-warning" : "bg-primary"}`} />

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-[11px]">{team.category}</Badge>
                    {team.daysLeft <= 7 && (
                      <Badge className="bg-destructive/10 text-destructive border-0 text-[10px] gap-1 shrink-0">
                        <AlertTriangle className="h-3 w-3" /> {team.daysLeft}d left
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-base font-bold group-hover:text-primary transition-colors">{team.title}</h3>

                  <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {team.campus}
                  </div>

                  <p className="text-[12px] text-muted-foreground line-clamp-2 mt-2">{team.desc}</p>

                  {/* Skills glass */}
                  <div className="rounded-lg bg-muted/30 backdrop-blur-sm border border-border/50 p-2.5 mt-3">
                    <div className="flex flex-wrap gap-1.5">
                      {team.neededSkills.map((s) => (
                        <Badge key={s} className="bg-primary/10 text-primary border-primary/20 text-[10px] gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> {s}
                        </Badge>
                      ))}
                      {team.filledSkills.map((s) => (
                        <Badge key={s} variant="secondary" className="text-[10px] gap-1 opacity-50">
                          <CheckCircle2 className="h-3 w-3" /> {s}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {team.members.map((m, j) => (
                          <Avatar key={j} className="h-6 w-6 border-2 border-card">
                            <AvatarFallback className="text-[8px] font-bold bg-accent text-accent-foreground">{m}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" /> {team.slots}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {team.deadline}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 mt-8 text-center md:hidden">
        <Link to="/explore" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
          Lihat semua tim <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
