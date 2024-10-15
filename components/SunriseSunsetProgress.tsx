import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Rect } from "react-native-svg"; // For the progress bar

const { width } = Dimensions.get("window");

const SunriseSunsetProgress = ({ sunriseTime, sunsetTime, currentTime }) => {
  // Function to convert time string (e.g., "5:30 am") into minutes
  const getTimeInMinutes = (time) => {
    if (!time || typeof time !== "string") {
      console.error("Invalid time format:", time);
      return 0; // Return 0 as a fallback in case of invalid time
    }

    const [timePart, period] = time.split(" ");
    const [hours, minutes] = timePart.split(":").map(Number);

    let totalMinutes = hours * 60 + minutes;
    if (period === "pm" && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period === "am" && hours === 12) {
      totalMinutes -= 12 * 60;
    }
    return totalMinutes;
  };

  // Convert the sunrise, sunset, and current time to minutes
  const sunrise = getTimeInMinutes(sunriseTime);
  const sunset = getTimeInMinutes(sunsetTime);
  const current = getTimeInMinutes(currentTime);

  // Calculate the progress between sunrise and sunset
  const progress = (current - sunrise) / (sunset - sunrise);

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <View style={styles.iconWithLabel}>
          <FontAwesome5 name="sun" size={20} color="white" />
          <Text style={styles.iconLabel}>Sunset</Text>
        </View>
        <View style={styles.iconWithLabel}>
          <FontAwesome5 name="sun" size={20} color="white" />
          <Text style={styles.iconLabel}>Sunrise</Text>
        </View>
      </View>

      {/* Progress bar */}

      <View style={styles.timeContainer}>
        <Text style={styles.timeLabel}>{sunsetTime}</Text>
        <Text style={styles.timeLabel}>{sunriseTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    padding: 10,
    backgroundColor: "#1a2236",
    borderRadius: 10,
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  iconWithLabel: {
    alignItems: "center",
  },
  iconLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
  },
  progressBarContainer: {
    position: "relative",
    width: width * 0.8,
    marginTop: 10,
    marginBottom: 10,
  },
  moonIcon: {
    position: "absolute",
    top: -10,
    transform: [{ translateX: -10 }], // Center moon icon on progress bar
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  timeLabel: {
    color: "#fff",
    fontSize: 14,
  },
});

export default SunriseSunsetProgress;
