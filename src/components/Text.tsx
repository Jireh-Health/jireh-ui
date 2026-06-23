"use client";

import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";

export type TextVariant = "body-lg" | "body" | "body-sm" | "ui" | "mono";
export type TextColor = "default" | "muted" | "subtle" | "error" | "success";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  as?: ElementType;
}

const variantStyles: Record<TextVariant, React.CSSProperties> = {
  "body-lg": { fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", lineHeight: 1.5 },
  body: { fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", lineHeight: 1.5 },
  "body-sm": { fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", lineHeight: 1.45 },
  ui: { fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", lineHeight: 1.4 },
  mono: { fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", lineHeight: 1.5 },
};

const colorMap: Record<TextColor, string> = {
  default: "var(--fg-default)",
  muted: "var(--fg-muted)",
  subtle: "var(--fg-subtle)",
  error: "var(--color-error)",
  success: "var(--color-success)",
};

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { variant = "body", color = "default", as: Component = "p", style, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      style={{
        margin: 0,
        color: colorMap[color],
        ...variantStyles[variant],
        ...style,
      }}
      {...rest}
    />
  );
});
