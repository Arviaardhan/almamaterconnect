import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UserPlus, Loader2 } from "lucide-react";

interface JoinTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamName: string;
  onSubmit: (message: string) => void;
}

export default function JoinTeamModal({ open, onOpenChange, teamName, onSubmit }: JoinTeamModalProps) {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    onSubmit(message);
    setMessage("");
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join {teamName}</DialogTitle>
          <DialogDescription>
            Introduce yourself to the team leader. A strong intro increases your chances!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div>
            <Label htmlFor="intro">Short Introduction</Label>
            <Textarea
              id="intro"
              placeholder="Tell them about your experience, skills, and why you want to join..."
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 200))}
              className="mt-1.5 min-h-[100px]"
            />
            <p className="mt-1 text-xs text-muted-foreground text-right">{message.length}/200</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitting || !message.trim()} className="gap-2">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
            {submitting ? "Sending..." : "Send Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
