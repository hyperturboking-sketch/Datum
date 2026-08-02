"use client";

import {
  AlertTriangle,
  CheckCircle,
  Eye,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Send,
  Trash2,
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
import type { Rfi, RfiPriority } from "@/lib/api";

const priorityStyles: Record<RfiPriority, string> = {
  low: "bg-[rgba(100,116,139,0.10)] text-[#64748B] border-[rgba(100,116,139,0.20)]",
  normal: "bg-[rgba(96,165,250,0.10)] text-[#60A5FA] border-[rgba(96,165,250,0.20)]",
  high: "bg-[rgba(245,158,11,0.10)] text-[#F59E0B] border-[rgba(245,158,11,0.20)]",
  urgent: "bg-[rgba(248,113,113,0.10)] text-[#F87171] border-[rgba(248,113,113,0.20)]",
};

const priorityLabels: Record<RfiPriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

export function RfiPriorityBadge({ priority }: { priority: RfiPriority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase",
        priorityStyles[priority]
      )}
    >
      {priorityLabels[priority]}
    </span>
  );
}

const HEADER_COLUMNS = [
  { label: "RFI #", className: "w-[90px]" },
  { label: "Title", className: "flex-1" },
  { label: "Project", className: "w-[160px]" },
  { label: "Assigned To", className: "w-[140px]" },
  { label: "Status", className: "w-[100px]" },
  { label: "Priority", className: "w-[80px]" },
  { label: "Due", className: "w-[100px]" },
  { label: "", className: "w-[60px] text-right" },
];

export function RfisTable({
  rfis,
  isLoading,
  onView,
  onNew,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  rfis: Rfi[];
  isLoading: boolean;
  onView: (id: string) => void;
  onNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
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

  if (rfis.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-[#334155] bg-[#0D1117] px-6 py-16">
        <MessageSquare size={32} strokeWidth={1.5} className="text-[#334155]" />
        <p className="font-description mt-3 text-[14px] text-[#94A3B8]">
          No RFIs found
        </p>
        <p className="font-description mt-1 text-[13px] text-[#64748B]">
          Draft your first RFI from a project
        </p>
        <button
          type="button"
          onClick={onNew}
          className="mt-4 h-9 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110"
        >
          New RFI
        </button>
      </div>
    );
  }

  const now = Date.now();

  return (
    <div className="overflow-hidden rounded-lg border border-[#1E293B] bg-[#111827]">
      <div className="flex h-9 items-center border-b border-[#334155] px-4 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
        {HEADER_COLUMNS.map((col) => (
          <span key={col.label} className={col.className}>
            {col.label}
          </span>
        ))}
      </div>
      {rfis.map((rfi) => {
        const isOverdue =
          rfi.due_date !== null &&
          new Date(rfi.due_date).getTime() < now &&
          rfi.status !== "closed";
        return (
          <div
            key={rfi.id}
            onClick={() => onView(rfi.id)}
            className="flex h-12 cursor-pointer items-center border-b border-[#1E293B] px-4 transition-colors last:border-0 hover:bg-[#1E293B]"
          >
            <span className="w-[90px] truncate font-mono text-[12px] text-[#818CF8]">
              {rfi.rfi_number}
            </span>
            <span className="flex-1 truncate pr-4 text-[13px] text-[#F8FAFC]">
              {rfi.title}
            </span>
            <span className="w-[160px] truncate text-[13px] text-[#94A3B8]">
              {rfi.project_name}
            </span>
            <span className="w-[140px] truncate text-[13px] text-[#94A3B8]">
              {rfi.assigned_to_name ?? "Unassigned"}
            </span>
            <span className="w-[100px]">
              <StatusBadge status={rfi.status} variant="rfi" />
            </span>
            <span className="w-[80px]">
              <RfiPriorityBadge priority={rfi.priority} />
            </span>
            <span
              className={cn(
                "flex w-[100px] items-center gap-1 text-[12px] tabular-nums",
                isOverdue ? "text-[#F87171]" : "text-[#475569]"
              )}
            >
              {isOverdue && (
                <AlertTriangle size={10} strokeWidth={1.5} className="shrink-0" />
              )}
              {rfi.due_date ? formatDate(rfi.due_date) : "—"}
            </span>
            <div className="flex w-[60px] items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Actions for ${rfi.rfi_number}`}
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
                    onSelect={() => onView(rfi.id)}
                    className="rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC]"
                  >
                    <Eye size={14} strokeWidth={1.5} />
                    View
                  </DropdownMenuItem>
                  {rfi.status === "draft" && (
                    <>
                      <DropdownMenuItem
                        onSelect={() => onEdit(rfi.id)}
                        className="rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC]"
                      >
                        <Pencil size={14} strokeWidth={1.5} />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => onStatusChange(rfi.id, "sent")}
                        className="rounded-md px-2 py-1.5 text-[13px] text-[#818CF8] focus:bg-[#1E293B] focus:text-[#818CF8]"
                      >
                        <Send size={14} strokeWidth={1.5} />
                        Send
                      </DropdownMenuItem>
                    </>
                  )}
                  {rfi.status === "responded" && (
                    <DropdownMenuItem
                      onSelect={() => onStatusChange(rfi.id, "closed")}
                      className="rounded-md px-2 py-1.5 text-[13px] text-[#22C55E] focus:bg-[#1E293B] focus:text-[#22C55E]"
                    >
                      <CheckCircle size={14} strokeWidth={1.5} />
                      Mark Closed
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-[#1E293B]" />
                  <DropdownMenuItem
                    onSelect={() => onDelete(rfi.id)}
                    className="rounded-md px-2 py-1.5 text-[13px] text-[#F87171] focus:bg-[#1E293B] focus:text-[#F87171]"
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
    </div>
  );
}
