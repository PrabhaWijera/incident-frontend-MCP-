"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { incidentsApi, aiApi } from "@/lib/api";
import { IncidentDetail, IncidentStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  XCircle,
  Brain,
} from "lucide-react";
import { formatDuration, safeFormatDate, formatTimelineDetailsForDisplay } from "@/lib/utils";
import Link from "next/link";

export default function IncidentDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [incident, setIncident] = useState<IncidentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const fetchIncident = async () => {
    try {
      const data = await incidentsApi.getById(id);
      setIncident(data);
    } catch (error) {
      console.error("Error fetching incident:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchIncident();
      const interval = setInterval(fetchIncident, 10000);
      return () => clearInterval(interval);
    }
  }, [id]);

  const handleStatusUpdate = async (status: IncidentStatus) => {
    setUpdating(true);
    try {
      await incidentsApi.updateStatus(id, status);
      await fetchIncident();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      await aiApi.analyzeIncident(id);
      await fetchIncident();
    } catch (error) {
      console.error("Error analyzing incident:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApproveAction = async (actionIndex: number) => {
    try {
      await incidentsApi.approveAction(id, actionIndex);
      await fetchIncident();
    } catch (error) {
      console.error("Error approving action:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading incident...</p>
        </div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Incident not found</h2>
            <Link href="/incidents">
              <Button variant="outline" className="mt-4">
                Back to Incidents
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/incidents">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Button
            onClick={fetchIncident}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{incident.title}</CardTitle>
                    <p className="text-gray-600">{incident.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        incident.severity === "high"
                          ? "error"
                          : incident.severity === "medium"
                          ? "warning"
                          : "info"
                      }
                    >
                      {incident.severity}
                    </Badge>
                    <Badge
                      variant={
                        incident.status === "resolved" ||
                        incident.status === "auto-resolved"
                          ? "success"
                          : incident.status === "investigating"
                          ? "info"
                          : "warning"
                      }
                    >
                      {incident.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {incident.serviceName && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Service</p>
                      <Badge variant="info">{incident.serviceName}</Badge>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Category</p>
                    <p className="font-medium capitalize">{incident.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Source</p>
                    <p className="font-medium capitalize">{incident.source}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Created</p>
                    <p className="font-medium text-sm">
                      {safeFormatDate(incident.createdAt, "MMM d, yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Duration</p>
                    <p className="font-medium">
                      {formatDuration(incident.summary.duration)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {incident.status !== "resolved" && incident.status !== "auto-resolved" && (
                    <>
                      {incident.status !== "investigating" && (
                        <Button
                          onClick={() => handleStatusUpdate("investigating")}
                          disabled={updating}
                          variant="outline"
                          size="sm"
                        >
                          Mark Investigating
                        </Button>
                      )}
                      <Button
                        onClick={() => handleStatusUpdate("resolved")}
                        disabled={updating}
                        variant="primary"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Resolve
                      </Button>
                    </>
                  )}
                  <Button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    variant="primary"
                    size="sm"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    {analyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      "Run AI Analysis"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {incident.aiAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    AI Analysis
                    <Badge variant="info" className="ml-2 text-xs">
                      Powered by NVIDIA NIM
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {incident.aiAnalysis.rootCause && (
                    <div className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-900">
                          Root Cause Analysis
                        </p>
                        {incident.aiAnalysis.rootCauseProbability && (
                          <Badge
                            variant={
                              incident.aiAnalysis.rootCauseProbability >= 0.8
                                ? "success"
                                : incident.aiAnalysis.rootCauseProbability >= 0.6
                                ? "warning"
                                : "default"
                            }
                            className="text-xs"
                          >
                            {Math.round(incident.aiAnalysis.rootCauseProbability * 100)}%
                            confidence
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 bg-blue-50 p-4 rounded-lg leading-relaxed">
                        {incident.aiAnalysis.rootCause}
                      </p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        Analyzed by AI (Llama 3.1 / Mistral models)
                      </p>
                    </div>
                  )}

                  {incident.aiAnalysis.suggestedActions &&
                    incident.aiAnalysis.suggestedActions.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold text-gray-900">
                            AI Suggested Actions
                          </p>
                          <Badge variant="default" className="text-xs">
                            {incident.aiAnalysis.suggestedActions.length} action
                            {incident.aiAnalysis.suggestedActions.length !== 1 ? "s" : ""}
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          {incident.aiAnalysis.suggestedActions.map((action, index) => (
                            <div
                              key={index}
                              className="border border-blue-200 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-gray-50 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="font-semibold text-sm text-gray-900">
                                      {action.action}
                                    </p>
                                    <Badge
                                      variant={
                                        action.confidence >= 0.8
                                          ? "success"
                                          : action.confidence >= 0.6
                                          ? "warning"
                                          : "default"
                                      }
                                      className="text-xs"
                                    >
                                      {Math.round(action.confidence * 100)}% confidence
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                                    {action.description}
                                  </p>
                                </div>
                              </div>
                              {action.requiresApproval && (
                                <Button
                                  onClick={() => handleApproveAction(index)}
                                  variant="primary"
                                  size="sm"
                                  className="mt-2"
                                >
                                  Approve & Execute Action
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                {incident.timeline && incident.timeline.length > 0 ? (
                  <div className="space-y-4">
                    {(() => {
                      const reversedTimeline = incident.timeline.slice().reverse();
                      return reversedTimeline.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            {index < reversedTimeline.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-200 mt-1" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{event.event}</span>
                              <Badge variant="default" className="text-xs">
                                {event.actor}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">
                              {safeFormatDate(event.timestamp, "MMM d, yyyy HH:mm:ss")}
                            </p>
                            {event.details && Object.keys(event.details).length > 0 && (() => {
                              const formattedDetails = formatTimelineDetailsForDisplay(event.details);
                              if (formattedDetails.length === 0) {
                                return null;
                              }
                              return (
                                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-1 space-y-1">
                                  {formattedDetails.map((item, idx) => (
                                    <div key={idx} className="flex gap-2">
                                      <span className="font-medium text-gray-700">{item.key}:</span>
                                      <span className="text-gray-600 break-words">{item.value}</span>
                                    </div>
                                  ))}
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No timeline events</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logs ({incident.logs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {incident.logs.length > 0 ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {incident.logs.map((log) => (
                      <div
                        key={log._id}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded border border-gray-200"
                      >
                        <Badge
                          variant={
                            log.level === "error"
                              ? "error"
                              : log.level === "warning"
                              ? "warning"
                              : "info"
                          }
                          className="text-xs"
                        >
                          {log.level}
                        </Badge>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{log.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {safeFormatDate(log.createdAt, "MMM d, yyyy HH:mm:ss")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No logs available</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Logs</p>
                  <p className="text-2xl font-bold">{incident.summary.totalLogs}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Error Logs</p>
                  <p className="text-2xl font-bold text-red-600">
                    {incident.summary.errorLogs}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Warning Logs</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {incident.summary.warningLogs}
                  </p>
                </div>
                {incident.resolvedAt && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Resolved At</p>
                    <p className="text-sm font-medium">
                      {safeFormatDate(incident.resolvedAt, "MMM d, yyyy HH:mm")}
                    </p>
                  </div>
                )}
                {incident.resolvedBy && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Resolved By</p>
                    <p className="text-sm font-medium capitalize">{incident.resolvedBy}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

