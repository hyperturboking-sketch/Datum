"use client";

import {
  CheckCircle,
  Eye,
  FileText,
  MessageSquare,
  MoreHorizontal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/formatters";
import type { Violation, ViolationSeverity } from "@/lib/api";

const severityStyles: Record<ViolationSeverity, string> = {
  critical:
    "bg-[rgba(248,113,113,0.10)] text-[#F87171] border-[rgba(248,113,113,0.20)]",
  major:
    "bg-[rgba(245,158,11,0.10)] text-[#F59E0B] border-[rgba(245,158,11,0.20)]",
  minor:
    "bg-[rgba(100,116,139,0.10)] text-[#64748B] border-[rgba(100,116,139,0.20)]",
};

const severityLabels: Record<ViolationSeverity, string> = {
  critical: "Critical",
  major: "Major",
  minor: "Minor",
};

const HEADER_COLUMNS = [
  { label: "Code", className: "w-[140px]" },
  { label: "Description", className: "flex-1" },
  { label: "Project", className: "w-[160px]" },
  { label: "Element", className: "w-[140px]" },
  { label: "Severity", className: "w-[90px]" },
  { label: "Status", className: "w-[100px]" },
  { label: "Date", className: "w-[100px]" },
  { label: "", className: "w-[60px] text-right" },
];

export function ViolationsTable({
  violations,
  isLoading,
  onResolve,
  onView,
}: {
  violations: Violation[];
  isLoading: boolean;
  onResolve: (id: string) => void;
  onView: (id: string) => void;
}) {
  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="mb-2 h-12 w-full rounded bg-[#1E293B]"
          />
        ))}
      </div>
    );
  }

  if (violations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-[#334155] bg-[#0D1117] px-6 py-16">
        <FileText size={32} strokeWidth={1.5} className="text-[#334155]" />
        <p className="font-description mt-3 text-[14px] text-[#94A3B8]">
          No violations found
        </p>
        <p className="font-description mt-1 text-[13px] text-[#64748B]">
          Run a compliance check to scan your models
        </p>
        <button
          type="button"
          onClick={() => alert("Open scan modal")}
          className="mt-4 h-9 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110"
        >
          New Scan
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[#1E293B] bg-[#111827]">
      <div className="flex h-9 items-center border-b border-[#334155] px-4 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
        {HEADER_COLUMNS.map((col) => (
          <span key={col.label} className={col.className}>
            {col.label}
          </span>
        ))}
      </div>
      {violations.map((violation) => (
        <div
          key={violation.id}
          onClick={() => onView(violation.id)}
          className="flex h-12 cursor-pointer items-center border-b border-[#1E293B] px-4 transition-colors last:border-0 hover:bg-[#1E293B]"
        >
          <span className="w-[140px] truncate font-mono text-[13px] text-[#818CF8]">
            {violation.code}
          </span>
          <span className="flex-1 truncate pr-4 text-[13px] text-[#F8FAFC]">
            {violation.description}
          </span>
          <span className="w-[160px] truncate text-[13px] text-[#94A3B8]">
            {violation.project_name}
          </span>
          <span className="w-[140px] truncate text-[12px] text-[#64748B]">
            {violation.element_name ?? "—"}
          </span>
          <span className="w-[90px]">
            <span
              className={cn(
                "inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase",
                severityStyles[violation.severity]
              )}
            >
              {severityLabels[violation.severity]}
            </span>
          </span>
          <span className="w-[100px]">
            <StatusBadge status={violation.status} variant="violation" />
          </span>
          <span className="w-[100px] text-[12px] tabular-nums text-[#475569]">
            {formatDate(violation.created_at)}
          </span>
          <div className="flex w-[60px] items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Actions for ${violation.code}`}
                  className="rounded-md text-[#64748B] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
                >
                  <MoreHorizontal size={14} strokeWidth={1.5} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[150px] rounded-md border-[#334155] bg-[#111827] p-1 text-[13px] text-[#94A3B8]"
              >
                <DropdownMenuItem
                  onSelect={() => onView(violation.id)}
                  className="rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC]"
                >
                  <Eye size={14} strokeWidth={1.5} />
                  View
                </DropdownMenuItem>
                {violation.status !== "resolved" &&
                  violation.status !== "waived" && (
                    <>
                      <DropdownMenuItem
                        onSelect={() => onResolve(violation.id)}
                        className="rounded-md px-2 py-1.5 text-[13px] text-[#22C55E] focus:bg-[#1E293B] focus:text-[#22C55E]"
                      >
                        <CheckCircle size={14} strokeWidth={1.5} />
                        Mark Resolved
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-[#1E293B]" />
                      <DropdownMenuItem
                        onSelect={() => alert("Generate RFI")}
                        className="rounded-md px-2 py-1.5 text-[13px] text-[#818CF8] focus:bg-[#1E293B] focus:text-[#818CF8]"
                      >
                        <MessageSquare size={14} strokeWidth={1.5} />
                        Generate RFI
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => alert("Waive violation")}
                        className="rounded-md px-2 py-1.5 text-[13px] text-[#F59E0B] focus:bg-[#1E293B] focus:text-[#F59E0B]"
                      >
                        <X size={14} strokeWidth={1.5} />
                        Waive
                      </DropdownMenuItem>
                    </>
                  )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
