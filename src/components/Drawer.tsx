"use client";

import { forwardRef, useEffect, useCallback, type HTMLAttributes, type ReactNode } from "react";
import { createPortal } from "react-dom";

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

const slideUpKeyframes = `
@keyframes jireh-drawer-slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
`;

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  { open, onClose, title, children, style, ...rest },
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
        alignItems: "flex-end",
      }}
    >
      <style>{slideUpKeyframes}</style>
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
        aria-labelledby={title ? "jireh-drawer-title" : undefined}
        style={{
          position: "relative",
          width: "100%",
          maxHeight: "85vh",
          background: "var(--bg-surface)",
          borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
          fontFamily: "var(--font-sans)",
          display: "flex",
          flexDirection: "column",
          animation: "jireh-drawer-slide-up var(--duration-moderate) var(--ease-out)",
          ...style,
        }}
        {...rest}
      >
        {/* Drag handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "var(--space-3) 0 var(--space-1)",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "4px",
              borderRadius: "var(--radius-full)",
              background: "var(--border-strong)",
            }}
          />
        </div>

        {/* Header */}
        {title && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "var(--space-2) var(--space-4) var(--space-3)",
            }}
          >
            <h2
              id="jireh-drawer-title"
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                color: "var(--fg-heading)",
                margin: 0,
                lineHeight: "var(--leading-tight)",
              }}
            >
              {title}
            </h2>
            <button
              type="button"
              aria-label="Close drawer"
              onClick={onClose}
              style={{
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
          </div>
        )}

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingTop: title ? 0 : "var(--space-2)",
            paddingRight: "var(--space-4)",
            paddingBottom: "var(--space-4)",
            paddingLeft: "var(--space-4)",
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
});
