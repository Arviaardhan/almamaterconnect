import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Loader2, CheckCircle2, Sparkles, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OpenRole {
  role: string;
  skills: string[];
  status: string;
}

interface JoinTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamName: string;
  openRoles: OpenRole[];
  onSubmit: (data: { role: string; message: string; portfolio: string }) => void;
}

export default function JoinTeamModal({ open, onOpenChange, teamName, openRoles, onSubmit }: JoinTeamModalProps) {
  const [selectedRole, setSelectedRole] = useState("");
  const [message, setMessage] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      onSubmit({ role: selectedRole, message, portfolio });
      setSuccess(false);
      setSelectedRole("");
      setMessage("");
      setPortfolio("");
    }, 1800);
  };

  const handleClose = (val: boolean) => {
    if (!submitting && !success) {
      onOpenChange(val);
      setSuccess(false);
    }
  };

  const availableRoles = openRoles.filter((r) => r.status === "Open");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg border-primary/10 bg-card/95 backdrop-blur-xl">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4"
              >
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold">Lamaran Terkirim! 🎉</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Ketua tim akan mereview lamaranmu. Semoga berhasil!
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">LAMARAN</p>
                </div>
                <DialogTitle className="text-xl">Lamar ke {teamName}</DialogTitle>
                <DialogDescription className="text-[13px]">
                  Tunjukkan kenapa kamu cocok untuk tim ini. Lamaran singkat & padat lebih disukai!
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Role selection */}
                <div>
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    POSISI YANG DILAMAR
                  </Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Pilih posisi..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map((r) => (
                        <SelectItem key={r.role} value={r.role}>
                          {r.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Motivation */}
                <div>
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    KENAPA KAMU COCOK?
                  </Label>
                  <Textarea
                    placeholder="Ceritakan pengalaman dan skill relevanmu untuk posisi ini..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 300))}
                    className="mt-1.5 min-h-[100px]"
                  />
                  <p className="mt-1 text-xs text-muted-foreground text-right">{message.length}/300</p>
                </div>

                {/* Portfolio link */}
                <div>
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    LINK PORTOFOLIO (OPSIONAL)
                  </Label>
                  <div className="relative mt-1.5">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="https://github.com/username atau link Behance/Drive"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => handleClose(false)}>Batal</Button>
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || !selectedRole || !message.trim()}
                  className="gap-2 shadow-lg shadow-primary/20"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  {submitting ? "Mengirim..." : "Kirim Lamaran"}
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
