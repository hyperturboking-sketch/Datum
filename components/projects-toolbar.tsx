"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";
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
import type {
  ProjectSortBy,
  ProjectSortOrder,
  ProjectStatus,
} from "@/lib/api";

export const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "planning", label: "Planning" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On hold" },
  { value: "archived", label: "Archived" },
];

const SORT_OPTIONS: {
  value: ProjectSortBy;
  order: ProjectSortOrder;
  label: string;
}[] = [
  { value: "updated_at", order: "desc", label: "Updated" },
  { value: "name", order: "asc", label: "Name" },
  { value: "contract_value", order: "desc", label: "Value" },
  { value: "start_date", order: "desc", label: "Start date" },
];

export interface ProjectsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statuses: ProjectStatus[];
  onStatusesChange: (statuses: ProjectStatus[]) => void;
  sortBy: ProjectSortBy;
  sortOrder: ProjectSortOrder;
  onSortChange: (sortBy: ProjectSortBy, sortOrder: ProjectSortOrder) => void;
  total: number;
  itemCount: number;
  offset: number;
  limit: number;
  onPageChange: (offset: number) => void;
  isLoading: boolean;
}

export function ProjectsToolbar({
  search,
  onSearchChange,
  statuses,
  onStatusesChange,
  sortBy,
  sortOrder,
  onSortChange,
  total,
  itemCount,
  offset,
  limit,
  onPageChange,
  isLoading,
}: ProjectsToolbarProps) {
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

  function toggleStatus(status: ProjectStatus, checked: boolean) {
    if (checked) {
      onStatusesChange([...statuses, status]);
    } else {
      onStatusesChange(statuses.filter((s) => s !== status));
    }
  }

  const hasPrev = offset > 0;
  const hasNext = offset + itemCount < total;
  const firstShown = total === 0 ? 0 : offset + 1;
  const lastShown = offset + itemCount;

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
            placeholder="Search projects or clients..."
            className="h-9 w-72 rounded-md border-[#334155] bg-[#111827] pl-9 text-[13px] text-[#F8FAFC] placeholder:text-[#475569]"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 rounded-md border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC]",
                statuses.length > 0 && "text-[#F8FAFC]"
              )}
            >
              <Filter size={14} strokeWidth={1.5} />
              Status
              {statuses.length > 0 && (
                <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-[4px] bg-[#00D4AA] px-1 text-[10px] font-medium text-[#0B0F19]">
                  {statuses.length}
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
            {STATUS_OPTIONS.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={statuses.includes(option.value)}
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
              Sort by
              <span className="ml-1 text-[13px] text-[#F8FAFC]">
                {SORT_OPTIONS.find((o) => o.value === sortBy && o.order === sortOrder)?.label}
              </span>
              <ChevronDown size={14} strokeWidth={1.5} className="ml-1 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[160px] rounded-md border-[#334155] bg-[#111827] p-1 text-[13px] text-[#94A3B8]">
            <DropdownMenuLabel className="px-2 py-1.5 text-[11px] font-medium tracking-wider text-[#475569] uppercase">
              Sort by
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#1E293B]" />
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={`${option.value}-${option.order}`}
                onSelect={() => onSortChange(option.value, option.order)}
                className={cn(
                  "rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC]",
                  sortBy === option.value && sortOrder === option.order && "text-[#F8FAFC]"
                )}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-description text-[12px] text-[#475569] tabular-nums">
          Showing {firstShown}–{lastShown} of {total} projects
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!hasPrev || isLoading}
            onClick={() => onPageChange(Math.max(0, offset - limit))}
            className="h-8 rounded-md border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC] disabled:opacity-30"
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!hasNext || isLoading}
            onClick={() => onPageChange(offset + limit)}
            className="h-8 rounded-md border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC] disabled:opacity-30"
          >
            Next
            <ChevronRight size={14} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
