import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Calendar, MapPin, ExternalLink, UserPlus, CheckCircle2, Clock, MessageCircle, Loader2, Crown, Shield, Trophy, Award, BookOpen, FileText, Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import MemberProfileDrawer from "@/components/MemberProfileDrawer";
import JoinTeamModal from "@/components/JoinTeamModal";
import { useToast } from "@/hooks/use-toast";

const mockDetail = {
  id: "1",
  title: "Hackathon UI/UX 2026",
  category: "Design",
  campus: "Universitas Indonesia",
  deadline: "March 15, 2026",
  competitionLink: "https://hackathon-uiux.id",
  whatsappLink: "https://chat.whatsapp.com/example-invite-link",
  description: `We're building a healthcare app prototype for the national UI/UX Hackathon 2026. Our goal is to create an intuitive patient management system that helps rural clinics digitize their workflow.\n\nWe're looking for passionate designers and researchers who want to make a real impact. The competition spans 3 days and the top teams win funding for development.`,
  goals: [
    "Create a high-fidelity prototype in Figma",
    "Conduct user research with 5+ healthcare workers",
    "Present a compelling pitch to judges",
  ],
  members: [
    { name: "Andi Pratama", role: "Team Lead / UX Researcher", initials: "AP", major: "Information Systems", skills: ["UX Research", "Figma", "Design Thinking"], portfolio: "https://andipratama.design", isLeader: true },
    { name: "Sarah Chen", role: "Visual Designer", initials: "SC", major: "Visual Communication Design", skills: ["Figma", "Illustration", "Branding"], portfolio: "https://sarahchen.co", isLeader: false },
  ],
  openRoles: [
    { role: "Interaction Designer", skills: ["Figma", "Prototyping", "Animation"], description: "Create micro-interactions and flow transitions" },
    { role: "UX Researcher", skills: ["User Testing", "Survey Design", "Data Analysis"], description: "Conduct user interviews and synthesize findings" },
  ],
  slots: "2/4",
  posted: "2 hours ago",
  achievements: [
    { competition: "UI/UX Design Sprint 2025", result: "Winner", year: 2025, roster: [{ name: "Andi Pratama", initials: "AP" }, { name: "Sarah Chen", initials: "SC" }, { name: "Budi Santoso", initials: "BS" }] },
    { competition: "Campus Design Challenge", result: "Runner-Up", year: 2024, roster: [{ name: "Andi Pratama", initials: "AP" }, { name: "Rina Dewi", initials: "RD" }] },
  ],
  memberWins: { "Andi Pratama": 3, "Sarah Chen": 2 },
  resourceLink: "https://drive.google.com/example-guidebook",
  resources: [
    { name: "Competition Rulebook 2026.pdf", type: "pdf", url: "#" },
    { name: "Design System Guidelines", type: "link", url: "https://designsystem.guide" },
    { name: "Research Template.docx", type: "doc", url: "#" },
  ],
};

