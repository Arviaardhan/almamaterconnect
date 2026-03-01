import { CheckCircle2, Trophy, FileText, Users, ClipboardCheck, LucideIcon } from "lucide-react";

export const stepLabels: { icon: LucideIcon; label: string }[] = [
  { icon: Trophy, label: "Competition" },
  { icon: FileText, label: "Details" },
  { icon: Users, label: "Roles" },
  { icon: ClipboardCheck, label: "Review" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-10 flex items-center justify-between">
      {stepLabels.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                i <= currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              {i < currentStep ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <s.icon className="h-5 w-5" />
              )}
            </div>
            <span
              className={`text-[11px] font-medium leading-tight ${
                i <= currentStep ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < stepLabels.length - 1 && (
            <div
              className={`mx-1 h-px w-6 sm:mx-2 sm:w-12 self-start mt-5 ${
                i < currentStep ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
