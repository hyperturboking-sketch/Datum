"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { ReportStats } from "@/lib/api";

const MONTH_LABEL = new Intl.DateTimeFormat("en-US", { month: "short" });

function monthAbbreviation(month: string): string {
  const date = new Date(`${month}-01T00:00:00`);
  if (Number.isNaN(date.getTime())) return month;
  return MONTH_LABEL.format(date);
}

export function MonthlyChart({
  data,
  isLoading,
}: {
  data: ReportStats["monthly_data"];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="mb-6 rounded-lg border border-[#1E293B] bg-[#111827] p-6">
        <Skeleton className="h-4 w-32 bg-[#1E293B]" />
        <div className="mt-4 flex h-48 items-end gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="flex-1 bg-[#1E293B]" />
          ))}
        </div>
        <div className="mt-2 flex gap-4">
          <Skeleton className="h-3 w-20 bg-[#1E293B]" />
          <Skeleton className="h-3 w-16 bg-[#1E293B]" />
        </div>
      </div>
    );
  }

  const maxValue = data.reduce(
    (max, month) =>
      Math.max(max, month.bids_created, month.bids_won),
    0
  );

  return (
    <div className="mb-6 rounded-lg border border-[#1E293B] bg-[#111827] p-6">
      <p className="mb-4 text-[15px] font-medium text-[#F8FAFC]">
        Monthly Activity
      </p>

      {data.length === 0 ? (
        <div className="flex h-48 items-center justify-center">
          <p className="font-description text-[13px] text-[#64748B]">
            No monthly data available.
          </p>
        </div>
      ) : (
        <div className="flex h-48 items-end gap-2">
          {data.map((month) => (
            <div
              key={month.month}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <div className="flex h-40 w-full items-end gap-1">
                <div
                  className="w-1/2 rounded-t-sm bg-[#818CF8]"
                  style={{
                    height: maxValue > 0
                      ? `${(month.bids_created / maxValue) * 100}%`
                      : "0%",
                  }}
                />
                <div
                  className="w-1/2 rounded-t-sm bg-[#22C55E]"
                  style={{
                    height: maxValue > 0
                      ? `${(month.bids_won / maxValue) * 100}%`
                      : "0%",
                  }}
                />
              </div>
              <span className="text-[10px] text-[#475569] tabular-nums">
                {monthAbbreviation(month.month)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 flex gap-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-[#818CF8]" />
          <span className="text-[11px] text-[#94A3B8]">Bids Created</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-[#22C55E]" />
          <span className="text-[11px] text-[#94A3B8]">Bids Won</span>
        </div>
      </div>
    </div>
  );
}
