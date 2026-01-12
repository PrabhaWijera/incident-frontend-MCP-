"use client";

import { useEffect, useState } from "react";
import { systemApi, incidentsApi, servicesApi } from "@/lib/api";
import { SystemStats, Incident, Service } from "@/lib/types";
import { StatsCard } from "@/components/StatsCard";
import { IncidentCard } from "@/components/IncidentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  AlertTriangle,
  CheckCircle,
  Activity,
  FileText,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatDuration } from "@/lib/utils";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [statsData, incidentsData, servicesData] = await Promise.all([
        systemApi.getStats(),
        incidentsApi.getAll({ limit: 5 }),
        servicesApi.getAll({ enabled: true }),
      ]);
      setStats(statsData);
      setRecentIncidents(incidentsData.incidents);
      setServices(servicesData.services);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Incident Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor and manage system incidents</p>
          </div>
          <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Incidents"
                value={stats.summary.totalIncidents}
                icon={Activity}
              />
              <StatsCard
                title="Open Incidents"
                value={stats.summary.openIncidents}
                icon={AlertTriangle}
                variant="warning"
              />
              <StatsCard
                title="Resolved"
                value={stats.summary.resolvedIncidents}
                icon={CheckCircle}
                variant="success"
              />
              <StatsCard
                title="Total Logs"
                value={stats.summary.totalLogs}
                icon={FileText}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Incidents</CardTitle>
                    <Link href="/incidents">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentIncidents.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No incidents found
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {recentIncidents.map((incident) => (
                        <IncidentCard key={incident._id} incident={incident} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>System Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      System incidents are now generated from real monitored services via health
                      checks. Use the demo company server to create realistic failures instead of
                      synthetic /api/system/events calls.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
        </div>
    </div>
  );
}
