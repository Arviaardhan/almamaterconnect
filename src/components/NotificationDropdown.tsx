import { useState } from "react";
import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

type NotifType = "request" | "accepted" | "invitation" | "declined";

interface Notification {
  id: number;
  avatar: string;
  name: string;
  message: string;
  time: string;
  read: boolean;
  type: NotifType;
  teamName?: string;
  pitch?: string;
}

const initialNotifications: Notification[] = [
  { id: 1, avatar: "BS", name: "Budi Santoso", message: "has requested to join Hackathon UI/UX 2026", time: "1 hour ago", read: false, type: "request" },
  { id: 4, avatar: "MP", name: "Maya Putri", message: "invited you to join", time: "30 min ago", read: false, type: "invitation", teamName: "AI Innovation Challenge", pitch: "Hey, I saw your React skills and they match our AI project!" },
  { id: 2, avatar: "HC", name: "Hackathon UI/UX 2026", message: "has accepted your request!", time: "2 hours ago", read: false, type: "accepted" },
  { id: 3, avatar: "LC", name: "Lisa Chen", message: "has requested to join Hackathon UI/UX 2026", time: "3 hours ago", read: true, type: "request" },
];

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleAcceptInvite = (notifId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notifId));
    toast({
      title: "🎉 Invitation Accepted!",
      description: "You've joined the team. Check the team's WhatsApp group for coordination.",
    });
  };

  const handleDeclineInvite = (notifId: number, leaderName: string, teamName: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notifId));
    toast({
      title: "Invitation Declined",
      description: `${leaderName} has been notified.`,
    });
  };

  const removeNotification = (notifId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notifId));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-primary hover:underline">
              Mark all read
            </button>
          )}
        </div>
        <div className="max-h-[28rem] overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">No notifications</div>
          ) : (
            <AnimatePresence mode="popLayout">
              {notifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: 80, transition: { duration: 0.25 } }}
                  layout
                >
                  {notif.type === "invitation" ? (
                    /* Invitation Card */
                    <div className={`px-4 py-3 border-b border-border last:border-0 ${!notif.read ? "bg-accent/30" : ""}`}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9 shrink-0 ring-2 ring-primary/20">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">{notif.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-semibold">{notif.name}</span>{" "}
                            <span className="text-muted-foreground">{notif.message}</span>{" "}
                            <span className="font-semibold text-primary">{notif.teamName}</span>
                          </p>
                          {notif.pitch && (
                            <div className="mt-2 rounded-lg border border-border bg-muted/50 p-2.5 text-xs text-muted-foreground italic">
                              "{notif.pitch}"
                            </div>
                          )}
                          <p className="mt-1.5 text-xs text-muted-foreground">{notif.time}</p>
                          <div className="mt-2 flex gap-2">
                            <Button size="sm" className="h-7 text-xs flex-1" onClick={() => handleAcceptInvite(notif.id)}>
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs flex-1 border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => handleDeclineInvite(notif.id, notif.name, notif.teamName || "")}>
                              Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Standard Notification */
                    <div className={`flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 transition-colors ${!notif.read ? "bg-accent/30" : ""}`}>
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">{notif.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-semibold">{notif.name}</span>{" "}
                          <span className="text-muted-foreground">{notif.message}</span>
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{notif.time}</p>
                      </div>
                      {!notif.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
