"use client";

import { forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required, disabled, style, children, ...rest },
  ref,
) {
  return (
    <label
      ref={ref}
      style={{
        display: "block",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: 500,
        lineHeight: "var(--leading-normal)",
        color: disabled ? "var(--fg-subtle)" : "var(--fg-default)",
        cursor: disabled ? "not-allowed" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
      {required && (
        <span
          style={{ color: "var(--color-error)", marginLeft: "var(--space-0-5)" }}
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  );
});
