import { CurrentWeatherResponse } from "@/api/types";
import { weatherClient } from "@/api/weather";
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
      coordinates ? weatherClient.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  })
}