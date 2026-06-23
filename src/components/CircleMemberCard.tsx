"use client";

import { type HTMLAttributes, type ReactNode } from "react";

export type CircleMemberVariant = "active" | "new" | "pending" | "defaulted" | "inactive";

export interface CircleMemberCardProps extends HTMLAttributes<HTMLDivElement> {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  profilePhoto?: string;
  variant: CircleMemberVariant;
  relationship?: string;
  layout: "list" | "card";
  children?: ReactNode;
}

const avatarColorMap: Record<CircleMemberVariant, string> = {
  active: "var(--color-jireh-purple)",
  new: "var(--color-success)",
  pending: "var(--color-warning)",
  defaulted: "var(--color-error)",
  inactive: "var(--color-gray-400)",
};

const pillConfig: Record<string, { label: string; bg: string; fg: string } | null> = {
  new: { label: "New!", bg: "var(--color-success-bg)", fg: "var(--color-success)" },
  pending: { label: "Waiting...", bg: "var(--color-warning-bg)", fg: "var(--color-warning)" },
  defaulted: { label: "Default", bg: "var(--color-error-bg)", fg: "var(--color-error)" },
  active: null,
  inactive: null,
};

/**
 * Derives a CircleMemberVariant from a raw status string and optional context.
 */
export function variantFromStatus(
  status: string,
  opts?: { joinedAt?: string | Date | null; hasDefaultedLoan?: boolean },
): CircleMemberVariant {
  const s = status.toLowerCase().trim();

  if (opts?.hasDefaultedLoan) return "defaulted";
  if (s === "defaulted" || s === "default") return "defaulted";
  if (s === "inactive" || s === "deactivated" || s === "left") return "inactive";
  if (s === "pending" || s === "invited" || s === "waiting") return "pending";

  // If active but joined recently (within 7 days), treat as "new"
  if (s === "active" || s === "approved" || s === "joined") {
    if (opts?.joinedAt) {
      const joined = new Date(opts.joinedAt);
      const now = new Date();
      const diffDays = (now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays <= 7) return "new";
    }
    return "active";
  }

  if (s === "new") return "new";

  return "inactive";
}

function Avatar({
  firstName,
  lastName,
  profilePhoto,
  variant,
  size,
}: {
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  variant: CircleMemberVariant;
  size: number;
}) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const bg = avatarColorMap[variant];

  if (profilePhoto) {
    return (
      <img
        src={profilePhoto}
        alt={`${firstName} ${lastName}`}
        style={{
          width: size,
          height: size,
          borderRadius: "var(--radius-full)",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-full)",
        background: bg,
        color: "var(--fg-on-brand)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-sans)",
        fontSize: size * 0.38,
        fontWeight: 600,
        flexShrink: 0,
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function StatusPill({ variant }: { variant: CircleMemberVariant }) {
  const config = pillConfig[variant];
  if (!config) return null;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "var(--space-0-5) var(--space-2)",
        borderRadius: "var(--radius-full)",
        background: config.bg,
        color: config.fg,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: 500,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
      }}
    >
      {config.label}
    </span>
  );
}

export function CircleMemberCard({
  firstName,
  lastName,
  phoneNumber,
  profilePhoto,
  variant,
  relationship,
  layout,
  children,
  style,
  ...rest
}: CircleMemberCardProps) {
  if (layout === "card") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-2)",
          padding: "var(--space-4)",
          borderRadius: "var(--radius-lg)",
          border: "var(--border-width-thin) solid var(--border-default)",
          background: "var(--bg-surface)",
          textAlign: "center",
          position: "relative",
          ...style,
        }}
        {...rest}
      >
        <Avatar
          firstName={firstName}
          lastName={lastName}
          profilePhoto={profilePhoto}
          variant={variant}
          size={48}
        />
        <div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              color: "var(--fg-default)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {firstName} {lastName}
          </p>
          {relationship && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-xs)",
                color: "var(--fg-muted)",
                margin: "var(--space-0-5) 0 0",
              }}
            >
              {relationship}
            </p>
          )}
        </div>
        <StatusPill variant={variant} />
        {children}
      </div>
    );
  }

  // list layout
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) 0",
        ...style,
      }}
      {...rest}
    >
      <Avatar
        firstName={firstName}
        lastName={lastName}
        profilePhoto={profilePhoto}
        variant={variant}
        size={40}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              color: "var(--fg-default)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {firstName} {lastName}
          </p>
          <StatusPill variant={variant} />
        </div>
        {(phoneNumber || relationship) && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-xs)",
              color: "var(--fg-muted)",
              margin: "var(--space-0-5) 0 0",
              lineHeight: 1.4,
            }}
          >
            {[relationship, phoneNumber].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
