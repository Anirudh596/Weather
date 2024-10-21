import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  ScrollView,
  StatusBar as ReactStatusBar,
  useColorScheme,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video } from "expo-av";
import { Card, Title, Paragraph, Divider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useWeather } from "@/hooks/useWeather";
import { useTemperature } from "@/hooks/TemperatureContext";
import { SettingsContext } from "@/hooks/useSettingsContext";
import {
  convertPressure,
  convertTemperature,
  convertVisibility,
  convertWindSpeed,
} from "@/utility/functions";
import SunriseSunsetProgress from "@/components/SunriseSunsetProgress";
import HomeData from "@/components/HomeData";
import { useWeatherSelection } from "@/hooks/WeatherContext";
import { useCity } from "@/hooks/CityProvider";
const { width, height } = Dimensions.get("window");

const LAST_LOCATION_KEY = "last_location";

export default function WeatherApp() {
  const videoRef = useRef<Video>(null);
  const { selectedCity } = useCity();
  console.log(selectedCity);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const color = useColorScheme();
  const { temperatureUnit, windUnit, pressureUnit, visibilityUnit } =
    useContext(SettingsContext);
  const { unit } = useTemperature();
  const { weatherData, airQuality, loading, error } = useWeather(
    location?.latitude,
    location?.longitude,
    unit
  );
  const { selectedWeather, isDaytime, isTestingMode } = useWeatherSelection();
  const [videoError, setVideoError] = useState(false); // Track video loading error

  const handleVideoError = () => {
    setVideoError(true); // If video fails, show a static background
  };

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
    Clear: {
      day: "https://res.cloudinary.com/djgpm9plo/video/upload/v1729011643/Untitled_video_-_Made_with_Clipchamp_krdfvb.mp4",
      night:
        "https://res.cloudinary.com/dvazjqpgb/video/upload/v1729265145/159300-818469277_hnpl78_uhmgiv.mp4",
    },
    Clouds: {
      day: "https://res.cloudinary.com/djgpm9plo/video/upload/v1728810171/191224-889684869_medium_online-video-cutter.com_wc4l0c.mp4",
      night:
        "https://res.cloudinary.com/dvazjqpgb/video/upload/v1729265221/Untitled_video_-_Made_with_Clipchamp_2_e1f7i4.mp4",
    },
    Rain: {
      day: "https://res.cloudinary.com/djgpm9plo/video/upload/v1728810171/191224-889684869_medium_online-video-cutter.com_wc4l0c.mp4",
      night:
        "https://res.cloudinary.com/dvazjqpgb/video/upload/v1729265451/174262-851138194_ilyf3w.mp4",
    },
    Drizzle: {
      day: "https://example.com/day_drizzle.mp4",
      night: "https://example.com/night_drizzle.mp4",
    },
    Thunderstorm: {
      day: "https://example.com/day_thunderstorm.mp4",
      night:
        "https://res.cloudinary.com/dvazjqpgb/video/upload/v1729265451/174262-851138194_ilyf3w.mp4",
    },
    Snow: {
      day: "https://res.cloudinary.com/dvazjqpgb/video/upload/v1729265451/174262-851138194_ilyf3w.mp4",
      night:
        "https://res.cloudinary.com/dvazjqpgb/video/upload/v1729265625/191441-890098915_bhq1tb.mp4 ",
    },
    Mist: {
      day: "https://example.com/day_mist.mp4",
      night: "https://example.com/night_mist.mp4",
    },
    Smoke: {
      day: "https://example.com/day_smoke.mp4",
      night: "https://example.com/night_smoke.mp4",
    },
    Haze: {
      day: "https://res.cloudinary.com/djgpm9plo/video/upload/v1729012775/12488549_1080_1920_30fps_tey1dc.mp4",
      night:
        "https://res.cloudinary.com/djgpm9plo/video/upload/v1729012846/Untitled_video_-_Made_with_Clipchamp_1_noq1ud.mp4",
    },
    Dust: {
      day: "https://example.com/day_dust.mp4",
      night: "https://example.com/night_dust.mp4",
    },
    Fog: {
      day: "https://example.com/day_fog.mp4",
      night: "https://example.com/night_fog.mp4",
    },
    Sand: {
      day: "https://example.com/day_sand.mp4",
      night: "https://example.com/night_sand.mp4",
    },
    Ash: {
      day: "https://example.com/day_ash.mp4",
      night: "https://example.com/night_ash.mp4",
    },
    Squall: {
      day: "https://example.com/day_squall.mp4",
      night: "https://example.com/night_squall.mp4",
    },
    Tornado: {
      day: "https://res.cloudinary.com/djgpm9plo/video/upload/v1728810171/191224-889684869_medium_online-video-cutter.com_wc4l0c.mp4",
      night:
        "https://res.cloudinary.com/djgpm9plo/video/upload/v1728810171/191224-889684869_medium_online-video-cutter.com_wc4l0c.mp4",
    },
  };

  const isDaytime2 = () => {
    const currentTime = new Date().getTime(); // current time
    const sunriseTime = new Date(weatherData?.sys?.sunrise * 1000).getTime(); // sunrise
    const sunsetTime = new Date(weatherData?.sys?.sunset * 1000).getTime(); // sunset
    return currentTime >= sunriseTime && currentTime < sunsetTime;
  };

  const videoUri = isDaytime2()
    ? videoMap[weatherData?.weather[0]?.main]?.day
    : videoMap[weatherData?.weather[0]?.main]?.night || videoMap["Clear"].day;

  const videoUriTest = isDaytime
    ? videoMap[selectedWeather]?.day
    : videoMap[selectedWeather]?.night;

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

  const temperature = convertTemperature(
    weatherData?.main?.temp,
    temperatureUnit
  );
  const feelsTemperature = convertTemperature(
    weatherData?.main?.feels_like,
    temperatureUnit
  );
  const windSpeed = convertWindSpeed(weatherData?.wind?.speed, windUnit);
  const pressure = convertPressure(weatherData?.main?.pressure, pressureUnit);
  const visibility = convertVisibility(weatherData?.visibility, visibilityUnit);
  const minTemperature = convertTemperature(
    weatherData?.main?.temp_min,
    temperatureUnit
  );
  const maxTemperature = convertTemperature(
    weatherData?.main?.temp_max,
    temperatureUnit
  );
  console.log(videoUriTest);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={color === "dark" ? "black" : "white"}
      />

      {videoError && videoUri ? (
        <View style={styles.videoWrapper}>
          <Video
            ref={videoRef}
            source={{ uri: isTestingMode ? videoUriTest : videoUri }}
            style={styles.videoBackground}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted={true}
            rate={0.4}
            onError={handleVideoError} // Handle video error
          />
        </View>
      ) : isTestingMode ? (
        <View style={styles.videoWrapper}>
          <Video
            ref={videoRef}
            source={{ uri: isTestingMode ? videoUriTest : videoUri }}
            style={styles.videoBackground}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted={true}
            rate={0.4}
            onError={handleVideoError} // Handle video error
          />
        </View>
      ) : (
        <View style={styles.staticBackground}>
          <HomeData
            weatherData={weatherData}
            airQuality={airQuality}
            feelsTemperature={feelsTemperature}
            maxTemperature={maxTemperature}
            minTemperature={minTemperature}
            pressure={pressure}
            pressureUnit={pressureUnit}
            temperature={temperature}
            temperatureUnit={temperatureUnit}
            visibility={visibility}
            visibilityUnit={visibilityUnit}
            windSpeed={windSpeed}
            windUnit={windUnit}
          />
        </View>
      )}

      <HomeData
        weatherData={weatherData}
        airQuality={airQuality}
        feelsTemperature={feelsTemperature}
        maxTemperature={maxTemperature}
        minTemperature={minTemperature}
        pressure={pressure}
        pressureUnit={pressureUnit}
        temperature={temperature}
        temperatureUnit={temperatureUnit}
        visibility={visibility}
        visibilityUnit={visibilityUnit}
        windSpeed={windSpeed}
        windUnit={windUnit}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  videoWrapper: {
    position: "absolute",
    top: ReactStatusBar.currentHeight,
    left: 0,
    width,
    height,
  },
  videoBackground: { width: "100%", height: "100%" },
  staticBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "#627E75", // Use an image or set a background color
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: { color: "white", fontSize: 16 },
});
