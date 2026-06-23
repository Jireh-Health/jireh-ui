"use client";

import { forwardRef, useState, type ImgHTMLAttributes } from "react";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size"> {
  src?: string;
  alt: string;
  size?: AvatarSize;
}

const sizeMap: Record<AvatarSize, string> = {
  sm: "28px",
  md: "36px",
  lg: "48px",
  xl: "64px",
};

const fontSizeMap: Record<AvatarSize, string> = {
  sm: "var(--text-xs)",
  md: "var(--text-sm)",
  lg: "var(--text-base)",
  xl: "var(--text-xl)",
};

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
  { src, alt, size = "md", style, ...rest },
  ref,
) {
  const [imgError, setImgError] = useState(false);
  const dimension = sizeMap[size];
  const initial = alt ? alt.charAt(0).toUpperCase() : "?";

  const baseStyle: React.CSSProperties = {
    width: dimension,
    height: dimension,
    borderRadius: "var(--radius-full)",
    flexShrink: 0,
    ...style,
  };

  if (src && !imgError) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        onError={() => setImgError(true)}
        style={{
          ...baseStyle,
          objectFit: "cover",
        }}
        {...rest}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={alt}
      style={{
        ...baseStyle,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-surface-brand)",
        color: "var(--fg-on-brand)",
        fontFamily: "var(--font-sans)",
        fontSize: fontSizeMap[size],
        fontWeight: 600,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      {initial}
    </span>
  );
});
