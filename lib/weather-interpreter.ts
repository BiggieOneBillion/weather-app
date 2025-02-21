import type { WeatherResponse } from "@/types/weather"

export function getWeatherInterpretation(weather: WeatherResponse) {
  const temp = weather.current.temp_c;
  const condition = weather.current.condition.text.toLowerCase();
  const humidity = weather.current.humidity;
  const windSpeed = weather.current.wind_kph;
  const localTime = new Date(weather.location.localtime);
  const hour = localTime.getHours();

  let message = "";
  
  // Time of day greeting
  if (hour >= 5 && hour < 12) message += "🌅 Good morning! ";
  else if (hour >= 12 && hour < 17) message += "☀️ Good afternoon! ";
  else if (hour >= 17 && hour < 21) message += "🌆 Good evening! ";
  else message += "🌙 Hey night owl! ";

  // Temperature interpretation with time context
  if (temp < 10) {
    message += hour < 17 ? "❄️ Bundle up for the day ahead! " : "❄️ Extra blanket kind of night! ";
  } else if (temp < 20) {
    message += hour < 17 ? "🧥 Perfect weather for getting things done! " : "🌟 Nice evening for a stroll! ";
  } else if (temp < 30) {
    message += hour < 17 ? "👕 Great day for outdoor activities! " : "✨ Lovely evening for outdoor dining! ";
  } else {
    message += hour < 17 ? "🥵 Find some shade and stay hydrated! " : "🌴 Warm night ahead - keep those windows open! ";
  }

  // Condition interpretation with time context
  if (condition.includes("rain")) {
    message += hour < 17 ? "☔️ Don't forget your umbrella today! " : "🌧️ Cozy indoor evening ahead! ";
  } else if (condition.includes("cloud")) {
    message += hour < 17 ? "☁️ Moody skies but still a great day! " : "🌥️ Clouds making for a gentle evening. ";
  } else if (condition.includes("sunny")) {
    message += hour < 17 ? "😎 Sun's out, fun's out! " : "🌅 Beautiful sunset potential! ";
  } else if (condition.includes("snow")) {
    message += hour < 17 ? "⛄️ Perfect for winter activities! " : "❄️ Magical snowy evening! ";
  }

  // Humidity and wind interpretations
  if (humidity > 80) message += "💦 Feeling pretty sticky out there! ";
  else if (humidity < 30) message += "🏜️ It's drier than a desert today. ";

  if (windSpeed > 30) message += "🌪️ Hold onto your hat! ";
  else if (windSpeed > 15) message += "🍃 Nice breeze to keep things fresh. ";

  return message.trim();
}