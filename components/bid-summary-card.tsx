import { formatCurrency } from "@/lib/formatters";
import type { BidSummary } from "@/lib/api";

export function BidSummaryCard({
  summary,
  currency,
}: {
  summary: BidSummary;
  currency: string;
}) {
  return (
    <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-4">
      <h3 className="mb-4 text-[14px] font-medium text-[#F8FAFC]">Summary</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#94A3B8]">Subtotal</span>
          <span className="text-[13px] tabular-nums text-[#F8FAFC]">
            {formatCurrency(summary.subtotal, currency)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#94A3B8]">
            Overhead (
            <span className="text-[#64748B]">{summary.overhead_pct}%</span>)
          </span>
          <span className="text-[13px] tabular-nums text-[#F8FAFC]">
            {formatCurrency(summary.overhead, currency)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#94A3B8]">
            Profit (
            <span className="text-[#64748B]">{summary.profit_pct}%</span>)
          </span>
          <span className="text-[13px] tabular-nums text-[#F8FAFC]">
            {formatCurrency(summary.profit, currency)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#94A3B8]">
            Contingency (
            <span className="text-[#64748B]">{summary.contingency_pct}%</span>)
          </span>
          <span className="text-[13px] tabular-nums text-[#F8FAFC]">
            {formatCurrency(summary.contingency, currency)}
          </span>
        </div>
        <div className="border-t border-[#1E293B] pt-3" />
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-medium text-[#F8FAFC]">
            Grand Total
          </span>
          <span className="text-[16px] font-medium tabular-nums text-[#818CF8]">
            {formatCurrency(summary.grand_total, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
