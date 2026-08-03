"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Loader2,
  UploadCloud,
} from "lucide-react";
import type { EPDUpload } from "@/lib/api";

type UploadState = "idle" | "uploading" | "completed" | "error";

export function EpdUploadZone({
  onUploadComplete,
}: {
  onUploadComplete: (epd: EPDUpload) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [epd, setEpd] = useState<EPDUpload | null>(null);

  useEffect(() => {
    if (state !== "uploading") return;
    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + 8 + Math.round(Math.random() * 10));
        return next;
      });
    }, 200);
    return () => window.clearInterval(interval);
  }, [state]);

  useEffect(() => {
    if (state === "uploading" && progress >= 100) {
      const record: EPDUpload = {
        id: crypto.randomUUID(),
        file_name: fileName ?? "document.epd",
        material_category: "Unclassified",
        manufacturer: "Unknown manufacturer",
        gwp_per_unit: 0,
        unit: "kg CO₂e",
        uploaded_at: new Date().toISOString(),
      };
      setEpd(record);
      setState("completed");
      onUploadComplete(record);
    }
  }, [progress, state, fileName, onUploadComplete]);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (!/\.(pdf|xml)$/i.test(file.name)) {
      setFileName(file.name);
      setErrorMessage("Only .pdf and .xml files are supported");
      setState("error");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setFileName(file.name);
      setErrorMessage("File exceeds the 50MB limit");
      setState("error");
      return;
    }
    setFileName(file.name);
    setErrorMessage(null);
    setProgress(0);
    setEpd(null);
    setState("uploading");
  };

  const handleZoneClick = () => {
    if (state === "uploading") return;
    if (state === "completed") {
      setState("idle");
      setProgress(0);
      setEpd(null);
    }
    inputRef.current?.click();
  };

  const borderClass =
    state === "uploading"
      ? "border-[#818CF8]"
      : state === "completed"
        ? "border-[#22C55E]"
        : state === "error"
          ? "border-[#F87171]"
          : "border-[#334155] hover:border-[#475569]";

  return (
    <div>
      <p className="mb-4 text-[15px] font-medium text-[#F8FAFC]">
        Environmental Product Declarations
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.xml"
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />

      <div
        role="button"
        tabIndex={0}
        aria-label="Upload EPD file"
        onClick={handleZoneClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") handleZoneClick();
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFiles(event.dataTransfer.files);
        }}
        className={`cursor-pointer rounded-lg border-2 border-dashed bg-[#111827] py-10 text-center transition-colors ${borderClass}`}
      >
        {state === "idle" && (
          <>
            <UploadCloud
              size={28}
              strokeWidth={1.5}
              className="mx-auto mb-3 text-[#64748B]"
            />
            <p className="text-[14px] text-[#94A3B8]">Drop EPD files here</p>
            <p className="mt-1 text-[12px] text-[#475569]">
              PDF or XML format, up to 50MB
            </p>
          </>
        )}

        {state === "uploading" && (
          <>
            <Loader2
              size={28}
              strokeWidth={1.5}
              className="mx-auto mb-3 animate-spin text-[#818CF8]"
            />
            <p className="text-[14px] text-[#94A3B8]">{fileName}</p>
            <p className="mt-1 text-[12px] text-[#475569]">
              Processing declaration...
            </p>
            <div className="mx-auto mt-4 h-1 w-64 max-w-full overflow-hidden rounded bg-[#1E293B]">
              <div
                className="h-full rounded bg-[#818CF8] transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-[12px] tabular-nums text-[#475569]">
              {progress}%
            </p>
          </>
        )}

        {state === "completed" && epd && (
          <>
            <CheckCircle
              size={28}
              strokeWidth={1.5}
              className="mx-auto mb-3 text-[#22C55E]"
            />
            <p className="text-[14px] font-medium text-[#F8FAFC]">
              {epd.file_name}
            </p>
            <p className="mt-1 text-[12px] text-[#475569]">
              {epd.material_category} · {epd.manufacturer}
            </p>
            <p className="mt-2 text-[12px] text-[#94A3B8]">
              Click to upload another
            </p>
          </>
        )}

        {state === "error" && (
          <>
            <AlertTriangle
              size={28}
              strokeWidth={1.5}
              className="mx-auto mb-3 text-[#F87171]"
            />
            <p className="text-[14px] text-[#94A3B8]">{errorMessage}</p>
            <p className="mt-2 text-[12px] text-[#475569]">
              Click to try again
            </p>
          </>
        )}
      </div>
    </div>
  );
}
