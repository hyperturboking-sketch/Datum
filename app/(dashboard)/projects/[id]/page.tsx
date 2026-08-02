"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MapPinIcon from "@mui/icons-material/LocationOn";
import FileTextIcon from "@mui/icons-material/Description";
import UploadCloudIcon from "@mui/icons-material/CloudUpload";
import AlertTriangleIcon from "@mui/icons-material/Warning";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import StatusBadge from "@/components/status-badge";
import { formatCurrency, formatDate, formatDateRange } from "@/lib/formatters";
import {
  useProjectDetail,
  useProjectDrawings,
  useProjectBids,
  useProjectViolations,
  useProjectRFIs,
} from "@/hooks/use-project-detail";

// Data interfaces
export interface Project {
  id: string;
  name: string;
  client_name: string;
  status: "active" | "planning" | "completed" | "on_hold";
  contract_value: number;
  currency: string;
  location: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Drawing {
  id: string;
  file_name: string;
  file_size: number;
  parse_status: "pending" | "parsing" | "completed" | "failed";
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

export interface Bid {
  id: string;
  bid_name: string;
  status: "draft" | "pending_review" | "approved" | "submitted" | "won" | "lost";
  grand_total: number;
  currency: string;
  created_at: string;
}

export interface Violation {
  id: string;
  code: string;
  description: string;
  severity: "critical" | "major" | "minor";
  element_name: string;
  status: "open" | "resolved";
  created_at: string;
}

export interface RFI {
  id: string;
  title: string;
  status: "draft" | "sent" | "responded" | "closed";
  assigned_to: string | null;
  created_at: string;
}

type TabType = "drawings" | "bids" | "compliance" | "rfis" | "sustainability";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

// Skeleton components
function InfoCardSkeleton() {
  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-lg p-4">
      <div className="h-3 w-20 bg-[#1E293B] rounded mb-2 animate-pulse" />
      <div className="h-5 w-28 bg-[#1E293B] rounded animate-pulse" />
    </div>
  );
}

function TabBarSkeleton() {
  return (
    <div className="border-b border-[#1E293B] mb-6">
      <div className="flex gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 w-20 bg-[#1E293B] rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function DrawingRowSkeleton() {
  return (
    <div className="h-11 bg-[#1E293B] rounded mb-2 animate-pulse" />
  );
}

function PageSkeleton() {
  return (
    <div className="ml-[220px] mt-14 p-6 bg-[#0D1117] min-h-screen">
      <div className="mb-4">
        <div className="h-3 w-32 bg-[#1E293B] rounded animate-pulse" />
      </div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="h-6 w-48 bg-[#1E293B] rounded mb-2 animate-pulse" />
          <div className="h-3 w-32 bg-[#1E293B] rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <InfoCardSkeleton />
        <InfoCardSkeleton />
        <InfoCardSkeleton />
        <InfoCardSkeleton />
      </div>
      <TabBarSkeleton />
      <div>
        <div className="h-4 w-32 bg-[#1E293B] rounded mb-4 animate-pulse" />
        <DrawingRowSkeleton />
        <DrawingRowSkeleton />
        <DrawingRowSkeleton />
      </div>
    </div>
  );
}

// Tab components
interface DrawingsTabProps {
  projectId: string;
  drawings: Drawing[];
  isLoading: boolean;
}

function DrawingsTab({ projectId, drawings, isLoading }: DrawingsTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const ifcFiles = files.filter((f) => f.name.endsWith(".ifc"));
    if (ifcFiles.length > 0) {
      console.log("Dropped IFC files:", ifcFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      console.log("Selected IFC files:", files);
    }
  };

  return (
    <div>
      <h3 className="text-[15px] font-medium text-[#F8FAFC] mb-4">Building Models</h3>
      
      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-[#334155] rounded-lg bg-[#111827] hover:bg-[#1E293B] hover:border-[#475569] transition-colors py-12 text-center cursor-pointer"
      >
        <UploadCloudIcon style={{ fontSize: 32 }} className="text-[#64748B] mb-3 mx-auto" />
        <p className="text-[14px] text-[#94A3B8]">Drop IFC file here</p>
        <p className="text-[13px] text-[#475569]">or click to browse</p>
        <p className="text-[11px] text-[#475569] mt-2">Supports .ifc up to 200MB</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".ifc"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Files List */}
      <div className="mt-6">
        {isLoading ? (
          <>
            <DrawingRowSkeleton />
            <DrawingRowSkeleton />
            <DrawingRowSkeleton />
          </>
        ) : drawings.length === 0 ? (
          <p className="text-[13px] text-[#64748B]">No models uploaded yet.</p>
        ) : (
          <div>
            {drawings.map((drawing) => (
              <div
                key={drawing.id}
                className="flex justify-between items-center h-12 border-b border-[#1E293B] px-4 hover:bg-[#1E293B]"
              >
                <div className="flex items-center">
                  <FileTextIcon style={{ fontSize: 16 }} className="text-[#64748B] mr-3" />
                  <span className="text-[13px] text-[#F8FAFC]">{drawing.file_name}</span>
                  <span className="text-[11px] text-[#475569] ml-2">{formatBytes(drawing.file_size)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={drawing.parse_status} variant="parse" />
                  {drawing.parse_status === "completed" && drawing.summary && (
                    <span className="text-[11px] text-[#94A3B8]">
                      {drawing.summary.total_elements} elements
                    </span>
                  )}
                  <span className="text-[11px] text-[#475569] tabular-nums">
                    {formatDate(drawing.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface BidsTabProps {
  projectId: string;
  bids: Bid[];
  isLoading: boolean;
}

function BidsTab({ projectId, bids, isLoading }: BidsTabProps) {
  return (
    <div>
      <h3 className="text-[15px] font-medium text-[#F8FAFC] mb-4">Bids</h3>
      {isLoading ? (
        <div className="space-y-2">
          <div className="h-11 bg-[#1E293B] rounded animate-pulse" />
          <div className="h-11 bg-[#1E293B] rounded animate-pulse" />
        </div>
      ) : bids.length === 0 ? (
        <div className="flex items-center gap-4">
          <p className="text-[13px] text-[#64748B]">No bids created yet.</p>
          <button className="h-8 px-3 bg-[#00D4AA] rounded-md text-[13px] font-medium text-[#0D1117] hover:bg-[#00C49B]">
            Create New Bid
          </button>
        </div>
      ) : (
        <div>
          {bids.map((bid) => (
            <div
              key={bid.id}
              className="flex justify-between items-center h-12 border-b border-[#1E293B] px-4 hover:bg-[#1E293B]"
            >
              <div className="flex items-center">
                <span className="text-[13px] text-[#F8FAFC]">{bid.bid_name}</span>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={bid.status} variant="bid" />
                <span className="text-[13px] text-[#F8FAFC] tabular-nums">
                  {formatCurrency(bid.grand_total, bid.currency)}
                </span>
                <span className="text-[11px] text-[#475569] tabular-nums">
                  {formatDate(bid.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface ComplianceTabProps {
  projectId: string;
  violations: Violation[];
  isLoading: boolean;
}

function ComplianceTab({ projectId, violations, isLoading }: ComplianceTabProps) {
  return (
    <div>
      <h3 className="text-[15px] font-medium text-[#F8FAFC] mb-4">Compliance</h3>
      {isLoading ? (
        <div className="space-y-2">
          <div className="h-11 bg-[#1E293B] rounded animate-pulse" />
          <div className="h-11 bg-[#1E293B] rounded animate-pulse" />
        </div>
      ) : violations.length === 0 ? (
        <p className="text-[13px] text-[#64748B]">No violations detected.</p>
      ) : (
        <div>
          {violations.map((violation) => (
            <div
              key={violation.id}
              className="flex justify-between items-center h-12 border-b border-[#1E293B] px-4 hover:bg-[#1E293B]"
            >
              <div className="flex items-center">
                <span className="text-[13px] text-[#F8FAFC]">{violation.code}</span>
                <span className="text-[11px] text-[#475569] ml-2">{violation.element_name}</span>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={violation.severity} variant="violation" />
                <StatusBadge status={violation.status} variant="violation" />
                <span className="text-[11px] text-[#475569] tabular-nums">
                  {formatDate(violation.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface RFIsTabProps {
  projectId: string;
  rfis: RFI[];
  isLoading: boolean;
}

function RFIsTab({ projectId, rfis, isLoading }: RFIsTabProps) {
  return (
    <div>
      <h3 className="text-[15px] font-medium text-[#F8FAFC] mb-4">RFIs</h3>
      {isLoading ? (
        <div className="space-y-2">
          <div className="h-11 bg-[#1E293B] rounded animate-pulse" />
          <div className="h-11 bg-[#1E293B] rounded animate-pulse" />
        </div>
      ) : rfis.length === 0 ? (
        <p className="text-[13px] text-[#64748B]">No RFIs drafted yet.</p>
      ) : (
        <div>
          {rfis.map((rfi) => (
            <div
              key={rfi.id}
              className="flex justify-between items-center h-12 border-b border-[#1E293B] px-4 hover:bg-[#1E293B]"
            >
              <div className="flex items-center">
                <span className="text-[13px] text-[#F8FAFC]">{rfi.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={rfi.status} variant="rfi" />
                {rfi.assigned_to && (
                  <span className="text-[11px] text-[#94A3B8]">{rfi.assigned_to}</span>
                )}
                <span className="text-[11px] text-[#475569] tabular-nums">
                  {formatDate(rfi.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface SustainabilityTabProps {
  projectId: string;
}

function SustainabilityTab({ projectId }: SustainabilityTabProps) {
  return (
    <div>
      <h3 className="text-[15px] font-medium text-[#F8FAFC] mb-4">Sustainability</h3>
      <p className="text-[13px] text-[#64748B]">ESG and LCA reports will appear here.</p>
    </div>
  );
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const projectId = params?.id ?? "";

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("drawings");

  const { project, isLoading: projectLoading, error: projectError, refetch } = useProjectDetail(projectId);
  const { drawings, isLoading: drawingsLoading } = useProjectDrawings(projectId);
  const { bids, isLoading: bidsLoading } = useProjectBids(projectId);
  const { violations, isLoading: violationsLoading } = useProjectViolations(projectId);
  const { rfis, isLoading: rfisLoading } = useProjectRFIs(projectId);

  // Calculate counts for tab badges
  const drawingsCount = drawings.length;
  const bidsCount = bids.length;
  const violationsCount = violations.length;
  const rfisCount = rfis.length;

  if (projectLoading) {
    return (
      <>
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <Header collapsed={sidebarCollapsed} />
        <PageSkeleton />
      </>
    );
  }

  if (projectError || !project) {
    return (
      <>
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <Header collapsed={sidebarCollapsed} />
        <div className="ml-[220px] mt-14 p-6 bg-[#0D1117] min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertTriangleIcon style={{ fontSize: 24 }} className="text-[#EF4444] mx-auto mb-3" />
            <p className="text-[14px] text-[#94A3B8] mb-4">Failed to load project</p>
            <button
              onClick={refetch}
              className="h-8 px-3 bg-transparent border border-[#334155] rounded-md text-[13px] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#475569]"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header collapsed={sidebarCollapsed} />
      
      <main className="ml-[220px] mt-14 p-6 bg-[#0D1117] min-h-screen">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/projects"
            className="text-[13px] text-[#64748B] hover:text-[#94A3B8]"
          >
            Projects
          </Link>
          <ChevronRightIcon style={{ fontSize: 14 }} className="text-[#475569]" />
          <span className="text-[13px] text-[#94A3B8]">{project.name}</span>
        </div>

        {/* Page Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-[24px] font-medium text-[#F8FAFC]">{project.name}</h1>
            <p className="text-[13px] text-[#94A3B8] mt-1">{project.client_name}</p>
            {project.location && (
              <div className="flex items-center mt-1">
                <MapPinIcon style={{ fontSize: 12 }} className="text-[#64748B] mr-1" />
                <span className="text-[12px] text-[#64748B]">{project.location}</span>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <StatusBadge status={project.status} />
            <button className="h-8 px-3 ml-2 bg-transparent border border-[#334155] rounded-md text-[13px] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#475569]">
              Edit
            </button>
            <button className="h-8 px-3 ml-2 bg-transparent border border-[#334155] rounded-md text-[13px] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#475569]">
              Archive
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-[#111827] border border-[#1E293B] rounded-lg p-4">
            <p className="text-[12px] text-[#94A3B8]">Contract Value</p>
            <p className="text-[20px] font-medium tabular-nums text-[#F8FAFC]">
              {formatCurrency(project.contract_value, project.currency)}
            </p>
          </div>
          <div className="bg-[#111827] border border-[#1E293B] rounded-lg p-4">
            <p className="text-[12px] text-[#94A3B8]">Timeline</p>
            <p className="text-[13px] text-[#F8FAFC]">
              {formatDateRange(project.start_date, project.end_date)}
            </p>
          </div>
          <div className="bg-[#111827] border border-[#1E293B] rounded-lg p-4">
            <p className="text-[12px] text-[#94A3B8]">Last Updated</p>
            <p className="text-[13px] text-[#94A3B8]">{formatDate(project.updated_at)}</p>
          </div>
          <div className="bg-[#111827] border border-[#1E293B] rounded-lg p-4">
            <p className="text-[12px] text-[#94A3B8]">Bids</p>
            <p className="text-[20px] font-medium text-[#F8FAFC]">{bidsCount}</p>
            <p className="text-[12px] text-[#64748B]">{bidsCount} submitted</p>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="border-b border-[#1E293B] mb-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("drawings")}
              className={`pb-3 text-[13px] relative ${
                activeTab === "drawings"
                  ? "text-[#00D4AA] border-b-2 border-[#00D4AA] font-medium"
                  : "text-[#64748B] hover:text-[#94A3B8]"
              }`}
            >
              Drawings
              {drawingsCount > 0 && (
                <span className="text-[10px] bg-[#1E293B] text-[#94A3B8] px-1.5 py-0.5 rounded ml-1.5">
                  {drawingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("bids")}
              className={`pb-3 text-[13px] relative ${
                activeTab === "bids"
                  ? "text-[#00D4AA] border-b-2 border-[#00D4AA] font-medium"
                  : "text-[#64748B] hover:text-[#94A3B8]"
              }`}
            >
              Bids
              {bidsCount > 0 && (
                <span className="text-[10px] bg-[#1E293B] text-[#94A3B8] px-1.5 py-0.5 rounded ml-1.5">
                  {bidsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("compliance")}
              className={`pb-3 text-[13px] relative ${
                activeTab === "compliance"
                  ? "text-[#00D4AA] border-b-2 border-[#00D4AA] font-medium"
                  : "text-[#64748B] hover:text-[#94A3B8]"
              }`}
            >
              Compliance
              {violationsCount > 0 && (
                <span className="text-[10px] bg-[#1E293B] text-[#94A3B8] px-1.5 py-0.5 rounded ml-1.5">
                  {violationsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("rfis")}
              className={`pb-3 text-[13px] relative ${
                activeTab === "rfis"
                  ? "text-[#00D4AA] border-b-2 border-[#00D4AA] font-medium"
                  : "text-[#64748B] hover:text-[#94A3B8]"
              }`}
            >
              RFIs
              {rfisCount > 0 && (
                <span className="text-[10px] bg-[#1E293B] text-[#94A3B8] px-1.5 py-0.5 rounded ml-1.5">
                  {rfisCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("sustainability")}
              className={`pb-3 text-[13px] ${
                activeTab === "sustainability"
                  ? "text-[#00D4AA] border-b-2 border-[#00D4AA] font-medium"
                  : "text-[#64748B] hover:text-[#94A3B8]"
              }`}
            >
              Sustainability
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "drawings" && (
            <DrawingsTab projectId={projectId} drawings={drawings} isLoading={drawingsLoading} />
          )}
          {activeTab === "bids" && (
            <BidsTab projectId={projectId} bids={bids} isLoading={bidsLoading} />
          )}
          {activeTab === "compliance" && (
            <ComplianceTab projectId={projectId} violations={violations} isLoading={violationsLoading} />
          )}
          {activeTab === "rfis" && (
            <RFIsTab projectId={projectId} rfis={rfis} isLoading={rfisLoading} />
          )}
          {activeTab === "sustainability" && (
            <SustainabilityTab projectId={projectId} />
          )}
        </div>
      </main>
    </>
  );
}
