import React from "react"
import { WIZARD_STEPS } from "../data/demoData"

interface StepProgressBarProps {
  currentStep: number // 1-based
}

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path
        d="M1 4l3 3 5-6"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function StepProgressBar({ currentStep }: StepProgressBarProps) {
  return (
    /* Outer wrapper: sits flush at the bottom, adds card padding */
    <div
      style={{
        padding: "12px 32px 16px",
        flexShrink: 0,
      }}
    >
      {/* Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #E5E7EB",
          borderRadius: "10px",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {WIZARD_STEPS.map((step, index) => {
          const stepNum = index + 1
          const isCompleted = stepNum < currentStep
          const isActive = stepNum === currentStep
          const isPending = stepNum > currentStep
          const isLast = index === WIZARD_STEPS.length - 1

          return (
            <React.Fragment key={step.num}>
              {/* Step node */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    backgroundColor:
                      isCompleted || isActive ? "#111111" : "#ffffff",
                    border: isPending ? "1.5px solid #D1D5DB" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {isCompleted && <CheckIcon />}
                </div>

                {/* Label */}
                <span
                  style={{
                    fontSize: "12px",
                    fontFamily: "Inter, sans-serif",
                    color: isCompleted || isActive ? "#111827" : "#9CA3AF",
                    fontWeight: isActive ? 500 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.num} {step.label}
                </span>
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    backgroundColor: isCompleted ? "#111111" : "#E5E7EB",
                    margin: "0 16px",
                  }}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
