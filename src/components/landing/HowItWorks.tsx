import { UserPlus, Search, Users, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: UserPlus, title: "Register", desc: "Create your profile with skills and campus info" },
  { icon: Search, title: "Discover", desc: "Browse open teams or post your own recruitment" },
  { icon: Users, title: "Connect", desc: "Join teams that match your skills and interests" },
  { icon: Trophy, title: "Win", desc: "Compete together and build your portfolio" },
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
          <p className="mt-3 text-muted-foreground">Four simple steps to your next winning team</p>
        </motion.div>
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
