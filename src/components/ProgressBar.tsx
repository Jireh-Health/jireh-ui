"use client";

import { forwardRef, type HTMLAttributes } from "react";

export type ProgressBarVariant = "default" | "success" | "error";
export type ProgressBarSize = "sm" | "md";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  label?: string;
  variant?: ProgressBarVariant;
  indeterminate?: boolean;
  size?: ProgressBarSize;
}

const fillColors: Record<ProgressBarVariant, string> = {
  default: "var(--interactive-default)",
  success: "var(--color-success)",
  error: "var(--color-error)",
};

const sizeHeights: Record<ProgressBarSize, string> = {
  sm: "4px",
  md: "8px",
};

const indeterminateKeyframes = `
@keyframes jireh-progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}
`;

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value = 0, label, variant = "default", indeterminate = false, size = "md", style, ...rest },
  ref,
) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div ref={ref} style={style} {...rest}>
      {indeterminate && <style>{indeterminateKeyframes}</style>}
      {label && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "var(--space-1)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--fg-default)",
          }}
        >
          <span>{label}</span>
          {!indeterminate && (
            <span style={{ fontSize: "var(--text-xs)", color: "var(--fg-muted)" }}>
              {clampedValue}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || "Progress"}
        style={{
          width: "100%",
          height: sizeHeights[size],
          background: "var(--bg-surface-muted)",
          borderRadius: "var(--radius-full)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "var(--radius-full)",
            background: fillColors[variant],
            transition: indeterminate ? "none" : `width var(--duration-moderate) var(--ease-default)`,
            ...(indeterminate
              ? {
                  width: "40%",
                  animation: "jireh-progress-indeterminate 1.5s ease-in-out infinite",
                }
              : {
                  width: `${clampedValue}%`,
                }),
          }}
        />
      </div>
    </div>
  );
});
