import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { DocShell } from "@/components/DocShell";
import { DevTools } from "@/components/DevTools";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "Jireh UI — Design System",
    template: "%s — Jireh UI",
  },
  description:
    "The design system for Jireh Health digital products. Tokens, components, and patterns for the healthcare financing platform.",
};

const fontVars = [inter.variable, jetbrainsMono.variable].join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('jireh-ui-theme');var r=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light';document.documentElement.setAttribute('data-theme',r)}catch(e){}})()`,
          }}
        />
      </head>
      <body
        style={{
          minHeight: "100vh",
          background: "var(--bg-page)",
          color: "var(--fg-default)",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <DocShell>{children}</DocShell>
        <DevTools />
      </body>
    </html>
  );
}
