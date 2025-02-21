import { Lightbulb } from "lucide-react"
import { getWeatherRecommendations } from "@/lib/weather"
import type { WeatherRecommendation } from "@/types/weather"

export function WeatherRecommendations({
  temperature,
  condition,
}: {
  temperature: number
  condition: string
}) {
  const recommendations: WeatherRecommendation = getWeatherRecommendations(temperature, condition)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h2 className="text-lg font-semibold">Recommendations</h2>
      </div>

      <div className="grid gap-4">
        {recommendations.clothing.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">What to Wear</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {recommendations.clothing.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {recommendations.activities.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Activities</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {recommendations.activities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {recommendations.preparations.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Preparations</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {recommendations.preparations.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

