"use client";

import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DeleteRfiDialog({
  open,
  onOpenChange,
  onConfirm,
  rfiNumber,
  isLoading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  rfiNumber: string;
  isLoading: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] rounded-lg border-[#334155] bg-[#111827] p-0">
        <DialogHeader className="border-b border-[#1E293B] p-4">
          <DialogTitle className="text-[16px] font-medium text-[#F87171]">
            Delete RFI
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="font-description px-6 py-4 text-[13px] text-[#94A3B8]">
          Are you sure? This will permanently delete{" "}
          <span className="font-medium text-[#F8FAFC]">{rfiNumber}</span> and
          its response history. This action cannot be undone.
        </DialogDescription>
        <DialogFooter className="border-t border-[#1E293B] p-4">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
            className="h-9 rounded-md border border-[#334155] bg-transparent px-4 text-[13px] text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-[#F8FAFC] disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="flex h-9 items-center gap-2 rounded-md bg-[#F87171] px-4 text-[13px] font-medium text-white transition-colors hover:bg-[#F87171]/90 disabled:opacity-40"
          >
            {isLoading && <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />}
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
