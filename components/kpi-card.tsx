import { SkeletonKpiCard } from "@/components/skeletons";

interface KpiCardProps {
  label: string;
  value: number | null;
  sub: string;
  isLoading: boolean;
  hasError: boolean;
}

export function KpiCard({
  label,
  value,
  sub,
  isLoading,
  hasError,
}: KpiCardProps) {
  if (isLoading) {
    return <SkeletonKpiCard />;
  }

  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] p-5">
      <p className="text-[12px] font-medium uppercase tracking-[0.05em] text-[#737373]">
        {label}
      </p>
      {hasError || value === null ? (
        <p className="font-description mt-3 text-[13px] text-[#B57373]">Failed to load stats</p>
      ) : (
        <>
          <p className="mt-3 text-[32px] font-semibold leading-none tracking-tight text-[#E5E5E5] tabular-nums">
            {value}
          </p>
          <p className="font-description mt-2 text-[13px] text-[#737373]">{sub}</p>
        </>
      )}
    </div>
  );
}
