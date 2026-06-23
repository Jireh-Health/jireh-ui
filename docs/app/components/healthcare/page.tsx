"use client";

import { Box } from "@jireh-health/ui/components/Box";
import { Stack } from "@jireh-health/ui/components/Stack";
import { Inline } from "@jireh-health/ui/components/Inline";
import { Grid } from "@jireh-health/ui/components/Grid";
import { Text } from "@jireh-health/ui/components/Text";
import { Button } from "@jireh-health/ui/components/Button";
import { Divider } from "@jireh-health/ui/components/Divider";
import { CircleMemberCard } from "@jireh-health/ui/components/CircleMemberCard";
import { CashbackBanner } from "@jireh-health/ui/components/CashbackBanner";
import { OnboardingTimeline } from "@jireh-health/ui/components/OnboardingTimeline";
import { Stepper } from "@jireh-health/ui/components/Stepper";
import { PatientDashboardSection } from "@jireh-health/ui/components/PatientDashboardSection";
import { ErrorBlock } from "@jireh-health/ui/components/ErrorBlock";
import { SuccessBlock } from "@jireh-health/ui/components/SuccessBlock";
import { DemoSection, PageHeader } from "@/components/DemoSection";

export default function HealthcarePage() {
  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Healthcare"
        description="Domain-specific components for Jireh Circles, Care Saver, onboarding, and payment flows."
        count={7}
      />

      <DemoSection id="circle-member-card" title="CircleMemberCard">
        <Stack gap="6">
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-3)" }}>
              List layout
            </Text>
            <Stack gap="0">
              <CircleMemberCard firstName="Sarah" lastName="Wanjiku" phoneNumber="+254 712 345 678" variant="active" layout="list" relationship="Mother" />
              <Divider />
              <CircleMemberCard firstName="John" lastName="Kamau" phoneNumber="+254 723 456 789" variant="new" layout="list" relationship="Brother" />
              <Divider />
              <CircleMemberCard firstName="Grace" lastName="Muthoni" phoneNumber="+254 734 567 890" variant="pending" layout="list" relationship="Sister" />
              <Divider />
              <CircleMemberCard firstName="Peter" lastName="Ochieng" phoneNumber="+254 745 678 901" variant="defaulted" layout="list" relationship="Uncle" />
              <Divider />
              <CircleMemberCard firstName="Mary" lastName="Akinyi" phoneNumber="+254 756 789 012" variant="inactive" layout="list" relationship="Cousin" />
            </Stack>
          </div>
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-3)" }}>
              Card layout
            </Text>
            <Grid columns={3} gap="3" minChildWidth="160px">
              <CircleMemberCard firstName="Sarah" lastName="Wanjiku" variant="active" layout="card" relationship="Mother" />
              <CircleMemberCard firstName="John" lastName="Kamau" variant="new" layout="card" relationship="Brother" />
              <CircleMemberCard firstName="Grace" lastName="Muthoni" variant="pending" layout="card" relationship="Sister" />
            </Grid>
          </div>
        </Stack>
      </DemoSection>

      <DemoSection id="cashback-banner" title="CashbackBanner">
        <Stack gap="3">
          <CashbackBanner
            title="Pay via Jireh and earn cashback!"
            description="Get 3% cashback on all pharmacy payments at in-network providers this month. Your earnings are deposited directly into your Jireh Wallet."
          />
          <CashbackBanner
            title="Referral bonus active"
            description="Invite a friend to Jireh and both of you earn KES 500 in Jireh Wallet credit."
          />
        </Stack>
      </DemoSection>

      <DemoSection id="onboarding-timeline" title="OnboardingTimeline">
        <OnboardingTimeline
          steps={[
            "Create your Jireh account",
            "Verify your phone number",
            "Set up Care Saver",
            "Join or create a Circle",
            "Make your first payment",
          ]}
          currentStep={2}
        />
      </DemoSection>

      <DemoSection id="stepper" title="Stepper">
        <Stack gap="6">
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              Step 3 of 5 -- Setting up Care Saver
            </Text>
            <Stepper currentStep={2} totalSteps={5} />
          </div>
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              Completed (all steps done)
            </Text>
            <Stepper currentStep={4} totalSteps={4} />
          </div>
        </Stack>
      </DemoSection>

      <DemoSection id="patient-dashboard-section" title="PatientDashboardSection">
        <PatientDashboardSection title="Upcoming Appointments" link={{ href: "#", text: "View all" }}>
          <Stack gap="2">
            <Box padding="3" bg="surface-muted" radius="sm">
              <Inline gap="3">
                <Text variant="body-sm" style={{ fontWeight: 600 }}>22 Jun 2026</Text>
                <Text variant="body-sm" color="muted">Dr. Ochieng -- Diabetes check-up, Nairobi Hospital</Text>
              </Inline>
            </Box>
            <Box padding="3" bg="surface-muted" radius="sm">
              <Inline gap="3">
                <Text variant="body-sm" style={{ fontWeight: 600 }}>05 Jul 2026</Text>
                <Text variant="body-sm" color="muted">Lab work -- HbA1c test, Aga Khan University Hospital</Text>
              </Inline>
            </Box>
          </Stack>
        </PatientDashboardSection>
      </DemoSection>

      <DemoSection id="error-block" title="ErrorBlock">
        <ErrorBlock
          title="Payment failed"
          message="We could not process your payment of KES 3,200 to Nairobi Hospital. Please check your M-PESA balance and try again."
          onRetry={() => {}}
        />
      </DemoSection>

      <DemoSection id="success-block" title="SuccessBlock">
        <SuccessBlock
          title="Payment successful"
          message="KES 3,200 has been paid to Nairobi Hospital. A receipt has been sent to your phone via SMS."
          action={<Button variant="primary" size="sm">View receipt</Button>}
        />
      </DemoSection>
    </div>
  );
}
