"use client";

import { forwardRef, type HTMLAttributes } from "react";

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {}

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(function VisuallyHidden(
  { style, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
        ...style,
      }}
      {...rest}
    />
  );
});
