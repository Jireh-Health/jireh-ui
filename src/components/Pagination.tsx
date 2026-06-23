"use client";

import { forwardRef, type HTMLAttributes } from "react";

export type PaginationVariant = "full" | "simple";

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  variant?: PaginationVariant;
}

const buttonBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "32px",
  height: "32px",
  padding: "0 var(--space-2)",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-sm)",
  border: "var(--border-width-thin) solid var(--border-default)",
  borderRadius: "var(--radius-md)",
  background: "var(--bg-surface)",
  cursor: "pointer",
  transition: `background var(--duration-fast) var(--ease-default)`,
};

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { totalPages, currentPage, onChange, variant = "full", style, ...rest },
  ref,
) {
  if (totalPages <= 1) return null;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  if (variant === "simple") {
    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          fontFamily: "var(--font-sans)",
          ...style,
        }}
        {...rest}
      >
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => canPrev && onChange(currentPage - 1)}
          style={{
            ...buttonBase,
            color: canPrev ? "var(--fg-default)" : "var(--fg-subtle)",
            opacity: canPrev ? 1 : 0.5,
            cursor: canPrev ? "pointer" : "not-allowed",
          }}
        >
          Previous
        </button>
        <span
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--fg-muted)",
          }}
        >
          {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => canNext && onChange(currentPage + 1)}
          style={{
            ...buttonBase,
            color: canNext ? "var(--fg-default)" : "var(--fg-subtle)",
            opacity: canNext ? 1 : 0.5,
            cursor: canNext ? "pointer" : "not-allowed",
          }}
        >
          Next
        </button>
      </nav>
    );
  }

  // Full variant with numbered pages
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      ref={ref}
      aria-label="Pagination"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-1)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={!canPrev}
        onClick={() => canPrev && onChange(currentPage - 1)}
        style={{
          ...buttonBase,
          color: canPrev ? "var(--fg-default)" : "var(--fg-subtle)",
          opacity: canPrev ? 1 : 0.5,
          cursor: canPrev ? "pointer" : "not-allowed",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            style={{
              minWidth: "32px",
              height: "32px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--text-sm)",
              color: "var(--fg-muted)",
            }}
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onChange(page as number)}
            style={{
              ...buttonBase,
              fontWeight: page === currentPage ? 600 : 400,
              background: page === currentPage ? "var(--interactive-default)" : "var(--bg-surface)",
              color: page === currentPage ? "var(--fg-on-brand)" : "var(--fg-default)",
              borderColor: page === currentPage ? "var(--interactive-default)" : "var(--border-default)",
            }}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={!canNext}
        onClick={() => canNext && onChange(currentPage + 1)}
        style={{
          ...buttonBase,
          color: canNext ? "var(--fg-default)" : "var(--fg-subtle)",
          opacity: canNext ? 1 : 0.5,
          cursor: canNext ? "pointer" : "not-allowed",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
});

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) {
    pages.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("...");
  }

  pages.push(total);
  return pages;
}
