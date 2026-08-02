"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  api,
  createProject,
  deleteBid,
  deleteProject,
  fetchBidDetail,
  fetchBids,
  fetchProjects,
  fetchViolations,
  resolveViolation,
  updateBidStatus,
  type ActivityListResponse,
  type Bid,
  type BidFilters,
  type BidStatus,
  type CreateProjectInput,
  type DashboardStats,
  type ProjectFilters,
  type ProjectListResponse,
  type Violation,
  type ViolationFilters,
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

export function useBids(filters: BidFilters) {
  return useQuery({
    queryKey: [
      "bids",
      "list",
      filters.search,
      filters.statuses.join(","),
      filters.sortBy,
      filters.sortOrder,
      filters.limit,
      filters.offset,
    ],
    queryFn: () => fetchBids(filters),
    placeholderData: (previous) => previous,
  });
}

export function useDeleteBid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bidId: string) => deleteBid(bidId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["bids"] });
    },
  });
}

export function useBidDetail(bidId: string) {
  return useQuery({
    queryKey: ["bid", bidId],
    queryFn: () => fetchBidDetail(bidId),
    enabled: !!bidId,
  });
}

export function useUpdateBidStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BidStatus }) =>
      updateBidStatus(id, status),
    onSuccess: (bid: Bid) => {
      void queryClient.invalidateQueries({ queryKey: ["bids"] });
      void queryClient.setQueryData(["bid", bid.id], bid);
    },
  });
}

export function useViolations(filters: ViolationFilters) {
  return useQuery({
    queryKey: [
      "violations",
      filters.search,
      filters.severities.join(","),
      filters.statuses.join(","),
      filters.standards.join(","),
      filters.sortBy,
      filters.sortOrder,
      filters.limit,
      filters.offset,
    ],
    queryFn: () => fetchViolations(filters),
    placeholderData: (previous) => previous,
  });
}

export function useResolveViolation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (violationId: string) => resolveViolation(violationId),
    onSuccess: (violation: Violation) => {
      void queryClient.invalidateQueries({ queryKey: ["violations"] });
      void queryClient.setQueryData(["violation", violation.id], violation);
    },
  });
}
