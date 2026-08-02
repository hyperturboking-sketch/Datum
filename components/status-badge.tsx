import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/api";

const statusStyles: Record<ProjectStatus, string> = {
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

const statusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  planning: "Planning",
  completed: "Completed",
  on_hold: "On hold",
  archived: "Archived",
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase",
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
