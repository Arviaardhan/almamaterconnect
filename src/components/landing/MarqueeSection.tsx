import { motion } from "framer-motion";

const categories = [
  "Hackathon", "Business Case", "Data Science", "UI/UX Design",
  "Robotics", "IoT", "Mobile Development", "Web Development",
  "AI & Machine Learning", "Cybersecurity", "Game Development", "Research Paper",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-4"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...categories, ...categories].map((name, i) => (
          <div
            key={i}
            className="glass-card whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-medium text-muted-foreground"
          >
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <section className="py-12 border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <motion.p
          className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Kategori Kompetisi yang Didukung
        </motion.p>
      </div>
      <div className="space-y-3">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
