import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/api";

const projectStyles: Record<ProjectStatus, string> = {
  active:
    "bg-[rgba(0,212,170,0.10)] text-[#00D4AA] border-[rgba(0,212,170,0.20)]",
  planning:
    "bg-[rgba(59,130,246,0.10)] text-[#3B82F6] border-[rgba(59,130,246,0.20)]",
  completed:
    "bg-[rgba(16,185,129,0.10)] text-[#10B981] border-[rgba(16,185,129,0.20)]",
  on_hold:
    "bg-[rgba(245,158,11,0.10)] text-[#F59E0B] border-[rgba(245,158,11,0.20)]",
  archived:
    "bg-[rgba(100,116,139,0.10)] text-[#64748B] border-[rgba(100,116,139,0.20)]",
};

const projectLabels: Record<ProjectStatus, string> = {
  active: "Active",
  planning: "Planning",
  completed: "Completed",
  on_hold: "On hold",
  archived: "Archived",
};

const blue =
  "bg-[rgba(59,130,246,0.10)] text-[#3B82F6] border-[rgba(59,130,246,0.20)]";
const green =
  "bg-[rgba(16,185,129,0.10)] text-[#10B981] border-[rgba(16,185,129,0.20)]";
const amber =
  "bg-[rgba(245,158,11,0.10)] text-[#F59E0B] border-[rgba(245,158,11,0.20)]";
const red =
  "bg-[rgba(239,68,68,0.10)] text-[#EF4444] border-[rgba(239,68,68,0.20)]";
const slate =
  "bg-[rgba(100,116,139,0.10)] text-[#64748B] border-[rgba(100,116,139,0.20)]";

const variantStyles: Record<string, Record<string, string>> = {
  parse: {
    pending: amber,
    parsing: blue,
    completed: green,
    failed: red,
  },
  bid: {
    draft: slate,
    pending_review: amber,
    approved: green,
    submitted: blue,
    won: green,
    lost: red,
  },
  violation: {
    critical: red,
    major: amber,
    minor: slate,
    open: red,
    resolved: green,
  },
  rfi: {
    draft: slate,
    sent: blue,
    responded: amber,
    closed: green,
  },
};

const variantLabels: Record<string, Record<string, string>> = {
  parse: {
    pending: "Pending",
    parsing: "Parsing",
    completed: "Completed",
    failed: "Failed",
  },
  bid: {
    draft: "Draft",
    pending_review: "Pending review",
    approved: "Approved",
    submitted: "Submitted",
    won: "Won",
    lost: "Lost",
  },
  violation: {
    critical: "Critical",
    major: "Major",
    minor: "Minor",
    open: "Open",
    resolved: "Resolved",
  },
  rfi: {
    draft: "Draft",
    sent: "Sent",
    responded: "Responded",
    closed: "Closed",
  },
};

type StatusVariant = "project" | "parse" | "bid" | "violation" | "rfi";

export function StatusBadge({
  status,
  variant = "project",
  className,
}: {
  status: string;
  variant?: StatusVariant;
  className?: string;
}) {
  const style =
    variant === "project"
      ? projectStyles[status as ProjectStatus]
      : variantStyles[variant]?.[status];
  const label =
    variant === "project"
      ? projectLabels[status as ProjectStatus]
      : variantLabels[variant]?.[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase",
        style ?? slate,
        className
      )}
    >
      {label ?? status}
    </span>
  );
}
