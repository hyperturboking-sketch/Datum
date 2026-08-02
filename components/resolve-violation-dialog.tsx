"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ResolveViolationDialog({
  open,
  onOpenChange,
  onConfirm,
  violationCode,
  isLoading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  violationCode: string;
  isLoading: boolean;
}) {
  const [note, setNote] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] rounded-lg border-[#334155] bg-[#111827] p-0">
        <DialogHeader className="border-b border-[#1E293B] p-4">
          <DialogTitle className="text-[16px] font-medium text-[#22C55E]">
            Resolve Violation
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="font-description px-6 py-4 text-[13px] text-[#94A3B8]">
          Mark violation {violationCode} as resolved? Add a resolution note.
        </DialogDescription>
        <div className="px-6 pb-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe the fix applied..."
            className="h-20 w-full rounded-md border border-[#334155] bg-[#0D1117] p-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569] focus:border-[#22C55E] focus:outline-none"
          />
        </div>
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
            className="flex h-9 items-center gap-2 rounded-md bg-[#22C55E] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110 disabled:opacity-40"
          >
            {isLoading && <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />}
            {isLoading ? "Resolving..." : "Resolve"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
