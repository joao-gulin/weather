import { useState } from "react";
import CurrentWeather from "@/components/CurrentCard";
import { FavoriteCities } from "@/components/FavoriteCities";
import { HourlyTemperature } from "@/components/HourlyTemperature";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { WeatherDetails } from "@/components/WeatherDetails";
import { WeatherForecast } from "@/components/WeatherForecast";
import { useGeolocation } from "@/hooks/useGeolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { Coord } from "@/api/types";

export default function Main() {
  // Use your geolocation hook
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();

  // Add an override state for a default location (Porto)
  const [overrideCoordinates, setOverrideCoordinates] = useState<Coord | null>(null);
  const effectiveCoordinates = overrideCoordinates ?? coordinates;

  // Pass effectiveCoordinates into your query hooks
  const weatherQuery = useWeatherQuery(effectiveCoordinates);
  const forecastQuery = useForecastQuery(effectiveCoordinates);
  const locationQuery = useReverseGeocodeQuery(effectiveCoordinates);

  // Function to refresh all data
  const handleRefresh = () => {
    // Try to update location
    getLocation();
    // Optionally, you can also trigger refetching
    if (effectiveCoordinates) {
      weatherQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return (
      <div>
        <LoadingSkeleton />
      </div>
    );
  }

  // If there's a location error, provide two options:
  // 1. Retry enabling geolocation
  // 2. Use the default location (Porto)
  if (locationError && !overrideCoordinates) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
        </AlertDescription>
        <div className="flex gap-2">
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setOverrideCoordinates({ lat: 41.1579, lon: -8.6291 } as Coord)
            }
            className="w-fit"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Use Porto
          </Button>
        </div>
      </Alert>
    );
  }

  // If no coordinates are available (and no override set)
  if (!effectiveCoordinates) {
    return (
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <FavoriteCities />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} locationName={locationName} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}
