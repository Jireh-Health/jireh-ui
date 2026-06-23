"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { resolveSpace } from "../utils/tokens";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  minChildWidth?: string;
  gap?: string;
}

function resolveTemplateColumns(columns?: number | string, minChildWidth?: string): string | undefined {
  if (minChildWidth) {
    return `repeat(auto-fill, minmax(${minChildWidth}, 1fr))`;
  }
  if (typeof columns === "number") {
    return `repeat(${columns}, 1fr)`;
  }
  if (typeof columns === "string") {
    return columns;
  }
  return undefined;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { columns, minChildWidth, gap = "4", style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: resolveTemplateColumns(columns, minChildWidth),
        gap: resolveSpace(gap),
        ...style,
      }}
      {...rest}
    />
  );
});
