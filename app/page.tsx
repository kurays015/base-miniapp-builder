import Link from "next/link";
import {
  Rocket,
  Code2,
  Globe,
  CheckCircle,
  ArrowRight,
  Layers,
  Zap,
  Shield,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: <Code2 className="w-6 h-6" />,
    title: "Configure",
    desc: "Fill in your app metadata in the minikit.config.ts wizard — name, icons, categories, and URLs.",
  },
  {
    number: "02",
    icon: <Layers className="w-6 h-6" />,
    title: "Generate Files",
    desc: "Auto-generate your farcaster.json route and SDK initialization code. Copy with one click.",
  },
  {
    number: "03",
    icon: <Globe className="w-6 h-6" />,
    title: "Deploy",
    desc: "Push to GitHub and deploy to Vercel in one click. Your app goes live instantly.",
  },
  {
    number: "04",
    icon: <Shield className="w-6 h-6" />,
    title: "Verify",
    desc: "Verify ownership on base.dev/preview and paste the account association back into your config.",
  },
];

const FEATURES = [
  {
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    label: "Live config preview",
  },
  {
    icon: <Code2 className="w-5 h-5 text-base-blue" />,
    label: "One-click code generation",
  },
  {
    icon: <Globe className="w-5 h-5 text-green-400" />,
    label: "Vercel deploy integration",
  },
  {
    icon: <Shield className="w-5 h-5 text-purple-400" />,
    label: "Account association guide",
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    label: "Step-by-step wizard",
  },
  {
    icon: <Layers className="w-5 h-5 text-orange-400" />,
    label: "Template starter kits",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-base-dark overflow-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(30,45,80,0.4) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-base-blue/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Nav */}
        <nav className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-base-blue flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Base Builder
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://docs.base.org/builderkits/minikit/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-base-muted hover:text-white transition-colors"
            >
              Docs
            </a>
            <a
              href="https://www.base.dev/preview?tab=account"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-base-muted hover:text-white transition-colors"
            >
              Preview Tool
            </a>
            <Link
              href="/builder"
              className="px-4 py-2 bg-base-blue hover:bg-blue-600 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-base-blue/30 hover:-translate-y-0.5"
            >
              Start Building
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <div className="text-center mb-24 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-base-border bg-base-card text-xs text-base-muted mb-8">
            <span className="w-2 h-2 rounded-full bg-base-blue animate-pulse" />
            Built for Base Mini-App developers
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-none">
            Build Base <span className="gradient-text">Mini-Apps</span>
            <br />
            in Minutes
          </h1>

          <p className="text-base-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A guided wizard that takes you from zero to a fully deployed,
            verified Base mini-app. Configure, generate code, deploy to Vercel,
            and verify on Base — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/builder"
              className="group flex items-center gap-3 px-8 py-4 bg-base-blue hover:bg-blue-600 rounded-xl text-base font-semibold transition-all hover:shadow-2xl hover:shadow-base-blue/40 hover:-translate-y-1"
            >
              <Rocket className="w-5 h-5" />
              Start Building Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://github.com/coinbase/build-onchain-apps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-base-border hover:border-base-blue/50 text-base-muted hover:text-white transition-all text-base font-semibold hover:-translate-y-1"
            >
              <Code2 className="w-5 h-5" />
              View Templates
            </a>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-24 animate-slide-up">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-base-card border border-base-border text-sm font-medium"
            >
              {f.icon}
              {f.label}
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-3">How it works</h2>
          <p className="text-base-muted text-center mb-12">
            Four steps to a production-ready Base mini-app
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="relative group p-6 rounded-2xl border border-base-border bg-base-card hover:border-base-blue/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-base-blue/10 animated-border"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <div className="text-6xl font-black text-base-border/60 mb-4 group-hover:text-base-blue/20 transition-colors">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-base-blue/10 border border-base-blue/20 flex items-center justify-center text-base-blue mb-4 group-hover:bg-base-blue/20 transition-colors">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-base-muted text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-3xl border border-base-border bg-base-card p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-base-blue/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-base-blue/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4">
              Ready to build your mini-app?
            </h2>
            <p className="text-base-muted mb-8 text-lg">
              Follow the guided wizard and have your Base mini-app live in under
              10 minutes.
            </p>
            <Link
              href="/builder"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-base-blue hover:bg-blue-600 rounded-xl text-lg font-bold transition-all hover:shadow-2xl hover:shadow-base-blue/40 hover:-translate-y-1"
            >
              Launch Builder
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-base-muted text-sm">
          <p>
            Built for the Base ecosystem •{" "}
            <a
              href="https://docs.base.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-blue hover:text-white transition-colors"
            >
              Base Docs
            </a>{" "}
            •{" "}
            <a
              href="https://www.base.dev/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base-blue hover:text-white transition-colors"
            >
              Preview Tool
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
