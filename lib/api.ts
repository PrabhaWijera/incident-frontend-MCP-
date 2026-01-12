import axios from "axios";
import type {
  Incident,
  IncidentDetail,
  SystemStats,
  Log,
  Service,
  IncidentStatus,
  IncidentSeverity,
  IncidentCategory,
  IncidentAnalysisResponse,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Incidents API
export const incidentsApi = {
  getAll: async (filters?: {
    status?: IncidentStatus;
    severity?: IncidentSeverity;
    category?: IncidentCategory;
    serviceId?: string;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.severity) params.append("severity", filters.severity);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.serviceId) params.append("serviceId", filters.serviceId);
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const response = await api.get(`/api/incidents?${params.toString()}`);
    return response.data as { count: number; incidents: Incident[] };
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/incidents/${id}`);
    return response.data as IncidentDetail;
  },

  updateStatus: async (id: string, status: IncidentStatus, notes?: string) => {
    const response = await api.patch(`/api/incidents/${id}/status`, {
      status,
      notes,
    });
    return response.data as Incident;
  },

  approveAction: async (id: string, action: { action: string; description: string; confidence?: number; requiresApproval?: boolean }) => {
    const response = await api.post(`/api/incidents/${id}/approve-action`, {
      action,
    });
    return response.data;
  },

  getHistory: async (id: string) => {
    const response = await api.get(`/api/incidents/${id}/history`);
    return response.data;
  },
};

// Logs API
export const logsApi = {
  getByIncidentId: async (incidentId: string) => {
    const response = await api.get(`/api/logs/${incidentId}`);
    return response.data as Log[];
  },
};

// System API
export const systemApi = {
  getStats: async () => {
    const response = await api.get("/api/system/stats");
    return response.data as SystemStats;
  },

  startMonitoring: async () => {
    const response = await api.post("/api/system/monitoring/start");
    return response.data;
  },

  stopMonitoring: async () => {
    const response = await api.post("/api/system/monitoring/stop");
    return response.data;
  },

  getMonitoringStatus: async () => {
    const response = await api.get("/api/system/monitoring/status");
    return response.data;
  },
};

// AI API (via MCP JSON-RPC)
// Uses Model Context Protocol (MCP) JSON-RPC 2.0 interface for read-only AI analysis
export const aiApi = {
  /**
   * Analyze incident using NVIDIA NIM AI via MCP tools
   * 
   * This calls the backend MCP JSON-RPC endpoint which provides read-only AI analysis.
   * The analysis never modifies database state - it only returns recommendations.
   * 
   * MCP Response Format:
   * {
   *   jsonrpc: "2.0",
   *   id: ...,
   *   result: {
   *     content: [
   *       {
   *         type: "json",
   *         data: { ...analysis result... }
   *       }
   *     ]
   *   }
   * }
   * 
   * @param incidentId - MongoDB ObjectId of the incident to analyze
   * @returns Analysis result object with AI insights, root cause, suggested actions, etc.
   * @throws Error if MCP tool call fails
   */
  analyzeIncident: async (incidentId: string): Promise<IncidentAnalysisResponse> => {
    const response = await api.post("/api/mcp/jsonrpc", {
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: {
        name: "analyzeIncident",
        arguments: { incidentId },
      },
    });

    // Extract data from MCP JSON-RPC response structure
    const resultData = response.data?.result?.content?.[0]?.data;
    
    if (!resultData) {
      // Check for JSON-RPC error
      if (response.data?.error) {
        throw new Error(response.data.error.message || "MCP tool call failed");
      }
      throw new Error("Invalid MCP response: missing result data");
    }

    // Data is already parsed JSON from backend
    return resultData as IncidentAnalysisResponse;
  },
};

// Services API
export const servicesApi = {
  getAll: async (filters?: {
    enabled?: boolean;
    category?: string;
    environment?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.enabled !== undefined) params.append("enabled", filters.enabled.toString());
    if (filters?.category) params.append("category", filters.category);
    if (filters?.environment) params.append("environment", filters.environment);

    const response = await api.get(`/api/services?${params.toString()}`);
    return response.data as { count: number; services: Service[] };
  },

  getById: async (id: string) => {
    const response = await api.get(`/api/services/${id}`);
    return response.data as Service;
  },

  create: async (service: {
    name: string;
    url: string;
    healthEndpoint?: string;
    description?: string;
    category?: string;
    metadata?: Record<string, any>;
  }) => {
    const response = await api.post("/api/services", service);
    return response.data;
  },

  update: async (id: string, updates: Partial<Service>) => {
    const response = await api.patch(`/api/services/${id}`, updates);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/services/${id}`);
    return response.data;
  },

  test: async (id: string) => {
    const response = await api.post(`/api/services/${id}/test`);
    return response.data;
  },
};

