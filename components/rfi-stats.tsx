import { AlertTriangle, CheckCircle, MessageSquare } from "lucide-react";
import type { Rfi } from "@/lib/api";

export function RfiStats({ rfis }: { rfis: Rfi[] }) {
  const total = rfis.length;
  const open = rfis.filter((r) => r.status === "sent").length;
  const now = Date.now();
  const overdue = rfis.filter(
    (r) => r.due_date !== null && new Date(r.due_date).getTime() < now && r.status !== "closed"
  ).length;
  const resolved = rfis.filter((r) => r.status === "closed").length;

  const cards = [
    {
      label: "Total RFIs",
      value: total,
      valueClass: "text-[#F8FAFC]",
      icon: MessageSquare,
      iconClass: "text-[#818CF8]",
    },
    {
      label: "Open",
      value: open,
      valueClass: "text-[#F59E0B]",
      icon: MessageSquare,
      iconClass: "text-[#F59E0B]",
    },
    {
      label: "Overdue",
      value: overdue,
      valueClass: "text-[#F87171]",
      icon: AlertTriangle,
      iconClass: "text-[#F87171]",
    },
    {
      label: "Resolved",
      value: resolved,
      valueClass: "text-[#22C55E]",
      icon: CheckCircle,
      iconClass: "text-[#22C55E]",
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
