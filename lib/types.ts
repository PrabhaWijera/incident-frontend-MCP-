export type IncidentStatus = "open" | "investigating" | "resolved" | "auto-resolved";
export type IncidentSeverity = "low" | "medium" | "high";
export type IncidentCategory = "performance" | "database" | "authentication" | "network" | "deployment";
export type LogLevel = "info" | "warning" | "error";

export interface TimelineEvent {
  timestamp: string;
  event: string;
  status: string;
  actor: "system" | "engineer" | "ai";
  details: Record<string, any>;
}

export interface SuggestedAction {
  action: string;
  description: string;
  confidence: number;
  requiresApproval: boolean;
}

export interface AIAnalysis {
  rootCause?: string;
  rootCauseProbability?: number;
  relatedIncidentIds?: string[];
  suggestedActions?: SuggestedAction[];
  trendAnalysis?: {
    isDegrading: boolean;
    degradationRate: number;
  };
  aiSeverity?: IncidentSeverity;
  aiCategory?: IncidentCategory;
  statusSuggestion?: "needs_investigation" | "likely_root_cause_identified" | "ready_for_resolution";
}

/**
 * Complete AI analysis response from MCP analyzeIncident tool
 * This matches the structure returned by the backend aiAnalysis.service.js
 */
export interface IncidentAnalysisResponse {
  incident: {
    id: string;
    title: string;
    status: IncidentStatus;
    severity: IncidentSeverity;
    category: IncidentCategory;
  };
  aiAnalysis: AIAnalysis;
  explanation: string;
  logsAnalyzed: number;
  errorCount: number;
  warningCount: number;
}

export interface Service {
  _id: string;
  name: string;
  url: string;
  healthEndpoint?: string;
  description?: string;
  category: "api" | "database" | "cache" | "queue" | "storage" | "monitoring" | "other";
  enabled: boolean;
  metadata?: {
    tags?: string[];
    owner?: string;
    team?: string;
    environment?: "production" | "staging" | "development";
  };
  createdAt: string;
  updatedAt: string;
}

export interface Incident {
  _id: string;
  title: string;
  description: string;
  serviceId?: string;
  serviceName?: string;
  service?: Service;
  severity: IncidentSeverity;
  category: IncidentCategory;
  source: "system" | "engineer";
  status: IncidentStatus;
  /**
   * @deprecated AI analysis is now on-demand only via MCP tools.
   * Use latestAnalysis from analyzeIncident MCP tool instead.
   */
  aiAnalysis?: AIAnalysis;
  timeline?: TimelineEvent[];
  resolvedAt?: string;
  resolutionTime?: number;
  resolvedBy?: "system" | "engineer" | "ai-auto";
  metadata: {
    firstDetectedAt: string;
    lastUpdatedAt: string;
    logCount: number;
    errorCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Log {
  _id: string;
  incidentId: string;
  message: string;
  level: LogLevel;
  createdAt: string;
  updatedAt: string;
}

export interface SystemStats {
  summary: {
    totalIncidents: number;
    openIncidents: number;
    resolvedIncidents: number;
    totalLogs: number;
  };
}

export interface IncidentDetail extends Incident {
  logs: Log[];
  summary: {
    totalLogs: number;
    errorLogs: number;
    warningLogs: number;
    duration: number;
  };
}

