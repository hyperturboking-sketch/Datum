"use client";

import { useState } from "react";
import { toast } from "sonner";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LayersIcon from "@mui/icons-material/Layers";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalculateIcon from "@mui/icons-material/Calculate";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import StraightenIcon from "@mui/icons-material/Straighten";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useIfcUpload } from "@/hooks/use-ifc-upload";
import { extractErrorMessage, runBidEstimation } from "@/lib/api";

const fmt = (v: number, digits = 2) =>
  v.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits });

function SummaryCard({
  label,
  value,
  unit,
  icon,
}: {
  label: string;
  value: string;
  unit?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-[rgba(255,255,255,0.12)] bg-[#0A0A0A] text-[#525252]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs text-[#737373]">{label}</p>
        <p className="mt-0.5 text-lg font-medium tabular-nums leading-none tracking-tight text-[#E5E5E5]">
          {value}
          {unit && <span className="ml-1 text-xs font-normal text-[#525252]">{unit}</span>}
        </p>
      </div>
    </div>
  );
}

const PAGE_SIZE = 10;

function PulsingDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "size-1.5 animate-pulse rounded-full bg-[#A3A3A3]",
        className
      )}
    />
  );
}

function ElementsTable({ uploadId }: { uploadId: string }) {
  const { data, isLoading, error } = useIfcUpload(uploadId);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<string>("all");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-8 text-[#737373]">
        <PulsingDot />
        <span className="text-sm">Loading parsed elementsâ€¦</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 py-8 text-[#B57373]">
        <WarningAmberIcon style={{ fontSize: 16 }} />
        <span className="text-sm">{extractErrorMessage(error)}</span>
      </div>
    );
  }

  const elements = data?.extracted_data ?? [];
  const types = Array.from(new Set(elements.map((e) => e.element_type))).sort();
  const filtered = filter === "all" ? elements : elements.filter((e) => e.element_type === filter);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1.5">
          {["all", ...types].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setFilter(t);
                setPage(0);
              }}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                filter === t
                  ? "border-[#525866] bg-[#262626] text-[#E5E5E5]"
                  : "border-[rgba(255,255,255,0.12)] bg-[#0A0A0A] text-[#737373] hover:text-[#E5E5E5]"
              )}
            >
              {t === "all" ? "All" : t}
              <span className="ml-1 tabular-nums text-[#525252]">
                {t === "all" ? elements.length : elements.filter((e) => e.element_type === t).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.12)]">
              <th className="px-3 py-2 text-xs font-medium text-[#525252]">Type</th>
              <th className="px-3 py-2 text-xs font-medium text-[#525252]">Name</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-[#525252]">Length</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-[#525252]">Area</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-[#525252]">Volume</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((el, i) => (
              <tr key={`${el.global_id}-${safePage}-${i}`} className="border-b border-[rgba(255,255,255,0.12)] last:border-b-0">
                <td className="px-3 py-2">
                  <span className="inline-flex rounded-[4px] bg-[#262626] px-1.5 py-0.5 text-xs font-medium text-[#A3A3A3]">
                    {el.element_type}
                  </span>
                </td>
                <td className="max-w-[200px] truncate px-3 py-2 font-medium text-[#E5E5E5]">
                  {el.name ?? el.global_id}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-[#737373]">
                  {el.length_m != null ? fmt(el.length_m) : "â€”"}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-[#737373]">
                  {el.area_m2 != null ? fmt(el.area_m2) : "â€”"}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-[#737373]">
                  {el.volume_m3 != null ? fmt(el.volume_m3) : "â€”"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-[#525252]">
          Showing{" "}
          <span className="tabular-nums text-[#737373]">
            {filtered.length === 0 ? 0 : safePage * PAGE_SIZE + 1}â€”{Math.min((safePage + 1) * PAGE_SIZE, filtered.length)}
          </span>{" "}
          of <span className="tabular-nums text-[#737373]">{filtered.length}</span>
        </p>
        <div className="flex gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={safePage === 0}
            onClick={() => setPage(safePage - 1)}
          >
            Prev
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage(safePage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export function IfcParseResults({
  uploadId,
  projectId,
}: {
  uploadId: string;
  projectId: string | null;
}) {
  const { data, isLoading, isDone } = useIfcUpload(uploadId);
  const [showElements, setShowElements] = useState(true);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-[#737373]">
        <PulsingDot className="size-2" />
        <p className="text-sm">Parsing IFC fileâ€¦</p>
      </div>
    );
  }

  if (!data) return null;

  if (data.parse_status === "failed") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-[#B57373]/30 bg-[#B57373]/10 px-4 py-3 text-[#B57373]">
        <WarningAmberIcon style={{ fontSize: 16 }} />
        <p className="text-sm">This file could not be parsed. No results are available.</p>
      </div>
    );
  }

  if (!isDone || data.parse_status !== "completed" || !data.summary) {
    return (
      <div className="flex flex-col gap-3 py-6">
        <div className="flex items-center gap-2 text-[#737373]">
          <PulsingDot />
          <span className="text-sm">Parsingâ€¦</span>
        </div>
        <Progress value={undefined} className="h-1 bg-[#262626]" />
      </div>
    );
  }

  const s = data.summary;
  const elements = data.extracted_data ?? [];
  const materials = Object.entries(s.materials).sort((a, b) => b[1] - a[1]).slice(0, 4);

  const runBid = () => {
    if (!projectId) {
      toast.error("Bid estimation", {
        description: "A project is required to run bid estimation.",
      });
      return;
    }
    toast.promise(runBidEstimation(projectId, uploadId), {
      loading: "Running bid estimationâ€¦",
      success: "Bid estimation started",
      error: (err) => extractErrorMessage(err),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <SummaryCard
          label="Total elements"
          value={s.total_elements.toLocaleString()}
          icon={<LayersIcon style={{ fontSize: 16 }} />}
        />
        <SummaryCard
          label="Wall volume"
          value={fmt(s.total_wall_volume_m3)}
          unit="mÂ³"
          icon={<ViewInArIcon style={{ fontSize: 16 }} />}
        />
        <SummaryCard
          label="Floor area"
          value={fmt(s.total_floor_area_m2)}
          unit="mÂ²"
          icon={<GridViewIcon style={{ fontSize: 16 }} />}
        />
        <SummaryCard
          label="Columns"
          value={s.total_column_count.toLocaleString()}
          icon={<ViewColumnIcon style={{ fontSize: 16 }} />}
        />
        <SummaryCard
          label="Beam length"
          value={fmt(s.total_beam_length_m)}
          unit="m"
          icon={<StraightenIcon style={{ fontSize: 16 }} />}
        />
        <SummaryCard
          label="Doors / Windows"
          value={`${s.total_door_count} / ${s.total_window_count}`}
          icon={<MeetingRoomIcon style={{ fontSize: 16 }} />}
        />
      </div>

      {materials.length > 0 && (
        <div className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] px-4 py-3">
          <p className="text-xs font-medium text-[#737373]">Top materials by volume</p>
          <div className="mt-2 flex flex-col gap-1.5">
            {materials.map(([name, volume]) => (
              <div key={name} className="flex items-center gap-2">
                <span className="w-28 truncate text-xs text-[#E5E5E5]">{name}</span>
                <div className="h-1 flex-1 overflow-hidden rounded-[2px] bg-[#262626]">
                  <div
                    className="h-full rounded-[2px] bg-[#525866]"
                    style={{ width: `${materials.length ? (volume / (materials[0]?.[1] ?? 1)) * 100 : 0}%` }}
                  />
                </div>
                <span className="w-16 text-right text-xs tabular-nums text-[#737373]">
                  {fmt(volume)} mÂ³
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowElements((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] px-4 py-3 text-left transition-colors hover:bg-[#262626]"
      >
        <div className="flex items-center gap-2">
          <LayersIcon style={{ fontSize: 16 }} className="text-[#525252]" />
          <span className="text-sm font-medium text-[#E5E5E5]">Elements</span>
          <span className="text-xs tabular-nums text-[#525252]">{elements.length}</span>
        </div>
        <KeyboardArrowDownIcon
          className={cn("text-[#737373] transition-transform", showElements && "rotate-180")}
          style={{ fontSize: 20 }}
        />
      </button>

      {showElements && (
        <div className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] p-3">
          <ElementsTable uploadId={uploadId} />
        </div>
      )}

      <Button type="button" onClick={runBid} className="mt-1 h-9 w-full">
        <CalculateIcon style={{ fontSize: 16 }} />
        Run Bid Estimation
      </Button>
    </div>
  );
}
