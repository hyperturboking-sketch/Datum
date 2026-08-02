"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Archive,
  Copy,
  Download,
  Eye,
  FileText,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatRelativeTime } from "@/lib/formatters";
import type { Bid } from "@/lib/api";

export interface BidsTableProps {
  bids: Bid[];
  isLoading: boolean;
  isError: boolean;
  hasActiveFilters: boolean;
  onRetry: () => void;
  onClearFilters: () => void;
  onDelete: (id: string) => void;
}

export function BidsTable({
  bids,
  isLoading,
  isError,
  hasActiveFilters,
  onRetry,
  onClearFilters,
  onDelete,
}: BidsTableProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="overflow-x-auto rounded-lg border border-[#1E293B] bg-[#111827]">
        <div className="flex h-9 items-center border-b border-[#334155] px-4">
          <div className="min-w-[220px] flex-1 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
            Bid name
          </div>
          <div className="w-[180px] text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
            Project
          </div>
          <div className="w-[160px] text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
            Client
          </div>
          <div className="w-[120px] text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
            Status
          </div>
          <div className="w-[140px] text-right text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
            Total
          </div>
          <div className="w-[80px] text-right text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
            Items
          </div>
          <div className="w-[120px] text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
            Updated
          </div>
          <div className="w-[60px] text-right" />
        </div>
        {Array.from({ length: 8 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex h-11 items-center border-b border-[#1E293B] px-4 last:border-0"
          >
            <div className="min-w-[220px] flex-1">
              <Skeleton className="h-4 w-40" style={{ height: 14 }} />
              <Skeleton className="mt-1 h-3 w-24" style={{ height: 11 }} />
            </div>
            <Skeleton className="w-[180px]" style={{ height: 14 }} />
            <Skeleton className="w-[160px]" style={{ height: 14 }} />
            <Skeleton className="w-[120px]" style={{ height: 14 }} />
            <Skeleton className="w-[140px]" style={{ height: 14 }} />
            <Skeleton className="w-[80px]" style={{ height: 14 }} />
            <Skeleton className="w-[120px]" style={{ height: 14 }} />
            <div className="w-[60px]" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-[#334155] bg-[#0D1117] px-6 py-16">
        <AlertTriangle size={24} strokeWidth={1.5} className="text-[#F87171]" />
        <p className="font-description mt-2 text-[14px] text-[#94A3B8]">Failed to load bids</p>
        <Button
          variant="outline"
          onClick={onRetry}
          className="mt-4 h-8 rounded-md border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC]"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (bids.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-[#334155] bg-[#0D1117] px-6 py-16">
        <FileText size={32} strokeWidth={1.5} className="text-[#334155]" />
        <p className="font-description mt-3 text-[14px] text-[#94A3B8]">No bids found</p>
        {hasActiveFilters ? (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="mt-4 h-8 rounded-md border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC]"
          >
            Clear filters
          </Button>
        ) : (
          <>
            <p className="font-description mt-1 text-[13px] text-[#64748B]">
              Create your first bid from a project
            </p>
            <Link
              href="/projects"
              className="mt-4 text-[13px] text-[#818CF8] hover:text-[#A5B4FC]"
            >
              View projects
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-[#1E293B] bg-[#111827]">
      <div className="flex h-9 items-center border-b border-[#334155] px-4">
        <div className="min-w-[220px] flex-1 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
          Bid name
        </div>
        <div className="w-[180px] text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
          Project
        </div>
        <div className="w-[160px] text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
          Client
        </div>
        <div className="w-[120px] text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
          Status
        </div>
        <div className="w-[140px] text-right text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
          Total
        </div>
        <div className="w-[80px] text-right text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
          Items
        </div>
        <div className="w-[120px] text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
          Updated
        </div>
        <div className="w-[60px] text-right" />
      </div>

      {bids.map((bid) => (
        <div
          key={bid.id}
          className="flex h-11 items-center border-b border-[#1E293B] px-4 transition-colors last:border-0 hover:bg-[#1E293B]"
        >
          <Link
            href={`/bids/${bid.id}`}
            className="flex min-w-0 flex-1 cursor-pointer items-center"
          >
            <div className="min-w-[220px] flex-1 pr-3">
              <span className="block truncate text-[13px] font-medium text-[#F8FAFC]">
                {bid.bid_name}
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-[#64748B]">
                {bid.created_by_name}
              </span>
            </div>
            <span className="w-[180px] truncate pr-3 text-[13px] text-[#94A3B8]">
              {bid.project_name}
            </span>
            <span className="w-[160px] truncate pr-3 text-[13px] text-[#94A3B8]">
              {bid.client_name}
            </span>
            <span className="w-[120px] pr-3">
              <StatusBadge status={bid.status} variant="bid" />
            </span>
            <span className="w-[140px] pr-3 text-right text-[13px] font-medium text-[#F8FAFC] tabular-nums">
              {formatCurrency(bid.grand_total, bid.currency)}
            </span>
            <span className="w-[80px] pr-3 text-right text-[13px] text-[#94A3B8] tabular-nums">
              {bid.line_item_count}
            </span>
            <span className="w-[120px] text-[12px] text-[#475569] tabular-nums">
              {formatRelativeTime(bid.updated_at)}
            </span>
          </Link>
          <div className="flex w-[60px] justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Actions for ${bid.bid_name}`}
                  className="rounded-md text-[#64748B] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
                >
                  <MoreHorizontal size={14} strokeWidth={1.5} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[150px] rounded-md border-[#334155] bg-[#111827] p-1 text-[13px] text-[#94A3B8]"
              >
                <DropdownMenuItem
                  onSelect={() => router.push(`/bids/${bid.id}`)}
                  className="rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC]"
                >
                  <Eye size={14} strokeWidth={1.5} />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!bid.pdf_url}
                  onSelect={() => {
                    if (bid.pdf_url) {
                      window.open(bid.pdf_url, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC] disabled:opacity-40"
                >
                  <Download size={14} strokeWidth={1.5} />
                  Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC]">
                  <Copy size={14} strokeWidth={1.5} />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-2 py-1.5 text-[13px] text-[#F59E0B] focus:bg-[#1E293B] focus:text-[#F59E0B]">
                  <Archive size={14} strokeWidth={1.5} />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#1E293B]" />
                <DropdownMenuItem
                  onSelect={() => onDelete(bid.id)}
                  className="rounded-md px-2 py-1.5 text-[13px] text-[#F87171] focus:bg-[#1E293B] focus:text-[#F87171]"
                >
                  <Trash2 size={14} strokeWidth={1.5} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
