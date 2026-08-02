"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Plus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useResolveViolation, useViolations } from "@/lib/queries";
import { ComplianceStats } from "@/components/compliance-stats";
import { ComplianceFilters } from "@/components/compliance-filters";
import { ViolationsTable } from "@/components/violations-table";
import { ResolveViolationDialog } from "@/components/resolve-violation-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { extractErrorMessage } from "@/lib/api";
import { toast } from "sonner";
import type {
  ViolationSortBy,
  ViolationSortOrder,
  ViolationSeverity,
  ViolationStatus,
} from "@/lib/api";

const PAGE_SIZE = 500;

const SORT_MAP: Record<
  string,
  { sortBy: ViolationSortBy; sortOrder: ViolationSortOrder }
> = {
  date: { sortBy: "created_at", sortOrder: "desc" },
  severity: { sortBy: "severity", sortOrder: "asc" },
  status: { sortBy: "status", sortOrder: "asc" },
  project: { sortBy: "project_name", sortOrder: "asc" },
};

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <Skeleton className="h-7 w-28" />
            <Skeleton className="mt-2 h-4 w-52" />
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

export default function CompliancePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [search, setSearch] = useState("");
  const [severities, setSeverities] = useState<ViolationSeverity[]>([]);
  const [statuses, setStatuses] = useState<ViolationStatus[]>([]);
  const [standards, setStandards] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState("date");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [resolveOpen, setResolveOpen] = useState(false);

  const { sortBy, sortOrder } = SORT_MAP[sortKey] ?? SORT_MAP.date;

  const violationsQuery = useViolations({
    search,
    severities,
    statuses,
    standards,
    sortBy,
    sortOrder,
    limit: PAGE_SIZE,
    offset: 0,
  });

  const resolveMutation = useResolveViolation();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const violations = violationsQuery.data?.violations ?? [];
  const total = violationsQuery.data?.total ?? violations.length;
  const availableStandards = Array.from(
    new Set(violations.map((v) => v.code_standard).filter(Boolean))
  ).sort();
  const selectedViolation =
    violations.find((v) => v.id === selectedId) ?? null;

  function handleConfirmResolve() {
    if (!selectedId) return;
    resolveMutation.mutate(selectedId, {
      onSuccess: () => {
        toast.success("Violation resolved");
        setResolveOpen(false);
        setSelectedId(null);
      },
      onError: (error) => {
        toast.error(extractErrorMessage(error));
      },
    });
  }

  if (authLoading) {
    return <PageSkeleton />;
  }

  if (violationsQuery.isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0D1117]">
        <AlertTriangle size={24} className="text-[#F87171]" />
        <p className="font-description mt-2 text-[14px] text-[#94A3B8]">
          Failed to load violations
        </p>
        <button
          type="button"
          onClick={() => void violationsQuery.refetch()}
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
            <h1 className="text-[24px] font-medium text-[#F8FAFC]">
              Compliance
            </h1>
            <p className="font-description mt-1 text-[13px] text-[#94A3B8]">
              Code violations and regulatory checks
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert("Open scan modal")}
            className="flex h-9 items-center gap-2 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110"
          >
            <Plus size={14} strokeWidth={1.5} />
            New Scan
          </button>
        </div>

        <div className="mb-6">
          <ComplianceStats violations={violations} />
        </div>

        <ComplianceFilters
          search={search}
          onSearchChange={setSearch}
          severityFilter={severities}
          onSeverityChange={(v) => setSeverities(v as ViolationSeverity[])}
          statusFilter={statuses}
          onStatusChange={(v) => setStatuses(v as ViolationStatus[])}
          standardFilter={standards}
          onStandardChange={setStandards}
          standards={availableStandards}
          sortBy={sortKey}
          onSortChange={setSortKey}
          count={violations.length}
          total={total}
        />

        <ViolationsTable
          violations={violations}
          isLoading={violationsQuery.isLoading}
          onView={(id) => router.push(`/compliance/${id}`)}
          onResolve={(id) => {
            setSelectedId(id);
            setResolveOpen(true);
          }}
        />
      </div>

      <ResolveViolationDialog
        open={resolveOpen}
        onOpenChange={setResolveOpen}
        onConfirm={handleConfirmResolve}
        violationCode={selectedViolation?.code ?? ""}
        isLoading={resolveMutation.isPending}
      />
    </div>
  );
}
