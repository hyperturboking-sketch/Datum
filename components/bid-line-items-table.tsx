import { useMemo } from "react";
import { formatCurrency } from "@/lib/formatters";
import type { BidLineItem } from "@/lib/api";

const COLUMN_HEADERS = [
  { label: "Description", className: "flex-1 text-left" },
  { label: "Qty", className: "w-16 text-right" },
  { label: "Unit", className: "w-16 text-left" },
  { label: "Mat", className: "w-20 text-right" },
  { label: "Labor", className: "w-20 text-right" },
  { label: "Equip", className: "w-20 text-right" },
  { label: "Total", className: "w-24 text-right" },
];

export function BidLineItemsTable({
  lineItems,
  currency,
}: {
  lineItems: BidLineItem[];
  currency: string;
}) {
  const groups = useMemo(() => {
    const map = new Map<string, BidLineItem[]>();
    for (const item of lineItems) {
      const list = map.get(item.category);
      if (list) {
        list.push(item);
      } else {
        map.set(item.category, [item]);
      }
    }
    return Array.from(map.entries());
  }, [lineItems]);

  return (
    <div>
      <h2 className="mb-4 text-[15px] font-medium text-[#F8FAFC]">
        Cost Breakdown
      </h2>
      <div className="overflow-hidden rounded-lg border border-[#1E293B] bg-[#111827]">
        {groups.length === 0 ? (
          <p className="font-description p-4 text-[13px] text-[#64748B]">
            No line items generated.
          </p>
        ) : (
          <>
            <div className="flex h-9 items-center border-b border-[#334155] px-4 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
              {COLUMN_HEADERS.map((col) => (
                <span key={col.label} className={col.className}>
                  {col.label}
                </span>
              ))}
            </div>
            {groups.map(([category, items]) => {
              const groupTotal = items.reduce(
                (sum, item) => sum + item.total_cost,
                0
              );
              return (
                <div key={category}>
                  <div className="flex h-8 items-center justify-between border-b border-[#1E293B] bg-[#0B0F19] px-4">
                    <span className="text-[11px] font-medium tracking-wider text-[#94A3B8] uppercase">
                      {category}
                    </span>
                    <span className="text-[11px] tabular-nums text-[#94A3B8]">
                      {formatCurrency(groupTotal, currency)}
                    </span>
                  </div>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex h-10 items-center border-b border-[#1E293B] px-4 transition-colors last:border-0 hover:bg-[#1E293B]"
                    >
                      <span className="flex-1 truncate text-[13px] text-[#F8FAFC]">
                        {item.description}
                      </span>
                      <span className="w-16 text-right text-[13px] tabular-nums text-[#94A3B8]">
                        {item.quantity}
                      </span>
                      <span className="w-16 text-[12px] text-[#64748B]">
                        {item.unit}
                      </span>
                      <span className="w-20 text-right text-[13px] tabular-nums text-[#94A3B8]">
                        {formatCurrency(item.material_unit_cost, currency)}
                      </span>
                      <span className="w-20 text-right text-[13px] tabular-nums text-[#94A3B8]">
                        {formatCurrency(item.labor_unit_cost, currency)}
                      </span>
                      <span className="w-20 text-right text-[13px] tabular-nums text-[#94A3B8]">
                        {formatCurrency(item.equipment_unit_cost, currency)}
                      </span>
                      <span className="w-24 text-right text-[13px] font-medium tabular-nums text-[#F8FAFC]">
                        {formatCurrency(item.total_cost, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
