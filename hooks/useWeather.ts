// hooks/useWeather.ts
import { useState, useEffect } from "react";
import axios from "axios";

const WEATHER_API_KEY = "94549b414a583a918b5f33c1d479000e";

export const useWeather = (
  latitude: number,
  longitude: number,
  unit: "Celsius" | "Fahrenheit" // Add unit parameter
) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [airQuality, setAirQuality] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const convertTemperature = (temp: number) => {
    if (unit === "Fahrenheit") {
      return (temp * 9) / 5 + 32; // Celsius to Fahrenheit conversion
    }
    return temp; // Return Celsius by default
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const tempInCelsius = weatherResponse.data.main.temp;
        const convertedTemp = convertTemperature(tempInCelsius);

        setWeatherData({
          ...weatherResponse.data,
          main: {
            ...weatherResponse.data.main,
            temp: convertedTemp,
          },
        });

        const airQualityResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
        );
        setAirQuality(airQualityResponse.data.list);
      } catch (error) {
        console.error("Error fetching weather or air quality:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude, unit]);

  return { weatherData, airQuality, loading };
};
