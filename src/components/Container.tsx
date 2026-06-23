"use client";

import { forwardRef, type HTMLAttributes } from "react";

export type ContainerSize = "narrow" | "content" | "wide";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const maxWidthMap: Record<ContainerSize, string> = {
  narrow: "680px",
  content: "960px",
  wide: "1200px",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = "content", style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        maxWidth: maxWidthMap[size],
        marginLeft: "auto",
        marginRight: "auto",
        ...style,
      }}
      {...rest}
    />
  );
});
