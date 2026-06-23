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
import { DemoSection, PageHeader, type PropDef } from "@/components/DemoSection";

export default function FeedbackPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const alertProps: PropDef[] = [
    { name: "variant", type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "Visual style indicating the alert severity." },
    { name: "title", type: "string", description: "Optional bold heading displayed above the alert body." },
    { name: "dismissible", type: "boolean", default: "false", description: "When true, renders a close button that removes the alert." },
    { name: "children", type: "ReactNode", required: true, description: "The alert body content." },
  ];

  const toastProps: PropDef[] = [
    { name: "message", type: "string", required: true, description: "The text displayed inside the toast." },
    { name: "variant", type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "Visual style indicating the toast severity." },
    { name: "action", type: "{ label: string; onClick: () => void }", description: "Optional action button rendered inside the toast." },
    { name: "duration", type: "number", default: "4000", description: "Auto-dismiss delay in milliseconds. Set to 0 for persistent toasts." },
    { name: "onDismiss", type: "() => void", description: "Callback fired when the toast is dismissed. Also renders a close button when provided." },
  ];

  const dialogProps: PropDef[] = [
    { name: "open", type: "boolean", required: true, description: "Controls whether the dialog is visible." },
    { name: "onClose", type: "() => void", required: true, description: "Callback fired when the dialog should close (overlay click, Escape key, or close button)." },
    { name: "title", type: "string", description: "Heading displayed at the top of the dialog." },
    { name: "description", type: "string", description: "Secondary text displayed below the title." },
    { name: "actions", type: "ReactNode", description: "Footer content, typically action buttons." },
    { name: "children", type: "ReactNode", description: "Custom body content rendered between the description and actions." },
  ];

  const drawerProps: PropDef[] = [
    { name: "open", type: "boolean", required: true, description: "Controls whether the drawer is visible." },
    { name: "onClose", type: "() => void", required: true, description: "Callback fired when the drawer should close (overlay click, Escape key, or close button)." },
    { name: "title", type: "string", description: "Heading displayed at the top of the drawer panel." },
    { name: "children", type: "ReactNode", description: "Scrollable content rendered inside the drawer." },
  ];

  const loaderProps: PropDef[] = [
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Controls the spinner diameter (16px, 24px, or 32px)." },
    { name: "label", type: "string", description: "Accessible text displayed below the spinner. Falls back to \"Loading\" for screen readers." },
  ];

  const progressBarProps: PropDef[] = [
    { name: "value", type: "number", default: "0", description: "Current progress as a percentage (0-100). Clamped automatically." },
    { name: "label", type: "string", description: "Text displayed above the bar with the percentage." },
    { name: "variant", type: '"default" | "success" | "error"', default: '"default"', description: "Color scheme for the filled portion of the bar." },
    { name: "indeterminate", type: "boolean", default: "false", description: "When true, shows an animated looping bar instead of a fixed value." },
    { name: "size", type: '"sm" | "md"', default: '"md"', description: "Track height (4px or 8px)." },
  ];

  const skeletonProps: PropDef[] = [
    { name: "variant", type: '"text" | "circular" | "rectangular"', default: '"text"', description: "Shape of the skeleton placeholder." },
    { name: "width", type: "string | number", description: "Width of the skeleton. Defaults depend on variant." },
    { name: "height", type: "string | number", description: "Height of the skeleton. Defaults depend on variant." },
    { name: "lines", type: "number", default: "3", description: 'Number of text lines to render. Only applies when variant is "text".' },
  ];

  const emptyStateProps: PropDef[] = [
    { name: "title", type: "string", required: true, description: "Primary heading for the empty state." },
    { name: "description", type: "string", description: "Secondary explanatory text below the title." },
    { name: "action", type: "ReactNode", description: "Call-to-action element, typically a Button." },
    { name: "icon", type: "ReactNode", description: "Optional icon or illustration displayed above the title." },
  ];

  const alertDialogProps: PropDef[] = [
    { name: "AlertDialog: children", type: "ReactNode", required: true, description: "Compound component children (Trigger, Content, etc.)." },
    { name: "AlertDialog: open", type: "boolean", description: "Controlled open state. When omitted, the component manages its own state." },
    { name: "AlertDialog: onOpenChange", type: "(open: boolean) => void", description: "Callback fired when the open state changes." },
    { name: "AlertDialogTrigger: children", type: "ReactElement", required: true, description: "The element that opens the dialog when clicked. Receives an onClick handler via cloneElement." },
    { name: "AlertDialogContent: children", type: "ReactNode", required: true, description: "Content rendered inside the alert dialog panel." },
    { name: "AlertDialogCancel: children", type: "ReactNode", default: '"Cancel"', description: "Label for the cancel button." },
    { name: "AlertDialogAction: children", type: "ReactNode", default: '"Confirm"', description: "Label for the confirm/destructive action button." },
  ];

  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Feedback & Status"
        description="Alerts, toasts, dialogs, drawers, loaders, progress bars, skeletons, empty states, and alert dialogs."
        count={9}
      />

      <DemoSection id="alert" title="Alert" props={alertProps} usage={`import { Alert } from "@jireh-health/ui/components/Alert";

<Alert variant="success" title="Payment successful" dismissible>
  Payment of KES 3,200 to Nairobi Hospital was successful.
</Alert>`}>
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

      <DemoSection id="toast" title="Toast" props={toastProps} usage={`import { Toast } from "@jireh-health/ui/components/Toast";

<Toast
  message="Receipt saved to your account"
  variant="success"
  duration={3000}
/>`}>
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

      <DemoSection id="dialog" title="Dialog" props={dialogProps} usage={`import { Dialog } from "@jireh-health/ui/components/Dialog";

const [open, setOpen] = useState(false);

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm payment"
  description="You are about to pay KES 12,400."
  actions={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
    </>
  }
/>`}>
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

      <DemoSection id="drawer" title="Drawer" props={drawerProps} usage={`import { Drawer } from "@jireh-health/ui/components/Drawer";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Drawer</Button>
<Drawer open={open} onClose={() => setOpen(false)} title="Transaction Details">
  <p>Drawer content goes here.</p>
</Drawer>`}>
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

      <DemoSection id="loader" title="Loader" props={loaderProps} usage={`import { Loader } from "@jireh-health/ui/components/Loader";

<Loader size="md" label="Processing payment..." />`}>
        <Inline gap="6">
          <Loader size="sm" label="Loading..." />
          <Loader size="md" label="Processing payment..." />
          <Loader size="lg" label="Fetching records..." />
        </Inline>
      </DemoSection>

      <DemoSection id="progress-bar" title="ProgressBar" props={progressBarProps} usage={`import { ProgressBar } from "@jireh-health/ui/components/ProgressBar";

<ProgressBar
  value={68}
  label="Care Saver target: KES 34,000 / KES 50,000"
/>`}>
        <Stack gap="4">
          <ProgressBar value={68} label="Care Saver target: KES 34,000 / KES 50,000" />
          <ProgressBar value={100} label="Monthly savings goal complete" variant="success" />
          <ProgressBar value={25} label="Loan repayment: KES 6,250 / KES 25,000" size="md" />
          <ProgressBar indeterminate label="Processing your claim..." />
        </Stack>
      </DemoSection>

      <DemoSection id="skeleton" title="Skeleton" props={skeletonProps} usage={`import { Skeleton } from "@jireh-health/ui/components/Skeleton";

<Skeleton variant="text" lines={3} />
<Skeleton variant="circular" />
<Skeleton variant="rectangular" height={80} />`}>
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

      <DemoSection id="empty-state" title="EmptyState" props={emptyStateProps} usage={`import { EmptyState } from "@jireh-health/ui/components/EmptyState";

<EmptyState
  title="No transactions yet"
  description="Once you make your first payment, your history will appear here."
  action={<Button variant="primary" size="sm">Make a payment</Button>}
/>`}>
        <EmptyState
          title="No transactions yet"
          description="Once you make your first payment through Jireh, your transaction history will appear here."
          action={<Button variant="primary" size="sm">Make a payment</Button>}
        />
      </DemoSection>

      <DemoSection id="alert-dialog" title="AlertDialog" props={alertDialogProps} usage={`import {
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

<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="destructive">Leave Circle</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Leave circle?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel />
      <AlertDialogAction>Leave Circle</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}>
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
