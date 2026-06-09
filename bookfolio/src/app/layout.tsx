import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-cormorant",
  style: ['normal', 'italic']
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bookfolio - 3D Page-Flip Web Portfolio",
  description: "3D Interactive Portfolio Codex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="h-screen w-screen overflow-hidden flex flex-col justify-between select-none relative font-body bg-[var(--bg-gradient)] text-[var(--text-color)]">
        {/* Ambient Light Studio Workspace Overlay */}
        <div className="ambient-glow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)] pointer-events-none z-0"></div>
        {children}
      </body>
    </html>
  );
}
