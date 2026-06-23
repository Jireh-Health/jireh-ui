"use client";

import { useState } from "react";
import { Stack } from "@jireh-health/ui/components/Stack";
import { Text } from "@jireh-health/ui/components/Text";
import { Tabs } from "@jireh-health/ui/components/Tabs";
import { Breadcrumb } from "@jireh-health/ui/components/Breadcrumb";
import { Pagination } from "@jireh-health/ui/components/Pagination";
import { Navbar, NavbarItem } from "@jireh-health/ui/components/Navbar";
import { BottomNav, BottomNavItem } from "@jireh-health/ui/components/BottomNav";
import { Button } from "@jireh-health/ui/components/Button";
import { Avatar } from "@jireh-health/ui/components/Avatar";
import { DemoSection, PageHeader } from "@/components/DemoSection";

export default function NavigationPage() {
  const [currentPage, setCurrentPage] = useState(3);
  const [simplePage, setSimplePage] = useState(1);
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Navigation"
        description="Components for moving between views — Tabs, Breadcrumb, Pagination, Navbar, and BottomNav."
        count={5}
      />

      <DemoSection id="tabs" title="Tabs" usage={`import { Tabs } from "@jireh-health/ui/components/Tabs";

<Tabs
  items={[
    { label: "Overview", content: <Text>Overview content</Text> },
    { label: "Transactions", content: <Text>Transactions</Text> },
    { label: "Archived", content: <Text>No records</Text>, disabled: true },
  ]}
/>`}>
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

      <DemoSection id="breadcrumb" title="Breadcrumb" usage={`import { Breadcrumb } from "@jireh-health/ui/components/Breadcrumb";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Payments", href: "/payments" },
    { label: "Invoice #JH-2026-1847" },
  ]}
/>`}>
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

      <DemoSection id="pagination" title="Pagination" usage={`import { Pagination } from "@jireh-health/ui/components/Pagination";

const [page, setPage] = useState(1);

<Pagination
  totalPages={12}
  currentPage={page}
  onChange={setPage}
  variant="full"
/>`}>
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

      <DemoSection id="navbar" title="Navbar" usage={`import { Navbar, NavbarItem } from "@jireh-health/ui/components/Navbar";

<Navbar
  logo={<span style={{ fontWeight: 700 }}>Jireh</span>}
  actions={<Button variant="ghost" size="sm">Help</Button>}
>
  <NavbarItem active>Dashboard</NavbarItem>
  <NavbarItem>Payments</NavbarItem>
  <NavbarItem>Circles</NavbarItem>
</Navbar>`}>
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

      <DemoSection id="bottom-nav" title="BottomNav" usage={`import { BottomNav, BottomNavItem } from "@jireh-health/ui/components/BottomNav";

const [tab, setTab] = useState("home");

<BottomNav value={tab} onValueChange={setTab}>
  <BottomNavItem value="home" icon={<HomeIcon />} label="Home" />
  <BottomNavItem value="payments" icon={<WalletIcon />} label="Payments" />
  <BottomNavItem value="circles" icon={<CircleIcon />} label="Circles" badge={3} />
  <BottomNavItem value="profile" icon={<UserIcon />} label="Profile" />
</BottomNav>`}>
        <Stack gap="3">
          <Text variant="body-sm" color="muted">
            A fixed-bottom mobile navigation bar. The demo below is rendered inline (not fixed) for preview.
          </Text>
          <div style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
            <BottomNav
              value={activeTab}
              onValueChange={setActiveTab}
              style={{ position: "relative", bottom: "auto", left: "auto", right: "auto", borderTop: "none" }}
            >
              <BottomNavItem value="home" label="Home" icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              } />
              <BottomNavItem value="payments" label="Payments" icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2.468"/><path d="M3 5v16a2 2 0 0 0 2 2h16"/></svg>
              } />
              <BottomNavItem value="circles" label="Circles" badge={3} icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/></svg>
              } />
              <BottomNavItem value="discover" label="Discover" icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              } />
              <BottomNavItem value="profile" label="Profile" icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
              } />
            </BottomNav>
          </div>
          <Text variant="body-sm" color="muted">
            Active: <strong>{activeTab}</strong>
          </Text>
        </Stack>
      </DemoSection>
    </div>
  );
}
