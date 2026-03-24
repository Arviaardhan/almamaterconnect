import { motion } from "framer-motion";
import { Trophy, Award, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const successStories = [
  {
    teamName: "CodeCrafters UI",
    competition: "Hackathon Nasional 2025",
    narrative: "Membangun dashboard kesehatan berbasis AI dalam 48 jam dan memenangkan hati juri dengan riset UX yang luar biasa.",
    members: ["AP", "SN", "BA"],
    tag: "🏆 Grand Champion",
  },
  {
    teamName: "DataMinds UGM",
    competition: "Gemastik XVI - Data Mining",
    narrative: "Mengembangkan mesin analisis sentimen real-time untuk Bahasa Indonesia yang mengalahkan 120+ tim pesaing.",
    members: ["RF", "DS"],
    tag: "🥇 Medali Emas",
  },
  {
    teamName: "PixelPerfect ITB",
    competition: "Google Solution Challenge 2025",
    narrative: "Membuat platform e-learning aksesibel untuk mahasiswa tunanetra, mendapat pengakuan dari juri global Google.",
    members: ["CD", "LK", "MP"],
    tag: "🌍 Top 100 Global",
  },
  {
    teamName: "BizInnovators",
    competition: "Startup Weekend Jakarta",
    narrative: "Mempresentasikan solusi fintech untuk analitik UMKM dan mendapatkan komitmen pendanaan dari dua angel investor.",
    members: ["MP", "LK"],
    tag: "🚀 Best Pitch",
  },
];

export default function HallOfFame() {
  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
            <Sparkles className="h-4 w-4" /> Hall of Fame
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">Kisah Sukses</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Tim nyata, kemenangan nyata. Lihat bagaimana AlmamaterConnect membantu mahasiswa memenangkan kompetisi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 max-w-5xl mx-auto">
          {successStories.map((story, i) => (
            <motion.div
              key={story.teamName}
              className="glass-card rounded-2xl p-6 hover-glow relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary/60 group-hover:bg-primary transition-colors" />

              <div className="flex items-start justify-between mb-3">
                <Badge className="bg-primary text-primary-foreground border-0 font-bold text-xs gap-1">
                  <Award className="h-3 w-3" />
                  {story.tag}
                </Badge>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">NEWS</span>
              </div>

              <h3 className="text-lg font-bold text-foreground">{story.teamName}</h3>
              <p className="text-[13px] font-medium text-primary mt-0.5">{story.competition}</p>
              <p className="text-[13px] text-muted-foreground mt-3 leading-relaxed">"{story.narrative}"</p>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <div className="flex -space-x-2">
                  {story.members.map((m) => (
                    <div key={m} className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold ring-2 ring-card">
                      {m}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">{story.members.length} anggota</span>
                <Trophy className="h-4 w-4 text-primary ml-auto" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
