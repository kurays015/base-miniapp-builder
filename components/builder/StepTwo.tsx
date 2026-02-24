"use client";

import { ExternalLink, Info, Shield } from "lucide-react";
import { FormField } from "@/components/ui/FormField";

interface StepTwoProps {
  deployedUrl: string;
  header: string;
  payload: string;
  signature: string;
  onHeaderChange: (v: string) => void;
  onPayloadChange: (v: string) => void;
  onSignatureChange: (v: string) => void;
}

export function StepTwo({
  deployedUrl,
  header,
  payload,
  signature,
  onHeaderChange,
  onPayloadChange,
  onSignatureChange,
}: StepTwoProps) {
  const previewUrl = `https://www.base.dev/preview?tab=account${deployedUrl ? `&url=${encodeURIComponent(deployedUrl)}` : ""}`;
  const hasAll = header && payload && signature;

  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
          <Shield className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Verify Ownership on Base</h2>
          <p className="text-sm text-base-muted">
            Link your deployed app to your Base account
          </p>
        </div>
      </div>

      {/* Prereq warning */}
      {!deployedUrl && (
        <div className="flex gap-3 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
          <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-300">
            Complete Step 1 first — your deployed app must be live before you
            can verify ownership.
          </p>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-4">
        <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400">
              1
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Open Base Preview Tool
            </p>
          </div>
          <p className="text-sm text-base-muted ml-8">
            Click the button below to open the Base Developer Preview with the{" "}
            <strong className="text-white">Account Association</strong> tab.
          </p>
          <div className="ml-8">
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-base-blue hover:bg-blue-600
                text-white text-sm font-bold transition-all hover:shadow-lg hover:shadow-base-blue/30 hover:-translate-y-0.5"
            >
              Open Base Preview
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400">
              2
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Paste your deployed URL and verify
            </p>
          </div>
          <div className="ml-8 space-y-2 text-sm text-base-muted">
            <p>In the Base Preview tool:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-300">
              <li>
                Paste your deployed URL:{" "}
                <code className="text-base-blue text-xs">
                  {deployedUrl || "https://your-app.vercel.app"}
                </code>
              </li>
              <li>
                Click the <strong>Account association</strong> tab
              </li>
              <li>
                Click the red{" "}
                <strong className="text-orange-400">Verify</strong> button
              </li>
              <li>Connect your Base / Farcaster account if prompted</li>
            </ol>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400">
              3
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Copy the association values
            </p>
          </div>
          <p className="text-sm text-base-muted ml-8">
            After verification succeeds, Base will show you three values. Paste
            them below.
          </p>
          <div className="ml-8 space-y-3">
            <FormField
              label="header"
              id="assoc-header"
              value={header}
              onChange={onHeaderChange}
              placeholder="eyJmaBBiOjE3MzE4LCJ0eX..."
              hint="The JWT header from the Base Preview tool"
            />
            <FormField
              label="payload"
              id="assoc-payload"
              value={payload}
              onChange={onPayloadChange}
              placeholder="eyJkb21haW4iOiJ4..."
              hint="The JWT payload from the Base Preview tool"
            />
            <FormField
              label="signature"
              id="assoc-signature"
              value={signature}
              onChange={onSignatureChange}
              placeholder="MHhmNGQzN2M2OTk4..."
              hint="The signature from the Base Preview tool"
            />
          </div>
        </div>
      </div>

      {hasAll && (
        <div className="flex gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
          <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-emerald-300">
              All three values saved ✓
            </p>
            <p className="text-base-muted">
              Proceed to Step 3 to update your minikit.config.ts
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