export default function RecruitmentDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState<typeof mockDetail.members[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<"idle" | "pending" | "joined">("idle");
  const isMember = applicationStatus === "joined";

  const handleMemberClick = (member: typeof mockDetail.members[0]) => {
    setSelectedMember(member);
    setDrawerOpen(true);
  };

  const handleJoinSubmit = (message: string) => {
    setJoinModalOpen(false);
    setApplicationStatus("pending");
    toast({
      title: "✅ Application Sent!",
      description: "The team leader has been notified. Good luck!",
      className: "border-primary/50 bg-accent",
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link to="/explore" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Header */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">{mockDetail.category}</Badge>
                <Badge className="bg-accent text-accent-foreground border-0">
                  <Users className="mr-1 h-3 w-3" /> {mockDetail.slots} members
                </Badge>
                {applicationStatus === "joined" && (
                  <Badge className="bg-primary text-primary-foreground border-0 gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Joined
                  </Badge>
                )}
                {applicationStatus === "pending" && (
                  <Badge variant="secondary" className="gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" /> Pending
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold md:text-3xl">{mockDetail.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{mockDetail.campus}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Deadline: {mockDetail.deadline}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />Posted {mockDetail.posted}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <a href={mockDetail.competitionLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> Competition Link
                </Button>
              </a>
              {applicationStatus === "pending" ? (
                <Button size="sm" disabled className="gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Pending Approval
                </Button>
              ) : applicationStatus === "joined" ? (
                <Button size="sm" disabled className="gap-2 bg-primary/80">
                  <CheckCircle2 className="h-4 w-4" /> Joined
                </Button>
              ) : (
                <Button size="sm" className="gap-2 shadow-lg shadow-primary/25" onClick={() => setJoinModalOpen(true)}>
                  <UserPlus className="h-4 w-4" /> Join Team
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">About This Project</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{mockDetail.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Team Goals</h2>
              <ul className="space-y-3">
                {mockDetail.goals.map((goal) => (
                  <li key={goal} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{goal}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Open Roles</h2>
              <div className="space-y-4">
                {mockDetail.openRoles.map((role) => (
                  <div key={role.role} className="rounded-xl border border-border p-4">
                    <h3 className="font-medium">{role.role}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {role.skills.map((skill) => (
                        <span key={skill} className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact section - only visible to approved members */}
            {isMember && mockDetail.whatsappLink && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-primary/30 bg-accent/50 p-6">
                <h2 className="text-lg font-semibold mb-3">Team Communication</h2>
                <p className="text-sm text-muted-foreground mb-4">You're part of this team! Connect with your teammates.</p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    className="gap-2 text-white"
                    style={{ backgroundColor: "#25D366" }}
                    onClick={() => window.open(mockDetail.whatsappLink, "_blank")}
                  >
                    <MessageCircle className="h-4 w-4" /> Contact via WhatsApp
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Team Achievements */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-lime" /> Team Achievements
              </h2>

              {/* Lineup Strength */}
              {(() => {
                const totalMemberWins = Object.values(mockDetail.memberWins).reduce((sum, w) => sum + w, 0);
                return (
                  <div className="rounded-xl border border-lime/30 bg-lime/5 p-4 mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-lime" />
                        <span className="text-sm font-semibold text-foreground">Lineup Strength</span>
                      </div>
                      <span className="text-2xl font-bold text-lime">{totalMemberWins}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Combined wins from all current active members</p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      {Object.entries(mockDetail.memberWins).map(([name, wins]) => (
                        <div key={name} className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="bg-primary/10 text-primary text-[8px] font-bold">
                              {name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium text-foreground">{name.split(" ")[0]}</span>
                          <Badge className="bg-lime/15 text-lime border-0 text-[10px] h-4 px-1.5">{wins}W</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {mockDetail.achievements.length > 0 ? (
                <div className="space-y-3">
                  {mockDetail.achievements.map((a) => (
                    <div key={a.competition} className="rounded-xl border border-border p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime/10">
                            <Award className="h-4 w-4 text-lime" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{a.competition}</p>
                            <p className="text-xs text-muted-foreground">{a.year}</p>
                          </div>
                        </div>
                        <Badge className={
                          a.result === "Winner"
                            ? "bg-lime text-lime-foreground border-0 font-bold text-xs"
                            : "bg-warning/15 text-warning border-warning/30 text-xs"
                        }>
                          {a.result === "Winner" && <Award className="h-3 w-3 mr-1" />}
                          {a.result}
                        </Badge>
                      </div>
                      {/* Roster */}
                      <div className="mt-2.5 flex items-center gap-1.5 pl-12">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider mr-1">Roster:</span>
                        <div className="flex -space-x-1.5">
                          {a.roster.map((m) => (
                            <Avatar key={m.initials} className="h-6 w-6 ring-2 ring-card">
                              <AvatarFallback className="bg-primary/10 text-primary text-[8px] font-bold">
                                {m.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">
                          {a.roster.map(m => m.name.split(" ")[0]).join(", ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No achievements yet. Compete and win!</p>
              )}
            </motion.div>

            {/* Competition Resources Card */}
            {mockDetail.resourceLink && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="rounded-2xl border-2 border-lime/40 bg-card p-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-lime" /> Competition Resources
                </h2>
                <p className="text-sm text-muted-foreground mb-4">Access the official guidebook and competition rules shared by the team leader.</p>
                <a href={mockDetail.resourceLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full gap-3 h-14 text-base border-lime/40 hover:bg-lime/10 hover:border-lime">
                    <ExternalLink className="h-5 w-5 text-lime" />
                    Open Guidebook
                  </Button>
                </a>
              </motion.div>
            )}

            {/* Additional Resources / Guides */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-lime/30 bg-card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-lime" /> Resources & Guides
              </h2>
              <div className="space-y-2.5">
                {mockDetail.resources.map((res) => (
                  <a
                    key={res.name}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-muted/50 hover:border-lime/30 group"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime/10 group-hover:bg-lime/20 transition-colors">
                      {res.type === "pdf" ? <FileText className="h-4 w-4 text-lime" /> : res.type === "doc" ? <FileText className="h-4 w-4 text-lime" /> : <BookOpen className="h-4 w-4 text-lime" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{res.name}</p>
                      <p className="text-xs text-muted-foreground uppercase">{res.type}</p>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground group-hover:text-lime transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Current Team</h2>
              <div className="space-y-4">
                {mockDetail.members.map((member) => (
                  <button
                    key={member.name}
                    onClick={() => handleMemberClick(member)}
                    className="flex w-full items-center gap-3 rounded-xl p-2 -m-2 text-left transition-colors hover:bg-muted"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
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
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-3">Quick Info</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Team Size</dt>
                  <dd className="font-medium">{mockDetail.slots} filled</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium">{mockDetail.category}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Campus</dt>
                  <dd className="font-medium">{mockDetail.campus}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </motion.div>

      <MemberProfileDrawer member={selectedMember} open={drawerOpen} onOpenChange={setDrawerOpen} />
      <JoinTeamModal open={joinModalOpen} onOpenChange={setJoinModalOpen} teamName={mockDetail.title} onSubmit={handleJoinSubmit} />
    </div>
  );
}
