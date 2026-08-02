import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export type ParseStatus = "pending" | "parsing" | "completed" | "failed";

export interface IfcSummary {
  total_elements: number;
  total_wall_volume_m3: number;
  total_floor_area_m2: number;
  total_column_count: number;
  total_beam_length_m: number;
  total_door_count: number;
  total_window_count: number;
  total_space_area_m2: number;
  materials: Record<string, number>;
}

export interface IfcUploadResponse {
  id: string;
  file_name: string;
  storage_url: string;
  file_size_bytes: number;
  parse_status: ParseStatus;
  summary: IfcSummary | null;
  created_at: string;
}

export interface IfcUploadListResponse {
  uploads: IfcUploadResponse[];
  total: number;
}

export interface IfcElementResponse {
  global_id: string;
  element_type: string;
  name: string | null;
  description: string | null;
  material: string | null;
  length_m: number | null;
  width_m: number | null;
  height_m: number | null;
  area_m2: number | null;
  volume_m3: number | null;
  count: number;
  properties: Record<string, unknown>;
}

export interface IfcUploadDetailResponse extends IfcUploadResponse {
  extracted_data: IfcElementResponse[];
}

export interface DashboardStats {
  active_projects: number;
  bids_in_progress: number;
  open_violations: number;
  open_rfis: number;
  projects_delta: string;
  bids_pending_review: number;
  critical_violations: number;
  overdue_rfis: number;
}

export type ProjectStatus =
  | "active"
  | "planning"
  | "completed"
  | "on_hold"
  | "archived";

export type ProjectSortBy = "updated_at" | "name" | "contract_value" | "start_date";
export type ProjectSortOrder = "asc" | "desc";

export interface Project {
  id: string;
  name: string;
  client_name: string;
  status: ProjectStatus;
  contract_value: number;
  currency: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  updated_at: string;
  created_at: string;
  bid_count: number;
  open_violation_count: number;
}

export interface ProjectFilters {
  search: string;
  statuses: ProjectStatus[];
  sortBy: ProjectSortBy;
  sortOrder: ProjectSortOrder;
  limit: number;
  offset: number;
}

export interface CreateProjectInput {
  name: string;
  client_name: string;
  contract_value: number;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
}

export type ActivityType =
  | "bid_completed"
  | "violation_flagged"
  | "rfi_responded"
  | "esg_generated"
  | "compliance_checked";

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  project_name: string;
  created_at: string;
}

export interface ActivityListResponse {
  activities: Activity[];
}

export interface ApiErrorDetail {
  detail?: string | Array<{ msg: string } | string>;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("datum.access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorDetail>(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      return detail
        .map((d) => (typeof d === "string" ? d : d.msg ?? ""))
        .filter(Boolean)
        .join(", ");
    }
    if (error.response?.status) {
      return `Request failed with status ${error.response.status}`;
    }
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
}

export async function uploadIfcFile(
  file: File,
  projectId: string | null,
  onProgress?: (percent: number) => void
): Promise<IfcUploadResponse> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await api.post<IfcUploadResponse>("/ifc/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
    params: projectId ? { project_id: projectId } : {},
    onUploadProgress: (e) => {
      if (e.total && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    },
  });
  return data;
}

export async function fetchIfcUploads(
  limit = 50,
  offset = 0
): Promise<IfcUploadListResponse> {
  const { data } = await api.get<IfcUploadListResponse>("/ifc/uploads", {
    params: { limit, offset },
  });
  return data;
}

export async function fetchIfcUpload(
  uploadId: string
): Promise<IfcUploadDetailResponse> {
  const { data } = await api.get<IfcUploadDetailResponse>(`/ifc/uploads/${uploadId}`);
  return data;
}

export async function deleteIfcUpload(uploadId: string): Promise<void> {
  await api.delete(`/ifc/uploads/${uploadId}`);
}

export async function runBidEstimation(
  projectId: string,
  ifcUploadId: string
): Promise<void> {
  await api.post("/bids", { project_id: projectId, ifc_upload_id: ifcUploadId });
}

export async function fetchProjects(
  filters: ProjectFilters
): Promise<ProjectListResponse> {
  const params: Record<string, unknown> = {
    limit: filters.limit,
    offset: filters.offset,
    sort_by: filters.sortBy,
    sort_order: filters.sortOrder,
  };
  if (filters.search.trim()) {
    params.search = filters.search.trim();
  }
  if (filters.statuses.length > 0) {
    params.status = filters.statuses.join(",");
  }
  const { data } = await api.get<ProjectListResponse>("/projects", { params });
  return data;
}

export async function createProject(
  input: CreateProjectInput
): Promise<Project> {
  const { data } = await api.post<Project>("/projects", input);
  return data;
}

export async function deleteProject(projectId: string): Promise<void> {
  await api.delete(`/projects/${projectId}`);
}

export type BidStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "submitted"
  | "won"
  | "lost"
  | "archived";

export type BidSortBy =
  | "updated_at"
  | "created_at"
  | "grand_total"
  | "bid_name";
export type BidSortOrder = "asc" | "desc";

export interface Bid {
  id: string;
  project_id: string;
  project_name: string;
  client_name: string;
  bid_name: string;
  status: BidStatus;
  grand_total: number;
  currency: string;
  line_item_count: number;
  pdf_url: string | null;
  created_by_name: string;
  created_at: string;
  updated_at: string;
}

export interface BidFilters {
  search: string;
  statuses: BidStatus[];
  sortBy: BidSortBy;
  sortOrder: BidSortOrder;
  limit: number;
  offset: number;
}

export interface BidListResponse {
  bids: Bid[];
  total: number;
}

export async function fetchBids(filters: BidFilters): Promise<BidListResponse> {
  const params: Record<string, unknown> = {
    limit: filters.limit,
    offset: filters.offset,
    sort_by: filters.sortBy,
    sort_order: filters.sortOrder,
  };
  if (filters.search.trim()) {
    params.search = filters.search.trim();
  }
  if (filters.statuses.length > 0) {
    params.status = filters.statuses.join(",");
  }
  const { data } = await api.get<BidListResponse>("/bids", { params });
  return data;
}

export async function deleteBid(bidId: string): Promise<void> {
  await api.delete(`/bids/${bidId}`);
}
