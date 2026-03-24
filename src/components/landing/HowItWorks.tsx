import { useState } from "react";
import { UserPlus, Search, Trophy, Code, Palette, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const steps = [
  {
    icon: UserPlus,
    title: "Lengkapi Profil & Pamerkan Skill",
    desc: "Daftar dan tampilkan keahlianmu. Profil lengkap meningkatkan peluangmu ditemukan oleh tim yang tepat.",
    detail: "Buat profil dengan skill badges — React, Figma, Python, Public Speaking — yang langsung terlihat oleh semua pencari tim.",
    badges: ["React", "Figma", "Python", "Public Speaking"],
    visual: Palette,
  },
  {
    icon: Search,
    title: "Temukan Tim atau Post Kebutuhan",
    desc: "Jelajahi rekrutmen terbuka atau buat postingan sendiri untuk menarik teammate yang tepat.",
    detail: "Cari berdasarkan skill, kategori kompetisi, atau kampus. Filter real-time membantu menemukan match sempurna dalam hitungan detik.",
    badges: ["UI Designer", "Data Analyst", "Backend Dev"],
    visual: Code,
  },
  {
    icon: Trophy,
    title: "Bangun Tim & Raih Kemenangan",
    desc: "Koordinasi dengan tim, kelola progress, dan mulai perjalanan menuju podium.",
    detail: "Dashboard tim membantu mengelola anggota, deadline, dan resources. Semua yang kamu butuhkan untuk menang ada di satu tempat.",
    badges: ["Dashboard", "Progress", "Resources"],
    visual: TrendingUp,
  },
];

export default function HowItWorks() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="border-t border-border bg-muted/20 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">CARA KERJA</p>
          <h2 className="text-3xl font-bold md:text-4xl">Alur Kolaborasi Almamater</h2>
          <p className="mt-3 text-muted-foreground">Tiga langkah menuju tim impianmu</p>
        </motion.div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((step, i) => {
            const isActive = activeCard === i;
            const isFaded = activeCard !== null && activeCard !== i;

            return (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <motion.div
                  className={`relative glass-card rounded-2xl p-6 cursor-pointer transition-all duration-500 border ${
                    isActive ? "border-primary/30 shadow-xl z-10" : "border-border/50"
                  }`}
                  animate={{
                    scale: isActive ? 1.04 : isFaded ? 0.97 : 1,
                    opacity: isFaded ? 0.5 : 1,
                    y: isActive ? -8 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Step number */}
                  <div className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20">
                    {i + 1}
                  </div>

                  <div className="flex items-center gap-3 mt-2 mb-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold leading-snug">{step.title}</h3>
                  </div>

                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">{step.desc}</p>

                  {/* Expanded content */}
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-border/50">
                      <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{step.detail}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {step.badges.map((b) => (
                          <Badge key={b} variant="secondary" className="text-[10px] font-medium">
                            {b}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
