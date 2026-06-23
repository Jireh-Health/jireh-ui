"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { title, description, action, icon, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--space-10) var(--space-6)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {icon && (
        <div
          style={{
            marginBottom: "var(--space-4)",
            color: "var(--fg-muted)",
          }}
        >
          {icon}
        </div>
      )}
      <h3
        style={{
          fontSize: "var(--text-lg)",
          fontWeight: 600,
          color: "var(--fg-heading)",
          margin: 0,
          lineHeight: "var(--leading-tight)",
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--fg-muted)",
            marginTop: "var(--space-2)",
            maxWidth: "320px",
            lineHeight: "var(--leading-normal)",
          }}
        >
          {description}
        </p>
      )}
      {action && (
        <div style={{ marginTop: "var(--space-5)" }}>
          {action}
        </div>
      )}
    </div>
  );
});
