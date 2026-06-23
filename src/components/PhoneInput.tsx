"use client";

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export interface Country {
  code: string;
  dialCode: string;
  name: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { code: "KE", dialCode: "+254", name: "Kenya", flag: "\u{1F1F0}\u{1F1EA}" },
  { code: "UG", dialCode: "+256", name: "Uganda", flag: "\u{1F1FA}\u{1F1EC}" },
  { code: "TZ", dialCode: "+255", name: "Tanzania", flag: "\u{1F1F9}\u{1F1FF}" },
  { code: "RW", dialCode: "+250", name: "Rwanda", flag: "\u{1F1F7}\u{1F1FC}" },
  { code: "ET", dialCode: "+251", name: "Ethiopia", flag: "\u{1F1EA}\u{1F1F9}" },
  { code: "NG", dialCode: "+234", name: "Nigeria", flag: "\u{1F1F3}\u{1F1EC}" },
  { code: "GH", dialCode: "+233", name: "Ghana", flag: "\u{1F1EC}\u{1F1ED}" },
  { code: "ZA", dialCode: "+27", name: "South Africa", flag: "\u{1F1FF}\u{1F1E6}" },
  { code: "EG", dialCode: "+20", name: "Egypt", flag: "\u{1F1EA}\u{1F1EC}" },
  { code: "MA", dialCode: "+212", name: "Morocco", flag: "\u{1F1F2}\u{1F1E6}" },
  { code: "SN", dialCode: "+221", name: "Senegal", flag: "\u{1F1F8}\u{1F1F3}" },
  { code: "CM", dialCode: "+237", name: "Cameroon", flag: "\u{1F1E8}\u{1F1F2}" },
  { code: "CI", dialCode: "+225", name: "Ivory Coast", flag: "\u{1F1E8}\u{1F1EE}" },
  { code: "CD", dialCode: "+243", name: "DR Congo", flag: "\u{1F1E8}\u{1F1E9}" },
  { code: "MZ", dialCode: "+258", name: "Mozambique", flag: "\u{1F1F2}\u{1F1FF}" },
  { code: "MW", dialCode: "+265", name: "Malawi", flag: "\u{1F1F2}\u{1F1FC}" },
  { code: "ZM", dialCode: "+260", name: "Zambia", flag: "\u{1F1FF}\u{1F1F2}" },
  { code: "ZW", dialCode: "+263", name: "Zimbabwe", flag: "\u{1F1FF}\u{1F1FC}" },
  { code: "BW", dialCode: "+267", name: "Botswana", flag: "\u{1F1E7}\u{1F1FC}" },
  { code: "NA", dialCode: "+264", name: "Namibia", flag: "\u{1F1F3}\u{1F1E6}" },
  { code: "SS", dialCode: "+211", name: "South Sudan", flag: "\u{1F1F8}\u{1F1F8}" },
  { code: "SD", dialCode: "+249", name: "Sudan", flag: "\u{1F1F8}\u{1F1E9}" },
  { code: "SO", dialCode: "+252", name: "Somalia", flag: "\u{1F1F8}\u{1F1F4}" },
  { code: "DJ", dialCode: "+253", name: "Djibouti", flag: "\u{1F1E9}\u{1F1EF}" },
  { code: "ER", dialCode: "+291", name: "Eritrea", flag: "\u{1F1EA}\u{1F1F7}" },
  { code: "BI", dialCode: "+257", name: "Burundi", flag: "\u{1F1E7}\u{1F1EE}" },
  { code: "US", dialCode: "+1", name: "United States", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "IN", dialCode: "+91", name: "India", flag: "\u{1F1EE}\u{1F1F3}" },
  { code: "CN", dialCode: "+86", name: "China", flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "AE", dialCode: "+971", name: "UAE", flag: "\u{1F1E6}\u{1F1EA}" },
  { code: "SA", dialCode: "+966", name: "Saudi Arabia", flag: "\u{1F1F8}\u{1F1E6}" },
  { code: "DE", dialCode: "+49", name: "Germany", flag: "\u{1F1E9}\u{1F1EA}" },
  { code: "FR", dialCode: "+33", name: "France", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "CA", dialCode: "+1", name: "Canada", flag: "\u{1F1E8}\u{1F1E6}" },
  { code: "AU", dialCode: "+61", name: "Australia", flag: "\u{1F1E6}\u{1F1FA}" },
  { code: "BR", dialCode: "+55", name: "Brazil", flag: "\u{1F1E7}\u{1F1F7}" },
  { code: "JP", dialCode: "+81", name: "Japan", flag: "\u{1F1EF}\u{1F1F5}" },
];

export interface PhoneInputProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  children?: ReactNode;
  value?: string;
  onChange?: (value: string, country: Country) => void;
  defaultCountry?: string;
  allowedCountries?: string[];
  disallowedCountries?: string[];
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  id?: string;
}

