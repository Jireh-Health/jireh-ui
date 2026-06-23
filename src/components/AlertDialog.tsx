"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";

interface AlertDialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

function useAlertDialogContext() {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) throw new Error("AlertDialog compound components must be used within <AlertDialog>");
  return ctx;
}

export interface AlertDialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AlertDialog({ children, open: controlledOpen, onOpenChange }: AlertDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback(
    (next: boolean) => {
      setInternalOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({ children, onClick, style, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useAlertDialogContext();
  return (
    <button
      type="button"
      onClick={(e) => {
        setOpen(true);
        onClick?.(e);
      }}
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer", ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}

export interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function AlertDialogContent({ children, style, ...rest }: AlertDialogContentProps) {
  const { open } = useAlertDialogContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (open) contentRef.current?.focus();
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-modal)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
      }}
    >
      {/* Backdrop — no onClick, cannot dismiss by clicking outside */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--bg-overlay)",
        }}
        aria-hidden="true"
      />
      <div
        ref={contentRef}
        role="alertdialog"
        aria-modal="true"
        tabIndex={-1}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          background: "var(--bg-surface)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)",
          padding: "var(--space-6)",
          ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function AlertDialogHeader({ children, style, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{ marginBottom: "var(--space-4)", ...style }} {...rest}>
      {children}
    </div>
  );
}

export function AlertDialogTitle({ children, style, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-lg)",
        fontWeight: 600,
        color: "var(--fg-heading)",
        margin: 0,
        lineHeight: "var(--leading-tight)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </h2>
  );
}

export function AlertDialogDescription({ children, style, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        color: "var(--fg-muted)",
        margin: 0,
        marginTop: "var(--space-2)",
        lineHeight: "var(--leading-normal)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </p>
  );
}

export function AlertDialogFooter({ children, style, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "var(--space-3)",
        marginTop: "var(--space-6)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function AlertDialogCancel({ children = "Cancel", style, onClick, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useAlertDialogContext();
  return (
    <button
      type="button"
      onClick={(e) => {
        setOpen(false);
        onClick?.(e);
      }}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: 500,
        height: 36,
        paddingLeft: "var(--space-4)",
        paddingRight: "var(--space-4)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-default)",
        background: "var(--bg-surface)",
        color: "var(--fg-default)",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ children = "Confirm", style, onClick, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useAlertDialogContext();
  return (
    <button
      type="button"
      onClick={(e) => {
        setOpen(false);
        onClick?.(e);
      }}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: 500,
        height: 36,
        paddingLeft: "var(--space-4)",
        paddingRight: "var(--space-4)",
        borderRadius: "var(--radius-md)",
        border: "none",
        background: "var(--color-error)",
        color: "var(--color-white)",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
