"use client";

import { useState, useEffect } from "react";
import { MiniAppConfig, PRIMARY_CATEGORIES } from "@/lib/types";
import { generateMiniKitConfigWithAssociation } from "@/lib/generateConfig";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  FileCode2,
  Github,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

interface StepThreeProps {
  config: MiniAppConfig;
  onChange: (key: keyof MiniAppConfig, value: string) => void;
  header: string;
  payload: string;
  signature: string;
  deployedUrl: string;
  onPushSuccess: () => void;
}

/** Accepts full GitHub URLs or owner/repo — returns owner/repo */
function normalizeRepo(input: string): string {
  return input
    .trim()
    .replace(/^https?:\/\/github\.com\//, "")
    .replace(/\.git$/, "")
    .replace(/\/$/, "");
}

async function pushToGitHub(
  token: string,
  rawRepo: string,
  content: string,
): Promise<{ ok: boolean; message: string }> {
  const repo = normalizeRepo(rawRepo);
  if (!repo.includes("/")) {
    return {
      ok: false,
      message: `Invalid repo "${repo}" — expected owner/repository-name`,
    };
  }
  try {
    // 1. Get current file SHA
    const getRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/minikit.config.ts`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
        },
      },
    );
    if (!getRes.ok) {
      const err = (await getRes.json()) as { message?: string };
      return {
        ok: false,
        message:
          err.message ||
          `GitHub API error (${getRes.status}) — check your token and repo name`,
      };
    }
    const fileData = (await getRes.json()) as { sha: string };
    const sha = fileData.sha;

    // 2. Update file
    const encoded = btoa(unescape(encodeURIComponent(content)));
    const putRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/minikit.config.ts`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "feat: update minikit.config.ts with account association",
          content: encoded,
          sha,
        }),
      },
    );
    if (!putRes.ok) {
      const err = (await putRes.json()) as { message?: string };
      return {
        ok: false,
        message: err.message || `GitHub API error (${putRes.status})`,
      };
    }
    return {
      ok: true,
      message: `✓ Pushed minikit.config.ts to ${repo}! Vercel will redeploy automatically.`,
    };
  } catch (e) {
    const msg =
      e instanceof TypeError && e.message === "Failed to fetch"
        ? "Network error — check your internet connection or that the token has 'repo' scope"
        : (e as Error).message;
    return { ok: false, message: `Error: ${msg}` };
  }
}

