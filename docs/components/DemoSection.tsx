"use client";

import { useState, type ReactNode } from "react";

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: "var(--space-3)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--border-default)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "var(--space-2) var(--space-3)",
          background: "var(--bg-surface-muted)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--fg-muted)",
            fontWeight: 500,
          }}
        >
          Usage
        </span>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--fg-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 6px",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: "var(--space-3)",
          background: "var(--bg-surface)",
          overflowX: "auto",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          lineHeight: 1.6,
          color: "var(--fg-default)",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function DemoSection({
  id,
  title,
  usage,
  children,
}: {
  id?: string;
  title: string;
  usage?: string;
  children: ReactNode;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div id={id} style={{ marginBottom: "2.5rem", scrollMarginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--space-3)" }}>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--fg-heading)",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {title}
        </h3>
        {usage && (
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--fg-muted)",
              background: "none",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-sm)",
              padding: "2px 8px",
              cursor: "pointer",
            }}
          >
            {showCode ? "Hide code" : "Show code"}
          </button>
        )}
      </div>
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
      {usage && showCode && <CodeBlock code={usage} />}
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
