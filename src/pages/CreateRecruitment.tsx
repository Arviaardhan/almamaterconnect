import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Plus, X, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import StepIndicator from "@/components/create-recruitment/StepIndicator";
import ReviewStep from "@/components/create-recruitment/ReviewStep";

const DESC_MAX = 500;

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
  mobile: ["Flutter Forward Extended", "Apple Developer Academy Challenge", "Google Developer Student Clubs"],
  design: ["UXTopia Design Sprint", "Figma Design Jam", "Adobe Creative Jam"],
  data: ["Kaggle Competition", "Data Mining Cup", "BRI Data Hackathon"],
  business: ["L'Oréal Brandstorm", "Unilever Future Leaders", "Shell NXplorers", "SBM ITB Business Case"],
  iot: ["IoT Maker Challenge", "Intel IoT Hackathon", "Embedded Systems Competition"],
  debate: ["NUDC", "Asian Parliamentary Debate", "World Schools Debating Championship"],
  research: ["LKTI Nasional", "PIMNAS", "Student Research Symposium"],
  creative: ["Film Pendek Mahasiswa", "Lomba Poster Ilmiah", "Creative Campaign Challenge"],
};

function isValidUrl(val: string) {
  return !val || /^https?:\/\/.+/i.test(val);
}

export default function CreateRecruitment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [roles, setRoles] = useState<{ role: string; skills: string[] }[]>([]);
  const [newRole, setNewRole] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [editingRoleIndex, setEditingRoleIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  const titleSuggestions = category
    ? (competitionSuggestions[category] || []).filter(
        (s) => s.toLowerCase().includes(title.toLowerCase())
      )
    : [];

  const validate = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!title.trim()) e.title = "This field is required";
      if (!category) e.category = "This field is required";
      if (link && !isValidUrl(link)) e.link = "Must start with http:// or https://";
      if (whatsappLink && !isValidUrl(whatsappLink)) e.whatsappLink = "Must start with http:// or https://";
      if (resourceLink && !isValidUrl(resourceLink)) e.resourceLink = "Must start with http:// or https://";
    }
    if (s === 1) {
      if (!description.trim()) e.description = "This field is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (validate(step)) setStep(step + 1);
  };

  const addRole = () => {
    if (newRole.trim()) {
      setRoles([...roles, { role: newRole.trim(), skills: [] }]);
      setNewRole("");
      setEditingRoleIndex(roles.length);
    }
  };

  const addSkillToRole = (index: number) => {
    if (newSkill.trim()) {
      const updated = [...roles];
      updated[index].skills.push(newSkill.trim());
      setRoles(updated);
      setNewSkill("");
    }
  };

  const removeRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
    setEditingRoleIndex(null);
  };

  const removeSkill = (roleIndex: number, skillIndex: number) => {
    const updated = [...roles];
    updated[roleIndex].skills.splice(skillIndex, 1);
    setRoles(updated);
  };

  const handleSubmit = () => navigate("/explore");

  const fieldClass = (key: string) => errors[key] ? "border-destructive" : "";

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Create Recruitment</h1>
      <p className="text-muted-foreground mb-8">Post a new team search for your competition</p>

      <StepIndicator currentStep={step} />

      <div className="animate-fade-in rounded-2xl border border-border bg-card p-6 md:p-8">
        {/* Step 1: Competition Info */}
        {step === 0 && (
          <div className="space-y-5">
            <Field label="Category *" error={errors.category}>
              <Select value={category} onValueChange={(v) => { setCategory(v); setTitle(""); }}>
                <SelectTrigger className={fieldClass("category")}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Competition Title *" error={errors.title}>
              <div className="relative" ref={titleRef}>
                <Input
                  placeholder="e.g., Hackathon UI/UX 2026"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setShowTitleSuggestions(true);
                  }}
                  onFocus={() => setShowTitleSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowTitleSuggestions(false), 150)}
                  className={fieldClass("title")}
                />
                {showTitleSuggestions && titleSuggestions.length > 0 && title.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-popover p-1 shadow-md">
                    {titleSuggestions.slice(0, 5).map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                        onMouseDown={(e) => { e.preventDefault(); setTitle(s); setShowTitleSuggestions(false); }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                {category && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Type to see suggestions, or enter your own competition name.
                  </p>
                )}
              </div>
            </Field>
            <Field label="Competition Link" error={errors.link}>
              <Input placeholder="https://..." value={link} onChange={(e) => setLink(e.target.value)} className={fieldClass("link")} />
            </Field>
            <Field label="Registration Deadline">
              <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </Field>
    <Field label="WhatsApp Group/Contact Link" hint="Only visible to approved team members" error={errors.whatsappLink}>
              <Input placeholder="https://chat.whatsapp.com/..." value={whatsappLink} onChange={(e) => setWhatsappLink(e.target.value)} className={fieldClass("whatsappLink")} />
            </Field>
            <Field label="Guidebook / Resource Link" hint="Provide a link to the competition rules or guidebook for your team." error={errors.resourceLink}>
              <Input placeholder="e.g., Google Drive or Dropbox link" value={resourceLink} onChange={(e) => setResourceLink(e.target.value)} className={fieldClass("resourceLink")} />
            </Field>
          </div>
        )}

        {/* Step 2: Description */}
        {step === 1 && (
          <div className="space-y-5">
            <Field label="Project Description *" error={errors.description}>
              <Textarea
                placeholder="Describe your project, what you're building, and what makes it exciting..."
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, DESC_MAX))}
                className={`min-h-[180px] ${fieldClass("description")}`}
              />
              <p className={`text-xs mt-1 text-right ${description.length >= DESC_MAX ? "text-destructive" : "text-muted-foreground"}`}>
                {description.length}/{DESC_MAX}
              </p>
            </Field>
            <p className="text-xs text-muted-foreground">
              Tip: Include your team's vision, the problem you're solving, and what you hope to achieve.
            </p>
          </div>
        )}

        {/* Step 3: Roles */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <Label>Needed Roles</Label>
              <p className="text-sm text-muted-foreground mt-1">Define each role and add required skill tags</p>
            </div>

            {roles.map((role, i) => (
              <div key={i} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{role.role}</h4>
                  <button onClick={() => removeRole(i)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {role.skills.map((skill, si) => (
                    <Badge key={si} variant="secondary" className="gap-1">
                      {skill}
                      <button onClick={() => removeSkill(i, si)}><X className="h-3 w-3" /></button>
                    </Badge>
                  ))}
                </div>
                {editingRoleIndex === i ? (
                  <div className="mt-3 flex gap-2">
                    <Input
                      placeholder="Add a skill (e.g. React, Python)..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkillToRole(i)}
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline" onClick={() => addSkillToRole(i)}>Add</Button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingRoleIndex(i)}
                    className="mt-2 text-xs text-primary hover:underline"
                  >
                    + Add skills
                  </button>
                )}
              </div>
            ))}

            <div className="flex gap-2">
              <Input
                placeholder="e.g., Lead Researcher, UI Designer..."
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addRole()}
              />
              <Button variant="outline" onClick={addRole} className="gap-1 shrink-0">
                <Plus className="h-4 w-4" /> Add Role
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Define any role name — e.g., "Lead Researcher", "Debater", "Frontend Dev" — then add specific skill requirements.
            </p>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 3 && (
          <ReviewStep
            title={title}
            category={category}
            link={link}
            deadline={deadline}
            whatsappLink={whatsappLink}
            resourceLink={resourceLink}
            description={description}
            roles={roles}
          />
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < 3 ? (
            <Button onClick={goNext} className="gap-2">
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2 shadow-lg shadow-primary/25">
              <CheckCircle2 className="h-4 w-4" /> Post Recruitment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
