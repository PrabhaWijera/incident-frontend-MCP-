import { type ClassValue, clsx } from "clsx";
import { format as dateFormat, isValid, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
  return `${(ms / 3600000).toFixed(1)}h`;
}

export function safeFormatDate(
  date: string | Date | null | undefined,
  formatStr: string,
  fallback: string = "N/A"
): string {
  if (!date) return fallback;
  
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) return fallback;
    return dateFormat(dateObj, formatStr);
  } catch (error) {
    return fallback;
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "resolved":
    case "auto-resolved":
      return "bg-green-100 text-green-800 border-green-200";
    case "investigating":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "open":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function getLogLevelColor(level: string): string {
  switch (level) {
    case "error":
      return "bg-red-100 text-red-800 border-red-200";
    case "warning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "info":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

/**
 * Format timeline event details for point-wise display
 * Filters out HTML content but keeps all other details
 */
export function formatTimelineDetailsForDisplay(details: Record<string, any>): Array<{ key: string; value: string }> {
  if (!details || typeof details !== 'object') {
    return [];
  }

  const items: Array<{ key: string; value: string }> = [];

  for (const [key, value] of Object.entries(details)) {
    // Skip healthData if it's HTML
    if (key === 'healthData') {
      const strValue = String(value);
      
      // Check if it's HTML - skip it
      if (strValue.trim().startsWith('<!DOCTYPE') || strValue.trim().startsWith('<html')) {
        continue;
      }
    }

    // Format the value as string
    let displayValue: string;
    
    if (value === null || value === undefined) {
      displayValue = String(value);
    } else if (typeof value === 'string') {
      displayValue = value;
    } else if (typeof value === 'boolean' || typeof value === 'number') {
      displayValue = String(value);
    } else if (Array.isArray(value)) {
      displayValue = value.length > 0 ? value.join(', ') : '[]';
    } else if (typeof value === 'object') {
      // For nested objects, show key-value pairs
      const nestedItems = formatTimelineDetailsForDisplay(value);
      if (nestedItems.length > 0) {
        // Add nested items with indentation
        nestedItems.forEach(item => {
          items.push({
            key: `${key}.${item.key}`,
            value: item.value
          });
        });
        continue;
      } else {
        displayValue = '[Object]';
      }
    } else {
      displayValue = String(value);
    }

    // Format key nicely (convert camelCase to Title Case)
    const formattedKey = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();

    items.push({
      key: formattedKey,
      value: displayValue
    });
  }

  return items;
}

