import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, X } from "lucide-react";

const institutions = [
  "Universitas Indonesia",
  "Institut Teknologi Bandung",
  "Universitas Gadjah Mada",
  "Institut Teknologi Sepuluh Nopember",
  "Binus University",
  "Universitas Brawijaya",
  "Universitas Airlangga",
  "Universitas Padjadjaran",
  "Telkom University",
  "Universitas Diponegoro",
];

const masterCategories: Record<string, string[]> = {
  IT: ["React", "Python", "TypeScript", "Node.js", "Flutter", "Machine Learning", "SQL", "Docker"],
  Business: ["Financial Modeling", "Market Research", "Business Strategy", "Pitching", "Marketing"],
  Creative: ["UI/UX Design", "Figma", "Illustration", "Video Editing", "Copywriting"],
  Academic: ["Research Methods", "Academic Writing", "Data Analysis", "Public Speaking", "Debate"],
};

export default function Signup() {
  const [skillCategory, setSkillCategory] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = skillCategory
    ? masterCategories[skillCategory].filter(
        (s) =>
          s.toLowerCase().includes(skillInput.toLowerCase()) &&
          !skills.includes(s)
      )
    : [];

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput("");
    setShowSuggestions(false);
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-emerald mb-4">
            <Trophy className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-muted-foreground">Join AlmamaterConnect and find your dream team</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first">First Name</Label>
                <Input id="first" placeholder="Andi" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="last">Last Name</Label>
                <Input id="last" placeholder="Pratama" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@campus.ac.id" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="institution">Institution / Campus</Label>
              <Select>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your campus" />
                </SelectTrigger>
                <SelectContent>
                  {institutions.map((inst) => (
                    <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="major">Major / Department</Label>
              <Input id="major" placeholder="e.g., Computer Science" className="mt-1.5" />
            </div>

            {/* Skill Category + Tags */}
            <div>
              <Label>Skill Category</Label>
              <Select value={skillCategory} onValueChange={(v) => { setSkillCategory(v); setSkillInput(""); }}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(masterCategories).map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {skillCategory && (
              <div>
                <Label>Your Skills</Label>
                <div className="relative mt-1.5">
                  <Input
                    placeholder="Type a skill and press Enter..."
                    value={skillInput}
                    onChange={(e) => {
                      setSkillInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill(skillInput);
                      }
                    }}
                  />
                  {showSuggestions && skillInput && suggestions.length > 0 && (
                    <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-popover p-1 shadow-md">
                      {suggestions.slice(0, 5).map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                          onMouseDown={(e) => { e.preventDefault(); addSkill(s); }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Pick from suggestions or type your own and press Enter.
                </p>
                {skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="mt-1.5" />
            </div>
            <Button className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
