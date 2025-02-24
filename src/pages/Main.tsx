import CurrentCard from "@/components/CurrentCard";
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
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Write a city name"
        />
      </form>
      <CurrentCard 
        name={data.name}
        icon={data.weather[0].icon}
        description={data.weather[0].description}
        temp={data.main.temp}
        temp_max={data.main.temp_max}
        temp_min={data.main.temp_min}
        feels_like={data.main.feels_like}
        className='absolute left-4 top-4'
      />
    </div>
  )
}