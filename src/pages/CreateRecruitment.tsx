import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, ArrowRight, Plus, X, CheckCircle2, Trophy, Lightbulb,
  Users, Upload, Loader2, ExternalLink, Link as LinkIcon
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "@/components/create-recruitment/StepIndicator";
import ReviewStep from "@/components/create-recruitment/ReviewStep";
import { useToast } from "@/hooks/use-toast";

const DESC_MAX = 500;
const TAGLINE_MAX = 60;

const categories = [
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile Development" },
  { value: "design", label: "UI/UX Design" },
  { value: "data", label: "Data Science" },
  { value: "business", label: "Business Case" },
  { value: "iot", label: "IoT / Hardware" },
  { value: "debate", label: "Debate" },
  { value: "research", label: "Research / Academic" },
  { value: "creative", label: "Creative / Multimedia" },
];

const competitionSuggestions: Record<string, string[]> = {
  web: ["Hackathon UI/UX 2026", "Google Solution Challenge", "BINUS Hackathon", "Compfest Hackaday"],
  mobile: ["Flutter Forward Extended", "Apple Developer Academy Challenge"],
  design: ["UXTopia Design Sprint", "Figma Design Jam", "Adobe Creative Jam"],
  data: ["Kaggle Competition", "Data Mining Cup", "BRI Data Hackathon"],
  business: ["L'Oréal Brandstorm", "Unilever Future Leaders", "Shell NXplorers"],
  iot: ["IoT Maker Challenge", "Intel IoT Hackathon"],
  debate: ["NUDC", "Asian Parliamentary Debate"],
  research: ["LKTI Nasional", "PIMNAS", "Student Research Symposium"],
  creative: ["Film Pendek Mahasiswa", "Creative Campaign Challenge"],
};

const progressOptions = [
  { value: "ideation", label: "Ideasi" },
  { value: "research", label: "Riset" },
  { value: "prototype", label: "Prototipe Dimulai" },
  { value: "halfway", label: "Setengah Jalan" },
];

interface RoleEntry {
  role: string;
  responsibilities: string;
  skills: string[];
}

function isValidUrl(val: string) {
  return !val || /^https?:\/\/.+/i.test(val);
}

