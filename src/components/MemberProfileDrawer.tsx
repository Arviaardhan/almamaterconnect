import { Link } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink, GraduationCap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MemberProfile {
  id?: number;
  name: string;
  initials: string;
  role: string;
  major?: string;
  skills?: string[];
  portfolio?: string;
}

interface MemberProfileDrawerProps {
  member: MemberProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function MemberContent({ member }: { member: MemberProfile }) {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <Avatar className="h-20 w-20">
        <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
          {member.initials}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
      {member.major && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4" />
          {member.major}
        </div>
      )}
      {member.skills && member.skills.length > 0 && (
        <div>
          <p className="mb-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Top Skills</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {member.skills.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>
      )}
      {member.portfolio && (
        <a href={member.portfolio} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="gap-2 mt-2">
            <ExternalLink className="h-4 w-4" /> View Portfolio
          </Button>
        </a>
      )}
      {member.id && (
        <Link to={`/profile/${member.id}`}>
          <Button variant="outline" className="gap-2 mt-1">
            <ExternalLink className="h-4 w-4" /> View Full Profile
          </Button>
        </Link>
      )}
    </div>
  );
}

export default function MemberProfileDrawer({ member, open, onOpenChange }: MemberProfileDrawerProps) {
  const isMobile = useIsMobile();

  if (!member) return null;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{member.name}</DrawerTitle>
            <DrawerDescription>{member.role}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <MemberContent member={member} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Team Member</DialogTitle>
          <DialogDescription>Profile details</DialogDescription>
        </DialogHeader>
        <MemberContent member={member} />
      </DialogContent>
    </Dialog>
  );
}
