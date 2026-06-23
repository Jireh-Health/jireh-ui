"use client";

import { type HTMLAttributes, type ReactNode } from "react";

export interface SuccessBlockProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  message?: string;
  action?: ReactNode;
}

function SuccessIcon() {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "var(--radius-full)",
        background: "var(--color-success-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 12L10 16L18 8"
          stroke="var(--color-success)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function SuccessBlock({
  title,
  message,
  action,
  style,
  ...rest
}: SuccessBlockProps) {
  return (
    <div
      role="status"
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
      <SuccessIcon />
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
      {action}
    </div>
  );
}
