import React, { createContext, useState, useContext, ReactNode } from "react";

// Define types for the context
interface WeatherContextType {
  selectedWeather: string;
  setSelectedWeather: (weather: string) => void;
  isDaytime: boolean;
  setIsDaytime: (daytime: boolean) => void;
  isTestingMode: boolean;
  setIsTestingMode: (testingMode: boolean) => void;
}

// Create the context with a default value
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// WeatherProvider component with children prop type
export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedWeather, setSelectedWeather] = useState<string>("Clear");
  const [isDaytime, setIsDaytime] = useState<boolean>(true);
  const [isTestingMode, setIsTestingMode] = useState<boolean>(false); // New state for testing mode

  return (
    <WeatherContext.Provider
      value={{
        selectedWeather,
        setSelectedWeather,
        isDaytime,
        setIsDaytime,
        isTestingMode,
        setIsTestingMode, // Providing the new state to the context
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook to use the weather context with proper typing
export const useWeatherSelection = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error(
      "useWeatherSelection must be used within a WeatherProvider"
    );
  }
  return context;
};
