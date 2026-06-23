"use client";

import { forwardRef, useId, type SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

function ChevronIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 5.25 7 8.75l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      helperText,
      error,
      options,
      placeholder,
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

        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy || undefined}
            style={{
              width: "100%",
              paddingTop: "var(--space-2)",
              paddingBottom: "var(--space-2)",
              paddingLeft: "var(--space-3)",
              paddingRight: "var(--space-8)",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-normal)",
              color: "var(--fg-default)",
              background: "var(--bg-surface)",
              border: `var(--border-width-thin) solid ${hasError ? "var(--color-error)" : "var(--border-default)"}`,
              borderRadius: "var(--radius-md)",
              outline: "none",
              appearance: "none",
              WebkitAppearance: "none",
              transition: `border-color var(--duration-fast) var(--ease-default)`,
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "not-allowed" : "pointer",
              ...style,
            }}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <span
            style={{
              position: "absolute",
              right: "var(--space-3)",
              color: "var(--fg-muted)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <ChevronIcon />
          </span>
        </div>

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
