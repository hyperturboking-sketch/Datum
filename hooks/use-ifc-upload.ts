"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";
import {
  deleteIfcUpload,
  fetchIfcUpload,
  fetchIfcUploads,
  uploadIfcFile,
} from "@/lib/api";

export const ifcUploadsKey = ["ifc", "uploads"];

export function useIfcUploads() {
  return useQuery({
    queryKey: ifcUploadsKey,
    queryFn: () => fetchIfcUploads(),
  });
}

export function useUploadIfc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      file,
      projectId,
      onProgress,
    }: {
      file: File;
      projectId: string | null;
      onProgress?: (percent: number) => void;
    }) => uploadIfcFile(file, projectId, onProgress),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ifcUploadsKey });
    },
  });
}

export function useIfcUpload(uploadId: string | null) {
  const enabled = Boolean(uploadId);
  const { data, ...rest } = useQuery({
    queryKey: ["ifc", "uploads", uploadId],
    queryFn: () => fetchIfcUpload(uploadId as string),
    enabled,
    refetchInterval: (query) => {
      if (!enabled) return false;
      const status = query.state.data?.parse_status;
      return status === "pending" || status === "parsing" ? 2000 : false;
    },
  });

  const isDone = useMemo(() => {
    if (!data) return false;
    return data.parse_status === "completed" || data.parse_status === "failed";
  }, [data]);

  return { data, isDone, ...rest };
}

export function useDeleteIfc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uploadId: string) => deleteIfcUpload(uploadId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ifcUploadsKey });
    },
  });
}
