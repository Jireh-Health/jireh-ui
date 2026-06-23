"use client";

import { type HTMLAttributes, type ReactNode } from "react";

export interface PatientDashboardSectionProps extends HTMLAttributes<HTMLElement> {
  title: string;
  children: ReactNode;
  link?: { href: string; text: string };
}

export function PatientDashboardSection({
  title,
  children,
  link,
  style,
  ...rest
}: PatientDashboardSectionProps) {
  return (
    <section
      style={{
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "var(--space-3)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-lg)",
            fontWeight: 600,
            color: "var(--fg-heading)",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
        {link && (
          <a
            href={link.href}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--fg-link)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              lineHeight: 1.4,
            }}
          >
            {link.text} &gt;
          </a>
        )}
      </div>
      {children}
    </section>
  );
}
