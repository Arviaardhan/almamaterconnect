import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

function GeometricNetwork() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {/* Connection lines */}
      <line x1="10%" y1="20%" x2="35%" y2="35%" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="35%" y1="35%" x2="60%" y2="25%" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="60%" y1="25%" x2="85%" y2="40%" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="35%" y1="35%" x2="50%" y2="60%" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="15%" y1="55%" x2="35%" y2="35%" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <line x1="50%" y1="60%" x2="75%" y2="70%" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="85%" y1="40%" x2="75%" y2="70%" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      {/* Nodes */}
      <circle cx="10%" cy="20%" r="4" fill="hsl(var(--primary))" opacity="0.3" />
      <circle cx="35%" cy="35%" r="5" fill="hsl(var(--primary))" opacity="0.4" />
      <circle cx="60%" cy="25%" r="3.5" fill="hsl(var(--secondary))" opacity="0.3" />
      <circle cx="85%" cy="40%" r="4" fill="hsl(var(--primary))" opacity="0.25" />
      <circle cx="50%" cy="60%" r="3" fill="hsl(var(--secondary))" opacity="0.3" />
      <circle cx="15%" cy="55%" r="3" fill="hsl(var(--primary))" opacity="0.2" />
      <circle cx="75%" cy="70%" r="4" fill="hsl(var(--primary))" opacity="0.25" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/30" />
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/6 blur-[120px]" />
      <div className="absolute top-1/2 -left-52 h-[500px] w-[500px] rounded-full bg-secondary/6 blur-[120px]" />
      <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-primary/4 blur-[100px]" />

      {/* Geometric network overlay */}
      <GeometricNetwork />

      <div className="container relative mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="secondary" className="w-fit mb-6 bg-accent text-accent-foreground border-0 px-4 py-1.5 text-sm font-medium">
            <Zap className="mr-1.5 h-3.5 w-3.5" /> Public Beta — Platform Kolaborasi Mahasiswa
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-[-0.03em] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            Bangun Tim Kompetisi{" "}
            <span className="gradient-text">Impianmu</span>{" "}
            dalam Hitungan Menit.
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Platform kolaborasi eksklusif untuk mahasiswa. Temukan partner dengan skill yang tepat, bangun portofolio, dan raih kemenangan bersama.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/explore">
              <Button size="lg" className="gap-2 px-8 text-base font-semibold shadow-lg shadow-primary/25 w-full sm:w-auto">
                <Search className="h-5 w-5" /> Cari Tim Sekarang
              </Button>
            </Link>
            <Link to="/create">
              <Button size="lg" variant="outline" className="gap-2 px-8 text-base font-semibold w-full sm:w-auto">
                <PlusCircle className="h-5 w-5" /> Post Kompetisi
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <motion.div
            className="mt-10 flex items-center gap-3 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex -space-x-2">
              {["AS", "BK", "ML", "RP"].map((init) => (
                <div key={init} className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold ring-2 ring-background">
                  {init}
                </div>
              ))}
            </div>
            <span>500+ mahasiswa sudah bergabung</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
