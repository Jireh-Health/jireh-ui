"use client";

import { Box } from "@jireh-health/ui/components/Box";
import { Stack } from "@jireh-health/ui/components/Stack";
import { Inline } from "@jireh-health/ui/components/Inline";
import { Container } from "@jireh-health/ui/components/Container";
import { Grid } from "@jireh-health/ui/components/Grid";
import { Divider } from "@jireh-health/ui/components/Divider";
import { Text } from "@jireh-health/ui/components/Text";
import { DemoSection, PageHeader } from "@/components/DemoSection";

export default function LayoutPage() {
  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Layout"
        description="Primitives for arranging content — Box, Stack, Inline, Container, Grid, and Divider."
        count={6}
      />

      <DemoSection id="box" title="Box">
        <Stack gap="4">
          <Box padding="4" bg="surface-muted" radius="md">
            <Text>Default Box with padding and background</Text>
          </Box>
          <Box padding="6" bg="surface" radius="lg" border="1px solid var(--border-default)">
            <Text>Box with border, larger padding, and rounded corners</Text>
          </Box>
          <Box padding="3" bg="surface-brand-light" radius="sm">
            <Text color="default">Branded background box for highlights</Text>
          </Box>
        </Stack>
      </DemoSection>

      <DemoSection id="stack" title="Stack">
        <Stack gap="3">
          <Box padding="3" bg="surface-muted" radius="sm">
            <Text variant="body-sm">Stack item 1 -- Patient intake form</Text>
          </Box>
          <Box padding="3" bg="surface-muted" radius="sm">
            <Text variant="body-sm">Stack item 2 -- Insurance details</Text>
          </Box>
          <Box padding="3" bg="surface-muted" radius="sm">
            <Text variant="body-sm">Stack item 3 -- Payment summary</Text>
          </Box>
        </Stack>
      </DemoSection>

      <DemoSection id="inline" title="Inline">
        <Inline gap="3">
          <Box padding="3" bg="surface-muted" radius="sm">
            <Text variant="body-sm">Consultation</Text>
          </Box>
          <Box padding="3" bg="surface-muted" radius="sm">
            <Text variant="body-sm">Lab work</Text>
          </Box>
          <Box padding="3" bg="surface-muted" radius="sm">
            <Text variant="body-sm">Pharmacy</Text>
          </Box>
          <Box padding="3" bg="surface-muted" radius="sm">
            <Text variant="body-sm">Follow-up</Text>
          </Box>
        </Inline>
      </DemoSection>

      <DemoSection id="container" title="Container">
        <Stack gap="4">
          <Container size="narrow">
            <Box padding="3" bg="surface-muted" radius="sm">
              <Text variant="body-sm" color="muted">
                Narrow container (max-width for reading content)
              </Text>
            </Box>
          </Container>
          <Container size="content">
            <Box padding="3" bg="surface-muted" radius="sm">
              <Text variant="body-sm" color="muted">
                Content container (default max-width)
              </Text>
            </Box>
          </Container>
          <Container size="wide">
            <Box padding="3" bg="surface-muted" radius="sm">
              <Text variant="body-sm" color="muted">
                Wide container (full dashboard width)
              </Text>
            </Box>
          </Container>
        </Stack>
      </DemoSection>

      <DemoSection id="grid" title="Grid">
        <Stack gap="6">
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              3-column grid
            </Text>
            <Grid columns={3} gap="3">
              <Box padding="4" bg="surface-muted" radius="sm">
                <Text variant="body-sm">KES 12,400</Text>
              </Box>
              <Box padding="4" bg="surface-muted" radius="sm">
                <Text variant="body-sm">KES 8,750</Text>
              </Box>
              <Box padding="4" bg="surface-muted" radius="sm">
                <Text variant="body-sm">KES 3,200</Text>
              </Box>
            </Grid>
          </div>
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              Responsive grid with minChildWidth
            </Text>
            <Grid minChildWidth="180px" gap="3">
              <Box padding="4" bg="surface-muted" radius="sm">
                <Text variant="body-sm">Savings</Text>
              </Box>
              <Box padding="4" bg="surface-muted" radius="sm">
                <Text variant="body-sm">Wallet</Text>
              </Box>
              <Box padding="4" bg="surface-muted" radius="sm">
                <Text variant="body-sm">Loans</Text>
              </Box>
              <Box padding="4" bg="surface-muted" radius="sm">
                <Text variant="body-sm">Cashback</Text>
              </Box>
            </Grid>
          </div>
        </Stack>
      </DemoSection>

      <DemoSection id="divider" title="Divider">
        <Stack gap="4">
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              Horizontal (default)
            </Text>
            <Divider />
          </div>
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              Horizontal (subtle)
            </Text>
            <Divider variant="subtle" />
          </div>
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              Vertical dividers in a row
            </Text>
            <Inline gap="3">
              <Text variant="body-sm">Nairobi Hospital</Text>
              <Divider orientation="vertical" />
              <Text variant="body-sm">Outpatient</Text>
              <Divider orientation="vertical" />
              <Text variant="body-sm">KES 4,500</Text>
            </Inline>
          </div>
        </Stack>
      </DemoSection>
    </div>
  );
}
