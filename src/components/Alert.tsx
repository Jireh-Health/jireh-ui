"use client";

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  children: ReactNode;
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; color: string }> = {
  info: {
    bg: "var(--color-info-bg)",
    border: "var(--color-info)",
    color: "var(--color-info)",
  },
  success: {
    bg: "var(--color-success-bg)",
    border: "var(--color-success)",
    color: "var(--color-success)",
  },
  warning: {
    bg: "var(--color-warning-bg)",
    border: "var(--color-warning)",
    color: "var(--color-warning)",
  },
  error: {
    bg: "var(--color-error-bg)",
    border: "var(--color-error)",
    color: "var(--color-error)",
  },
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = "info", title, dismissible = false, children, style, ...rest },
  ref,
) {
  const [dismissed, setDismissed] = useState(false);
  const colors = variantStyles[variant];

  if (dismissed) return null;

  return (
    <div
      ref={ref}
      role="alert"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-4)",
        background: colors.bg,
        borderLeft: `3px solid ${colors.border}`,
        borderRadius: "var(--radius-md)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        lineHeight: "var(--leading-normal)",
        color: "var(--fg-default)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div
            style={{
              fontWeight: 600,
              fontSize: "var(--text-sm)",
              color: colors.color,
              marginBottom: "var(--space-1)",
            }}
          >
            {title}
          </div>
        )}
        <div>{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            width: "20px",
            height: "20px",
            background: "transparent",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            color: "var(--fg-muted)",
            padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
});
