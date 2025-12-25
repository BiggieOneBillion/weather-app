"use server"

import { z } from "zod"
import type { SearchResponse, WeatherResponse } from "@/types/weather"

const LocationSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  url: z.string(),
})

export async function searchLocations(query: string): Promise<SearchResponse[]> {
  if (!query.trim()) return []

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${process.env.WEATHERAPI_KEY}&q=${encodeURIComponent(query)}`,
      { next: { revalidate: 3600 } },
    )

    if (!res.ok) {
      throw new Error(`WeatherAPI error: ${res.status}`)
    }

    const data = await res.json()

    // Validate the response data
    const validatedData = z.array(LocationSchema).safeParse(data)

    if (!validatedData.success) {
      console.error("Data validation error:", validatedData.error)
      return []
    }

    return validatedData.data
  } catch (error) {
    console.error("Search locations error:", error)
    return []
  }
}

export async function getWeatherData(query: string, days = 7): Promise<WeatherResponse | null> {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI_KEY}&q=${encodeURIComponent(query)}&days=${days}&aqi=yes&alerts=yes`,
      { next: { revalidate: 1800 } }, // Cache for 30 minutes
    )

    if (!res.ok) {
      throw new Error(`WeatherAPI error: ${res.status}`)
    }

    return res.json()
  } catch (error) {
    console.error("Get weather data error:", error)
    return null
  }
}

export async function getWeatherRecommendations(temp_c: number, condition: string) {
  const recommendations = {
    clothing: [] as string[],
    activities: [] as string[],
    preparations: [] as string[],
  }

  // Temperature based recommendations
  if (temp_c < 10) {
    recommendations.clothing.push("Heavy coat", "Gloves", "Scarf", "Warm hat")
    recommendations.activities.push("Indoor activities recommended")
    recommendations.preparations.push("Be prepared for cold weather")
  } else if (temp_c < 20) {
    recommendations.clothing.push("Light jacket", "Long sleeves", "Pants")
    recommendations.activities.push("Light outdoor activities")
    recommendations.preparations.push("Layer your clothing")
  } else {
    recommendations.clothing.push("Light clothing", "Short sleeves", "Shorts")
    recommendations.activities.push("Outdoor activities suitable")
    recommendations.preparations.push("Stay hydrated")
  }

  // Condition based recommendations
  const conditionLower = condition.toLowerCase()
  if (conditionLower.includes("rain")) {
    recommendations.clothing.push("Rain jacket", "Waterproof shoes")
    recommendations.preparations.push("Bring an umbrella")
  } else if (conditionLower.includes("snow")) {
    recommendations.clothing.push("Snow boots", "Waterproof clothing")
    recommendations.preparations.push("Check road conditions")
  } else if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
    recommendations.clothing.push("Sunglasses", "Hat")
    recommendations.preparations.push("Apply sunscreen")
  }

  return recommendations
}

