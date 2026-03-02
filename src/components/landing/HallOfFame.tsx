import { motion } from "framer-motion";
import { Trophy, Award, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const successStories = [
  {
    teamName: "CodeCrafters UI",
    competition: "Hackathon Nasional 2025",
    narrative: "Built an AI-powered healthcare dashboard in 48 hours and impressed judges with exceptional UX research methodology.",
    members: ["AP", "SN", "BA"],
    tag: "🏆 Grand Champion",
  },
  {
    teamName: "DataMinds UGM",
    competition: "Gemastik XVI - Data Mining",
    narrative: "Developed a real-time sentiment analysis engine for Bahasa Indonesia that outperformed 120+ competing teams nationwide.",
    members: ["RF", "DS"],
    tag: "🥇 Gold Medal",
  },
  {
    teamName: "PixelPerfect ITB",
    competition: "Google Solution Challenge 2025",
    narrative: "Created an accessible e-learning platform for visually impaired students, earning recognition from Google's global jury.",
    members: ["CD", "LK", "MP"],
    tag: "🌍 Top 100 Global",
  },
  {
    teamName: "BizInnovators",
    competition: "Startup Weekend Jakarta",
    narrative: "Pitched a fintech solution for SME analytics that secured seed funding commitment from two angel investors during the event.",
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
          <div className="inline-flex items-center gap-2 rounded-full bg-lime/10 border border-lime/30 px-4 py-1.5 text-sm font-semibold text-lime mb-4">
            <Sparkles className="h-4 w-4" /> Hall of Fame
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">Success Stories</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Real teams, real victories. See how AlmamaterConnect helped students win competitions across Indonesia.
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
              {/* Lime accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-lime/60 group-hover:bg-lime transition-colors" />

              <div className="flex items-start justify-between mb-3">
                <Badge className="bg-lime text-lime-foreground border-0 font-bold text-xs gap-1">
                  <Award className="h-3 w-3" />
                  {story.tag}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">NEWS</span>
              </div>

              <h3 className="text-lg font-bold text-foreground">{story.teamName}</h3>
              <p className="text-sm font-medium text-primary mt-0.5">{story.competition}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">"{story.narrative}"</p>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <div className="flex -space-x-2">
                  {story.members.map((m) => (
                    <div
                      key={m}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold ring-2 ring-card"
                    >
                      {m}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">{story.members.length} members</span>
                <Trophy className="h-4 w-4 text-lime ml-auto" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
