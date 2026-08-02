import { cn } from "@/lib/utils";

type ProjectStatus = "active" | "planning" | "completed" | "on_hold";
type ParseStatus = "pending" | "parsing" | "completed" | "failed";
type BidStatus = "draft" | "pending_review" | "approved" | "submitted" | "won" | "lost";
type ViolationSeverity = "critical" | "major" | "minor";
type ViolationStatus = "open" | "resolved";
type RFIStatus = "draft" | "sent" | "responded" | "closed";

interface StatusBadgeProps {
  status: ProjectStatus | ParseStatus | BidStatus | ViolationSeverity | ViolationStatus | RFIStatus;
  variant?: "project" | "parse" | "bid" | "violation" | "rfi";
}

const projectStatusStyles: Record<ProjectStatus, string> = {
  active: "bg-[#10B981]/10 text-[#10B981]",
  planning: "bg-[#00D4AA]/10 text-[#00D4AA]",
  completed: "bg-[#64748B]/10 text-[#64748B]",
  on_hold: "bg-[#F59E0B]/10 text-[#F59E0B]",
};

const projectStatusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  planning: "Planning",
  completed: "Completed",
  on_hold: "On Hold",
};

const parseStatusStyles: Record<ParseStatus, string> = {
  pending: "bg-[#1E293B] text-[#94A3B8]",
  parsing: "bg-[#1E293B] text-[#94A3B8]",
  completed: "bg-[#10B981]/10 text-[#10B981]",
  failed: "bg-[#EF4444]/10 text-[#EF4444]",
};

const parseStatusLabels: Record<ParseStatus, string> = {
  pending: "Pending",
  parsing: "Parsing",
  completed: "Completed",
  failed: "Failed",
};

const bidStatusStyles: Record<BidStatus, string> = {
  draft: "bg-[#1E293B] text-[#94A3B8]",
  pending_review: "bg-[#F59E0B]/10 text-[#F59E0B]",
  approved: "bg-[#10B981]/10 text-[#10B981]",
  submitted: "bg-[#00D4AA]/10 text-[#00D4AA]",
  won: "bg-[#10B981]/10 text-[#10B981]",
  lost: "bg-[#EF4444]/10 text-[#EF4444]",
};

const bidStatusLabels: Record<BidStatus, string> = {
  draft: "Draft",
  pending_review: "Pending Review",
  approved: "Approved",
  submitted: "Submitted",
  won: "Won",
  lost: "Lost",
};

const violationSeverityStyles: Record<ViolationSeverity, string> = {
  critical: "bg-[#EF4444]/10 text-[#EF4444]",
  major: "bg-[#F59E0B]/10 text-[#F59E0B]",
  minor: "bg-[#64748B]/10 text-[#64748B]",
};

const violationSeverityLabels: Record<ViolationSeverity, string> = {
  critical: "Critical",
  major: "Major",
  minor: "Minor",
};

const violationStatusStyles: Record<ViolationStatus, string> = {
  open: "bg-[#EF4444]/10 text-[#EF4444]",
  resolved: "bg-[#10B981]/10 text-[#10B981]",
};

const violationStatusLabels: Record<ViolationStatus, string> = {
  open: "Open",
  resolved: "Resolved",
};

const rfiStatusStyles: Record<RFIStatus, string> = {
  draft: "bg-[#1E293B] text-[#94A3B8]",
  sent: "bg-[#00D4AA]/10 text-[#00D4AA]",
  responded: "bg-[#10B981]/10 text-[#10B981]",
  closed: "bg-[#64748B]/10 text-[#64748B]",
};

const rfiStatusLabels: Record<RFIStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  responded: "Responded",
  closed: "Closed",
};

export default function StatusBadge({ status, variant = "project" }: StatusBadgeProps) {
  let styles: Record<string, string>;
  let labels: Record<string, string>;

  switch (variant) {
    case "parse":
      styles = parseStatusStyles;
      labels = parseStatusLabels;
      break;
    case "bid":
      styles = bidStatusStyles;
      labels = bidStatusLabels;
      break;
    case "violation":
      styles = violationSeverityStyles;
      labels = violationSeverityLabels;
      break;
    case "rfi":
      styles = rfiStatusStyles;
      labels = rfiStatusLabels;
      break;
    default:
      styles = projectStatusStyles;
      labels = projectStatusLabels;
  }

  // Handle violation status separately
  if (variant === "violation" && (status === "open" || status === "resolved")) {
    styles = violationStatusStyles;
    labels = violationStatusLabels;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
        styles[status as keyof typeof styles] || "bg-[#1E293B] text-[#94A3B8]"
      )}
    >
      {labels[status as keyof typeof labels] || status}
    </span>
  );
}
