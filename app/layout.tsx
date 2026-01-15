import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingShapes } from "@/components/ui/FloatingShapes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillsHunt - Discover AI Agent Skills",
  description: "Discover, share, and explore AI Agent Skills for Claude Code, Codex, and more. The Product Hunt for AI development skills.",
  keywords: ["AI", "Skills", "Claude", "Agent", "Development", "Anthropic", "MCP"],
  openGraph: {
    title: "SkillsHunt - Discover AI Agent Skills",
    description: "The Product Hunt for AI Agent Skills",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FloatingShapes />
        <div className="relative z-10">
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
