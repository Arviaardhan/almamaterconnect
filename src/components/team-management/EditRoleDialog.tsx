import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface Role {
  id: string;
  name: string;
  skills: string[];
  filled: number;
  max: number;
  members: any[];
}

interface EditRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role;
  onSave: (role: Role) => void;
}

export default function EditRoleDialog({ open, onOpenChange, role, onSave }: EditRoleDialogProps) {
  const [name, setName] = useState(role.name);
  const [max, setMax] = useState(role.max);
  const [skills, setSkills] = useState<string[]>(role.skills);
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
    onSave({ ...role, name, max: Math.max(max, role.filled), skills });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">EDIT ROLE</p>
          <DialogTitle className="text-lg">{role.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label className="text-[10px] font-black uppercase tracking-[0.2em]">Role Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 text-[13px]" />
          </div>

          <div>
            <Label className="text-[10px] font-black uppercase tracking-[0.2em]">Max Slots</Label>
            <Input
              type="number"
              min={role.filled}
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value) || 1)}
              className="mt-1.5 w-24 text-[13px]"
            />
            {role.filled > 0 && (
              <p className="text-[10px] text-muted-foreground mt-1">Minimum {role.filled} (current members)</p>
            )}
          </div>

          <div>
            <Label className="text-[10px] font-black uppercase tracking-[0.2em]">Required Skills</Label>
            <div className="mt-1.5 flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="Add a skill..."
                className="text-[13px]"
              />
              <Button size="sm" variant="outline" onClick={addSkill} className="hover:scale-105 transition-transform">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1 text-[11px] pr-1">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="ml-0.5 hover:text-destructive transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="hover:scale-105 transition-transform">
            Cancel
          </Button>
          <Button onClick={handleSave} className="hover:scale-105 transition-transform">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
