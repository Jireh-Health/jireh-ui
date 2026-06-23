"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  elevated?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  align?: "start" | "end" | "between";
}

const paddingMap = {
  none: "0",
  sm: "var(--space-3)",
  md: "var(--space-4)",
  lg: "var(--space-6)",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding = "md", elevated = false, children, style, ...rest },
  ref,
) {
  const pad = paddingMap[padding];
  return (
    <div
      ref={ref}
      style={{
        borderRadius: "var(--radius-lg)",
        border: "var(--border-width-thin) solid var(--border-default)",
        background: "var(--bg-surface)",
        boxShadow: elevated ? "var(--shadow-sm)" : "none",
        overflow: "hidden",
        transition: `box-shadow var(--duration-fast) var(--ease-default)`,
        padding: pad,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

export function CardHeader({ title, subtitle, action, style, ...rest }: CardHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        padding: "var(--space-4) var(--space-4) 0",
        ...style,
      }}
      {...rest}
    >
      <div>
        <h3
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
        </h3>
        {subtitle && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              color: "var(--fg-muted)",
              margin: "var(--space-1) 0 0",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export function CardTitle({ children, style, ...rest }: CardTitleProps) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-lg)",
        fontWeight: 600,
        color: "var(--fg-heading)",
        margin: 0,
        lineHeight: 1.3,
        ...style,
      }}
      {...rest}
    >
      {children}
    </h3>
  );
}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export function CardDescription({ children, style, ...rest }: CardDescriptionProps) {
  return (
    <p
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        color: "var(--fg-muted)",
        margin: "var(--space-1) 0 0",
        lineHeight: "var(--leading-normal)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, style, ...rest }: CardContentProps) {
  return (
    <div style={{ padding: "var(--space-4)", ...style }} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ align = "end", children, style, ...rest }: CardFooterProps) {
  const justifyMap = { start: "flex-start", end: "flex-end", between: "space-between" };
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-2)",
        justifyContent: justifyMap[align],
        padding: "var(--space-3) var(--space-4)",
        borderTop: "var(--border-width-thin) solid var(--border-default)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
