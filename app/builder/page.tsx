"use client";

import { useState } from "react";
import Link from "next/link";
import { MiniAppConfig, defaultConfig } from "@/lib/types";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { StepOne } from "@/components/builder/StepOne";
import { StepTwo } from "@/components/builder/StepTwo";
import { StepThree } from "@/components/builder/StepThree";
import { StepFour } from "@/components/builder/StepFour";
import { StepFive } from "@/components/builder/StepFive";
import { ArrowLeft, ArrowRight, Rocket, ChevronLeft } from "lucide-react";

const STEPS = [
  {
    number: 1,
    label: "Clone & Deploy",
    description: "Fork template + Vercel",
  },
  {
    number: 2,
    label: "Verify Ownership",
    description: "base.dev/preview → account",
  },
  {
    number: 3,
    label: "Configure",
    description: "minikit.config.ts + push",
  },
  {
    number: 4,
    label: "Check Config",
    description: "account + metadata tabs",
  },
  {
    number: 5,
    label: "Test & Publish",
    description: "Preview + go live",
  },
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 state
  const [deployedUrl, setDeployedUrl] = useState("");

  // Step 2 state
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");

  // Step 3 state
  const [config, setConfig] = useState<MiniAppConfig>(defaultConfig);

  // Step 3 push state — lifted up so the Next button knows push succeeded
  const [step3PushDone, setStep3PushDone] = useState(false);

  const handleConfigChange = (key: keyof MiniAppConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    // If config changes after push, require a new push
    setStep3PushDone(false);
  };

  // Per-step validation
  const stepValidation: Record<number, { ok: boolean; hint: string }> = {
    1: {
      ok: deployedUrl.trim().startsWith("https://"),
      hint:
        deployedUrl && !deployedUrl.startsWith("https://")
          ? "URL must start with https:// — please fix the URL above."
          : "Paste your deployed Vercel URL (must start with https://) to continue.",
    },
    2: {
      ok: !!(header && payload && signature),
      hint: "Complete verification on base.dev and paste the header, payload, and signature.",
    },
    3: (() => {
      const requiredFields: Array<keyof MiniAppConfig> = [
        "appName",
        "subtitle",
        "description",
        "tagline",
        "appUrl",
        "iconUrl",
        "splashImageUrl",
        "heroImageUrl",
        "webhookUrl",
        "ogTitle",
        "ogDescription",
        "ogImageUrl",
        "primaryCategory",
        "tags",
      ];
      const allFilled = requiredFields.every((k) => config[k]?.trim());
      if (!allFilled) {
        return {
          ok: false,
          hint: "Fill in all required fields (*) in the form before pushing.",
        };
      }
      if (!step3PushDone) {
        return {
          ok: false,
          hint: "Push your minikit.config.ts to GitHub to continue.",
        };
      }
      return { ok: true, hint: "" };
    })(),
    4: { ok: true, hint: "" },
    5: { ok: true, hint: "" },
  };

  const { ok: canGoNext, hint: validationHint } = stepValidation[
    currentStep
  ] ?? { ok: true, hint: "" };

  const goNext = () => {
    if (canGoNext) setCurrentStep((s) => Math.min(s + 1, 5));
  };
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-base-dark flex flex-col">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(30,45,80,0.5) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="fixed top-0 left-1/4 w-[400px] h-[200px] rounded-full bg-base-blue/8 blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-base-border bg-base-dark/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-base-muted hover:text-white transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Home
            </Link>
            <div className="w-px h-5 bg-base-border" />
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-base-blue" />
              <span className="font-bold text-sm">Base App Builder</span>
            </div>
          </div>

          {/* Progress dots */}
          <div className="hidden md:flex items-center gap-2">
            {STEPS.map((step) => (
              <button
                key={step.number}
                onClick={() => setCurrentStep(step.number)}
                title={step.label}
                className={`h-1.5 rounded-full transition-all ${
                  step.number < currentStep
                    ? "bg-emerald-500 w-6"
                    : step.number === currentStep
                      ? "bg-base-blue w-10"
                      : "bg-base-border w-6"
                }`}
              />
            ))}
          </div>

          <div className="text-sm text-base-muted">
            Step <span className="text-white font-bold">{currentStep}</span> /{" "}
            {STEPS.length}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 max-w-7xl mx-auto w-full px-6 py-8 gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <p className="text-xs text-base-muted font-semibold uppercase tracking-wider mb-4">
              Progress
            </p>
            <StepIndicator steps={STEPS} currentStep={currentStep} />

            {/* Live summary card */}
            <div className="mt-6 p-4 rounded-xl border border-base-border bg-base-card space-y-3">
              {deployedUrl && (
                <div>
                  <p className="text-xs text-base-muted font-semibold uppercase tracking-wider mb-1">
                    Live URL
                  </p>
                  <p className="text-xs text-emerald-400 break-all">
                    {deployedUrl}
                  </p>
                </div>
              )}
              {config.appName && config.appName !== defaultConfig.appName && (
                <div>
                  <p className="text-xs text-base-muted font-semibold uppercase tracking-wider mb-1">
                    App Name
                  </p>
                  <p className="text-sm font-bold text-white truncate">
                    {config.appName}
                  </p>
                </div>
              )}
              {header && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <p className="text-xs text-emerald-400">Ownership verified</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-base-card border border-base-border rounded-2xl p-6 md:p-8 min-h-[600px] flex flex-col">
            <div className="flex-1">
              {currentStep === 1 && (
                <StepOne
                  deployedUrl={deployedUrl}
                  onDeployedUrlChange={setDeployedUrl}
                />
              )}
              {currentStep === 2 && (
                <StepTwo
                  deployedUrl={deployedUrl}
                  header={header}
                  payload={payload}
                  signature={signature}
                  onHeaderChange={setHeader}
                  onPayloadChange={setPayload}
                  onSignatureChange={setSignature}
                />
              )}
              {currentStep === 3 && (
                <StepThree
                  config={config}
                  onChange={handleConfigChange}
                  header={header}
                  payload={payload}
                  signature={signature}
                  deployedUrl={deployedUrl}
                  onPushSuccess={() => setStep3PushDone(true)}
                />
              )}
              {currentStep === 4 && <StepFour deployedUrl={deployedUrl} />}
              {currentStep === 5 && (
                <StepFive deployedUrl={deployedUrl} appName={config.appName} />
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-base-border">
              <button
                onClick={goPrev}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-base-border
                  text-sm font-semibold text-base-muted hover:text-white hover:border-white/20
                  transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {/* Mobile dots */}
              <div className="flex items-center gap-1.5 lg:hidden">
                {STEPS.map((step) => (
                  <div
                    key={step.number}
                    className={`h-1.5 rounded-full transition-all ${
                      step.number === currentStep
                        ? "bg-base-blue w-5"
                        : step.number < currentStep
                          ? "bg-emerald-500 w-3"
                          : "bg-base-border w-3"
                    }`}
                  />
                ))}
              </div>

              {currentStep < 5 ? (
                <div className="flex flex-col items-end gap-1.5">
                  {!canGoNext && (
                    <p className="text-xs text-yellow-400 text-right max-w-[260px]">
                      {validationHint}
                    </p>
                  )}
                  <button
                    onClick={goNext}
                    disabled={!canGoNext}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-base-blue hover:bg-blue-600
                      text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-base-blue/30
                      hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed
                      disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10
                  border border-emerald-500/30 text-sm font-semibold text-emerald-400"
                >
                  <Rocket className="w-4 h-4" />
                  All done! 🎉
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
