"use client";

import { forwardRef, type HTMLAttributes } from "react";

export type LoaderSize = "sm" | "md" | "lg";

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: LoaderSize;
  label?: string;
}

const sizeMap: Record<LoaderSize, string> = {
  sm: "16",
  md: "24",
  lg: "32",
};

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(function Loader(
  { size = "md", label, style, ...rest },
  ref,
) {
  const dim = sizeMap[size];

  return (
    <div
      ref={ref}
      role="status"
      aria-label={label || "Loading"}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-2)",
        ...style,
      }}
      {...rest}
    >
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 24 24"
        fill="none"
        style={{ animation: "jireh-spin 0.7s linear infinite" }}
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="var(--color-bubblegum-light)"
          strokeWidth="3"
        />
        <path
          d="M22 12a10 10 0 0 0-10-10"
          stroke="var(--interactive-default)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <style>{`@keyframes jireh-spin { to { transform: rotate(360deg) } }`}</style>
      </svg>
      {label && (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-xs)",
            color: "var(--fg-muted)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
});
