"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, type NavItem } from "@/lib/navigation";
import { ThemeToggle } from "./ThemeToggle";

const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/getting-started": "Getting started",
  "/foundations": "Foundations",
  "/foundations/color": "Foundations / Color",
  "/foundations/typography": "Foundations / Typography",
  "/foundations/spacing": "Foundations / Spacing",
  "/components": "Components",
  "/components/layout": "Components / Layout",
  "/components/typography": "Components / Typography",
  "/components/actions": "Components / Actions",
  "/components/input": "Components / Selection & Input",
  "/components/navigation": "Components / Navigation",
  "/components/feedback": "Components / Feedback & Status",
  "/components/data-display": "Components / Data Display",
  "/components/overlays": "Components / Overlays",
  "/components/healthcare": "Components / Healthcare",
};

function usePageTitle() {
  const pathname = usePathname();
  return pageTitles[pathname] || pathname.split("/").filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" / ");
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const basePath = item.href.split("#")[0];
  const hash = item.href.includes("#") ? item.href.split("#")[1] : null;
  const isSamePageHash = hash && (basePath === "" || pathname === basePath);
  const isActive = pathname === item.href || pathname === basePath;
  const isParentActive = item.children?.some(
    (c) => pathname === c.href.split("#")[0] || c.children?.some((gc) => pathname === gc.href.split("#")[0])
  );
  const shouldExpand = isParentActive || isActive || (basePath !== "/" && pathname.startsWith(basePath));

  const paddingLeft = depth === 0 ? "0" : depth === 1 ? "1rem" : "2rem";
  const isGroupLabel = depth === 1 && !!item.children;

  const handleClick = isSamePageHash
    ? (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${hash}`);
      }
    : undefined;

  const LinkComponent = isSamePageHash ? "a" : Link;

  return (
    <li>
      <LinkComponent
        href={item.href}
        onClick={handleClick}
        style={{
          display: "block",
          paddingLeft,
          paddingTop: isGroupLabel ? "0.5rem" : "0.25rem",
          paddingBottom: "0.25rem",
          fontFamily: "var(--font-sans)",
          fontSize: depth === 0 ? "0.875rem" : depth === 1 ? "0.75rem" : "0.8125rem",
          fontWeight: depth === 0 && isActive ? 600 : isGroupLabel ? 600 : 400,
          color: depth === 0 && isActive
            ? "var(--fg-heading)"
            : isGroupLabel
              ? "var(--fg-heading)"
              : "var(--fg-muted)",
          textTransform: isGroupLabel ? "uppercase" : "none",
          letterSpacing: isGroupLabel ? "0.04em" : "normal",
          textDecoration: "none",
        }}
      >
        {item.label}
      </LinkComponent>
      {item.children && shouldExpand && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {item.children.map((child) => (
            <NavLink key={child.href} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function Sidebar({ open, onClose, isMobile }: { open: boolean; onClose: () => void; isMobile: boolean }) {
  const sidebarStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 40,
        width: 280,
        height: "100%",
        overflowY: "auto",
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border-default)",
        padding: "1.5rem",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 200ms ease",
      }
    : {
        position: "sticky",
        top: 0,
        width: 280,
        height: "100vh",
        overflowY: "auto",
        flexShrink: 0,
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border-default)",
        padding: "1.5rem",
      };

  return (
    <>
      {isMobile && open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 30,
            background: "var(--bg-overlay)",
          }}
          onClick={onClose}
        />
      )}
      <aside style={sidebarStyle}>
        <Link
          href="/"
          style={{
            display: "block",
            marginBottom: "2rem",
            fontFamily: "var(--font-sans)",
            fontSize: "1.375rem",
            fontWeight: 700,
            color: "var(--color-jireh-purple)",
            textDecoration: "none",
          }}
          onClick={onClose}
        >
          Jireh UI
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--fg-muted)",
              letterSpacing: "0.01em",
              marginTop: "0.125rem",
            }}
          >
            Design System
          </span>
        </Link>

        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {navigation.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </ul>
        </nav>

        <div style={{ marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--border-default)" }}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              color: "var(--fg-subtle)",
              marginBottom: "0.5rem",
            }}
          >
            v0.1.0
          </div>
        </div>
      </aside>
    </>
  );
}

export function DocShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pageTitle = usePageTitle();
  const isMobile = useIsMobile();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={isMobile} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {isMobile && (
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 20,
              height: "3rem",
              padding: "0 1rem",
              background: "var(--bg-surface)",
              borderBottom: "1px solid var(--border-default)",
            }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--fg-default)",
                padding: "0.5rem",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="5" x2="17" y2="5" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="15" x2="17" y2="15" />
              </svg>
            </button>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--color-jireh-purple)",
              }}
            >
              Jireh UI
            </span>
            <ThemeToggle />
          </header>
        )}

        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "3rem",
              borderBottom: "1px solid var(--border-default)",
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--fg-muted)",
            }}>
              {pageTitle}
            </span>
            <ThemeToggle />
          </div>
        )}

        <main style={{ flex: 1, padding: "2.5rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
