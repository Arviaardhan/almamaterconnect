import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Camera, X, Plus, Save, Github, Linkedin, Globe, User, GraduationCap, FileText, Wrench, Link2 } from "lucide-react";
import { motion } from "framer-motion";

const SKILL_SUGGESTIONS = [
  "React", "TypeScript", "Python", "Figma", "Node.js", "Tailwind CSS",
  "Firebase", "Flutter", "Java", "Go", "Docker", "AWS", "UI/UX Design",
  "Data Science", "Machine Learning", "Laravel", "PostgreSQL", "MongoDB",
];

const CATEGORIES = [
  { value: "it", label: "Information Technology" },
  { value: "business", label: "Business & Management" },
  { value: "creative", label: "Creative & Design" },
  { value: "academic", label: "Academic & Research" },
];

const initialProfile = {
  name: "Andi Pratama",
  initials: "AP",
  campus: "Universitas Indonesia",
  major: "Computer Science",
  bio: "Passionate UI/UX designer and front-end developer. Love building products that solve real problems. 3x hackathon winner.",
  skills: ["React", "TypeScript", "Figma", "User Research", "Node.js", "Python", "Tailwind CSS", "Firebase"],
  github: "https://github.com/andipratama",
  linkedin: "https://linkedin.com/in/andipratama",
  portfolio: "https://andipratama.dev",
  phone: "+6281234567890",
  email: "andi@example.com",
  category: "it",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function EditProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState(initialProfile.name);
  const [major, setMajor] = useState(initialProfile.major);
  const [campus, setCampus] = useState(initialProfile.campus);
  const [bio, setBio] = useState(initialProfile.bio);
  const [category, setCategory] = useState(initialProfile.category);
  const [github, setGithub] = useState(initialProfile.github);
  const [linkedin, setLinkedin] = useState(initialProfile.linkedin);
  const [portfolioUrl, setPortfolioUrl] = useState(initialProfile.portfolio);
  const [phone, setPhone] = useState(initialProfile.phone);
  const [email, setEmail] = useState(initialProfile.email);
  const [skills, setSkills] = useState<string[]>(initialProfile.skills);
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);

  const bioMax = 280;

  const addSkill = (skill?: string) => {
    const value = (skill || skillInput).trim();
    if (value && !skills.includes(value)) {
      setSkills([...skills, value]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const suggestedSkills = SKILL_SUGGESTIONS.filter(
    (s) => !skills.includes(s) && s.toLowerCase().includes(skillInput.toLowerCase())
  ).slice(0, 6);

  const handleSave = () => {
    if (!name.trim() || !major.trim()) {
      toast({ title: "Missing fields", description: "Name and Major are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ title: "Profile saved", description: "Your changes have been applied.", className: "border-primary/30 bg-accent" });
      navigate("/profile");
    }, 800);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6 pb-24">
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between mb-8"
      >
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Profile
        </button>
        <Button onClick={handleSave} disabled={saving} className="gap-2 min-w-[120px]">
          {saving ? (
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Saving…
            </span>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </motion.div>

      {/* Avatar & Name header */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
        <Card className="rounded-2xl border-border overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative group shrink-0">
                <Avatar className="h-24 w-24 ring-4 ring-background shadow-lg">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                    {initialProfile.initials}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/50 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 w-full space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
                      <User className="h-3 w-3" /> Full Name
                    </Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
                      <GraduationCap className="h-3 w-3" /> Major
                    </Label>
                    <Input value={major} onChange={(e) => setMajor(e.target.value)} className="h-10 text-sm" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    Institution
                  </Label>
                  <Input value={campus} onChange={(e) => setCampus(e.target.value)} className="h-10 text-sm" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bio */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="mt-5">
        <Card className="rounded-2xl border-border">
          <CardContent className="p-6">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5 mb-2">
              <FileText className="h-3 w-3" /> Bio
            </Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, bioMax))}
              rows={4}
              placeholder="Tell others about yourself…"
              className="text-[13px] leading-relaxed resize-none"
            />
            <p className={`text-[11px] mt-1.5 text-right ${bio.length >= bioMax ? "text-destructive" : "text-muted-foreground"}`}>
              {bio.length}/{bioMax}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category */}
      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mt-5">
        <Card className="rounded-2xl border-border">
          <CardContent className="p-6">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
              Master Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-10 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills */}
      <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-5">
        <Card className="rounded-2xl border-border">
          <CardContent className="p-6">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5 mb-3">
              <Wrench className="h-3 w-3" /> Skills & Expertise
            </Label>

            {/* Current skills */}
            <div className="flex flex-wrap gap-1.5 mb-4 min-h-[32px]">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1 pr-1.5 text-[13px] group/badge">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-destructive/20 hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {skills.length === 0 && (
                <p className="text-[13px] text-muted-foreground italic">No skills added yet</p>
              )}
            </div>

            {/* Skill input */}
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="Type a skill and press Enter…"
                className="h-9 text-sm flex-1"
              />
              <Button type="button" size="sm" variant="outline" onClick={() => addSkill()} className="h-9 px-3 shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Suggestions */}
            {skillInput && suggestedSkills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground w-full mb-1">
                  Suggestions
                </span>
                {suggestedSkills.map((s) => (
                  <button
                    key={s}
                    onClick={() => addSkill(s)}
                    className="rounded-full border border-dashed border-primary/40 px-2.5 py-0.5 text-xs text-primary hover:bg-primary/10 transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Social Links */}
      <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mt-5">
        <Card className="rounded-2xl border-border">
          <CardContent className="p-6">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5 mb-4">
              <Link2 className="h-3 w-3" /> Social & Portfolio Links
            </Label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted shrink-0">
                  <Github className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/username" className="h-9 text-sm" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted shrink-0">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/username" className="h-9 text-sm" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted shrink-0">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} placeholder="https://yourportfolio.dev" className="h-9 text-sm" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Info */}
      <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="mt-5">
        <Card className="rounded-2xl border-border">
          <CardContent className="p-6">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
              Contact Information
            </Label>
            <p className="text-[11px] text-muted-foreground mb-4">
              Used for team invitations only. Not publicly visible.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">WhatsApp Number</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+62…" className="h-9 text-sm" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottom save (mobile) */}
      <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible" className="mt-8">
        <Button onClick={handleSave} disabled={saving} className="w-full gap-2 h-12 text-base">
          {saving ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Saving…
            </span>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
