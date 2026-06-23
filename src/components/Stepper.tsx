"use client";

import { type HTMLAttributes } from "react";

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  currentStep: number;
  totalSteps: number;
  className?: string;
  completedSteps?: boolean[];
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

export function Stepper({
  currentStep,
  totalSteps,
  className,
  completedSteps,
  style,
  ...rest
}: StepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div
      className={className}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        ...style,
      }}
      {...rest}
    >
      {steps.map((index) => {
        const isCompleted = completedSteps
          ? completedSteps[index] === true
          : index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === totalSteps - 1;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Step circle */}
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
                transition: `background var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)`,
                ...(isCompleted
                  ? {
                      background: "var(--bg-surface-brand-light)",
                      color: "var(--interactive-default)",
                      border: "none",
                    }
                  : isCurrent
                    ? {
                        background: "var(--interactive-default)",
                        color: "var(--fg-on-brand)",
                        border: "none",
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

            {/* Connector line */}
            {!isLast && (
              <div
                style={{
                  width: 24,
                  height: 2,
                  background: isCompleted
                    ? "var(--interactive-default)"
                    : "var(--border-default)",
                  transition: `background var(--duration-fast) var(--ease-default)`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
