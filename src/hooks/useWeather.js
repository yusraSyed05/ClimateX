import { useState } from "react";

const useWeather = (getWeatherDescription, generateHistoricalData, trainMLModel) => {
  const [weatherData, setWeatherData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError("");

    try {
      console.log("Fetching weather for location:", location);

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
      );

      if (!weatherResponse.ok) {
        throw new Error("Unable to fetch weather");
      }

      const weatherJSON = await weatherResponse.json();

      console.log("Weather API response:", weatherJSON);

      const formatted = {
        name: location.name,
        sys: { country: location.country_code || location.country || "" },
        main: {
          temp: weatherJSON.current.temperature_2m,
          feels_like: weatherJSON.current.temperature_2m - 2,
          humidity: weatherJSON.current.relative_humidity_2m,
          pressure: 1013
        },
        wind: {
          speed: weatherJSON.current.wind_speed_10m,
          deg: 0
        },
        weather: [
          {
            description: getWeatherDescription(weatherJSON.current.weather_code)
          }
        ]
      };

      setWeatherData(formatted);

      const hist = generateHistoricalData(formatted);

      setHistoricalData(hist);

      const pred = await trainMLModel(hist, formatted);
      setPrediction(pred);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Unable to fetch weather data. Please try again.");
      setWeatherData(null);
      setPrediction(null);
      setHistoricalData([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData,
    historicalData,
    prediction,
    error,
    loading,
    fetchWeatherData,
    setWeatherData,
    setHistoricalData,
    setPrediction
  };
};

export default useWeather;