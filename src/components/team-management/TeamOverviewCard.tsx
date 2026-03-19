import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Role {
  id: string;
  name: string;
  filled: number;
  max: number;
}

interface TeamOverviewCardProps {
  team: {
    name: string;
    competition: string;
    category: string;
    deadline: string;
  };
  totalFilled: number;
  totalMax: number;
  roles: Role[];
}

export default function TeamOverviewCard({ team, totalFilled, totalMax, roles }: TeamOverviewCardProps) {
  const fillPercentage = Math.round((totalFilled / totalMax) * 100);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        {/* Left Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">COMPETITION</p>
              <p className="text-[13px] font-semibold">{team.competition}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              <span>{team.category}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Deadline: {new Date(team.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
        </div>

        {/* Right: Capacity */}
        <div className="min-w-[220px] space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">TEAM CAPACITY</p>
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-bold">{totalFilled}/{totalMax}</span>
            </div>
          </div>
          <Progress value={fillPercentage} className="h-2" />
          <div className="flex flex-wrap gap-1.5">
            {roles.map((role) => (
              <Badge
                key={role.id}
                variant={role.filled >= role.max ? "default" : "outline"}
                className="text-[10px] gap-1"
              >
                {role.name}
                <span className="font-bold">{role.filled}/{role.max}</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
