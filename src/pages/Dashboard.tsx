import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Check, X, Bell, Users, Trophy, Clock, ArrowRight, MessageCircle,
  UserMinus, Shield, Crown, Settings, TrendingUp, ExternalLink, Quote
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import MemberProfileDrawer from "@/components/MemberProfileDrawer";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import confetti from "canvas-confetti";
import EditTeamDialog from "@/components/EditTeamDialog";

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

const statsConfig = [
  {
    icon: Users,
    label: "Active Teams",
    trend: "+1 this month",
    bgClass: "bg-info/10",
    iconClass: "text-info",
  },
  {
    icon: Bell,
    label: "Pending Requests",
    trend: "3 awaiting review",
    bgClass: "bg-purple-500/10",
    iconClass: "text-purple-500",
  },
  {
    icon: Trophy,
    label: "Competitions",
    value: "5",
    trend: "+2 new this week",
    bgClass: "bg-warning/10",
    iconClass: "text-warning",
  },
  {
    icon: Clock,
    label: "Upcoming",
    value: "2",
    trend: "Next in 5 days",
    bgClass: "bg-primary/10",
    iconClass: "text-primary",
  },
];

const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export default function Dashboard() {
  const [requests, setRequests] = useState(initialRequests);
  const [teams, setTeams] = useState(initialTeams);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [removeMember, setRemoveMember] = useState<{ teamName: string; memberName: string } | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [editTeam, setEditTeam] = useState<typeof initialTeams[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"requests" | "notifications">("requests");
  const { toast } = useToast();

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#5A8D39", "#6aa343", "#8bc34a", "#a5d66b"],
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
      description: `${req.name} has been added to ${req.team}.`,
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

  const dynamicStats = [
    { ...statsConfig[0], value: String(teams.length) },
    { ...statsConfig[1], value: String(requests.length) },
    { ...statsConfig[2] },
    { ...statsConfig[3] },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Personalized Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold tracking-tight">
          Selamat Datang Kembali, Andi! 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola tim dan pantau perkembangan kompetisi Anda.
        </p>
      </motion.div>

      {/* Glassmorphism Stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {dynamicStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={staggerChild}
            whileHover={{ scale: 1.04, y: -2 }}
            className="glass-card rounded-2xl p-4 hover-glow cursor-default"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bgClass}`}>
              <stat.icon className={`h-4.5 w-4.5 ${stat.iconClass}`} />
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-[11px] font-semibold text-muted-foreground">{stat.label}</p>
            <div className="mt-1.5 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-[10px] text-primary font-medium">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tab Switcher */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-6">
          <div className="relative flex gap-1 rounded-xl bg-muted/60 p-1 w-fit">
            {[
              { key: "requests" as const, label: "Join Requests", icon: Users, count: requests.length },
              { key: "notifications" as const, label: "Notifications", icon: Bell, count: notifications.filter(() => true).length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
                {tab.key === "requests" && requests.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold px-1.5">
                    {requests.length}
                  </span>
                )}
                {tab.key === "notifications" && (
                  <span className="h-2 w-2 rounded-full bg-warning animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Join Requests */}
        {activeTab === "requests" && (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {requests.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card rounded-2xl p-12 text-center"
                >
                  <Users className="mx-auto h-12 w-12 text-muted-foreground/40" />
                  <p className="mt-4 font-semibold">No pending requests</p>
                  <p className="mt-1 text-sm text-muted-foreground">You're all caught up!</p>
                </motion.div>
              ) : (
                requests.map((req, i) => (
                  <motion.div
                    key={req.id}
                    layout
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                    variants={staggerChild}
                    whileHover={{ y: -2 }}
                    className="glass-card rounded-2xl p-5 hover-glow transition-shadow"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                            {req.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              onClick={() => handleViewProfile(req)}
                              className="text-[14px] font-bold hover:text-primary transition-colors hover:underline underline-offset-2"
                            >
                              {req.name}
                            </button>
                            <span className="text-[10px] text-muted-foreground font-medium">{req.time}</span>
                          </div>
                          <p className="text-[12px] text-muted-foreground mt-0.5">
                            Wants to join{" "}
                            <span className="font-semibold text-foreground">{req.team}</span>{" "}
                            as <span className="font-medium text-secondary">{req.role}</span>
                          </p>

                          {/* Quote-style message */}
                          <div className="mt-3 rounded-lg bg-muted/50 border-l-2 border-primary/30 px-3 py-2">
                            <p className="text-[12px] text-muted-foreground italic leading-relaxed">
                              "{req.message}"
                            </p>
                          </div>

                          {/* Skill pills */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {req.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 shrink-0 md:flex-col md:items-end">
                        <Button
                          size="sm"
                          className="gap-1.5 text-[11px] font-bold hover:scale-105 transition-transform btn-press"
                          onClick={() => handleApprove(req)}
                        >
                          <Check className="h-3.5 w-3.5" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-[11px] font-bold text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground hover:scale-105 transition-transform btn-press"
                          onClick={() => handleDecline(req.id)}
                        >
                          <X className="h-3.5 w-3.5" /> Decline
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div className="space-y-3">
            {notifications.map((notif, i) => (
              <motion.div
                key={notif.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={staggerChild}
                className="glass-card flex items-start gap-4 rounded-2xl p-4 hover-glow"
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    notif.type === "success"
                      ? "bg-primary/10 text-primary"
                      : notif.type === "warning"
                      ? "bg-warning/10 text-warning"
                      : "bg-info/10 text-info"
                  }`}
                >
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium">{notif.message}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{notif.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* My Teams Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">MY TEAMS</p>
            <h2 className="text-lg font-bold mt-0.5">Tim Kompetisi Anda</h2>
          </div>
          <Link to="/create">
            <Button size="sm" className="gap-1.5 text-[11px] font-bold hover:scale-105 transition-transform btn-press">
              <Trophy className="h-3.5 w-3.5" /> Buat Tim Baru
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, i) => {
            const progress = (team.filled / team.total) * 100;
            const isRecruiting = team.status === "Recruiting";

            return (
              <motion.div
                key={team.name}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={staggerChild}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl overflow-hidden hover-glow group"
              >
                {/* Top accent bar */}
                <div className={`h-1 w-full ${isRecruiting ? "bg-primary" : "bg-muted-foreground/30"}`} />

                <div className="p-4">
                  {/* Header with actions */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold truncate">{team.name}</p>
                      <Badge
                        variant={isRecruiting ? "default" : "outline"}
                        className={`mt-1.5 text-[10px] font-bold ${
                          isRecruiting
                            ? "bg-primary/15 text-primary border-primary/20 hover:bg-primary/15"
                            : "text-muted-foreground"
                        }`}
                      >
                        {isRecruiting && (
                          <span className="mr-1 h-1.5 w-1.5 rounded-full bg-primary animate-pulse inline-block" />
                        )}
                        {team.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1">
                      <Link to={`/recruitment/${encodeURIComponent(team.name)}`}>
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all opacity-0 group-hover:opacity-100">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                      </Link>
                      <button
                        onClick={() => setEditTeam(team)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Settings className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-semibold text-muted-foreground">Members</span>
                      <span className="text-[11px] font-bold">
                        {team.filled}<span className="text-muted-foreground font-medium">/{team.total}</span>
                      </span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>

                  {/* Member avatars */}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {team.members.slice(0, 4).map((member) => (
                        <Avatar key={member.name} className="h-7 w-7 border-2 border-card">
                          <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-bold">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {team.members.length > 4 && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted border-2 border-card text-[9px] font-bold text-muted-foreground">
                          +{team.members.length - 4}
                        </div>
                      )}
                    </div>

                    <Link to={`/dashboard/team/${encodeURIComponent(team.name)}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-[10px] font-bold hover:scale-105 transition-transform btn-press"
                      >
                        Manage <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Expandable members */}
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
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">
                          CURRENT MEMBERS
                        </p>
                        {team.members.map((member) => (
                          <div key={member.name} className="flex items-center justify-between rounded-xl p-2 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                                  {member.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-[12px] font-semibold">{member.name}</p>
                                <Badge variant="outline" className="gap-1 text-[9px] h-4 mt-0.5">
                                  {member.isLeader ? (
                                    <>
                                      <Crown className="h-2.5 w-2.5 text-primary" /> Leader
                                    </>
                                  ) : (
                                    <>
                                      <Shield className="h-2.5 w-2.5" /> Member
                                    </>
                                  )}
                                </Badge>
                              </div>
                            </div>
                            {!member.isLeader && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 gap-1 text-[10px] text-muted-foreground hover:text-destructive"
                                onClick={() => setRemoveMember({ teamName: team.name, memberName: member.name })}
                              >
                                <UserMinus className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Modals / Drawers */}
      <MemberProfileDrawer member={selectedMember} open={drawerOpen} onOpenChange={setDrawerOpen} />

      {editTeam && (
        <EditTeamDialog
          open={!!editTeam}
          onOpenChange={(open) => !open && setEditTeam(null)}
          team={editTeam}
        />
      )}

      <Dialog open={!!removeMember} onOpenChange={(open) => !open && setRemoveMember(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove{" "}
              <span className="font-semibold text-foreground">{removeMember?.memberName}</span> from{" "}
              <span className="font-semibold text-foreground">{removeMember?.teamName}</span>?
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
