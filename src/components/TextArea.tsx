"use client";

import { forwardRef, useId, type TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      helperText,
      error,
      rows = 3,
      id: idProp,
      disabled,
      style,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const hasError = Boolean(error);
    const describedBy = [
      hasError ? errorId : undefined,
      helperText ? helperId : undefined,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        {label && (
          <label
            htmlFor={id}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-medium)" as unknown as number,
              color: "var(--fg-default)",
              lineHeight: "var(--leading-normal)",
            }}
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy || undefined}
          style={{
            width: "100%",
            padding: "var(--space-2) var(--space-3)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            lineHeight: "var(--leading-normal)",
            color: "var(--fg-default)",
            background: "var(--bg-surface)",
            border: `var(--border-width-thin) solid ${hasError ? "var(--color-error)" : "var(--border-default)"}`,
            borderRadius: "var(--radius-md)",
            outline: "none",
            resize: "vertical",
            transition: `border-color var(--duration-fast) var(--ease-default)`,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : undefined,
            ...style,
          }}
          {...rest}
        />

        {(helperText || error) && (
          <div>
            {hasError && (
              <p
                id={errorId}
                role="alert"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-error)",
                  margin: 0,
                }}
              >
                {error}
              </p>
            )}
            {!hasError && helperText && (
              <p
                id={helperId}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-xs)",
                  color: "var(--fg-muted)",
                  margin: 0,
                }}
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);
