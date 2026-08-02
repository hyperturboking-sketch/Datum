"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useProjects } from "@/lib/queries";
import { ProjectsToolbar } from "@/components/projects-toolbar";
import { ProjectsTable } from "@/components/projects-table";
import { NewProjectDialog } from "@/components/new-project-dialog";
import { DeleteProjectDialog } from "@/components/delete-project-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  Project,
  ProjectSortBy,
  ProjectSortOrder,
  ProjectStatus,
} from "@/lib/api";

const PAGE_SIZE = 20;

export default function ProjectsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [search, setSearch] = useState("");
  const [statuses, setStatuses] = useState<ProjectStatus[]>([]);
  const [sortBy, setSortBy] = useState<ProjectSortBy>("updated_at");
  const [sortOrder, setSortOrder] = useState<ProjectSortOrder>("desc");
  const [offset, setOffset] = useState(0);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const projectsQuery = useProjects({
    search,
    statuses,
    sortBy,
    sortOrder,
    limit: PAGE_SIZE,
    offset,
  });

  const projects = projectsQuery.data?.projects ?? [];
  const total = projectsQuery.data?.total ?? 0;
  const hasActiveFilters = search.trim().length > 0 || statuses.length > 0;

  function handleStatusesChange(next: ProjectStatus[]) {
    setStatuses(next);
    setOffset(0);
  }

  function handleSortChange(nextSortBy: ProjectSortBy, nextSortOrder: ProjectSortOrder) {
    setSortBy(nextSortBy);
    setSortOrder(nextSortOrder);
    setOffset(0);
  }

  function handleSearchChange(next: string) {
    setSearch(next);
    setOffset(0);
  }

  function handleClearFilters() {
    setSearch("");
    setStatuses([]);
    setOffset(0);
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
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-[24px] font-medium text-[#F8FAFC]">Projects</h1>
            <p className="mt-1 text-[13px] text-[#94A3B8]">
              Manage your AEC projects and workflows
            </p>
          </div>
          <Button
            onClick={() => setCreateOpen(true)}
            className="h-9 rounded-md bg-[#00D4AA] px-4 text-[13px] font-medium text-[#0B0F19] hover:brightness-110"
          >
            <Plus size={14} strokeWidth={1.5} className="mr-2" />
            New Project
          </Button>
        </div>

        <ProjectsToolbar
          search={search}
          onSearchChange={handleSearchChange}
          statuses={statuses}
          onStatusesChange={handleStatusesChange}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          total={total}
          itemCount={projects.length}
          offset={offset}
          limit={PAGE_SIZE}
          onPageChange={setOffset}
          isLoading={projectsQuery.isLoading}
        />

        <ProjectsTable
          projects={projects}
          isLoading={projectsQuery.isLoading}
          isError={projectsQuery.isError}
          hasActiveFilters={hasActiveFilters}
          onRetry={() => void projectsQuery.refetch()}
          onClearFilters={handleClearFilters}
          onNewProject={() => setCreateOpen(true)}
          onDeleteProject={setDeleteTarget}
        />
      </div>

      <NewProjectDialog open={createOpen} onOpenChange={setCreateOpen} />
      <DeleteProjectDialog
        project={deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      />
    </div>
  );
}
