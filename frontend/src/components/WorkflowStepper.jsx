import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import "./WorkflowStepper.css";

export default function WorkflowStepper({ currentStep, currentPageName }) {
  const navigate = useNavigate();

  const steps = [
    { number: 1, label: "Upload Paper" },
    { number: 2, label: "Review Questions" },
    { number: 3, label: "Upload Answer" },
    { number: 4, label: "Results" },
  ];

  return (
    <div className="workflow-container">
      {/* 1. Breadcrumbs Row */}
      <div className="breadcrumb-row">
        <span className="dashboard-link" onClick={() => navigate("/dashboard")}>
          Dashboard
        </span>
        <span className="breadcrumb-separator">›</span>
        <span className="active-page">{currentPageName}</span>
      </div>

      {/* 2. Stepper Row */}
      <div className="stepper-container">
        {steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isFuture = step.number > currentStep;

          return (
            <div key={step.number} className="step-wrapper">
              <div className="step-main">
                {/* Circle icon/indicator */}
                {isCompleted ? (
                  <div className="completed-circle">
                    <Check size={14} strokeWidth={3} />
                  </div>
                ) : isActive ? (
                  <div className="active-circle">{step.number}</div>
                ) : (
                  <div className="future-circle">{step.number}</div>
                )}

                {/* Step Label */}
                <span
                 className={`step-label ${
  isActive
    ? "active-label"
    : isCompleted
    ? "completed-label"
    : "future-label"
}`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting Line (drawn after all steps except the last) */}
              {idx < steps.length - 1 && (
                <div
                  className={`step-line ${
                    step.number < currentStep ? "line-completed" : "line-future"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
