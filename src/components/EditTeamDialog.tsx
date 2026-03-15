import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: {
    name: string;
    filled: number;
    total: number;
    status: string;
  };
}

const categories = ["Design", "Development", "Data Science", "AI / ML", "IoT", "Business", "Cybersecurity"];
const campuses = ["Universitas Indonesia", "ITB", "UGM", "Binus University", "ITS", "Telkom University"];

export default function EditTeamDialog({ open, onOpenChange, team }: EditTeamDialogProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState(team.name);
  const [category, setCategory] = useState("Design");
  const [campus, setCampus] = useState("Universitas Indonesia");
  const [maxSlots, setMaxSlots] = useState(team.total);
  const [description, setDescription] = useState("");

  const handleSave = () => {
    toast({
      title: "Team Updated",
      description: `"${title}" has been updated successfully.`,
      className: "border-primary/50 bg-accent",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">Edit Team</DialogTitle>
          <DialogDescription className="text-[13px] text-muted-foreground">
            Modify your team details and settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Title
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-sm h-10 border-border focus-visible:ring-primary"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="text-sm h-10 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-sm">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campus */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Campus
            </Label>
            <Select value={campus} onValueChange={setCampus}>
              <SelectTrigger className="text-sm h-10 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {campuses.map((c) => (
                  <SelectItem key={c} value={c} className="text-sm">{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Max Slots */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Max Slots
            </Label>
            <Input
              type="number"
              min={team.filled}
              max={10}
              value={maxSlots}
              onChange={(e) => setMaxSlots(Number(e.target.value))}
              className="text-sm h-10 border-border focus-visible:ring-primary"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Team Description
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe your team's goals and vision..."
              className="text-[13px] border-border focus-visible:ring-primary resize-none leading-relaxed"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="hover:scale-105 transition-transform">
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2 hover:scale-105 transition-transform">
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
