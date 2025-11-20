import { useState, useEffect, useRef } from "react";

const useSuggestions = (query) => {
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchingCities, setSearchingCities] = useState(false);

  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const searchCities = async (search) => {
    if (!search || search.length < 2) {
      setCitySuggestions([]);
      return;
    }

    setSearchingCities(true);

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          search
        )}&count=10&language=en&format=json`
      );

      const data = await response.json();

      if (data.results) {
        const cities = data.results.map((c) => ({
          name: c.name,
          latitude: c.latitude,            
          longitude: c.longitude,          
          country: c.country,
          country_code: c.country_code,
          admin1: c.admin1
        }));

        setCitySuggestions(cities);
        setShowSuggestions(true);
      } else {
        setCitySuggestions([]);
        setShowSuggestions(false);
      }
    } catch (err) {
      console.log("city search error:", err);
      setCitySuggestions([]);
    }

    setSearchingCities(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        searchCities(query);
      } else {
        setCitySuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return {
    citySuggestions,
    showSuggestions,
    searchingCities,
    inputRef,
    suggestionsRef,
    setShowSuggestions,
  };
};

export default useSuggestions;