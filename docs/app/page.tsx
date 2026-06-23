import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jireh UI — Design System",
};

const sections = [
  {
    title: "Foundations",
    description: "Color, typography, and spacing — the visual atoms of every Jireh Health product.",
    href: "/foundations/color",
    items: ["Color", "Typography", "Spacing"],
  },
  {
    title: "Components",
    description: "Reusable UI building blocks from buttons and inputs to healthcare-specific components.",
    href: "/components",
    items: ["Button", "TextField", "Card", "Badge", "Dialog", "CircleMemberCard"],
  },
  {
    title: "Getting started",
    description: "Installation, setup, and how to use the design system in your project.",
    href: "/getting-started",
    items: ["Install", "Tokens", "Tailwind preset", "React components"],
  },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: "64rem" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "var(--fg-heading)",
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          Jireh UI
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.125rem",
            lineHeight: 1.6,
            color: "var(--fg-default)",
            maxWidth: "42.5rem",
            marginBottom: "1rem",
          }}
        >
          The shared design language for every Jireh Health digital product — the patient app,
          the care provider portal, and internal tools. Built for healthcare in Kenya, where
          reliability and clarity save lives.
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            lineHeight: 1.6,
            color: "var(--fg-muted)",
            maxWidth: "42.5rem",
          }}
        >
          Includes standard UI components alongside domain-specific ones for
          Jireh Circles, Care Saver, onboarding flows, and payment experiences.
          All components use semantic design tokens and support light and dark mode.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="doc-card-link"
            style={{
              display: "block",
              textDecoration: "none",
              padding: "1.5rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-surface)",
              transition: "box-shadow var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--fg-heading)",
                marginBottom: "0.5rem",
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                lineHeight: 1.5,
                color: "var(--fg-muted)",
                marginBottom: "1rem",
              }}
            >
              {section.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {section.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    padding: "0.2rem 0.5rem",
                    borderRadius: "var(--radius-full)",
                    background: "var(--bg-surface-muted)",
                    color: "var(--fg-muted)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          padding: "1.5rem 2rem",
          borderRadius: "var(--radius-lg)",
          background: "var(--bg-surface-brand-light)",
          maxWidth: "42.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--fg-heading)",
            marginBottom: "0.5rem",
          }}
        >
          Design principle
        </h3>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            lineHeight: 1.55,
            color: "var(--fg-default)",
            margin: 0,
          }}
        >
          Every pixel serves the caregiver managing a medical bill at midnight, the patient
          navigating a payment on a bus, the provider clerk processing an invoice between
          consultations. <strong>Clarity and reliability come before aesthetics.</strong>
        </p>
      </div>
    </div>
  );
}
