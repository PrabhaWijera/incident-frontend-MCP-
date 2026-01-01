"use client";

import { useEffect, useState } from "react";
import { servicesApi } from "@/lib/api";
import { Service } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RefreshCw, Plus, AlertCircle, CheckCircle, XCircle, Activity } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    healthEndpoint: "/health",
    description: "",
    category: "api",
    environment: "production",
  });

  const fetchServices = async () => {
    try {
      const data = await servicesApi.getAll();
      setServices(data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchServices();
    const interval = setInterval(fetchServices, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchServices();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await servicesApi.create({
        name: formData.name,
        url: formData.url,
        healthEndpoint: formData.healthEndpoint,
        description: formData.description,
        category: formData.category,
        metadata: {
          environment: formData.environment,
        },
      });
      setShowAddForm(false);
      setFormData({
        name: "",
        url: "",
        healthEndpoint: "/health",
        description: "",
        category: "api",
        environment: "production",
      });
      fetchServices();
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service. Please check the URL and try again.");
    }
  };

  const handleToggleEnabled = async (service: Service) => {
    try {
      await servicesApi.update(service._id, { enabled: !service.enabled });
      fetchServices();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await servicesApi.delete(id);
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleTest = async (id: string) => {
    try {
      const result = await servicesApi.test(id);
      alert(
        result.healthy
          ? `✅ ${result.service} is healthy (${result.responseTime}ms)`
          : `❌ ${result.service} is unhealthy: ${result.error || "Check status"}`
      );
    } catch (error) {
      console.error("Error testing service:", error);
      alert("Failed to test service");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Services</h1>
            <p className="text-gray-600 mt-1">
              Manage and monitor company services
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button onClick={() => setShowAddForm(!showAddForm)} variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
            <Link href="/">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>

        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Register New Service</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Acme Corp API"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="http://localhost:3001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Health Endpoint
                    </label>
                    <input
                      type="text"
                      value={formData.healthEndpoint}
                      onChange={(e) => setFormData({ ...formData, healthEndpoint: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="/health"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="api">API</option>
                      <option value="database">Database</option>
                      <option value="cache">Cache</option>
                      <option value="queue">Queue</option>
                      <option value="storage">Storage</option>
                      <option value="monitoring">Monitoring</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Environment
                    </label>
                    <select
                      value={formData.environment}
                      onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="production">Production</option>
                      <option value="staging">Staging</option>
                      <option value="development">Development</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Optional description"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" variant="primary">
                    Register Service
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {services.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No services registered</p>
              <p className="text-gray-400 text-sm mt-2">
                Register services to start monitoring
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                variant="primary"
                className="mt-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Register First Service
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{service.url}</p>
                    </div>
                    {service.enabled ? (
                      <Badge variant="success" className="ml-2">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="default" className="ml-2">
                        <XCircle className="w-3 h-3 mr-1" />
                        Disabled
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.description && (
                      <p className="text-sm text-gray-600">{service.description}</p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="info">{service.category}</Badge>
                      {service.metadata?.environment && (
                        <Badge variant="default">
                          {service.metadata.environment}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button
                        onClick={() => handleTest(service._id)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        Test
                      </Button>
                      <Button
                        onClick={() => handleToggleEnabled(service)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        {service.enabled ? "Disable" : "Enable"}
                      </Button>
                      <Button
                        onClick={() => handleDelete(service._id)}
                        variant="danger"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

