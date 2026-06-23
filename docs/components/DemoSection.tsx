"use client";

import type { ReactNode } from "react";

export function DemoSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div id={id} style={{ marginBottom: "2.5rem", scrollMarginTop: "2rem" }}>
      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--fg-heading)",
          marginBottom: "var(--space-3)",
          lineHeight: 1.4,
        }}
      >
        {title}
      </h3>
      <div
        style={{
          padding: "var(--space-6)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-lg)",
          background: "var(--bg-surface)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  count,
}: {
  title: string;
  description: string;
  count: number;
}) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "var(--space-3)",
          marginBottom: "var(--space-2)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "var(--fg-heading)",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--fg-muted)",
          }}
        >
          {count} component{count !== 1 ? "s" : ""}
        </span>
      </div>
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
        {description}
      </p>
    </div>
  );
}
