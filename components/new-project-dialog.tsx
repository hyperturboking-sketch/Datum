"use client";

import { useState } from "react";
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
import { useCreateProject } from "@/lib/queries";
import { extractErrorMessage } from "@/lib/api";
import { toast } from "sonner";

export interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProjectDialog({
  open,
  onOpenChange,
}: NewProjectDialogProps) {
  const createProject = useCreateProject();

  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function reset() {
    setName("");
    setClientName("");
    setContractValue("");
    setLocation("");
    setStartDate("");
    setEndDate("");
  }

  function handleOpenChange(next: boolean) {
    if (!next && createProject.isPending) return;
    onOpenChange(next);
    if (!next) reset();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !clientName.trim()) return;
    createProject.mutate(
      {
        name: name.trim(),
        client_name: clientName.trim(),
        contract_value: contractValue.trim() ? Number(contractValue) : 0,
        location: location.trim() || null,
        start_date: startDate || null,
        end_date: endDate || null,
      },
      {
        onSuccess: () => {
          toast.success("Project created");
          handleOpenChange(false);
        },
        onError: (error) => {
          toast.error(extractErrorMessage(error));
        },
      }
    );
  }

  const canSubmit = name.trim().length > 0 && clientName.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[480px] max-w-full rounded-lg border border-[#334155] bg-[#111827] p-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-[#1E293B] p-4">
          <DialogTitle className="text-[16px] font-medium text-[#F8FAFC]">
            New Project
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
          Create a new project
        </DialogDescription>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div>
            <label
              htmlFor="project-name"
              className="mb-1.5 block text-[12px] tracking-wider text-[#94A3B8] uppercase"
            >
              Project name
            </label>
            <Input
              id="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Meridian Tower"
              autoFocus
              className="h-9 rounded-md border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569]"
            />
          </div>

          <div>
            <label
              htmlFor="client-name"
              className="mb-1.5 block text-[12px] tracking-wider text-[#94A3B8] uppercase"
            >
              Client name
            </label>
            <Input
              id="client-name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Harbor Development Group"
              className="h-9 rounded-md border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569]"
            />
          </div>

          <div>
            <label
              htmlFor="contract-value"
              className="mb-1.5 block text-[12px] tracking-wider text-[#94A3B8] uppercase"
            >
              Contract value
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[13px] text-[#475569]">
                $
              </span>
              <Input
                id="contract-value"
                type="number"
                min={0}
                step="0.01"
                value={contractValue}
                onChange={(e) => setContractValue(e.target.value)}
                placeholder="0"
                className="h-9 rounded-md border-[#334155] bg-[#0D1117] pl-7 pr-3 text-[13px] text-[#F8FAFC] tabular-nums placeholder:text-[#475569]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="project-location"
              className="mb-1.5 block text-[12px] tracking-wider text-[#94A3B8] uppercase"
            >
              Location <span className="normal-case text-[#475569]">(optional)</span>
            </label>
            <Input
              id="project-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Austin, TX"
              className="h-9 rounded-md border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start-date"
                className="mb-1.5 block text-[12px] tracking-wider text-[#94A3B8] uppercase"
              >
                Start date
              </label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9 rounded-md border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC]"
              />
            </div>
            <div>
              <label
                htmlFor="end-date"
                className="mb-1.5 block text-[12px] tracking-wider text-[#94A3B8] uppercase"
              >
                End date
              </label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9 rounded-md border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC]"
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
                disabled={!canSubmit || createProject.isPending}
                className="h-9 rounded-md bg-[#00D4AA] px-4 text-[13px] font-medium text-[#0B0F19] hover:brightness-110 disabled:opacity-40"
              >
                {createProject.isPending && (
                  <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
                )}
                {createProject.isPending ? "Creating..." : "Create project"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
