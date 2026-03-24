import { motion } from "framer-motion";
import { Search, ShieldCheck, MessageCircle, LayoutDashboard } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Pencarian Berbasis Skill",
    desc: "Temukan partner berdasarkan keahlian spesifik — React, Python, Figma, dan ratusan skill lainnya.",
  },
  {
    icon: ShieldCheck,
    title: "Verifikasi Almamater",
    desc: "Hanya mahasiswa terverifikasi yang bisa bergabung. Kolaborasi lebih aman dan terpercaya.",
  },
  {
    icon: MessageCircle,
    title: "Undang & Hubungi Langsung",
    desc: "Kirim undangan ke talent yang kamu incar, atau hubungi langsung via WhatsApp dan email.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Tim",
    desc: "Kelola anggota, deadline, dan resources kompetisi dengan dashboard yang intuitif.",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">FITUR</p>
          <h2 className="text-3xl font-bold md:text-4xl">Fitur Unggulan Kami</h2>
          <p className="mt-3 text-muted-foreground">Semua yang kamu butuhkan untuk membangun tim juara</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card rounded-2xl p-6 text-center hover-glow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary mb-4 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
