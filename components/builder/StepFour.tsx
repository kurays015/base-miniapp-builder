"use client";

import { ExternalLink, CheckSquare, Info } from "lucide-react";

interface StepFourProps {
  deployedUrl: string;
}

const ACCOUNT_CHECKS = [
  "Account associated — no longer shows 'Missing'",
  "Domain matches your deployed URL",
  "Signature is valid (no error shown)",
];

const METADATA_CHECKS = [
  "App Name is correct",
  "Icon loads properly",
  "Splash image loads properly",
  "Hero image shows correctly",
  "Primary category is set",
  "Tags are present",
  "Webhook URL is reachable",
];

export function StepFour({ deployedUrl }: StepFourProps) {
  const accountUrl = `https://www.base.dev/preview?tab=account${deployedUrl ? `&url=${encodeURIComponent(deployedUrl)}` : ""}`;
  const metadataUrl = `https://www.base.dev/preview?tab=metadata${deployedUrl ? `&url=${encodeURIComponent(deployedUrl)}` : ""}`;

  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
          <CheckSquare className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Verify Your Config on Base</h2>
          <p className="text-sm text-base-muted">
            Go back to Base Preview to confirm everything is configured
            correctly
          </p>
        </div>
      </div>

      <div className="flex gap-3 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-300">
          After pushing your updated{" "}
          <code className="text-blue-200 text-xs">minikit.config.ts</code> to
          GitHub, Vercel will auto-redeploy. Wait ~1–2 minutes for the
          deployment to finish, then verify below.
        </p>
      </div>

      {/* Account tab */}
      <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
              1
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Check Account Association tab
            </p>
          </div>
          <a
            href={accountUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-base-blue hover:bg-blue-600
              text-white text-xs font-bold transition-all"
          >
            Open Tab
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-sm text-base-muted ml-8">
          Confirm all these fields are now showing correctly:
        </p>
        <ul className="ml-8 space-y-2">
          {ACCOUNT_CHECKS.map((check) => (
            <li
              key={check}
              className="flex items-start gap-2 text-sm text-slate-300"
            >
              <span className="text-emerald-400 mt-0.5">✓</span>
              {check}
            </li>
          ))}
        </ul>
      </div>

      {/* Metadata tab */}
      <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
              2
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Check Metadata tab
            </p>
          </div>
          <a
            href={metadataUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-base-blue hover:bg-blue-600
              text-white text-xs font-bold transition-all"
          >
            Open Tab
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-sm text-base-muted ml-8">
          Verify the following metadata fields are shown:
        </p>
        <ul className="ml-8 space-y-2">
          {METADATA_CHECKS.map((check) => (
            <li
              key={check}
              className="flex items-start gap-2 text-sm text-slate-300"
            >
              <span className="text-emerald-400 mt-0.5">✓</span>
              {check}
            </li>
          ))}
        </ul>
      </div>

      {/* Troubleshooting */}
      <div className="p-4 rounded-xl border border-base-border bg-base-card/50 space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Troubleshooting
        </p>
        <ul className="space-y-1.5 text-sm text-base-muted">
          <li>
            • <strong className="text-slate-300">Account still missing?</strong>{" "}
            — Verify Vercel redeployed, then re-click Verify in Step 2
          </li>
          <li>
            • <strong className="text-slate-300">Images not loading?</strong> —
            Check the image paths are correct in minikit.config.ts
          </li>
          <li>
            • <strong className="text-slate-300">Domain mismatch?</strong> —
            Ensure{" "}
            <code className="text-xs text-yellow-400">
              NEXT_PUBLIC_ROOT_URL
            </code>{" "}
            matches exactly
          </li>
          <li>
            • <strong className="text-slate-300">Analytics not showing?</strong>{" "}
            — Ensure{" "}
            <code className="text-xs text-yellow-400">
              NEXT_PUBLIC_BASE_APP_ID
            </code>{" "}
            are correct
          </li>
        </ul>
      </div>
    </div>
  );
}
