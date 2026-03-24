import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function SkillNode({ x, y, label, delay }: { x: number; y: number; label: string; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
    >
      <circle cx={x} cy={y} r="22" fill="hsl(var(--primary))" opacity="0.08" />
      <circle cx={x} cy={y} r="14" fill="hsl(var(--primary))" opacity="0.15" />
      <circle cx={x} cy={y} r="4" fill="hsl(var(--primary))" opacity="0.6" />
      <text
        x={x}
        y={y + 30}
        textAnchor="middle"
        fill="hsl(var(--muted-foreground))"
        fontSize="9"
        fontWeight="500"
        opacity="0.7"
      >
        {label}
      </text>
    </motion.g>
  );
}

function NetworkVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const offsetX = useTransform(mouseX, [0, 1], [-8, 8]);
  const offsetY = useTransform(mouseY, [0, 1], [-8, 8]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const nodes = [
    { x: 120, y: 80, label: "React" },
    { x: 280, y: 50, label: "Figma" },
    { x: 200, y: 160, label: "Python" },
    { x: 340, y: 140, label: "UI/UX" },
    { x: 100, y: 220, label: "Laravel" },
    { x: 300, y: 240, label: "Data" },
    { x: 180, y: 290, label: "Strategy" },
    { x: 380, y: 60, label: "Flutter" },
    { x: 60, y: 150, label: "Node.js" },
    { x: 360, y: 300, label: "AI/ML" },
  ];

  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 4], [2, 5], [3, 5], [4, 6], [5, 9],
    [1, 7], [0, 8], [6, 9], [3, 7], [8, 4],
  ];

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[340px]">
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 440 360"
        style={{ x: offsetX, y: offsetY }}
      >
        {/* Connection lines */}
        {connections.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            opacity="0.1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
          />
        ))}
        {/* Animated pulse on some lines */}
        {connections.slice(0, 5).map(([a, b], i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="2"
            fill="hsl(var(--primary))"
            opacity="0.4"
            initial={{ cx: nodes[a].x, cy: nodes[a].y }}
            animate={{
              cx: [nodes[a].x, nodes[b].x],
              cy: [nodes[a].y, nodes[b].y],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <SkillNode key={node.label} x={node.x} y={node.y} label={node.label} delay={0.1 + i * 0.08} />
        ))}
      </motion.svg>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-20 lg:py-28 overflow-hidden">
      {/* Gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20" />
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[140px]" />
      <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left: Copy */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-3xl font-extrabold tracking-[-0.03em] leading-[1.08] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Satu Platform.{" "}
              <br className="hidden sm:block" />
              Satu Almamater.{" "}
              <br />
              <span className="gradient-text">Tim Kompetisi Impian Anda.</span>
            </h1>

            <p className="mt-5 max-w-lg text-[15px] text-muted-foreground leading-relaxed">
              Jangan biarkan ide hebat Anda mati karena kurang tim. AlmamaterConnect menghubungkan Anda secara eksklusif dengan rekan mahasiswa yang memiliki skill yang Anda butuhkan — desain, tech, bisnis — untuk menang bersama.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/explore">
                <Button
                  size="lg"
                  className="gap-2 px-8 text-base font-semibold shadow-lg shadow-primary/25 w-full sm:w-auto transition-transform hover:scale-105"
                >
                  <Search className="h-5 w-5" /> Cari Tim
                </Button>
              </Link>
              <Link to="/create">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 px-8 text-base font-semibold w-full sm:w-auto transition-all hover:border-primary hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
                >
                  <PlusCircle className="h-5 w-5" /> Post Kompetisi
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <motion.div
              className="mt-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex -space-x-2">
                {["AS", "BK", "ML", "RP", "DS"].map((init) => (
                  <div key={init} className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold ring-2 ring-background">
                    {init}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">500+ mahasiswa sudah bergabung</span>
            </motion.div>
          </motion.div>

          {/* Right: Network Visualization */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <NetworkVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
