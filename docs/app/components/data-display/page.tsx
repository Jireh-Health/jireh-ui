"use client";

import { Stack } from "@jireh-health/ui/components/Stack";
import { Inline } from "@jireh-health/ui/components/Inline";
import { Grid } from "@jireh-health/ui/components/Grid";
import { Text } from "@jireh-health/ui/components/Text";
import { DisplayText } from "@jireh-health/ui/components/DisplayText";
import { Button } from "@jireh-health/ui/components/Button";
import { Card, CardHeader, CardContent, CardFooter } from "@jireh-health/ui/components/Card";
import { Badge } from "@jireh-health/ui/components/Badge";
import { Tag } from "@jireh-health/ui/components/Tag";
import { Avatar } from "@jireh-health/ui/components/Avatar";
import { DataTable } from "@jireh-health/ui/components/DataTable";
import { DescriptionList } from "@jireh-health/ui/components/DescriptionList";
import { Timeline } from "@jireh-health/ui/components/Timeline";
import { Accordion } from "@jireh-health/ui/components/Accordion";
import { MapView, MapControlButton } from "@jireh-health/ui/components/MapView";
import { SearchField } from "@jireh-health/ui/components/SearchField";
import { DemoSection, PageHeader } from "@/components/DemoSection";

export default function DataDisplayPage() {
  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Data Display"
        description="Components for presenting data — Cards, Badges, Tags, Avatars, Tables, Timelines, MapView, and more."
        count={9}
      />

      <DemoSection id="card" title="Card + CardHeader + CardFooter">
        <Grid columns={2} gap="4">
          <Card padding="none" elevated>
            <CardHeader
              title="Care Saver"
              subtitle="Monthly healthcare savings"
              action={<Button variant="ghost" size="sm">Top up</Button>}
            />
            <CardContent>
              <DisplayText size="md">KES 24,800</DisplayText>
              <Text variant="body-sm" color="muted" style={{ marginTop: "var(--space-1)" }}>
                Target: KES 50,000 by Dec 2026
              </Text>
            </CardContent>
            <CardFooter>
              <Text variant="body-sm" color="muted">Last deposit: 15 Jun 2026</Text>
            </CardFooter>
          </Card>
          <Card padding="none">
            <CardHeader title="Jireh Wallet" subtitle="Available balance" />
            <CardContent>
              <DisplayText size="md">KES 8,750</DisplayText>
              <Text variant="body-sm" color="success" style={{ marginTop: "var(--space-1)" }}>
                +KES 1,200 cashback earned this month
              </Text>
            </CardContent>
            <CardFooter>
              <Inline gap="2">
                <Button variant="primary" size="sm">Send</Button>
                <Button variant="secondary" size="sm">Withdraw</Button>
              </Inline>
            </CardFooter>
          </Card>
        </Grid>
      </DemoSection>

      <DemoSection id="badge" title="Badge">
        <Inline gap="2">
          <Badge variant="default">Pending</Badge>
          <Badge variant="info">In Review</Badge>
          <Badge variant="success">Approved</Badge>
          <Badge variant="warning">Low Balance</Badge>
          <Badge variant="error">Overdue</Badge>
        </Inline>
      </DemoSection>

      <DemoSection id="tag" title="Tag">
        <Inline gap="2">
          <Tag label="Diabetes" variant="default" />
          <Tag label="Hypertension" variant="brand" />
          <Tag label="Cancer screening" variant="default" />
          <Tag label="Removable tag" variant="default" onRemove={() => {}} />
        </Inline>
      </DemoSection>

      <DemoSection id="avatar" title="Avatar">
        <Inline gap="3">
          <Avatar alt="Sarah Wanjiku" size="sm" />
          <Avatar alt="John Kamau" size="md" />
          <Avatar alt="Grace Muthoni" size="lg" />
          <Avatar alt="Dr. Ochieng" size="lg" src="https://i.pravatar.cc/150?u=dr-ochieng" />
        </Inline>
      </DemoSection>

      <DemoSection id="data-table" title="DataTable">
        <div style={{ overflowX: "auto" }}>
          <DataTable
            sortable
            columns={[
              { key: "date", header: "Date", sortable: true },
              { key: "provider", header: "Provider" },
              { key: "department", header: "Department" },
              { key: "amount", header: "Amount (KES)", sortable: true },
              { key: "status", header: "Status" },
            ]}
            data={[
              { date: "15 Jun 2026", provider: "Nairobi Hospital", department: "Pharmacy", amount: "3,200", status: "Completed" },
              { date: "12 Jun 2026", provider: "Aga Khan University Hospital", department: "Consultation", amount: "12,400", status: "Completed" },
              { date: "08 Jun 2026", provider: "Kenyatta National Hospital", department: "Laboratory", amount: "5,800", status: "Pending" },
              { date: "01 Jun 2026", provider: "MP Shah Hospital", department: "Radiology", amount: "18,500", status: "Completed" },
              { date: "28 May 2026", provider: "Gertrude's Children's Hospital", department: "Outpatient", amount: "2,100", status: "Completed" },
            ]}
          />
        </div>
      </DemoSection>

      <DemoSection id="description-list" title="DescriptionList">
        <Grid columns={2} gap="6">
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>Vertical layout</Text>
            <DescriptionList
              layout="vertical"
              items={[
                { term: "Patient", description: "Sarah Wanjiku" },
                { term: "ID Number", description: "29384756" },
                { term: "Circle", description: "Wanjiku Family Circle" },
                { term: "Joined", description: "3 Mar 2025" },
              ]}
            />
          </div>
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>Horizontal layout</Text>
            <DescriptionList
              layout="horizontal"
              items={[
                { term: "Invoice", description: "#JH-2026-1847" },
                { term: "Provider", description: "Nairobi Hospital" },
                { term: "Amount", description: "KES 3,200" },
                { term: "Status", description: "Paid" },
              ]}
            />
          </div>
        </Grid>
      </DemoSection>

      <DemoSection id="timeline" title="Timeline">
        <Timeline
          items={[
            { date: "15 Jun 2026", title: "Payment completed", description: "KES 3,200 paid to Nairobi Hospital Pharmacy via Jireh Wallet." },
            { date: "15 Jun 2026", title: "Invoice verified", description: "Invoice #JH-2026-1847 verified by the Jireh ops team." },
            { date: "14 Jun 2026", title: "Invoice submitted", description: "Sarah Wanjiku uploaded an invoice from Nairobi Hospital for pharmacy items." },
            { date: "12 Jun 2026", title: "Care Saver deposit", description: "KES 5,000 deposited via M-PESA auto-debit." },
          ]}
        />
      </DemoSection>

      <DemoSection id="accordion" title="Accordion">
        <Accordion
          items={[
            {
              title: "What is a Jireh Circle?",
              content: (
                <Text variant="body-sm">
                  A Jireh Circle is a support group of family members, friends, or colleagues who save together for healthcare. Members contribute regularly and can access micro-loans backed by the group's collective trust score.
                </Text>
              ),
              defaultOpen: true,
            },
            {
              title: "How does Care Saver work?",
              content: (
                <Text variant="body-sm">
                  Care Saver is a dedicated healthcare savings account within the Jireh app. You set a monthly target, and contributions are automatically debited from your M-PESA. The funds can only be used for healthcare payments at in-network providers.
                </Text>
              ),
            },
            {
              title: "What happens if I miss a payment?",
              content: (
                <Text variant="body-sm">
                  Missing a payment affects your trust score and may temporarily freeze your circle's loan eligibility. Contact support to set up a revised payment plan before your next due date.
                </Text>
              ),
            },
            {
              title: "Which hospitals accept Jireh Pay?",
              content: (
                <Text variant="body-sm">
                  Over 200 in-network providers across Kenya accept Jireh Pay, including Nairobi Hospital, Aga Khan University Hospital, Kenyatta National Hospital, MP Shah Hospital, and many more. Check the app for the full provider directory.
                </Text>
              ),
            },
          ]}
        />
      </DemoSection>

      <DemoSection id="map-view" title="MapView">
        <Stack gap="3">
          <Text variant="body-sm" color="muted">
            MapView provides the chrome (search bar, controls, info card) — the consumer supplies the actual map via <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", background: "var(--bg-surface-muted)", padding: "2px 4px", borderRadius: "var(--radius-sm)" }}>renderMap</code>.
          </Text>
          <MapView
            height={320}
            markers={[
              { id: "1", lat: -1.2921, lng: 36.8219, label: "Nairobi Hospital" },
              { id: "2", lat: -1.2635, lng: 36.8073, label: "Aga Khan" },
            ]}
            renderMap={() => (
              <div style={{
                width: "100%",
                height: "100%",
                background: "var(--bg-surface-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                color: "var(--fg-subtle)",
              }}>
                Map tiles go here (Google Maps, Mapbox, etc.)
              </div>
            )}
            searchBar={
              <SearchField
                placeholder="Search hospitals near you..."
                value=""
                onChange={() => {}}
                onClear={() => {}}
                style={{ background: "var(--bg-surface)", boxShadow: "var(--shadow-md)", borderRadius: "var(--radius-lg)" }}
              />
            }
            controls={
              <>
                <MapControlButton label="Zoom in">+</MapControlButton>
                <MapControlButton label="Zoom out">−</MapControlButton>
              </>
            }
          >
            <Card padding="sm">
              <CardContent>
                <Text variant="body-sm" style={{ fontWeight: 600 }}>Nairobi Hospital</Text>
                <Text variant="body-sm" color="muted">2.1 km away · In-network</Text>
              </CardContent>
            </Card>
          </MapView>
        </Stack>
      </DemoSection>
    </div>
  );
}