export const PhoneInput = forwardRef<HTMLDivElement, PhoneInputProps>(
  function PhoneInput(
    {
      value = "",
      onChange,
      defaultCountry = "KE",
      allowedCountries,
      disallowedCountries,
      placeholder = "712 345 678",
      disabled,
      label,
      error,
      id: idProp,
      style,
      ...rest
    },
    ref,
  ) {
    const countries = COUNTRIES.filter((c) => {
      if (allowedCountries) return allowedCountries.includes(c.code);
      if (disallowedCountries) return !disallowedCountries.includes(c.code);
      return true;
    });

    const [selectedCountry, setSelectedCountry] = useState<Country>(
      () => countries.find((c) => c.code === defaultCountry) ?? countries[0],
    );
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [mounted, setMounted] = useState(false);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const inputId = idProp ?? "phone-input";

    useEffect(() => setMounted(true), []);

    useEffect(() => {
      if (dropdownOpen && searchRef.current) {
        searchRef.current.focus();
      }
    }, [dropdownOpen]);

    useEffect(() => {
      if (!dropdownOpen) return;
      const handler = (e: MouseEvent) => {
        if (
          dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)
        ) {
          setDropdownOpen(false);
          setSearch("");
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [dropdownOpen]);

    useEffect(() => {
      if (!dropdownOpen) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setDropdownOpen(false);
          setSearch("");
        }
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [dropdownOpen]);

    const handlePhoneChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d]/g, "");
        onChange?.(raw, selectedCountry);
      },
      [onChange, selectedCountry],
    );

    const handleSelectCountry = useCallback(
      (country: Country) => {
        setSelectedCountry(country);
        setDropdownOpen(false);
        setSearch("");
        onChange?.(value, country);
      },
      [onChange, value],
    );

    const filtered = search
      ? countries.filter(
          (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.dialCode.includes(search) ||
            c.code.toLowerCase().includes(search.toLowerCase()),
        )
      : countries;

    const triggerRect = triggerRef.current?.getBoundingClientRect();

    return (
      <div ref={ref} style={{ ...style }} {...rest}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--fg-default)",
              marginBottom: "var(--space-1)",
            }}
          >
            {label}
          </label>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            border: `1px solid ${error ? "var(--color-error)" : "var(--border-default)"}`,
            borderRadius: "var(--radius-md)",
            background: disabled ? "var(--bg-surface-muted)" : "var(--bg-surface)",
            transition: "border-color var(--duration-fast) var(--ease-default)",
            overflow: "hidden",
          }}
        >
          <button
            ref={triggerRef}
            type="button"
            disabled={disabled}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label={`Select country code. Current: ${selectedCountry.name} ${selectedCountry.dialCode}`}
            aria-expanded={dropdownOpen}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-1)",
              paddingLeft: "var(--space-3)",
              paddingRight: "var(--space-2)",
              background: "var(--bg-surface-muted)",
              border: "none",
              borderRight: "1px solid var(--border-default)",
              cursor: disabled ? "not-allowed" : "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              color: "var(--fg-default)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>{selectedCountry.flag}</span>
            <span>{selectedCountry.dialCode}</span>
            <span
              style={{
                fontSize: 10,
                marginLeft: 2,
                color: "var(--fg-muted)",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform var(--duration-fast) var(--ease-default)",
              }}
            >
              &#9660;
            </span>
          </button>
          <input
            id={inputId}
            type="tel"
            inputMode="numeric"
            value={value}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              flex: 1,
              minWidth: 0,
              padding: "var(--space-2) var(--space-3)",
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              color: "var(--fg-default)",
            }}
          />
        </div>
        {error && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-xs)",
              color: "var(--color-error)",
              margin: "var(--space-1) 0 0",
            }}
          >
            {error}
          </p>
        )}

        {mounted &&
          dropdownOpen &&
          triggerRect &&
          createPortal(
            <div
              ref={dropdownRef}
              style={{
                position: "fixed",
                top: triggerRect.bottom + 4,
                left: triggerRect.left,
                width: Math.max(280, triggerRect.width + 100),
                maxHeight: 300,
                background: "var(--bg-surface)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                zIndex: "var(--z-dropdown)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ padding: "var(--space-2)" }}>
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search countries..."
                  style={{
                    width: "100%",
                    padding: "var(--space-2)",
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-sm)",
                    outline: "none",
                    background: "var(--bg-surface)",
                    color: "var(--fg-default)",
                  }}
                />
              </div>
              <div style={{ overflowY: "auto", flex: 1 }}>
                {filtered.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleSelectCountry(country)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      width: "100%",
                      padding: "var(--space-2) var(--space-3)",
                      border: "none",
                      background:
                        country.code === selectedCountry.code
                          ? "var(--bg-surface-muted)"
                          : "transparent",
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--text-sm)",
                      color: "var(--fg-default)",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "1.125rem" }}>{country.flag}</span>
                    <span style={{ flex: 1 }}>{country.name}</span>
                    <span style={{ color: "var(--fg-muted)", fontSize: "var(--text-xs)" }}>
                      {country.dialCode}
                    </span>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div
                    style={{
                      padding: "var(--space-4)",
                      textAlign: "center",
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--text-sm)",
                      color: "var(--fg-muted)",
                    }}
                  >
                    No countries found
                  </div>
                )}
              </div>
            </div>,
            document.body,
          )}
      </div>
    );
  },
);

export { COUNTRIES };
