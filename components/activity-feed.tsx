"use client";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import type { ActivityType } from "@/lib/api";
import { useActivity } from "@/lib/queries";
import { formatRelativeTime } from "@/lib/formatters";
import { SkeletonActivityRow } from "@/components/skeletons";

const typeConfig: Record<ActivityType, { icon: React.ElementType }> = {
  bid_completed: { icon: CheckCircleOutlinedIcon },
  violation_flagged: { icon: WarningAmberIcon },
  rfi_responded: { icon: ChatBubbleIcon },
  esg_generated: { icon: EnergySavingsLeafIcon },
  compliance_checked: { icon: VerifiedUserIcon },
};

export function ActivityFeed() {
  const { data, isLoading, isError } = useActivity();

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b]">
        <SkeletonActivityRow />
        <SkeletonActivityRow />
        <SkeletonActivityRow />
        <SkeletonActivityRow />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="overflow-hidden rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] px-4 py-3 text-[13px] text-[#B57373]">
        Failed to load activity.
      </div>
    );
  }

  const activities = data?.activities ?? [];

  if (activities.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] px-4 py-6 text-center text-[13px] text-[#737373]">
        No recent activity.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b]">
      {activities.map((activity) => {
        const config = typeConfig[activity.type];
        const Icon = config?.icon ?? CheckCircleOutlinedIcon;
        return (
          <div
            key={activity.id}
            className="flex items-center justify-between border-b border-[rgba(255,255,255,0.12)] px-4 py-3 last:border-b-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-[#525252]">
                <Icon style={{ fontSize: 15 }} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] text-[#E5E5E5]">
                  {activity.description}
                  {activity.project_name && (
                    <span className="text-[#737373]"> · {activity.project_name}</span>
                  )}
                </p>
              </div>
            </div>
            <span className="ml-3 shrink-0 text-[11px] text-[#525252] tabular-nums">
              {formatRelativeTime(activity.created_at)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
