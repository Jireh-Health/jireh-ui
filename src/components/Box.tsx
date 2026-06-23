"use client";

import { forwardRef, type ElementType, type HTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { resolveSpace, resolveRadius, resolveBg } from "../utils/tokens";

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  as?: ElementType;
  padding?: string;
  paddingX?: string;
  paddingY?: string;
  margin?: string;
  bg?: string;
  border?: string;
  radius?: string;
  shadow?: string;
  display?: CSSProperties["display"];
  flex?: CSSProperties["flex"];
  gap?: string;
  overflow?: CSSProperties["overflow"];
}

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  {
    as: Component = "div",
    padding,
    paddingX,
    paddingY,
    margin,
    bg,
    border,
    radius,
    shadow,
    display,
    flex,
    gap,
    overflow,
    style,
    ...rest
  },
  ref,
) {
  return (
    <Component
      ref={ref}
      style={{
        padding: resolveSpace(padding),
        ...(paddingX && { paddingLeft: resolveSpace(paddingX), paddingRight: resolveSpace(paddingX) }),
        ...(paddingY && { paddingTop: resolveSpace(paddingY), paddingBottom: resolveSpace(paddingY) }),
        margin: resolveSpace(margin),
        background: resolveBg(bg),
        border,
        borderRadius: resolveRadius(radius),
        boxShadow: shadow,
        display,
        flex,
        gap: resolveSpace(gap),
        overflow,
        ...style,
      }}
      {...rest}
    />
  );
});
