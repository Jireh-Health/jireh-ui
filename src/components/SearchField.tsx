"use client";

import { forwardRef, useId, type InputHTMLAttributes } from "react";

export interface SearchFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange"
  > {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  label?: string;
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10.5 3.5 3.5 10.5M3.5 3.5l7 7"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    { value, onChange, onClear, label, placeholder = "Search...", id: idProp, disabled, style, ...rest },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const showClear = value.length > 0 && onClear;

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

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "var(--space-3)",
              color: "var(--fg-muted)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <SearchIcon />
          </span>

          <style dangerouslySetInnerHTML={{ __html: `input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none;appearance:none}` }} />
          <input
            ref={ref}
            id={id}
            type="search"
            role="searchbox"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              width: "100%",
              paddingTop: "var(--space-2)",
              paddingBottom: "var(--space-2)",
              paddingLeft: "var(--space-8)",
              paddingRight: showClear ? "var(--space-8)" : "var(--space-3)",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-normal)",
              color: "var(--fg-default)",
              background: "var(--bg-surface)",
              border: "var(--border-width-thin) solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              outline: "none",
              transition: `border-color var(--duration-fast) var(--ease-default)`,
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "not-allowed" : undefined,
              ...style,
            }}
            {...rest}
          />

          {showClear && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={onClear}
              style={{
                position: "absolute",
                right: "var(--space-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                padding: 0,
                color: "var(--fg-muted)",
                background: "transparent",
                border: "none",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
              }}
            >
              <ClearIcon />
            </button>
          )}
        </div>
      </div>
    );
  },
);
