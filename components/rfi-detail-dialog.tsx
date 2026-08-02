"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/status-badge";
import { RfiPriorityBadge } from "@/components/rfis-table";
import { formatDate } from "@/lib/formatters";
import type { Rfi } from "@/lib/api";

export function RfiDetailDialog({
  rfi,
  open,
  onOpenChange,
  onStatusChange,
  isUpdating,
}: {
  rfi: Rfi | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (status: string) => void;
  isUpdating: boolean;
}) {
  const router = useRouter();

  if (!rfi) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] w-[560px] max-w-[95vw] flex-col overflow-hidden rounded-lg border-[#334155] bg-[#111827] p-0">
        <div className="flex items-start justify-between border-b border-[#1E293B] p-4">
          <div>
            <p className="font-mono text-[12px] text-[#818CF8]">
              {rfi.rfi_number}
            </p>
            <p className="mt-1 text-[16px] font-medium text-[#F8FAFC]">
              {rfi.title}
            </p>
            <p className="font-description mt-0.5 text-[13px] text-[#94A3B8]">
              {rfi.project_name}
            </p>
          </div>
          <div className="ml-4 flex items-start gap-3">
            <StatusBadge status={rfi.status} variant="rfi" />
            <X
              size={16}
              strokeWidth={1.5}
              className="cursor-pointer text-[#64748B] transition-colors hover:text-[#F8FAFC]"
              onClick={() => onOpenChange(false)}
            />
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <div>
            <p className="mb-1.5 text-[12px] tracking-wider text-[#94A3B8] uppercase">
              Description
            </p>
            <p className="rounded-lg border border-[#1E293B] bg-[#0D1117] p-3 text-[13px] leading-relaxed text-[#F8FAFC]">
              {rfi.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[12px] text-[#94A3B8]">Created by</p>
              <p className="mt-0.5 text-[13px] text-[#F8FAFC]">
                {rfi.created_by_name}
              </p>
            </div>
            <div>
              <p className="text-[12px] text-[#94A3B8]">Assigned to</p>
              <p className="mt-0.5 text-[13px] text-[#F8FAFC]">
                {rfi.assigned_to_name ?? "Unassigned"}
              </p>
            </div>
            <div>
              <p className="text-[12px] text-[#94A3B8]">Created</p>
              <p className="mt-0.5 text-[13px] text-[#F8FAFC]">
                {formatDate(rfi.created_at)}
              </p>
            </div>
            <div>
              <p className="text-[12px] text-[#94A3B8]">Due</p>
              <p className="mt-0.5 text-[13px] text-[#F8FAFC]">
                {rfi.due_date ? formatDate(rfi.due_date) : "No due date"}
              </p>
            </div>
            <div>
              <p className="text-[12px] text-[#94A3B8]">Priority</p>
              <p className="mt-0.5">
                <RfiPriorityBadge priority={rfi.priority} />
              </p>
            </div>
          </div>

          {rfi.linked_violation_code && (
            <div>
              <p className="mb-1.5 text-[12px] tracking-wider text-[#94A3B8] uppercase">
                Linked Violation
              </p>
              <p
                className="cursor-pointer text-[13px] text-[#818CF8] transition-colors hover:underline"
                onClick={() => {
                  onOpenChange(false);
                  if (rfi.linked_violation_id) {
                    router.push(`/compliance/${rfi.linked_violation_id}`);
                  }
                }}
              >
                {rfi.linked_violation_code}
              </p>
            </div>
          )}

          {rfi.response_text && (
            <div className="border-t border-[#1E293B] pt-4">
              <p className="mb-1.5 text-[12px] tracking-wider text-[#94A3B8] uppercase">
                Response
              </p>
              <p className="rounded-lg border border-[#1E293B] bg-[#0D1117] p-3 text-[13px] leading-relaxed text-[#F8FAFC]">
                {rfi.response_text}
              </p>
              <p className="font-description mt-1 text-[12px] text-[#64748B]">
                {[
                  rfi.responded_by_name,
                  rfi.responded_at ? formatDate(rfi.responded_at) : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-[#1E293B] p-4">
          {rfi.status === "draft" && (
            <>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => onStatusChange("sent")}
                className="flex h-9 items-center gap-2 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110 disabled:opacity-40"
              >
                {isUpdating ? "Updating..." : "Send"}
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => alert("Open edit RFI")}
                className="h-9 rounded-md border border-[#334155] bg-transparent px-4 text-[13px] text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-[#F8FAFC] disabled:opacity-40"
              >
                Edit
              </button>
            </>
          )}
          {rfi.status === "sent" && (
            <>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => onStatusChange("responded")}
                className="flex h-9 items-center gap-2 rounded-md bg-[#22C55E] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110 disabled:opacity-40"
              >
                {isUpdating ? "Updating..." : "Mark Responded"}
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => alert("Add reminder")}
                className="h-9 rounded-md border border-[#334155] bg-transparent px-4 text-[13px] text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-[#F8FAFC] disabled:opacity-40"
              >
                Add Reminder
              </button>
            </>
          )}
          {rfi.status === "responded" && (
            <>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => onStatusChange("closed")}
                className="flex h-9 items-center gap-2 rounded-md bg-[#22C55E] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110 disabled:opacity-40"
              >
                {isUpdating ? "Updating..." : "Mark Closed"}
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => onStatusChange("sent")}
                className="h-9 rounded-md border border-[#334155] bg-transparent px-4 text-[13px] text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-[#F8FAFC] disabled:opacity-40"
              >
                Reopen
              </button>
            </>
          )}
          {rfi.status === "closed" && (
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => onStatusChange("sent")}
              className="flex h-9 items-center gap-2 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110 disabled:opacity-40"
            >
              {isUpdating ? "Updating..." : "Reopen"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
