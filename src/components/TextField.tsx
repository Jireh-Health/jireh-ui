"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
  error?: string;
  maxCharacters?: number;
  currentLength?: number;
  type?: "text" | "email" | "password" | "url" | "tel" | "number" | "search";
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      helperText,
      error,
      maxCharacters,
      currentLength,
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

        <input
          ref={ref}
          id={id}
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
            transition: `border-color var(--duration-fast) var(--ease-default)`,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : undefined,
            ...style,
          }}
          {...rest}
        />

        {(helperText || error || maxCharacters != null) && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "var(--space-2)",
            }}
          >
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

            {maxCharacters != null && (
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-xs)",
                  color:
                    (currentLength ?? 0) > maxCharacters
                      ? "var(--color-error)"
                      : "var(--fg-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {currentLength ?? 0}/{maxCharacters}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);
