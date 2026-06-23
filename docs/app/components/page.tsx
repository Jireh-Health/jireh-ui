import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components",
};

const categories = [
  {
    title: "Layout",
    href: "/components/layout",
    description: "Box, Stack, Inline, Container, Grid, Divider, and ScrollArea for spatial structure.",
    count: 7,
  },
  {
    title: "Typography",
    href: "/components/typography",
    description: "Heading, Text, and DisplayText for readable, consistent type.",
    count: 3,
  },
  {
    title: "Actions",
    href: "/components/actions",
    description: "Button and IconButton for primary and secondary interactions.",
    count: 2,
  },
  {
    title: "Selection & Input",
    href: "/components/input",
    description: "TextField, TextArea, SearchField, Select, Checkbox, RadioGroup, Switch, InputOtp, Label, Calendar, and SearchableSelect.",
    count: 11,
  },
  {
    title: "Navigation",
    href: "/components/navigation",
    description: "Tabs, Breadcrumb, Pagination, and Navbar for moving between views.",
    count: 4,
  },
  {
    title: "Feedback & Status",
    href: "/components/feedback",
    description: "Alert, Toast, Dialog, Drawer, AlertDialog, Loader, ProgressBar, Skeleton, and EmptyState.",
    count: 9,
  },
  {
    title: "Data Display",
    href: "/components/data-display",
    description: "Card, Badge, Tag, Avatar, DataTable, DescriptionList, Timeline, Accordion, and MapView.",
    count: 9,
  },
  {
    title: "Overlays",
    href: "/components/overlays",
    description: "Tooltip, DropdownMenu, Popover, Sheet, and BottomSheet for layered content.",
    count: 5,
  },
  {
    title: "Healthcare",
    href: "/components/healthcare",
    description: "CircleMemberCard, CashbackBanner, OnboardingTimeline, Stepper, and more.",
    count: 7,
  },
];

const totalComponents = categories.reduce((sum, c) => sum + c.count, 0);

export default function ComponentsPage() {
  return (
    <div style={{ maxWidth: "64rem" }}>
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "var(--fg-heading)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Components
          </h1>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--fg-muted)",
            }}
          >
            {totalComponents} components
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            color: "var(--fg-muted)",
            maxWidth: "42rem",
            margin: 0,
          }}
        >
          Production-ready UI primitives for the Jireh patient app, provider
          portal, and internal tools. Each component uses design tokens, supports
          light and dark mode, and is fully typed.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-5)",
                background: "var(--bg-surface)",
                height: "100%",
                transition:
                  "box-shadow var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)",
              }}
              className="doc-card-link"
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "var(--space-1)" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--fg-heading)",
                    margin: 0,
                  }}
                >
                  {cat.title}
                </h2>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "var(--fg-muted)",
                  }}
                >
                  {cat.count}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-sm)",
                  color: "var(--fg-muted)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
