import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting started",
};

export default function GettingStartedPage() {
  return (
    <div className="doc-prose" style={{ maxWidth: "64rem" }}>
      <h1
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "2.25rem",
          fontWeight: 700,
          lineHeight: 1.15,
          color: "var(--fg-heading)",
          marginBottom: "0.75rem",
        }}
      >
        Getting started
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2.5rem" }}>
        Install the design system, import the tokens, and start using components in minutes.
      </p>

      <h2>Installation</h2>
      <pre><code>{`npm install @jireh-health/ui`}</code></pre>

      <h2>Import tokens</h2>
      <p>
        Import the CSS tokens at the root of your application. This provides all design
        tokens as CSS custom properties.
      </p>
      <pre><code>{`// In your root CSS file or layout
import "@jireh-health/ui/tokens";`}</code></pre>

      <h2>Use components</h2>
      <p>
        Import components individually for tree-shaking or from the components barrel.
      </p>
      <pre><code>{`// Tree-shakeable individual imports (recommended)
import { Button } from "@jireh-health/ui/components/Button";
import { Card, CardHeader } from "@jireh-health/ui/components/Card";

// Or import from the barrel
import { Button, Card, CardHeader } from "@jireh-health/ui";`}</code></pre>

      <h2>Tailwind CSS preset</h2>
      <p>
        If your project uses Tailwind CSS, import the preset to map all design tokens
        to utility classes.
      </p>
      <pre><code>{`// tailwind.config.ts
import jirehPreset from "@jireh-health/ui/tailwind-preset";

export default {
  presets: [jirehPreset],
  content: ["./src/**/*.{ts,tsx}"],
};`}</code></pre>

      <h2>Theme support</h2>
      <p>
        The design system supports light and dark modes via the <code>data-theme</code> attribute
        on the <code>&lt;html&gt;</code> element. Use the <code>ThemeProvider</code> for automatic
        theme management.
      </p>
      <pre><code>{`import { ThemeProvider } from "@jireh-health/ui";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  );
}`}</code></pre>
    </div>
  );
}
