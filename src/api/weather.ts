import axios from "axios"
import { API_CONFIG } from "./config"
import { CurrentWeatherResponse } from "./types"

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
  private createUrl(baseUrl: string ,endpoint: string, params: Record<string, string>) : string {
    /** URLSearchParams utility is used to handle query parameters safely 
    and efficcientyly ensuring they are properly enconded */
    const queryParams = new URLSearchParams({
      /** By spreding this.defaultParams, we ensure that default parameters like
       * the API key and units are includ in every request, reducing redundancy
       */
      ...this.defaultParams,
      ...params,
    })
    /** returns the custom url to be used for any api url for fetching */
    return `${baseUrl}/${endpoint}?${queryParams.toString()}`
  }

  /** This method is generic (<T>), allowing it to fetch data of any type
   * specified by the caller. This makes it flexible and reusable for different
   * API endpoints
   */
  private async fetchData<T>(baseUrl: string, endpoint: string, params:Record<string, string> = {}): Promise<T> {
    const url = this.createUrl(baseUrl, endpoint, params);
    /** Asynchronous operations with the Promises<> and error handling with the
     * try and catch
    */
    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
  }

  async getCurrentWeather(cityName: string): Promise<CurrentWeatherResponse> {
    /** By specifying CurrentWeatherResponse as the return type, it ensures that 
     * the data returned matches the expected, providing type safety and 
     * improvind code relianility*/
    return this.fetchData<CurrentWeatherResponse>(API_CONFIG.BASE_URL,'weather', { q: cityName });
  }
}

export const weatherClient = new WeatherAPI();