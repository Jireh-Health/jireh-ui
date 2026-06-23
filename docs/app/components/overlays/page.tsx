"use client";

import { Inline } from "@jireh-health/ui/components/Inline";
import { Button } from "@jireh-health/ui/components/Button";
import { Tooltip } from "@jireh-health/ui/components/Tooltip";
import { DropdownMenu } from "@jireh-health/ui/components/DropdownMenu";
import { DemoSection, PageHeader } from "@/components/DemoSection";

export default function OverlaysPage() {
  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Overlays"
        description="Tooltips and dropdown menus for contextual content."
        count={2}
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
    </div>
  );
}
