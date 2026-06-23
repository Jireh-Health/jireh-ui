"use client";

import { useRef, useCallback, useId, type KeyboardEvent, type ClipboardEvent } from "react";

export interface InputOtpProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
}

export function InputOtp({
  length = 6,
  value,
  onChange,
  disabled,
  id: idProp,
  "aria-label": ariaLabel = "One-time password",
}: InputOtpProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const focusIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, length - 1));
      inputsRef.current[clamped]?.focus();
    },
    [length],
  );

  const handleChange = useCallback(
    (index: number, char: string) => {
      if (char && !/^\d$/.test(char)) return;

      const next = digits.slice();
      next[index] = char;
      const newValue = next.join("");
      onChange(newValue);

      if (char && index < length - 1) {
        focusIndex(index + 1);
      }
    },
    [digits, length, onChange, focusIndex],
  );

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        if (digits[index]) {
          handleChange(index, "");
        } else if (index > 0) {
          handleChange(index - 1, "");
          focusIndex(index - 1);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusIndex(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        focusIndex(index + 1);
      }
    },
    [digits, handleChange, focusIndex],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      if (pasted) {
        onChange(pasted.padEnd(length, " ").slice(0, length).replace(/ /g, ""));
        focusIndex(Math.min(pasted.length, length - 1));
      }
    },
    [length, onChange, focusIndex],
  );

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      style={{
        display: "flex",
        gap: "var(--space-2)",
      }}
    >
      {Array.from({ length }, (_, i) => {
        const isActive =
          !disabled &&
          (i === value.length || (i === length - 1 && value.length >= length));

        return (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            id={i === 0 ? id : undefined}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            pattern="\d"
            maxLength={1}
            value={digits[i] ?? ""}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${length}`}
            onChange={(e) => {
              const char = e.target.value.slice(-1);
              handleChange(i, char);
            }}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            style={{
              width: "44px",
              height: "48px",
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-lg)",
              fontWeight: "var(--weight-semibold)" as unknown as number,
              color: "var(--fg-default)",
              background: "var(--bg-surface)",
              border: `var(--border-width-medium) solid ${isActive ? "var(--border-focus)" : "var(--border-default)"}`,
              borderRadius: "var(--radius-md)",
              outline: "none",
              transition: `border-color var(--duration-fast) var(--ease-default)`,
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "not-allowed" : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
