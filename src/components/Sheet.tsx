"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type SheetSide = "left" | "right" | "top" | "bottom";

export interface SheetProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  side?: SheetSide;
  width?: string | number;
  height?: string | number;
  children: ReactNode;
}

const transforms: Record<SheetSide, { open: string; closed: string }> = {
  left: { open: "translateX(0)", closed: "translateX(-100%)" },
  right: { open: "translateX(0)", closed: "translateX(100%)" },
  top: { open: "translateY(0)", closed: "translateY(-100%)" },
  bottom: { open: "translateY(0)", closed: "translateY(100%)" },
};

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(function Sheet(
  { open, onClose, side = "right", width = 400, height = "100%", children, style, ...rest },
  ref,
) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!mounted || !visible) return null;

  const isHorizontal = side === "left" || side === "right";
  const t = transforms[side];

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: "var(--z-modal)",
    background: "var(--bg-surface)",
    boxShadow: "var(--shadow-xl)",
    transition: "transform var(--duration-moderate) var(--ease-default)",
    transform: open ? t.open : t.closed,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    ...(isHorizontal
      ? {
          top: 0,
          [side]: 0,
          width,
          maxWidth: "100vw",
          height: "100%",
        }
      : {
          left: 0,
          [side]: 0,
          width: "100%",
          height,
          maxHeight: "100vh",
        }),
    ...style,
  };

  return createPortal(
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: "var(--z-overlay)",
          background: "var(--bg-overlay)",
          opacity: open ? 1 : 0,
          transition: "opacity var(--duration-moderate) var(--ease-default)",
        }}
        aria-hidden="true"
      />
      <div ref={ref || panelRef} role="dialog" aria-modal="true" style={panelStyle} {...rest}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingTop: "var(--space-3)",
            paddingRight: "var(--space-3)",
            paddingLeft: "var(--space-3)",
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: "transparent",
              color: "var(--fg-muted)",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ flex: 1, padding: "var(--space-4)" }}>{children}</div>
      </div>
    </>,
    document.body,
  );
});
