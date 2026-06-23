"use client";

import { forwardRef, useState, useMemo, type HTMLAttributes } from "react";

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: Date | null;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  locale?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const navBtnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  borderRadius: "var(--radius-sm)",
  border: "none",
  background: "transparent",
  color: "var(--fg-default)",
  cursor: "pointer",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-base)",
};

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar(
    { value, onChange, min, max, locale = "en-US", style, ...rest },
    ref,
  ) {
    const today = useMemo(() => new Date(), []);
    const [viewYear, setViewYear] = useState(value?.getFullYear() ?? today.getFullYear());
    const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? today.getMonth());

    const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString(locale, {
      month: "long",
      year: "numeric",
    });

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const startDay = getStartDayOfWeek(viewYear, viewMonth);
    const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1);

    const prevMonth = () => {
      if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11); }
      else setViewMonth(viewMonth - 1);
    };
    const nextMonth = () => {
      if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0); }
      else setViewMonth(viewMonth + 1);
    };

    const isDisabled = (date: Date) => {
      if (min && date < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
      if (max && date > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
      return false;
    };

    const cells: { date: Date; inMonth: boolean }[] = [];
    for (let i = 0; i < startDay; i++) {
      const d = prevMonthDays - startDay + 1 + i;
      cells.push({ date: new Date(viewYear, viewMonth - 1, d), inMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(viewYear, viewMonth, d), inMonth: true });
    }
    const remaining = 7 - (cells.length % 7);
    if (remaining < 7) {
      for (let d = 1; d <= remaining; d++) {
        cells.push({ date: new Date(viewYear, viewMonth + 1, d), inMonth: false });
      }
    }

    return (
      <div
        ref={ref}
        style={{
          fontFamily: "var(--font-sans)",
          width: 280,
          userSelect: "none",
          ...style,
        }}
        {...rest}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "var(--space-3)",
          }}
        >
          <button type="button" onClick={prevMonth} aria-label="Previous month" style={navBtnStyle}>
            ‹
          </button>
          <span
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              color: "var(--fg-heading)",
            }}
          >
            {monthLabel}
          </span>
          <button type="button" onClick={nextMonth} aria-label="Next month" style={navBtnStyle}>
            ›
          </button>
        </div>

        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0 }}>
          {DAYS.map((d) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: "var(--text-xs)",
                fontWeight: 500,
                color: "var(--fg-subtle)",
                paddingBottom: "var(--space-2)",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div
          role="grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}
        >
          {cells.map(({ date, inMonth }, i) => {
            const selected = value && isSameDay(date, value);
            const isToday = isSameDay(date, today);
            const disabled = !inMonth || isDisabled(date);

            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => {
                  if (!disabled && onChange) onChange(date);
                }}
                aria-label={date.toLocaleDateString(locale)}
                aria-selected={selected || undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  margin: "0 auto",
                  borderRadius: "var(--radius-md)",
                  border: isToday && !selected ? "1px solid var(--border-strong)" : "none",
                  background: selected
                    ? "var(--interactive-default)"
                    : "transparent",
                  color: selected
                    ? "var(--fg-on-brand)"
                    : disabled
                      ? "var(--fg-subtle)"
                      : "var(--fg-default)",
                  fontSize: "var(--text-sm)",
                  fontFamily: "var(--font-sans)",
                  cursor: disabled ? "default" : "pointer",
                  fontWeight: isToday ? 600 : 400,
                  opacity: !inMonth ? 0.3 : 1,
                  padding: 0,
                }}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);
