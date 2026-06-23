"use client";

import { type HTMLAttributes } from "react";

export interface ErrorBlockProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

function ErrorIcon() {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "var(--radius-full)",
        background: "var(--color-error-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="var(--color-error)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function ErrorBlock({
  title = "Something went wrong",
  message,
  onRetry,
  style,
  ...rest
}: ErrorBlockProps) {
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--space-12) var(--space-6)",
        gap: "var(--space-4)",
        minHeight: 240,
        ...style,
      }}
      {...rest}
    >
      <ErrorIcon />
      <div>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-lg)",
            fontWeight: 600,
            color: "var(--fg-heading)",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
        {message && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              color: "var(--fg-muted)",
              margin: "var(--space-2) 0 0",
              lineHeight: 1.5,
              maxWidth: 360,
            }}
          >
            {message}
          </p>
        )}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 36,
            padding: "0 var(--space-4)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: 500,
            color: "var(--fg-on-brand)",
            background: "var(--interactive-default)",
            border: "none",
            borderRadius: "var(--radius-md)",
            cursor: "pointer",
            transition: `background var(--duration-fast) var(--ease-default)`,
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
