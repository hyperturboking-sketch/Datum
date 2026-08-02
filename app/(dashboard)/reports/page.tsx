"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Download } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useReportStats } from "@/lib/queries";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { ReportStatsGrid } from "@/components/report-stats-grid";
import { MonthlyChart } from "@/components/monthly-chart";
import { TopProjectsTable } from "@/components/top-projects-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReportsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: stats, isLoading, isError, refetch } = useReportStats();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  function rfiClosureRate(): number {
    if (!stats || stats.total_rfis === 0) return 0;
    return Math.round((stats.closed_rfis / stats.total_rfis) * 100);
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0D1117]">
        <div className="mx-auto max-w-6xl">
          <Skeleton className="h-7 w-28" />
          <Skeleton className="mt-2 h-4 w-44" />
          <div className="mb-6 mt-6 grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-[#1E293B] bg-[#111827] p-4"
              >
                <Skeleton className="h-3 w-20 bg-[#1E293B]" />
                <Skeleton className="mt-3 h-7 w-24 bg-[#1E293B]" />
              </div>
            ))}
          </div>
          <Skeleton className="mb-6 h-72 w-full rounded-lg bg-[#111827]" />
          <Skeleton className="h-56 w-full rounded-lg bg-[#111827]" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0D1117]">
        <AlertTriangle size={24} className="text-[#F87171]" />
        <p className="font-description mt-2 text-[14px] text-[#94A3B8]">
          Failed to load reports
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-4 h-8 rounded-md border border-[#334155] bg-transparent px-3 text-[13px] text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
        >
          Retry
        </button>
      </div>
    );
  }

  const quickStats = [
    {
      label: "Avg. Bid Value",
      value: formatCurrency(stats?.avg_bid_value ?? 0),
    },
    {
      label: "Total RFIs",
      value: formatNumber(stats?.total_rfis ?? 0),
    },
    {
      label: "RFI Closure Rate",
      value: `${formatNumber(rfiClosureRate())}%`,
    },
    {
      label: "Projects Active",
      value: formatNumber(stats?.total_projects ?? 0),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-[24px] font-medium text-[#F8FAFC]">Reports</h1>
            <p className="font-description mt-1 text-[13px] text-[#94A3B8]">
              Performance and analytics
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert("Exporting CSV...")}
            className="flex h-9 items-center gap-2 rounded-md border border-[#334155] bg-transparent px-3 text-[13px] text-[#94A3B8] transition-colors hover:border-[#475569] hover:text-[#F8FAFC]"
          >
            <Download size={14} strokeWidth={1.5} />
            Export CSV
          </button>
        </div>

        <ReportStatsGrid stats={stats ?? null} isLoading={isLoading} />

        <div className="mb-6 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <MonthlyChart
              data={stats?.monthly_data ?? []}
              isLoading={isLoading}
            />
          </div>

          <div>
            <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-4">
              <p className="mb-4 text-[14px] font-medium text-[#F8FAFC]">
                Quick Stats
              </p>
              <div className="space-y-3">
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-3 w-24 bg-[#1E293B]" />
                        <Skeleton className="h-3 w-16 bg-[#1E293B]" />
                      </div>
                    ))
                  : quickStats.map((stat) => (
                      <div key={stat.label} className="flex justify-between">
                        <span className="text-[13px] text-[#94A3B8]">
                          {stat.label}
                        </span>
                        <span className="text-[13px] font-medium text-[#F8FAFC] tabular-nums">
                          {stat.value}
                        </span>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>

        <TopProjectsTable
          projects={stats?.top_projects ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
