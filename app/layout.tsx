import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Base Mini-App Builder",
  description:
    "The easiest way to build, configure and deploy Base mini-apps. Step-by-step wizard with live config preview and one-click Vercel deployment.",
  openGraph: {
    title: "Base Mini-App Builder",
    description: "Build and deploy Base mini-apps in minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-base-dark text-white antialiased">{children}</body>
    </html>
  );
}
