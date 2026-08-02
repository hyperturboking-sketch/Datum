"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Plus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useDeleteRFI, useRFIs, useUpdateRFIStatus } from "@/lib/queries";
import { RfiStats } from "@/components/rfi-stats";
import { RfiFilters } from "@/components/rfi-filters";
import { RfisTable } from "@/components/rfis-table";
import { RfiDetailDialog } from "@/components/rfi-detail-dialog";
import { DeleteRfiDialog } from "@/components/delete-rfi-dialog";
import { RfiFormDialog } from "@/components/rfi-form-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { extractErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import type {
  Rfi,
  RfiPriority,
  RfiSortBy,
  RfiSortOrder,
  RfiStatus,
} from "@/lib/api";

const PAGE_SIZE = 500;

const SORT_MAP: Record<
  string,
  { sortBy: RfiSortBy; sortOrder: RfiSortOrder }
> = {
  date: { sortBy: "created_at", sortOrder: "desc" },
  due: { sortBy: "due_date", sortOrder: "asc" },
  priority: { sortBy: "priority", sortOrder: "asc" },
  status: { sortBy: "status", sortOrder: "asc" },
};

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <Skeleton className="h-7 w-24" />
            <Skeleton className="mt-2 h-4 w-48" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-[#1E293B] bg-[#111827] p-4"
            >
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2 h-7 w-10" />
            </div>
          ))}
        </div>
        <Skeleton className="mb-4 h-9 w-full" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="mb-2 h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function RfisPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [search, setSearch] = useState("");
  const [statuses, setStatuses] = useState<RfiStatus[]>([]);
  const [priorities, setPriorities] = useState<RfiPriority[]>([]);
  const [sortKey, setSortKey] = useState("date");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingRfi, setEditingRfi] = useState<Rfi | null>(null);

  const { sortBy, sortOrder } = SORT_MAP[sortKey] ?? SORT_MAP.date;

  const rfisQuery = useRFIs({
    search,
    statuses,
    priorities,
    sortBy,
    sortOrder,
    limit: PAGE_SIZE,
    offset: 0,
  });

  const updateStatusMutation = useUpdateRFIStatus();
  const deleteMutation = useDeleteRFI();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const rfis = rfisQuery.data?.rfis ?? [];
  const total = rfisQuery.data?.total ?? rfis.length;
  const selectedRfi = rfis.find((r) => r.id === selectedId) ?? null;
  const deleteRfi = rfis.find((r) => r.id === deleteId) ?? null;

  function handleStatusChange(id: string, status: string) {
    updateStatusMutation.mutate(
      { id, status: status as RfiStatus },
      {
        onSuccess: () => {
          toast.success("RFI status updated");
        },
        onError: (error) => {
          toast.error(extractErrorMessage(error));
        },
      }
    );
  }

  function handleConfirmDelete() {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        toast.success("RFI deleted");
        setDeleteOpen(false);
        setDeleteId(null);
      },
      onError: (error) => {
        toast.error(extractErrorMessage(error));
      },
    });
  }

  if (authLoading) {
    return <PageSkeleton />;
  }

  if (rfisQuery.isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0D1117]">
        <AlertTriangle size={24} className="text-[#F87171]" />
        <p className="font-description mt-2 text-[14px] text-[#94A3B8]">
          Failed to load RFIs
        </p>
        <button
          type="button"
          onClick={() => void rfisQuery.refetch()}
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
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-[24px] font-medium text-[#F8FAFC]">RFIs</h1>
            <p className="font-description mt-1 text-[13px] text-[#94A3B8]">
              Requests for Information
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingRfi(null);
              setFormOpen(true);
            }}
            className="flex h-9 items-center gap-2 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110"
          >
            <Plus size={14} strokeWidth={1.5} />
            New RFI
          </button>
        </div>

        <div className="mb-6">
          <RfiStats rfis={rfis} />
        </div>

        <RfiFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statuses}
          onStatusChange={(v) => setStatuses(v as RfiStatus[])}
          priorityFilter={priorities}
          onPriorityChange={(v) => setPriorities(v as RfiPriority[])}
          sortBy={sortKey}
          onSortChange={setSortKey}
          count={rfis.length}
          total={total}
        />

        <RfisTable
          rfis={rfis}
          isLoading={rfisQuery.isLoading}
          onView={(id) => {
            setSelectedId(id);
            setDetailOpen(true);
          }}
          onNew={() => {
            setEditingRfi(null);
            setFormOpen(true);
          }}
          onEdit={(id) => {
            setEditingRfi(rfis.find((r) => r.id === id) ?? null);
            setFormOpen(true);
          }}
          onDelete={(id) => {
            setDeleteId(id);
            setDeleteOpen(true);
          }}
          onStatusChange={handleStatusChange}
        />
      </div>

      <RfiDetailDialog
        rfi={selectedRfi}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onStatusChange={(status) => {
          if (selectedId) {
            handleStatusChange(selectedId, status);
          }
        }}
        onEdit={() => {
          setEditingRfi(selectedRfi);
          setFormOpen(true);
        }}
        isUpdating={updateStatusMutation.isPending}
      />

      <DeleteRfiDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleConfirmDelete}
        rfiNumber={deleteRfi?.rfi_number ?? ""}
        isLoading={deleteMutation.isPending}
      />

      <RfiFormDialog
        rfi={editingRfi}
        open={formOpen}
        onOpenChange={setFormOpen}
      />
    </div>
  );
}
