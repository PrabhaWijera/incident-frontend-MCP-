import Link from "next/link";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { safeFormatDate } from "@/lib/utils";
import { Incident } from "@/lib/types";
import { AlertCircle, Clock } from "lucide-react";

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  return (
    <Link href={`/incidents/${incident._id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {incident.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {incident.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
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
                incident.status === "resolved" || incident.status === "auto-resolved"
                  ? "success"
                  : incident.status === "investigating"
                  ? "info"
                  : "warning"
              }
            >
              {incident.status}
            </Badge>
            <Badge variant="default">{incident.category}</Badge>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{safeFormatDate(incident.createdAt, "MMM d, yyyy HH:mm")}</span>
            </div>
            <div className="flex items-center gap-2">
              {incident.serviceName && (
                <Badge variant="default" className="text-xs">
                  {incident.serviceName}
                </Badge>
              )}
              {incident.metadata.errorCount > 0 && (
                <div className="flex items-center gap-1 text-red-600">
                  <AlertCircle className="w-3 h-3" />
                  <span>{incident.metadata.errorCount} errors</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

