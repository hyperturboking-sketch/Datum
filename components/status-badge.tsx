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

const indigo =
  "bg-[rgba(129,140,248,0.10)] text-[#818CF8] border-[rgba(129,140,248,0.20)]";
const info =
  "bg-[rgba(96,165,250,0.10)] text-[#60A5FA] border-[rgba(96,165,250,0.20)]";
const success =
  "bg-[rgba(34,197,94,0.10)] text-[#22C55E] border-[rgba(34,197,94,0.20)]";
const danger =
  "bg-[rgba(248,113,113,0.10)] text-[#F87171] border-[rgba(248,113,113,0.20)]";

const variantStyles: Record<string, Record<string, string>> = {
  parse: {
    pending: amber,
    parsing: blue,
    completed: green,
    failed: red,
  },
  bid: {
    draft: amber,
    pending_review: info,
    approved: indigo,
    submitted: indigo,
    won: success,
    lost: danger,
    archived: slate,
  },
  violation: {
    critical: red,
    major: amber,
    minor: slate,
    open: red,
    under_review: amber,
    resolved: green,
    waived: slate,
  },
  rfi: {
    draft: amber,
    sent: amber,
    responded: blue,
    closed: green,
  },
  role: {
    admin: indigo,
    editor: blue,
    viewer: slate,
  },
  plan: {
    free: slate,
    pro: indigo,
    enterprise: success,
  },
  sustainability: {
    draft: amber,
    generating: blue,
    completed: green,
    failed: red,
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
    archived: "Archived",
  },
  violation: {
    critical: "Critical",
    major: "Major",
    minor: "Minor",
    open: "Open",
    under_review: "Under review",
    resolved: "Resolved",
    waived: "Waived",
  },
  rfi: {
    draft: "Draft",
    sent: "Sent",
    responded: "Responded",
    closed: "Closed",
  },
  role: {
    admin: "Admin",
    editor: "Editor",
    viewer: "Viewer",
  },
  plan: {
    free: "Free",
    pro: "Pro",
    enterprise: "Enterprise",
  },
  sustainability: {
    draft: "Draft",
    generating: "Generating",
    completed: "Completed",
    failed: "Failed",
  },
};

type StatusVariant =
  | "project"
  | "parse"
  | "bid"
  | "violation"
  | "rfi"
  | "role"
  | "plan"
  | "sustainability";

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
