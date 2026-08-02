import { useState, useEffect } from "react";
import type { Project, Drawing, Bid, Violation, RFI } from "@/app/(dashboard)/projects/[id]/page";

// Mock data generators for development
function generateMockProject(id: string): Project {
  return {
    id,
    name: `Project ${id}`,
    client_name: "Acme Corporation",
    status: "active",
    contract_value: 2500000,
    currency: "USD",
    location: "San Francisco, CA",
    description: "Commercial office building renovation",
    start_date: "2024-01-15T00:00:00Z",
    end_date: "2025-06-30T00:00:00Z",
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2024-12-15T14:30:00Z",
  };
}

function generateMockDrawings(count: number): Drawing[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `drawing-${i + 1}`,
    file_name: `building_model_v${i + 1}.ifc`,
    file_size: Math.floor(Math.random() * 100000000) + 1000000,
    parse_status: ["pending", "parsing", "completed", "failed"][Math.floor(Math.random() * 4)] as Drawing["parse_status"],
    summary: {
      total_elements: Math.floor(Math.random() * 5000) + 500,
      total_wall_volume_m3: Math.floor(Math.random() * 1000) + 100,
      total_floor_area_m2: Math.floor(Math.random() * 5000) + 500,
      total_column_count: Math.floor(Math.random() * 100) + 20,
      total_door_count: Math.floor(Math.random() * 200) + 50,
      total_window_count: Math.floor(Math.random() * 300) + 100,
    },
    created_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
  }));
}

function generateMockBids(count: number): Bid[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `bid-${i + 1}`,
    bid_name: `Bid Package ${i + 1}`,
    status: ["draft", "pending_review", "approved", "submitted", "won", "lost"][Math.floor(Math.random() * 6)] as Bid["status"],
    grand_total: Math.floor(Math.random() * 500000) + 50000,
    currency: "USD",
    created_at: new Date(Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000)).toISOString(),
  }));
}

function generateMockViolations(count: number): Violation[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `violation-${i + 1}`,
    code: `BC-${String(i + 1).padStart(4, "0")}`,
    description: "Building code compliance issue detected",
    severity: ["critical", "major", "minor"][Math.floor(Math.random() * 3)] as Violation["severity"],
    element_name: `Element ${i + 1}`,
    status: ["open", "resolved"][Math.floor(Math.random() * 2)] as Violation["status"],
    created_at: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
  }));
}

function generateMockRFIs(count: number): RFI[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `rfi-${i + 1}`,
    title: `Request for Information #${i + 1}`,
    status: ["draft", "sent", "responded", "closed"][Math.floor(Math.random() * 4)] as RFI["status"],
    assigned_to: i % 3 === 0 ? `Engineer ${i + 1}` : null,
    created_at: new Date(Date.now() - Math.floor(Math.random() * 45 * 24 * 60 * 60 * 1000)).toISOString(),
  }));
}

export function useProjectDetail(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    const timer = setTimeout(() => {
      try {
        const mockProject = generateMockProject(id);
        setProject(mockProject);
        setIsLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Failed to load project"));
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const refetch = () => {
    setIsLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      try {
        const mockProject = generateMockProject(id);
        setProject(mockProject);
        setIsLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Failed to load project"));
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  };

  return { project, isLoading, error, refetch };
}

export function useProjectDrawings(id: string) {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDrawings(generateMockDrawings(Math.floor(Math.random() * 5) + 2));
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  return { drawings, isLoading };
}

export function useProjectBids(id: string) {
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setBids(generateMockBids(Math.floor(Math.random() * 4) + 1));
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [id]);

  return { bids, isLoading };
}

export function useProjectViolations(id: string) {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setViolations(generateMockViolations(Math.floor(Math.random() * 6) + 1));
      setIsLoading(false);
    }, 650);
    return () => clearTimeout(timer);
  }, [id]);

  return { violations, isLoading };
}

export function useProjectRFIs(id: string) {
  const [rfis, setRfis] = useState<RFI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setRfis(generateMockRFIs(Math.floor(Math.random() * 5) + 1));
      setIsLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, [id]);

  return { rfis, isLoading };
}
