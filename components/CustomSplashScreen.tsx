import React from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";

const CustomSplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Centered Image */}
      <Image
        source={require("../assets/images/splash.png")}
        style={styles.image}
      />

      {/* Loading Spinner and Text */}
      <ActivityIndicator size="large" color="#ffffff" style={styles.spinner} />
      <Text style={styles.text}>Getting location-based weather...</Text>
    </View>
  );
};

export default CustomSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#627E75", // Custom background color
  },
  image: {
    width: 240, // Adjust size as needed
    height: 240,
    marginBottom: 20,
  },
  spinner: {
    marginTop: 84,
    marginVertical: 12,
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
