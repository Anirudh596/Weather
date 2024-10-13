import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useWeather } from "@/hooks/useWeather"; // Import the weather hook
import * as Location from "expo-location";
import { useColorScheme } from "@/hooks/useColorScheme";
import CustomSplashScreen from "@/components/CustomSplashScreen"; // Import the custom splash screen
import Toast from "react-native-toast-message"; // Import toast library
import { TemperatureProvider } from "@/hooks/TemperatureContext";
import { PaperProvider } from "react-native-paper";

SplashScreen.preventAutoHideAsync(); // Keep splash screen visible by default

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Geist: require("../assets/fonts/Geist-Regular.ttf"),
  });
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { weatherData, loading: weatherLoading } = useWeather(
    location?.latitude,
    location?.longitude
  );

  // Request location permission and fetch location
  useEffect(() => {
    const requestLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const { coords } = await Location.getCurrentPositionAsync();
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        } else {
          throw new Error("Location permission denied");
        }
      } catch (error: any) {
        // Show toast with error and fallback to London coordinates
        Toast.show({
          type: "error",
          text1: "Location Error",
          text2: `${error.message}. Falling back to London.`,
        });
        // Fallback to London
        setLocation({ latitude: 51.5074, longitude: -0.1278 });
      }
    };

    requestLocation();
  }, []);

  useEffect(() => {
    // Hide splash screen when both fonts and weather data are ready
    if (loaded && !weatherLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, weatherLoading]);

  if (!loaded || weatherLoading) {
    // Show the custom splash screen while loading
    return <CustomSplashScreen />;
  }

  return (
    <>
      <TemperatureProvider>
        <PaperProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerShown: false }} />
            <Stack.Screen name="city" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          {/* Render the Toast component */}
          <Toast />
        </PaperProvider>
      </TemperatureProvider>
    </>
  );
}
