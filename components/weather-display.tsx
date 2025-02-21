import { Cloud, Droplets, Thermometer, Wind } from "lucide-react"
import type { WeatherResponse } from "@/types/weather"
import { getWeatherInterpretation } from "@/lib/weather-interpreter"

export function WeatherDisplay({ weather }: { weather: WeatherResponse }) {
  return (
    <div className="space-y-6">
      <div className=" flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">{weather.location.name}</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {weather.location.region}, {weather.location.country}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{new Date(weather.location.localtime).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={`https:${weather.current.condition.icon}`}
          alt={weather.current.condition.text}
          className="w-24 h-24"
        />
        <div>
          <div className="text-4xl font-bold">{Math.round(weather.current.temp_c)}°C</div>
          <p className="text-muted-foreground">{weather.current.condition.text}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Feels like</span>
          <span className="font-medium text-sm">{Math.round(weather.current.feelslike_c)}°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Wind</span>
          <span className="font-medium text-sm flex items-center gap-1">
            <span>
            {weather.current.wind_kph} km/h 
            </span>
            <span className="sm:hidden lg:inline">
            {weather.current.wind_dir}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Humidity</span>
          <span className="font-medium text-sm">{weather.current.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Pressure</span>
          <span className="font-medium text-sm">{weather.current.pressure_mb} mb</span>
        </div>
      </div>

      {/* Weather Interpretation Card */}
      <div className="bg-primary/10 rounded-lg p-4 mt-4">
        <h3 className="text-sm font-medium mb-2">👋 Weather in Human Words:</h3>
        <p className="text-sm  text-muted-foreground leading-relaxed">
          {getWeatherInterpretation(weather)}
        </p>
      </div>
    </div>
  )
}

