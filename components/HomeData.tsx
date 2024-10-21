import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
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
import { Paragraph, Title } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const HomeData = ({
  weatherData,
  temperature,
  temperatureUnit,
  minTemperature,
  maxTemperature,
  airQuality,
  feelsTemperature,
  windSpeed,
  windUnit,
  pressure,
  pressureUnit,
  visibility,
  visibilityUnit,
}: {
  weatherData: any;
  temperature: any;
  temperatureUnit: any;
  minTemperature: any;
  maxTemperature: any;
  airQuality: any;
  feelsTemperature: any;
  windSpeed: any;
  windUnit: any;
  pressure: any;
  pressureUnit: any;
  visibility: any;
  visibilityUnit: any;
}) => {
  const cardWidth = width > 600 ? "30%" : "30%";

  return (
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
          {Math.round(temperature)}°
          {temperatureUnit === "Celsius (°C)" ? "C" : "F"}
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
            {weatherData?.weather[0]?.main} {Math.round(minTemperature)}°/
            {Math.round(maxTemperature)}° Air Quality:{" "}
            {airQuality?.[0]?.main?.aqi} - satisfactory
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={[styles.card, { flexBasis: cardWidth }]}>
          <FontAwesome name="thermometer" size={20} color="white" />
          <Paragraph style={styles.text}>Feels like</Paragraph>
          <Title style={styles.title}>
            {Math.round(feelsTemperature)}°
            {temperatureUnit === "Celsius (°C)" ? "C" : "F"}
          </Title>
        </View>

        <View style={[styles.card, { flexBasis: cardWidth }]}>
          <Entypo name="drop" size={20} color="white" />
          <Paragraph style={styles.text}>Humidity</Paragraph>
          <Title style={styles.title}>
            {Math.round(weatherData?.main?.humidity)}%
          </Title>
        </View>

        <View style={[styles.card, { flexBasis: cardWidth }]}>
          <Feather name="wind" size={20} color="white" />
          <Paragraph style={styles.text}>NNE wind</Paragraph>
          <Title style={styles.title}>
            {Math.round(windSpeed)}{" "}
            {windUnit === "Kilometres per hour (km/h)"
              ? "km/h"
              : windUnit === "Meters per second (m/s)"
              ? "m/s"
              : "mph"}
          </Title>
        </View>

        <View style={[styles.card, { flexBasis: cardWidth }]}>
          <Entypo name="air" size={20} color="white" />
          <Paragraph style={styles.text}>Air Pressure</Paragraph>
          <Title style={styles.title}>
            {Math.round(pressure)}{" "}
            {pressureUnit === "Hectopascals (hPa)" ? "hPa" : "inHg"}
          </Title>
        </View>

        <View style={[styles.card, { flexBasis: cardWidth }]}>
          <FontAwesome name="eye" size={20} color="white" />
          <Paragraph style={styles.text}>Visibility</Paragraph>
          <Title style={styles.title}>
            {Math.round(visibility)}{" "}
            {visibilityUnit === "Miles (mi)" ? "mi" : "Km"}
          </Title>
        </View>
        <View style={[styles.card, { flexBasis: cardWidth }]}>
          <Entypo name="globe" size={20} color="white" />
          <Paragraph style={styles.text} numberOfLines={1}>
            Ground Level
          </Paragraph>
          <Title style={styles.title}>
            {weatherData?.main?.grnd_level} ft.
          </Title>
        </View>
      </View>
      {/* <SunriseSunsetProgress
          sunriseTime={sunRiseTime}
          sunsetTime={sunSetTime}
        /> */}
      <View
        style={[
          {
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 16,
            marginHorizontal: 10,
            marginVertical: 12,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            const url = "https://www.healthline.com"; // Example URL you want to open
            router.push(`/webpage?url=${encodeURIComponent(url)}`);
          }}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            marginLeft: 14,
          }}
        >
          <Title style={{ fontSize: 16 }}>Health and LifeStyle</Title>
          <Entypo name="chevron-right" size={24} color={"white"} />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              const url = `https://www.healthline.com/health/allergies/what-is-pollen-count`; // Example URL you want to open
              router.push(`/webpage?url=${encodeURIComponent(url)}`);
            }}
            style={[
              styles.card,
              {
                flexBasis: cardWidth,
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
                backgroundColor: "transparent",
              },
            ]}
          >
            <Ionicons name="flower" size={24} color="white" />
            <Paragraph style={[styles.text, { textAlign: "center" }]}>
              Very Low Pollen Count
            </Paragraph>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const url = `https://www.healthline.com/health-news/tiktok-uv-index-tanning`; // Example URL you want to open
              router.push(`/webpage?url=${encodeURIComponent(url)}`);
            }}
            style={[
              styles.card,
              {
                flexBasis: cardWidth,
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
                backgroundColor: "transparent",
              },
            ]}
          >
            <Feather name="sunset" size={24} color="white" />
            <Paragraph style={[styles.text, { textAlign: "center" }]}>
              Moderate UV Index
            </Paragraph>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const url = `https://www.healthline.com/health/beauty-skin-care/skin-care-routine-for-oily-skin`; // Example URL you want to open
              router.push(`/webpage?url=${encodeURIComponent(url)}`);
            }}
            style={[
              styles.card,
              {
                flexBasis: cardWidth,
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
                backgroundColor: "transparent",
              },
            ]}
          >
            <MaterialCommunityIcons name="face-man" size={24} color="white" />
            <Paragraph style={[styles.text, { textAlign: "center" }]}>
              Use Oil Control Products
            </Paragraph>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const url = `https://www.kaercher.com/in/home-garden/know-how/car-washing.html`; // Example URL you want to open
              router.push(`/webpage?url=${encodeURIComponent(url)}`);
            }}
            style={[
              styles.card,
              {
                flexBasis: cardWidth,
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
                backgroundColor: "transparent",
              },
            ]}
          >
            <FontAwesome name="car" size={24} color="white" />
            <Paragraph style={[styles.text, { textAlign: "center" }]}>
              Very Suitable for Car Washing
            </Paragraph>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const url = `https://www.healthline.com/nutrition/outdoor-workout-ideas`; // Example URL you want to open
              router.push(`/webpage?url=${encodeURIComponent(url)}`);
            }}
            style={[
              styles.card,
              {
                flexBasis: cardWidth,
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                backgroundColor: "transparent",
              },
            ]}
          >
            <FontAwesome6 name="person-running" size={24} color="white" />
            <Paragraph style={[styles.text, { textAlign: "center" }]}>
              Suitable for outdoor workouts
            </Paragraph>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const url = `https://www.sciencedirect.com/topics/computer-science/traffic-condition`; // Example URL you want to open
              router.push(`/webpage?url=${encodeURIComponent(url)}`);
            }}
            style={[
              styles.card,
              {
                flexBasis: cardWidth,
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                backgroundColor: "transparent",
              },
            ]}
          >
            <FontAwesome5 name="train" size={24} color="white" />
            <Paragraph style={[styles.text, { textAlign: "center" }]}>
              Good traffic conditions
            </Paragraph>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const url = `https://www.studyandgoabroad.com/travel-tips/travel-dos-donts/`; // Example URL you want to open
              router.push(`/webpage?url=${encodeURIComponent(url)}`);
            }}
            style={[
              styles.card,
              {
                flexBasis: cardWidth,
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                backgroundColor: "transparent",
              },
            ]}
          >
            <MaterialCommunityIcons name="palm-tree" size={24} color="white" />
            <Paragraph style={[styles.text, { textAlign: "center" }]}>
              Not Suitable for a trip
            </Paragraph>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const url = `https://en.wikipedia.org/wiki/Mosquito#:~:text=Numerous%20species%20of%20mosquito%20can,.%20tritaeniorhynchus%2C%20and%20Ochlerotatus%20triseriatus.`; // Example URL you want to open
              router.push(`/webpage?url=${encodeURIComponent(url)}`);
            }}
            style={[
              styles.card,
              {
                flexBasis: cardWidth,
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                backgroundColor: "transparent",
              },
            ]}
          >
            <FontAwesome6 name="mosquito" size={24} color="white" />
            <Paragraph style={[styles.text, { textAlign: "center" }]}>
              some mosquitos
            </Paragraph>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeData;

const styles = StyleSheet.create({
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
    padding: 12,
    borderRadius: 16,
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
