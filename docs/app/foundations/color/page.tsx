"use client";

import type { Metadata } from "next";

const brandColors = [
  { name: "--color-jireh-purple", hex: "#A020F0", label: "Jireh Purple" },
  { name: "--color-jireh-purple-dark", hex: "#7B18B8", label: "Purple Dark" },
  { name: "--color-jireh-purple-darker", hex: "#5A1188", label: "Purple Darker" },
  { name: "--color-bubblegum", hex: "#E0A0FF", label: "Bubblegum" },
  { name: "--color-bubblegum-light", hex: "#F5E0FF", label: "Bubblegum Light" },
  { name: "--color-bubblegum-lightest", hex: "#FBF0FF", label: "Bubblegum Lightest" },
  { name: "--color-jireh-green", hex: "#A8FF95", label: "Jireh Green" },
  { name: "--color-jireh-green-dark", hex: "#2D7A3A", label: "Green Dark" },
];

const statusColors = [
  { name: "--color-error-red", hex: "#DC2626", label: "Error" },
  { name: "--color-success-green", hex: "#16A34A", label: "Success" },
  { name: "--color-warning-orange", hex: "#EA580C", label: "Warning" },
  { name: "--color-info-blue", hex: "#2563EB", label: "Info" },
];

const neutralColors = [
  { name: "--color-gray-50", hex: "#F9FAFB" },
  { name: "--color-gray-100", hex: "#F3F4F6" },
  { name: "--color-gray-200", hex: "#E5E7EB" },
  { name: "--color-gray-300", hex: "#D1D5DB" },
  { name: "--color-gray-400", hex: "#9CA3AF" },
  { name: "--color-gray-500", hex: "#6B7280" },
  { name: "--color-gray-600", hex: "#4B5563" },
  { name: "--color-gray-700", hex: "#374151" },
  { name: "--color-gray-800", hex: "#1F2937" },
  { name: "--color-gray-900", hex: "#111827" },
  { name: "--color-gray-950", hex: "#030712" },
];

function Swatch({ color, label, token }: { color: string; label: string; token: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
      <div
        style={{
          width: "100%",
          height: "64px",
          borderRadius: "var(--radius-md)",
          background: color,
          border: "1px solid var(--border-default)",
        }}
      />
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--fg-default)" }}>
        {label}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--fg-muted)" }}>
        {token}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--fg-subtle)" }}>
        {color}
      </span>
    </div>
  );
}

export default function ColorPage() {
  return (
    <div style={{ maxWidth: "64rem" }}>
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
        Color
      </h1>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.125rem", color: "var(--fg-muted)", maxWidth: "42.5rem", marginBottom: "2.5rem", lineHeight: 1.55 }}>
        Jireh&apos;s color system uses a purple primary — vibrant and distinctive in the
        healthcare space — with bubblegum pink as a playful secondary. Status colors follow
        universal conventions. All colors are available as CSS custom properties.
      </p>

      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "1.5rem",
          color: "var(--fg-heading)",
          marginBottom: "1rem",
          marginTop: "2rem",
        }}
      >
        Brand
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "var(--space-4)", marginBottom: "2.5rem" }}>
        {brandColors.map((c) => (
          <Swatch key={c.name} color={c.hex} label={c.label} token={c.name} />
        ))}
      </div>

      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "1.5rem",
          color: "var(--fg-heading)",
          marginBottom: "1rem",
          marginTop: "2rem",
        }}
      >
        Status
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "var(--space-4)", marginBottom: "2.5rem" }}>
        {statusColors.map((c) => (
          <Swatch key={c.name} color={c.hex} label={c.label} token={c.name} />
        ))}
      </div>

      <h2
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "1.5rem",
          color: "var(--fg-heading)",
          marginBottom: "1rem",
          marginTop: "2rem",
        }}
      >
        Neutrals
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "var(--space-3)", marginBottom: "2.5rem" }}>
        {neutralColors.map((c) => (
          <Swatch key={c.name} color={c.hex} label={c.name.replace("--color-", "")} token={c.name} />
        ))}
      </div>
    </div>
  );
}
