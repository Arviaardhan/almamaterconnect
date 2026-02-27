import { UserPlus, Search, Users } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: UserPlus, title: "Build Your Profile", desc: "Sign up and showcase your skills, major, and competition interests." },
  { icon: Search, title: "Find or Post", desc: "Browse open recruitments or create your own to attract the right teammates." },
  { icon: Users, title: "Join & Collaborate", desc: "Get accepted, access the team's WhatsApp link, and start winning together." },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>
          <p className="mt-3 text-muted-foreground">Three simple steps to your next winning team</p>
        </motion.div>
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="group relative glass-card rounded-2xl p-6 text-center hover-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:gradient-emerald group-hover:text-primary-foreground">
                <step.icon className="h-7 w-7" />
              </div>
              <div className="mt-2 flex h-6 w-6 mx-auto items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                {i + 1}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
