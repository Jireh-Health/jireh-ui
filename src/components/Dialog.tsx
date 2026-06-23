"use client";

import { forwardRef, useEffect, useCallback, type HTMLAttributes, type ReactNode } from "react";
import { createPortal } from "react-dom";

export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { open, onClose, title, description, actions, children, style, ...rest },
  ref,
) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [open, handleKeyDown]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-modal)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
      }}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--bg-overlay)",
        }}
      />
      {/* Panel */}
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "jireh-dialog-title" : undefined}
        aria-describedby={description ? "jireh-dialog-desc" : undefined}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          maxHeight: "85vh",
          overflow: "auto",
          background: "var(--bg-surface)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)",
          padding: "var(--space-6)",
          fontFamily: "var(--font-sans)",
          ...style,
        }}
        {...rest}
      >
        {/* Close button */}
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "var(--space-4)",
            right: "var(--space-4)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            background: "transparent",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            color: "var(--fg-muted)",
            padding: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {title && (
          <h2
            id="jireh-dialog-title"
            style={{
              fontSize: "var(--text-lg)",
              fontWeight: 600,
              color: "var(--fg-heading)",
              margin: 0,
              paddingRight: "var(--space-8)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            {title}
          </h2>
        )}
        {description && (
          <p
            id="jireh-dialog-desc"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--fg-muted)",
              marginTop: "var(--space-2)",
              lineHeight: "var(--leading-normal)",
            }}
          >
            {description}
          </p>
        )}
        {children && (
          <div style={{ marginTop: "var(--space-4)" }}>{children}</div>
        )}
        {actions && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--space-2)",
              marginTop: "var(--space-6)",
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
});
