import { Check } from "lucide-react";

interface Step {
  number: number;
  label: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map((step) => {
        const isComplete = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div
            key={step.number}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              isActive
                ? "bg-base-blue/10 border border-base-blue/30"
                : isComplete
                  ? "opacity-70"
                  : "opacity-40"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                isComplete
                  ? "bg-emerald-500 text-white"
                  : isActive
                    ? "bg-base-blue text-white shadow-lg shadow-base-blue/40"
                    : "bg-base-card border border-base-border text-base-muted"
              }`}
            >
              {isComplete ? <Check className="w-4 h-4" /> : step.number}
            </div>
            <div className="min-w-0">
              <p
                className={`text-sm font-semibold truncate ${
                  isActive ? "text-white" : "text-slate-400"
                }`}
              >
                {step.label}
              </p>
              <p className="text-xs text-base-muted truncate">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
