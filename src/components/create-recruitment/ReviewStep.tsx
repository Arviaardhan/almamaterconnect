import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, ArrowRight, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface ReviewStepProps {
  title: string;
  category: string;
  link: string;
  deadline: string;
  whatsappLink: string;
  resourceLink: string;
  description: string;
  tagline: string;
  progress: string;
  roles: { role: string; responsibilities: string; skills: string[] }[];
}

const categoryMap: Record<string, string> = {
  web: "Web Development",
  mobile: "Mobile Development",
  design: "UI/UX Design",
  data: "Data Science",
  business: "Business Case",
  iot: "IoT / Hardware",
  debate: "Debate",
  research: "Research / Academic",
  creative: "Creative / Multimedia",
};

const progressMap: Record<string, string> = {
  ideation: "Ideasi",
  research: "Riset",
  prototype: "Prototipe Dimulai",
  halfway: "Setengah Jalan",
};

export default function ReviewStep(props: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">REVIEW</p>
        <h3 className="text-lg font-bold">Periksa Sebelum Dipublikasi</h3>
        <p className="text-[13px] text-muted-foreground">Pastikan semua informasi sudah benar.</p>
      </div>

      {/* Mini preview card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-primary/20 bg-primary/5 p-5"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">PREVIEW KARTU TIM</p>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="h-1 w-full bg-primary" />
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <Badge variant="outline" className="text-[11px]">{categoryMap[props.category] || props.category}</Badge>
              <Badge className="bg-primary/10 text-primary border-0 text-[10px]">Aktif</Badge>
            </div>
            <h4 className="font-bold text-base">{props.title || "Nama Kompetisi"}</h4>
            {props.tagline && (
              <p className="text-xs text-muted-foreground italic mt-1">"{props.tagline}"</p>
            )}
            <p className="text-[12px] text-muted-foreground line-clamp-2 mt-2">{props.description || "Deskripsi..."}</p>
            <div className="rounded-lg bg-muted/30 border border-border/50 p-2 mt-3">
              <div className="flex flex-wrap gap-1.5">
                {props.roles.length > 0 ? props.roles.map((r) => (
                  <Badge key={r.role} className="bg-primary/10 text-primary border-primary/20 text-[10px] gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {r.role}
                  </Badge>
                )) : (
                  <span className="text-[10px] text-muted-foreground">Belum ada role</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 border-2 border-card">
                  <AvatarFallback className="text-[8px] font-bold bg-accent text-accent-foreground">YU</AvatarFallback>
                </Avatar>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" /> 1/{1 + props.roles.length}
                </span>
              </div>
              {props.deadline && (
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {props.deadline}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detail review */}
      <div className="space-y-4">
        <Section label="Nama Kompetisi" value={props.title} />
        <Section label="Kategori" value={categoryMap[props.category] || props.category} />
        {props.tagline && <Section label="Tagline" value={`"${props.tagline}"`} />}
        {props.progress && <Section label="Progress Saat Ini" value={progressMap[props.progress] || props.progress} />}
        {props.link && <Section label="Link Kompetisi" value={props.link} isLink />}
        {props.deadline && <Section label="Deadline Registrasi" value={props.deadline} />}
        {props.whatsappLink && <Section label="WhatsApp" value={props.whatsappLink} isLink />}
        {props.resourceLink && <Section label="Link Resources" value={props.resourceLink} isLink />}

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">DESKRIPSI</p>
          <p className="text-[13px] whitespace-pre-wrap rounded-xl border border-border bg-muted/40 p-4 leading-relaxed">
            {props.description || <span className="text-muted-foreground italic">Belum ada deskripsi</span>}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">ROLE YANG DIBUTUHKAN</p>
          {props.roles.length === 0 ? (
            <p className="text-[13px] text-muted-foreground italic">Belum ada role ditambahkan</p>
          ) : (
            <div className="space-y-3">
              {props.roles.map((r, i) => (
                <div key={i} className="rounded-xl border border-border p-4">
                  <p className="font-semibold text-sm">{r.role}</p>
                  {r.responsibilities && (
                    <p className="text-xs text-muted-foreground mt-1">{r.responsibilities}</p>
                  )}
                  {r.skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {r.skills.map((s, si) => (
                        <Badge key={si} className="bg-accent text-accent-foreground border-0 text-[11px]">{s}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">{label}</p>
      {isLink ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all inline-flex items-center gap-1">
          {value} <ExternalLink className="h-3 w-3" />
        </a>
      ) : (
        <p className="text-sm font-medium">{value}</p>
      )}
    </div>
  );
}
