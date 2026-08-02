import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonKpiCard() {
  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] p-5">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-3 h-8 w-16" />
      <Skeleton className="mt-2 h-3 w-28" />
    </div>
  );
}

export function SkeletonProjectRow() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] p-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-28" />
      </div>
      <div className="space-y-2 text-right">
        <Skeleton className="ml-auto h-4 w-16" />
        <Skeleton className="ml-auto h-4 w-20" />
      </div>
    </div>
  );
}

export function SkeletonActivityRow() {
  return (
    <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.12)] px-4 py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-3 w-52" />
      </div>
      <Skeleton className="h-3 w-16" />
    </div>
  );
}
