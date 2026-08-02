"use client";

import { Clock, DollarSign, ShieldCheck, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import type { ReportStats } from "@/lib/api";

function StatCard({
  label,
  value,
  subtext,
  icon,
  iconClass,
}: {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-[#94A3B8]">{label}</p>
        <span className={iconClass}>{icon}</span>
      </div>
      <p className="mt-2 text-[28px] font-medium text-[#F8FAFC] tabular-nums">
        {value}
      </p>
      <p className="font-description mt-1 text-[12px] text-[#475569] tabular-nums">
        {subtext}
      </p>
    </div>
  );
}

function resolutionRate(stats: ReportStats): number {
  const total = stats.resolved_violations + stats.open_violations;
  if (total === 0) return 0;
  return Math.round((stats.resolved_violations / total) * 100);
}

export function ReportStatsGrid({
  stats,
  isLoading,
}: {
  stats: ReportStats | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="mb-6 grid grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-[#1E293B] bg-[#111827] p-4"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-20 bg-[#1E293B]" />
              <Skeleton className="h-4 w-4 rounded bg-[#1E293B]" />
            </div>
            <Skeleton className="mt-3 h-7 w-24 bg-[#1E293B]" />
            <Skeleton className="mt-2 h-3 w-28 bg-[#1E293B]" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="mb-6 grid grid-cols-4 gap-4">
      <StatCard
        label="Win Rate"
        value={`${formatNumber(stats.win_rate)}%`}
        subtext={`${formatNumber(stats.bids_won)} won / ${formatNumber(stats.bids_lost)} lost`}
        icon={<TrendingUp size={16} strokeWidth={1.5} />}
        iconClass={stats.win_rate >= 50 ? "text-[#22C55E]" : "text-[#F87171]"}
      />
      <StatCard
        label="Total Bid Value"
        value={formatCurrency(stats.total_bid_value)}
        subtext={`${formatNumber(stats.total_bids)} bids submitted`}
        icon={<DollarSign size={16} strokeWidth={1.5} />}
        iconClass="text-[#818CF8]"
      />
      <StatCard
        label="Time Saved"
        value={`${formatNumber(stats.total_time_saved_hours)} hrs`}
        subtext="vs. manual takeoff & checking"
        icon={<Clock size={16} strokeWidth={1.5} />}
        iconClass="text-[#818CF8]"
      />
      <StatCard
        label="Violation Resolution"
        value={`${formatNumber(resolutionRate(stats))}%`}
        subtext={`${formatNumber(stats.resolved_violations)} of ${formatNumber(stats.resolved_violations + stats.open_violations)} resolved`}
        icon={<ShieldCheck size={16} strokeWidth={1.5} />}
        iconClass="text-[#22C55E]"
      />
    </div>
  );
}
