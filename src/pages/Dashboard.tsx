import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, Bell, Users, Trophy, Clock, ArrowRight, MessageCircle, UserMinus, Shield, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import MemberProfileDrawer from "@/components/MemberProfileDrawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import confetti from "canvas-confetti";

const initialRequests = [
  { id: 1, name: "Budi Santoso", initials: "BS", role: "Interaction Designer", skills: ["Figma", "After Effects"], team: "Hackathon UI/UX 2026", time: "1 hour ago", message: "I have 2 years of experience in interaction design and won a design award last year.", major: "Visual Communication Design" },
  { id: 2, name: "Lisa Chen", initials: "LC", role: "UX Researcher", skills: ["User Testing", "Analytics"], team: "Hackathon UI/UX 2026", time: "3 hours ago", message: "Passionate about healthcare UX. Currently writing my thesis on patient experience.", major: "Psychology" },
  { id: 3, name: "Ravi Kumar", initials: "RK", role: "Frontend Developer", skills: ["React", "TypeScript"], team: "Web Dev Marathon", time: "5 hours ago", message: "Full-stack developer with experience in React and Node.js. Ready for the marathon!", major: "Computer Science" },
];

const notifications = [
  { id: 1, message: "Your request to join 'AI Chatbot Competition' was accepted!", type: "success", time: "30 min ago" },
  { id: 2, message: "New member joined your team 'Hackathon UI/UX 2026'", type: "info", time: "2 hours ago" },
  { id: 3, message: "Reminder: Competition deadline in 5 days", type: "warning", time: "1 day ago" },
];

const initialTeams = [
  {
    name: "Hackathon UI/UX 2026",
    filled: 2,
    total: 4,
    status: "Recruiting",
    members: [
      { name: "You (Andi Pratama)", initials: "AP", role: "Team Leader", isLeader: true },
      { name: "Sarah Chen", initials: "SC", role: "Member", isLeader: false },
    ],
  },
  {
    name: "Web Dev Marathon",
    filled: 4,
    total: 4,
    status: "Full",
    members: [
      { name: "You (Andi Pratama)", initials: "AP", role: "Team Leader", isLeader: true },
      { name: "John Doe", initials: "JD", role: "Member", isLeader: false },
      { name: "Jane Smith", initials: "JS", role: "Member", isLeader: false },
      { name: "Alex Wong", initials: "AW", role: "Member", isLeader: false },
    ],
  },
  {
    name: "AI Chatbot Competition",
    filled: 3,
    total: 4,
    status: "Recruiting",
    members: [
      { name: "You (Andi Pratama)", initials: "AP", role: "Team Leader", isLeader: true },
      { name: "Maria Garcia", initials: "MG", role: "Member", isLeader: false },
      { name: "Tom Lee", initials: "TL", role: "Member", isLeader: false },
    ],
  },
];

