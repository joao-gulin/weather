import CurrentCard from "@/components/CurrentCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/useWeather"
import { AlertTriangle, MapPin } from "lucide-react";
import { useState } from "react"

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function Main() {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates)
  const locationQuery = useReverseGeocodeQuery(coordinates)

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      locationQuery.refetch()
    }
  }

  const handleInputChange = debounce((value: string) => {
    setCityName(value);
  }, 700); // Adjust the delay as needed

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('cityName') as HTMLInputElement;
    setCityName(input.value);
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
        <AlertTitle>Lcoation Error</AlertTitle>
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

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Write a city name"
        />
      </form>
      <CurrentCard 
        {...weatherQuery.data}
        className='absolute left-4 top-4'
      />
    </div>
  )
}