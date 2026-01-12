"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

// This component is no longer wired to the backend. System events are now generated
// from real monitored services via health checks instead of synthetic /api/system/events calls.

export function EventSimulator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Events</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          System incident simulation via the old /api/system/events endpoint has been removed.
          Use real monitored services (like the demo company server) to generate incidents
          through health checks.
        </p>
      </CardContent>
    </Card>
  );
}