export default function Dashboard() {
  const [requests, setRequests] = useState(initialRequests);
  const [teams, setTeams] = useState(initialTeams);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [removeMember, setRemoveMember] = useState<{ teamName: string; memberName: string } | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const { toast } = useToast();

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
    });
  };

  const handleApprove = (req: typeof initialRequests[0]) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    setTeams((prev) =>
      prev.map((t) =>
        t.name === req.team && t.filled < t.total
          ? {
              ...t,
              filled: t.filled + 1,
              status: t.filled + 1 >= t.total ? "Full" : "Recruiting",
              members: [...t.members, { name: req.name, initials: req.initials, role: "Member", isLeader: false }],
            }
          : t
      )
    );
    fireConfetti();
    toast({
      title: "🎉 Member Successfully Joined!",
      description: `${req.name} has been added to ${req.team}. The coordination group link has now been shared with them.`,
      className: "border-primary/50 bg-accent",
    });
  };

  const handleDecline = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Request Declined", description: "The applicant has been notified." });
  };

  const handleRemoveMember = () => {
    if (!removeMember) return;
    setTeams((prev) =>
      prev.map((t) =>
        t.name === removeMember.teamName
          ? {
              ...t,
              filled: t.filled - 1,
              status: "Recruiting",
              members: t.members.filter((m) => m.name !== removeMember.memberName),
            }
          : t
      )
    );
    toast({ title: "Member Removed", description: `${removeMember.memberName} has been removed from the team.` });
    setRemoveMember(null);
  };

  const handleViewProfile = (req: typeof initialRequests[0]) => {
    setSelectedMember({
      name: req.name,
      initials: req.initials,
      role: req.role,
      major: req.major,
      skills: req.skills,
    });
    setDrawerOpen(true);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Manage your teams and requests</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Users, label: "Active Teams", value: String(teams.length), color: "text-primary" },
            { icon: Bell, label: "Pending Requests", value: String(requests.length), color: "text-secondary" },
            { icon: Trophy, label: "Competitions", value: "5", color: "text-warning" },
            { icon: Clock, label: "Upcoming", value: "2", color: "text-info" },
          ].map((stat) => (
            <motion.div key={stat.label} whileHover={{ scale: 1.03 }} className="rounded-2xl border border-border bg-card p-4">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="requests" className="gap-2">
              <Users className="h-4 w-4" /> Join Requests
              <AnimatePresence>
                {requests.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs"
                  >
                    {requests.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <AnimatePresence mode="popLayout">
              {requests.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-border bg-card p-12 text-center">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 font-medium">No pending requests</p>
                  <p className="mt-1 text-sm text-muted-foreground">You're all caught up! New requests will appear here.</p>
                </motion.div>
              ) : (
                requests.map((req) => (
                  <motion.div
                    key={req.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {req.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleViewProfile(req)} className="font-semibold hover:text-primary transition-colors hover:underline">
                              {req.name}
                            </button>
                            <span className="text-xs text-muted-foreground">· {req.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Wants to join <span className="font-medium text-foreground">{req.team}</span> as {req.role}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground italic">"{req.message}"</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {req.skills.map((skill) => (
                              <span key={skill} className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" variant="outline" className="gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => handleDecline(req.id)}>
                          <X className="h-4 w-4" /> Decline
                        </Button>
                        <Button size="sm" className="gap-1" onClick={() => handleApprove(req)}>
                          <Check className="h-4 w-4" /> Approve
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-3">
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  notif.type === "success" ? "bg-accent text-accent-foreground" :
                  notif.type === "warning" ? "bg-warning/10 text-warning" :
                  "bg-secondary/10 text-secondary"
                }`}>
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{notif.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{notif.time}</p>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>

        {/* My Teams */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">My Teams</h2>
          <div className="grid gap-4">
            {teams.map((team) => (
              <motion.div key={team.name} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setExpandedTeam(expandedTeam === team.name ? null : team.name)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                      <Trophy className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{team.name}</p>
                      <p className="text-xs text-muted-foreground">{team.filled}/{team.total} members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={team.status === "Recruiting" ? "default" : "outline"} className="text-xs">
                      {team.status}
                    </Badge>
                    <ArrowRight className={`h-4 w-4 text-muted-foreground transition-transform ${expandedTeam === team.name ? "rotate-90" : ""}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {expandedTeam === team.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-4 py-3 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Current Members</p>
                        {team.members.map((member) => (
                          <div key={member.name} className="flex items-center justify-between rounded-xl p-2 hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                  {member.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{member.name}</p>
                                <div className="flex items-center gap-1.5">
                                  {member.isLeader ? (
                                    <Badge variant="outline" className="gap-1 text-[10px] h-5 border-primary/30 text-primary">
                                      <Crown className="h-3 w-3" /> Team Leader
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="gap-1 text-[10px] h-5">
                                      <Shield className="h-3 w-3" /> Member
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            {!member.isLeader && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 gap-1 text-xs text-muted-foreground hover:text-destructive"
                                onClick={() => setRemoveMember({ teamName: team.name, memberName: member.name })}
                              >
                                <UserMinus className="h-3 w-3" /> Remove
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <MemberProfileDrawer member={selectedMember} open={drawerOpen} onOpenChange={setDrawerOpen} />

      {/* Remove Member Confirmation */}
      <Dialog open={!!removeMember} onOpenChange={(open) => !open && setRemoveMember(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove <span className="font-semibold text-foreground">{removeMember?.memberName}</span> from <span className="font-semibold text-foreground">{removeMember?.teamName}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveMember(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRemoveMember} className="gap-1">
              <UserMinus className="h-4 w-4" /> Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
