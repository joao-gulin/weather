import { useWeatherQuery } from "@/hooks/useWeather";
import { Alert, AlertDescription } from "../components/ui/alert"
import { useParams, useSearchParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import CurrentWeather from "@/components/CurrentCard";

export function CityPage() {
  const [searchParams] = useSearchParams()
  const params = useParams()
  const lat = parseFloat(searchParams.get("lat") || "0")
  const lon = parseFloat(searchParams.get("lon") || "0")

  const coordinates = { lat, lon }

  const weatherQuery = useWeatherQuery(coordinates)

  if (weatherQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !params.cityName) {
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div className="flex gap-2">

        </div>
      </div>

      <div className="grid gap-6">
        <CurrentWeather data={weatherQuery.data} />

        <div className="grid gap-6 md:grid-cols-2 items-start">
          
        </div>
      </div>
    </div>
  )
}