"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { EpdUploadZone } from "@/components/epd-upload-zone";
import { SustainabilityDetailDialog } from "@/components/sustainability-detail-dialog";
import { SustainabilityReportsTable } from "@/components/sustainability-reports-table";
import { SustainabilityStats } from "@/components/sustainability-stats";
import { useAuth } from "@/lib/auth";
import type { EPDUpload } from "@/lib/api";
import {
  useDeleteSustainabilityReport,
  useSustainabilityReports,
} from "@/lib/queries";

function DeleteReportDialog({
  open,
  onOpenChange,
  onConfirm,
  reportName,
  isLoading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  reportName: string;
  isLoading: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] rounded-lg border-[#334155] bg-[#111827] p-0">
        <DialogHeader className="border-b border-[#1E293B] p-4">
          <DialogTitle className="text-[16px] font-medium text-[#F87171]">
            Delete report
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="px-6 py-4 text-[13px] text-[#94A3B8]">
          Are you sure? This will permanently delete{" "}
          <span className="font-medium text-[#F8FAFC]">{reportName}</span> and
          its carbon analysis. This action cannot be undone.
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

export default function SustainabilityPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data, isLoading, isError, refetch } = useSustainabilityReports();
  const { mutate: deleteReport, isPending: isDeleting } =
    useDeleteSustainabilityReport();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const reports = data?.reports ?? [];
  const selectedReport = reports.find((report) => report.id === selectedId) ?? null;
  const deleteReportName =
    reports.find((report) => report.id === deleteId)?.report_name ?? "";

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0D1117]">
        <div className="mx-auto max-w-6xl">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="mt-2 h-4 w-56" />
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-[#1E293B] bg-[#111827] p-4"
              >
                <Skeleton className="h-3 w-20 bg-[#1E293B]" />
                <Skeleton className="mt-3 h-7 w-24 bg-[#1E293B]" />
              </div>
            ))}
          </div>
          <Skeleton className="mt-6 h-32 w-full rounded-lg bg-[#111827]" />
          <Skeleton className="mt-6 h-72 w-full rounded-lg bg-[#111827]" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0D1117]">
        <AlertTriangle size={24} strokeWidth={1.5} className="text-[#F87171]" />
        <p className="mt-2 text-[14px] text-[#94A3B8]">
          Failed to load reports
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-4 h-8 rounded-md border border-[#334155] bg-transparent px-3 text-[13px] text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-[24px] font-medium text-[#F8FAFC]">
              Sustainability
            </h1>
            <p className="mt-1 text-[13px] text-[#94A3B8]">
              ESG reports and embodied carbon analysis
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert("Starting new sustainability report...")}
            className="flex h-9 items-center gap-2 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110"
          >
            <Plus size={14} strokeWidth={1.5} />
            New Report
          </button>
        </div>

        <div className="mb-6">
          <SustainabilityStats reports={reports} />
        </div>

        <div className="mb-6">
          <EpdUploadZone
            onUploadComplete={(epd: EPDUpload) =>
              alert(`EPD uploaded: ${epd.file_name}`)
            }
          />
        </div>

        <SustainabilityReportsTable
          reports={reports}
          isLoading={isLoading}
          onView={(id) => {
            setSelectedId(id);
            setDetailOpen(true);
          }}
          onDelete={(id) => {
            setDeleteId(id);
            setDeleteOpen(true);
          }}
          onNewReport={() => alert("Starting new sustainability report...")}
        />

        <SustainabilityDetailDialog
          report={selectedReport}
          open={detailOpen}
          onOpenChange={setDetailOpen}
        />

        <DeleteReportDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onConfirm={() => {
            if (deleteId) {
              deleteReport(deleteId, {
                onSuccess: () => {
                  setDeleteOpen(false);
                  setDeleteId(null);
                },
              });
            }
          }}
          reportName={deleteReportName}
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
}
