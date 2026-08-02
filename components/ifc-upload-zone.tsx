"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUploadIfc } from "@/hooks/use-ifc-upload";
import { extractErrorMessage } from "@/lib/api";

const MAX_SIZE_MB = 200;

export function IfcUploadZone({ projectId }: { projectId: string | null }) {
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedName, setUploadedName] = useState<string | null>(null);
  const [parseDone, setParseDone] = useState<"completed" | "failed" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useUploadIfc();

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;
      if (file.type && file.type !== "application/octet-stream" && !file.name.toLowerCase().endsWith(".ifc")) {
        toast.error("Invalid file type", {
          description: `Expected an .ifc file, got "${file.name}".`,
        });
        return;
      }
      if (!file.name.toLowerCase().endsWith(".ifc")) {
        toast.error("Invalid file type", {
          description: `Expected an .ifc file, got "${file.name}".`,
        });
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error("File too large", {
          description: `Maximum size is ${MAX_SIZE_MB} MB.`,
        });
        return;
      }

      setUploadedName(file.name);
      setProgress(0);
      setParseDone(null);

      upload.mutate(
        {
          file,
          projectId,
          onProgress: setProgress,
        },
        {
          onSuccess: (res) => {
            setProgress(100);
            setParseDone(res.parse_status === "failed" ? "failed" : "completed");
            if (res.parse_status === "failed") {
              toast.error("Parsing failed", {
                description: `"${res.file_name}" could not be parsed.`,
              });
            } else {
              toast.success("Upload complete", {
                description: `"${res.file_name}" parsed successfully.`,
              });
            }
          },
          onError: (err) => {
            setParseDone("failed");
            toast.error("Upload failed", {
              description: extractErrorMessage(err),
            });
          },
        }
      );
    },
    [upload, projectId]
  );

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept=".ifc,application/octet-stream"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        role="button"
        tabIndex={0}
        aria-label="Upload IFC file"
        onClick={() => {
          if (!upload.isPending && parseDone !== "completed") inputRef.current?.click();
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !upload.isPending && parseDone !== "completed") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[rgba(255,255,255,0.12)] bg-[#18181b] px-6 text-center transition-colors",
          "focus-visible:border-ring focus-visible:outline-none",
          dragOver && "border-[#525866] bg-[#262626]",
          (upload.isPending || parseDone === "completed") && "pointer-events-none cursor-default"
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-[6px] border border-[rgba(255,255,255,0.12)] bg-[#0A0A0A]">
          <CloudUploadIcon style={{ fontSize: 20 }} className="text-[#525252]" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#E5E5E5]">
            {upload.isPending
              ? `Uploading ${uploadedName}`
              : parseDone === "completed"
                ? "Upload complete"
                : "Drag & drop your IFC file here"}
          </p>
          <p className="mt-1 text-[13px] text-[#737373]">
            {upload.isPending
              ? `Parsing and extracting quantities â€” ${progress}%`
              : parseDone === "completed"
                ? "View results below or run bid estimation"
                : "or click to browse â€” max 200 MB"}
          </p>
        </div>

        {upload.isPending && (
          <div className="w-full max-w-xs">
            <Progress value={progress} className="h-1 bg-[#262626]" />
            <p className="mt-2 text-[13px] tabular-nums text-[#A3A3A3]">
              {progress}%
            </p>
          </div>
        )}

        {parseDone === "completed" && (
          <div className="flex items-center gap-2 text-[#A3A3A3]">
            <CheckCircleOutlinedIcon style={{ fontSize: 16 }} />
            <span className="text-[13px] font-medium">Parsed successfully</span>
          </div>
        )}
        {parseDone === "failed" && (
          <div className="flex items-center gap-2 text-[#B57373]">
            <CancelIcon style={{ fontSize: 16 }} />
            <span className="text-[13px] font-medium">Parsing failed</span>
          </div>
        )}

        {!upload.isPending && !uploadedName && (
          <Button type="button" variant="outline" size="sm" className="mt-1">
            <DescriptionIcon style={{ fontSize: 14 }} />
            Browse files
          </Button>
        )}
      </div>
    </div>
  );
}
