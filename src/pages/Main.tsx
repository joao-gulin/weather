import CurrentCard from "@/components/CurrentCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/useWeather"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

export default function Main() {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates)
  const locationQuery = useReverseGeocodeQuery(coordinates)

    // Function to refresh all data
    const handleRefresh = () => {
      getLocation();
      if (coordinates) {
        weatherQuery.refetch();
        locationQuery.refetch();
      }
    };

  if (locationLoading) {
    return <div>
      <LoadingSkeleton />
    </div>
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4"/>
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
        </AlertDescription>
        <Button variant="outline" onClick={getLocation} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </Alert>
    )
  }

  if (!coordinates) {
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
    )
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error) {
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

  if (!weatherQuery.data) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentCard 
            data={weatherQuery.data}
            locationName={locationName}
          />
        </div>
      </div>
    </div>
  )
}