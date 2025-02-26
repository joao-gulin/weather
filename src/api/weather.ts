import { API_CONFIG } from "./config"
import type { CurrentWeatherResponse, Coord, GeocodingResponse, ForecastData } from "./types"

/** 
Encapsulate the fetch logic inside a class for more modularity and reusability
*/
class WeatherAPI {
  /** private method for creating the api url with its params */
  private createUrl(endpoint: string, params: Record<string, string>) : string {
    /** URLSearchParams utility is used to handle query parameters safely 
    and efficcientyly ensuring they are properly enconded */
    const queryParams = new URLSearchParams({
      /** By spreding this.defaultParams, we ensure that default parameters like
       * the API key and units are includ in every request, reducing redundancy
       */
      appid: API_CONFIG.API_KEY,
      ...params,
    })
    /** returns the custom url to be used for any api url for fetching */
    return `${endpoint}?${queryParams.toString()}`
  }

  /** This method is generic (<T>), allowing it to fetch data of any type
   * specified by the caller. This makes it flexible and reusable for different
   * API endpoints
   */
  private async fetchData<T>(url:string): Promise<T> {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`)
    }

    return response.json()
  }

  async getCurrentWeather({ lat, lon }: Coord): Promise<CurrentWeatherResponse> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    })
    return this.fetchData<CurrentWeatherResponse>(url)
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coord): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1"
    })
    return this.fetchData<GeocodingResponse[]>(url)
  }

  async getForecast({ 
    lat, 
    lon }: Coord): Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric"
    })
    return this.fetchData<ForecastData>(url)
  }

  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: "5",
    })
    return this.fetchData<GeocodingResponse[]>(url)
  }
}

export const weatherAPI = new WeatherAPI();