"use client";

import { type HTMLAttributes } from "react";

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
}

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
}

export function Timeline({ items, style, ...rest }: TimelineProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0",
        ...style,
      }}
      {...rest}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "var(--space-4)",
              minHeight: isLast ? undefined : 60,
            }}
          >
            {/* Date column */}
            <div
              style={{
                width: 80,
                flexShrink: 0,
                paddingTop: "var(--space-0-5)",
                textAlign: "right",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-xs)",
                  color: "var(--fg-muted)",
                  lineHeight: 1.4,
                }}
              >
                {item.date}
              </span>
            </div>

            {/* Dot and line */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "var(--radius-full)",
                  background: "var(--interactive-default)",
                  flexShrink: 0,
                  marginTop: "var(--space-1)",
                }}
              />
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    background: "var(--border-default)",
                    marginTop: "var(--space-1)",
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div
              style={{
                paddingBottom: isLast ? 0 : "var(--space-4)",
                flex: 1,
                minWidth: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  color: "var(--fg-default)",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </p>
              {item.description && (
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-sm)",
                    color: "var(--fg-muted)",
                    margin: "var(--space-1) 0 0",
                    lineHeight: 1.5,
                  }}
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
