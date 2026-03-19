import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

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

interface JoinRequestCardProps {
  request: JoinRequest;
  onAccept: () => void;
  onReject: () => void;
  onDragStart: () => void;
  isDragging: boolean;
}

export default function JoinRequestCard({ request, onAccept, onReject, onDragStart, isDragging }: JoinRequestCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      exit={{ opacity: 0, x: -80, transition: { duration: 0.2 } }}
      draggable
      onDragStart={(e) => {
        // Set drag data for HTML drag and drop
        const nativeEvent = e as unknown as React.DragEvent;
        if (nativeEvent.dataTransfer) {
          nativeEvent.dataTransfer.effectAllowed = "move";
        }
        onDragStart();
      }}
      className={`rounded-2xl border border-border bg-card p-4 cursor-grab active:cursor-grabbing transition-shadow ${
        isDragging ? "shadow-lg ring-2 ring-primary/20" : "hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 text-muted-foreground/40">
          <GripVertical className="h-4 w-4" />
        </div>

        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-[11px] font-bold">
            {request.initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-bold truncate">{request.name}</p>
            <span className="text-[10px] text-muted-foreground shrink-0">{request.appliedAt}</span>
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
            Applied for {request.appliedRole}
          </p>

          <p className="text-[11px] text-muted-foreground mt-1.5 line-clamp-2 italic">"{request.bio}"</p>

          <div className="flex flex-wrap gap-1 mt-2">
            {request.skills.map((skill) => (
              <span key={skill} className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                {skill}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 text-[11px] text-destructive hover:bg-destructive hover:text-destructive-foreground hover:scale-105 transition-transform"
              onClick={onReject}
            >
              <X className="h-3 w-3" /> Reject
            </Button>
            <Button
              size="sm"
              className="h-7 gap-1 text-[11px] hover:scale-105 transition-transform"
              onClick={onAccept}
            >
              <Check className="h-3 w-3" /> Accept
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
