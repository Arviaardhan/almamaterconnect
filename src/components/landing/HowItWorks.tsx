import { UserPlus, Search, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: UserPlus,
    title: "Buat Profil & Pamerkan Skill",
    desc: "Daftar dan tampilkan keahlianmu — dari React hingga Figma. Profil lengkap = peluang lebih besar ditemukan.",
    detail: "React • Figma • Python • UI/UX",
  },
  {
    icon: Search,
    title: "Temukan Kompetisi atau Tim",
    desc: "Jelajahi rekrutmen terbuka atau buat postingan sendiri untuk menarik teammate yang tepat.",
    detail: "Hackathon • Business Case • Data Science",
  },
  {
    icon: Trophy,
    title: "Kolaborasi & Menang",
    desc: "Bergabung dengan tim, koordinasi via WhatsApp, dan mulai perjalanan menuju podium bersama.",
    detail: "Koordinasi • Strategi • Kemenangan",
  },
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">CARA KERJA</p>
          <h2 className="text-3xl font-bold md:text-4xl">Bagaimana AlmamaterConnect Bekerja</h2>
          <p className="mt-3 text-muted-foreground">Tiga langkah menuju tim impianmu</p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="group relative glass-card rounded-2xl p-6 text-center hover-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              {/* Step number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md">
                {i + 1}
              </div>

              <div className="mx-auto mt-2 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <step.icon className="h-7 w-7" />
              </div>

              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{step.desc}</p>

              <p className="mt-3 text-[11px] font-medium text-primary/70 tracking-wide">{step.detail}</p>

              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