export function StepThree({
  config,
  onChange,
  header,
  payload,
  signature,
  deployedUrl,
  onPushSuccess,
}: StepThreeProps) {
  const [githubToken, setGithubToken] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [pushing, setPushing] = useState(false);
  const [pushResult, setPushResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  // Track the exact content that was last successfully pushed
  const [lastPushedContent, setLastPushedContent] = useState("");

  const updatedConfig = { ...config, appUrl: deployedUrl || config.appUrl };
  const generatedCode = generateMiniKitConfigWithAssociation(
    updatedConfig,
    header,
    payload,
    signature,
  );

  const alreadyPushed =
    lastPushedContent !== "" && generatedCode === lastPushedContent;

  const handlePush = async () => {
    if (!githubToken || !githubRepo) return;
    setPushing(true);
    setPushResult(null);
    const result = await pushToGitHub(githubToken, githubRepo, generatedCode);
    setPushResult(result);
    if (result.ok) {
      setLastPushedContent(generatedCode);
      onPushSuccess();
    }
    setPushing(false);
  };

  // Auto-populate URL fields from deployedUrl (only if still at placeholder default)
  useEffect(() => {
    if (!deployedUrl.startsWith("https://")) return;
    const base = deployedUrl.replace(/\/$/, "");
    const defaults: Array<[keyof MiniAppConfig, string]> = [
      ["iconUrl", `${base}/image.png`],
      ["splashImageUrl", `${base}/image.png`],
      ["heroImageUrl", `${base}/image.png`],
      ["webhookUrl", `${base}/api/webhook`],
      ["ogImageUrl", `${base}/image.png`],
    ];
    defaults.forEach(([key, value]) => {
      // Only fill if field is empty OR still has the generic placeholder text
      const current = config[key];
      if (
        !current ||
        current === "" ||
        current.startsWith("https://your-app.vercel.app")
      ) {
        onChange(key, value);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deployedUrl]);

  // Sync ogTitle with appName and ogDescription with description
  useEffect(() => {
    onChange("ogTitle", config.appName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.appName]);

  useEffect(() => {
    onChange("ogDescription", config.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.description]);

  const missingAssociation = !header || !payload || !signature;

  return (
    <div className="animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
          <FileCode2 className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Configure minikit.config.ts</h2>
          <p className="text-sm text-base-muted">
            Fill in app metadata, then push your config to GitHub
          </p>
        </div>
      </div>

      {missingAssociation && (
        <div className="flex gap-3 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 mb-6">
          <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-300">
            Complete Step 2 first — you need the <strong>header</strong>,{" "}
            <strong>payload</strong>, and <strong>signature</strong> from Base
            verification before configuring.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-base-border bg-base-card/50">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">
              Account Association
            </h3>
            <div className="space-y-2">
              {[
                { label: "header", value: header },
                { label: "payload", value: payload },
                { label: "signature", value: signature },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex gap-2 p-2.5 rounded-lg bg-[#060c1a] border border-base-border"
                >
                  <span className="text-xs font-mono text-purple-400 flex-shrink-0 w-20">
                    {label}:
                  </span>
                  <span className="text-xs font-mono text-slate-400 break-all">
                    {value ? (
                      `"${value.slice(0, 30)}..."`
                    ) : (
                      <span className="text-red-400">
                        missing — complete Step 2
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-base-border bg-base-card/50">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">
              App Info
            </h3>
            <div className="space-y-3">
              <FormField
                label="App Name"
                id="appName"
                value={config.appName}
                onChange={(v) => onChange("appName", v)}
                placeholder="My Base Mini-App"
                required
              />
              <FormField
                label="Subtitle"
                id="subtitle"
                value={config.subtitle}
                onChange={(v) => onChange("subtitle", v)}
                placeholder="A short one-liner"
                required
              />
              <FormField
                label="Description"
                id="description"
                value={config.description}
                onChange={(v) => onChange("description", v)}
                placeholder="What does your app do?"
                required
              />
              <FormField
                label="Tagline"
                id="tagline"
                value={config.tagline}
                onChange={(v) => onChange("tagline", v)}
                placeholder="Catchy tagline"
                hint="E.g. Play instantly, Save instantly"
                required
              />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-base-border bg-base-card/50">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">
              URLs & Assets
            </h3>
            <div className="space-y-3">
              <FormField
                label="App URL"
                id="appUrl"
                value={deployedUrl || config.appUrl}
                onChange={(v) => onChange("appUrl", v)}
                placeholder="https://your-app.vercel.app"
                hint="Auto-filled from Step 1"
                required
              />
              <FormField
                label="Icon URL"
                id="iconUrl"
                value={config.iconUrl}
                onChange={(v) => onChange("iconUrl", v)}
                placeholder="https://your-app.vercel.app/icon.png"
                required
              />
              <FormField
                label="Splash Image URL"
                id="splashImageUrl"
                value={config.splashImageUrl}
                onChange={(v) => onChange("splashImageUrl", v)}
                placeholder="https://your-app.vercel.app/splash.png"
                required
              />
              <FormField
                label="Hero Image URL"
                id="heroImageUrl"
                value={config.heroImageUrl}
                onChange={(v) => onChange("heroImageUrl", v)}
                placeholder="https://your-app.vercel.app/hero.png"
                required
              />
              <FormField
                label="Webhook URL"
                id="webhookUrl"
                value={config.webhookUrl}
                onChange={(v) => onChange("webhookUrl", v)}
                placeholder="https://your-app.vercel.app/api/webhook"
                required
              />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-base-border bg-base-card/50">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">
              Category & Tags
            </h3>
            <div className="space-y-3">
              <FormField
                label="Splash Background Color"
                id="splashBg"
                value={config.splashBackgroundColor}
                onChange={(v) => onChange("splashBackgroundColor", v)}
                type="color"
                required
              />
              <SelectField
                label="Primary Category"
                id="primaryCategory"
                value={config.primaryCategory}
                onChange={(v) => onChange("primaryCategory", v)}
                options={PRIMARY_CATEGORIES}
              />
              <FormField
                label="Tags"
                id="tags"
                value={config.tags}
                onChange={(v) => onChange("tags", v)}
                placeholder="base, miniapp, defi"
                hint="Comma-separated. e.g. example, miniapp, baseapp, finance, marketing, ads, quickstart, waitlist, basecamp"
                required
              />
            </div>
          </div>

          {/* OG / Social */}
          <div className="p-4 rounded-xl border border-base-border bg-base-card/50">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">
              Open Graph (Social Preview)
            </h3>
            <div className="space-y-3">
              <FormField
                label="OG Title"
                id="ogTitle"
                value={config.ogTitle}
                onChange={(v) => onChange("ogTitle", v)}
                placeholder={config.appName || "e.g. My Base App"}
                hint="Auto-synced with App Name."
                required
              />
              <FormField
                label="OG Description"
                id="ogDescription"
                value={config.ogDescription}
                onChange={(v) => onChange("ogDescription", v)}
                placeholder={config.description || "e.g. A Base mini-app"}
                hint="Auto-synced with Description."
                required
              />

              <FormField
                label="OG Image URL"
                id="ogImageUrl"
                value={config.ogImageUrl}
                onChange={(v) => onChange("ogImageUrl", v)}
                placeholder="https://your-app.vercel.app/og.png"
                required
              />
            </div>
          </div>
        </div>

        {/* Right: Preview + Push */}
        <div className="space-y-4">
          <div className="sticky top-6 space-y-4">
            <p className="text-xs text-base-muted font-medium uppercase tracking-wider">
              Generated Config
            </p>
            <CodeBlock
              code={generatedCode}
              filename="minikit.config.ts"
              language="typescript"
            />

            {/* GitHub push */}
            <div className="p-5 rounded-xl border border-base-border bg-base-card/50 space-y-4">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-white" />
                <p className="text-sm font-semibold text-white">
                  Push to GitHub
                </p>
              </div>
              <p className="text-xs text-base-muted leading-relaxed">
                Provide a GitHub Personal Access Token (PAT) with{" "}
                <strong className="text-white">repo</strong> scope to
                automatically update{" "}
                <code className="text-purple-400 text-xs">
                  minikit.config.ts
                </code>{" "}
                in your forked repo.
              </p>
              <div className="space-y-3">
                <FormField
                  label="GitHub Repo"
                  id="github-repo"
                  value={githubRepo}
                  onChange={setGithubRepo}
                  placeholder="https://github.com/username/my-mini-app"
                  hint={
                    githubRepo
                      ? `Will use: ${normalizeRepo(githubRepo)}`
                      : "Paste full GitHub URL or owner/repository-name"
                  }
                />
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="github-token"
                    className="text-sm font-medium text-slate-300"
                  >
                    Personal Access Token
                  </label>
                  <input
                    id="github-token"
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-lg border border-base-border bg-base-card text-white
                      text-sm placeholder:text-base-muted/50 focus:outline-none focus:border-base-blue/60
                      transition-colors hover:border-base-border/80 font-mono"
                  />
                  <p className="text-xs text-base-muted">
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      Create a token here
                    </a>{" "}
                    with <code className="text-xs">repo</code> scope. It is
                    never stored.
                  </p>
                </div>
              </div>
              {alreadyPushed && (
                <div className="flex gap-2 p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-400">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Already pushed — change a field above to enable a new push.
                  </span>
                </div>
              )}
              <button
                onClick={handlePush}
                disabled={
                  !githubToken ||
                  !githubRepo ||
                  pushing ||
                  missingAssociation ||
                  alreadyPushed
                }
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-base-blue
                  hover:bg-blue-600 text-white text-sm font-bold transition-all hover:-translate-y-0.5
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {pushing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Pushing...
                  </>
                ) : (
                  <>
                    <Github className="w-4 h-4" />
                    {alreadyPushed
                      ? "No changes since last push"
                      : "Update minikit.config.ts to GitHub"}
                  </>
                )}
              </button>

              {pushResult && (
                <div
                  className={`flex gap-2 p-3 rounded-lg border text-sm ${
                    pushResult.ok
                      ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                      : "border-red-500/30 bg-red-500/5 text-red-300"
                  }`}
                >
                  {pushResult.ok ? (
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  )}
                  {pushResult.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
