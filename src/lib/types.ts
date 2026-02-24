export interface MiniAppConfig {
  appName: string;
  subtitle: string;
  description: string;
  appUrl: string;
  iconUrl: string;
  splashImageUrl: string;
  splashBackgroundColor: string;
  webhookUrl: string;
  primaryCategory: string;
  tags: string;
  heroImageUrl: string;
  tagline: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
}

export const defaultConfig: MiniAppConfig = {
  appName: "My Base Mini-App",
  subtitle: "A Base Mini-App",
  description: "Built with Base Builder",
  appUrl: "https://your-app.vercel.app",
  iconUrl: "https://your-app.vercel.app/icon.png",
  splashImageUrl: "https://your-app.vercel.app/splash.png",
  splashBackgroundColor: "#000000",
  webhookUrl: "https://your-app.vercel.app/api/webhook",
  primaryCategory: "social",
  tags: "base, miniapp",
  heroImageUrl: "https://your-app.vercel.app/hero.png",
  tagline: "",
  ogTitle: "",
  ogDescription: "",
  ogImageUrl: "https://your-app.vercel.app/og.png",
};

export const PRIMARY_CATEGORIES = [
  "social",
  "defi",
  "gaming",
  "nft",
  "utility",
  "developer-tools",
  "education",
  "news",
  "finance",
  "art-creativity",
  "entertainment",
  "music",
  "sports",
  "news-media",
  "other",
];
