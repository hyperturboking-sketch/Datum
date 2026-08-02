import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BidStatus } from "@/lib/api";

const baseButton =
  "w-full h-9 rounded-md text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export function BidActions({
  bidId,
  status,
  isUpdating,
  onStatusChange,
}: {
  bidId: string;
  status: BidStatus;
  isUpdating: boolean;
  onStatusChange: (status: BidStatus) => void;
}) {
  if (status === "archived") {
    return (
      <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-4">
        <p className="font-description text-[13px] text-[#64748B]">
          This bid is archived.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-4">
      {status === "draft" && (
        <>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onStatusChange("pending_review")}
            className={cn(
              baseButton,
              "mb-2 bg-[#818CF8] text-[#0B0F19] hover:brightness-110"
            )}
          >
            {isUpdating ? "Updating..." : "Submit for Review"}
          </button>
          <Link
            href={`/bids/${bidId}/edit`}
            className={cn(
              baseButton,
              "flex items-center justify-center border border-[#334155] bg-transparent text-[#94A3B8] hover:text-[#F8FAFC]"
            )}
          >
            Edit
          </Link>
        </>
      )}
      {status === "pending_review" && (
        <>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onStatusChange("approved")}
            className={cn(
              baseButton,
              "mb-2 bg-[#22C55E] text-[#0B0F19] hover:brightness-110"
            )}
          >
            {isUpdating ? "Updating..." : "Approve"}
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onStatusChange("draft")}
            className={cn(
              baseButton,
              "border border-[#F59E0B] bg-transparent text-[#F59E0B] hover:text-[#F59E0B]/80"
            )}
          >
            Request Changes
          </button>
        </>
      )}
      {status === "approved" && (
        <>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onStatusChange("submitted")}
            className={cn(
              baseButton,
              "mb-2 bg-[#818CF8] text-[#0B0F19] hover:brightness-110"
            )}
          >
            {isUpdating ? "Updating..." : "Submit to Client"}
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => alert("Regenerating...")}
            className={cn(
              baseButton,
              "border border-[#334155] bg-transparent text-[#94A3B8] hover:text-[#F8FAFC]"
            )}
          >
            Regenerate
          </button>
        </>
      )}
      {status === "submitted" && (
        <>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onStatusChange("won")}
            className={cn(
              baseButton,
              "mb-2 bg-[#22C55E] text-[#0B0F19] hover:brightness-110"
            )}
          >
            {isUpdating ? "Updating..." : "Mark Won"}
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onStatusChange("lost")}
            className={cn(
              baseButton,
              "bg-[#F87171] text-white hover:brightness-110"
            )}
          >
            Mark Lost
          </button>
        </>
      )}
      {(status === "won" || status === "lost") && (
        <>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => alert("Duplicating bid...")}
            className={cn(
              baseButton,
              "mb-2 border border-[#334155] bg-transparent text-[#94A3B8] hover:text-[#F8FAFC]"
            )}
          >
            Duplicate
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onStatusChange("archived")}
            className={cn(
              baseButton,
              "border border-[#334155] bg-transparent text-[#94A3B8] hover:text-[#F8FAFC]"
            )}
          >
            Archive
          </button>
        </>
      )}
    </div>
  );
}
