"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type TagVariant = "default" | "brand";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  label: string;
  variant?: TagVariant;
  onRemove?: () => void;
}

const variantStyles: Record<TagVariant, React.CSSProperties> = {
  default: {
    background: "var(--bg-surface-muted)",
    color: "var(--fg-default)",
  },
  brand: {
    background: "var(--color-bubblegum-light)",
    color: "var(--color-jireh-purple-dark)",
  },
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { label, variant = "default", onRemove, style, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        padding: "var(--space-0-5) var(--space-2)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: 500,
        lineHeight: "var(--leading-snug)",
        borderRadius: "var(--radius-full)",
        whiteSpace: "nowrap",
        ...variantStyles[variant],
        ...style,
      }}
      {...rest}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "14px",
            height: "14px",
            background: "transparent",
            border: "none",
            borderRadius: "var(--radius-full)",
            cursor: "pointer",
            color: "inherit",
            padding: 0,
            opacity: 0.7,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path
              d="M7.5 2.5L2.5 7.5M2.5 2.5l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
});
