import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, Calendar, Users, Trophy, Search, Filter,
  GripVertical, Check, X, UserMinus, ChevronDown, Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import TeamOverviewCard from "@/components/team-management/TeamOverviewCard";
import RoleCard from "@/components/team-management/RoleCard";
import JoinRequestCard from "@/components/team-management/JoinRequestCard";
import EditRoleDialog from "@/components/team-management/EditRoleDialog";
import MemberProfileDrawer from "@/components/MemberProfileDrawer";

interface Skill {
  name: string;
}

interface Role {
  id: string;
  name: string;
  skills: string[];
  filled: number;
  max: number;
  members: TeamMember[];
}

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  skills: string[];
  avatar?: string;
}

interface JoinRequest {
  id: string;
  name: string;
  initials: string;
  skills: string[];
  bio: string;
  status: "pending" | "accepted" | "rejected";
  appliedRole: string;
  appliedAt: string;
  major: string;
}

const initialTeamData = {
  name: "Hackathon UI/UX 2026",
  competition: "National Design Hackathon",
  category: "UI/UX Design",
  deadline: "2026-04-15",
  totalMembers: 5,
  maxMembers: 8,
};

const initialRoles: Role[] = [
  {
    id: "r1",
    name: "Frontend Developer",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    filled: 2,
    max: 3,
    members: [
      { id: "m1", name: "Sarah Chen", initials: "SC", role: "Frontend Developer", skills: ["React", "TypeScript"] },
      { id: "m2", name: "Alex Wong", initials: "AW", role: "Frontend Developer", skills: ["React", "Tailwind CSS"] },
    ],
  },
  {
    id: "r2",
    name: "UI/UX Designer",
    skills: ["Figma", "User Research", "Prototyping"],
    filled: 1,
    max: 2,
    members: [
      { id: "m3", name: "Maria Garcia", initials: "MG", role: "UI/UX Designer", skills: ["Figma", "Prototyping"] },
    ],
  },
  {
    id: "r3",
    name: "Backend Developer",
    skills: ["Node.js", "PostgreSQL", "REST API"],
    filled: 1,
    max: 2,
    members: [
      { id: "m4", name: "Tom Lee", initials: "TL", role: "Backend Developer", skills: ["Node.js", "PostgreSQL"] },
    ],
  },
  {
    id: "r4",
    name: "Project Manager",
    skills: ["Agile", "Communication", "Planning"],
    filled: 1,
    max: 1,
    members: [
      { id: "m5", name: "You (Andi Pratama)", initials: "AP", role: "Project Manager", skills: ["Agile", "Planning"] },
    ],
  },
];

const initialRequests: JoinRequest[] = [
  { id: "jr1", name: "Budi Santoso", initials: "BS", skills: ["React", "Next.js", "TypeScript"], bio: "2 years of frontend experience. Won Google DSC hackathon 2025.", status: "pending", appliedRole: "Frontend Developer", appliedAt: "2 hours ago", major: "Computer Science" },
  { id: "jr2", name: "Lisa Chen", initials: "LC", skills: ["Figma", "Adobe XD", "User Research"], bio: "Passionate about healthcare UX. Currently writing my thesis on patient experience.", status: "pending", appliedRole: "UI/UX Designer", appliedAt: "5 hours ago", major: "Visual Communication Design" },
  { id: "jr3", name: "Ravi Kumar", initials: "RK", skills: ["Node.js", "MongoDB", "Docker"], bio: "Full-stack developer with backend focus. Contributed to 3 open source projects.", status: "pending", appliedRole: "Backend Developer", appliedAt: "1 day ago", major: "Information Systems" },
  { id: "jr4", name: "Dewi Lestari", initials: "DL", skills: ["React", "Vue.js", "CSS"], bio: "Frontend enthusiast. Built 5+ web apps during internship at Tokopedia.", status: "pending", appliedRole: "Frontend Developer", appliedAt: "1 day ago", major: "Computer Science" },
  { id: "jr5", name: "James Park", initials: "JP", skills: ["Figma", "Sketch", "Motion Design"], bio: "Design lead at university club. Specializes in micro-interactions.", status: "pending", appliedRole: "UI/UX Designer", appliedAt: "2 days ago", major: "Digital Media" },
];

