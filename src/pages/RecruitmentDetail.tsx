import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Calendar, MapPin, ExternalLink, UserPlus, CheckCircle2, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockDetail = {
  id: "1",
  title: "Hackathon UI/UX 2026",
  category: "Design",
  campus: "Universitas Indonesia",
  deadline: "March 15, 2026",
  competitionLink: "https://hackathon-uiux.id",
  description: `We're building a healthcare app prototype for the national UI/UX Hackathon 2026. Our goal is to create an intuitive patient management system that helps rural clinics digitize their workflow.\n\nWe're looking for passionate designers and researchers who want to make a real impact. The competition spans 3 days and the top teams win funding for development.`,
  goals: [
    "Create a high-fidelity prototype in Figma",
    "Conduct user research with 5+ healthcare workers",
    "Present a compelling pitch to judges",
  ],
  members: [
    { name: "Andi Pratama", role: "Team Lead / UX Researcher", initials: "AP" },
    { name: "Sarah Chen", role: "Visual Designer", initials: "SC" },
  ],
  openRoles: [
    { role: "Interaction Designer", skills: ["Figma", "Prototyping", "Animation"], description: "Create micro-interactions and flow transitions" },
    { role: "UX Researcher", skills: ["User Testing", "Survey Design", "Data Analysis"], description: "Conduct user interviews and synthesize findings" },
  ],
  slots: "2/4",
  posted: "2 hours ago",
};

export default function RecruitmentDetail() {
  const { id } = useParams();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link to="/explore" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>

      <div className="animate-fade-in">
        {/* Header */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">{mockDetail.category}</Badge>
                <Badge className="bg-accent text-accent-foreground border-0">
                  <Users className="mr-1 h-3 w-3" /> {mockDetail.slots} members
                </Badge>
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
              <Button size="sm" className="gap-2 shadow-lg shadow-primary/25">
                <UserPlus className="h-4 w-4" /> Join Team
              </Button>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">About This Project</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{mockDetail.description}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Team Goals</h2>
              <ul className="space-y-3">
                {mockDetail.goals.map((goal) => (
                  <li key={goal} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Current Team</h2>
              <div className="space-y-4">
                {mockDetail.members.map((member) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
      </div>
    </div>
  );
}
