"use client";

import { type HTMLAttributes } from "react";

export interface DescriptionListItem {
  term: string;
  description: string;
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  items: DescriptionListItem[];
  layout: "vertical" | "horizontal";
}

export function DescriptionList({
  items,
  layout,
  style,
  ...rest
}: DescriptionListProps) {
  if (layout === "horizontal") {
    return (
      <dl
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
          ...style,
        }}
        {...rest}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "var(--space-4)",
            }}
          >
            <dt
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                color: "var(--fg-muted)",
                flexShrink: 0,
                width: "40%",
                maxWidth: 180,
                lineHeight: 1.5,
              }}
            >
              {item.term}
            </dt>
            <dd
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                color: "var(--fg-default)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {item.description}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  // vertical layout
  return (
    <dl
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        ...style,
      }}
      {...rest}
    >
      {items.map((item, index) => (
        <div key={index}>
          <dt
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-xs)",
              fontWeight: 500,
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              lineHeight: 1.4,
            }}
          >
            {item.term}
          </dt>
          <dd
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              color: "var(--fg-default)",
              margin: "var(--space-1) 0 0",
              lineHeight: 1.5,
            }}
          >
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}
