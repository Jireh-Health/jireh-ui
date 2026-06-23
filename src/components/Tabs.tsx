"use client";

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";

export interface TabItem {
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  defaultIndex?: number;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { items, defaultIndex = 0, style, ...rest },
  ref,
) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div ref={ref} style={{ fontFamily: "var(--font-sans)", ...style }} {...rest}>
      {/* Tab list */}
      <div
        role="tablist"
        style={{
          display: "flex",
          borderBottom: "var(--border-width-thin) solid var(--border-default)",
          gap: "var(--space-1)",
        }}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-disabled={item.disabled}
              disabled={item.disabled}
              onClick={() => !item.disabled && setActiveIndex(index)}
              style={{
                position: "relative",
                padding: "var(--space-2) var(--space-4)",
                background: "transparent",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: isActive ? 600 : 400,
                color: item.disabled
                  ? "var(--fg-subtle)"
                  : isActive
                    ? "var(--interactive-default)"
                    : "var(--fg-muted)",
                cursor: item.disabled ? "not-allowed" : "pointer",
                opacity: item.disabled ? 0.5 : 1,
                whiteSpace: "nowrap",
                borderBottom: isActive
                  ? "2px solid var(--interactive-default)"
                  : "2px solid transparent",
                marginBottom: "-1px",
                transition: `color var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)`,
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {/* Tab panel */}
      <div
        role="tabpanel"
        style={{
          padding: "var(--space-4) 0",
        }}
      >
        {items[activeIndex]?.content}
      </div>
    </div>
  );
});
