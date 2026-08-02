"use client";

import { useState, useRef, useCallback } from "react";
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Loader2, X } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

interface Drawing {
  id: string;
  file_name: string;
  file_size: number;
  parse_status: "pending" | "parsing" | "completed" | "failed";
  error_message: string | null;
  summary: {
    total_elements: number;
    total_wall_volume_m3: number;
    total_floor_area_m2: number;
    total_column_count: number;
    total_door_count: number;
    total_window_count: number;
  } | null;
  created_at: string;
}

interface IfcUploadZoneProps {
  onUploadComplete?: (drawing: Drawing) => void;
}

type UploadState = "idle" | "uploading" | "parsing" | "completed" | "error";

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

export default function IfcUploadZone({ onUploadComplete }: IfcUploadZoneProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedModels, setUploadedModels] = useState<Drawing[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback((file: File) => {
    if (!file.name.toLowerCase().endsWith(".ifc")) {
      setState("error");
      setErrorMessage("Only .ifc files are supported");
      return;
    }

    const maxSize = 200 * 1024 * 1024; // 200MB
    if (file.size > maxSize) {
      setState("error");
      setErrorMessage("File size exceeds 200MB limit");
      return;
    }

    setUploadingFile(file);
    setState("uploading");
    setProgress(0);
    setErrorMessage(null);

    // Simulate upload progress
    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        // Transition to parsing
        setState("parsing");

        // Simulate parsing for 3 seconds
        setTimeout(() => {
          // Check if this is a "fail" file
          if (file.name.toLowerCase().includes("fail")) {
            setState("error");
            setErrorMessage("IFC schema version not supported");
            return;
          }

          // Create mock drawing object with realistic summary
          const mockDrawing: Drawing = {
            id: `drawing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file_name: file.name,
            file_size: file.size,
            parse_status: "completed",
            error_message: null,
            summary: {
              total_elements: Math.floor(Math.random() * 5000) + 1000,
              total_wall_volume_m3: parseFloat((Math.random() * 500 + 100).toFixed(2)),
              total_floor_area_m2: parseFloat((Math.random() * 2000 + 500).toFixed(2)),
              total_column_count: Math.floor(Math.random() * 200) + 20,
              total_door_count: Math.floor(Math.random() * 100) + 10,
              total_window_count: Math.floor(Math.random() * 150) + 15,
            },
            created_at: new Date().toISOString(),
          };

          setState("completed");
          setUploadedModels((prev) => [...prev, mockDrawing]);
          onUploadComplete?.(mockDrawing);
        }, 3000);
      }
    }, 50);
  }, [onUploadComplete]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
    // Reset input value to allow re-uploading same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [handleUpload]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }, [handleUpload]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRetry = useCallback(() => {
    if (uploadingFile) {
      handleUpload(uploadingFile);
    }
  }, [uploadingFile, handleUpload]);

  const handleReset = useCallback(() => {
    setState("idle");
    setProgress(0);
    setUploadingFile(null);
    setErrorMessage(null);
  }, []);

  const handleRemoveModel = useCallback((modelId: string) => {
    setUploadedModels((prev) => prev.filter((m) => m.id !== modelId));
  }, []);

  return (
    <div>
      <h2 className="text-[15px] font-medium text-[#F8FAFC] mb-4">Building Models</h2>

      {/* Upload Zone */}
      <div
        onClick={state === "idle" || state === "completed" ? handleClick : undefined}
        onDrop={state === "idle" ? handleDrop : undefined}
        onDragOver={state === "idle" ? handleDragOver : undefined}
        onDragLeave={state === "idle" ? handleDragLeave : undefined}
        className={`
          border-2 rounded-lg bg-[#111827] py-12 text-center transition-colors
          ${state === "idle" 
            ? `border-dashed border-[#334155] cursor-pointer hover:bg-[#1E293B] hover:border-[#475569]`
            : "border-solid"
          }
          ${dragOver ? "border-[#00D4AA] bg-[rgba(0,212,170,0.05)]" : ""}
          ${state === "uploading" ? "border-[#00D4AA]" : ""}
          ${state === "completed" ? "border-[#10B981]" : ""}
          ${state === "error" ? "border-[#EF4444]" : ""}
        `}
      >
        {state === "idle" && (
          <>
            <UploadCloud className="w-8 h-8 text-[#64748B] mx-auto mb-3" />
            <p className="text-[14px] text-[#94A3B8]">Drop IFC file here</p>
            <p className="text-[13px] text-[#475569]">or click to browse</p>
            <p className="text-[11px] text-[#475569] mt-2">Supports .ifc up to 200MB</p>
          </>
        )}

        {state === "uploading" && (
          <>
            <Loader2 className="w-5 h-5 text-[#00D4AA] animate-spin mx-auto mb-3" />
            <p className="text-[14px] text-[#F8FAFC]">Uploading...</p>
            {uploadingFile && (
              <p className="text-[13px] text-[#94A3B8] mt-1">{uploadingFile.name}</p>
            )}
            <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden mt-4 max-w-md mx-auto">
              <div
                className="h-full bg-[#00D4AA] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[12px] text-[#94A3B8] tabular-nums mt-2">{Math.round(progress)}%</p>
          </>
        )}

        {state === "parsing" && (
          <>
            <Loader2 className="w-5 h-5 text-[#00D4AA] animate-spin mx-auto mb-3" />
            <p className="text-[14px] text-[#F8FAFC]">Parsing building model...</p>
            <p className="text-[12px] text-[#64748B] mt-1">Extracting walls, floors, columns, and quantities</p>
          </>
        )}

        {state === "completed" && uploadedModels.length > 0 && (
          (() => {
            const latestModel = uploadedModels[uploadedModels.length - 1];
            return (
              <>
                <CheckCircle className="w-6 h-6 text-[#10B981] mx-auto mb-3" />
                <p className="text-[16px] font-medium text-[#F8FAFC]">Parse complete</p>
                {latestModel.summary && (
                  <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
                    <div className="text-center">
                      <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider">Total Elements</p>
                      <p className="text-[20px] font-medium tabular-nums text-[#F8FAFC] mt-1">
                        {latestModel.summary.total_elements}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider">Wall Volume</p>
                      <p className="text-[20px] font-medium tabular-nums text-[#F8FAFC] mt-1">
                        {latestModel.summary.total_wall_volume_m3} m³
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider">Floor Area</p>
                      <p className="text-[20px] font-medium tabular-nums text-[#F8FAFC] mt-1">
                        {latestModel.summary.total_floor_area_m2} m²
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider">Columns</p>
                      <p className="text-[20px] font-medium tabular-nums text-[#F8FAFC] mt-1">
                        {latestModel.summary.total_column_count}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider">Doors</p>
                      <p className="text-[20px] font-medium tabular-nums text-[#F8FAFC] mt-1">
                        {latestModel.summary.total_door_count}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] text-[#94A3B8] uppercase tracking-wider">Windows</p>
                      <p className="text-[20px] font-medium tabular-nums text-[#F8FAFC] mt-1">
                        {latestModel.summary.total_window_count}
                      </p>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleReset}
                  className="mt-6 text-[13px] text-[#00D4AA] hover:underline cursor-pointer"
                >
                  Upload another file
                </button>
              </>
            );
          })()
        )}

        {state === "error" && (
          <>
            <AlertTriangle className="w-6 h-6 text-[#EF4444] mx-auto mb-3" />
            <p className="text-[16px] font-medium text-[#F8FAFC]">Upload failed</p>
            {errorMessage && (
              <p className="text-[13px] text-[#EF4444] mt-1">{errorMessage}</p>
            )}
            <button
              onClick={handleRetry}
              className="mt-4 h-8 px-4 bg-transparent border border-[#334155] rounded-md text-[13px] text-[#94A3B8] hover:text-[#F8FAFC]"
            >
              Retry
            </button>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".ifc"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Files List */}
      <div className="mt-8">
        <h3 className="text-[15px] font-medium text-[#F8FAFC] mb-3">Uploaded Models</h3>
        
        {uploadedModels.length === 0 ? (
          <p className="text-[13px] text-[#64748B]">No models uploaded yet.</p>
        ) : (
          <div className="space-y-2">
            {uploadedModels.map((model) => (
              <div
                key={model.id}
                className="flex justify-between items-center h-12 bg-[#111827] border border-[#1E293B] rounded-lg px-4 hover:bg-[#1E293B] hover:border-[#334155] transition-colors"
              >
                <div className="flex items-center flex-1 min-w-0">
                  <FileText className="w-4 h-4 text-[#64748B] mr-3 flex-shrink-0" />
                  <span className="text-[13px] text-[#F8FAFC] truncate">{model.file_name}</span>
                  <span className="text-[11px] text-[#475569] ml-2 flex-shrink-0">
                    {formatFileSize(model.file_size)}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <StatusBadge status={model.parse_status} variant="parse" />
                  <span className="text-[11px] text-[#475569] tabular-nums ml-4">
                    {formatRelativeTime(model.created_at)}
                  </span>
                  {model.parse_status === "completed" && (
                    <button className="text-[12px] text-[#00D4AA] hover:underline ml-4">
                      View
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveModel(model.id)}
                    className="ml-2 text-[#475569] hover:text-[#94A3B8]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
