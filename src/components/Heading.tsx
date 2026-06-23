"use client";

import { forwardRef, type ElementType, type HTMLAttributes } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: ElementType;
}

const levelStyles: Record<HeadingLevel, React.CSSProperties> = {
  1: { fontSize: "var(--text-4xl)", fontWeight: 600, lineHeight: 1.2 },
  2: { fontSize: "var(--text-2xl)", fontWeight: 600, lineHeight: 1.25 },
  3: { fontSize: "var(--text-xl)", fontWeight: 600, lineHeight: 1.3 },
  4: { fontSize: "var(--text-lg)", fontWeight: 500, lineHeight: 1.35 },
};

const defaultElement: Record<HeadingLevel, ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level = 2, as, style, ...rest },
  ref,
) {
  const Component = as ?? defaultElement[level];

  return (
    <Component
      ref={ref}
      style={{
        fontFamily: "var(--font-sans)",
        color: "var(--fg-heading)",
        margin: 0,
        ...levelStyles[level],
        ...style,
      }}
      {...rest}
    />
  );
});
