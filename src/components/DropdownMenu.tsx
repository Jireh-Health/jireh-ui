"use client";

import { forwardRef, useState, useRef, useEffect, useCallback, type HTMLAttributes, type ReactNode } from "react";

export interface DropdownMenuItem {
  label: string;
  onClick: () => void;
  destructive?: boolean;
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
  items: DropdownMenuItem[];
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
  { trigger, items, style, ...rest },
  ref,
) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open, handleClickOutside, handleKeyDown]);

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      style={{
        position: "relative",
        display: "inline-block",
        ...style,
      }}
      {...rest}
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        style={{ cursor: "pointer" }}
      >
        {trigger}
      </div>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            zIndex: "var(--z-dropdown)",
            marginTop: "var(--space-1)",
            minWidth: "160px",
            background: "var(--bg-surface)",
            border: "var(--border-width-thin) solid var(--border-default)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            padding: "var(--space-1) 0",
            fontFamily: "var(--font-sans)",
          }}
        >
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              role="menuitem"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "var(--space-2) var(--space-3)",
                background: "transparent",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                color: item.destructive ? "var(--color-error)" : "var(--fg-default)",
                cursor: "pointer",
                lineHeight: "var(--leading-normal)",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
