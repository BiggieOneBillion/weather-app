"use client";

import { AlertTriangle, Info, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface WeatherAlert {
  headline: string;
  msgtype: string;
  severity: string;
  urgency: string;
  areas: string;
  category: string;
  certainty: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  desc: string;
  instruction: string;
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

export function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'extreme':
      case 'severe':
        return <XCircle className="w-5 h-5" />;
      case 'moderate':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getSeverityVariant = (severity: string): "default" | "destructive" => {
    switch (severity.toLowerCase()) {
      case 'extreme':
      case 'severe':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <Alert key={index} variant={getSeverityVariant(alert.severity)}>
          <div className="flex items-start gap-3">
            {getSeverityIcon(alert.severity)}
            <div className="flex-1">
              <AlertTitle className="font-semibold">
                {alert.event || alert.headline}
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="text-sm">{alert.desc}</p>
                {alert.instruction && (
                  <p className="text-sm mt-2 font-medium">
                    <strong>Instructions:</strong> {alert.instruction}
                  </p>
                )}
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Severity: {alert.severity}</span>
                  <span>Areas: {alert.areas}</span>
                </div>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
}
