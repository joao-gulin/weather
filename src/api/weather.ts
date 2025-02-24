import axios from "axios"
import { API_CONFIG } from "./config"
import { CurrentWeatherResponse, type Coord, type GeocodingResponse } from "./types"

/** 
Encapsulate the fetch logic inside a class for more modularity and reusability
*/
class WeatherAPI {
  /**
    private variable for the apiKey and the params for the fetch
    And to make the access restrict outside the class 
  */
  private apiKey: string;
  /**
    This utility type constructs an object type whose property keys are Keys 
    and whose property values are Type. This utility 
    can be used to map the properties of a type to another type.

    Example: Record<CatName, CatInfo>;
  */
  private defaultParams: Record<string, string>;

  /** The constructor initializes these properties using 
      values from the API_CONFIG */
  constructor() {
    this.apiKey = API_CONFIG.API_KEY;
    this.defaultParams = API_CONFIG.DEFAULT_PARAMS;
  }

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
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
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
}

export const weatherAPI = new WeatherAPI();