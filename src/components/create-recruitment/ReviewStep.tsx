import { Badge } from "@/components/ui/badge";

interface ReviewStepProps {
  title: string;
  category: string;
  link: string;
  deadline: string;
  whatsappLink: string;
  resourceLink: string;
  description: string;
  roles: { role: string; skills: string[] }[];
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

export default function ReviewStep(props: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review Your Recruitment</h3>
      <p className="text-sm text-muted-foreground">Double-check everything before posting.</p>

      <div className="space-y-4">
        <Section label="Competition Title" value={props.title} />
        <Section label="Category" value={categoryMap[props.category] || props.category} />
        {props.link && <Section label="Competition Link" value={props.link} isLink />}
        {props.deadline && <Section label="Registration Deadline" value={props.deadline} />}
        {props.whatsappLink && <Section label="WhatsApp Link" value={props.whatsappLink} isLink />}
        {props.resourceLink && <Section label="Guidebook / Resource Link" value={props.resourceLink} isLink />}

        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Project Description</p>
          <p className="text-sm whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-3">
            {props.description || <span className="text-muted-foreground italic">No description provided</span>}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Needed Roles</p>
          {props.roles.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No roles added</p>
          ) : (
            <div className="space-y-2">
              {props.roles.map((r, i) => (
                <div key={i} className="rounded-lg border border-border p-3">
                  <p className="font-medium text-sm">{r.role}</p>
                  {r.skills.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {r.skills.map((s, si) => (
                        <Badge key={si} variant="secondary" className="text-xs">{s}</Badge>
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
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
      {isLink ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">
          {value}
        </a>
      ) : (
        <p className="text-sm font-medium">{value}</p>
      )}
    </div>
  );
}
