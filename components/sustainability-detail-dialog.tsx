"use client";

import { Download, Lightbulb, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/status-badge";
import type { SustainabilityReport } from "@/lib/api";
import { formatNumber } from "@/lib/formatters";

function formatTons(kg: number): string {
  return `${formatNumber(Math.round(kg / 1000))} t`;
}

function formatTonsDecimal(kg: number): string {
  return `${(kg / 1000).toFixed(1)} t`;
}

export function SustainabilityDetailDialog({
  report,
  open,
  onOpenChange,
}: {
  report: SustainabilityReport | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex h-auto w-[640px] max-w-[95vw] flex-col overflow-hidden rounded-lg border-[#334155] bg-[#111827] p-0 sm:max-w-[95vw]"
      >
        {report && (
          <>
            <div className="flex items-start justify-between border-b border-[#1E293B] p-4">
              <div className="min-w-0">
                <h2 className="truncate text-[16px] font-medium text-[#F8FAFC]">
                  {report.report_name}
                </h2>
                <p className="mt-0.5 truncate text-[13px] text-[#94A3B8]">
                  {report.project_name}
                </p>
              </div>
              <div className="ml-4 flex shrink-0 items-center gap-4">
                <StatusBadge status={report.status} variant="sustainability" />
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => onOpenChange(false)}
                  className="text-[#64748B] transition-colors hover:text-[#F8FAFC]"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-[#1E293B] bg-[#0D1117] p-3 text-center">
                  <p className="text-[11px] text-[#94A3B8]">Total Carbon</p>
                  <p className="mt-1 text-[20px] font-medium tabular-nums text-[#F8FAFC]">
                    {formatTons(report.total_embodied_carbon_kg ?? 0)}
                  </p>
                </div>
                <div className="rounded-lg border border-[#1E293B] bg-[#0D1117] p-3 text-center">
                  <p className="text-[11px] text-[#94A3B8]">GWP</p>
                  <p className="mt-1 text-[20px] font-medium tabular-nums text-[#F8FAFC]">
                    {formatNumber(report.total_gwp ?? 0)}
                  </p>
                </div>
                <div className="rounded-lg border border-[#1E293B] bg-[#0D1117] p-3 text-center">
                  <p className="text-[11px] text-[#94A3B8]">LEED Estimate</p>
                  <p className="mt-1 text-[20px] font-medium tabular-nums text-[#22C55E]">
                    {formatNumber(report.leed_points_estimate ?? 0)}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-[14px] font-medium text-[#F8FAFC]">
                  Material Breakdown
                </p>
                <div className="overflow-hidden rounded-lg border border-[#1E293B]">
                  <div className="flex h-8 items-center border-b border-[#334155] text-[12px] tracking-wider text-[#94A3B8] uppercase">
                    <span className="flex-1 pl-3">Material</span>
                    <span className="w-20 pr-3 text-right">Quantity</span>
                    <span className="w-16">Unit</span>
                    <span className="w-24 pr-3 text-right">Factor</span>
                    <span className="w-24 pr-3 text-right">Total CO₂e</span>
                  </div>
                  <div className="max-h-[240px] overflow-y-auto">
                    {(report.material_breakdown ?? []).length === 0 ? (
                      <p className="py-6 text-center text-[13px] text-[#475569]">
                        No material data available
                      </p>
                    ) : (
                      report.material_breakdown.map((item, index) => (
                        <div
                          key={`${item.material}-${index}`}
                          className="flex h-9 items-center border-b border-[#1E293B] text-[13px] last:border-0"
                        >
                          <span className="flex-1 truncate pl-3 text-[#F8FAFC]">
                            {item.material}
                          </span>
                          <span className="w-20 pr-3 text-right tabular-nums text-[#94A3B8]">
                            {formatNumber(item.quantity ?? 0)}
                          </span>
                          <span className="w-16 text-[#64748B]">{item.unit}</span>
                          <span className="w-24 pr-3 text-right tabular-nums text-[#94A3B8]">
                            {formatNumber(item.carbon_factor ?? 0)}
                          </span>
                          <span className="w-24 pr-3 text-right font-medium tabular-nums text-[#F8FAFC]">
                            {formatTonsDecimal(item.total_carbon_kg ?? 0)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 text-[14px] font-medium text-[#F8FAFC]">
                  Recommendations
                </p>
                {(report.recommendations ?? []).length === 0 ? (
                  <p className="text-[13px] text-[#475569]">
                    No recommendations yet
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {report.recommendations.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 rounded-md border border-[#1E293B] bg-[#0D1117] p-3 text-[13px] text-[#94A3B8]"
                      >
                        <Lightbulb
                          size={14}
                          strokeWidth={1.5}
                          className="mt-0.5 shrink-0 text-[#F59E0B]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#1E293B] p-4">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="h-9 rounded-md border border-[#334155] bg-transparent px-4 text-[13px] text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-[#F8FAFC]"
              >
                Close
              </button>
              {report.status === "completed" && (
                <button
                  type="button"
                  onClick={() => alert("Downloading PDF...")}
                  className="flex h-9 items-center gap-2 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110"
                >
                  <Download size={14} strokeWidth={1.5} />
                  Download PDF
                </button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
