"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  logo?: ReactNode;
  actions?: ReactNode;
  sticky?: boolean;
  bordered?: boolean;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(function Navbar(
  { logo, actions, sticky = true, bordered = true, children, style, ...rest },
  ref,
) {
  return (
    <nav
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        height: 56,
        paddingLeft: "var(--space-4)",
        paddingRight: "var(--space-4)",
        background: "var(--bg-surface)",
        borderBottom: bordered ? "1px solid var(--border-default)" : "none",
        position: sticky ? "sticky" : "relative",
        top: sticky ? 0 : undefined,
        zIndex: sticky ? "var(--z-sticky)" : undefined,
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    >
      {logo && (
        <div style={{ flexShrink: 0, marginRight: "var(--space-6)" }}>
          {logo}
        </div>
      )}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "var(--space-1)",
          minWidth: 0,
        }}
      >
        {children}
      </div>
      {actions && (
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            marginLeft: "var(--space-4)",
          }}
        >
          {actions}
        </div>
      )}
    </nav>
  );
});

export interface NavbarItemProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  active?: boolean;
  href?: string;
}

export const NavbarItem = forwardRef<HTMLElement, NavbarItemProps>(
  function NavbarItem({ active, href, children, style, onClick, ...rest }, ref) {
    const sharedProps = {
      ref,
      onClick: onClick as React.MouseEventHandler<HTMLElement>,
    };
    const Component = href ? "a" : "button";
    return (
      <Component
        {...(sharedProps as any)}
        href={href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          fontWeight: active ? 600 : 400,
          color: active ? "var(--fg-heading)" : "var(--fg-muted)",
          background: active ? "var(--bg-surface-muted)" : "transparent",
          border: "none",
          borderRadius: "var(--radius-md)",
          paddingTop: "var(--space-1-5)",
          paddingBottom: "var(--space-1-5)",
          paddingLeft: "var(--space-3)",
          paddingRight: "var(--space-3)",
          cursor: "pointer",
          textDecoration: "none",
          whiteSpace: "nowrap",
          transition: "background var(--duration-fast) var(--ease-default), color var(--duration-fast) var(--ease-default)",
          ...style,
        }}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);
