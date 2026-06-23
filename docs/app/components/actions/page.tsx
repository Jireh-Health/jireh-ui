"use client";

import { Inline } from "@jireh-health/ui/components/Inline";
import { Stack } from "@jireh-health/ui/components/Stack";
import { Text } from "@jireh-health/ui/components/Text";
import { Button } from "@jireh-health/ui/components/Button";
import { IconButton } from "@jireh-health/ui/components/IconButton";
import { DemoSection, PageHeader } from "@/components/DemoSection";
import { GearIcon, TrashIcon, PlusIcon } from "@/components/Icons";

export default function ActionsPage() {
  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Actions"
        description="Buttons and icon buttons for triggering actions."
        count={2}
      />

      <DemoSection id="button" title="Button">
        <Stack gap="4">
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              Variants
            </Text>
            <Inline gap="2">
              <Button variant="primary">Pay Now</Button>
              <Button variant="secondary">View Details</Button>
              <Button variant="ghost">Cancel</Button>
              <Button variant="destructive">Remove</Button>
              <Button variant="outline">Export</Button>
              <Button variant="bubblegum">Earn Cashback</Button>
              <Button variant="link">Learn more</Button>
            </Inline>
          </div>
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              Sizes
            </Text>
            <Inline gap="2">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </Inline>
          </div>
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              States
            </Text>
            <Inline gap="2">
              <Button variant="primary" loading>Processing payment...</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </Inline>
          </div>
        </Stack>
      </DemoSection>

      <DemoSection id="icon-button" title="IconButton">
        <Inline gap="3">
          <IconButton icon={<GearIcon />} label="Settings" variant="ghost" size="md" />
          <IconButton icon={<TrashIcon />} label="Delete transaction" variant="ghost" size="md" />
          <IconButton icon={<PlusIcon />} label="Add to circle" variant="default" size="md" />
          <IconButton icon={<GearIcon />} label="Small settings" variant="ghost" size="sm" />
        </Inline>
      </DemoSection>
    </div>
  );
}
