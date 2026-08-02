import { AlertTriangle, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";
import type { Violation } from "@/lib/api";

export function ComplianceStats({ violations }: { violations: Violation[] }) {
  const total = violations.length;
  const critical = violations.filter(
    (v) => v.severity === "critical"
  ).length;
  const major = violations.filter((v) => v.severity === "major").length;
  const open =
    violations.filter(
      (v) => v.status === "open" || v.status === "under_review"
    ).length;

  const cards = [
    {
      label: "Total Violations",
      value: total,
      valueClass: "text-[#F8FAFC]",
      icon: ShieldAlert,
      iconClass: "text-[#818CF8]",
    },
    {
      label: "Critical",
      value: critical,
      valueClass: "text-[#F87171]",
      icon: ShieldX,
      iconClass: "text-[#F87171]",
    },
    {
      label: "Major",
      value: major,
      valueClass: "text-[#F59E0B]",
      icon: AlertTriangle,
      iconClass: "text-[#F59E0B]",
    },
    {
      label: "Open",
      value: open,
      valueClass: "text-[#F8FAFC]",
      icon: ShieldCheck,
      iconClass: "text-[#818CF8]",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-[#1E293B] bg-[#111827] p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-[#94A3B8]">{card.label}</p>
            <card.icon
              size={16}
              strokeWidth={1.5}
              className={card.iconClass}
            />
          </div>
          <p
            className={`mt-1 text-[28px] font-medium tabular-nums ${card.valueClass}`}
          >
            {card.value}
          </p>
          <p className="font-description mt-1 text-[12px] text-[#475569]">
            Across all projects
          </p>
        </div>
      ))}
    </div>
  );
}
