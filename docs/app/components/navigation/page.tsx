"use client";

import { useState } from "react";
import { Stack } from "@jireh-health/ui/components/Stack";
import { Text } from "@jireh-health/ui/components/Text";
import { Tabs } from "@jireh-health/ui/components/Tabs";
import { Breadcrumb } from "@jireh-health/ui/components/Breadcrumb";
import { Pagination } from "@jireh-health/ui/components/Pagination";
import { Navbar, NavbarItem } from "@jireh-health/ui/components/Navbar";
import { Button } from "@jireh-health/ui/components/Button";
import { Avatar } from "@jireh-health/ui/components/Avatar";
import { DemoSection, PageHeader } from "@/components/DemoSection";

export default function NavigationPage() {
  const [currentPage, setCurrentPage] = useState(3);
  const [simplePage, setSimplePage] = useState(1);

  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Navigation"
        description="Components for moving between views — Tabs, Breadcrumb, Pagination, and Navbar."
        count={4}
      />

      <DemoSection id="tabs" title="Tabs">
        <Tabs
          items={[
            {
              label: "Overview",
              content: (
                <Stack gap="2">
                  <Text variant="body-sm">
                    Your Care Saver balance is KES 24,800. You have 3 upcoming
                    appointments this month.
                  </Text>
                </Stack>
              ),
            },
            {
              label: "Transactions",
              content: (
                <Text variant="body-sm">
                  15 Jun -- KES 3,200 paid to Nairobi Hospital (Pharmacy)
                </Text>
              ),
            },
            {
              label: "Savings",
              content: (
                <Text variant="body-sm">
                  Monthly target: KES 5,000. Current streak: 4 months.
                </Text>
              ),
            },
            {
              label: "Archived",
              content: <Text variant="body-sm">No archived records.</Text>,
              disabled: true,
            },
          ]}
        />
      </DemoSection>

      <DemoSection id="breadcrumb" title="Breadcrumb">
        <Stack gap="4">
          <Breadcrumb
            items={[
              { label: "Home", href: "#" },
              { label: "Payments", href: "#" },
              { label: "Invoice #JH-2026-1847" },
            ]}
          />
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "#" },
              { label: "Circles", href: "#" },
              { label: "Wanjiku Family Circle", href: "#" },
              { label: "Members" },
            ]}
          />
        </Stack>
      </DemoSection>

      <DemoSection id="pagination" title="Pagination">
        <Stack gap="6">
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              Full variant
            </Text>
            <Pagination totalPages={12} currentPage={currentPage} onChange={setCurrentPage} variant="full" />
          </div>
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              Simple variant
            </Text>
            <Pagination totalPages={5} currentPage={simplePage} onChange={setSimplePage} variant="simple" />
          </div>
        </Stack>
      </DemoSection>

      <DemoSection id="navbar" title="Navbar">
        <Stack gap="4">
          <div style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            <Navbar
              sticky={false}
              logo={
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "var(--text-lg)", color: "var(--color-jireh-purple)" }}>
                  Jireh
                </span>
              }
              actions={
                <>
                  <Button variant="ghost" size="sm">Help</Button>
                  <Avatar alt="Sarah W" size="sm" />
                </>
              }
            >
              <NavbarItem active>Dashboard</NavbarItem>
              <NavbarItem>Payments</NavbarItem>
              <NavbarItem>Circles</NavbarItem>
              <NavbarItem>Discover</NavbarItem>
            </Navbar>
          </div>
        </Stack>
      </DemoSection>
    </div>
  );
}
