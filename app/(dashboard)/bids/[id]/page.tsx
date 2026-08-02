"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AlertTriangle, ChevronRight, Download } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useBidDetail, useUpdateBidStatus } from "@/lib/queries";
import { BidStatusWorkflow } from "@/components/bid-status-workflow";
import { BidLineItemsTable } from "@/components/bid-line-items-table";
import { BidSummaryCard } from "@/components/bid-summary-card";
import { BidActions } from "@/components/bid-actions";
import { StatusBadge } from "@/components/status-badge";
import { formatDate, formatRelativeTime } from "@/lib/formatters";
import { extractErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import type { BidStatus, BidSummary } from "@/lib/api";

const EMPTY_SUMMARY: BidSummary = {
  subtotal: 0,
  overhead: 0,
  overhead_pct: 0,
  profit: 0,
  profit_pct: 0,
  contingency: 0,
  contingency_pct: 0,
  grand_total: 0,
};

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex gap-2">
          <div className="h-4 w-10 rounded bg-[#1E293B] animate-pulse" />
          <div className="h-4 w-4 rounded bg-[#1E293B] animate-pulse" />
          <div className="h-4 w-32 rounded bg-[#1E293B] animate-pulse" />
        </div>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="h-7 w-64 rounded bg-[#1E293B] animate-pulse" />
            <div className="mt-2 h-4 w-48 rounded bg-[#1E293B] animate-pulse" />
          </div>
          <div className="h-8 w-28 rounded bg-[#1E293B] animate-pulse" />
        </div>
        <div className="mb-8 flex items-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <div className="h-px w-12 bg-[#1E293B]" />}
              <div className="flex flex-col items-center">
                <div className="h-6 w-6 rounded-full bg-[#1E293B] animate-pulse" />
                <div className="mt-1.5 h-3 w-14 rounded bg-[#1E293B] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-[#1E293B] bg-[#111827] p-4"
            >
              <div className="h-3 w-20 rounded bg-[#1E293B] animate-pulse" />
              <div className="mt-2 h-5 w-28 rounded bg-[#1E293B] animate-pulse" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-5 w-32 rounded bg-[#1E293B] animate-pulse" />
            <div className="mt-4 overflow-hidden rounded-lg border border-[#1E293B] bg-[#111827]">
              <div className="h-9 border-b border-[#334155] bg-[#0B0F19]" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="h-10 border-b border-[#1E293B] px-4 flex items-center"
                >
                  <div className="h-3.5 w-56 rounded bg-[#1E293B] animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <div>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="mb-4 h-40 rounded-lg border border-[#1E293B] bg-[#111827] p-4"
              >
                <div className="h-4 w-24 rounded bg-[#1E293B] animate-pulse" />
                <div className="mt-4 h-4 w-full rounded bg-[#1E293B] animate-pulse" />
                <div className="mt-2 h-4 w-3/4 rounded bg-[#1E293B] animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BidDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const { data: bid, isLoading, isError, refetch } = useBidDetail(id);
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateBidStatus();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  function handleStatusChange(status: BidStatus) {
    updateStatus(
      { id, status },
      {
        onSuccess: () => {
          toast.success("Bid status updated");
        },
        onError: (error) => {
          toast.error(extractErrorMessage(error));
        },
      }
    );
  }

  if (authLoading || isLoading) {
    return <PageSkeleton />;
  }

  if (isError || !bid) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0D1117]">
        <AlertTriangle size={24} className="text-[#F87171]" />
        <p className="font-description mt-2 text-[14px] text-[#94A3B8]">
          Failed to load bid
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

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-2">
          <Link
            href="/bids"
            className="text-[13px] text-[#64748B] transition-colors hover:text-[#94A3B8]"
          >
            Bids
          </Link>
          <ChevronRight size={14} className="text-[#475569]" />
          <span className="text-[13px] text-[#94A3B8]">{bid.bid_name}</span>
        </div>

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-[24px] font-medium text-[#F8FAFC]">
              {bid.bid_name}
            </h1>
            <p className="font-description mt-1 text-[13px] text-[#94A3B8]">
              {bid.project_name}
            </p>
            <p className="font-description mt-0.5 text-[12px] text-[#64748B]">
              {bid.client_name}
            </p>
          </div>
          <div className="flex items-center">
            <StatusBadge status={bid.status} variant="bid" />
            <button
              type="button"
              disabled={!bid.pdf_url}
              onClick={() => {
                if (bid.pdf_url) {
                  window.open(bid.pdf_url, "_blank", "noopener,noreferrer");
                }
              }}
              className={`ml-2 flex h-8 items-center gap-2 rounded-md border border-[#334155] bg-transparent px-3 text-[13px] text-[#94A3B8] transition-colors hover:border-[#475569] hover:text-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <Download size={14} strokeWidth={1.5} />
              Download PDF
            </button>
          </div>
        </div>

        <div className="mb-8">
          <BidStatusWorkflow status={bid.status} />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-4">
            <p className="text-[12px] text-[#94A3B8]">Created By</p>
            <p className="mt-1 text-[13px] text-[#F8FAFC]">
              {bid.created_by_name}
            </p>
          </div>
          <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-4">
            <p className="text-[12px] text-[#94A3B8]">Created</p>
            <p className="mt-1 text-[13px] text-[#94A3B8]">
              {formatDate(bid.created_at)}
            </p>
          </div>
          <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-4">
            <p className="text-[12px] text-[#94A3B8]">Last Updated</p>
            <p className="mt-1 text-[13px] text-[#94A3B8]">
              {formatRelativeTime(bid.updated_at)}
            </p>
          </div>
          <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-4">
            <p className="text-[12px] text-[#94A3B8]">Line Items</p>
            <p className="mt-1 text-[13px] tabular-nums text-[#F8FAFC]">
              {bid.line_items?.length ?? 0}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BidLineItemsTable
              lineItems={bid.line_items ?? []}
              currency={bid.currency || "USD"}
            />
          </div>
          <div>
            <div className="mb-4">
              <BidSummaryCard
                summary={bid.summary ?? EMPTY_SUMMARY}
                currency={bid.currency || "USD"}
              />
            </div>
            <div className="mb-4 rounded-lg border border-[#1E293B] bg-[#111827] p-4">
              <h3 className="mb-3 text-[14px] font-medium text-[#F8FAFC]">
                Assumptions
              </h3>
              {bid.assumptions?.length ? (
                <ul className="list-inside list-disc space-y-1.5">
                  {bid.assumptions.map((item, i) => (
                    <li
                      key={i}
                      className="font-description text-[13px] text-[#94A3B8]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-description text-[13px] text-[#64748B]">
                  None specified.
                </p>
              )}
            </div>
            <div className="mb-4 rounded-lg border border-[#1E293B] bg-[#111827] p-4">
              <h3 className="mb-3 text-[14px] font-medium text-[#F8FAFC]">
                Exclusions
              </h3>
              {bid.exclusions?.length ? (
                <ul className="list-inside list-disc space-y-1.5">
                  {bid.exclusions.map((item, i) => (
                    <li
                      key={i}
                      className="font-description text-[13px] text-[#94A3B8]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-description text-[13px] text-[#64748B]">
                  None specified.
                </p>
              )}
            </div>
            <BidActions
              bidId={bid.id}
              status={bid.status}
              isUpdating={isUpdating}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