export default function CreateRecruitment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");
  const [progress, setProgress] = useState("");
  const [deadlineDate, setDeadlineDate] = useState<Date>();
  const [roles, setRoles] = useState<RoleEntry[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  const titleSuggestions = category
    ? (competitionSuggestions[category] || []).filter(
        (s) => s.toLowerCase().includes(title.toLowerCase())
      )
    : [];

  const validate = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!title.trim()) e.title = "Wajib diisi";
      if (!category) e.category = "Wajib diisi";
      if (link && !isValidUrl(link)) e.link = "Harus diawali http:// atau https://";
    }
    if (s === 1) {
      if (!description.trim()) e.description = "Wajib diisi";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (validate(step)) setStep(step + 1);
  };

  const addRole = () => {
    setRoles([...roles, { role: "", responsibilities: "", skills: [] }]);
  };

  const updateRole = (index: number, field: keyof RoleEntry, value: string | string[]) => {
    const updated = [...roles];
    (updated[index] as any)[field] = value;
    setRoles(updated);
  };

  const addSkillToRole = (index: number) => {
    if (newSkill.trim()) {
      const updated = [...roles];
      if (!updated[index].skills.includes(newSkill.trim())) {
        updated[index].skills.push(newSkill.trim());
      }
      setRoles(updated);
      setNewSkill("");
    }
  };

  const removeRole = (index: number) => setRoles(roles.filter((_, i) => i !== index));

  const removeSkill = (roleIndex: number, skillIndex: number) => {
    const updated = [...roles];
    updated[roleIndex].skills.splice(skillIndex, 1);
    setRoles(updated);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast({
      title: "🎉 Tim berhasil dipublikasi!",
      description: "Timmu sekarang terlihat di halaman Explore.",
      className: "border-primary/50 bg-accent",
    });
    setSubmitting(false);
    navigate("/explore");
  };

  const fieldClass = (key: string) => errors[key] ? "border-destructive" : "";
  const deadlineStr = deadlineDate ? format(deadlineDate, "dd MMM yyyy") : "";

  const stepContent = [
    // Step 0: Info Dasar
    <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Trophy className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Informasi Dasar Kompetisi</h2>
          <p className="text-xs text-muted-foreground">Detail dasar tentang kompetisi yang kamu ikuti</p>
        </div>
      </div>

      <Field label="Kategori *" error={errors.category}>
        <Select value={category} onValueChange={(v) => { setCategory(v); setTitle(""); }}>
          <SelectTrigger className={fieldClass("category")}>
            <SelectValue placeholder="Pilih kategori kompetisi" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Nama Kompetisi *" error={errors.title}>
        <div className="relative" ref={titleRef}>
          <Input
            placeholder="Contoh: Gemastik 2026 - UX Design"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setShowTitleSuggestions(true); }}
            onFocus={() => setShowTitleSuggestions(true)}
            onBlur={() => setTimeout(() => setShowTitleSuggestions(false), 150)}
            className={fieldClass("title")}
          />
          {showTitleSuggestions && titleSuggestions.length > 0 && title.length > 0 && (
            <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-popover p-1 shadow-md">
              {titleSuggestions.slice(0, 5).map((s) => (
                <button key={s} type="button" className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                  onMouseDown={(e) => { e.preventDefault(); setTitle(s); setShowTitleSuggestions(false); }}
                >{s}</button>
              ))}
            </div>
          )}
          {category && <p className="text-xs text-muted-foreground mt-1">Ketik untuk melihat saran, atau masukkan nama sendiri.</p>}
        </div>
      </Field>

      <Field label="Link Resmi Kompetisi" error={errors.link}>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="https://..." value={link} onChange={(e) => setLink(e.target.value)} className={`pl-10 ${fieldClass("link")}`} />
        </div>
      </Field>

      <Field label="Deadline Registrasi">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !deadlineDate && "text-muted-foreground")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              {deadlineDate ? format(deadlineDate, "dd MMMM yyyy") : "Pilih tanggal"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={deadlineDate} onSelect={setDeadlineDate} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>
      </Field>

      {/* Upload area placeholder */}
      <Field label="Cover/Logo Tim (Opsional)">
        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Drag & drop gambar, atau klik untuk upload</p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG (max. 2MB)</p>
        </div>
      </Field>
    </motion.div>,

    // Step 1: Visi & Deskripsi
    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Visi & Deskripsi</h2>
          <p className="text-xs text-muted-foreground">Ceritakan visi timmu untuk menarik anggota terbaik</p>
        </div>
      </div>

      <Field label="Tagline Tim" hint={`Satu kalimat yang menggambarkan misi timmu (${tagline.length}/${TAGLINE_MAX})`}>
        <Input
          placeholder='Contoh: "Membangun AI untuk Petani, Target Gold Medal!"'
          value={tagline}
          onChange={(e) => setTagline(e.target.value.slice(0, TAGLINE_MAX))}
        />
      </Field>

      <Field label="Deskripsi Detail *" error={errors.description} hint={`${description.length}/${DESC_MAX} karakter`}>
        <Textarea
          placeholder="Jelaskan tentang proyek, apa yang sedang dibangun, dan kenapa ini menarik..."
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, DESC_MAX))}
          className={`min-h-[160px] ${fieldClass("description")}`}
        />
      </Field>

      <Field label="Progress Saat Ini">
        <Select value={progress} onValueChange={setProgress}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih tahap saat ini..." />
          </SelectTrigger>
          <SelectContent>
            {progressOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="WhatsApp Group" hint="Hanya terlihat oleh anggota yang diterima">
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="https://chat.whatsapp.com/..." value={whatsappLink} onChange={(e) => setWhatsappLink(e.target.value)} className="pl-10" />
        </div>
      </Field>

      <Field label="Link Guidebook / Resources" hint="Link panduan kompetisi untuk tim">
        <div className="relative">
          <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="https://drive.google.com/..." value={resourceLink} onChange={(e) => setResourceLink(e.target.value)} className="pl-10" />
        </div>
      </Field>
    </motion.div>,

    // Step 2: Kebutuhan Role
    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-bold text-lg">Kebutuhan Role</h2>
          <p className="text-xs text-muted-foreground">Definisikan posisi yang kamu butuhkan di tim</p>
        </div>
      </div>

      <AnimatePresence>
        {roles.map((role, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="rounded-xl border border-border p-5 space-y-3 relative"
          >
            <button
              onClick={() => removeRole(i)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pr-6">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">NAMA ROLE</Label>
              <Input
                placeholder="Contoh: Backend Developer, UI Designer, Lead Researcher"
                value={role.role}
                onChange={(e) => updateRole(i, "role", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">TANGGUNG JAWAB</Label>
              <Textarea
                placeholder="Contoh: Develop API, Manage Database, Integrasi Payment"
                value={role.responsibilities}
                onChange={(e) => updateRole(i, "responsibilities", e.target.value)}
                className="mt-1 min-h-[70px]"
              />
            </div>

            <div>
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">SKILL YANG DIBUTUHKAN</Label>
              <div className="flex flex-wrap gap-1.5 mt-1.5 mb-2">
                {role.skills.map((skill, si) => (
                  <Badge key={si} className="bg-accent text-accent-foreground border-0 gap-1 text-xs">
                    {skill}
                    <button onClick={() => removeSkill(i, si)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ketik skill lalu tekan Enter..."
                  value={i === roles.length - 1 ? newSkill : ""}
                  onChange={(e) => { if (i === roles.length - 1) setNewSkill(e.target.value); }}
                  onFocus={() => { if (i !== roles.length - 1) setNewSkill(""); }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (i === roles.length - 1) {
                        addSkillToRole(i);
                      }
                    }
                  }}
                  className="flex-1"
                />
                <Button size="sm" variant="outline" onClick={() => {
                  if (newSkill.trim() && i === roles.length - 1) addSkillToRole(i);
                }}>
                  Tambah
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button variant="outline" onClick={addRole} className="w-full gap-2 border-dashed h-12">
        <Plus className="h-4 w-4" /> Tambah Role yang Dibutuhkan
      </Button>

      {roles.length === 0 && (
        <p className="text-[13px] text-muted-foreground text-center py-4">
          Belum ada role. Klik tombol di atas untuk menambahkan posisi yang kamu butuhkan.
        </p>
      )}
    </motion.div>,

    // Step 3: Review
    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <ReviewStep
        title={title}
        category={category}
        link={link}
        deadline={deadlineStr}
        whatsappLink={whatsappLink}
        resourceLink={resourceLink}
        description={description}
        tagline={tagline}
        progress={progress}
        roles={roles}
      />
    </motion.div>,
  ];

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />

      <div className="container relative mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Mulai Perjalanan Kompetisimu</h1>
          <p className="mt-2 text-[13px] text-muted-foreground max-w-md mx-auto">
            Lengkapi detail di bawah untuk menarik rekan tim terbaik dari almamatermu.
          </p>
        </motion.div>

        <StepIndicator currentStep={step} />

        {/* Form card */}
        <div className="glass-card rounded-2xl p-6 md:p-8 shadow-lg">
          <AnimatePresence mode="wait">
            {stepContent[step]}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Kembali
            </Button>
            {step < 3 ? (
              <Button onClick={goNext} className="gap-2 shadow-md shadow-primary/15">
                Lanjut <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="gap-2 shadow-lg shadow-primary/25 px-8"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Mempublikasi...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Publikasi Tim
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
