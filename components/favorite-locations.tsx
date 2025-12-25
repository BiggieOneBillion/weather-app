"use client";

import { Star, MapPin, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFavorites, type FavoriteLocation } from '@/lib/favorites-context';

interface FavoriteLocationsProps {
  onSelectLocation: (location: FavoriteLocation) => void;
}

export function FavoriteLocations({ onSelectLocation }: FavoriteLocationsProps) {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No favorite locations yet</p>
          <p className="text-sm">Add locations to quickly access their weather</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        Favorite Locations
      </h3>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((location) => (
          <Card
            key={location.id}
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div onClick={() => onSelectLocation(location)}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h4 className="font-medium">{location.name}</h4>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(location.id);
                  }}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {location.region && `${location.region}, `}
                {location.country}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Added {new Date(location.addedAt).toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
