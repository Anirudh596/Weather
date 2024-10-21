import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types for the city data
interface City {
  name: string;
  latitude: number;
  longitude: number;
}

interface CityContextType {
  selectedCity: City | null;
  setSelectedCity: (city: City) => void;
  updateCity: (name: string, lat: number, lon: number) => void;
}

// Create the context
const CityContext = createContext<CityContextType | undefined>(undefined);

// Create the provider
export const CityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // Load city from AsyncStorage on mount
  useEffect(() => {
    const loadCity = async () => {
      try {
        const storedCity = await AsyncStorage.getItem("selectedCity");
        if (storedCity) {
          setSelectedCity(JSON.parse(storedCity));
        }
      } catch (error) {
        console.error("Failed to load city from storage", error);
      }
    };

    loadCity();
  }, []);

  // Update AsyncStorage when selectedCity changes
  useEffect(() => {
    const saveCity = async () => {
      try {
        if (selectedCity) {
          await AsyncStorage.setItem(
            "selectedCity",
            JSON.stringify(selectedCity)
          );
        }
      } catch (error) {
        console.error("Failed to save city to storage", error);
      }
    };

    saveCity();
  }, [selectedCity]);

  // Function to update the city
  const updateCity = (name: string, latitude: number, longitude: number) => {
    setSelectedCity({ name, latitude, longitude });
  };

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity, updateCity }}>
      {children}
    </CityContext.Provider>
  );
};

// Custom hook to use the CityContext
export const useCity = (): CityContextType => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};
