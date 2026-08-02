"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CalculateIcon from "@mui/icons-material/Calculate";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/lib/auth";
import { useDashboardStats, useRecentProjects } from "@/lib/queries";
import { KpiCard } from "@/components/kpi-card";
import { ProjectRow } from "@/components/project-row";
import { ActionCard } from "@/components/action-card";
import { ActivityFeed } from "@/components/activity-feed";
import { StatusBar } from "@/components/status-bar";
import { SkeletonKpiCard, SkeletonProjectRow } from "@/components/skeletons";

const quickActions = [
  {
    href: "/bids/new",
    title: "New Bid",
    description: "Create a bid from project quantities",
    icon: <CalculateIcon style={{ fontSize: 20 }} />,
  },
  {
    href: "/compliance/check",
    title: "Compliance Check",
    description: "Run a code compliance review",
    icon: <VerifiedUserIcon style={{ fontSize: 20 }} />,
  },
  {
    href: "/rfis/new",
    title: "New RFI",
    description: "Send a request for information",
    icon: <ChatBubbleOutlinedIcon style={{ fontSize: 20 }} />,
  },
  {
    href: "/sustainability/report",
    title: "ESG Report",
    description: "Generate a sustainability report",
    icon: <EnergySavingsLeafIcon style={{ fontSize: 20 }} />,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const stats = useDashboardStats();
  const projects = useRecentProjects();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonKpiCard key={i} />
        ))}
      </div>
    );
  }

  const statsLoading = stats.isLoading;
  const statsError = stats.isError;

  const projectRows = projects.data?.projects ?? [];
  const projectsLoading = projects.isLoading;
  const projectsError = projects.isError;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-[25px] font-semibold tracking-tight text-[#E5E5E5]">
            Dashboard
          </h1>
          <p className="mt-1 text-[14px] text-[#737373]">
            Overview of your AEC projects and workflows
          </p>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#1A1A1A] px-4 text-[13px] font-medium text-[#E5E5E5] transition-colors hover:bg-[#262626]"
        >
          <AddIcon style={{ fontSize: 16 }} />
          New Project
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Active Projects"
          value={stats.data?.active_projects ?? null}
          sub={stats.data ? `↑ ${stats.data.projects_delta || "0"} from last week` : ""}
          isLoading={statsLoading}
          hasError={statsError}
        />
        <KpiCard
          label="Bids in Progress"
          value={stats.data?.bids_in_progress ?? null}
          sub={
            stats.data
              ? `${stats.data.bids_pending_review} pending review`
              : ""
          }
          isLoading={statsLoading}
          hasError={statsError}
        />
        <KpiCard
          label="Open Violations"
          value={stats.data?.open_violations ?? null}
          sub={stats.data ? `${stats.data.critical_violations} critical` : ""}
          isLoading={statsLoading}
          hasError={statsError}
        />
        <KpiCard
          label="Open RFIs"
          value={stats.data?.open_rfis ?? null}
          sub={stats.data ? `${stats.data.overdue_rfis} overdue` : ""}
          isLoading={statsLoading}
          hasError={statsError}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-[#E5E5E5]">
              Recent Projects
            </h2>
            <Link
              href="/projects"
              className="text-[13px] text-[#737373] transition-colors hover:text-[#E5E5E5]"
            >
              View all →
            </Link>
          </div>

          {projectsLoading ? (
            <div className="flex flex-col gap-3">
              <SkeletonProjectRow />
              <SkeletonProjectRow />
              <SkeletonProjectRow />
            </div>
          ) : projectsError ? (
            <div className="flex items-center justify-between rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] px-4 py-3">
              <p className="text-[13px] text-[#B57373]">Failed to load projects.</p>
              <button
                type="button"
                onClick={() => void projects.refetch()}
                className="text-[13px] text-[#737373] transition-colors hover:text-[#E5E5E5]"
              >
                Retry
              </button>
            </div>
          ) : projectRows.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] px-4 py-12 text-center">
              <p className="text-[13px] text-[#737373]">
                No active projects. Create your first project to get started.
              </p>
              <Link
                href="/projects/new"
                className="mt-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#1A1A1A] px-3 py-1.5 text-[13px] text-[#E5E5E5] transition-colors hover:bg-[#262626]"
              >
                Create a project
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {projectRows.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-4 text-[16px] font-semibold text-[#E5E5E5]">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <ActionCard key={action.href} {...action} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-[16px] font-semibold text-[#E5E5E5]">
          Recent Activity
        </h2>
        <ActivityFeed />
      </div>

      <StatusBar />
    </div>
  );
}
