"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const BID_STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "pending_review", label: "Pending Review" },
  { value: "approved", label: "Approved" },
  { value: "submitted", label: "Submitted" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
  { value: "archived", label: "Archived" },
];

export const BID_SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "updated", label: "Updated" },
  { value: "created", label: "Created" },
  { value: "value_desc", label: "Value (high-low)" },
  { value: "value_asc", label: "Value (low-high)" },
  { value: "name", label: "Name" },
];

export interface BidsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string[];
  onStatusChange: (statuses: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  total: number;
  offset: number;
  limit: number;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
}

export function BidsToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  total,
  offset,
  limit,
  onPrev,
  onNext,
  hasNext,
}: BidsToolbarProps) {
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

  function toggleStatus(value: string, checked: boolean) {
    if (value === "all") {
      onStatusChange(checked ? [] : statusFilter);
      return;
    }
    if (checked) {
      onStatusChange([...statusFilter, value]);
    } else {
      onStatusChange(statusFilter.filter((s) => s !== value));
    }
  }

  const allChecked = statusFilter.length === 0;
  const firstShown = total === 0 ? 0 : offset + 1;
  const lastShown = Math.min(offset + limit, total);

  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search
            size={16}
            strokeWidth={1.5}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#475569]"
          />
          <Input
            type="text"
            value={searchInput}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder="Search bids or projects..."
            className="h-9 w-72 rounded-md border-[#334155] bg-[#111827] pl-9 pr-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569] focus:border-[#818CF8]"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 rounded-md border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC]",
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
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[160px] rounded-md border-[#334155] bg-[#111827] p-1 text-[13px] text-[#94A3B8]">
            <DropdownMenuLabel className="px-2 py-1.5 text-[11px] font-medium tracking-wider text-[#475569] uppercase">
              Status
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#1E293B]" />
            <DropdownMenuCheckboxItem
              checked={allChecked}
              onCheckedChange={(checked) => toggleStatus("all", checked === true)}
              onSelect={(e) => e.preventDefault()}
              className="rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC] data-[state=checked]:text-[#F8FAFC]"
            >
              All
            </DropdownMenuCheckboxItem>
            {BID_STATUS_OPTIONS.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={statusFilter.includes(option.value)}
                onCheckedChange={(checked) =>
                  toggleStatus(option.value, checked === true)
                }
                onSelect={(e) => e.preventDefault()}
                className="rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC] data-[state=checked]:text-[#F8FAFC]"
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-9 rounded-md border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC]"
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} />
              Sort
              <ChevronDown size={14} strokeWidth={1.5} className="ml-1 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[160px] rounded-md border-[#334155] bg-[#111827] p-1 text-[13px] text-[#94A3B8]">
            <DropdownMenuLabel className="px-2 py-1.5 text-[11px] font-medium tracking-wider text-[#475569] uppercase">
              Sort by
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#1E293B]" />
            {BID_SORT_OPTIONS.map((option) => (
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

      <div className="flex items-center gap-3">
        <span className="font-description text-[12px] text-[#475569] tabular-nums">
          Showing {firstShown} — {lastShown} of {total}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={offset === 0}
            onClick={onPrev}
            className="h-8 rounded-md border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!hasNext}
            onClick={onNext}
            className="h-8 rounded-md border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
