import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";
import type { Coord } from "@/api/types";

export const WEATHER_KEYS = {
  weather: (coords: Coord) => ["weather", coords] as const,
  location: (coords: Coord) => ["weather", coords] as const,
}

export function useWeatherQuery(coordinates: Coord | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0}),
    queryFn: () => 
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  })
}

export function useReverseGeocodeQuery(coordinates: Coord | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0}),
    queryFn: () => 
      coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates
  })
}