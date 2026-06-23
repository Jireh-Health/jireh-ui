"use client";

import { Box } from "@jireh-health/ui/components/Box";
import { Stack } from "@jireh-health/ui/components/Stack";
import { Inline } from "@jireh-health/ui/components/Inline";
import { Container } from "@jireh-health/ui/components/Container";
import { Grid } from "@jireh-health/ui/components/Grid";
import { Divider } from "@jireh-health/ui/components/Divider";
import { ScrollArea } from "@jireh-health/ui/components/ScrollArea";
import { Text } from "@jireh-health/ui/components/Text";
import { DemoSection, PageHeader, type PropDef } from "@/components/DemoSection";

export default function LayoutPage() {
  const boxProps: PropDef[] = [
    { name: "as", type: "ElementType", default: '"div"', description: "HTML element or component to render as" },
    { name: "padding", type: "string", description: "Inner padding using space scale tokens" },
    { name: "paddingX", type: "string", description: "Horizontal padding (left and right) using space scale tokens" },
    { name: "paddingY", type: "string", description: "Vertical padding (top and bottom) using space scale tokens" },
    { name: "margin", type: "string", description: "Outer margin using space scale tokens" },
    { name: "bg", type: "string", description: "Background color using a semantic color token name" },
    { name: "border", type: "string", description: "CSS border shorthand value" },
    { name: "radius", type: "string", description: "Border radius using radius scale tokens" },
    { name: "shadow", type: "string", description: "CSS box-shadow value" },
    { name: "display", type: "CSSProperties['display']", description: "CSS display property" },
    { name: "flex", type: "CSSProperties['flex']", description: "CSS flex shorthand property" },
    { name: "gap", type: "string", description: "Gap between children using space scale tokens" },
    { name: "overflow", type: "CSSProperties['overflow']", description: "CSS overflow property" },
  ];

  const stackProps: PropDef[] = [
    { name: "as", type: "ElementType", default: '"div"', description: "HTML element or component to render as" },
    { name: "gap", type: "string", default: '"4"', description: "Vertical gap between children using space scale tokens" },
    { name: "align", type: '"flex-start" | "center" | "flex-end" | "stretch" | "baseline"', description: "Cross-axis alignment of children" },
  ];

  const inlineProps: PropDef[] = [
    { name: "as", type: "ElementType", default: '"div"', description: "HTML element or component to render as" },
    { name: "gap", type: "string", default: '"3"', description: "Horizontal gap between children using space scale tokens" },
    { name: "align", type: '"flex-start" | "center" | "flex-end" | "stretch" | "baseline"', description: "Cross-axis alignment of children" },
    { name: "wrap", type: "boolean", default: "true", description: "Whether children wrap to the next line when they overflow" },
  ];

  const containerProps: PropDef[] = [
    { name: "size", type: '"narrow" | "content" | "wide"', default: '"content"', description: "Max-width preset — narrow (680px), content (960px), or wide (1200px)" },
  ];

  const gridProps: PropDef[] = [
    { name: "columns", type: "number | string", description: "Number of columns or a custom grid-template-columns value" },
    { name: "minChildWidth", type: "string", description: "Minimum child width for responsive auto-fill grid (e.g. \"180px\")" },
    { name: "gap", type: "string", default: '"4"', description: "Gap between grid cells using space scale tokens" },
  ];

  const dividerProps: PropDef[] = [
    { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction of the divider line" },
    { name: "variant", type: '"default" | "strong" | "subtle"', default: '"default"', description: "Visual weight of the divider" },
  ];

  const scrollAreaProps: PropDef[] = [
    { name: "children", type: "ReactNode", required: true, description: "Scrollable content" },
    { name: "orientation", type: '"vertical" | "horizontal" | "both"', default: '"vertical"', description: "Which axes are scrollable" },
    { name: "thumbSize", type: "number", default: "6", description: "Width of the custom scrollbar thumb in pixels" },
  ];

  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Layout"
        description="Primitives for arranging content — Box, Stack, Inline, Container, Grid, Divider, and ScrollArea."
        count={7}
      />

      <DemoSection id="box" title="Box" props={boxProps} usage={`import { Box } from "@jireh-health/ui/components/Box";

<Box padding="4" bg="surface-muted" radius="md">
  Content goes here
</Box>`}>
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

      <DemoSection id="stack" title="Stack" props={stackProps} usage={`import { Stack } from "@jireh-health/ui/components/Stack";

<Stack gap="4">
  <div>First item</div>
  <div>Second item</div>
  <div>Third item</div>
</Stack>`}>
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

      <DemoSection id="inline" title="Inline" props={inlineProps} usage={`import { Inline } from "@jireh-health/ui/components/Inline";

<Inline gap="3">
  <span>Tag 1</span>
  <span>Tag 2</span>
  <span>Tag 3</span>
</Inline>`}>
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

      <DemoSection id="container" title="Container" props={containerProps} usage={`import { Container } from "@jireh-health/ui/components/Container";

<Container size="content">
  <p>Centered, max-width content area</p>
</Container>`}>
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

      <DemoSection id="grid" title="Grid" props={gridProps} usage={`import { Grid } from "@jireh-health/ui/components/Grid";

<Grid columns={3} gap="3">
  <div>Cell 1</div>
  <div>Cell 2</div>
  <div>Cell 3</div>
</Grid>`}>
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

      <DemoSection id="divider" title="Divider" props={dividerProps} usage={`import { Divider } from "@jireh-health/ui/components/Divider";

<Divider />
<Divider variant="subtle" />
<Divider orientation="vertical" />`}>
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
      <DemoSection id="scroll-area" title="ScrollArea" props={scrollAreaProps} usage={`import { ScrollArea } from "@jireh-health/ui/components/ScrollArea";

<ScrollArea style={{ height: 200 }}>
  <div>Scrollable content here...</div>
</ScrollArea>`}>
        <ScrollArea style={{ height: 200, border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)" }}>
          <Stack gap="3" style={{ padding: "var(--space-3)" }}>
            {[
              "Nairobi Hospital — Outpatient",
              "Aga Khan University Hospital — Consultation",
              "Kenyatta National Hospital — Laboratory",
              "MP Shah Hospital — Radiology",
              "Gertrude's Children's Hospital — Paediatrics",
              "Mater Hospital — Pharmacy",
              "Avenue Hospital — Dental",
              "Karen Hospital — Oncology",
              "Coptic Hospital — Surgery",
              "Ruiru Sub-County Hospital — General",
              "Kiambu Level 5 Hospital — ENT",
              "Thika Level 5 Hospital — Physiotherapy",
            ].map((item) => (
              <Box key={item} padding="3" bg="surface-muted" radius="sm">
                <Text variant="body-sm">{item}</Text>
              </Box>
            ))}
          </Stack>
        </ScrollArea>
      </DemoSection>
    </div>
  );
}
