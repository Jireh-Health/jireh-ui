"use client";

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type HTMLAttributes,
} from "react";
import { createPortal } from "react-dom";

export interface SearchableSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SearchableSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SearchableSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  emptyMessage?: string;
}

export const SearchableSelect = forwardRef<HTMLDivElement, SearchableSelectProps>(
  function SearchableSelect(
    {
      options,
      value,
      onChange,
      placeholder = "Select...",
      searchPlaceholder = "Search...",
      disabled,
      hasError,
      emptyMessage = "No results found",
      style,
      ...rest
    },
    ref,
  ) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(0);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [mounted, setMounted] = useState(false);
    const [dropdownPos, setDropdownPos] = useState<React.CSSProperties>({});

    useEffect(() => setMounted(true), []);

    const selectedOption = options.find((o) => o.value === value);

    const filtered = useMemo(
      () =>
        search
          ? options.filter((o) =>
              o.label.toLowerCase().includes(search.toLowerCase()),
            )
          : options,
      [options, search],
    );

    const updatePosition = useCallback(() => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      setDropdownPos({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }, []);

    useEffect(() => {
      if (!open) return;
      updatePosition();
      setSearch("");
      setHighlightIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());

      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }, [open, updatePosition]);

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (
          dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    const select = useCallback(
      (val: string) => {
        onChange?.(val);
        setOpen(false);
      },
      [onChange],
    );

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setHighlightIndex((prev) => Math.min(prev + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setHighlightIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          const item = filtered[highlightIndex];
          if (item && !item.disabled) select(item.value);
        } else if (e.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
        }
      },
      [filtered, highlightIndex, select],
    );

    return (
      <div ref={ref} style={{ position: "relative", ...style }} {...rest}>
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="listbox"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "var(--space-2)",
            paddingBottom: "var(--space-2)",
            paddingLeft: "var(--space-3)",
            paddingRight: "var(--space-3)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            lineHeight: "var(--leading-normal)",
            color: selectedOption ? "var(--fg-default)" : "var(--fg-subtle)",
            background: "var(--bg-surface)",
            border: `var(--border-width-thin) solid ${hasError ? "var(--color-error)" : "var(--border-default)"}`,
            borderRadius: "var(--radius-md)",
            cursor: disabled ? "not-allowed" : "pointer",
            textAlign: "left",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {selectedOption?.label ?? placeholder}
          </span>
          <span
            style={{
              marginLeft: "var(--space-2)",
              color: "var(--fg-subtle)",
              fontSize: 10,
              flexShrink: 0,
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform var(--duration-fast) var(--ease-default)",
            }}
          >
            ▼
          </span>
        </button>

        {mounted && open && createPortal(
          <div
            ref={dropdownRef}
            style={{
              ...dropdownPos,
              zIndex: "var(--z-dropdown)",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-lg)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "var(--space-2)" }}>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightIndex(0);
                }}
                onKeyDown={onKeyDown}
                placeholder={searchPlaceholder}
                style={{
                  width: "100%",
                  paddingTop: "var(--space-2)",
                  paddingBottom: "var(--space-2)",
                  paddingLeft: "var(--space-3)",
                  paddingRight: "var(--space-3)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-sm)",
                  color: "var(--fg-default)",
                  background: "var(--bg-surface-muted)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  outline: "none",
                }}
              />
            </div>
            <div
              role="listbox"
              style={{ maxHeight: 240, overflowY: "auto", padding: "var(--space-1)" }}
            >
              {filtered.length === 0 ? (
                <div
                  style={{
                    padding: "var(--space-3)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-sm)",
                    color: "var(--fg-subtle)",
                    textAlign: "center",
                  }}
                >
                  {emptyMessage}
                </div>
              ) : (
                filtered.map((option, i) => {
                  const isSelected = option.value === value;
                  const isHighlighted = i === highlightIndex;
                  return (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled || undefined}
                      onClick={() => {
                        if (!option.disabled) select(option.value);
                      }}
                      onMouseEnter={() => setHighlightIndex(i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "var(--space-2) var(--space-3)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-sm)",
                        color: option.disabled
                          ? "var(--fg-subtle)"
                          : "var(--fg-default)",
                        background: isHighlighted
                          ? "var(--bg-surface-muted)"
                          : "transparent",
                        borderRadius: "var(--radius-sm)",
                        cursor: option.disabled ? "not-allowed" : "pointer",
                        fontWeight: isSelected ? 500 : 400,
                      }}
                    >
                      <span style={{ flex: 1 }}>{option.label}</span>
                      {isSelected && (
                        <span style={{ color: "var(--interactive-default)", fontSize: 14 }}>
                          ✓
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>,
          document.body,
        )}
      </div>
    );
  },
);
