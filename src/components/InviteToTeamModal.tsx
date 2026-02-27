import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const myTeams = [
  { id: "t1", name: "Hackathon UI/UX 2026", slots: 2 },
  { id: "t2", name: "AI Innovation Challenge", slots: 1 },
  { id: "t3", name: "Data Analytics Cup", slots: 3 },
];

interface InviteToTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetUser: { id: number; name: string; initials: string; skills: string[] } | null;
}

export default function InviteToTeamModal({ open, onOpenChange, targetUser }: InviteToTeamModalProps) {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!selectedTeam) {
      toast({ title: "Please select a team", variant: "destructive" });
      return;
    }
    setSending(true);
    const teamName = myTeams.find(t => t.id === selectedTeam)?.name;
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Invitation Sent!",
        description: `Your invitation to ${targetUser?.name} for ${teamName} has been sent.`,
      });
      setSelectedTeam("");
      setMessage("");
      onOpenChange(false);
    }, 800);
  };

  if (!targetUser) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite to Your Team</DialogTitle>
          <DialogDescription>Send a team invitation to {targetUser.name}.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">{targetUser.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-foreground">{targetUser.name}</p>
            <p className="text-xs text-muted-foreground">{targetUser.skills.join(", ")}</p>
          </div>
        </div>

        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>Select Team</Label>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a team..." />
              </SelectTrigger>
              <SelectContent>
                {myTeams.map(t => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name} · {t.slots} slot{t.slots !== 1 ? "s" : ""} open
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Personal Pitch <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Textarea
              placeholder={`Hey ${targetUser.name.split(" ")[0]}, I saw your ${targetUser.skills[0]} skills and they'd be perfect for our project!`}
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSend} disabled={sending}>
            <Send className="h-4 w-4 mr-2" />
            {sending ? "Sending..." : "Send Invitation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
