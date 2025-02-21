import { Suspense } from "react"
import WeatherDashboard from "@/components/weather-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <main className="min-h-screen py-10  p-2 md:p-8 bg-gradient-to-b from-sky-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">Weather Forecast</h1>
        <Suspense fallback={<Skeleton className="w-full h-[600px] rounded-xl" />}>
          <WeatherDashboard />
        </Suspense>
      </div>
    </main>
  )
}

