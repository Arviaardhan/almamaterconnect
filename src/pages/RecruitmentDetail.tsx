import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users, Calendar, MapPin, ExternalLink, UserPlus, CheckCircle2, Clock,
  MessageCircle, Loader2, Crown, Shield, Trophy, Award, BookOpen, FileText,
  Download, Code, Palette, BarChart3, Megaphone, ChevronRight, Target,
  Rocket, Send, Eye, ArrowRight
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import MemberProfileDrawer from "@/components/MemberProfileDrawer";
import JoinTeamModal from "@/components/JoinTeamModal";
import { useToast } from "@/hooks/use-toast";

const roleIcons: Record<string, typeof Code> = {
  "Interaction Designer": Palette,
  "UX Researcher": BarChart3,
  "Backend Developer": Code,
  "Frontend Developer": Code,
  "ML Engineer": BarChart3,
  "Statistician": BarChart3,
  "Finance Analyst": BarChart3,
  "Pitcher": Megaphone,
};

const mockDetail = {
  id: "1",
  title: "Hackathon UI/UX 2026",
  tagline: "Membangun platform kesehatan digital untuk klinik pedesaan — Target Gold Medal! 🏆",
  category: "Design",
  campus: "Universitas Indonesia",
  deadline: "15 April 2026",
  daysLeft: 18,
  competitionLink: "https://hackathon-uiux.id",
  whatsappLink: "https://chat.whatsapp.com/example-invite-link",
  description: `Kami sedang membangun prototipe aplikasi kesehatan untuk Hackathon UI/UX Nasional 2026. Tujuan kami adalah menciptakan sistem manajemen pasien yang intuitif yang membantu klinik pedesaan mendigitalisasi alur kerja mereka.\n\nKompetisi berlangsung selama 3 hari dan tim terbaik memenangkan pendanaan untuk pengembangan. Kami mencari desainer dan peneliti yang passionate dan ingin membuat dampak nyata.`,
  objectives: [
    "Membuat prototipe high-fidelity di Figma",
    "Melakukan user research dengan 5+ tenaga kesehatan",
    "Mempresentasikan pitch yang meyakinkan ke juri",
  ],
  progress: [
    { label: "Riset awal", done: true },
    { label: "Ideasi & sketching", done: true },
    { label: "Prototipe lo-fi", done: true },
    { label: "Prototipe hi-fi", done: false },
    { label: "User testing", done: false },
  ],
  members: [
    { name: "Andi Pratama", role: "Team Lead / UX Researcher", initials: "AP", major: "Information Systems", skills: ["UX Research", "Figma", "Design Thinking"], portfolio: "https://andipratama.design", isLeader: true },
    { name: "Sarah Chen", role: "Visual Designer", initials: "SC", major: "Visual Communication Design", skills: ["Figma", "Illustration", "Branding"], portfolio: "https://sarahchen.co", isLeader: false },
  ],
  openRoles: [
    { role: "Interaction Designer", skills: ["Figma", "Prototyping", "Animation"], description: "Membuat micro-interaction dan transisi flow antar halaman.", responsibilities: ["Desain interaksi komponen", "Animasi prototipe", "Kolaborasi dengan researcher"], status: "Open" },
    { role: "UX Researcher", skills: ["User Testing", "Survey Design", "Data Analysis"], description: "Melakukan user interview dan sintesis temuan riset.", responsibilities: ["Wawancara pengguna", "Analisis data kualitatif", "Laporan insight"], status: "Under Review" },
  ],
  slots: "2/4",
  slotsUsed: 2,
  slotsMax: 4,
  posted: "2 jam lalu",
  achievements: [
    { competition: "UI/UX Design Sprint 2025", result: "Winner", year: 2025, roster: [{ name: "Andi Pratama", initials: "AP" }, { name: "Sarah Chen", initials: "SC" }, { name: "Budi Santoso", initials: "BS" }] },
    { competition: "Campus Design Challenge", result: "Runner-Up", year: 2024, roster: [{ name: "Andi Pratama", initials: "AP" }, { name: "Rina Dewi", initials: "RD" }] },
  ],
  memberWins: { "Andi Pratama": 3, "Sarah Chen": 2 },
  resourceLink: "https://drive.google.com/example-guidebook",
  resources: [
    { name: "Rulebook Kompetisi 2026.pdf", type: "pdf", url: "#" },
    { name: "Design System Guidelines", type: "link", url: "https://designsystem.guide" },
    { name: "Research Template.docx", type: "doc", url: "#" },
  ],
  selectionSteps: [
    { label: "Kirim Lamaran", desc: "Isi form singkat" },
    { label: "Review Portofolio", desc: "Tim menilai karya" },
    { label: "Interview Singkat", desc: "Obrolan 15 menit" },
    { label: "Keputusan", desc: "Diterima / Ditolak" },
  ],
};

