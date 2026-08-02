"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import type { ReportStats } from "@/lib/api";

export function TopProjectsTable({
  projects,
  isLoading,
}: {
  projects: ReportStats["top_projects"];
  isLoading: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#1E293B] bg-[#111827]">
      <p className="p-4 pb-2 text-[15px] font-medium text-[#F8FAFC]">
        Top Projects by Bid Volume
      </p>

      {isLoading ? (
        <div className="px-4 pb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="mb-2 h-11 w-full bg-[#1E293B]" />
          ))}
        </div>
      ) : (
        <>
          <div className="flex h-9 items-center border-b border-[#334155] px-4 text-[12px] tracking-wider text-[#94A3B8] uppercase">
            <span className="flex-1">Project</span>
            <span className="w-20 text-right">Bids</span>
            <span className="w-24 text-right">Win Rate</span>
            <span className="w-32 text-right">Total Value</span>
          </div>

          {projects.length === 0 ? (
            <p className="font-description p-4 text-[13px] text-[#64748B]">
              No project data yet.
            </p>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="flex h-11 items-center border-b border-[#1E293B] px-4 transition-colors last:border-0 hover:bg-[#1E293B]"
              >
                <span className="flex-1 truncate text-[13px] text-[#F8FAFC]">
                  {project.name}
                </span>
                <span className="w-20 text-right text-[13px] text-[#94A3B8] tabular-nums">
                  {formatNumber(project.bid_count)}
                </span>
                <span
                  className={`w-24 text-right text-[13px] tabular-nums ${
                    project.win_rate >= 50
                      ? "text-[#22C55E]"
                      : "text-[#F87171]"
                  }`}
                >
                  {formatNumber(project.win_rate)}%
                </span>
                <span className="w-32 text-right text-[13px] font-medium text-[#F8FAFC] tabular-nums">
                  {formatCurrency(project.total_value)}
                </span>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
