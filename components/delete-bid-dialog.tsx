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
import { Button } from "@/components/ui/button";

export interface DeleteBidDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  bidName: string;
  isLoading: boolean;
}

export function DeleteBidDialog({
  open,
  onOpenChange,
  onConfirm,
  bidName,
  isLoading,
}: DeleteBidDialogProps) {
  function handleOpenChange(next: boolean) {
    if (!next && isLoading) return;
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[400px] max-w-full rounded-lg border-[#334155] bg-[#111827] p-0">
        <DialogHeader className="border-b border-[#1E293B] p-4">
          <DialogTitle className="text-[16px] font-medium text-[#F87171]">
            Delete Bid
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="px-6 py-4 text-[13px] text-[#94A3B8]">
          Are you sure? This will permanently delete{" "}
          <span className="font-medium text-[#F8FAFC]">{bidName}</span> and its
          line items. This action cannot be undone.
        </DialogDescription>
        <DialogFooter className="border-t border-[#1E293B] p-4">
          <div className="flex w-full justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
              className="h-9 rounded-md border-[#334155] bg-transparent px-4 text-[13px] text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="h-9 rounded-md bg-[#F87171] px-4 text-[13px] font-medium text-white hover:bg-[#F87171]/90 disabled:opacity-40"
            >
              {isLoading && (
                <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
              )}
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
