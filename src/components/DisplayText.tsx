"use client";

import { forwardRef, type HTMLAttributes } from "react";

export type DisplayTextSize = "xl" | "lg" | "md";

export interface DisplayTextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: DisplayTextSize;
}

const sizeStyles: Record<DisplayTextSize, React.CSSProperties> = {
  xl: { fontSize: "var(--text-4xl)", lineHeight: 1.15 },
  lg: { fontSize: "var(--text-3xl)", lineHeight: 1.2 },
  md: { fontSize: "var(--text-2xl)", lineHeight: 1.25 },
};

export const DisplayText = forwardRef<HTMLParagraphElement, DisplayTextProps>(function DisplayText(
  { size = "lg", style, ...rest },
  ref,
) {
  return (
    <p
      ref={ref}
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        color: "var(--fg-heading)",
        margin: 0,
        ...sizeStyles[size],
        ...style,
      }}
      {...rest}
    />
  );
});
