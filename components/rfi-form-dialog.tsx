"use client";

import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateRFI, useProjects, useUpdateRFI } from "@/lib/queries";
import { extractErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import type { Rfi, RfiPriority, RfiStatus } from "@/lib/api";

const selectClass =
  "h-9 w-full appearance-none rounded-md border border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC] focus:border-[#818CF8] focus:outline-none";

const priorityOptions: RfiPriority[] = ["low", "normal", "high", "urgent"];
const statusOptions: RfiStatus[] = ["draft", "sent", "responded", "closed"];

const labelClass = "mb-1.5 block text-[12px] tracking-wider text-[#94A3B8] uppercase";

export function RfiFormDialog({
  rfi,
  open,
  onOpenChange,
}: {
  rfi: Rfi | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isEdit = rfi !== null;
  const createMutation = useCreateRFI();
  const updateMutation = useUpdateRFI();
  const projectsQuery = useProjects({
    search: "",
    statuses: [],
    sortBy: "name",
    sortOrder: "asc",
    limit: 500,
    offset: 0,
  });
  const projects = projectsQuery.data?.projects ?? [];

  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<RfiPriority>("normal");
  const [status, setStatus] = useState<RfiStatus>("draft");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    if (!open) return;
    setProjectId(rfi?.project_id ?? "");
    setTitle(rfi?.title ?? "");
    setDescription(rfi?.description ?? "");
    setPriority(rfi?.priority ?? "normal");
    setStatus(rfi?.status ?? "draft");
    setDueDate(rfi?.due_date?.slice(0, 10) ?? "");
    setAssignedTo(rfi?.assigned_to_name ?? "");
  }, [open, rfi]);

  const isPending = createMutation.isPending || updateMutation.isPending;

  function handleOpenChange(next: boolean) {
    if (!next && isPending) return;
    onOpenChange(next);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!projectId || !title.trim() || !description.trim()) return;

    const base = {
      project_id: projectId,
      title: title.trim(),
      description: description.trim(),
      priority,
      due_date: dueDate || null,
      assigned_to_name: assignedTo.trim() || null,
      linked_violation_id: null,
    };

    if (isEdit && rfi) {
      updateMutation.mutate(
        { id: rfi.id, input: { ...base, status } },
        {
          onSuccess: () => {
            toast.success("RFI updated");
            handleOpenChange(false);
          },
          onError: (error) => {
            toast.error(extractErrorMessage(error));
          },
        }
      );
    } else {
      createMutation.mutate(base, {
        onSuccess: () => {
          toast.success("RFI created");
          handleOpenChange(false);
        },
        onError: (error) => {
          toast.error(extractErrorMessage(error));
        },
      });
    }
  }

  const canSubmit =
    projectId.length > 0 &&
    title.trim().length > 0 &&
    description.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[480px] max-w-full rounded-lg border border-[#334155] bg-[#111827] p-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-[#1E293B] p-4">
          <DialogTitle className="text-[16px] font-medium text-[#F8FAFC]">
            {isEdit ? "Edit RFI" : "New RFI"}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Close"
              className="rounded-md text-[#64748B] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
            >
              <X size={16} strokeWidth={1.5} />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="sr-only">
          {isEdit ? "Edit RFI details" : "Create a new RFI"}
        </DialogDescription>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div>
            <label htmlFor="rfi-project" className={labelClass}>
              Project
            </label>
            <select
              id="rfi-project"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              disabled={projectsQuery.isLoading}
              className={selectClass}
            >
              <option value="" disabled>
                {projectsQuery.isLoading
                  ? "Loading projects..."
                  : "Select a project"}
              </option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {projectsQuery.isError && (
              <p className="font-description mt-1 text-[12px] text-[#F87171]">
                Unable to load projects
              </p>
            )}
          </div>

          <div>
            <label htmlFor="rfi-title" className={labelClass}>
              Title
            </label>
            <Input
              id="rfi-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Clarify rebar lapping at Level 3 columns"
              autoFocus
              className="h-9 rounded-md border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569]"
            />
          </div>

          <div>
            <label htmlFor="rfi-description" className={labelClass}>
              Description
            </label>
            <textarea
              id="rfi-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the question, location, and any relevant context..."
              rows={3}
              className="w-full resize-none rounded-md border border-[#334155] bg-[#0D1117] p-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569] focus:border-[#818CF8] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="rfi-priority" className={labelClass}>
                Priority
              </label>
              <select
                id="rfi-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as RfiPriority)}
                className={selectClass}
              >
                {priorityOptions.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="rfi-status" className={labelClass}>
                Status
              </label>
              <select
                id="rfi-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as RfiStatus)}
                className={selectClass}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="rfi-due" className={labelClass}>
                Due date
              </label>
              <Input
                id="rfi-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-9 rounded-md border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC]"
              />
            </div>
            <div>
              <label htmlFor="rfi-assigned" className={labelClass}>
                Assign to
              </label>
              <Input
                id="rfi-assigned"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="e.g. M. Okafor"
                className="h-9 rounded-md border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569]"
              />
            </div>
          </div>

          <DialogFooter className="mt-2 border-t border-[#1E293B] p-4">
            <div className="flex w-full justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="h-9 rounded-md border-[#334155] bg-transparent px-4 text-[13px] text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit || isPending}
                className="h-9 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] hover:brightness-110 disabled:opacity-40"
              >
                {isPending && (
                  <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
                )}
                {isPending
                  ? isEdit
                    ? "Saving..."
                    : "Creating..."
                  : isEdit
                    ? "Save changes"
                    : "Create RFI"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
