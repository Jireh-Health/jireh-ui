"use client";

import { useState } from "react";
import { Stack } from "@jireh-health/ui/components/Stack";
import { Inline } from "@jireh-health/ui/components/Inline";
import { Text } from "@jireh-health/ui/components/Text";
import { Button } from "@jireh-health/ui/components/Button";
import { Tooltip } from "@jireh-health/ui/components/Tooltip";
import { DropdownMenu } from "@jireh-health/ui/components/DropdownMenu";
import { Popover, PopoverTrigger, PopoverContent } from "@jireh-health/ui/components/Popover";
import { Sheet } from "@jireh-health/ui/components/Sheet";
import { BottomSheet } from "@jireh-health/ui/components/BottomSheet";
import { DescriptionList } from "@jireh-health/ui/components/DescriptionList";
import { DemoSection, PageHeader } from "@/components/DemoSection";

export default function OverlaysPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetLeftOpen, setSheetLeftOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Overlays"
        description="Tooltips, dropdown menus, popovers, sheets, and bottom sheets for layered content."
        count={5}
      />

      <DemoSection id="tooltip" title="Tooltip">
        <Inline gap="4">
          <Tooltip content="View your Care Saver balance" placement="top">
            <Button variant="secondary" size="sm">Hover me (top)</Button>
          </Tooltip>
          <Tooltip content="KES 24,800 available" placement="bottom">
            <Button variant="secondary" size="sm">Hover me (bottom)</Button>
          </Tooltip>
          <Tooltip content="Send money to a friend" placement="right">
            <Button variant="secondary" size="sm">Hover me (right)</Button>
          </Tooltip>
        </Inline>
      </DemoSection>

      <DemoSection id="dropdown-menu" title="DropdownMenu">
        <DropdownMenu
          trigger={<Button variant="secondary" size="sm">Actions</Button>}
          items={[
            { label: "View details", onClick: () => {} },
            { label: "Download receipt", onClick: () => {} },
            { label: "Share via SMS", onClick: () => {} },
            { label: "Report issue", onClick: () => {}, destructive: true },
          ]}
        />
      </DemoSection>

      <DemoSection id="popover" title="Popover">
        <Inline gap="4">
          <Popover>
            <PopoverTrigger>
              <Button variant="secondary" size="sm">Account info</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start">
              <Stack gap="2">
                <Text variant="body-sm" style={{ fontWeight: 600 }}>Sarah Wanjiku</Text>
                <Text variant="body-sm" color="muted">Member since March 2025</Text>
                <Text variant="body-sm" color="muted">Trust Score: 87/100</Text>
              </Stack>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <Button variant="secondary" size="sm">Balance (right)</Button>
            </PopoverTrigger>
            <PopoverContent side="right">
              <Stack gap="1">
                <Text variant="body-sm" color="muted">Care Saver</Text>
                <Text style={{ fontWeight: 600, fontSize: "var(--text-lg)" }}>KES 24,800</Text>
              </Stack>
            </PopoverContent>
          </Popover>
        </Inline>
      </DemoSection>

      <DemoSection id="sheet" title="Sheet">
        <Inline gap="3">
          <Button variant="secondary" size="sm" onClick={() => setSheetOpen(true)}>
            Open Sheet (right)
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setSheetLeftOpen(true)}>
            Open Sheet (left)
          </Button>
        </Inline>
        <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} side="right" width={380}>
          <Stack gap="4">
            <Text variant="body-sm" style={{ fontWeight: 600, fontSize: "var(--text-lg)" }}>Payment Filters</Text>
            <DescriptionList
              layout="vertical"
              items={[
                { term: "Date range", description: "Last 30 days" },
                { term: "Status", description: "All" },
                { term: "Provider", description: "Any in-network" },
                { term: "Amount", description: "KES 0 — KES 50,000" },
              ]}
            />
            <Button variant="primary" onClick={() => setSheetOpen(false)}>Apply Filters</Button>
          </Stack>
        </Sheet>
        <Sheet open={sheetLeftOpen} onClose={() => setSheetLeftOpen(false)} side="left" width={320}>
          <Stack gap="3">
            <Text variant="body-sm" style={{ fontWeight: 600, fontSize: "var(--text-lg)" }}>Quick Nav</Text>
            {["Dashboard", "Payments", "Circles", "Discover", "Settings"].map((item) => (
              <Text key={item} variant="body-sm" style={{ cursor: "pointer" }}>{item}</Text>
            ))}
          </Stack>
        </Sheet>
      </DemoSection>

      <DemoSection id="bottom-sheet" title="BottomSheet">
        <Stack gap="3">
          <Text variant="body-sm" color="muted">
            A mobile-optimised sheet with drag handle and snap points. Drag down to dismiss.
          </Text>
          <Button variant="secondary" size="sm" onClick={() => setBottomSheetOpen(true)}>
            Open Bottom Sheet
          </Button>
        </Stack>
        <BottomSheet open={bottomSheetOpen} onClose={() => setBottomSheetOpen(false)} snapPoints={[0.4, 0.85]}>
          <Stack gap="4">
            <Text variant="body-sm" style={{ fontWeight: 600, fontSize: "var(--text-lg)" }}>Transaction Receipt</Text>
            <DescriptionList
              layout="vertical"
              items={[
                { term: "Reference", description: "TXN-JH-2026-0615-A7K3" },
                { term: "Date", description: "15 Jun 2026, 14:32 EAT" },
                { term: "Provider", description: "Nairobi Hospital" },
                { term: "Amount", description: "KES 3,200" },
                { term: "Status", description: "Completed" },
              ]}
            />
            <Button variant="primary" onClick={() => setBottomSheetOpen(false)}>Done</Button>
          </Stack>
        </BottomSheet>
      </DemoSection>
    </div>
  );
}
