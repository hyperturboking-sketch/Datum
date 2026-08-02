"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  api,
  createProject,
  deleteProject,
  fetchProjects,
  type ActivityListResponse,
  type CreateProjectInput,
  type DashboardStats,
  type ProjectFilters,
  type ProjectListResponse,
} from "@/lib/api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const { data } = await api.get<DashboardStats>("/dashboard/stats");
      return data;
    },
  });
}

export function useRecentProjects() {
  return useQuery({
    queryKey: ["projects", "recent"],
    queryFn: async () => {
      const { data } = await api.get<ProjectListResponse>("/projects", {
        params: { limit: 5, offset: 0 },
      });
      return data;
    },
  });
}

export function useActivity() {
  return useQuery({
    queryKey: ["activity"],
    queryFn: async () => {
      const { data } = await api.get<ActivityListResponse>("/activity", {
        params: { limit: 10 },
      });
      return data;
    },
  });
}

export function useProjects(filters: ProjectFilters) {
  return useQuery({
    queryKey: [
      "projects",
      "list",
      filters.search,
      filters.statuses.join(","),
      filters.sortBy,
      filters.sortOrder,
      filters.limit,
      filters.offset,
    ],
    queryFn: () => fetchProjects(filters),
    placeholderData: (previous) => previous,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateProjectInput) => createProject(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
