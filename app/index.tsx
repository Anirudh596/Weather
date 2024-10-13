import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  ScrollView,
  StatusBar as ReactStatusBar,
  useColorScheme,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video } from "expo-av";
import { Card, Title, Paragraph } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import { useWeather } from "@/hooks/useWeather";
import { useTemperature } from "@/hooks/TemperatureContext";

const { width, height } = Dimensions.get("window");

const LAST_LOCATION_KEY = "last_location";

export default function WeatherApp() {
  const videoRef = useRef<Video>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const color = useColorScheme();
  const { unit } = useTemperature();
  const { weatherData, airQuality, loading, error } = useWeather(
    location?.latitude,
    location?.longitude,
    unit
  );

  const saveLocation = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    try {
      await AsyncStorage.setItem(LAST_LOCATION_KEY, JSON.stringify(coords));
    } catch (e) {
      console.error("Failed to save location:", e);
    }
  };

  const loadLastLocation = async () => {
    try {
      const savedLocation = await AsyncStorage.getItem(LAST_LOCATION_KEY);
      if (savedLocation) {
        setLocation(JSON.parse(savedLocation));
      }
    } catch (e) {
      console.error("Failed to load last location:", e);
    }
  };

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setPermissionGranted(true);
    } else {
      setErrorMsg("Permission to access location was denied");
    }
  };

  const getLocation = async () => {
    try {
      if (permissionGranted) {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const newLocation = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setLocation(newLocation);
        saveLocation(newLocation); // Store the location
      }
    } catch (error) {
      setErrorMsg("Error fetching location");
    }
  };

  useEffect(() => {
    requestLocationPermission();
    loadLastLocation(); // Load the last location when the app starts
  }, []);

  useEffect(() => {
    if (!location && permissionGranted) {
      getLocation();
    }
  }, [permissionGranted]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error || !weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>
          {error || "Failed to fetch weather data"}
        </Text>
      </View>
    );
  }

  const videoMap: any = {
    Clear:
      "https://res.cloudinary.com/djgpm9plo/video/upload/v1728810171/191224-889684869_medium_online-video-cutter.com_wc4l0c.mp4",
    Clouds:
      "https://res.cloudinary.com/djgpm9plo/video/upload/v1728810171/191224-889684869_medium_online-video-cutter.com_wc4l0c.mp4",
    Rain: "https://res.cloudinary.com/djgpm9plo/video/upload/v1728810171/191224-889684869_medium_online-video-cutter.com_wc4l0c.mp4",
  };

  const videoUri = videoMap[weatherData?.weather[0]?.main] || videoMap["Clear"];
  console.log(weatherData);
  const windSpeedCategories = [
    { min: 0, max: 0.3, title: "Calm" },
    { min: 0.3, max: 1.5, title: "Light Air" },
    { min: 1.6, max: 3.3, title: "Light Breeze" },
    { min: 3.4, max: 5.5, title: "Gentle Breeze" },
    { min: 5.6, max: 7.9, title: "Moderate Breeze" },
    { min: 8.0, max: 10.7, title: "Fresh Breeze" },
    { min: 10.8, max: 13.8, title: "Strong Breeze" },
    { min: 13.9, max: 17.1, title: "Near Gale" },
    { min: 17.2, max: 20.7, title: "Gale" },
    { min: 20.8, max: 24.4, title: "Strong Gale" },
    { min: 24.5, max: 28.4, title: "Storm" },
    { min: 28.5, max: 32.6, title: "Violent Storm" },
    { min: 32.7, max: Infinity, title: "Hurricane" },
  ];
  function getWindTitle(speed: number) {
    const category = windSpeedCategories.find(
      (cat) => speed >= cat.min && speed <= cat.max
    );
    return category ? category.title : "Unknown";
  }

  const cardWidth = width > 600 ? "30%" : "30%";
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={color === "dark" ? "black" : "white"}
      />

      {videoUri && (
        <View style={styles.videoWrapper}>
          <Video
            ref={videoRef}
            source={{ uri: videoUri }}
            style={styles.videoBackground}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted={true}
            rate={0.4}
          />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.overlay}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <FontAwesome name="location-arrow" size={20} color="white" />
            <Text style={styles.cityText}>
              {weatherData?.name}, {weatherData?.sys?.country}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Link href={"/city"}>
              <MaterialIcons name="location-city" size={24} color="white" />
            </Link>
            <Link href={"/settings"}>
              <Ionicons name="settings-outline" size={24} color="white" />
            </Link>
          </View>
        </View>
        <View style={{ padding: 24, marginBottom: 12 }}>
          <Text style={styles.tempText}>
            {Math.round(weatherData?.main?.temp)}°C
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 24,
            }}
          >
            <Text style={styles.weatherText}>
              {weatherData?.weather[0]?.main}{" "}
              {Math.round(weatherData?.main?.temp_min)}°/
              {Math.round(weatherData?.main?.temp_max)}° Air Quality:{" "}
              {airQuality?.[0]?.main?.aqi} - satisfactory
            </Text>
          </View>
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 16 }}
        >
          <View style={[styles.card, { flexBasis: cardWidth }]}>
            <FontAwesome name="thermometer" size={24} color="white" />
            <Paragraph style={styles.text}>Feels like</Paragraph>
            <Title style={styles.title}>
              {Math.round(weatherData?.main?.feels_like)}°C
            </Title>
          </View>

          <View style={[styles.card, { flexBasis: cardWidth }]}>
            <Entypo name="drop" size={24} color="white" />
            <Paragraph style={styles.text}>Humidity</Paragraph>
            <Title style={styles.title}>
              {Math.round(weatherData?.main?.humidity)}%
            </Title>
          </View>

          <View style={[styles.card, { flexBasis: cardWidth }]}>
            <Feather name="wind" size={24} color="white" />
            <Paragraph style={styles.text}>NNE wind</Paragraph>
            <Title style={styles.title}>
              {Math.round(weatherData?.wind?.speed)} m/s
            </Title>
          </View>

          <View style={[styles.card, { flexBasis: cardWidth }]}>
            <Entypo name="air" size={24} color="white" />
            <Paragraph style={styles.text}>Air Pressure</Paragraph>
            <Title style={styles.title}>
              {weatherData?.main?.pressure} hPa
            </Title>
          </View>

          <View style={[styles.card, { flexBasis: cardWidth }]}>
            <FontAwesome name="eye" size={24} color="white" />
            <Paragraph style={styles.text}>Visibility</Paragraph>
            <Title style={styles.title}>
              {weatherData?.visibility / 1000} km
            </Title>
          </View>
          <View style={[styles.card, { flexBasis: cardWidth }]}>
            <Entypo name="globe" size={24} color="white" />
            <Paragraph style={styles.text} numberOfLines={1}>
              Ground Level
            </Paragraph>
            <Title style={styles.title}>
              {weatherData?.main?.grnd_level} ft.
            </Title>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "white", fontSize: 16 },
  videoWrapper: {
    position: "absolute",
    top: ReactStatusBar.currentHeight,
    left: 0,
    width,
    height,
  },
  videoBackground: { width: "100%", height: "100%" },
  overlay: { padding: 16, zIndex: 1 },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cityText: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 10,
    fontFamily: "Geist",
  },
  tempText: {
    fontSize: 64,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
    fontFamily: "Geist",
  },
  weatherText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    marginRight: 8,
    fontFamily: "Geist",
  },
  card: {
    marginVertical: 4,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 16,
    borderRadius: 16,
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
