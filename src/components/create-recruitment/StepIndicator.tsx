import { CheckCircle2, Trophy, Lightbulb, Users, ClipboardCheck, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export const stepLabels: { icon: LucideIcon; label: string }[] = [
  { icon: Trophy, label: "Info Dasar" },
  { icon: Lightbulb, label: "Visi & Deskripsi" },
  { icon: Users, label: "Kebutuhan Role" },
  { icon: ClipboardCheck, label: "Review" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const progress = ((currentStep) / (stepLabels.length - 1)) * 100;

  return (
    <div className="mb-10">
      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-muted mb-8 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="flex items-center justify-between">
        {stepLabels.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  i < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : i === currentStep
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground"
                }`}
                animate={{ scale: i === currentStep ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {i < currentStep ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <s.icon className="h-5 w-5" />
                )}
              </motion.div>
              <span
                className={`text-[10px] font-black uppercase tracking-[0.15em] leading-tight text-center max-w-[80px] ${
                  i <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div
                className={`mx-1 h-px w-6 sm:mx-2 sm:w-12 self-start mt-5 transition-colors ${
                  i < currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
