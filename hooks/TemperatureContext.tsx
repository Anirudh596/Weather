import React, { createContext, useState, useContext } from "react";

// Create context
type TemperatureContextType = {
  unit: "Celsius" | "Fahrenheit";
  toggleUnit: () => void;
  convertTemperature: (temp: number) => number;
};

const TemperatureContext = createContext<TemperatureContextType | undefined>(undefined);

// Provider component
export const TemperatureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<"Celsius" | "Fahrenheit">("Celsius");

  // Toggle unit between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "Celsius" ? "Fahrenheit" : "Celsius"));
  };

  // Convert Celsius to Fahrenheit if the selected unit is Fahrenheit
  const convertTemperature = (temp: number) => {
    if (unit === "Fahrenheit") {
      return (temp * 9) / 5 + 32; // Convert to Fahrenheit
    }
    return temp; // Keep as Celsius
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit, convertTemperature }}>
      {children}
    </TemperatureContext.Provider>
  );
};

// Hook to use the temperature context
export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (!context) {
    throw new Error("useTemperature must be used within a TemperatureProvider");
  }
  return context;
};
