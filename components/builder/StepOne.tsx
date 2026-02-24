"use client";

import {
  ExternalLink,
  Github,
  Globe,
  Info,
  Terminal,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { FormField } from "@/components/ui/FormField";

interface StepOneProps {
  deployedUrl: string;
  onDeployedUrlChange: (url: string) => void;
}

const TEMPLATE_REPO = "https://github.com/kurays015/baseminiapp-template";
const VERCEL_DEPLOY_URL =
  "https://vercel.com/new/clone?repository-url=https://github.com/kurays015/baseminiapp-template&env=NEXT_PUBLIC_ROOT_URL&envDescription=The+live+URL+of+your+deployed+app&envLink=https://vercel.com/docs/environment-variables";

function CopyableCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#060c1a] border border-base-border font-mono text-sm">
      <span className="flex-1 text-slate-300 break-all">{code}</span>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="flex-shrink-0 p-1.5 rounded-md hover:bg-white/10 text-base-muted hover:text-white transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

export function StepOne({ deployedUrl, onDeployedUrlChange }: StepOneProps) {
  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-base-blue/10 border border-base-blue/30 flex items-center justify-center">
          <Globe className="w-5 h-5 text-base-blue" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Clone & Deploy Template</h2>
          <p className="text-sm text-base-muted">
            Fork the Base mini-app template and deploy it to Vercel
          </p>
        </div>
      </div>

      {/* Sub-steps */}
      <div className="space-y-4">
        {/* 1A: Fork on GitHub */}
        <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-base-blue/20 flex items-center justify-center text-xs font-bold text-base-blue">
              A
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Fork the template on GitHub
            </p>
          </div>
          <p className="text-sm text-base-muted ml-8">
            Click below to open the template repository, then click{" "}
            <strong className="text-white">Fork</strong> to add it to your
            GitHub account. This gives you your own copy to customize.
          </p>
          <div className="ml-8">
            <CopyableCode code={TEMPLATE_REPO} />
          </div>
          <div className="ml-8">
            <a
              href={TEMPLATE_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-base-border
                hover:border-white/20 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4" />
              Open Template on GitHub
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </a>
          </div>
        </div>

        {/* 1B: Deploy to Vercel */}
        <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-base-blue/20 flex items-center justify-center text-xs font-bold text-base-blue">
              B
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Deploy to Vercel
            </p>
          </div>
          <p className="text-sm text-base-muted ml-8">
            Click the button below to instantly deploy the template. Vercel will
            prompt you to set up the required environment variable.
          </p>

          {/* Env var callout */}
          <div className="ml-8 flex gap-3 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
            <Info className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-yellow-300 mb-2">
                Required Environment Variable
              </p>
              <div className="space-y-2">
                <div className="flex gap-2 items-center font-mono text-xs">
                  <span className="text-yellow-400">NEXT_PUBLIC_ROOT_URL</span>
                  <span className="text-base-muted">=</span>
                  <span className="text-emerald-400">
                    your-live-project-domain
                  </span>
                </div>
                <p className="text-base-muted text-xs">
                  Set this to your Vercel deployment URL{" "}
                  <em>(you can update it after the first deploy)</em>. Example:{" "}
                  <code className="text-emerald-400">
                    https://my-app.vercel.app
                  </code>
                </p>
              </div>
            </div>
          </div>

          <div className="ml-8">
            <a
              href={VERCEL_DEPLOY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-black border border-white/10
                hover:bg-white/10 text-white text-sm font-bold transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 76 65" fill="currentColor" className="w-4 h-4">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
              Deploy to Vercel
              <ExternalLink className="w-3.5 h-3.5 opacity-50" />
            </a>
          </div>
        </div>

        {/* 1C: Get deployed URL */}
        <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-base-blue/20 flex items-center justify-center text-xs font-bold text-base-blue">
              C
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Save your deployed app URL
            </p>
          </div>
          <p className="text-sm text-base-muted ml-8">
            After Vercel finishes deploying, copy your live URL from the Vercel
            dashboard (e.g.{" "}
            <code className="text-base-blue text-xs">
              https://my-app.vercel.app
            </code>
            ) and paste it here. You&apos;ll need this in the next steps.
          </p>
          <div className="ml-8">
            <FormField
              label="Deployed App URL"
              id="deployedUrl"
              value={deployedUrl}
              onChange={onDeployedUrlChange}
              placeholder="https://my-app.vercel.app"
              hint="Copy this from Vercel dashboard after deployment"
              required
            />
            {deployedUrl && !deployedUrl.startsWith("https://") && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                ⚠ URL must start with{" "}
                <code className="font-mono">https://</code>
              </p>
            )}
          </div>

          {/* How to find it */}
          <div className="ml-8 flex gap-3 p-3 rounded-lg border border-base-border bg-[#060c1a]">
            <Terminal className="w-4 h-4 text-base-muted flex-shrink-0 mt-0.5" />
            <div className="text-xs text-base-muted space-y-1">
              <p className="font-semibold text-slate-300">
                Where to find your URL:
              </p>
              <p>
                Vercel → Dashboard → Your Project →{" "}
                <strong className="text-white">Visit</strong> button
              </p>
              <p>or GitHub → your forked repo → Deployments → Latest</p>
            </div>
          </div>
        </div>
      </div>

      {deployedUrl && (
        <div className="flex gap-2 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
          <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-emerald-300">App URL saved!</p>
            <a
              href={deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-muted hover:text-white transition-colors break-all"
            >
              {deployedUrl} <ExternalLink className="w-3 h-3 inline ml-1" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
