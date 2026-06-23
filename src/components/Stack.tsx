"use client";

import { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { resolveSpace } from "../utils/tokens";

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  gap?: string;
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
}

export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  { as: Component = "div", gap = "4", align, style, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: resolveSpace(gap),
        alignItems: align,
        ...style,
      }}
      {...rest}
    />
  );
});
