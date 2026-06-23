"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
  type HTMLAttributes,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover compound components must be used within <Popover>");
  return ctx;
}

export interface PopoverProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({ children, open: controlledOpen, onOpenChange }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback(
    (next: boolean) => {
      setInternalOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );
  const triggerRef = useRef<HTMLElement>(null);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  );
}

export interface PopoverTriggerProps {
  children: ReactElement<{ onClick?: (...args: unknown[]) => void; ref?: React.Ref<HTMLElement> }>;
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { open, setOpen, triggerRef } = usePopoverContext();
  if (!isValidElement(children)) return null;
  return cloneElement(children, {
    ref: triggerRef,
    "aria-expanded": open,
    onClick: (...args: unknown[]) => {
      setOpen(!open);
      (children.props as { onClick?: (...a: unknown[]) => void }).onClick?.(...args);
    },
  } as Record<string, unknown>);
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: Side;
  align?: Align;
  sideOffset?: number;
}

function computePosition(
  trigger: DOMRect,
  content: DOMRect,
  side: Side,
  align: Align,
  offset: number,
): CSSProperties {
  let top = 0;
  let left = 0;

  if (side === "bottom") {
    top = trigger.bottom + offset;
  } else if (side === "top") {
    top = trigger.top - content.height - offset;
  } else if (side === "left") {
    left = trigger.left - content.width - offset;
  } else {
    left = trigger.right + offset;
  }

  if (side === "bottom" || side === "top") {
    if (align === "start") left = trigger.left;
    else if (align === "end") left = trigger.right - content.width;
    else left = trigger.left + (trigger.width - content.width) / 2;
  } else {
    if (align === "start") top = trigger.top;
    else if (align === "end") top = trigger.bottom - content.height;
    else top = trigger.top + (trigger.height - content.height) / 2;
  }

  left = Math.max(8, Math.min(left, window.innerWidth - content.width - 8));
  top = Math.max(8, Math.min(top, window.innerHeight - content.height - 8));

  return { position: "fixed", top, left };
}

export function PopoverContent({
  children,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  style,
  ...rest
}: PopoverContentProps) {
  const { open, setOpen, triggerRef } = usePopoverContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<CSSProperties>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const content = contentRef.current;
    if (!trigger || !content) return;

    const reposition = () => {
      const tRect = trigger.getBoundingClientRect();
      const cRect = content.getBoundingClientRect();
      setPos(computePosition(tRect, cRect, side, align, sideOffset));
    };
    reposition();

    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open, side, align, sideOffset, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const content = contentRef.current;
      const trigger = triggerRef.current;
      if (
        content && !content.contains(e.target as Node) &&
        trigger && !trigger.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={contentRef}
      role="dialog"
      style={{
        ...pos,
        zIndex: "var(--z-dropdown)",
        background: "var(--bg-surface)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)",
        padding: "var(--space-4)",
        minWidth: 200,
        animationDuration: "var(--duration-fast)",
        animationTimingFunction: "var(--ease-out)",
        animationFillMode: "both",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>,
    document.body,
  );
}
