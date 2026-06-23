"use client";

import { Inline } from "@jireh-health/ui/components/Inline";
import { Stack } from "@jireh-health/ui/components/Stack";
import { Text } from "@jireh-health/ui/components/Text";
import { Button } from "@jireh-health/ui/components/Button";
import { IconButton } from "@jireh-health/ui/components/IconButton";
import { DemoSection, PageHeader, type PropDef } from "@/components/DemoSection";
import { GearIcon, TrashIcon, PlusIcon } from "@/components/Icons";

export default function ActionsPage() {
  const buttonProps: PropDef[] = [
    { name: "children", type: "ReactNode", description: "Button label / content." },
    { name: "variant", type: '"primary" | "secondary" | "ghost" | "destructive" | "outline" | "bubblegum" | "link"', default: '"primary"', description: "Visual style of the button." },
    { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Controls height and padding. Ignored when variant is \"link\"." },
    { name: "loading", type: "boolean", default: "false", description: "Shows a spinner, disables interaction, and reduces opacity." },
    { name: "iconLeft", type: "ReactNode", description: "Icon rendered before children. Hidden while loading." },
    { name: "iconRight", type: "ReactNode", description: "Icon rendered after children. Hidden while loading." },
  ];

  const iconButtonProps: PropDef[] = [
    { name: "icon", type: "ReactNode", required: true, description: "The icon element to render inside the button." },
    { name: "label", type: "string", required: true, description: "Accessible label applied as aria-label." },
    { name: "variant", type: '"default" | "ghost" | "destructive"', default: '"default"', description: "Visual style of the icon button." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls the width and height of the button." },
  ];

  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Actions"
        description="Buttons and icon buttons for triggering actions."
        count={2}
      />

      <DemoSection id="button" title="Button" props={buttonProps} usage={`import { Button } from "@jireh-health/ui/components/Button";

<Button variant="primary" onClick={handleClick}>
  Pay now
</Button>`}>
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

      <DemoSection id="icon-button" title="IconButton" props={iconButtonProps} usage={`import { IconButton } from "@jireh-health/ui/components/IconButton";

<IconButton
  icon={<GearIcon />}
  label="Settings"
  variant="ghost"
  size="md"
/>`}>
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
