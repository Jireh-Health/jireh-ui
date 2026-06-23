import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Foundations",
};

const foundations = [
  {
    title: "Color",
    href: "/foundations/color",
    description:
      "Brand palette, status colors, neutrals, and semantic mappings for light and dark mode.",
    preview: [
      { color: "#A020F0", label: "Jireh Purple" },
      { color: "#E0A0FF", label: "Bubblegum" },
      { color: "#A8FF95", label: "Jireh Green" },
      { color: "#2563EB", label: "Info" },
      { color: "#16A34A", label: "Success" },
      { color: "#EA580C", label: "Warning" },
      { color: "#DC2626", label: "Error" },
    ],
  },
  {
    title: "Typography",
    href: "/foundations/typography",
    description:
      "Type scale, font families (Inter for UI, JetBrains Mono for code), weights, and line heights.",
    samples: [
      { size: "2.25rem", weight: 700, text: "Display" },
      { size: "1.25rem", weight: 600, text: "Heading" },
      { size: "1rem", weight: 400, text: "Body text for reading" },
      { size: "0.875rem", weight: 400, text: "Small / captions" },
    ],
  },
  {
    title: "Spacing",
    href: "/foundations/spacing",
    description:
      "Base-4 spacing scale from 2px to 96px, used consistently across padding, margin, and gap.",
    steps: [
      { token: "1", px: 4 },
      { token: "2", px: 8 },
      { token: "3", px: 12 },
      { token: "4", px: 16 },
      { token: "6", px: 24 },
      { token: "8", px: 32 },
      { token: "12", px: 48 },
    ],
  },
];

export default function FoundationsPage() {
  return (
    <div style={{ maxWidth: "64rem" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "var(--fg-heading)",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Foundations
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            color: "var(--fg-muted)",
            maxWidth: "42rem",
            margin: 0,
          }}
        >
          The visual building blocks of the Jireh design system. Tokens define
          color, type, and spacing so every component and screen speaks the same
          language — across the patient app, provider portal, and internal tools.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.5rem",
        }}
      >
        {/* Color */}
        <Link
          href={foundations[0].href}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-6)",
              background: "var(--bg-surface)",
              transition:
                "box-shadow var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)",
            }}
            className="doc-card-link"
          >
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--fg-heading)",
                margin: 0,
                marginBottom: "var(--space-1)",
              }}
            >
              {foundations[0].title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                color: "var(--fg-muted)",
                margin: 0,
                marginBottom: "var(--space-4)",
                lineHeight: 1.5,
              }}
            >
              {foundations[0].description}
            </p>
            <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
              {foundations[0].preview?.map((c) => (
                <div
                  key={c.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "var(--radius-sm)",
                      background: c.color,
                      border: "1px solid var(--border-default)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--text-xs)",
                      color: "var(--fg-muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Link>

        {/* Typography */}
        <Link
          href={foundations[1].href}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-6)",
              background: "var(--bg-surface)",
              transition:
                "box-shadow var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)",
            }}
            className="doc-card-link"
          >
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--fg-heading)",
                margin: 0,
                marginBottom: "var(--space-1)",
              }}
            >
              {foundations[1].title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                color: "var(--fg-muted)",
                margin: 0,
                marginBottom: "var(--space-4)",
                lineHeight: 1.5,
              }}
            >
              {foundations[1].description}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-1)",
              }}
            >
              {foundations[1].samples?.map((s) => (
                <span
                  key={s.text}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: s.size,
                    fontWeight: s.weight,
                    color: "var(--fg-default)",
                    lineHeight: 1.3,
                  }}
                >
                  {s.text}
                </span>
              ))}
            </div>
          </div>
        </Link>

        {/* Spacing */}
        <Link
          href={foundations[2].href}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-6)",
              background: "var(--bg-surface)",
              transition:
                "box-shadow var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)",
            }}
            className="doc-card-link"
          >
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--fg-heading)",
                margin: 0,
                marginBottom: "var(--space-1)",
              }}
            >
              {foundations[2].title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                color: "var(--fg-muted)",
                margin: 0,
                marginBottom: "var(--space-4)",
                lineHeight: 1.5,
              }}
            >
              {foundations[2].description}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "var(--space-2)",
              }}
            >
              {foundations[2].steps?.map((s) => (
                <div
                  key={s.token}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--space-1)",
                  }}
                >
                  <div
                    style={{
                      width: s.px,
                      height: s.px,
                      borderRadius: "var(--radius-sm)",
                      background: "var(--color-jireh-purple)",
                      opacity: 0.2,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--fg-muted)",
                    }}
                  >
                    {s.px}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
