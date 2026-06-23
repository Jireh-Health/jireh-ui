"use client";

import { useState, type HTMLAttributes } from "react";

export interface DataTableColumn {
  key: string;
  header: string;
  sortable?: boolean;
}

export interface DataTableProps extends HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn[];
  data: Record<string, any>[];
  sortable?: boolean;
}

type SortDir = "asc" | "desc";

function SortIcon({ active, direction }: { active: boolean; direction: SortDir }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{
        marginLeft: "var(--space-1)",
        opacity: active ? 1 : 0.3,
        flexShrink: 0,
      }}
    >
      <path
        d="M6 2L9 5H3L6 2Z"
        fill="currentColor"
        opacity={active && direction === "desc" ? 0.3 : 1}
      />
      <path
        d="M6 10L3 7H9L6 10Z"
        fill="currentColor"
        opacity={active && direction === "asc" ? 0.3 : 1}
      />
    </svg>
  );
}

export function DataTable({
  columns,
  data,
  sortable = false,
  style,
  ...rest
}: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sortedData = (() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  })();

  return (
    <div
      style={{
        overflowX: "auto",
        borderRadius: "var(--radius-lg)",
        border: "var(--border-width-thin) solid var(--border-default)",
        ...style,
      }}
      {...rest}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--font-sans)",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => {
              const isSortable = sortable && col.sortable !== false;
              return (
                <th
                  key={col.key}
                  onClick={isSortable ? () => handleSort(col.key) : undefined}
                  style={{
                    textAlign: "left",
                    padding: "var(--space-3) var(--space-4)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                    color: "var(--fg-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderBottom: "var(--border-width-thin) solid var(--border-default)",
                    background: "var(--bg-surface-raised)",
                    cursor: isSortable ? "pointer" : "default",
                    userSelect: isSortable ? "none" : undefined,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    {col.header}
                    {isSortable && (
                      <SortIcon
                        active={sortKey === col.key}
                        direction={sortKey === col.key ? sortDir : "asc"}
                      />
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              style={{
                transition: `background var(--duration-fast) var(--ease-default)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--bg-surface-raised)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "";
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    fontSize: "var(--text-sm)",
                    color: "var(--fg-default)",
                    borderBottom:
                      rowIdx < sortedData.length - 1
                        ? "var(--border-width-thin) solid var(--border-default)"
                        : "none",
                    lineHeight: 1.5,
                  }}
                >
                  {row[col.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: "var(--space-8) var(--space-4)",
                  textAlign: "center",
                  fontSize: "var(--text-sm)",
                  color: "var(--fg-muted)",
                }}
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
