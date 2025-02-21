"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { useDebounce } from "@/lib/hooks";
import { searchLocations, getWeatherData } from "@/lib/actions";
import { WeatherDisplay } from "./weather-display";
import { ForecastDisplay } from "./forecast-display";
import { WeatherRecommendations } from "./weather-recommendations";
import { WeatherHistoryAnalysis } from "./weather-history-analysis";
import type { SearchResponse, WeatherResponse } from "@/types/weather";

export default function WeatherDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState<SearchResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const debouncedSearch = useDebounce(search, 300);

  const handleSearch = async (value: string) => {
    if (!value) {
      setLocations([]);
      return;
    }

    try {
      setIsLoading(true);
      const data = await searchLocations(value);
      setLocations(data);
    } catch (error) {
      console.error("Failed to search locations:", error);
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectLocation = async (location: SearchResponse) => {
    try {
      setIsLoading(true);
      const weatherData = await getWeatherData(
        `${location.lat},${location.lon}`
      );
      if (weatherData) {
        setWeather(weatherData);
        router.push(
          `/?q=${encodeURIComponent(location.name)}&lat=${location.lat}&lon=${
            location.lon
          }`
        );
      }
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    } finally {
      setIsLoading(false);
      setOpen(false);
      setSearch("");
    }
  };

  // Load initial weather data if query params exist
  useEffect(() => {
    const q = searchParams.get("q");
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (q && lat && lon) {
      getWeatherData(`${lat},${lon}`).then((data) => {
        if (data) setWeather(data);
      });
    }
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full max-w-md justify-between"
            >
              <Search className="mr-2 h-4 w-4" />
              {search || "Search for a location..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-md p-0">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Search for a location..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="px-4 py-2 border-b focus:outline-none"
              />
              <div className="max-h-[300px] overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center">Searching...</div>
                ) : locations.length === 0 ? (
                  <div className="p-4 text-center">No locations found.</div>
                ) : (
                  <ul className="py-2">
                    {locations.map((location) => (
                      <li
                        key={`${location.lat}-${location.lon}`}
                        onClick={() => selectLocation(location)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {location.name}
                        {location.region && `, ${location.region}`}
                        {location.country && `, ${location.country}`}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {weather && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <WeatherDisplay weather={weather} />
          </Card>
          <Card className="p-6">
            <WeatherRecommendations
              temperature={weather.current.temp_c}
              condition={weather.current.condition.text}
            />
          </Card>
          <Card className="md:col-span-2 p-6">
            <ForecastDisplay forecast={weather.forecast} />
          </Card>
          <Card className="md:col-span-2  md:p-6 ">
            <WeatherHistoryAnalysis 
              lat={Number(weather.location.lat)}
              lon={Number(weather.location.lon)}
              locationName={weather.location.name}
            />
          </Card>
        </div>
      )}
    </div>
  );
}
