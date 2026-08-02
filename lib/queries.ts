"use client";

import { useQuery } from "@tanstack/react-query";
import {
  api,
  type ActivityListResponse,
  type DashboardStats,
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
