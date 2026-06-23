"use client";

import {
  forwardRef,
  createContext,
  useContext,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from "react";

interface BottomNavContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const BottomNavContext = createContext<BottomNavContextValue | null>(null);

function useBottomNavContext() {
  const ctx = useContext(BottomNavContext);
  if (!ctx) throw new Error("BottomNavItem must be used within <BottomNav>");
  return ctx;
}

export interface BottomNavProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

export const BottomNav = forwardRef<HTMLElement, BottomNavProps>(
  function BottomNav({ value, onValueChange, children, style, ...rest }, ref) {
    return (
      <BottomNavContext.Provider value={{ value, onValueChange }}>
        <nav
          ref={ref}
          role="tablist"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            background: "var(--bg-surface)",
            borderTop: "1px solid var(--border-default)",
            paddingTop: "var(--space-1)",
            paddingBottom: "env(safe-area-inset-bottom, var(--space-1))",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: "var(--z-sticky)",
            ...style,
          }}
          {...rest}
        >
          {children}
        </nav>
      </BottomNavContext.Provider>
    );
  },
);

export interface BottomNavItemProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  value: string;
  icon: ReactNode;
  label: string;
  badge?: string | number;
}

export const BottomNavItem = forwardRef<HTMLButtonElement, BottomNavItemProps>(
  function BottomNavItem({ value, icon, label, badge, style, ...rest }, ref) {
    const ctx = useBottomNavContext();
    const active = ctx.value === value;

    const handleClick = useCallback(() => {
      ctx.onValueChange(value);
    }, [ctx, value]);

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={active}
        onClick={handleClick}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          flex: 1,
          padding: "var(--space-1) 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          position: "relative",
          color: active ? "var(--color-jireh-purple)" : "var(--fg-muted)",
          transition: "color var(--duration-fast) var(--ease-default)",
          WebkitTapHighlightColor: "transparent",
          ...style,
        }}
        {...rest}
      >
        <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
          {badge !== undefined && (
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -8,
                minWidth: 16,
                height: 16,
                borderRadius: 999,
                background: "var(--color-error)",
                color: "var(--color-white)",
                fontSize: 10,
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 4px",
                lineHeight: 1,
              }}
            >
              {badge}
            </span>
          )}
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: active ? 600 : 400,
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      </button>
    );
  },
);
