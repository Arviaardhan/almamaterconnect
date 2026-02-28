import { MessageCircle, Mail, ShieldCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    phone?: string | null;
    email: string;
  };
}

export default function ContactModal({ open, onOpenChange, user }: ContactModalProps) {
  const isMobile = useIsMobile();

  const waMessage = encodeURIComponent(
    `Halo ${user.name}, saya melihat profil Anda di AlmamaterConnect dan tertarik untuk mengajak kolaborasi di tim saya. Apakah Anda memiliki waktu untuk berdiskusi?`
  );
  const waUrl = `https://wa.me/${user.phone}?text=${waMessage}`;
  const mailUrl = `mailto:${user.email}?subject=${encodeURIComponent("AlmamaterConnect - Kolaborasi Kompetisi")}`;

  const content = (
    <div className="flex flex-col gap-3 py-2">
      {user.phone && (
        <Button
          asChild
          size="lg"
          className="h-14 justify-start gap-3 text-base font-medium text-white hover:opacity-90"
          style={{ backgroundColor: "#25D366" }}
        >
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" />
            Chat via WhatsApp
          </a>
        </Button>
      )}
      <Button
        asChild
        size="lg"
        className="h-14 justify-start gap-3 text-base font-medium bg-slate-700 text-white hover:bg-slate-800"
      >
        <a href={mailUrl}>
          <Mail className="h-5 w-5" />
          Send Email
        </a>
      </Button>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
        Your contact information will only be used for collaboration purposes.
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Connect with {user.name}</DrawerTitle>
            <DrawerDescription>Choose how you'd like to reach out.</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-6">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect with {user.name}</DialogTitle>
          <DialogDescription>Choose how you'd like to reach out.</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
