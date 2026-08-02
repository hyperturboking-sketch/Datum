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
import { useDeleteProject } from "@/lib/queries";
import { extractErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import type { Project } from "@/lib/api";

export interface DeleteProjectDialogProps {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProjectDialog({
  project,
  onOpenChange,
}: DeleteProjectDialogProps) {
  const deleteProject = useDeleteProject();

  function handleOpenChange(next: boolean) {
    if (!next && deleteProject.isPending) return;
    onOpenChange(next);
  }

  function handleConfirm() {
    if (!project) return;
    deleteProject.mutate(project.id, {
      onSuccess: () => {
        toast.success("Project deleted");
        handleOpenChange(false);
      },
      onError: (error) => {
        toast.error(extractErrorMessage(error));
      },
    });
  }

  return (
    <Dialog open={project !== null} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[440px] max-w-full rounded-lg border border-[#334155] bg-[#111827] p-0">
        <DialogHeader className="border-b border-[#1E293B] p-4">
          <DialogTitle className="text-[16px] font-medium text-[#EF4444]">
            Delete Project
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="px-6 py-4 text-[13px] text-[#94A3B8]">
          Are you sure? This will permanently delete{" "}
          <span className="font-medium text-[#F8FAFC]">{project?.name}</span>{" "}
          and all associated bids, drawings, and reports.
        </DialogDescription>
        <DialogFooter className="border-t border-[#1E293B] p-4">
          <div className="flex w-full justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="h-9 rounded-md border-[#334155] bg-transparent px-4 text-[13px] text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={deleteProject.isPending}
              className="h-9 rounded-md bg-[#EF4444] px-4 text-[13px] font-medium text-white hover:bg-[#EF4444]/90 disabled:opacity-40"
            >
              {deleteProject.isPending && (
                <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
              )}
              {deleteProject.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
