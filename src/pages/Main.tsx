import LoadingSkeleton from "@/components/LoadingSkeleton";
import useWeather from "@/hooks/useWeather"
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
  const [cityName, setCityName] = useState('london')
  const { data, isLoading, isError } = useWeather(cityName)

  const handleInputChange = debounce((value: string) => {
    setCityName(value);
  }, 700); // Adjust the delay as needed

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('cityName') as HTMLInputElement;
    setCityName(input.value);
  };

  if (isLoading) {
    return <div>
      <LoadingSkeleton />
    </div>
  }

  if (isError) {
    return <div>Error fetching weather data</div>;
  }

  if (!data) {
    return <div>Error on the data</div>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Write a city name"
        />
      </form>
      <br />
      <h1>{data.name}</h1>
      <br />
      <img src={`https://rodrigokamada.github.io/openweathermap/images/${data.weather[0].icon}_w@2x.png`} />
      <br />
      <h1>Current Temperature: {Math.floor(Math.round(data.main.temp))}</h1>
      <h1>Feels Like: {Math.floor(Math.round(data.main.feels_like))}</h1>
      <h1>Max: {Math.floor(Math.round(data.main.temp_max))}</h1>
      <h1>Min: {Math.floor(Math.round(data.main.temp_min))}</h1>
    </div>
  )
}