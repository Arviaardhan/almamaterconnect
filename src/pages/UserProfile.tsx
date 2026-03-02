import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Linkedin, Mail, Trophy, Users, FolderKanban, BookOpen, ArrowLeft } from "lucide-react";
import { useState } from "react";
import InviteToTeamModal from "@/components/InviteToTeamModal";
import ContactModal from "@/components/ContactModal";

const mockUsers: Record<number, {
  id: number; name: string; initials: string; institution: string; major: string;
  bio: string; skills: string[]; teamsJoined: number; projectsCompleted: number;
  github: string | null; linkedin: string | null; phone: string | null; email: string;
  teams: { name: string; role: string; status: string }[];
  projects: { name: string; description: string }[];
  competitionHistory: {
    totalParticipated: number;
    wins: number;
    participations: { name: string; year: number; result: "Winner" | "Runner-Up" | "Finalist" | "Participant" }[];
  };
}> = {
  1: { id: 1, name: "Andi Prasetyo", initials: "AP", institution: "Universitas Indonesia", major: "Computer Science", bio: "Full-stack developer passionate about building scalable web applications. Experienced in hackathons and collaborative projects.", skills: ["React", "Node.js", "Python", "TypeScript", "PostgreSQL"], teamsJoined: 4, projectsCompleted: 7, github: "https://github.com", linkedin: "https://linkedin.com", phone: "6281234567890", email: "andi.prasetyo@ui.ac.id", teams: [{ name: "Hackathon UI/UX 2026", role: "Frontend Dev", status: "Active" }, { name: "Web Dev Marathon", role: "Full Stack", status: "Completed" }, { name: "Cloud Innovation Cup", role: "Backend Dev", status: "Completed" }], projects: [{ name: "EduConnect Platform", description: "A peer-to-peer learning platform for university students." }, { name: "GreenRoute App", description: "Sustainable transportation route planner using AI." }], competitionHistory: { totalParticipated: 7, wins: 3, participations: [{ name: "Hackathon Nasional 2025", year: 2025, result: "Winner" }, { name: "Google Solution Challenge", year: 2025, result: "Finalist" }, { name: "Gemastik XVI", year: 2024, result: "Winner" }, { name: "Web Dev Marathon", year: 2024, result: "Runner-Up" }, { name: "Cloud Innovation Cup", year: 2024, result: "Winner" }, { name: "UI/UX Design Sprint", year: 2023, result: "Participant" }, { name: "Startup Weekend Jakarta", year: 2023, result: "Finalist" }] } },
  2: { id: 2, name: "Siti Nurhaliza", initials: "SN", institution: "ITB", major: "Design", bio: "UI/UX designer who transforms complex problems into elegant, user-centered solutions. Figma advocate and design system enthusiast.", skills: ["Figma", "UI/UX", "Flutter", "Adobe XD", "Prototyping"], teamsJoined: 3, projectsCompleted: 5, github: "https://github.com", linkedin: "https://linkedin.com", phone: "6281234567891", email: "siti.nurhaliza@itb.ac.id", teams: [{ name: "Design Sprint Jakarta", role: "Lead Designer", status: "Active" }, { name: "Mobile App Challenge", role: "UI Designer", status: "Completed" }], projects: [{ name: "HealthTrack Redesign", description: "Complete UX overhaul for a health monitoring application." }, { name: "Campus Navigator", description: "Wayfinding app design for ITB campus." }], competitionHistory: { totalParticipated: 5, wins: 2, participations: [{ name: "Design Sprint Jakarta 2025", year: 2025, result: "Winner" }, { name: "Mobile App Challenge", year: 2024, result: "Winner" }, { name: "UXplore Indonesia", year: 2024, result: "Finalist" }, { name: "Figma Config Jam", year: 2023, result: "Runner-Up" }, { name: "Creative Design Award", year: 2023, result: "Participant" }] } },
  3: { id: 3, name: "Reza Firmansyah", initials: "RF", institution: "UGM", major: "Data Science", bio: "Data scientist and ML engineer focused on NLP and computer vision. Published researcher in AI applications for education.", skills: ["Python", "TensorFlow", "Data Science", "R", "SQL"], teamsJoined: 2, projectsCompleted: 3, github: "https://github.com", linkedin: null, phone: null, email: "reza.firmansyah@ugm.ac.id", teams: [{ name: "AI Innovation Challenge", role: "ML Engineer", status: "Active" }], projects: [{ name: "SentimentID", description: "Bahasa Indonesia sentiment analysis model for social media." }], competitionHistory: { totalParticipated: 3, wins: 1, participations: [{ name: "AI Innovation Challenge 2025", year: 2025, result: "Winner" }, { name: "Data Science Bowl", year: 2024, result: "Finalist" }, { name: "Kaggle Days Jakarta", year: 2024, result: "Participant" }] } },
  4: { id: 4, name: "Maya Putri", initials: "MP", institution: "Binus University", major: "Information Systems", bio: "Software engineer with a passion for enterprise-grade web apps. Active open-source contributor and community organizer.", skills: ["Laravel", "Java", "React", "Docker", "MySQL"], teamsJoined: 5, projectsCompleted: 9, github: "https://github.com", linkedin: "https://linkedin.com", phone: "6281234567893", email: "maya.putri@binus.ac.id", teams: [{ name: "Code for Good", role: "Team Lead", status: "Active" }, { name: "Enterprise Hack", role: "Backend Dev", status: "Completed" }, { name: "Startup Weekend", role: "Full Stack", status: "Completed" }], projects: [{ name: "SME Dashboard", description: "Business analytics dashboard for small enterprises." }, { name: "EventHub", description: "Campus event management platform." }], competitionHistory: { totalParticipated: 9, wins: 4, participations: [{ name: "Code for Good 2025", year: 2025, result: "Winner" }, { name: "Enterprise Hack", year: 2025, result: "Winner" }, { name: "Startup Weekend Jakarta", year: 2024, result: "Runner-Up" }, { name: "Hackathon Merdeka", year: 2024, result: "Winner" }, { name: "Compfest XIV", year: 2024, result: "Finalist" }, { name: "BizIT Challenge", year: 2023, result: "Winner" }, { name: "Code Jam Indonesia", year: 2023, result: "Participant" }, { name: "DevFest 2023", year: 2023, result: "Finalist" }, { name: "Tech in Asia Hack", year: 2022, result: "Participant" }] } },
  5: { id: 5, name: "Dimas Saputra", initials: "DS", institution: "ITS", major: "Electrical Engineering", bio: "IoT and embedded systems developer exploring the intersection of hardware and cloud computing.", skills: ["Python", "Go", "TensorFlow", "C++", "AWS"], teamsJoined: 1, projectsCompleted: 2, github: null, linkedin: "https://linkedin.com", phone: "6281234567894", email: "dimas.saputra@its.ac.id", teams: [{ name: "IoT Smart Campus", role: "Hardware Lead", status: "Active" }], projects: [{ name: "SmartGrid Monitor", description: "Real-time energy monitoring system using IoT sensors." }], competitionHistory: { totalParticipated: 2, wins: 0, participations: [{ name: "IoT Smart Campus 2025", year: 2025, result: "Participant" }, { name: "Embedded Systems Challenge", year: 2024, result: "Finalist" }] } },
  6: { id: 6, name: "Lina Kartika", initials: "LK", institution: "Telkom University", major: "Business IT", bio: "Product-minded designer bridging business strategy with beautiful user experiences.", skills: ["Figma", "UI/UX", "Swift", "Product Strategy"], teamsJoined: 3, projectsCompleted: 4, github: "https://github.com", linkedin: "https://linkedin.com", phone: null, email: "lina.kartika@telkomuniversity.ac.id", teams: [{ name: "Product Design Sprint", role: "Product Designer", status: "Active" }, { name: "iOS Dev Challenge", role: "Designer", status: "Completed" }], projects: [{ name: "FinLit App", description: "Financial literacy app for Gen Z users." }], competitionHistory: { totalParticipated: 4, wins: 1, participations: [{ name: "iOS Dev Challenge 2024", year: 2024, result: "Winner" }, { name: "Product Design Sprint", year: 2024, result: "Runner-Up" }, { name: "Apple Swift Student Challenge", year: 2023, result: "Finalist" }, { name: "UX Design Awards", year: 2023, result: "Participant" }] } },
  7: { id: 7, name: "Bayu Ardianto", initials: "BA", institution: "Universitas Indonesia", major: "Computer Science", bio: "Prolific hackathon competitor and mobile developer. Loves building cross-platform apps with Flutter and React Native.", skills: ["React", "Flutter", "Node.js", "Firebase", "GraphQL"], teamsJoined: 6, projectsCompleted: 11, github: "https://github.com", linkedin: "https://linkedin.com", phone: "6281234567896", email: "bayu.ardianto@ui.ac.id", teams: [{ name: "Hackathon UI/UX 2026", role: "Mobile Dev", status: "Active" }, { name: "Flutter Fest", role: "Lead Dev", status: "Completed" }, { name: "React Challenge", role: "Frontend Dev", status: "Completed" }], projects: [{ name: "StudyBuddy", description: "Collaborative study group matching app." }, { name: "QuickPoll", description: "Real-time polling and voting platform." }, { name: "CampusMart", description: "Student marketplace for second-hand goods." }], competitionHistory: { totalParticipated: 11, wins: 5, participations: [{ name: "Flutter Fest 2025", year: 2025, result: "Winner" }, { name: "React Challenge 2025", year: 2025, result: "Winner" }, { name: "Google Solution Challenge", year: 2024, result: "Runner-Up" }, { name: "Hackathon Merdeka", year: 2024, result: "Winner" }, { name: "Compfest XV", year: 2024, result: "Winner" }, { name: "Dev Summit Hack", year: 2023, result: "Finalist" }, { name: "Mobile App Challenge", year: 2023, result: "Winner" }] } },
  8: { id: 8, name: "Citra Dewi", initials: "CD", institution: "ITB", major: "Design", bio: "Visual storyteller and interaction designer. Specializes in design systems and accessibility.", skills: ["Figma", "UI/UX", "React", "Accessibility", "Motion Design"], teamsJoined: 2, projectsCompleted: 3, github: "https://github.com", linkedin: null, phone: "6281234567897", email: "citra.dewi@itb.ac.id", teams: [{ name: "Design Systems Jam", role: "Lead Designer", status: "Active" }], projects: [{ name: "AccessiLearn", description: "Accessible e-learning platform for visually impaired students." }], competitionHistory: { totalParticipated: 3, wins: 1, participations: [{ name: "Design Systems Jam 2025", year: 2025, result: "Winner" }, { name: "A11y Design Challenge", year: 2024, result: "Runner-Up" }, { name: "Creative Code Fest", year: 2024, result: "Participant" }] } },
};

