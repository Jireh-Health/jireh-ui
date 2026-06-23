"use client";

import { forwardRef, type HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const shimmerKeyframes = `
@keyframes jireh-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, var(--color-gray-200) 25%, var(--color-gray-100) 50%, var(--color-gray-200) 75%)",
  backgroundSize: "200% 100%",
  animation: "jireh-shimmer 1.5s ease-in-out infinite",
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { variant = "text", width, height, lines = 3, style, ...rest },
  ref,
) {
  if (variant === "text") {
    return (
      <div ref={ref} role="status" aria-label="Loading" style={style} {...rest}>
        <style>{shimmerKeyframes}</style>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            style={{
              ...shimmerStyle,
              height: height ?? "14px",
              width: i === lines - 1 && lines > 1 ? "60%" : (width ?? "100%"),
              borderRadius: "var(--radius-sm)",
              marginBottom: i < lines - 1 ? "var(--space-2)" : 0,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "circular") {
    const size = width ?? height ?? "40px";
    return (
      <>
        <style>{shimmerKeyframes}</style>
        <div
          ref={ref}
          role="status"
          aria-label="Loading"
          style={{
            ...shimmerStyle,
            width: size,
            height: size,
            borderRadius: "var(--radius-full)",
            ...style,
          }}
          {...rest}
        />
      </>
    );
  }

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        style={{
          ...shimmerStyle,
          width: width ?? "100%",
          height: height ?? "100px",
          borderRadius: "var(--radius-md)",
          ...style,
        }}
        {...rest}
      />
    </>
  );
});
