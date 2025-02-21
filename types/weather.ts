export interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  localtime: string
}

export interface Current {
  temp_c: number
  temp_f: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_kph: number
  wind_dir: string
  pressure_mb: number
  precip_mm: number
  humidity: number
  feelslike_c: number
  uv: number
}

export interface Forecast {
  forecastday: Array<{
    date: string
    day: {
      maxtemp_c: number
      mintemp_c: number
      avgtemp_c: number
      condition: {
        text: string
        icon: string
        code: number
      }
      daily_chance_of_rain: number
      daily_chance_of_snow: number
    }
    hour: Array<{
      time: string
      temp_c: number
      condition: {
        text: string
        icon: string
        code: number
      }
      chance_of_rain: number
      chance_of_snow: number
    }>
  }>
}

export interface WeatherResponse {
  location: Location
  current: Current
  forecast: Forecast
}

export interface SearchResponse {
  id: number
  name: string
  region: string
  country: string
  lat: number
  lon: number
  url: string
}

export interface WeatherRecommendation {
  clothing: string[]
  activities: string[]
  preparations: string[]
}

