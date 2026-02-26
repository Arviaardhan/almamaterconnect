import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Trophy, Briefcase, GraduationCap } from "lucide-react";

const stats = [
  { value: 500, suffix: "+", label: "Active Students", icon: Users },
  { value: 120, suffix: "+", label: "Teams Formed", icon: GraduationCap },
  { value: 45, suffix: "+", label: "Competitions", icon: Trophy },
  { value: 30, suffix: "+", label: "Campuses", icon: Briefcase },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary mb-3">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-3xl font-extrabold text-primary tracking-tight md:text-4xl">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
