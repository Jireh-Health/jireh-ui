"use client";

import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { resolveSpace } from "../utils/tokens";

export interface InlineProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  as?: ElementType;
  gap?: string;
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  wrap?: boolean;
}

export const Inline = forwardRef<HTMLElement, InlineProps>(function Inline(
  { as: Component = "div", gap = "3", align, wrap = true, style, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      style={{
        display: "flex",
        flexWrap: wrap ? "wrap" : "nowrap",
        gap: resolveSpace(gap),
        alignItems: align,
        ...style,
      }}
      {...rest}
    />
  );
});
