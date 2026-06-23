"use client";

import { forwardRef, type HTMLAttributes } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items, style, ...rest },
  ref,
) {
  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        ...style,
      }}
      {...rest}
    >
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-1)",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-1)",
              }}
            >
              {index > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    color: "var(--fg-subtle)",
                    fontSize: "var(--text-xs)",
                    userSelect: "none",
                  }}
                >
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  style={{
                    color: isLast ? "var(--fg-default)" : "var(--fg-muted)",
                    fontWeight: isLast ? 500 : 400,
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  style={{
                    color: "var(--fg-muted)",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
