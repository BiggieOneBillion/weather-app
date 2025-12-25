"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { WeatherResponse } from '@/types/weather';

interface ComparisonLocation {
  id: string;
  name: string;
  weather: WeatherResponse;
}

interface ComparisonContextType {
  locations: ComparisonLocation[];
  addLocation: (weather: WeatherResponse) => void;
  removeLocation: (id: string) => void;
  clearAll: () => void;
  canAddMore: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_LOCATIONS = 3;

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState<ComparisonLocation[]>([]);

  const addLocation = (weather: WeatherResponse) => {
    if (locations.length >= MAX_LOCATIONS) {
      return;
    }

    const id = `${weather.location.lat}-${weather.location.lon}`;
    
    // Prevent duplicates
    if (locations.some(loc => loc.id === id)) {
      return;
    }

    const newLocation: ComparisonLocation = {
      id,
      name: weather.location.name,
      weather,
    };

    setLocations(prev => [...prev, newLocation]);
  };

  const removeLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const clearAll = () => {
    setLocations([]);
  };

  const canAddMore = locations.length < MAX_LOCATIONS;

  return (
    <ComparisonContext.Provider value={{ locations, addLocation, removeLocation, clearAll, canAddMore }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
