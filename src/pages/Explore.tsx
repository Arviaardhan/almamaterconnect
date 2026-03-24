import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search, Filter, Users, Clock, X, MapPin, AlertTriangle, Eye,
  CheckCircle2, Calendar, ArrowRight, ChevronRight, Loader2,
  Trophy, Github, Linkedin, MessageCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { label: "Teknologi", value: "Web" },
  { label: "Data Science", value: "Data Science" },
  { label: "Bisnis", value: "Business" },
  { label: "Desain", value: "Design" },
  { label: "Mobile", value: "Mobile" },
  { label: "IoT & Hardware", value: "IoT" },
];

const skillsList = ["React", "Python", "Figma", "Laravel", "Flutter", "Node.js", "Machine Learning", "Strategy", "TypeScript", "Copywriting", "UI Design", "Firebase"];

const statusFilters = [
  { label: "Mencari Anggota", value: "open" },
  { label: "Hampir Penuh", value: "closing" },
  { label: "Selesai", value: "closed" },
];

interface TeamPost {
  id: string;
  title: string;
  desc: string;
  category: string;
  slots: string;
  slotsUsed: number;
  slotsMax: number;
  skills: string[];
  filledSkills: string[];
  neededSkills: string[];
  posted: string;
  campus: string;
  lookingFor: string[];
  daysLeft: number;
  applicants: number;
  deadline: string;
  leader: { name: string; initials: string; major: string };
  members: { initials: string; name: string; role: string }[];
  whatsappLink: string;
}

