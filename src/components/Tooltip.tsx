"use client";

import { forwardRef, useState, useRef, type HTMLAttributes, type ReactNode } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  content: ReactNode;
  placement?: TooltipPlacement;
  children: ReactNode;
}

const getTooltipPosition = (placement: TooltipPlacement): React.CSSProperties => {
  const base: React.CSSProperties = {
    position: "absolute",
    zIndex: 600,
  };

  switch (placement) {
    case "top":
      return { ...base, bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "6px" };
    case "bottom":
      return { ...base, top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "6px" };
    case "left":
      return { ...base, right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "6px" };
    case "right":
      return { ...base, left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "6px" };
  }
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { content, placement = "top", children, style, ...rest },
  ref,
) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), 100);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 50);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      style={{
        position: "relative",
        display: "inline-flex",
        ...style,
      }}
      {...rest}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          style={{
            ...getTooltipPosition(placement),
            padding: "var(--space-1-5) var(--space-2)",
            background: "var(--color-gray-900)",
            color: "var(--color-white)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-xs)",
            fontWeight: 500,
            lineHeight: "var(--leading-snug)",
            borderRadius: "var(--radius-sm)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
});
