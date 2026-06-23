import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spacing",
};

const spacingTokens = [
  { token: "--space-0-5", value: "2px" },
  { token: "--space-1", value: "4px" },
  { token: "--space-1-5", value: "6px" },
  { token: "--space-2", value: "8px" },
  { token: "--space-3", value: "12px" },
  { token: "--space-4", value: "16px" },
  { token: "--space-5", value: "20px" },
  { token: "--space-6", value: "24px" },
  { token: "--space-8", value: "32px" },
  { token: "--space-10", value: "40px" },
  { token: "--space-12", value: "48px" },
  { token: "--space-16", value: "64px" },
  { token: "--space-20", value: "80px" },
  { token: "--space-24", value: "96px" },
];

export default function SpacingPage() {
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
        Spacing
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2.5rem" }}>
        A base-4 spacing scale with fine 2px control for tight UI. All spacing values
        are available as CSS custom properties.
      </p>

      <h2>Scale</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        {spacingTokens.map((s) => (
          <div key={s.token} style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <div
              style={{
                width: s.value,
                height: "24px",
                background: "var(--interactive-default)",
                borderRadius: "var(--radius-sm)",
                flexShrink: 0,
              }}
            />
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", minWidth: "10rem" }}>{s.token}</code>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--fg-muted)" }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
