"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export interface BottomSheetProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  snapPoints?: number[];
  children: ReactNode;
}

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  function BottomSheet(
    { open, onClose, snapPoints = [0.5, 0.92], children, style, ...rest },
    ref,
  ) {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [snapIndex, setSnapIndex] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [dragging, setDragging] = useState(false);
    const sheetRef = useRef<HTMLDivElement>(null);
    const dragStart = useRef<{ y: number; time: number } | null>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
      if (open) {
        setVisible(true);
        setSnapIndex(0);
        setDragOffset(0);
      } else {
        const timer = setTimeout(() => setVisible(false), 250);
        return () => clearTimeout(timer);
      }
    }, [open]);

    useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }, [open]);

    const currentHeight = snapPoints[snapIndex] * 100;

    const onTouchStart = useCallback((e: React.TouchEvent) => {
      dragStart.current = { y: e.touches[0].clientY, time: Date.now() };
      setDragging(true);
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
      if (!dragStart.current) return;
      const delta = e.touches[0].clientY - dragStart.current.y;
      setDragOffset(Math.max(0, delta));
    }, []);

    const onTouchEnd = useCallback(() => {
      if (!dragStart.current) return;
      const velocity = dragOffset / (Date.now() - dragStart.current.time);
      dragStart.current = null;
      setDragging(false);

      if (velocity > 0.5 || dragOffset > window.innerHeight * 0.15) {
        if (snapIndex === 0 && snapPoints.length === 1) {
          onClose();
        } else if (snapIndex > 0) {
          setSnapIndex(snapIndex - 1);
        } else {
          onClose();
        }
      } else if (dragOffset < -window.innerHeight * 0.1 && snapIndex < snapPoints.length - 1) {
        setSnapIndex(snapIndex + 1);
      }
      setDragOffset(0);
    }, [dragOffset, snapIndex, snapPoints, onClose]);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
      dragStart.current = { y: e.clientY, time: Date.now() };
      setDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
      if (!dragStart.current) return;
      const delta = e.clientY - dragStart.current.y;
      setDragOffset(Math.max(0, delta));
    }, []);

    const onPointerUp = useCallback(() => {
      onTouchEnd();
    }, [onTouchEnd]);

    if (!mounted || !visible) return null;

    return createPortal(
      <>
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: "var(--z-overlay)",
            background: "var(--bg-overlay)",
            opacity: open ? 1 : 0,
            transition: "opacity var(--duration-moderate) var(--ease-default)",
          }}
          aria-hidden="true"
        />
        <div
          ref={ref || sheetRef}
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: "var(--z-modal)",
            height: `${currentHeight}vh`,
            maxHeight: "95vh",
            transform: open ? `translateY(${dragOffset}px)` : "translateY(100%)",
            transition: dragging ? "none" : "transform var(--duration-moderate) var(--ease-default), height var(--duration-moderate) var(--ease-default)",
            background: "var(--bg-surface)",
            borderTopLeftRadius: "var(--radius-xl)",
            borderTopRightRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-xl)",
            display: "flex",
            flexDirection: "column",
            touchAction: "none",
            ...style,
          }}
          {...rest}
        >
          {/* Drag handle */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "var(--space-3)",
              paddingBottom: "var(--space-2)",
              cursor: "grab",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: "var(--fg-subtle)",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              paddingLeft: "var(--space-4)",
              paddingRight: "var(--space-4)",
              paddingBottom: "var(--space-4)",
            }}
          >
            {children}
          </div>
        </div>
      </>,
      document.body,
    );
  },
);