export default function UserProfile() {
  const { id } = useParams();
  const user = mockUsers[Number(id)];
  const [inviteOpen, setInviteOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">User not found</h1>
        <p className="text-muted-foreground mt-2">This profile doesn't exist.</p>
        <Button variant="outline" className="mt-6" asChild>
          <Link to="/discover-users"><ArrowLeft className="h-4 w-4 mr-2" />Back to Discover</Link>
        </Button>
      </div>
    );
  }

  const inviteTarget = { id: user.id, name: user.name, initials: user.initials, skills: user.skills };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="animate-fade-in">
        {/* Back link */}
        <Link to="/discover-users" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Discover Talent
        </Link>

        {/* Profile Header */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-5">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-2 ring-border">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                <Badge variant="secondary" className="mt-1">{user.institution}</Badge>
                <p className="text-sm text-muted-foreground mt-1">{user.major}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => setContactOpen(true)}>
                <Mail className="h-4 w-4 mr-1.5" />Contact
              </Button>
              <Button size="sm" onClick={() => setInviteOpen(true)}>
                <Users className="h-4 w-4 mr-1.5" />Invite to Team
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-muted/50 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{user.teamsJoined}</p>
              <p className="text-xs text-muted-foreground">Teams Joined</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{user.projectsCompleted}</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{user.teams.filter(t => t.status === "Active").length}</p>
              <p className="text-xs text-muted-foreground">Active Teams</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-3 text-foreground">About</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
              <div className="flex gap-3 mt-4">
                {user.github && (
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                )}
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                <BookOpen className="h-5 w-5 text-primary" /> Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">{skill}</Badge>
                ))}
              </div>
            </div>

            {/* Teams */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5 text-primary" /> Teams Joined
              </h2>
              <div className="space-y-3">
                {user.teams.map(team => (
                  <div key={team.name} className="flex items-center justify-between rounded-xl border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                        <Trophy className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{team.name}</p>
                        <p className="text-xs text-muted-foreground">{team.role}</p>
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

          {/* Right Column - Projects */}
          <div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                <FolderKanban className="h-5 w-5 text-primary" /> Projects
              </h2>
              <div className="space-y-3">
                {user.projects.map(project => (
                  <Card key={project.name} className="hover-lift">
                    <CardContent className="p-4">
                      <p className="font-medium text-sm text-foreground">{project.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <InviteToTeamModal
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        targetUser={inviteTarget}
      />
      <ContactModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        user={{ name: user.name, phone: user.phone, email: user.email }}
      />
    </div>
  );
}
