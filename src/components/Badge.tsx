"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type BadgeVariant = "default" | "success" | "error" | "warning" | "info" | "brand" | "outline";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    background: "var(--bg-surface-muted)",
    color: "var(--fg-default)",
  },
  success: {
    background: "var(--color-success-bg)",
    color: "var(--color-success)",
  },
  error: {
    background: "var(--color-error-bg)",
    color: "var(--color-error)",
  },
  warning: {
    background: "var(--color-warning-bg)",
    color: "var(--color-warning)",
  },
  info: {
    background: "var(--color-info-bg)",
    color: "var(--color-info)",
  },
  brand: {
    background: "var(--bg-surface-brand)",
    color: "var(--fg-on-brand)",
  },
  outline: {
    background: "transparent",
    color: "var(--fg-default)",
    border: "var(--border-width-thin) solid var(--border-default)",
  },
};

const sizeStyles: Record<BadgeSize, React.CSSProperties> = {
  sm: {
    padding: "1px var(--space-1-5)",
    fontSize: "var(--text-xs)",
  },
  md: {
    padding: "var(--space-0-5) var(--space-2)",
    fontSize: "var(--text-xs)",
  },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "default", size = "md", children, style, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        lineHeight: "var(--leading-snug)",
        borderRadius: "var(--radius-full)",
        whiteSpace: "nowrap",
        border: "none",
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
});
