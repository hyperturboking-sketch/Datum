"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Filter, Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SEVERITY_OPTIONS = [
  { value: "critical", label: "Critical", dot: "#F87171" },
  { value: "major", label: "Major", dot: "#F59E0B" },
  { value: "minor", label: "Minor", dot: "#64748B" },
];

const STATUS_OPTIONS = [
  { value: "open", label: "Open", dot: "#F87171" },
  { value: "under_review", label: "Under Review", dot: "#F59E0B" },
  { value: "resolved", label: "Resolved", dot: "#22C55E" },
  { value: "waived", label: "Waived", dot: "#64748B" },
];

const SORT_OPTIONS = [
  { value: "date", label: "Date (newest)" },
  { value: "severity", label: "Severity (critical first)" },
  { value: "status", label: "Status" },
  { value: "project", label: "Project" },
];

export function ComplianceFilters({
  search,
  onSearchChange,
  severityFilter,
  onSeverityChange,
  statusFilter,
  onStatusChange,
  standardFilter,
  onStandardChange,
  standards,
  sortBy,
  onSortChange,
  count,
  total,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  severityFilter: string[];
  onSeverityChange: (v: string[]) => void;
  statusFilter: string[];
  onStatusChange: (v: string[]) => void;
  standardFilter: string[];
  onStandardChange: (v: string[]) => void;
  standards: string[];
  sortBy: string;
  onSortChange: (v: string) => void;
  count: number;
  total: number;
}) {
  const [searchInput, setSearchInput] = useState(search);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleSearchInput(value: string) {
    setSearchInput(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearchChange(value);
    }, 300);
  }

  function toggleValue(
    list: string[],
    value: string,
    checked: boolean,
    onChange: (v: string[]) => void
  ) {
    if (checked) {
      onChange([...list, value]);
    } else {
      onChange(list.filter((v) => v !== value));
    }
  }

  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search
            size={16}
            strokeWidth={1.5}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#475569]"
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder="Search code, description, or element..."
            className="h-9 w-80 rounded-md border border-[#334155] bg-[#111827] pl-9 pr-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569] focus:border-[#818CF8] focus:outline-none"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex h-9 items-center gap-2 rounded-md border border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] transition-colors hover:border-[#475569] hover:text-[#F8FAFC]",
                severityFilter.length > 0 && "text-[#F8FAFC]"
              )}
            >
              <Filter size={14} strokeWidth={1.5} />
              Severity
              {severityFilter.length > 0 && (
                <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-[4px] bg-[#818CF8] px-1 text-[10px] font-medium text-[#0B0F19]">
                  {severityFilter.length}
                </span>
              )}
              <ChevronDown size={14} strokeWidth={1.5} className="ml-1 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[140px] rounded-lg border border-[#334155] bg-[#111827] p-2 text-[13px] text-[#94A3B8]">
            <DropdownMenuLabel className="px-2 py-1 text-[11px] font-medium tracking-wider text-[#475569] uppercase">
              Severity
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#1E293B]" />
            {SEVERITY_OPTIONS.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={severityFilter.includes(option.value)}
                onCheckedChange={(checked) =>
                  toggleValue(
                    severityFilter,
                    option.value,
                    checked === true,
                    onSeverityChange
                  )
                }
                onSelect={(e) => e.preventDefault()}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC] data-[state=checked]:text-[#F8FAFC]"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: option.dot }}
                />
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex h-9 items-center gap-2 rounded-md border border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] transition-colors hover:border-[#475569] hover:text-[#F8FAFC]",
                statusFilter.length > 0 && "text-[#F8FAFC]"
              )}
            >
              <Filter size={14} strokeWidth={1.5} />
              Status
              {statusFilter.length > 0 && (
                <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-[4px] bg-[#818CF8] px-1 text-[10px] font-medium text-[#0B0F19]">
                  {statusFilter.length}
                </span>
              )}
              <ChevronDown size={14} strokeWidth={1.5} className="ml-1 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[140px] rounded-lg border border-[#334155] bg-[#111827] p-2 text-[13px] text-[#94A3B8]">
            <DropdownMenuLabel className="px-2 py-1 text-[11px] font-medium tracking-wider text-[#475569] uppercase">
              Status
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#1E293B]" />
            {STATUS_OPTIONS.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={statusFilter.includes(option.value)}
                onCheckedChange={(checked) =>
                  toggleValue(
                    statusFilter,
                    option.value,
                    checked === true,
                    onStatusChange
                  )
                }
                onSelect={(e) => e.preventDefault()}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC] data-[state=checked]:text-[#F8FAFC]"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: option.dot }}
                />
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex h-9 items-center gap-2 rounded-md border border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] transition-colors hover:border-[#475569] hover:text-[#F8FAFC]",
                standardFilter.length > 0 && "text-[#F8FAFC]"
              )}
            >
              <Filter size={14} strokeWidth={1.5} />
              Standard
              {standardFilter.length > 0 && (
                <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-[4px] bg-[#818CF8] px-1 text-[10px] font-medium text-[#0B0F19]">
                  {standardFilter.length}
                </span>
              )}
              <ChevronDown size={14} strokeWidth={1.5} className="ml-1 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[140px] rounded-lg border border-[#334155] bg-[#111827] p-2 text-[13px] text-[#94A3B8]">
            <DropdownMenuLabel className="px-2 py-1 text-[11px] font-medium tracking-wider text-[#475569] uppercase">
              Standard
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#1E293B]" />
            {standards.map((standard) => (
              <DropdownMenuCheckboxItem
                key={standard}
                checked={standardFilter.includes(standard)}
                onCheckedChange={(checked) =>
                  toggleValue(
                    standardFilter,
                    standard,
                    checked === true,
                    onStandardChange
                  )
                }
                onSelect={(e) => e.preventDefault()}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC] data-[state=checked]:text-[#F8FAFC]"
              >
                {standard}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-description text-[12px] text-[#475569] tabular-nums">
          Showing {count} of {total}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-md border border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] transition-colors hover:border-[#475569] hover:text-[#F8FAFC]"
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} />
              Sort
              <span className="text-[#F8FAFC]">
                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label.split(" (")[0]}
              </span>
              <ChevronDown size={14} strokeWidth={1.5} className="ml-1 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[160px] rounded-lg border border-[#334155] bg-[#111827] p-2 text-[13px] text-[#94A3B8]">
            <DropdownMenuLabel className="px-2 py-1 text-[11px] font-medium tracking-wider text-[#475569] uppercase">
              Sort by
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#1E293B]" />
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() => onSortChange(option.value)}
                className={cn(
                  "rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC]",
                  sortBy === option.value && "text-[#F8FAFC]"
                )}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