const fadeUp = { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } };

export default function RecruitmentDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState<typeof mockDetail.members[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<"idle" | "pending" | "joined">("idle");
  const isMember = applicationStatus === "joined";

  const handleMemberClick = (member: typeof mockDetail.members[0]) => {
    setSelectedMember(member);
    setDrawerOpen(true);
  };

  const handleJoinSubmit = (data: { role: string; message: string; portfolio: string }) => {
    setJoinModalOpen(false);
    setApplicationStatus("pending");
    toast({
      title: "✅ Lamaran Terkirim!",
      description: "Ketua tim telah menerima notifikasi. Semoga berhasil!",
      className: "border-primary/50 bg-accent",
    });
  };

  const totalLineupStrength = Object.values(mockDetail.memberWins).reduce((s, w) => s + w, 0);
  const deadlinePassed = mockDetail.daysLeft <= 0;

  return (
    <div className="min-h-screen">
      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />

      <div className="container mx-auto max-w-6xl px-4 py-6 relative">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/explore" className="hover:text-foreground transition-colors">Eksplorasi Tim</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{mockDetail.title}</span>
        </nav>

        {/* Hero Section */}
        <motion.div {...fadeUp} transition={{ duration: 0.4 }} className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="text-xs">{mockDetail.category}</Badge>
                {mockDetail.daysLeft <= 3 ? (
                  <Badge className="bg-destructive/10 text-destructive border-0 text-xs font-semibold gap-1">
                    <Clock className="h-3 w-3" /> Tutup dalam {mockDetail.daysLeft} hari
                  </Badge>
                ) : mockDetail.slotsMax - mockDetail.slotsUsed <= 2 ? (
                  <Badge className="bg-warning/10 text-warning border-0 text-xs font-semibold gap-1">
                    <Users className="h-3 w-3" /> {mockDetail.slotsMax - mockDetail.slotsUsed} slot tersisa
                  </Badge>
                ) : (
                  <Badge className="bg-primary/10 text-primary border-0 text-xs font-semibold gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Rekrutmen Aktif
                  </Badge>
                )}
                {applicationStatus === "pending" && (
                  <Badge variant="secondary" className="gap-1 text-xs"><Clock className="h-3 w-3" /> Menunggu Review</Badge>
                )}
                {applicationStatus === "joined" && (
                  <Badge className="bg-primary text-primary-foreground border-0 gap-1 text-xs"><CheckCircle2 className="h-3 w-3" /> Bergabung</Badge>
                )}
              </div>

              <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">{mockDetail.title}</h1>

              <p className="mt-3 text-[13px] md:text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                "{mockDetail.tagline}"
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{mockDetail.campus}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />Deadline: {mockDetail.deadline}</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{mockDetail.slots} anggota</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{mockDetail.posted}</span>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <a href={mockDetail.competitionLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 text-xs">
                  <ExternalLink className="h-3.5 w-3.5" /> Link Kompetisi
                </Button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Competition */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">TENTANG KOMPETISI</p>
              <p className="text-[13px] text-muted-foreground whitespace-pre-line leading-relaxed">{mockDetail.description}</p>
              <div className="mt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">OBJEKTIF TIM</p>
                <ul className="space-y-2">
                  {mockDetail.objectives.map((obj) => (
                    <li key={obj} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-[13px] text-foreground">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Team Vision & Progress */}
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">VISI TIM & PROGRESS</p>
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="h-5 w-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">Roadmap Pengerjaan</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-[9px] top-1 bottom-1 w-px bg-border" />
                {mockDetail.progress.map((step, i) => (
                  <div key={step.label} className="relative flex items-center gap-3 py-2">
                    <div className={`absolute left-[-15px] flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      step.done
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-card border-border text-muted-foreground"
                    }`}>
                      {step.done ? <CheckCircle2 className="h-3 w-3" /> : <span className="text-[9px] font-bold">{i + 1}</span>}
                    </div>
                    <span className={`text-[13px] ${step.done ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                    {step.done && <Badge variant="secondary" className="text-[10px] h-4 px-1.5">Selesai</Badge>}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Open Role Cards */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">POSISI YANG DIBUTUHKAN</p>
              <div className="space-y-4">
                {mockDetail.openRoles.map((role) => {
                  const IconComp = roleIcons[role.role] || Code;
                  const isOpen = role.status === "Open";
                  return (
                    <div key={role.role} className={`rounded-xl border p-5 transition-all hover:shadow-md ${
                      isOpen ? "border-primary/20 hover:border-primary/40" : "border-border opacity-70"
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                            isOpen ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}>
                            <IconComp className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{role.role}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{role.description}</p>
                          </div>
                        </div>
                        <Badge className={isOpen
                          ? "bg-primary/10 text-primary border-0 text-xs font-semibold"
                          : "bg-muted text-muted-foreground border-0 text-xs"
                        }>
                          {isOpen ? "Open" : "Under Review"}
                        </Badge>
                      </div>

                      {/* Responsibilities */}
                      <div className="mb-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1.5">TANGGUNG JAWAB</p>
                        <ul className="space-y-1">
                          {role.responsibilities.map((r) => (
                            <li key={r} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <ArrowRight className="h-3 w-3 text-primary/50" /> {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5">
                        {role.skills.map((skill) => (
                          <Badge key={skill} className="bg-accent text-accent-foreground border-0 text-[11px] font-medium">{skill}</Badge>
                        ))}
                      </div>

                      {isOpen && (
                        <Button
                          size="sm"
                          className="mt-4 gap-1.5 text-xs shadow-md shadow-primary/15"
                          onClick={() => setJoinModalOpen(true)}
                        >
                          <Send className="h-3.5 w-3.5" /> Lamar Posisi Ini
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* WhatsApp - members only */}
            {isMember && mockDetail.whatsappLink && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-primary/30 bg-accent/50 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">KOMUNIKASI TIM</p>
                <p className="text-[13px] text-muted-foreground mb-4">Kamu sudah jadi bagian tim! Hubungi rekan setimmu.</p>
                <Button className="gap-2 text-white" style={{ backgroundColor: "#25D366" }} onClick={() => window.open(mockDetail.whatsappLink, "_blank")}>
                  <MessageCircle className="h-4 w-4" /> Hubungi via WhatsApp
                </Button>
              </motion.div>
            )}

            {/* Achievements */}
            <motion.div {...fadeUp} transition={{ delay: 0.25 }} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">PRESTASI TIM</p>

              {/* Lineup Strength */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 mb-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Lineup Strength</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{totalLineupStrength}</span>
                </div>
                <p className="text-xs text-muted-foreground">Total kemenangan gabungan seluruh anggota aktif</p>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {Object.entries(mockDetail.memberWins).map(([name, wins]) => (
                    <div key={name} className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-primary/10 text-primary text-[8px] font-bold">
                          {name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">{name.split(" ")[0]}</span>
                      <Badge className="bg-primary/15 text-primary border-0 text-[10px] h-4 px-1.5">{wins}W</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {mockDetail.achievements.length > 0 ? (
                <div className="space-y-3">
                  {mockDetail.achievements.map((a) => (
                    <div key={a.competition} className="rounded-xl border border-border p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                            <Award className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{a.competition}</p>
                            <p className="text-xs text-muted-foreground">{a.year}</p>
                          </div>
                        </div>
                        <Badge className={a.result === "Winner"
                          ? "bg-primary text-primary-foreground border-0 font-bold text-xs"
                          : "bg-warning/15 text-warning border-warning/30 text-xs"
                        }>
                          {a.result === "Winner" && <Award className="h-3 w-3 mr-1" />}
                          {a.result}
                        </Badge>
                      </div>
                      <div className="mt-2.5 flex items-center gap-1.5 pl-12">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider mr-1">Roster:</span>
                        <div className="flex -space-x-1.5">
                          {a.roster.map((m) => (
                            <Avatar key={m.initials} className="h-6 w-6 ring-2 ring-card">
                              <AvatarFallback className="bg-primary/10 text-primary text-[8px] font-bold">{m.initials}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">{a.roster.map(m => m.name.split(" ")[0]).join(", ")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada prestasi. Ayo berkompetisi dan menang!</p>
              )}
            </motion.div>

            {/* Resources */}
            <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="rounded-2xl border border-primary/20 bg-card p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">RESOURCES & PANDUAN</p>
              <div className="space-y-2.5">
                {mockDetail.resources.map((res) => (
                  <a key={res.name} href={res.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-muted/50 hover:border-primary/30 group"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {res.type === "pdf" ? <FileText className="h-4 w-4 text-primary" /> : <BookOpen className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{res.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{res.type}</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Action Card */}
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">AKSI</p>
              {deadlinePassed ? (
                <Button disabled className="w-full gap-2" size="lg">Rekrutmen Ditutup</Button>
              ) : applicationStatus === "pending" ? (
                <Button disabled className="w-full gap-2" size="lg">
                  <Loader2 className="h-4 w-4 animate-spin" /> Menunggu Approval
                </Button>
              ) : applicationStatus === "joined" ? (
                <Link to="/dashboard">
                  <Button className="w-full gap-2" size="lg" variant="outline">
                    <Target className="h-4 w-4" /> Buka Dashboard Tim
                  </Button>
                </Link>
              ) : (
                <Button className="w-full gap-2 shadow-lg shadow-primary/25" size="lg" onClick={() => setJoinModalOpen(true)}>
                  <UserPlus className="h-4 w-4" /> Lamar Bergabung
                </Button>
              )}

              <Separator className="my-4" />

              {/* Quick stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tim</span>
                  <span className="font-medium">{mockDetail.slots} anggota</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Kategori</span>
                  <span className="font-medium">{mockDetail.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Kampus</span>
                  <span className="font-medium">{mockDetail.campus}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sisa Waktu</span>
                  <span className={`font-medium ${mockDetail.daysLeft <= 7 ? "text-destructive" : ""}`}>
                    {mockDetail.daysLeft} hari
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Team Members Card */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">ANGGOTA TIM</p>
              <div className="space-y-3">
                {mockDetail.members.map((member) => (
                  <button
                    key={member.name}
                    onClick={() => handleMemberClick(member)}
                    className="flex w-full items-center gap-3 rounded-xl p-2.5 -mx-2.5 text-left transition-all hover:bg-muted/50 group"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">{member.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        {member.isLeader && <Crown className="h-3.5 w-3.5 text-warning shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>

              {/* Open slots indicator */}
              {mockDetail.slotsMax - mockDetail.slotsUsed > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    {mockDetail.slotsMax - mockDetail.slotsUsed} posisi masih terbuka
                  </div>
                </div>
              )}
            </motion.div>

            {/* Guidebook quick access */}
            {mockDetail.resourceLink && (
              <motion.div {...fadeUp} transition={{ delay: 0.25 }}>
                <a href={mockDetail.resourceLink} target="_blank" rel="noopener noreferrer"
                  className="block rounded-2xl border-2 border-primary/20 bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Guidebook</p>
                      <p className="text-xs text-muted-foreground">Buka panduan kompetisi</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                  </div>
                </a>
              </motion.div>
            )}
          </div>
        </div>

        {/* Selection Process Timeline - Full Width */}
        <motion.div {...fadeUp} transition={{ delay: 0.35 }} className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="text-center mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">TRANSPARANSI</p>
            <h2 className="text-xl font-bold md:text-2xl">Alur Seleksi</h2>
            <p className="mt-1 text-[13px] text-muted-foreground">Proses seleksi tim ini transparan dan terstruktur</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-3xl mx-auto">
            {mockDetail.selectionSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3 sm:flex-col sm:text-center sm:gap-2 flex-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-md shadow-primary/20">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold">{step.label}</p>
                  <p className="text-[11px] text-muted-foreground">{step.desc}</p>
                </div>
                {i < mockDetail.selectionSteps.length - 1 && (
                  <div className="hidden sm:block absolute" />
                )}
              </div>
            ))}
          </div>

          {/* Connector lines (desktop) */}
          <div className="hidden sm:flex max-w-3xl mx-auto mt-[-42px] mb-4 px-12">
            {mockDetail.selectionSteps.slice(0, -1).map((_, i) => (
              <div key={i} className="flex-1 border-t-2 border-dashed border-primary/20 mt-[20px]" />
            ))}
          </div>
        </motion.div>
      </div>

      <MemberProfileDrawer member={selectedMember} open={drawerOpen} onOpenChange={setDrawerOpen} />
      <JoinTeamModal
        open={joinModalOpen}
        onOpenChange={setJoinModalOpen}
        teamName={mockDetail.title}
        openRoles={mockDetail.openRoles}
        onSubmit={handleJoinSubmit}
      />
    </div>
  );
}
