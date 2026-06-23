import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typography",
};

const sizes = [
  { token: "--text-xs", value: "0.75rem", sample: "Extra small — fine print and labels" },
  { token: "--text-sm", value: "0.875rem", sample: "Small — captions and helper text" },
  { token: "--text-base", value: "1rem", sample: "Base — default body text" },
  { token: "--text-lg", value: "1.125rem", sample: "Large — emphasized body text" },
  { token: "--text-xl", value: "1.25rem", sample: "Extra large — small headings" },
  { token: "--text-2xl", value: "1.5rem", sample: "2XL — section headings" },
  { token: "--text-3xl", value: "1.875rem", sample: "3XL — page headings" },
  { token: "--text-4xl", value: "2.25rem", sample: "4XL — display headings" },
];

const weights = [
  { token: "--weight-regular", value: "400", label: "Regular" },
  { token: "--weight-medium", value: "500", label: "Medium" },
  { token: "--weight-semibold", value: "600", label: "Semibold" },
  { token: "--weight-bold", value: "700", label: "Bold" },
];

export default function TypographyPage() {
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
        Typography
      </h1>
      <p style={{ fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2.5rem" }}>
        Jireh uses Inter as its primary typeface — clean, legible, and optimized for
        UI at small sizes. JetBrains Mono is used for code and monospaced content.
      </p>

      <h2>Font families</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", marginBottom: "2.5rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-2xl)", fontWeight: 600, color: "var(--fg-heading)", marginBottom: "var(--space-1)" }}>
            Inter — Sans serif
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--fg-muted)" }}>
            --font-sans
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-2xl)", fontWeight: 500, color: "var(--fg-heading)", marginBottom: "var(--space-1)" }}>
            JetBrains Mono — Monospace
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--fg-muted)" }}>
            --font-mono
          </p>
        </div>
      </div>

      <h2>Type scale</h2>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Size</th>
            <th>Sample</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((s) => (
            <tr key={s.token}>
              <td><code>{s.token}</code></td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)" }}>{s.value}</td>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: s.value }}>{s.sample}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Font weights</h2>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Sample</th>
          </tr>
        </thead>
        <tbody>
          {weights.map((w) => (
            <tr key={w.token}>
              <td><code>{w.token}</code></td>
              <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)" }}>{w.value}</td>
              <td style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", fontWeight: parseInt(w.value) }}>
                {w.label} — The quick brown fox jumps over the lazy dog
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
