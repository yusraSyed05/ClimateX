import React, { useState } from "react";
import { Cloudy, Home, AlertCircle } from "lucide-react";

// components
import SearchBar from "./components/SearchBar";
import SuggestionsDropdown from "./components/SuggestionsDropdown";
import WelcomeSection from "./components/WelcomeSection";

import TemperatureCard from "./components/WeatherCards/TemperatureCard";
import HumidityCard from "./components/WeatherCards/HumidityCard";
import WindCard from "./components/WeatherCards/WindCard";
import CO2Card from "./components/WeatherCards/CO2Card";

import TemperatureChart from "./components/Charts/TemperatureChart";
import CO2Chart from "./components/Charts/CO2Chart";
import RainfallChart from "./components/Charts/RainfallChart";
import HumidityChart from "./components/Charts/HumidityChart";

import ForecastHeader from "./components/Forecast/ForecastHeader";
import ForecastDayCard from "./components/Forecast/ForecastDayCard";
import ForecastSummary from "./components/Forecast/ForecastSummary";

// hooks
import useSuggestions from "./hooks/useSuggestions";
import useWeather from "./hooks/useWeather";
import usePrediction from "./hooks/usePrediction";


// ---------------- UTILS ----------------

const generateHistoricalData = (weatherData) => {
  const history = [];
  let baseTemp = weatherData.main.temp;

  for (let i = 0; i < 30; i++) {
    history.push({
      day: `Day ${i + 1}`,
      temp: baseTemp + (Math.random() * 4 - 2),
      humidity: weatherData.main.humidity + (Math.random() * 10 - 5),
      rainfall: Math.random() * 10,
      co2: 400 + Math.floor(Math.random() * 40),
    });
  }

  return history;
};

const getWeatherDescription = (code) => {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };
  return descriptions[code] || "Unknown weather condition";
};


// ---------------- MAIN COMPONENT ----------------

const ClimateX = () => {
  const [city, setCity] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const {
    citySuggestions,
    showSuggestions,
    searchingCities,
    suggestionsRef,
    inputRef,
    setShowSuggestions,
  } = useSuggestions(city);

  const { trainMLModel } = usePrediction();

  const {
    weatherData,
    historicalData,
    prediction,
    error,
    loading,
    fetchWeatherData,
    setWeatherData,
    setHistoricalData,
    setPrediction,
  } = useWeather(getWeatherDescription, generateHistoricalData, trainMLModel);


  // city select
  const handleSelect = (location) => {
    setCity(`${location.name}, ${location.country || location.country_code}`);
    setHasSearched(true);
    setShowSuggestions(false);
    
    // Clear suggestions after result shows
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }, 0);
    
    fetchWeatherData(location);
    setAnimationKey((p) => p + 1);
  };


  // search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (citySuggestions.length > 0) {
      handleSelect(citySuggestions[0]);
    }
  };


  // reset
  const handleReset = () => {
    setCity("");
    setHasSearched(false);
    setWeatherData(null);
    setHistoricalData([]);
    setPrediction(null);
    setShowSuggestions(false);
  };


  return (
    <div className="min-h-screen bg-gray-900 flex flex-col overflow-hidden relative">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>
      <div className="flex-grow p-4 md:p-8 relative z-10">
        <div className="max-w-7xl mx-auto relative">

          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Cloudy className="w-16 h-16 text-cyan-400 mr-4 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
                ClimateX
              </h1>
            </div>

            {weatherData && hasSearched && (
              <button
                onClick={handleReset}
                className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition"
              >
                <Home className="mr-2" size={18} />
                Back to Home
              </button>
            )}
          </div>

          {/* SEARCH BAR */}
          <SearchBar
            city={city}
            setCity={setCity}
            onSearch={handleSearch}
            inputRef={inputRef}
            setShowSuggestions={setShowSuggestions}
          />

          {/* SUGGESTIONS */}
          {!hasSearched && (
            <SuggestionsDropdown
              showSuggestions={showSuggestions}
              suggestionsRef={suggestionsRef}
              citySuggestions={citySuggestions}
              onSelect={handleSelect}
            />
          )}

          {/* STATES */}
          {searchingCities && (
            <p className="text-center text-cyan-400 mt-4">Searching cities...</p>
          )}

          {loading && (
            <p className="text-center text-cyan-400 mt-4">Loading weather data...</p>
          )}

          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-300 flex items-center max-w-2xl mx-auto">
              <AlertCircle className="mr-2" size={18} />
              {error}
            </div>
          )}

          {/* WELCOME */}
          {!hasSearched && !loading && <WelcomeSection />}

          {/* WEATHER SECTION */}
          {weatherData && hasSearched && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white">
                  {weatherData.name}, {weatherData.sys.country}
                </h2>
                <p className="text-cyan-400 text-lg capitalize">
                  {weatherData.weather[0].description}
                </p>
              </div>

              {/* WEATHER CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <TemperatureCard
                  temp={weatherData.main.temp}
                  feels={weatherData.main.feels_like}
                />
                <HumidityCard
                  humidity={weatherData.main.humidity}
                  pressure={weatherData.main.pressure}
                />
                <WindCard
                  speed={weatherData.wind.speed}
                  deg={weatherData.wind.deg}
                />
                <CO2Card
                  co2={historicalData[historicalData.length - 1]?.co2}
                />
              </div>

              {/* FORECAST */}
              {prediction && (
                <div className="mb-10 bg-gray-800/50 p-6 rounded-2xl border border-indigo-400/30">
                  <ForecastHeader prediction={prediction} />

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
                    {prediction.weeklyForecast.map((d, i) => (
                      <ForecastDayCard key={i} day={d} />
                    ))}
                  </div>

                  <ForecastSummary prediction={prediction} />
                </div>
              )}

              {/* CHARTS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TemperatureChart data={historicalData} animationKey={animationKey} />
                <CO2Chart data={historicalData} animationKey={animationKey} />
                <RainfallChart data={historicalData} animationKey={animationKey} />
                <HumidityChart data={historicalData} animationKey={animationKey} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center py-4 text-gray-300 bg-gray-800/80 relative z-10">
        Made with 💕 by Yusra © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default ClimateX;