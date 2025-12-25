"use client";

import { X, Plus, TrendingUp, Droplets, Wind, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useComparison } from '@/lib/comparison-context';
import { ComparisonChart } from './comparison-chart';

export function LocationComparison() {
  const { locations, removeLocation, clearAll } = useComparison();

  if (locations.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center text-muted-foreground">
          <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg font-medium">No locations to compare</p>
          <p className="text-sm mt-1">Search for locations and click "Add to Compare" to start comparing weather</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Location Comparison</h2>
        {locations.length > 1 && (
          <Button onClick={clearAll} variant="outline" size="sm">
            Clear All
          </Button>
        )}
      </div>

      {/* Side-by-side comparison cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <Card key={location.id} className="p-4 relative">
            <Button
              onClick={() => removeLocation(location.id)}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{location.weather.location.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {location.weather.location.region}, {location.weather.location.country}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <img 
                  src={location.weather.current.condition.icon} 
                  alt={location.weather.current.condition.text}
                  className="w-12 h-12"
                />
                <div>
                  <p className="text-3xl font-bold">{location.weather.current.temp_c}°C</p>
                  <p className="text-sm text-muted-foreground">{location.weather.current.condition.text}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Humidity</p>
                    <p className="text-sm font-medium">{location.weather.current.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Wind</p>
                    <p className="text-sm font-medium">{location.weather.current.wind_kph} km/h</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">UV Index</p>
                    <p className="text-sm font-medium">{location.weather.current.uv}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Precip</p>
                    <p className="text-sm font-medium">{location.weather.current.precip_mm} mm</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Comparison Charts */}
      {locations.length > 1 && (
        <ComparisonChart locations={locations} />
      )}
    </div>
  );
}
