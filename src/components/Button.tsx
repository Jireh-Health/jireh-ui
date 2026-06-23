"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "outline" | "bubblegum" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--interactive-default)",
    color: "var(--fg-on-brand)",
    border: "none",
  },
  secondary: {
    background: "var(--bg-surface-muted)",
    color: "var(--fg-default)",
    border: "none",
  },
  ghost: {
    background: "transparent",
    color: "var(--fg-default)",
    border: "var(--border-width-thin) solid transparent",
  },
  destructive: {
    background: "var(--color-error)",
    color: "#FFFFFF",
    border: "none",
  },
  outline: {
    background: "transparent",
    color: "var(--fg-default)",
    border: "var(--border-width-thin) solid var(--border-default)",
  },
  bubblegum: {
    background: "var(--color-bubblegum-light)",
    color: "var(--color-jireh-purple-dark)",
    border: "none",
  },
  link: {
    background: "transparent",
    color: "var(--fg-link)",
    border: "none",
    padding: "0",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { height: "32px", padding: "0 var(--space-3)", fontSize: "var(--text-xs)" },
  md: { height: "36px", padding: "0 var(--space-4)", fontSize: "var(--text-sm)" },
  lg: { height: "40px", padding: "0 var(--space-8)", fontSize: "var(--text-sm)" },
  icon: { height: "36px", width: "36px", padding: "0", fontSize: "var(--text-sm)" },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading, disabled, iconLeft, iconRight, children, style, ...rest },
  ref,
) {
  const isLink = variant === "link";
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-2)",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        borderRadius: isLink ? "0" : "var(--radius-md)",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : loading ? 0.75 : 1,
        transition: `background var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default)`,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        ...variantStyles[variant],
        ...(isLink ? {} : sizeStyles[size]),
        ...style,
      }}
      {...rest}
    >
      {loading && <Spinner />}
      {!loading && iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
});

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: "jireh-spin 0.6s linear infinite" }}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <style>{`@keyframes jireh-spin { to { transform: rotate(360deg) } }`}</style>
    </svg>
  );
}
