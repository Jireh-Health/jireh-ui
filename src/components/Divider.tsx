"use client";

import { forwardRef, type HTMLAttributes } from "react";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "default" | "strong" | "subtle";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
}

const colorMap: Record<DividerVariant, string> = {
  default: "var(--border-default)",
  strong: "var(--border-strong)",
  subtle: "var(--border-subtle, rgba(0,0,0,0.06))",
};

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { orientation = "horizontal", variant = "default", style, ...rest },
  ref,
) {
  const isVertical = orientation === "vertical";
  const color = colorMap[variant];

  return (
    <hr
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      style={{
        border: "none",
        margin: 0,
        flexShrink: 0,
        ...(isVertical
          ? {
              width: "1px",
              alignSelf: "stretch",
              background: color,
            }
          : {
              height: "1px",
              width: "100%",
              background: color,
            }),
        ...style,
      }}
      {...rest}
    />
  );
});
