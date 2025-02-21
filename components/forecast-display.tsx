import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Forecast } from "@/types/weather"

export function ForecastDisplay({ forecast }: { forecast: Forecast }) {
  return (
    <Tabs defaultValue="daily" className="space-y-4">
      <TabsList>
        <TabsTrigger value="daily">Daily Forecast</TabsTrigger>
        <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
      </TabsList>

      <TabsContent value="daily" className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {forecast.forecastday.map((day) => (
            <div key={day.date} className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">
                {new Date(day.date).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} className="w-12 h-12 my-2" />
              <div className="text-sm font-medium">
                {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
              </div>
              <div className="text-xs text-muted-foreground text-center mt-1">{day.day.condition.text}</div>
              {(day.day.daily_chance_of_rain > 0 || day.day.daily_chance_of_snow > 0) && (
                <div className="text-xs text-blue-500 mt-1">
                  {Math.max(day.day.daily_chance_of_rain, day.day.daily_chance_of_snow)}% precip
                </div>
              )}
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="hourly" className="space-y-4">
        <div className="text-sm text-muted-foreground space-y-2">
          <h3 className="font-medium text-foreground">24-Hour Forecast</h3>
          <p className="w-full">Scroll horizontally to see the weather forecast for each hour. Each card shows the time, temperature, weather condition, and chance of precipitation (if any).</p>
        </div>
        <div className="grid gap-4 overflow-x-auto">
          <div className="flex space-x-4 pb-4 w-full overflow-auto md:overscroll-none">
            {forecast.forecastday[0].hour.map((hour) => (
              <div key={hour.time} className="flex flex-col items-center p-4 rounded-lg bg-muted/50 min-w-[100px]">
                <div className="text-sm text-muted-foreground">
                  {new Date(hour.time).toLocaleTimeString(undefined, {
                    hour: "numeric",
                  })}
                </div>
                <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} className="w-12 h-12 my-2" />
                <div className="text-sm font-medium">{Math.round(hour.temp_c)}°</div>
                {(hour.chance_of_rain > 0 || hour.chance_of_snow > 0) && (
                  <div className="text-xs text-blue-500 mt-1">
                    {Math.max(hour.chance_of_rain, hour.chance_of_snow)}% precip
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

