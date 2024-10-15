import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types for settings
interface SettingsContextType {
  rainAlerts: boolean;
  setRainAlerts: (value: boolean) => void;
  dailyForecast: boolean;
  setDailyForecast: (value: boolean) => void;
  temperatureUnit: string;
  setTemperatureUnit: (value: string) => void;
  windUnit: string;
  setWindUnit: (value: string) => void;
  pressureUnit: string;
  setPressureUnit: (value: string) => void;
  visibilityUnit: string;
  setVisibilityUnit: (value: string) => void;
}

// Create a context with the above type
export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

// Define props for the provider
interface SettingsProviderProps {
  children: ReactNode;
}

const SETTINGS_STORAGE_KEY = "appSettings";

// Create the provider component
export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [rainAlerts, setRainAlerts] = useState<boolean>(false);
  const [dailyForecast, setDailyForecast] = useState<boolean>(false);
  const [temperatureUnit, setTemperatureUnit] =
    useState<string>("Celsius (°C)");
  const [windUnit, setWindUnit] = useState<string>("Miles per hour (mph)");
  const [pressureUnit, setPressureUnit] =
    useState<string>("Hectopascals (hPa)");
  const [visibilityUnit, setVisibilityUnit] =
    useState<string>("Kilometres (km)");

  // Load settings from AsyncStorage when the app starts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setRainAlerts(parsedSettings.rainAlerts ?? false);
          setDailyForecast(parsedSettings.dailyForecast ?? false);
          setTemperatureUnit(parsedSettings.temperatureUnit ?? "Celsius (°C)");
          setWindUnit(parsedSettings.windUnit ?? "Miles per hour (mph)");
          setPressureUnit(parsedSettings.pressureUnit ?? "Hectopascals (hPa)");
          setVisibilityUnit(parsedSettings.visibilityUnit ?? "Kilometres (km)");
        }
      } catch (error) {
        console.error("Failed to load settings from AsyncStorage", error);
      }
    };

    loadSettings();
  }, []);

  // Save settings to AsyncStorage whenever they change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        const settings = {
          rainAlerts,
          dailyForecast,
          temperatureUnit,
          windUnit,
          pressureUnit,
          visibilityUnit,
        };
        await AsyncStorage.setItem(
          SETTINGS_STORAGE_KEY,
          JSON.stringify(settings)
        );
      } catch (error) {
        console.error("Failed to save settings to AsyncStorage", error);
      }
    };

    saveSettings();
  }, [
    rainAlerts,
    dailyForecast,
    temperatureUnit,
    windUnit,
    pressureUnit,
    visibilityUnit,
  ]);

  return (
    <SettingsContext.Provider
      value={{
        rainAlerts,
        setRainAlerts,
        dailyForecast,
        setDailyForecast,
        temperatureUnit,
        setTemperatureUnit,
        windUnit,
        setWindUnit,
        pressureUnit,
        setPressureUnit,
        visibilityUnit,
        setVisibilityUnit,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
