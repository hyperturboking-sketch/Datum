"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useBids, useDeleteBid } from "@/lib/queries";
import { BidsToolbar } from "@/components/bids-toolbar";
import { BidsTable } from "@/components/bids-table";
import { DeleteBidDialog } from "@/components/delete-bid-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { extractErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import type {
  Bid,
  BidSortBy,
  BidSortOrder,
  BidStatus,
} from "@/lib/api";

const PAGE_SIZE = 20;

const SORT_MAP: Record<
  string,
  { sortBy: BidSortBy; sortOrder: BidSortOrder }
> = {
  updated: { sortBy: "updated_at", sortOrder: "desc" },
  created: { sortBy: "created_at", sortOrder: "desc" },
  value_desc: { sortBy: "grand_total", sortOrder: "desc" },
  value_asc: { sortBy: "grand_total", sortOrder: "asc" },
  name: { sortBy: "bid_name", sortOrder: "asc" },
};

export default function BidsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [search, setSearch] = useState("");
  const [statuses, setStatuses] = useState<BidStatus[]>([]);
  const [sortKey, setSortKey] = useState("updated");
  const [offset, setOffset] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<Bid | null>(null);

  const { sortBy, sortOrder } = SORT_MAP[sortKey] ?? SORT_MAP.updated;

  const bidsQuery = useBids({
    search,
    statuses,
    sortBy,
    sortOrder,
    limit: PAGE_SIZE,
    offset,
  });

  const deleteBid = useDeleteBid();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const bids = bidsQuery.data?.bids ?? [];
  const total = bidsQuery.data?.total ?? 0;
  const hasActiveFilters = search.trim() !== "" || statuses.length > 0;
  const hasNext = offset + bids.length < total;

  function handleSearchChange(next: string) {
    setSearch(next);
    setOffset(0);
  }

  function handleStatusChange(next: string[]) {
    setStatuses(next as BidStatus[]);
    setOffset(0);
  }

  function handleSortChange(next: string) {
    setSortKey(next);
    setOffset(0);
  }

  function handleClearFilters() {
    setSearch("");
    setStatuses([]);
    setSortKey("updated");
    setOffset(0);
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    deleteBid.mutate(deleteTarget.id, {
      onSuccess: () => {
        toast.success("Bid deleted");
        setDeleteTarget(null);
      },
      onError: (error) => {
        toast.error(extractErrorMessage(error));
      },
    });
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0D1117]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <Skeleton className="h-7 w-28" />
              <Skeleton className="mt-2 h-4 w-56" />
            </div>
          </div>
          <Skeleton className="h-9 w-full" />
          <Skeleton className="mt-4 h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-[24px] font-medium text-[#F8FAFC]">Bids</h1>
            <p className="mt-1 text-[13px] text-[#94A3B8]">
              Cost proposals and bid estimates
            </p>
          </div>
          <Link href="/bids/new">
            <Button className="h-9 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] transition-all hover:brightness-110">
              <Plus size={14} strokeWidth={1.5} />
              New Bid
            </Button>
          </Link>
        </div>

        <BidsToolbar
          search={search}
          onSearchChange={handleSearchChange}
          statusFilter={statuses}
          onStatusChange={handleStatusChange}
          sortBy={sortKey}
          onSortChange={handleSortChange}
          total={total}
          offset={offset}
          limit={PAGE_SIZE}
          onPrev={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
          onNext={() => setOffset(offset + PAGE_SIZE)}
          hasNext={hasNext}
        />

        <BidsTable
          bids={bids}
          isLoading={bidsQuery.isLoading}
          isError={bidsQuery.isError}
          hasActiveFilters={hasActiveFilters}
          onRetry={() => void bidsQuery.refetch()}
          onClearFilters={handleClearFilters}
          onDelete={(id) => {
            const target = bids.find((bid) => bid.id === id);
            if (target) setDeleteTarget(target);
          }}
        />
      </div>

      <DeleteBidDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDelete}
        bidName={deleteTarget?.bid_name ?? ""}
        isLoading={deleteBid.isPending}
      />
    </div>
  );
}
