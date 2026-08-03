"use client";

import { BarChart3, FileText, Leaf, ShieldCheck } from "lucide-react";
import type { SustainabilityReport } from "@/lib/api";
import { formatNumber } from "@/lib/formatters";

function formatTons(kg: number): string {
  return `${formatNumber(Math.round(kg / 1000))} t`;
}

export function SustainabilityStats({
  reports,
}: {
  reports: SustainabilityReport[];
}) {
  const totalCarbonKg = reports.reduce(
    (sum, report) => sum + (report.total_embodied_carbon_kg ?? 0),
    0
  );
  const avgGwp =
    reports.length > 0
      ? Math.round(
          reports.reduce((sum, report) => sum + (report.total_gwp ?? 0), 0) /
            reports.length
        )
      : 0;
  const maxLeed =
    reports.length > 0
      ? Math.max(...reports.map((report) => report.leed_points_estimate ?? 0))
      : 0;

  const stats = [
    {
      label: "Total Carbon",
      value: formatTons(totalCarbonKg),
      sub: "Embodied CO₂e",
      icon: Leaf,
      iconColor: "text-[#22C55E]",
    },
    {
      label: "Avg GWP",
      value: formatNumber(avgGwp),
      sub: "Global Warming Potential",
      icon: BarChart3,
      iconColor: "text-[#818CF8]",
    },
    {
      label: "LEED Points",
      value: formatNumber(maxLeed),
      sub: "Estimated MR credits",
      icon: ShieldCheck,
      iconColor: "text-[#22C55E]",
    },
    {
      label: "Reports",
      value: formatNumber(reports.length),
      sub: "ESG analyses run",
      icon: FileText,
      iconColor: "text-[#818CF8]",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-[#1E293B] bg-[#111827] p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-[#94A3B8]">{stat.label}</p>
            <stat.icon size={16} strokeWidth={1.5} className={stat.iconColor} />
          </div>
          <p className="mt-2 text-[28px] font-medium tabular-nums text-[#F8FAFC]">
            {stat.value}
          </p>
          <p className="mt-1 text-[12px] text-[#475569]">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
}
