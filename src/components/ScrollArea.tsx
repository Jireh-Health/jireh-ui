"use client";

import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  orientation?: "vertical" | "horizontal" | "both";
  thumbSize?: number;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea(
    { children, orientation = "vertical", thumbSize = 6, style, ...rest },
    ref,
  ) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const [thumbHeight, setThumbHeight] = useState(0);
    const [thumbTop, setThumbTop] = useState(0);
    const [visible, setVisible] = useState(false);
    const [dragging, setDragging] = useState(false);
    const dragStart = useRef({ y: 0, scrollTop: 0 });
    const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const update = useCallback(() => {
      const vp = viewportRef.current;
      if (!vp) return;
      const ratio = vp.clientHeight / vp.scrollHeight;
      if (ratio >= 1) {
        setVisible(false);
        return;
      }
      const trackH = vp.clientHeight;
      const tH = Math.max(ratio * trackH, 24);
      const scrollRatio = vp.scrollTop / (vp.scrollHeight - vp.clientHeight);
      setThumbHeight(tH);
      setThumbTop(scrollRatio * (trackH - tH));
    }, []);

    useEffect(() => {
      const vp = viewportRef.current;
      if (!vp) return;
      update();
      const ro = new ResizeObserver(update);
      ro.observe(vp);
      if (vp.firstElementChild) ro.observe(vp.firstElementChild);
      return () => ro.disconnect();
    }, [update]);

    const showThumb = useCallback(() => {
      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        if (!dragging) setVisible(false);
      }, 1200);
    }, [dragging]);

    const onScroll = useCallback(() => {
      update();
      showThumb();
    }, [update, showThumb]);

    const onPointerDown = useCallback(
      (e: React.PointerEvent) => {
        e.preventDefault();
        const vp = viewportRef.current;
        if (!vp) return;
        setDragging(true);
        dragStart.current = { y: e.clientY, scrollTop: vp.scrollTop };
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      },
      [],
    );

    const onPointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!dragging) return;
        const vp = viewportRef.current;
        if (!vp) return;
        const delta = e.clientY - dragStart.current.y;
        const scrollRange = vp.scrollHeight - vp.clientHeight;
        const trackRange = vp.clientHeight - thumbHeight;
        vp.scrollTop = dragStart.current.scrollTop + (delta / trackRange) * scrollRange;
      },
      [dragging, thumbHeight],
    );

    const onPointerUp = useCallback(() => {
      setDragging(false);
      hideTimer.current = setTimeout(() => setVisible(false), 800);
    }, []);

    const showVertical = orientation === "vertical" || orientation === "both";

    return (
      <div
        ref={ref}
        style={{ position: "relative", overflow: "hidden", ...style }}
        {...rest}
      >
        <div
          ref={viewportRef}
          onScroll={onScroll}
          onMouseEnter={showThumb}
          style={{
            height: "100%",
            width: "100%",
            overflowY: showVertical ? "scroll" : "hidden",
            overflowX:
              orientation === "horizontal" || orientation === "both"
                ? "scroll"
                : "hidden",
            scrollbarWidth: "none",
          }}
        >
          {children}
        </div>

        {showVertical && (
          <div
            ref={trackRef}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: thumbSize + 4,
              height: "100%",
              opacity: visible ? 1 : 0,
              transition: "opacity 200ms ease",
              pointerEvents: visible ? "auto" : "none",
            }}
          >
            <div
              ref={thumbRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              style={{
                position: "absolute",
                right: 2,
                top: thumbTop,
                width: thumbSize,
                height: thumbHeight,
                borderRadius: thumbSize / 2,
                background: "var(--fg-subtle)",
                opacity: dragging ? 0.8 : 0.5,
                transition: dragging ? "none" : "opacity 150ms ease",
                cursor: "grab",
              }}
            />
          </div>
        )}
      </div>
    );
  },
);
