"use client";

import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label?: string;
}

export interface MapViewProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  renderMap: (props: { markers: MapMarker[] }) => ReactNode;
  markers?: MapMarker[];
  searchBar?: ReactNode;
  controls?: ReactNode;
  onMarkerSelect?: (marker: MapMarker) => void;
  selectedMarkerId?: string;
  height?: string | number;
}

export const MapView = forwardRef<HTMLDivElement, MapViewProps>(
  function MapView(
    {
      renderMap,
      markers = [],
      searchBar,
      controls,
      onMarkerSelect,
      selectedMarkerId,
      height = "100%",
      children,
      style,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          width: "100%",
          height,
          overflow: "hidden",
          borderRadius: "var(--radius-lg)",
          background: "var(--bg-surface-muted)",
          ...style,
        }}
        {...rest}
      >
        {/* Map layer */}
        <div style={{ position: "absolute", inset: 0 }}>
          {renderMap({ markers })}
        </div>

        {/* Search bar overlay */}
        {searchBar && (
          <div
            style={{
              position: "absolute",
              top: "var(--space-3)",
              left: "var(--space-3)",
              right: "var(--space-3)",
              zIndex: "var(--z-raised)",
            }}
          >
            {searchBar}
          </div>
        )}

        {/* Controls overlay (zoom, recenter) */}
        {controls && (
          <div
            style={{
              position: "absolute",
              bottom: "var(--space-4)",
              right: "var(--space-3)",
              zIndex: "var(--z-raised)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            {controls}
          </div>
        )}

        {/* Bottom card / info panel slot */}
        {children && (
          <div
            style={{
              position: "absolute",
              bottom: "var(--space-3)",
              left: "var(--space-3)",
              right: controls ? "calc(var(--space-3) + 48px)" : "var(--space-3)",
              zIndex: "var(--z-raised)",
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);

export interface MapControlButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  label: string;
}

export function MapControlButton({ label, children, style, ...rest }: MapControlButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: "var(--radius-md)",
        border: "none",
        background: "var(--bg-surface)",
        boxShadow: "var(--shadow-md)",
        color: "var(--fg-default)",
        cursor: "pointer",
        fontSize: 18,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
