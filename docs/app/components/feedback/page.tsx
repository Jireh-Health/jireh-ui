"use client";

import { useState } from "react";
import { Box } from "@jireh-health/ui/components/Box";
import { Stack } from "@jireh-health/ui/components/Stack";
import { Inline } from "@jireh-health/ui/components/Inline";
import { Text } from "@jireh-health/ui/components/Text";
import { Button } from "@jireh-health/ui/components/Button";
import { Alert } from "@jireh-health/ui/components/Alert";
import { Toast } from "@jireh-health/ui/components/Toast";
import { Dialog } from "@jireh-health/ui/components/Dialog";
import { Drawer } from "@jireh-health/ui/components/Drawer";
import { Loader } from "@jireh-health/ui/components/Loader";
import { ProgressBar } from "@jireh-health/ui/components/ProgressBar";
import { Skeleton } from "@jireh-health/ui/components/Skeleton";
import { EmptyState } from "@jireh-health/ui/components/EmptyState";
import { DescriptionList } from "@jireh-health/ui/components/DescriptionList";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@jireh-health/ui/components/AlertDialog";
import { DemoSection, PageHeader } from "@/components/DemoSection";

export default function FeedbackPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Feedback & Status"
        description="Alerts, toasts, dialogs, drawers, loaders, progress bars, skeletons, empty states, and alert dialogs."
        count={9}
      />

      <DemoSection id="alert" title="Alert">
        <Stack gap="3">
          <Alert variant="info" title="Upcoming auto-debit">
            Your next M-PESA auto-debit is scheduled for 1 Jul 2026.
          </Alert>
          <Alert variant="success" title="Payment successful" dismissible>
            Payment of KES 3,200 to Nairobi Hospital was successful.
          </Alert>
          <Alert variant="warning" title="Low balance" dismissible>
            Your Care Saver balance is below KES 1,000. Top up to stay on track.
          </Alert>
          <Alert variant="error" title="Payment failed">
            Please check your M-PESA PIN and try again.
          </Alert>
        </Stack>
      </DemoSection>

      <DemoSection id="toast" title="Toast">
        <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-3)" }}>
          Toast messages are shown with duration: 0 (persistent) for this demo.
          In production they auto-dismiss.
        </Text>
        <Stack gap="3">
          <Toast message="Receipt saved to your account" variant="success" duration={0} style={{ position: "relative", left: 0, bottom: 0, transform: "none" }} />
          <Toast message="Failed to process payment. Retry?" variant="error" duration={0} action={{ label: "Retry", onClick: () => {} }} style={{ position: "relative", left: 0, bottom: 0, transform: "none" }} />
          <Toast message="New circle invitation from Grace Muthoni" variant="info" duration={0} style={{ position: "relative", left: 0, bottom: 0, transform: "none" }} />
        </Stack>
      </DemoSection>

      <DemoSection id="dialog" title="Dialog">
        <Button variant="primary" onClick={() => setDialogOpen(true)}>
          Open Dialog
        </Button>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Confirm payment"
          description="You are about to pay KES 12,400 to Aga Khan University Hospital for consultation and lab work. This will be debited from your Jireh Wallet."
          actions={
            <>
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setDialogOpen(false)}>Confirm Payment</Button>
            </>
          }
        >
          <Box padding="3" bg="surface-muted" radius="sm">
            <DescriptionList
              layout="horizontal"
              items={[
                { term: "Provider", description: "Aga Khan University Hospital" },
                { term: "Amount", description: "KES 12,400" },
                { term: "Source", description: "Jireh Wallet" },
              ]}
            />
          </Box>
        </Dialog>
      </DemoSection>

      <DemoSection id="drawer" title="Drawer">
        <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
          Open Drawer
        </Button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Transaction Details">
          <Stack gap="4">
            <DescriptionList
              layout="vertical"
              items={[
                { term: "Reference", description: "TXN-JH-2026-0615-A7K3" },
                { term: "Date", description: "15 Jun 2026, 14:32 EAT" },
                { term: "Provider", description: "Nairobi Hospital" },
                { term: "Department", description: "Pharmacy" },
                { term: "Amount", description: "KES 3,200" },
                { term: "Status", description: "Completed" },
              ]}
            />
            <Button variant="secondary" onClick={() => setDrawerOpen(false)}>Close</Button>
          </Stack>
        </Drawer>
      </DemoSection>

      <DemoSection id="loader" title="Loader">
        <Inline gap="6">
          <Loader size="sm" label="Loading..." />
          <Loader size="md" label="Processing payment..." />
          <Loader size="lg" label="Fetching records..." />
        </Inline>
      </DemoSection>

      <DemoSection id="progress-bar" title="ProgressBar">
        <Stack gap="4">
          <ProgressBar value={68} label="Care Saver target: KES 34,000 / KES 50,000" />
          <ProgressBar value={100} label="Monthly savings goal complete" variant="success" />
          <ProgressBar value={25} label="Loan repayment: KES 6,250 / KES 25,000" size="md" />
          <ProgressBar indeterminate label="Processing your claim..." />
        </Stack>
      </DemoSection>

      <DemoSection id="skeleton" title="Skeleton">
        <Stack gap="4">
          <div>
            <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>
              Text skeleton (3 lines)
            </Text>
            <Skeleton variant="text" lines={3} />
          </div>
          <Inline gap="3">
            <div>
              <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>Circular</Text>
              <Skeleton variant="circular" />
            </div>
            <div style={{ flex: 1 }}>
              <Text variant="body-sm" color="muted" style={{ marginBottom: "var(--space-2)" }}>Rectangular</Text>
              <Skeleton variant="rectangular" height={80} />
            </div>
          </Inline>
        </Stack>
      </DemoSection>

      <DemoSection id="empty-state" title="EmptyState">
        <EmptyState
          title="No transactions yet"
          description="Once you make your first payment through Jireh, your transaction history will appear here."
          action={<Button variant="primary" size="sm">Make a payment</Button>}
        />
      </DemoSection>

      <DemoSection id="alert-dialog" title="AlertDialog">
        <Stack gap="3">
          <Text variant="body-sm" color="muted">
            Unlike Dialog, AlertDialog cannot be dismissed by clicking the backdrop — the user must explicitly confirm or cancel.
          </Text>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="destructive" size="sm">Leave Circle</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Leave Wanjiku Family Circle?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Your trust score will be affected and you will lose access to circle loans. Any outstanding balance must be settled first.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel />
                <AlertDialogAction>Leave Circle</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Stack>
      </DemoSection>
    </div>
  );
}
