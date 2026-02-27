import { motion } from "framer-motion";
import { ShieldCheck, Layers, MessageCircle, LayoutDashboard } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Campus-Verified", desc: "Students register with their campus identity for trusted collaboration." },
  { icon: Layers, title: "Diverse Skillsets", desc: "Find teammates across disciplines — tech, business, design, and more." },
  { icon: MessageCircle, title: "Direct Coordination", desc: "Once matched, coordinate instantly via WhatsApp group links." },
  { icon: LayoutDashboard, title: "Centralized Dashboard", desc: "Manage your teams, applications, and recruitment from one place." },
];

export default function StatsSection() {
  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">Core Features</h2>
          <p className="mt-3 text-muted-foreground">Everything you need to build a winning team</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card rounded-2xl p-6 text-center hover-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary mb-4">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
