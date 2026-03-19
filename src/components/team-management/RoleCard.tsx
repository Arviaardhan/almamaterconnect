import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Trash2, UserMinus, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  skills: string[];
}

interface Role {
  id: string;
  name: string;
  skills: string[];
  filled: number;
  max: number;
  members: TeamMember[];
}

interface RoleCardProps {
  role: Role;
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onEdit: () => void;
  onDelete: () => void;
  onRemoveMember: (memberId: string) => void;
  onViewMember: (member: TeamMember) => void;
}

export default function RoleCard({
  role,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onEdit,
  onDelete,
  onRemoveMember,
  onViewMember,
}: RoleCardProps) {
  const isFull = role.filled >= role.max;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onDragOver={!isFull ? onDragOver : undefined}
      onDragLeave={onDragLeave}
      onDrop={!isFull ? onDrop : undefined}
      className={`rounded-2xl border bg-card p-4 transition-all duration-200 ${
        isDragOver && !isFull
          ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
          : isFull
          ? "border-border opacity-80"
          : "border-border hover:border-primary/30"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-bold">{role.name}</p>
            {isFull && (
              <Badge variant="outline" className="text-[9px] gap-0.5 h-4 border-destructive/30 text-destructive">
                <Lock className="h-2.5 w-2.5" /> Full
              </Badge>
            )}
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
            {role.filled}/{role.max} FILLED
          </p>
        </div>
        <div className="flex gap-0.5">
          <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 transition-transform" onClick={onEdit}>
            <Settings className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 hover:scale-105 transition-transform hover:text-destructive" onClick={onDelete}>
            <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1 mb-3">
        {role.skills.map((skill) => (
          <span key={skill} className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
            {skill}
          </span>
        ))}
      </div>

      {/* Slot Bar */}
      <div className="mb-3 flex gap-1">
        {Array.from({ length: role.max }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < role.filled ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Members */}
      <div className="space-y-1.5">
        {role.members.map((member) => (
          <div key={member.id} className="flex items-center justify-between rounded-lg p-1.5 hover:bg-muted/50 group">
            <button onClick={() => onViewMember(member)} className="flex items-center gap-2 text-left hover:text-primary transition-colors">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-bold">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-[12px] font-medium">{member.name}</span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
              onClick={() => onRemoveMember(member.id)}
            >
              <UserMinus className="h-3 w-3" />
            </Button>
          </div>
        ))}

        {/* Empty Drop Zone */}
        {!isFull && (
          <div className={`rounded-lg border border-dashed p-3 text-center transition-colors ${
            isDragOver ? "border-primary bg-primary/5" : "border-border"
          }`}>
            <p className="text-[10px] text-muted-foreground">
              {isDragOver ? "Drop to assign here" : "Drag a request here"}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
