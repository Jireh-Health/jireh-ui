"use client";

import { Stack } from "@jireh-health/ui/components/Stack";
import { Inline } from "@jireh-health/ui/components/Inline";
import { Heading } from "@jireh-health/ui/components/Heading";
import { Text } from "@jireh-health/ui/components/Text";
import { DisplayText } from "@jireh-health/ui/components/DisplayText";
import { DemoSection, PageHeader } from "@/components/DemoSection";

export default function TypographyPage() {
  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Typography"
        description="Heading, Text, and DisplayText components for all typographic needs."
        count={3}
      />

      <DemoSection id="heading" title="Heading" usage={`import { Heading } from "@jireh-health/ui/components/Heading";

<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Title</Heading>
<Heading level={3}>Subsection Title</Heading>`}>
        <Stack gap="3">
          <Heading level={1}>Patient Dashboard</Heading>
          <Heading level={2}>Care Saver Balance</Heading>
          <Heading level={3}>Recent Transactions</Heading>
          <Heading level={4}>Payment Breakdown</Heading>
        </Stack>
      </DemoSection>

      <DemoSection id="text" title="Text" usage={`import { Text } from "@jireh-health/ui/components/Text";

<Text variant="body">Standard body text content.</Text>
<Text variant="body-sm" color="muted">Secondary caption text.</Text>
<Text variant="mono">TXN-JH-2026-0001</Text>`}>
        <Stack gap="3">
          <Text variant="body-lg">
            Your Jireh Care Saver helps you prepare for healthcare expenses
            before they happen.
          </Text>
          <Text variant="body">
            Sarah Wanjiku saved KES 2,400 this month towards her diabetes
            management fund.
          </Text>
          <Text variant="body-sm">
            Last deposit: 15 Jun 2026 via M-PESA
          </Text>
          <Text variant="ui">TRANSACTION REFERENCE</Text>
          <Text variant="mono">TXN-JH-2026-0615-A7K3</Text>
          <Inline gap="4">
            <Text color="default">Default</Text>
            <Text color="muted">Muted</Text>
            <Text color="error">Error</Text>
            <Text color="success">Success</Text>
          </Inline>
        </Stack>
      </DemoSection>

      <DemoSection id="display-text" title="DisplayText" usage={`import { DisplayText } from "@jireh-health/ui/components/DisplayText";

<DisplayText size="xl">KES 124,800</DisplayText>
<DisplayText size="md">KES 8,750</DisplayText>`}>
        <Stack gap="4">
          <DisplayText size="xl">KES 124,800</DisplayText>
          <DisplayText size="lg">KES 45,200</DisplayText>
          <DisplayText size="md">KES 8,750</DisplayText>
        </Stack>
      </DemoSection>
    </div>
  );
}
