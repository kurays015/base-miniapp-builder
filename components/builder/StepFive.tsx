"use client";

import { ExternalLink, Rocket, Share2, Check } from "lucide-react";
import Link from "next/link";

interface StepFiveProps {
  deployedUrl: string;
  appName: string;
}

export function StepFive({ deployedUrl, appName }: StepFiveProps) {
  const previewUrl = `https://www.base.dev/preview${deployedUrl ? `?url=${encodeURIComponent(deployedUrl)}` : ""}`;

  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-base-blue/10 border border-base-blue/30 flex items-center justify-center">
          <Rocket className="w-5 h-5 text-base-blue" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Test & Publish Your Mini-App</h2>
          <p className="text-sm text-base-muted">
            Your app is live — test it and make it discoverable on Base
          </p>
        </div>
      </div>

      {/* Success banner */}
      <div className="relative rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Check className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-emerald-300">
              {appName || "Your mini-app"} is ready! 🎉
            </p>
            <p className="text-sm text-base-muted mt-1">
              All steps complete. Time to test and share.
            </p>
          </div>
        </div>
      </div>

      {/* Step 1: Test */}
      <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-base-blue/20 flex items-center justify-center text-xs font-bold text-base-blue">
            1
          </div>
          <p className="text-sm font-semibold text-slate-200">
            Test your app in the Base Preview
          </p>
        </div>
        <p className="text-sm text-base-muted ml-4 sm:ml-8">
          Use the Base Preview tool to see exactly how your mini-app looks and
          behaves inside the Base App. Check the{" "}
          <strong className="text-white">Console</strong> tab for any runtime
          errors.
        </p>
        <div className="ml-4 sm:ml-8">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-base-blue hover:bg-blue-600
              text-white text-sm font-bold transition-all hover:shadow-lg hover:shadow-base-blue/30 hover:-translate-y-0.5"
          >
            <Rocket className="w-4 h-4" />
            Preview on base.dev
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="ml-4 sm:ml-8 p-3 rounded-lg bg-[#060c1a] border border-base-border text-xs text-base-muted space-y-1">
          <p className="font-semibold text-slate-300">
            What to check in the preview:
          </p>
          <ul className="space-y-1">
            <li>
              • App loads without a permanent loading spinner
              (sdk.actions.ready() is called)
            </li>
            <li>• UI renders correctly at mobile dimensions (~390×844px)</li>
            <li>• No console errors in the Console tab</li>
            <li>• Account Association and Metadata tabs show ✓ green checks</li>
          </ul>
        </div>
      </div>

      {/* Step 2: Analytics */}
      <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-base-blue/20 flex items-center justify-center text-xs font-bold text-base-blue">
            2
          </div>
          <p className="text-sm font-semibold text-slate-200">App Analytics</p>
        </div>
        <p className="text-sm text-base-muted ml-4 sm:ml-8">
          Track your app&apos;s performance and engagement with Base Analytics.
          See how users interact with your app and make improvements based on
          real-time data.
        </p>
        <div className="ml-4 sm:ml-8 space-y-2 text-sm text-slate-300">
          <ol className="list-decimal list-inside space-y-1.5 text-base-muted">
            <li>
              Get your base app id from{" "}
              <Link
                href="https://www.base.dev/apps/699dc33dc5c1c2a065a21d19?filters={%22timerange%22:%22ALL_TIME%22,%22collapsed%22:false,%22dataSource%22:%22base_app%22}&addAppUrl=true"
                target="_blank"
                className="text-emerald-400"
              >
                base.dev
              </Link>{" "}
              and login your base account
            </li>
            <li>
              Go vercel settings &gt; environment variables and ensure the{" "}
              <span className="font-semibold text-white">
                NEXT_PUBLIC_BASE_APP_ID
              </span>{" "}
              are matched
            </li>
            <li>Now you can monitor your app&apos;s performance</li>
          </ol>
        </div>
      </div>

      {/* Step 3: Publish */}
      <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-base-blue/20 flex items-center justify-center text-xs font-bold text-base-blue">
            3
          </div>
          <p className="text-sm font-semibold text-slate-200">
            Make your app public on Base
          </p>
        </div>
        <p className="text-sm text-base-muted ml-4 sm:ml-8">
          Share your mini-app link{" "}
          <code className="text-emerald-400 text-xs">
            {deployedUrl || "https://your-app.vercel.app"}
          </code>{" "}
          on the <strong className="text-white">Base app</strong> to make it
          searchable and visible to users.
        </p>
        <div className="ml-4 sm:ml-8 space-y-2 text-sm text-slate-300">
          <ol className="list-decimal list-inside space-y-1.5 text-base-muted">
            <li>
              Open the <strong className="text-white">Base App</strong> on your
              mobile device or web
            </li>
            <li>
              Go to <strong className="text-white">Discover → Mini Apps</strong>
            </li>
            <li>
              Share your app&apos;s link in the{" "}
              <strong className="text-white">Base social feed</strong> as a cast
            </li>
            <li>
              Your app will become discoverable once community members interact
              with it
            </li>
          </ol>
        </div>
      </div>

      {/* Summary */}
      <div className="p-5 rounded-xl border border-base-border bg-base-card/50">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          What you completed
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Forked & deployed template to Vercel",
            "Verified ownership on Base",
            "Configured minikit.config.ts",
            "Pushed config to GitHub",
            "Verified account & metadata",
            "Tested in Base Preview",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
