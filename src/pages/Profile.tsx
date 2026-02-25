import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit, ExternalLink, Github, Linkedin, Globe, Trophy, Users, BookOpen } from "lucide-react";

const profile = {
  name: "Andi Pratama",
  initials: "AP",
  campus: "Universitas Indonesia",
  major: "Computer Science",
  bio: "Passionate UI/UX designer and front-end developer. Love building products that solve real problems. 3x hackathon winner.",
  skills: ["React", "TypeScript", "Figma", "User Research", "Node.js", "Python", "Tailwind CSS", "Firebase"],
  portfolio: [
    { label: "GitHub", url: "https://github.com", icon: Github },
    { label: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
    { label: "Portfolio", url: "https://portfolio.dev", icon: Globe },
  ],
  teams: [
    { name: "Hackathon UI/UX 2026", role: "Team Lead", status: "Active", category: "Design" },
    { name: "Web Dev Marathon", role: "Frontend Dev", status: "Completed", category: "Web" },
    { name: "Startup Weekend Jakarta", role: "Product", status: "Completed", category: "Business" },
  ],
  stats: { competitions: 8, wins: 3, teams: 5 },
};

export default function Profile() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="animate-fade-in">
        {/* Profile Header */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-5">
              <Avatar className="h-20 w-20 md:h-24 md:w-24">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="mt-1 text-muted-foreground">{profile.major}</p>
                <p className="text-sm text-muted-foreground">{profile.campus}</p>
                <p className="mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2 shrink-0">
              <Edit className="h-4 w-4" /> Edit Profile
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-muted/50 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{profile.stats.competitions}</p>
              <p className="text-xs text-muted-foreground">Competitions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{profile.stats.wins}</p>
              <p className="text-xs text-muted-foreground">Wins</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{profile.stats.teams}</p>
              <p className="text-xs text-muted-foreground">Teams</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* Skills */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Teams */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Teams & Projects
              </h2>
              <div className="space-y-3">
                {profile.teams.map((team) => (
                  <div key={team.name} className="flex items-center justify-between rounded-xl border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                        <Trophy className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{team.name}</p>
                        <p className="text-xs text-muted-foreground">{team.role} · {team.category}</p>
                      </div>
                    </div>
                    <Badge variant={team.status === "Active" ? "default" : "outline"} className="text-xs">
                      {team.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Links */}
          <div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Portfolio Links</h2>
              <div className="space-y-3">
                {profile.portfolio.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <link.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="flex-1 text-sm font-medium">{link.label}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
