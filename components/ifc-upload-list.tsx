"use client";

import { useState } from "react";
import { toast } from "sonner";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import InboxIcon from "@mui/icons-material/Inbox";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteIfc, useIfcUploads } from "@/hooks/use-ifc-upload";
import { extractErrorMessage, type IfcUploadResponse, type ParseStatus } from "@/lib/api";
import { IfcParseResults } from "@/components/ifc-parse-results";

const statusStyles: Record<ParseStatus, string> = {
  pending: "bg-[#262626] text-[#A3A3A3]",
  parsing: "bg-[#262626] text-[#A3A3A3]",
  completed: "bg-[#262626] text-[#E5E5E5]",
  failed: "bg-[#B57373]/10 text-[#B57373]",
};

const statusLabels: Record<ParseStatus, string> = {
  pending: "Pending",
  parsing: "Parsing",
  completed: "Completed",
  failed: "Failed",
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatusBadge({ status }: { status: ParseStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        statusStyles[status]
      )}
    >
      {status === "parsing" && (
        <span className="size-1.5 animate-pulse rounded-full bg-[#A3A3A3]" />
      )}
      {status === "failed" && <WarningAmberIcon style={{ fontSize: 12 }} />}
      {statusLabels[status]}
    </span>
  );
}

function UploadRow({
  upload,
  onView,
  onDelete,
  deletePending,
}: {
  upload: IfcUploadResponse;
  onView: () => void;
  onDelete: () => void;
  deletePending: boolean;
}) {
  const elementCount = upload.summary?.total_elements ?? null;

  return (
    <div className="flex items-center gap-4 border-b border-[rgba(255,255,255,0.12)] px-4 py-3 last:border-b-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-[rgba(255,255,255,0.12)] bg-[#0A0A0A]">
        <DescriptionIcon style={{ fontSize: 16 }} className="text-[#737373]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-[#E5E5E5]">{upload.file_name}</p>
        <p className="mt-0.5 text-xs text-[#737373]">
          {formatDate(upload.created_at)} Â· {formatBytes(upload.file_size_bytes)}
          {elementCount !== null && (
            <>
              {" "}
              Â· <span className="tabular-nums">{elementCount}</span> elements
            </>
          )}
        </p>
      </div>
      <StatusBadge status={upload.parse_status} />
      <div className="flex shrink-0 items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onView}
          aria-label={`View ${upload.file_name}`}
          className="text-[#737373] hover:text-[#E5E5E5]"
        >
          <VisibilityIcon style={{ fontSize: 16 }} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onDelete}
          disabled={deletePending}
          aria-label={`Delete ${upload.file_name}`}
          className="text-[#737373] hover:text-[#B57373]"
        >
          <DeleteOutlinedIcon style={{ fontSize: 16 }} />
        </Button>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 border-b border-[rgba(255,255,255,0.12)] px-4 py-3 last:border-b-0">
      <div className="h-9 w-9 animate-pulse rounded-[6px] bg-[#262626]" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-1/3 animate-pulse rounded bg-[#262626]" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-[#262626]" />
      </div>
      <div className="h-5 w-20 animate-pulse rounded-full bg-[#262626]" />
    </div>
  );
}

export function IfcUploadList({ projectId }: { projectId: string | null }) {
  const [viewId, setViewId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const uploads = useIfcUploads();
  const del = useDeleteIfc();

  const rows = uploads.data?.uploads ?? [];
  const viewUpload = rows.find((u) => u.id === viewId) ?? null;
  const deleteUpload = rows.find((u) => u.id === deleteId) ?? null;

  const confirmDelete = () => {
    if (!deleteId) return;
    del.mutate(deleteId, {
      onSuccess: () => {
        toast.success("Upload deleted");
        setDeleteId(null);
      },
      onError: (err) => {
        toast.error("Failed to delete", { description: extractErrorMessage(err) });
      },
    });
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b]">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.12)] px-4 py-3">
        <div>
          <h3 className="text-sm font-medium text-[#E5E5E5]">Uploads</h3>
          <p className="mt-0.5 text-xs text-[#737373]">
            {uploads.isLoading
              ? "Loadingâ€¦"
              : `${rows.length} of ${uploads.data?.total ?? 0} total`}
          </p>
        </div>
      </div>

      <div>
        {uploads.isLoading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[rgba(255,255,255,0.12)] bg-[#0A0A0A]">
              <InboxIcon style={{ fontSize: 16 }} className="text-[#525252]" />
            </div>
            <p className="text-sm font-medium text-[#737373]">No uploads yet</p>
            <p className="text-xs text-[#525252]">Upload an IFC file to get started.</p>
          </div>
        ) : (
          rows.map((upload) => (
            <UploadRow
              key={upload.id}
              upload={upload}
              onView={() => setViewId(upload.id)}
              onDelete={() => setDeleteId(upload.id)}
              deletePending={del.isPending && del.variables === upload.id}
            />
          ))
        )}
      </div>

      <Dialog
        open={viewId !== null}
        onOpenChange={(open) => {
          if (!open) setViewId(null);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="truncate">{viewUpload?.file_name ?? "Parsed results"}</DialogTitle>
            <DialogDescription>
              {viewUpload
                ? `${viewUpload.file_name} Â· ${formatDate(viewUpload.created_at)}`
                : "Viewing parsed IFC results"}
            </DialogDescription>
          </DialogHeader>
          {viewId && <IfcParseResults uploadId={viewId} projectId={projectId} />}
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open && !del.isPending) setDeleteId(null);
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete upload?</DialogTitle>
            <DialogDescription>
              {deleteUpload
                ? `"${deleteUpload.file_name}" and its stored file will be permanently removed. This cannot be undone.`
                : "This upload and its stored file will be permanently removed."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteId(null)}
              disabled={del.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              disabled={del.isPending}
            >
          <DeleteOutlinedIcon style={{ fontSize: 16 }} />
          Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
