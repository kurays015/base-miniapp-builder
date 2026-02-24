import { MiniAppConfig } from "./types";

export function generateMiniKitConfigWithAssociation(
  config: MiniAppConfig,
  header: string,
  payload: string,
  signature: string,
): string {
  const tags = config.tags
    .split(",")
    .map((t) => `"${t.trim()}"`)
    .join(", ");

  return `const ROOT_URL = "${config.appUrl}";

export const minikitConfig = {
  accountAssociation: {
    header: "${header}",
    payload: "${payload}",
    signature: "${signature}",
  },
  miniapp: {
    version: "1",
    name: "${config.appName}",
    subtitle: "${config.subtitle}",
    description: "${config.description}",
    screenshotUrls: ["${config.appUrl}/image.png"],
    iconUrl: "${config.iconUrl}",
    splashImageUrl: "${config.splashImageUrl}",
    splashBackgroundColor: "${config.splashBackgroundColor}",
    homeUrl: ROOT_URL,
    webhookUrl: "${config.webhookUrl}",
    primaryCategory: "${config.primaryCategory}",
    tags: [${tags}],
    heroImageUrl: "${config.heroImageUrl}",
    tagline: "${config.tagline}",
    ogTitle: "${config.ogTitle || config.appName}",
    ogDescription: "${config.ogDescription || config.description}",
    ogImageUrl: "${config.ogImageUrl}",
    "noindex": true

  },
} as const;
`;
}
