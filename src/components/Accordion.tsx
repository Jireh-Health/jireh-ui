"use client";

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from "react";

export interface AccordionItem {
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
}

function AccordionSection({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(item.defaultOpen ?? false);

  return (
    <div
      style={{
        borderBottom: "var(--border-width-thin) solid var(--border-default)",
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-3)",
          padding: "var(--space-3) 0",
          background: "transparent",
          border: "none",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          fontWeight: 500,
          color: "var(--fg-default)",
          cursor: "pointer",
          textAlign: "left",
          lineHeight: "var(--leading-normal)",
        }}
      >
        <span>{item.title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: `transform var(--duration-fast) var(--ease-default)`,
          }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? "1000px" : "0",
          opacity: open ? 1 : 0,
          transition: `max-height var(--duration-moderate) var(--ease-default), opacity var(--duration-moderate) var(--ease-default)`,
        }}
      >
        <div
          style={{
            paddingBottom: "var(--space-4)",
            fontSize: "var(--text-sm)",
            color: "var(--fg-muted)",
            lineHeight: "var(--leading-normal)",
          }}
        >
          {item.content}
        </div>
      </div>
    </div>
  );
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { items, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{
        fontFamily: "var(--font-sans)",
        borderTop: "var(--border-width-thin) solid var(--border-default)",
        ...style,
      }}
      {...rest}
    >
      {items.map((item, index) => (
        <AccordionSection key={index} item={item} />
      ))}
    </div>
  );
});
