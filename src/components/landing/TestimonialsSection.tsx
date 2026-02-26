import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rina Sari",
    major: "Informatics, UMK",
    initials: "RS",
    text: "Found my dream team for Gemastik in just 2 days. We ended up winning silver medal! This platform is a game changer.",
    stars: 5,
  },
  {
    name: "Adi Pratama",
    major: "Business Admin, UI",
    initials: "AP",
    text: "As a business student, finding tech teammates was impossible. AlmamaterConnect matched me with developers who complemented our skills perfectly.",
    stars: 5,
  },
  {
    name: "Maya Lestari",
    major: "Computer Science, ITB",
    initials: "ML",
    text: "The recruitment flow is so smooth. Posted our need for a UI designer and got 5 qualified applicants within hours.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">Success Stories</h2>
          <p className="mt-3 text-muted-foreground">Real students, real wins</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="glass-card rounded-2xl p-6 hover-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs font-semibold bg-accent text-accent-foreground">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.major}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