const mockPosts: TeamPost[] = [
  {
    id: "1", title: "Hackathon UI/UX 2026", desc: "Mencari desainer berbakat untuk membuat prototipe aplikasi kesehatan yang memenangkan penghargaan.", category: "Design", slots: "2/4", slotsUsed: 2, slotsMax: 4,
    skills: ["Figma", "Research", "Prototyping", "UI Design"], filledSkills: ["Figma", "Research"], neededSkills: ["Prototyping", "UI Design"],
    posted: "2 jam lalu", campus: "Universitas Indonesia", lookingFor: ["Interaction Designer", "UX Researcher"], daysLeft: 18, applicants: 5, deadline: "15 Apr 2026",
    leader: { name: "Arvia Sari", initials: "AS", major: "Desain Komunikasi Visual" },
    members: [{ initials: "AS", name: "Arvia Sari", role: "Team Lead" }, { initials: "BK", name: "Budi Kurniawan", role: "UI Designer" }],
    whatsappLink: "https://wa.me/628123456789"
  },
  {
    id: "2", title: "National Data Science Cup", desc: "Membutuhkan statistikawan dan ML engineer untuk menganalisis dataset perubahan iklim.", category: "Data Science", slots: "1/3", slotsUsed: 2, slotsMax: 3,
    skills: ["Python", "ML", "Statistics", "Machine Learning"], filledSkills: ["Python", "ML"], neededSkills: ["Statistics", "Machine Learning"],
    posted: "5 jam lalu", campus: "ITB", lookingFor: ["ML Engineer", "Statistician"], daysLeft: 3, applicants: 12, deadline: "28 Mar 2026",
    leader: { name: "Rizky Fadillah", initials: "RF", major: "Teknik Informatika" },
    members: [{ initials: "RF", name: "Rizky Fadillah", role: "Lead Data Scientist" }, { initials: "DS", name: "Dewi Santika", role: "ML Engineer" }],
    whatsappLink: "https://wa.me/628123456790"
  },
  {
    id: "3", title: "Business Case Competition", desc: "Mencari ahli keuangan dan strategi untuk kompetisi business case bergaya McKinsey.", category: "Business", slots: "3/5", slotsUsed: 2, slotsMax: 5,
    skills: ["Strategy", "Finance", "Presentation", "Copywriting"], filledSkills: ["Strategy"], neededSkills: ["Finance", "Presentation", "Copywriting"],
    posted: "1 hari lalu", campus: "UGM", lookingFor: ["Finance Analyst", "Pitcher", "Researcher"], daysLeft: 14, applicants: 8, deadline: "10 Apr 2026",
    leader: { name: "Diana Kartika", initials: "DK", major: "Manajemen" },
    members: [{ initials: "DK", name: "Diana Kartika", role: "Team Lead" }, { initials: "MP", name: "Maya Putri", role: "Strategist" }],
    whatsappLink: "https://wa.me/628123456791"
  },
  {
    id: "4", title: "Mobile App Challenge", desc: "Membangun aplikasi fitness komunitas. Butuh Flutter dev dan UI designer.", category: "Mobile", slots: "1/3", slotsUsed: 2, slotsMax: 3,
    skills: ["Flutter", "Firebase", "UI Design"], filledSkills: ["Flutter", "Firebase"], neededSkills: ["UI Design"],
    posted: "3 jam lalu", campus: "ITS", lookingFor: ["UI Designer"], daysLeft: 5, applicants: 3, deadline: "30 Mar 2026",
    leader: { name: "Fajar Nugroho", initials: "FN", major: "Teknik Informatika" },
    members: [{ initials: "FN", name: "Fajar Nugroho", role: "Flutter Dev" }, { initials: "SW", name: "Sinta Wulandari", role: "Backend" }],
    whatsappLink: "https://wa.me/628123456792"
  },
  {
    id: "5", title: "Web Dev Marathon", desc: "Sprint pengembangan web 48 jam. Tim full-stack dibutuhkan.", category: "Web", slots: "2/4", slotsUsed: 2, slotsMax: 4,
    skills: ["React", "Node.js", "TypeScript"], filledSkills: ["React"], neededSkills: ["Node.js", "TypeScript"],
    posted: "6 jam lalu", campus: "Universitas Indonesia", lookingFor: ["Frontend Developer", "Backend Developer"], daysLeft: 10, applicants: 7, deadline: "5 Apr 2026",
    leader: { name: "Adi Pratama", initials: "AP", major: "Ilmu Komputer" },
    members: [{ initials: "AP", name: "Adi Pratama", role: "Lead Dev" }, { initials: "LW", name: "Lisa Wahyuni", role: "Frontend" }],
    whatsappLink: "https://wa.me/628123456793"
  },
  {
    id: "6", title: "IoT Smart Campus", desc: "Mengembangkan solusi IoT untuk manajemen energi kampus.", category: "IoT", slots: "2/5", slotsUsed: 3, slotsMax: 5,
    skills: ["Arduino", "Python", "3D Print"], filledSkills: ["Arduino"], neededSkills: ["Python", "3D Print"],
    posted: "1 hari lalu", campus: "ITB", lookingFor: ["Hardware Engineer", "Data Analyst"], daysLeft: 21, applicants: 2, deadline: "20 Apr 2026",
    leader: { name: "Rudi Setiawan", initials: "RS", major: "Teknik Elektro" },
    members: [{ initials: "RS", name: "Rudi Setiawan", role: "Lead Hardware" }, { initials: "BK", name: "Budi K.", role: "Firmware" }, { initials: "ML", name: "Maya L.", role: "3D Design" }],
    whatsappLink: "https://wa.me/628123456794"
  },
  {
    id: "7", title: "AI Chatbot Competition", desc: "Bangun chatbot AI untuk layanan pelanggan e-commerce.", category: "Data Science", slots: "1/4", slotsUsed: 3, slotsMax: 4,
    skills: ["Python", "NLP", "React"], filledSkills: ["Python", "NLP"], neededSkills: ["React"],
    posted: "4 jam lalu", campus: "Binus", lookingFor: ["Frontend Dev"], daysLeft: 6, applicants: 15, deadline: "1 Apr 2026",
    leader: { name: "Tommy Wijaya", initials: "TW", major: "Computer Science" },
    members: [{ initials: "TW", name: "Tommy Wijaya", role: "Lead AI" }, { initials: "RK", name: "Rina K.", role: "NLP" }, { initials: "DS", name: "Dani S.", role: "Backend" }],
    whatsappLink: "https://wa.me/628123456795"
  },
  {
    id: "8", title: "Startup Weekend", desc: "Mencari developer dan business people untuk kompetisi startup 54 jam.", category: "Business", slots: "2/5", slotsUsed: 3, slotsMax: 5,
    skills: ["React", "Strategy", "Pitch"], filledSkills: ["Strategy"], neededSkills: ["React", "Pitch"],
    posted: "12 jam lalu", campus: "UGM", lookingFor: ["Full-Stack Dev", "Pitcher"], daysLeft: 2, applicants: 20, deadline: "27 Mar 2026",
    leader: { name: "Sari Dewi", initials: "SD", major: "Manajemen" },
    members: [{ initials: "SD", name: "Sari Dewi", role: "Lead" }, { initials: "AB", name: "Ahmad B.", role: "Ops" }, { initials: "CK", name: "Cindy K.", role: "Finance" }],
    whatsappLink: "https://wa.me/628123456796"
  },
];

