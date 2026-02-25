import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, Bell, Users, Trophy, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const joinRequests = [
  { id: 1, name: "Budi Santoso", initials: "BS", role: "Interaction Designer", skills: ["Figma", "After Effects"], team: "Hackathon UI/UX 2026", time: "1 hour ago", message: "I have 2 years of experience in interaction design and won a design award last year." },
  { id: 2, name: "Lisa Chen", initials: "LC", role: "UX Researcher", skills: ["User Testing", "Analytics"], team: "Hackathon UI/UX 2026", time: "3 hours ago", message: "Passionate about healthcare UX. Currently writing my thesis on patient experience." },
  { id: 3, name: "Ravi Kumar", initials: "RK", role: "Frontend Developer", skills: ["React", "TypeScript"], team: "Web Dev Marathon", time: "5 hours ago", message: "Full-stack developer with experience in React and Node.js. Ready for the marathon!" },
];

const notifications = [
  { id: 1, message: "Your request to join 'AI Chatbot Competition' was accepted!", type: "success", time: "30 min ago" },
  { id: 2, message: "New member joined your team 'Hackathon UI/UX 2026'", type: "info", time: "2 hours ago" },
  { id: 3, message: "Reminder: Competition deadline in 5 days", type: "warning", time: "1 day ago" },
];

export default function Dashboard() {
  const [requests, setRequests] = useState(joinRequests);

  const handleAction = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Manage your teams and requests</p>
      </div>

      <div className="animate-fade-in">
        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Users, label: "Active Teams", value: "3", color: "text-primary" },
            { icon: Bell, label: "Pending Requests", value: String(requests.length), color: "text-secondary" },
            { icon: Trophy, label: "Competitions", value: "5", color: "text-warning" },
            { icon: Clock, label: "Upcoming", value: "2", color: "text-info" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-4">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="requests" className="gap-2">
              <Users className="h-4 w-4" /> Join Requests
              {requests.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  {requests.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            {requests.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No pending requests</p>
              </div>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {req.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{req.name}</p>
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
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => handleAction(req.id)}>
                        <X className="h-4 w-4" /> Decline
                      </Button>
                      <Button size="sm" className="gap-1" onClick={() => handleAction(req.id)}>
                        <Check className="h-4 w-4" /> Approve
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="notifications" className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
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
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* My Teams */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">My Teams</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: "Hackathon UI/UX 2026", members: "2/4", status: "Recruiting" },
              { name: "Web Dev Marathon", members: "4/4", status: "Full" },
              { name: "AI Chatbot Competition", members: "3/4", status: "Recruiting" },
            ].map((team) => (
              <Link key={team.name} to="/explore/1" className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 hover-lift">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <Trophy className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{team.name}</p>
                    <p className="text-xs text-muted-foreground">{team.members} members</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={team.status === "Recruiting" ? "default" : "outline"} className="text-xs">
                    {team.status}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
