"use client";

import { useEffect, useCallback, forwardRef, type HTMLAttributes } from "react";

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  message: string;
  variant?: ToastVariant;
  action?: ToastAction;
  duration?: number;
  onDismiss?: () => void;
}

const variantBorder: Record<ToastVariant, string> = {
  info: "var(--color-info)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { message, variant = "info", action, duration = 4000, onDismiss, style, ...rest },
  ref,
) {
  const handleDismiss = useCallback(() => {
    onDismiss?.();
  }, [onDismiss]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleDismiss]);

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "var(--space-6)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "var(--z-toast)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        minWidth: "280px",
        maxWidth: "420px",
        padding: "var(--space-3) var(--space-4)",
        background: "var(--bg-surface)",
        borderRadius: "var(--radius-md)",
        borderLeft: `3px solid ${variantBorder[variant]}`,
        boxShadow: "var(--shadow-lg)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        color: "var(--fg-default)",
        lineHeight: "var(--leading-normal)",
        ...style,
      }}
      {...rest}
    >
      <span style={{ flex: 1, minWidth: 0 }}>{message}</span>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          style={{
            flexShrink: 0,
            background: "transparent",
            border: "none",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            color: "var(--interactive-default)",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {action.label}
        </button>
      )}
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={handleDismiss}
          style={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
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
