"use client";

import Link from "next/link";
import { Archive, FolderOpen, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency, formatDateRange } from "@/lib/formatters";
import type { Project } from "@/lib/api";

export interface ProjectsTableProps {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  hasActiveFilters: boolean;
  onRetry: () => void;
  onClearFilters: () => void;
  onNewProject: () => void;
  onDeleteProject: (project: Project) => void;
}

const SKELETON_COLUMNS: { className: string }[] = [
  { className: "w-[200px]" },
  { className: "w-[140px]" },
  { className: "w-[90px]" },
  { className: "w-[110px]" },
  { className: "w-[130px]" },
  { className: "w-[50px]" },
  { className: "w-[50px]" },
  { className: "w-[40px]" },
];

export function ProjectsTable({
  projects,
  isLoading,
  isError,
  hasActiveFilters,
  onRetry,
  onClearFilters,
  onNewProject,
  onDeleteProject,
}: ProjectsTableProps) {
  if (isLoading) {
    return (
      <div className="overflow-x-auto rounded-lg border border-[#334155]">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#334155] bg-transparent">
              <TableHead className="h-9 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
                Project name
              </TableHead>
              <TableHead className="h-9 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
                Client
              </TableHead>
              <TableHead className="h-9 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
                Status
              </TableHead>
              <TableHead className="h-9 text-right text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
                Value
              </TableHead>
              <TableHead className="h-9 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
                Timeline
              </TableHead>
              <TableHead className="h-9 text-right text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
                Bids
              </TableHead>
              <TableHead className="h-9 text-right text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
                Violations
              </TableHead>
              <TableHead className="h-9 w-10 text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 8 }).map((_, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="h-11 border-b border-[#1E293B] bg-transparent last:border-0"
              >
                {SKELETON_COLUMNS.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={colIndex === 3 || colIndex === 5 || colIndex === 6 ? "text-right" : ""}
                  >
                    <Skeleton
                      className={column.className}
                      style={{ height: 14 }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-[#334155] bg-[#0D1117] px-6 py-16">
        <FolderOpen size={32} strokeWidth={1.5} className="text-[#334155]" />
        <p className="mt-3 text-[14px] text-[#94A3B8]">
          Failed to load projects
        </p>
        <p className="mt-1 text-[13px] text-[#64748B]">
          Check your connection and try again.
        </p>
        <Button
          variant="outline"
          onClick={onRetry}
          className="mt-4 h-8 rounded-md border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC]"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-[#334155] bg-[#0D1117] px-6 py-16">
        <FolderOpen size={32} strokeWidth={1.5} className="text-[#334155]" />
        <p className="mt-3 text-[14px] text-[#94A3B8]">
          {hasActiveFilters
            ? "No projects match your search"
            : "No projects found"}
        </p>
        <p className="mt-1 text-[13px] text-[#64748B]">
          {hasActiveFilters
            ? "Try adjusting your filters or clearing them."
            : "Create your first project to get started"}
        </p>
        {hasActiveFilters ? (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="mt-4 h-8 rounded-md border-[#334155] bg-[#111827] px-3 text-[13px] text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC]"
          >
            Clear filters
          </Button>
        ) : (
          <Button
            onClick={onNewProject}
            className="mt-4 h-8 rounded-md bg-[#00D4AA] px-3 text-[13px] font-medium text-[#0B0F19] hover:brightness-110"
          >
            New project
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-[#334155]">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#334155] bg-transparent">
            <TableHead className="h-9 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
              Project name
            </TableHead>
            <TableHead className="h-9 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
              Client
            </TableHead>
            <TableHead className="h-9 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
              Status
            </TableHead>
            <TableHead className="h-9 text-right text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
              Value
            </TableHead>
            <TableHead className="h-9 text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
              Timeline
            </TableHead>
            <TableHead className="h-9 text-right text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
              Bids
            </TableHead>
            <TableHead className="h-9 text-right text-[12px] font-medium tracking-wider text-[#94A3B8] uppercase">
              Violations
            </TableHead>
            <TableHead className="h-9 w-10 text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              className="h-11 border-b border-[#1E293B] bg-transparent transition-colors last:border-0 hover:bg-[#1E293B]"
            >
              <TableCell className="min-w-[200px] px-4 py-0">
                <Link
                  href={`/projects/${project.id}`}
                  className="block w-full"
                >
                  <span className="block truncate text-[13px] font-medium text-[#F8FAFC]">
                    {project.name}
                  </span>
                  {project.location && (
                    <span className="mt-0.5 block truncate text-[11px] text-[#64748B]">
                      {project.location}
                    </span>
                  )}
                </Link>
              </TableCell>
              <TableCell className="px-4 py-0 text-[13px] text-[#94A3B8]">
                {project.client_name}
              </TableCell>
              <TableCell className="px-4 py-0">
                <StatusBadge status={project.status} />
              </TableCell>
              <TableCell className="px-4 py-0 text-right text-[13px] font-medium text-[#F8FAFC] tabular-nums">
                {formatCurrency(project.contract_value, project.currency)}
              </TableCell>
              <TableCell className="px-4 py-0 text-[12px] text-[#64748B] whitespace-nowrap">
                {formatDateRange(project.start_date, project.end_date)}
              </TableCell>
              <TableCell
                className={
                  project.bid_count > 0
                    ? "px-4 py-0 text-right text-[13px] text-[#F8FAFC] tabular-nums"
                    : "px-4 py-0 text-right text-[13px] text-[#94A3B8] tabular-nums"
                }
              >
                {project.bid_count}
              </TableCell>
              <TableCell className="px-4 py-0 text-right">
                {project.open_violation_count > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-[#EF4444] tabular-nums">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
                    {project.open_violation_count}
                  </span>
                ) : (
                  <span className="text-[13px] text-[#64748B] tabular-nums">
                    0
                  </span>
                )}
              </TableCell>
              <TableCell className="px-2 py-0 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Actions for ${project.name}`}
                      className="rounded-md text-[#64748B] hover:bg-[#262626] hover:text-[#F8FAFC]"
                    >
                      <MoreHorizontal size={14} strokeWidth={1.5} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="min-w-[150px] rounded-md border-[#334155] bg-[#111827] p-1 text-[13px] text-[#94A3B8]"
                  >
                    <DropdownMenuItem
                      className="rounded-md px-2 py-1.5 text-[13px] text-[#94A3B8] focus:bg-[#1E293B] focus:text-[#F8FAFC]"
                    >
                      <Pencil size={14} strokeWidth={1.5} />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-md px-2 py-1.5 text-[13px] text-[#F59E0B] focus:bg-[#1E293B] focus:text-[#F59E0B]"
                    >
                      <Archive size={14} strokeWidth={1.5} />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#1E293B]" />
                    <DropdownMenuItem
                      onSelect={() => onDeleteProject(project)}
                      className="rounded-md px-2 py-1.5 text-[13px] text-[#EF4444] focus:bg-[#1E293B] focus:text-[#EF4444]"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
