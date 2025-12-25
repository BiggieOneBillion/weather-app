"use client";

import { MapPin, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface WeatherMapProps {
  lat?: number;
  lon?: number;
  locationName?: string;
}

export function WeatherMap({ lat, lon, locationName }: WeatherMapProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Interactive Weather Map</h3>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Map Feature Pending</AlertTitle>
          <AlertDescription>
            The interactive weather map feature requires additional setup. To enable this feature:
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Install Leaflet dependencies: <code className="bg-muted px-1 rounded">npm install leaflet react-leaflet@4.2.1 --legacy-peer-deps</code></li>
              <li>Add Leaflet CSS to <code className="bg-muted px-1 rounded">app/globals.css</code></li>
              <li>Restart the development server</li>
            </ol>
          </AlertDescription>
        </Alert>

        {lat && lon && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Current Location: <span className="font-medium text-foreground">{locationName}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Coordinates: {lat.toFixed(4)}, {lon.toFixed(4)}
            </p>
          </div>
        )}

        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Interactive map will appear here once configured</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
