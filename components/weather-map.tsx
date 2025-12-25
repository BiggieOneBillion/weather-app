"use client";

import { useEffect, useState } from 'react';
import { MapPin, Layers, Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Fix for Leaflet marker icons in Next.js
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icon paths
const fixLeafletIcon = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

interface WeatherMapProps {
  lat?: number;
  lon?: number;
  locationName?: string;
}

type WeatherLayer = 'temp' | 'precipitation' | 'clouds' | 'wind' | 'none';

export function WeatherMap({ lat, lon, locationName }: WeatherMapProps) {
  const [activeLayer, setActiveLayer] = useState<WeatherLayer>('none');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fixLeafletIcon();
  }, []);

  const defaultLat = lat || 51.505;
  const defaultLon = lon || -0.09;

  // OpenWeatherMap API key from environment
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

  const weatherLayers = {
    temp: {
      url: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      name: 'Temperature',
      icon: Thermometer,
    },
    precipitation: {
      url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      name: 'Precipitation',
      icon: Droplets,
    },
    clouds: {
      url: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      name: 'Clouds',
      icon: Cloud,
    },
    wind: {
      url: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      name: 'Wind',
      icon: Wind,
    },
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Interactive Weather Map</h3>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Weather Layers</span>
          </div>
        </div>

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

        {/* Layer Controls */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeLayer === 'none' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveLayer('none')}
          >
            Base Map
          </Button>
          {Object.entries(weatherLayers).map(([key, layer]) => {
            const Icon = layer.icon;
            return (
              <Button
                key={key}
                variant={activeLayer === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLayer(key as WeatherLayer)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {layer.name}
              </Button>
            );
          })}
        </div>

        {/* Map Container */}
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          {isClient ? (
            <MapContainer
              center={[defaultLat, defaultLon]}
              zoom={10}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Weather Layer Overlay */}
              {activeLayer !== 'none' && apiKey && (
                <TileLayer
                  url={weatherLayers[activeLayer].url}
                  attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                  opacity={0.6}
                />
              )}

              {/* Location Marker */}
              {lat && lon && (
                <Marker position={[lat, lon]}>
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">{locationName}</p>
                      <p className="text-muted-foreground">
                        {lat.toFixed(4)}, {lon.toFixed(4)}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Loading map...</p>
              </div>
            </div>
          )}
        </div>

        {!apiKey && (
          <p className="text-xs text-muted-foreground text-center">
            Note: Weather layers require an OpenWeatherMap API key
          </p>
        )}
      </div>
    </Card>
  );
}
