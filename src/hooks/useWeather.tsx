import { CurrentWeatherResponse } from "@/api/types";
import { weatherClient } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export default function useWeather(cityName: string) {
  const { data, isLoading, isError } = useQuery<CurrentWeatherResponse, Error>({
    queryKey: ['currentWeather', cityName],
    queryFn: () => weatherClient.getCurrentWeather(cityName),
    refetchOnWindowFocus: false,
  })

  return {
    data,
    isLoading,
    isError,
  }
}