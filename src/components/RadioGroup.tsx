"use client";

import { useId } from "react";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  name?: string;
  disabled?: boolean;
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
  orientation = "vertical",
  name: nameProp,
  disabled,
}: RadioGroupProps) {
  const autoId = useId();
  const groupName = nameProp ?? autoId;

  return (
    <fieldset
      role="radiogroup"
      aria-label={label}
      disabled={disabled}
      style={{
        border: "none",
        padding: 0,
        margin: 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {label && (
        <legend
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--weight-medium)" as unknown as number,
            color: "var(--fg-default)",
            lineHeight: "var(--leading-normal)",
            marginBottom: "var(--space-2)",
            padding: 0,
          }}
        >
          {label}
        </legend>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: orientation === "horizontal" ? "row" : "column",
          gap: orientation === "horizontal" ? "var(--space-4)" : "var(--space-2)",
        }}
      >
        {options.map((option) => {
          const isSelected = value === option.value;
          const optionId = `${groupName}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <input
                  id={optionId}
                  type="radio"
                  name={groupName}
                  value={option.value}
                  checked={isSelected}
                  disabled={disabled}
                  onChange={() => onChange?.(option.value)}
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
                  }}
                />

                <div
                  aria-hidden="true"
                  style={{
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--radius-full)",
                    border: `var(--border-width-medium) solid ${isSelected ? "var(--interactive-default)" : "var(--border-default)"}`,
                    background: "transparent",
                    transition: `border-color var(--duration-fast) var(--ease-default)`,
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "var(--radius-full)",
                      background: isSelected ? "var(--interactive-default)" : "transparent",
                      transition: `background var(--duration-fast) var(--ease-default)`,
                    }}
                  />
                </div>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-sm)",
                  color: "var(--fg-default)",
                  lineHeight: "var(--leading-normal)",
                }}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
