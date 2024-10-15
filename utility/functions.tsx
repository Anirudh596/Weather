// Utility functions for unit conversions
export const convertTemperature = (temp, unit) => {
  switch (unit) {
    case "Fahrenheit (°F)":
      return (temp * 9) / 5 + 32;
    case "Kelvin (K)":
      return temp + 273.15;
    default: // Celsius
      return temp;
  }
};

export const convertWindSpeed = (speed, unit) => {
  switch (unit) {
    case "Miles per hour (mph)":
      return speed * 2.23694;
    case "Kilometres per hour (km/h)":
      return speed * 3.6;
    default: // Meters per second
      return speed;
  }
};

export const convertPressure = (pressure, unit) => {
  switch (unit) {
    case "Inches of mercury (inHg)":
      return pressure * 0.02953;
    default: // Hectopascals
      return pressure;
  }
};

export const convertVisibility = (visibility, unit) => {
  switch (unit) {
    case "Miles (mi)":
      return visibility * 0.000621371;
    default: // Kilometers
      return visibility / 1000;
  }
};
