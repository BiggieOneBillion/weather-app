import type { WeatherRecommendation } from "@/types/weather"

export function getWeatherRecommendations(temp_c: number, condition: string): WeatherRecommendation {
  const recommendations: WeatherRecommendation = {
    clothing: [],
    activities: [],
    preparations: [],
  }

  // Temperature based recommendations
  if (temp_c < 10) {
    recommendations.clothing.push("🧥 Heavy coat", "🧤 Gloves", "🧣 Scarf", "🎩 Warm hat")
    recommendations.activities.push("🏠 Indoor activities recommended")
    recommendations.preparations.push("❄️ Be prepared for cold weather")
  } else if (temp_c < 20) {
    recommendations.clothing.push("🧥 Light jacket", "👔 Long sleeves", "👖 Pants")
    recommendations.activities.push("🚶‍♂️ Light outdoor activities")
    recommendations.preparations.push("👔 Layer your clothing")
  } else {
    recommendations.clothing.push("🎽 Light clothing", "👕 Short sleeves", "🩳 Shorts")
    recommendations.activities.push("🏃‍♂️ Outdoor activities suitable")
    recommendations.preparations.push("💧 Stay hydrated")
  }

  // Condition based recommendations
  const conditionLower = condition.toLowerCase()
  if (conditionLower.includes("rain")) {
    recommendations.clothing.push("🌂 Rain jacket", "👢 Waterproof shoes")
    recommendations.preparations.push("☔️ Bring an umbrella")
  } else if (conditionLower.includes("snow")) {
    recommendations.clothing.push("❄️ Snow boots", "🧥 Waterproof clothing")
    recommendations.preparations.push("🚗 Check road conditions")
  } else if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
    recommendations.clothing.push("🕶 Sunglasses", "🧢 Hat")
    recommendations.preparations.push("🧴 Apply sunscreen")
  }

  return recommendations
}

