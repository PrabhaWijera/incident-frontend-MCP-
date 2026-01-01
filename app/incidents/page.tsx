"use client";

import { useEffect, useState } from "react";
import { incidentsApi, servicesApi } from "@/lib/api";
import { Incident, IncidentStatus, IncidentSeverity, IncidentCategory, Service } from "@/lib/types";
import { IncidentCard } from "@/components/IncidentCard";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RefreshCw, Filter } from "lucide-react";
import Link from "next/link";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<{
    status?: IncidentStatus;
    severity?: IncidentSeverity;
    category?: IncidentCategory;
    serviceId?: string;
  }>({});

  const fetchIncidents = async () => {
    try {
      const data = await incidentsApi.getAll({ ...filters, limit: 50 });
      setIncidents(data.incidents);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchServices = async () => {
    try {
      const data = await servicesApi.getAll();
      setServices(data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 30000);
    return () => clearInterval(interval);
  }, [filters]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchIncidents();
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading incidents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Incidents</h1>
            <p className="text-gray-600 mt-1">
              {incidents.length} incident{incidents.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Link href="/">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>

              <div className="flex gap-2 flex-wrap">
                <select
                  value={filters.status || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      status: e.target.value as IncidentStatus | undefined,
                    })
                  }
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="open">Open</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                  <option value="auto-resolved">Auto-Resolved</option>
                </select>

                <select
                  value={filters.severity || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      severity: e.target.value as IncidentSeverity | undefined,
                    })
                  }
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Severity</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <select
                  value={filters.category || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      category: e.target.value as IncidentCategory | undefined,
                    })
                  }
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="performance">Performance</option>
                  <option value="database">Database</option>
                  <option value="authentication">Authentication</option>
                  <option value="network">Network</option>
                  <option value="deployment">Deployment</option>
                </select>

                <select
                  value={filters.serviceId || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      serviceId: e.target.value || undefined,
                    })
                  }
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Services</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  ))}
                </select>

                {hasActiveFilters && (
                  <Button onClick={clearFilters} variant="outline" size="sm">
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {filters.status && (
                  <Badge variant="info">Status: {filters.status}</Badge>
                )}
                {filters.severity && (
                  <Badge variant="warning">Severity: {filters.severity}</Badge>
                )}
                {filters.category && (
                  <Badge variant="default">Category: {filters.category}</Badge>
                )}
                {filters.serviceId && (
                  <Badge variant="default">
                    Service: {services.find(s => s._id === filters.serviceId)?.name || filters.serviceId}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {incidents.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 text-lg">No incidents found</p>
              <p className="text-gray-400 text-sm mt-2">
                {hasActiveFilters
                  ? "Try adjusting your filters"
                  : "Incidents will appear here when detected"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {incidents.map((incident) => (
              <IncidentCard key={incident._id} incident={incident} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

