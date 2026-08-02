import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/lib/api";
import { formatCurrency, formatUpdatedDate } from "@/lib/formatters";

const statusStyles: Record<ProjectStatus, string> = {
  active:
    "bg-[#1A1A1A] text-[#A3A3A3] border border-[rgba(255,255,255,0.08)]",
  planning:
    "bg-[#1A1A1A] text-[#A3A3A3] border border-[rgba(255,255,255,0.08)]",
  completed:
    "bg-[#1A1A1A] text-[#A3A3A3] border border-[rgba(255,255,255,0.08)]",
  on_hold:
    "bg-[#1A1A1A] text-[#A3A3A3] border border-[rgba(255,255,255,0.08)]",
  archived:
    "bg-[#1A1A1A] text-[#A3A3A3] border border-[rgba(255,255,255,0.08)]",
};

export function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="flex items-center justify-between rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] p-4 transition-colors hover:bg-[#262626]"
    >
      <div className="min-w-0">
        <p className="truncate text-[14px] font-medium text-[#E5E5E5]">{project.name}</p>
        <p className="mt-0.5 truncate text-[12px] text-[#737373]">{project.client_name}</p>
      </div>
      <div className="ml-4 shrink-0 text-right">
        <span
          className={cn(
            "inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
            statusStyles[project.status]
          )}
        >
          {project.status.replace("_", " ")}
        </span>
        <p className="mt-1 text-[14px] font-medium text-[#E5E5E5] tabular-nums">
          {formatCurrency(project.contract_value, project.currency)}
        </p>
        <p className="mt-0.5 text-[11px] text-[#525252] tabular-nums">
          {formatUpdatedDate(project.updated_at)}
        </p>
      </div>
    </Link>
  );
}
