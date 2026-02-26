import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Plus, X, CheckCircle2, Trophy, FileText, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const stepLabels = [
  { icon: Trophy, label: "Competition" },
  { icon: FileText, label: "Details" },
  { icon: Users, label: "Roles" },
];

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
  const [editingRoleIndex, setEditingRoleIndex] = useState<number | null>(null);

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

  const handleSubmit = () => {
    // Mock submit
    navigate("/explore");
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Create Recruitment</h1>
      <p className="text-muted-foreground mb-8">Post a new team search for your competition</p>

      {/* Progress Steps */}
      <div className="mb-10 flex items-center justify-between">
        {stepLabels.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
              i <= step ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
            }`}>
              {i < step ? <CheckCircle2 className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
            </div>
            <span className={`hidden text-sm font-medium sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
              {s.label}
            </span>
            {i < stepLabels.length - 1 && (
              <div className={`mx-2 h-px w-8 sm:w-16 ${i < step ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="animate-fade-in rounded-2xl border border-border bg-card p-6 md:p-8">
        {/* Step 1: Competition Info */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <Label htmlFor="title">Competition Title *</Label>
              <Input id="title" placeholder="e.g., Hackathon UI/UX 2026" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="mobile">Mobile Development</SelectItem>
                  <SelectItem value="design">UI/UX Design</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                  <SelectItem value="business">Business Case</SelectItem>
                  <SelectItem value="iot">IoT / Hardware</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="link">Competition Link</Label>
              <Input id="link" placeholder="https://..." value={link} onChange={(e) => setLink(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="deadline">Registration Deadline</Label>
              <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp Group/Contact Link <span className="text-muted-foreground font-normal">(Optional)</span></Label>
              <Input id="whatsapp" placeholder="https://chat.whatsapp.com/..." value={whatsappLink} onChange={(e) => setWhatsappLink(e.target.value)} className="mt-1.5" />
              <p className="text-xs text-muted-foreground mt-1">Only visible to approved team members</p>
            </div>
          </div>
        )}

        {/* Step 2: Description */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <Label htmlFor="desc">Project Description *</Label>
              <Textarea
                id="desc"
                placeholder="Describe your project, what you're building, and what makes it exciting..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1.5 min-h-[180px]"
              />
            </div>
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
              <p className="text-sm text-muted-foreground mt-1">Add the roles you're looking to fill</p>
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
                {editingRoleIndex === i && (
                  <div className="mt-3 flex gap-2">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkillToRole(i)}
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline" onClick={() => addSkillToRole(i)}>Add</Button>
                  </div>
                )}
                {editingRoleIndex !== i && (
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
                placeholder="e.g., Frontend Developer"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addRole()}
              />
              <Button variant="outline" onClick={addRole} className="gap-1 shrink-0">
                <Plus className="h-4 w-4" /> Add Role
              </Button>
            </div>
          </div>
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
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)} className="gap-2">
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
