export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeatherResponse {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  }
  clouds: {
    all: number;
  }
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  }
  timezone: number;
  id: number;
  name: string;
  cod: number
}

export interface GeocodingResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface ForecastData {
  list: Array<{
    dt: number
    main: CurrentWeatherResponse["main"]
    weather: CurrentWeatherResponse["weather"]
    wind: CurrentWeatherResponse["wind"]
    dt_txt: string
  }>
  city: {
    name: string
    country: string
    sunrise: number
    sunset: number
  }
}