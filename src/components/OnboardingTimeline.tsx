"use client";

import { type HTMLAttributes } from "react";

export interface OnboardingTimelineProps extends HTMLAttributes<HTMLDivElement> {
  steps: string[];
  currentStep: number;
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 7L6 10L11 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OnboardingTimeline({
  steps,
  currentStep,
  style,
  ...rest
}: OnboardingTimelineProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0",
        ...style,
      }}
      {...rest}
    >
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isFuture = index > currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "var(--space-3)",
            }}
          >
            {/* Circle and connector line */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "var(--radius-full)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  lineHeight: 1,
                  flexShrink: 0,
                  ...(isCompleted
                    ? {
                        background: "var(--interactive-default)",
                        color: "var(--fg-on-brand)",
                      }
                    : isCurrent
                      ? {
                          background: "var(--interactive-default)",
                          color: "var(--fg-on-brand)",
                        }
                      : {
                          background: "var(--bg-surface)",
                          color: "var(--fg-muted)",
                          border: "var(--border-width-medium) solid var(--border-default)",
                        }),
                }}
              >
                {isCompleted ? <CheckIcon /> : index + 1}
              </div>
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    height: 28,
                    background: isCompleted
                      ? "var(--interactive-default)"
                      : "var(--border-default)",
                    transition: `background var(--duration-moderate) var(--ease-default)`,
                  }}
                />
              )}
            </div>

            {/* Label */}
            <div
              style={{
                paddingTop: "var(--space-1)",
                paddingBottom: isLast ? 0 : "var(--space-3)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-sm)",
                  fontWeight: isCurrent ? 600 : 400,
                  color: isFuture ? "var(--fg-muted)" : "var(--fg-default)",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
