"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helpText?: string;
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 6l2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, helpText, disabled, checked, id: idProp, style, ...rest },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "var(--space-2)",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <div style={{ position: "relative", flexShrink: 0, marginTop: "2px" }}>
          <input
            ref={ref}
            id={id}
            type="checkbox"
            disabled={disabled}
            checked={checked}
            aria-describedby={helpText ? `${id}-help` : undefined}
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: 0,
              ...style,
            }}
            {...rest}
          />

          <div
            aria-hidden="true"
            style={{
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "var(--radius-sm)",
              border: `var(--border-width-medium) solid ${checked ? "var(--interactive-default)" : "var(--border-default)"}`,
              background: checked ? "var(--interactive-default)" : "transparent",
              color: checked ? "var(--fg-on-brand)" : "transparent",
              transition: `background var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)`,
            }}
          >
            {checked && <CheckIcon />}
          </div>
        </div>

        {(label || helpText) && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-0-5)" }}>
            {label && (
              <label
                htmlFor={id}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--weight-medium)" as unknown as number,
                  color: "var(--fg-default)",
                  lineHeight: "var(--leading-normal)",
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
              >
                {label}
              </label>
            )}
            {helpText && (
              <p
                id={`${id}-help`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-xs)",
                  color: "var(--fg-muted)",
                  margin: 0,
                }}
              >
                {helpText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);
