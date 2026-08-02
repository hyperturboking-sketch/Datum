import { Fragment } from "react";
import { cn } from "@/lib/utils";
import type { BidStatus } from "@/lib/api";

const STEP_LABELS = ["Draft", "Pending Review", "Approved", "Submitted"];

const STATUS_INDEX: Record<BidStatus, number> = {
  draft: 0,
  pending_review: 1,
  approved: 2,
  submitted: 3,
  won: 4,
  lost: 4,
  archived: 4,
};

export function BidStatusWorkflow({ status }: { status: BidStatus }) {
  const currentIndex = STATUS_INDEX[status] ?? 0;
  const labels =
    status === "lost"
      ? [...STEP_LABELS, "Lost"]
      : [...STEP_LABELS, "Won"];

  const isTerminalNeutral = status === "archived";

  function circleClass(step: number): string {
    if (isTerminalNeutral && step === 4) {
      return "bg-[#111827] border border-[#64748B] text-[#64748B]";
    }
    if (step < currentIndex) {
      return "bg-[#818CF8] text-[#0B0F19]";
    }
    if (step === currentIndex) {
      return cn(
        "bg-[#111827] border-2 text-[#818CF8]",
        status === "lost" ? "border-[#F87171]" : "border-[#818CF8]"
      );
    }
    return "bg-[#111827] border border-[#334155] text-[#475569]";
  }

  function labelClass(step: number): string {
    if (isTerminalNeutral && step === 4) return "text-[#64748B]";
    if (step < currentIndex) return "text-[#818CF8]";
    if (step === currentIndex) {
      return status === "lost" ? "text-[#F87171]" : "text-[#818CF8]";
    }
    return "text-[#475569]";
  }

  function connectorClass(index: number): string {
    if (index - 1 < currentIndex) return "bg-[#818CF8]";
    return "bg-[#334155]";
  }

  return (
    <div className="flex items-center gap-0">
      {labels.map((label, step) => (
        <Fragment key={label}>
          {step > 0 && (
            <div
              className={cn("h-px w-12", connectorClass(step))}
              aria-hidden
            />
          )}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-medium",
                circleClass(step)
              )}
            >
              {step + 1}
            </div>
            <span
              className={cn(
                "mt-1.5 text-[11px] font-medium whitespace-nowrap",
                labelClass(step)
              )}
            >
              {label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
