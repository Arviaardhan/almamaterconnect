import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X, Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    major: string;
    bio: string;
    skills: string[];
    github: string | null;
    linkedin: string | null;
  };
}

export default function EditProfileSheet({ open, onOpenChange, user }: EditProfileSheetProps) {
  const { toast } = useToast();
  const [name, setName] = useState(user.name);
  const [major, setMajor] = useState(user.major);
  const [bio, setBio] = useState(user.bio);
  const [portfolio, setPortfolio] = useState(user.github || "");
  const [skills, setSkills] = useState<string[]>(user.skills);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
      className: "border-primary/50 bg-accent",
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold tracking-tight">Edit Profile</SheetTitle>
          <SheetDescription className="text-[13px] text-muted-foreground">
            Update your personal information and skills.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Full Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm h-10 border-border focus-visible:ring-primary"
            />
          </div>

          {/* Major */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Major
            </Label>
            <Input
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="text-sm h-10 border-border focus-visible:ring-primary"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Bio
            </Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="text-[13px] border-border focus-visible:ring-primary resize-none leading-relaxed"
            />
          </div>

          {/* Portfolio Link */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Portfolio Link
            </Label>
            <Input
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="https://your-portfolio.com"
              className="text-sm h-10 border-border focus-visible:ring-primary"
            />
          </div>

          {/* Skills */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Skills
            </Label>
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="Add a skill..."
                className="text-sm h-9 border-border focus-visible:ring-primary"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addSkill}
                className="h-9 px-3 shrink-0 hover:scale-105 transition-transform"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1 pr-1.5 text-[13px]">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Save */}
          <Button
            onClick={handleSave}
            className="w-full gap-2 mt-4 hover:scale-105 transition-transform"
          >
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
