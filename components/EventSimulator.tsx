"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { systemApi } from "@/lib/api";
import { AlertCircle, Database, Shield } from "lucide-react";

export function EventSimulator() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleCreateEvent = async (
    type: "CPU_SPIKE" | "DB_TIMEOUT" | "AUTH_FAILURE",
    value?: number
  ) => {
    setLoading(true);
    setMessage(null);
    try {
      await systemApi.createEvent(type, value);
      setMessage({ type: "success", text: "Event created successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create event" });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulate System Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={() => handleCreateEvent("CPU_SPIKE", 95)}
            disabled={loading}
            className="w-full justify-start"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            CPU Spike (95%)
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreateEvent("DB_TIMEOUT")}
            disabled={loading}
            className="w-full justify-start"
          >
            <Database className="w-4 h-4 mr-2" />
            Database Timeout
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreateEvent("AUTH_FAILURE")}
            disabled={loading}
            className="w-full justify-start"
          >
            <Shield className="w-4 h-4 mr-2" />
            Authentication Failure
          </Button>
        </div>
        {message && (
          <div
            className={`mt-3 p-2 rounded text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

