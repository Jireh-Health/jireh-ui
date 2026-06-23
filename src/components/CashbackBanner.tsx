"use client";

import { type HTMLAttributes, type ReactNode } from "react";

export interface CashbackBannerProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description: ReactNode;
  visible?: boolean;
  className?: string;
}

function SparkleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CashbackBanner({
  title = "Pay via Jireh and earn cashback!",
  description,
  visible = true,
  className,
  style,
  ...rest
}: CashbackBannerProps) {
  if (!visible) return null;

  return (
    <div
      className={className}
      role="banner"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        padding: "var(--space-4)",
        borderRadius: "var(--radius-lg)",
        background: "var(--color-success-bg)",
        color: "var(--color-success)",
        ...style,
      }}
      {...rest}
    >
      <SparkleIcon />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            color: "var(--color-success)",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {title}
        </p>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--color-success)",
            marginTop: "var(--space-1)",
            lineHeight: 1.5,
            opacity: 0.85,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