// Timeline data
const upcomingDeadlines = [
  { date: "27 Mar", title: "Startup Weekend", urgent: true },
  { date: "28 Mar", title: "Data Science Cup", urgent: true },
  { date: "30 Mar", title: "Mobile App Challenge", urgent: false },
  { date: "1 Apr", title: "AI Chatbot", urgent: false },
  { date: "5 Apr", title: "Web Dev Marathon", urgent: false },
];

function SkillSearch({ skills, selected, onToggle }: { skills: string[]; selected: string[]; onToggle: (s: string) => void }) {
  const [query, setQuery] = useState("");
  const matches = skills.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="relative mb-2">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          placeholder="Cari skill..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8 h-8 text-xs"
        />
      </div>
      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto custom-scrollbar">
        {matches.map((skill) => (
          <button
            key={skill}
            onClick={() => onToggle(skill)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
              selected.includes(skill)
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
}

function TeamDetailDrawer({ post, open, onClose }: { post: TeamPost | null; open: boolean; onClose: () => void }) {
  if (!post) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto custom-scrollbar">
        <SheetHeader className="text-left pb-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">{post.category}</Badge>
            {post.daysLeft <= 7 && (
              <Badge className="bg-destructive/15 text-destructive border-0 text-xs gap-1">
                <AlertTriangle className="h-3 w-3" /> Segera Tutup
              </Badge>
            )}
          </div>
          <SheetTitle className="text-xl font-bold">{post.title}</SheetTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <MapPin className="h-3.5 w-3.5" /> {post.campus}
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Leader */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">KETUA TIM</p>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">{post.leader.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{post.leader.name}</p>
                <p className="text-xs text-muted-foreground">{post.leader.major}</p>
              </div>
              <Link to={`/profile/${post.id}`} className="ml-auto">
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  Profil <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">DESKRIPSI</p>
            <p className="text-[13px] text-foreground leading-relaxed">{post.desc}</p>
          </div>

          {/* Deadline & Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-muted/50 p-3 text-center">
              <Calendar className="h-4 w-4 mx-auto text-primary mb-1" />
              <p className="text-xs font-semibold">{post.deadline}</p>
              <p className="text-[10px] text-muted-foreground">Deadline</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3 text-center">
              <Users className="h-4 w-4 mx-auto text-primary mb-1" />
              <p className="text-xs font-semibold">{post.slotsUsed}/{post.slotsMax}</p>
              <p className="text-[10px] text-muted-foreground">Anggota</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3 text-center">
              <Eye className="h-4 w-4 mx-auto text-primary mb-1" />
              <p className="text-xs font-semibold">{post.applicants}</p>
              <p className="text-[10px] text-muted-foreground">Pelamar</p>
            </div>
          </div>

          <Separator />

          {/* Skills */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">SKILL YANG DIBUTUHKAN</p>
            <div className="flex flex-wrap gap-2">
              {post.neededSkills.map((s) => (
                <Badge key={s} className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold gap-1">
                  <AlertTriangle className="h-3 w-3" /> {s}
                </Badge>
              ))}
              {post.filledSkills.map((s) => (
                <Badge key={s} variant="secondary" className="text-xs gap-1 opacity-60">
                  <CheckCircle2 className="h-3 w-3" /> {s}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Team Members */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">ANGGOTA TIM</p>
            <div className="space-y-2">
              {post.members.map((m) => (
                <div key={m.initials} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-[10px] font-bold bg-accent text-accent-foreground">{m.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-[11px] text-muted-foreground">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2 space-y-2">
            <Button className="w-full gap-2 font-semibold shadow-lg shadow-primary/20">
              <Users className="h-4 w-4" /> Apply ke Tim Ini
            </Button>
            <Button variant="outline" className="w-full gap-2" asChild>
              <Link to={`/explore/${post.id}`}>
                Lihat Detail Lengkap <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function Explore() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedPost, setSelectedPost] = useState<TeamPost | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleCategory = (cat: string) =>
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  const toggleSkill = (skill: string) =>
    setSelectedSkills((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
  const toggleStatus = (s: string) =>
    setSelectedStatuses((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const filtered = useMemo(() => mockPosts.filter((post) => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.desc.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(post.category);
    const matchSkills = selectedSkills.length === 0 || post.skills.some((s) => selectedSkills.includes(s));
    const matchStatus = selectedStatuses.length === 0 || selectedStatuses.some((st) => {
      if (st === "open") return post.daysLeft > 7;
      if (st === "closing") return post.daysLeft <= 7 && post.daysLeft > 0;
      if (st === "closed") return post.daysLeft <= 0;
      return true;
    });
    return matchSearch && matchCategory && matchSkills && matchStatus;
  }), [search, selectedCategories, selectedSkills, selectedStatuses]);

  const activeFilters = selectedCategories.length + selectedSkills.length + selectedStatuses.length;
  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = useCallback(() => {
    setLoadingMore(true);
    setTimeout(() => { setVisibleCount((prev) => prev + 6); setLoadingMore(false); }, 800);
  }, []);

  const openDrawer = (post: TeamPost) => {
    setSelectedPost(post);
    setDrawerOpen(true);
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedSkills([]);
    setSelectedStatuses([]);
  };

  return (
    <div className="min-h-screen">
      {/* Subtle bg texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">EKSPLORASI</p>
          <h1 className="text-3xl font-bold">Temukan Tim Impianmu</h1>
          <p className="mt-2 text-[13px] text-muted-foreground">Jelajahi rekrutmen terbuka dan temukan tim yang tepat untuk kompetisimu</p>
        </div>

        {/* Deadline Timeline */}
        <motion.div
          className="mb-8 glass-card rounded-2xl p-4 overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-primary" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">DEADLINE TERDEKAT</p>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {upcomingDeadlines.map((d, i) => (
              <div key={i} className={`flex-shrink-0 rounded-xl px-4 py-2.5 text-center min-w-[120px] border transition-colors ${
                d.urgent ? "bg-destructive/5 border-destructive/20" : "bg-muted/50 border-border"
              }`}>
                <p className={`text-xs font-bold ${d.urgent ? "text-destructive" : "text-foreground"}`}>{d.date}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{d.title}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search + Filter toggle */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari kompetisi, skill, atau tim..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
            {activeFilters > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-primary text-xs font-bold">
                {activeFilters}
              </span>
            )}
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                className="hidden w-64 shrink-0 md:block"
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 256 }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">FILTER</p>
                    {activeFilters > 0 && (
                      <button onClick={clearAll} className="text-xs text-primary hover:underline font-medium">Hapus semua</button>
                    )}
                  </div>

                  {/* Category pills */}
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2.5">KATEGORI</p>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => toggleCategory(cat.value)}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                            selectedCategories.includes(cat.value)
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skill autocomplete */}
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2.5">SKILL</p>
                    <SkillSearch skills={skillsList} selected={selectedSkills} onToggle={toggleSkill} />
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2.5">STATUS</p>
                    <div className="space-y-2">
                      {statusFilters.map((s) => (
                        <label key={s.value} className="flex items-center gap-2 text-xs cursor-pointer">
                          <Checkbox
                            checked={selectedStatuses.includes(s.value)}
                            onCheckedChange={() => toggleStatus(s.value)}
                          />
                          {s.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Mobile filter drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setShowFilters(false)}>
              <motion.div
                className="absolute bottom-0 left-0 right-0 max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-border bg-card p-6"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <p className="font-semibold text-lg">Filter</p>
                  <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">KATEGORI</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button key={cat.value} onClick={() => toggleCategory(cat.value)}
                          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                            selectedCategories.includes(cat.value) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >{cat.label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">SKILL</p>
                    <div className="flex flex-wrap gap-2">
                      {skillsList.map((skill) => (
                        <button key={skill} onClick={() => toggleSkill(skill)}
                          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                            selectedSkills.includes(skill) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >{skill}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">STATUS</p>
                    <div className="space-y-2">
                      {statusFilters.map((s) => (
                        <label key={s.value} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox checked={selectedStatuses.includes(s.value)} onCheckedChange={() => toggleStatus(s.value)} />
                          {s.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="mt-6 w-full" onClick={() => setShowFilters(false)}>
                  Terapkan Filter
                </Button>
              </motion.div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {/* Active filter chips */}
            {activeFilters > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedCategories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleCategory(cat)}>
                    {categories.find((c) => c.value === cat)?.label || cat} <X className="h-3 w-3" />
                  </Badge>
                ))}
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="gap-1 cursor-pointer" onClick={() => toggleSkill(skill)}>
                    {skill} <X className="h-3 w-3" />
                  </Badge>
                ))}
                {selectedStatuses.map((s) => (
                  <Badge key={s} variant="outline" className="gap-1 cursor-pointer" onClick={() => toggleStatus(s)}>
                    {statusFilters.find((sf) => sf.value === s)?.label} <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}

            <p className="mb-4 text-[13px] text-muted-foreground">{filtered.length} tim ditemukan</p>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 font-medium">Tidak ada tim ditemukan</p>
                <p className="mt-1 text-sm text-muted-foreground">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {visibleItems.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="cursor-pointer"
                      onClick={() => openDrawer(post)}
                    >
                      <div className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                        {/* Top accent bar */}
                        <div className={`h-1 w-full ${post.daysLeft <= 3 ? "bg-destructive" : post.daysLeft <= 7 ? "bg-warning" : "bg-primary"}`} />

                        <div className="p-5">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div>
                              <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{post.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-[11px] gap-1 font-medium">
                                  <MapPin className="h-3 w-3" /> {post.campus}
                                </Badge>
                                <Badge variant="outline" className="text-[11px]">{post.category}</Badge>
                              </div>
                            </div>
                            {/* Status badge */}
                            {post.daysLeft <= 3 ? (
                              <Badge className="bg-destructive/10 text-destructive border-0 text-xs font-semibold gap-1 shrink-0">
                                <AlertTriangle className="h-3 w-3" /> Segera Tutup
                              </Badge>
                            ) : post.slotsMax - post.slotsUsed <= 2 ? (
                              <Badge className="bg-warning/10 text-warning border-0 text-xs font-semibold shrink-0">
                                {post.slotsMax - post.slotsUsed} slot tersisa
                              </Badge>
                            ) : (
                              <Badge className="bg-primary/10 text-primary border-0 text-xs font-semibold shrink-0">
                                Aktif
                              </Badge>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-[13px] text-muted-foreground line-clamp-2 mb-4">{post.desc}</p>

                          {/* Skills section - glassmorphism */}
                          <div className="rounded-xl bg-muted/30 backdrop-blur-sm border border-border/50 p-3 mb-4">
                            <div className="flex flex-wrap gap-1.5">
                              {post.neededSkills.map((s) => (
                                <Badge key={s} className="bg-primary/10 text-primary border-primary/20 text-[11px] font-semibold gap-1">
                                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> {s}
                                </Badge>
                              ))}
                              {post.filledSkills.map((s) => (
                                <Badge key={s} variant="secondary" className="text-[11px] gap-1 opacity-50">
                                  <CheckCircle2 className="h-3 w-3" /> {s}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {/* Stacked avatars */}
                              <div className="flex -space-x-2">
                                {post.members.slice(0, 3).map((m, j) => (
                                  <Avatar key={j} className="h-7 w-7 border-2 border-card">
                                    <AvatarFallback className="text-[9px] font-bold bg-accent text-accent-foreground">{m.initials}</AvatarFallback>
                                  </Avatar>
                                ))}
                                {post.members.length > 3 && (
                                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted border-2 border-card text-[9px] font-bold text-muted-foreground">
                                    +{post.members.length - 3}
                                  </div>
                                )}
                              </div>

                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Users className="h-3.5 w-3.5" /> {post.slots}
                              </span>

                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" /> {post.deadline}
                              </span>
                            </div>

                            <Button size="sm" className="text-xs font-semibold gap-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                              Apply <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Load More */}
                {loadingMore && (
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mt-5">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                        <Skeleton className="h-1 w-full rounded-full" />
                        <div className="flex gap-2"><Skeleton className="h-6 w-32" /><Skeleton className="h-5 w-16 rounded-full" /></div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="rounded-xl bg-muted/30 p-3 flex gap-2">
                          <Skeleton className="h-5 w-16 rounded-full" />
                          <Skeleton className="h-5 w-20 rounded-full" />
                          <Skeleton className="h-5 w-14 rounded-full" />
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Skeleton className="h-7 w-7 rounded-full" />
                          <Skeleton className="h-7 w-7 rounded-full" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {hasMore && !loadingMore && (
                  <div className="flex justify-center pt-10 pb-4">
                    <Button variant="outline" size="lg" onClick={handleLoadMore} className="px-10 gap-2">
                      <Loader2 className="h-4 w-4 hidden" />
                      Muat Lebih Banyak
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Team Detail Drawer */}
      <TeamDetailDrawer post={selectedPost} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
