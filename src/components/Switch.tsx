"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";

export type SwitchSize = "sm" | "md";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "onChange"> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: SwitchSize;
}

const sizeConfig: Record<SwitchSize, { trackW: number; trackH: number; thumb: number; travel: number }> = {
  sm: { trackW: 36, trackH: 20, thumb: 16, travel: 16 },
  md: { trackW: 44, trackH: 24, thumb: 20, travel: 20 },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(
    { label, checked = false, onChange, disabled, size = "md", id: idProp, ...rest },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const cfg = sizeConfig[size];
    const thumbOffset = 2;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            aria-checked={checked}
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
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
            {...rest}
          />

          <div
            aria-hidden="true"
            style={{
              width: `${cfg.trackW}px`,
              height: `${cfg.trackH}px`,
              borderRadius: "var(--radius-full)",
              background: checked ? "var(--interactive-default)" : "var(--border-strong)",
              cursor: disabled ? "not-allowed" : "pointer",
              transition: `background var(--duration-fast) var(--ease-default)`,
              position: "relative",
            }}
            onClick={() => {
              if (!disabled) onChange?.(!checked);
            }}
          >
            <div
              style={{
                position: "absolute",
                top: `${thumbOffset}px`,
                left: checked ? `${cfg.travel}px` : `${thumbOffset}px`,
                width: `${cfg.thumb}px`,
                height: `${cfg.thumb}px`,
                borderRadius: "var(--radius-full)",
                background: "var(--color-white)",
                boxShadow: "var(--shadow-sm)",
                transition: `left var(--duration-fast) var(--ease-default)`,
              }}
            />
          </div>
        </div>

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
      </div>
    );
  },
);
