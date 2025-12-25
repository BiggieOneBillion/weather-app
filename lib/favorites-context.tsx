"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FavoriteLocation {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  addedAt: string;
}

interface FavoritesContextType {
  favorites: FavoriteLocation[];
  addFavorite: (location: Omit<FavoriteLocation, 'id' | 'addedAt'>) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (lat: number, lon: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'weather-app-favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = (location: Omit<FavoriteLocation, 'id' | 'addedAt'>) => {
    const newFavorite: FavoriteLocation = {
      ...location,
      id: `${location.lat}-${location.lon}`,
      addedAt: new Date().toISOString(),
    };

    setFavorites(prev => {
      // Prevent duplicates
      if (prev.some(fav => fav.id === newFavorite.id)) {
        return prev;
      }
      return [...prev, newFavorite];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const isFavorite = (lat: number, lon: number) => {
    const id = `${lat}-${lon}`;
    return favorites.some(fav => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
