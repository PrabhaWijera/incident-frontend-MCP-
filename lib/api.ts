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

  approveAction: async (id: string, actionIndex: number) => {
    const response = await api.post(`/api/incidents/${id}/approve-action`, {
      actionIndex,
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
  createEvent: async (type: "CPU_SPIKE" | "DB_TIMEOUT" | "AUTH_FAILURE", value?: number) => {
    const response = await api.post("/api/system/events", { type, value });
    return response.data;
  },

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

// AI API
export const aiApi = {
  analyzeIncident: async (incidentId: string) => {
    const response = await api.get(`/api/ai/analysis/${incidentId}`);
    return response.data;
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