export default function TeamManagement() {
  const { teamId } = useParams();
  const { toast } = useToast();
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [requests, setRequests] = useState<JoinRequest[]>(initialRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState<string | null>(null);
  const [draggedRequest, setDraggedRequest] = useState<string | null>(null);
  const [dragOverRole, setDragOverRole] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const allSkills = Array.from(new Set(requests.flatMap((r) => r.skills)));
  const pendingRequests = requests.filter((r) => r.status === "pending");

  const filteredRequests = pendingRequests.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = !skillFilter || r.skills.includes(skillFilter);
    return matchesSearch && matchesSkill;
  });

  const totalFilled = roles.reduce((sum, r) => sum + r.filled, 0);
  const totalMax = roles.reduce((sum, r) => sum + r.max, 0);

  const fireConfetti = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ["#5A8D39", "#6aa343", "#8bc34a", "#a5d66b"] });
  };

  const handleAccept = (req: JoinRequest) => {
    const targetRole = roles.find((r) => r.name === req.appliedRole);
    if (targetRole && targetRole.filled >= targetRole.max) {
      toast({ title: "Role is full", description: `No available slots for ${req.appliedRole}.`, variant: "destructive" });
      return;
    }
    assignToRole(req.id, req.appliedRole);
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r)));
    toast({ title: "Request Rejected", description: "The applicant has been notified." });
  };

  const assignToRole = (requestId: string, roleName: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    const targetRole = roles.find((r) => r.name === roleName);
    if (!targetRole) return;

    if (targetRole.filled >= targetRole.max) {
      toast({ title: "Role is full!", description: `Cannot assign to ${roleName}. All slots are filled.`, variant: "destructive" });
      return;
    }

    setRoles((prev) =>
      prev.map((r) =>
        r.name === roleName
          ? {
              ...r,
              filled: r.filled + 1,
              members: [...r.members, { id: req.id, name: req.name, initials: req.initials, role: roleName, skills: req.skills }],
            }
          : r
      )
    );
    setRequests((prev) => prev.map((r) => (r.id === requestId ? { ...r, status: "accepted" as const } : r)));
    fireConfetti();
    toast({
      title: "🎉 Member Assigned!",
      description: `${req.name} has been assigned as ${roleName}.`,
      className: "border-primary/50 bg-accent",
    });
  };

  const handleDragStart = (requestId: string) => {
    setDraggedRequest(requestId);
  };

  const handleDragOver = (e: React.DragEvent, roleId: string) => {
    e.preventDefault();
    setDragOverRole(roleId);
  };

  const handleDragLeave = () => {
    setDragOverRole(null);
  };

  const handleDrop = (e: React.DragEvent, roleName: string) => {
    e.preventDefault();
    setDragOverRole(null);
    if (draggedRequest) {
      assignToRole(draggedRequest, roleName);
      setDraggedRequest(null);
    }
  };

  const handleRemoveMember = (roleId: string, memberId: string) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId
          ? { ...r, filled: r.filled - 1, members: r.members.filter((m) => m.id !== memberId) }
          : r
      )
    );
    toast({ title: "Member Removed", description: "The member has been removed from the role." });
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== roleId));
    toast({ title: "Role Deleted", description: "The role has been removed from the team." });
  };

  const handleSaveRole = (updatedRole: Role) => {
    setRoles((prev) => prev.map((r) => (r.id === updatedRole.id ? updatedRole : r)));
    setEditRole(null);
    toast({ title: "Role Updated", description: `${updatedRole.name} has been updated.` });
  };

  const handleAddRole = () => {
    const newRole: Role = {
      id: `r${Date.now()}`,
      name: "New Role",
      skills: [],
      filled: 0,
      max: 2,
      members: [],
    };
    setRoles((prev) => [...prev, newRole]);
    setEditRole(newRole);
  };

  const handleViewMember = (member: TeamMember) => {
    setSelectedMember({
      name: member.name,
      initials: member.initials,
      role: member.role,
      skills: member.skills,
      major: "Computer Science",
    });
    setDrawerOpen(true);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon" className="h-9 w-9 hover:scale-105 transition-transform">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">TEAM MANAGEMENT</p>
          <h1 className="text-xl font-bold">{initialTeamData.name}</h1>
        </div>
      </div>

      {/* Team Overview */}
      <TeamOverviewCard team={initialTeamData} totalFilled={totalFilled} totalMax={totalMax} roles={roles} />

      {/* Main Grid: Roles + Requests */}
      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Left: Role Management + Members */}
        <div className="lg:col-span-3 space-y-6">
          {/* Section Label */}
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">ROLE MANAGEMENT</p>
            <Button size="sm" variant="outline" className="gap-1.5 text-xs hover:scale-105 transition-transform" onClick={handleAddRole}>
              <Plus className="h-3.5 w-3.5" /> Add Role
            </Button>
          </div>

          {/* Roles */}
          {roles.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <Trophy className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-3 text-[13px] font-semibold">Create your first role</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Define roles for your team to start recruiting.</p>
              <Button size="sm" className="mt-4 gap-1.5" onClick={handleAddRole}>
                <Plus className="h-3.5 w-3.5" /> Add Role
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {roles.map((role) => (
                  <RoleCard
                    key={role.id}
                    role={role}
                    isDragOver={dragOverRole === role.id}
                    onDragOver={(e) => handleDragOver(e, role.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, role.name)}
                    onEdit={() => setEditRole(role)}
                    onDelete={() => handleDeleteRole(role.id)}
                    onRemoveMember={(memberId) => handleRemoveMember(role.id, memberId)}
                    onViewMember={handleViewMember}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Right: Join Requests */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            JOIN REQUESTS
            {pendingRequests.length > 0 && (
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                {pendingRequests.length}
              </span>
            )}
          </p>

          {/* Search & Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9 text-[13px]"
              />
            </div>
          </div>

          {/* Skill Filter Chips */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSkillFilter(null)}
              className={`rounded-md px-2.5 py-1 text-[10px] font-semibold transition-all hover:scale-105 ${
                !skillFilter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All
            </button>
            {allSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => setSkillFilter(skillFilter === skill ? null : skill)}
                className={`rounded-md px-2.5 py-1 text-[10px] font-semibold transition-all hover:scale-105 ${
                  skillFilter === skill ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Request Cards */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            <AnimatePresence mode="popLayout">
              {filteredRequests.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                  <Users className="mx-auto h-10 w-10 text-muted-foreground/40" />
                  <p className="mt-3 text-[13px] font-semibold">No pending requests</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">New join requests will appear here.</p>
                </motion.div>
              ) : (
                filteredRequests.map((req) => (
                  <JoinRequestCard
                    key={req.id}
                    request={req}
                    onAccept={() => handleAccept(req)}
                    onReject={() => handleReject(req.id)}
                    onDragStart={() => handleDragStart(req.id)}
                    isDragging={draggedRequest === req.id}
                  />
                ))
              )}
            </AnimatePresence>
          </div>

          {pendingRequests.length > 0 && (
            <p className="text-[10px] text-muted-foreground text-center italic">
              💡 Drag a request card onto a role to assign instantly
            </p>
          )}
        </div>
      </div>

      {/* Edit Role Dialog */}
      {editRole && (
        <EditRoleDialog
          open={!!editRole}
          onOpenChange={(open) => !open && setEditRole(null)}
          role={editRole}
          onSave={handleSaveRole}
        />
      )}

      {/* Member Profile Drawer */}
      <MemberProfileDrawer member={selectedMember} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}
