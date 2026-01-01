"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  BookOpen,
  Server,
  AlertTriangle,
  Brain,
  CheckCircle,
  XCircle,
  Activity,
  ArrowRight,
  Info,
  Code,
  Copy,
} from "lucide-react";
import Link from "next/link";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">User Guide</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Learn how to use the AI Incident Assistant system step by step
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2">
              <a href="#overview" className="block text-blue-600 hover:underline">
                1. System Overview
              </a>
              <a href="#add-service" className="block text-blue-600 hover:underline">
                2. Adding Services (Step-by-Step)
              </a>
              <a href="#form-examples" className="block text-blue-600 hover:underline">
                3. Service Form Examples & Results
              </a>
              <a href="#monitoring" className="block text-blue-600 hover:underline">
                4. How Monitoring Works
              </a>
              <a href="#incidents" className="block text-blue-600 hover:underline">
                5. Understanding Incidents
              </a>
              <a href="#ai-analysis" className="block text-blue-600 hover:underline">
                6. AI Analysis Guide
              </a>
              <a href="#workflow" className="block text-blue-600 hover:underline">
                7. Complete Workflow Example
              </a>
            </nav>
          </CardContent>
        </Card>

        {/* 1. System Overview */}
        <section id="overview" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                1. System Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                The AI Incident Assistant is a monitoring and incident management system that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>Monitors Services:</strong> Continuously checks the health of your registered services
                </li>
                <li>
                  <strong>Detects Issues:</strong> Automatically creates incidents when problems are detected
                </li>
                <li>
                  <strong>AI Analysis:</strong> Uses NVIDIA NIM AI models (Llama 3.1 & Mistral) to analyze root causes
                </li>
                <li>
                  <strong>Human-in-the-Loop:</strong> AI suggests actions, but engineers make the final decisions
                </li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Key Concept:</strong> This system follows MCP (Model Context Protocol) principles where AI
                  assists but never executes critical actions without human approval.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. Adding Services */}
        <section id="add-service" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                2. Adding Services - Step-by-Step Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Step 1: Navigate to Services Page</h3>
                <p className="text-gray-700 mb-2">
                  Click on <strong>"Services"</strong> in the navigation bar at the top.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Step 2: Click "Add Service" Button</h3>
                <p className="text-gray-700 mb-2">
                  You'll see a blue <strong>"Add Service"</strong> button in the top right. Click it to open the form.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Step 3: Fill Out the Form</h3>
                <p className="text-gray-700 mb-4">
                  The form has the following fields:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>
                    <strong>Service Name:</strong> A friendly name for your service (e.g., "User API", "Payment Service")
                  </li>
                  <li>
                    <strong>Service URL:</strong> The base URL where your service is running (e.g., "http://localhost:3001")
                  </li>
                  <li>
                    <strong>Health Endpoint:</strong> The path to your health check endpoint (default: "/health")
                  </li>
                  <li>
                    <strong>Category:</strong> Type of service (API, Database, Cache, Queue, Storage, Monitoring, Other)
                  </li>
                  <li>
                    <strong>Environment:</strong> Where the service runs (Production, Staging, Development)
                  </li>
                  <li>
                    <strong>Description:</strong> Optional notes about the service
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Step 4: Submit the Form</h3>
                <p className="text-gray-700 mb-2">
                  Click <strong>"Register Service"</strong> to add it to the monitoring system.
                </p>
                <p className="text-gray-600 text-sm">
                  The system will immediately start monitoring this service every 30 seconds.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. Form Examples */}
        <section id="form-examples" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                3. Service Form Examples & Expected Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Example 1 */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg mb-3">Example 1: Local Development API</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Service Name:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">User Management API</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Service URL:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">http://localhost:3001</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Health Endpoint:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">/health</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Category:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">API</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Environment:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">Development</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">Local development server for user management</code>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Expected Result:</p>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Service Registered Successfully</span>
                    </div>
                    <p className="text-xs text-green-700">
                      The service will appear in the services list with status <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>.
                      Monitoring will start automatically, checking the health endpoint every 30 seconds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-lg mb-3">Example 2: Production Database Service</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Service Name:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">PostgreSQL Database</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Service URL:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">https://db.production.example.com</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Health Endpoint:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">/api/health</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Category:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">Database</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Environment:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">Production</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">Main production PostgreSQL database cluster</code>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Expected Result:</p>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Service Registered Successfully</span>
                    </div>
                    <p className="text-xs text-green-700">
                      The service will be monitored continuously. If the health check fails, an incident will be automatically created.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example 3 */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-lg mb-3">Example 3: Cache Service (Redis)</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Service Name:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">Redis Cache</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Service URL:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">http://redis.internal:6379</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Health Endpoint:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">/ping</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Category:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">Cache</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Environment:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">Staging</code>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
                    <code className="text-sm bg-white px-2 py-1 rounded border">Redis cache for session storage</code>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Expected Result:</p>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Service Registered Successfully</span>
                    </div>
                    <p className="text-xs text-green-700">
                      The cache service will be monitored. Response time and availability will be tracked.
                    </p>
                  </div>
                </div>
              </div>

              {/* Common Errors */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-lg mb-3">Common Errors & Solutions</h3>
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-sm font-medium text-red-800 mb-1">Error: "Failed to add service"</p>
                    <p className="text-xs text-red-700">
                      <strong>Solution:</strong> Check that the URL is correct and the service is running. Ensure the health endpoint exists and returns a valid response.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <p className="text-sm font-medium text-yellow-800 mb-1">Warning: Service shows as "Unreachable"</p>
                    <p className="text-xs text-yellow-700">
                      <strong>Solution:</strong> Verify the URL is accessible from the monitoring server. Check firewall rules and network connectivity.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. Monitoring */}
        <section id="monitoring" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                4. How Monitoring Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Once you register a service, the system automatically monitors it:
              </p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
                <li>
                  <strong>Health Checks:</strong> Every 30 seconds, the system sends a GET request to your service's health endpoint
                </li>
                <li>
                  <strong>Response Analysis:</strong> The system checks:
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>HTTP status code (200 = healthy, 4xx/5xx = unhealthy)</li>
                    <li>Response time (slow responses trigger alerts)</li>
                    <li>Response content (checks for error messages)</li>
                  </ul>
                </li>
                <li>
                  <strong>Incident Creation:</strong> If a service fails health checks or shows degraded performance, an incident is automatically created
                </li>
                <li>
                  <strong>Log Collection:</strong> All health check results and errors are logged and associated with the incident
                </li>
              </ol>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> You can manually test a service's health by clicking the "Test Health" button on the Services page.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 5. Incidents */}
        <section id="incidents" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                5. Understanding Incidents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">What is an Incident?</h3>
                <p className="text-gray-700 mb-3">
                  An incident represents a detected problem with one of your monitored services. Each incident contains:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Title & Description:</strong> What the problem is</li>
                  <li><strong>Severity:</strong> Low, Medium, or High (determined by AI or system)</li>
                  <li><strong>Category:</strong> Performance, Database, Authentication, Network, or Deployment</li>
                  <li><strong>Status:</strong> Open, Investigating, Resolved, or Auto-resolved</li>
                  <li><strong>Timeline:</strong> History of all events related to this incident</li>
                  <li><strong>Logs:</strong> All error and warning logs associated with the incident</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Incident Statuses</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-red-100 text-red-800">Open</Badge>
                    <span className="text-sm text-gray-700">Newly detected issue, needs investigation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-yellow-100 text-yellow-800">Investigating</Badge>
                    <span className="text-sm text-gray-700">Engineer is actively working on the issue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-100 text-green-800">Resolved</Badge>
                    <span className="text-sm text-gray-700">Issue has been fixed and verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-blue-100 text-blue-800">Auto-resolved</Badge>
                    <span className="text-sm text-gray-700">System automatically detected the issue was fixed</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Viewing Incidents</h3>
                <p className="text-gray-700 mb-2">
                  Navigate to the <strong>"Incidents"</strong> page to see all incidents. You can:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Filter by status, severity, category, or service</li>
                  <li>Click on any incident to see detailed information</li>
                  <li>View the timeline of events</li>
                  <li>Request AI analysis</li>
                  <li>Update incident status</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 6. AI Analysis */}
        <section id="ai-analysis" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                6. AI Analysis Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">What is AI Analysis?</h3>
                <p className="text-gray-700 mb-3">
                  The system uses NVIDIA NIM AI models (Llama 3.1 8B Instruct and Mistral 7B Instruct) to analyze incidents
                  and provide intelligent insights:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Root Cause Analysis:</strong> Identifies the most probable cause of the incident</li>
                  <li><strong>Severity Assessment:</strong> Determines if the issue is Low, Medium, or High severity</li>
                  <li><strong>Category Classification:</strong> Categorizes the incident (Performance, Database, etc.)</li>
                  <li><strong>Suggested Actions:</strong> Provides actionable steps to resolve the issue</li>
                  <li><strong>Related Incidents:</strong> Finds similar past incidents for reference</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">How to Request AI Analysis</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>Navigate to an incident detail page</li>
                  <li>Click the <strong>"Request AI Analysis"</strong> button</li>
                  <li>Wait a few seconds for the AI to analyze logs and incident data</li>
                  <li>Review the AI's findings in the "AI Analysis" section</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Understanding AI Results</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Root Cause:</p>
                    <p className="text-sm text-gray-600">
                      A concise explanation of what likely caused the incident, with a confidence score (0-100%).
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Suggested Actions:</p>
                    <p className="text-sm text-gray-600">
                      A list of recommended steps to resolve the issue. Each action includes:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-1 text-sm text-gray-600">
                      <li>Action name (what to do)</li>
                      <li>Description (why and how)</li>
                      <li>Confidence level (how certain the AI is)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">AI Model Used:</p>
                    <p className="text-sm text-gray-600">
                      The system will show which AI model analyzed the incident:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-1 text-sm text-gray-600">
                      <li><strong>Llama 3.1 8B Instruct</strong> (Primary model)</li>
                      <li><strong>Mistral 7B Instruct</strong> (Fallback if primary fails)</li>
                      <li><strong>Rule-based</strong> (Fallback if both AI models fail)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> AI analysis is read-only. The AI suggests actions but never executes them.
                  You (the engineer) must review and approve all actions before they are taken.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 7. Complete Workflow */}
        <section id="workflow" className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                7. Complete Workflow Example
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">End-to-End Example: Monitoring a Demo Server</h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-2">Step 1: Register the Service</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="mb-2">Fill out the service form:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Name: <code className="bg-white px-1 rounded">Demo Company Server</code></li>
                        <li>URL: <code className="bg-white px-1 rounded">http://localhost:3000</code></li>
                        <li>Health Endpoint: <code className="bg-white px-1 rounded">/health</code></li>
                        <li>Category: <code className="bg-white px-1 rounded">API</code></li>
                        <li>Environment: <code className="bg-white px-1 rounded">Development</code></li>
                      </ul>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />
                      Service registered and monitoring started
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-2">Step 2: System Detects an Issue</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      After a few health checks, the system detects that the service is returning errors or is slow.
                    </p>
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <p className="text-sm font-medium text-red-800 mb-1">Incident Created Automatically:</p>
                      <ul className="text-xs text-red-700 space-y-1">
                        <li>Title: "Service health check failed"</li>
                        <li>Status: <Badge variant="default" className="bg-red-100 text-red-800">Open</Badge></li>
                        <li>Severity: <Badge variant="default" className="bg-yellow-100 text-yellow-800">Medium</Badge></li>
                        <li>Category: Performance</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold mb-2">Step 3: Engineer Views the Incident</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Navigate to the Incidents page and click on the new incident to see:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 ml-4 space-y-1">
                      <li>Incident details and timeline</li>
                      <li>Associated error logs</li>
                      <li>Service information</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold mb-2">Step 4: Request AI Analysis</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Click "Request AI Analysis" button. The AI will:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 ml-4 space-y-1">
                      <li>Analyze all logs and incident data</li>
                      <li>Identify the root cause (e.g., "Database connection timeout")</li>
                      <li>Suggest actions (e.g., "Check database connection pool", "Restart database service")</li>
                      <li>Provide confidence scores</li>
                    </ul>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200 mt-2">
                      <p className="text-xs text-blue-800">
                        <Brain className="w-3 h-3 inline mr-1" />
                        AI Model: Llama 3.1 8B Instruct analyzed the incident
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-semibold mb-2">Step 5: Engineer Takes Action</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Based on AI suggestions and your investigation:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 ml-4 space-y-1">
                      <li>Review the suggested actions</li>
                      <li>Manually fix the issue (e.g., restart the database)</li>
                      <li>Update incident status to "Investigating" while working</li>
                      <li>Mark as "Resolved" once fixed</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-teal-500 pl-4">
                    <h4 className="font-semibold mb-2">Step 6: System Auto-Resolves (Optional)</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      If the system detects that the service is healthy again, it may automatically:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 ml-4 space-y-1">
                      <li>Change status to "Auto-resolved"</li>
                      <li>Add a timeline event showing the resolution</li>
                      <li>Calculate resolution time</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Links */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <Activity className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="w-full">
                  <Server className="w-4 h-4 mr-2" />
                  Services
                </Button>
              </Link>
              <Link href="/incidents">
                <Button variant="outline" className="w-full">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Incidents
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

