"use client";

import { Download, Eye, Leaf, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/status-badge";
import type { SustainabilityReport } from "@/lib/api";
import { formatDate, formatNumber } from "@/lib/formatters";

function formatTons(kg: number): string {
  return `${formatNumber(Math.round(kg / 1000))} t`;
}

export function SustainabilityReportsTable({
  reports,
  isLoading,
  onView,
  onDelete,
  onNewReport,
}: {
  reports: SustainabilityReport[];
  isLoading: boolean;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onNewReport: () => void;
}) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-lg border border-[#1E293B] bg-[#111827]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex h-12 items-center gap-4 border-b border-[#1E293B] px-4 last:border-0"
          >
            <Skeleton className="h-3.5 w-48 bg-[#1E293B]" />
            <Skeleton className="h-3.5 w-28 bg-[#1E293B]" />
            <Skeleton className="h-4 w-16 bg-[#1E293B]" />
            <Skeleton className="ml-auto h-3.5 w-14 bg-[#1E293B]" />
          </div>
        ))}
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-lg border border-[#1E293B] bg-[#111827] py-12 text-center">
        <Leaf size={32} strokeWidth={1.5} className="text-[#334155]" />
        <p className="mt-2 text-[14px] font-medium text-[#F8FAFC]">
          No sustainability reports yet
        </p>
        <p className="text-[13px] text-[#94A3B8]">
          Upload an IFC and run the Sustainability agent to generate LCA data
        </p>
        <button
          type="button"
          onClick={onNewReport}
          className="mt-4 flex h-9 items-center gap-2 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110"
        >
          <Plus size={14} strokeWidth={1.5} />
          New Report
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-[#1E293B] bg-[#111827]">
      <div className="flex h-9 min-w-[820px] items-center border-b border-[#334155] px-4 text-[12px] tracking-wider text-[#94A3B8] uppercase">
        <span className="flex-1">Report Name</span>
        <span className="w-[180px]">Project</span>
        <span className="w-[100px]">Status</span>
        <span className="w-[120px] text-right">Carbon</span>
        <span className="w-[80px] text-right">LEED</span>
        <span className="w-[100px]">Created</span>
        <span className="w-[60px] text-right">Actions</span>
      </div>

      <div className="min-w-[820px]">
        {reports.map((report) => (
          <div
            key={report.id}
            role="button"
            tabIndex={0}
            onClick={() => onView(report.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onView(report.id);
            }}
            className="flex h-12 cursor-pointer items-center border-b border-[#1E293B] px-4 transition-colors last:border-0 hover:bg-[#1E293B]"
          >
            <span className="flex-1 truncate text-[13px] font-medium text-[#F8FAFC]">
              {report.report_name}
            </span>
            <span className="w-[180px] truncate text-[13px] text-[#94A3B8]">
              {report.project_name}
            </span>
            <span className="w-[100px]">
              <StatusBadge
                status={report.status}
                variant="sustainability"
              />
            </span>
            <span className="w-[120px] text-right text-[13px] tabular-nums text-[#F8FAFC]">
              {formatTons(report.total_embodied_carbon_kg ?? 0)}
            </span>
            <span className="w-[80px] text-right text-[13px] tabular-nums text-[#22C55E]">
              {formatNumber(report.leed_points_estimate ?? 0)}
            </span>
            <span className="w-[100px] text-[12px] tabular-nums text-[#475569]">
              {formatDate(report.created_at)}
            </span>
            <span
              className="w-[60px] text-right"
              onClick={(event) => event.stopPropagation()}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Actions for ${report.report_name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#64748B] transition-colors hover:bg-[#1E293B] hover:text-[#F8FAFC]"
                  >
                    <MoreHorizontal size={14} strokeWidth={1.5} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => onView(report.id)}
                  >
                    <Eye size={14} strokeWidth={1.5} />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => alert("Downloading PDF...")}
                  >
                    <Download size={14} strokeWidth={1.5} />
                    Download PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-[#F87171]"
                    onClick={() => onDelete(report.id)}
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
