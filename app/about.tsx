import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";

const About = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#ffffff" }}>
        <Appbar.BackAction onPress={() => router.back()} color="#000" />
        <Appbar.Content title="About App" color="#000" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>About Our Weather App</Text>
        <Text style={styles.paragraph}>
          Welcome to our Weather App! This app provides accurate, real-time
          weather information for locations worldwide. Whether you're preparing
          for a daily commute or planning a vacation, our app helps you stay
          updated on weather conditions so you can make informed decisions.
        </Text>

        <Text style={styles.sectionTitle}>Key Features:</Text>
        <Text style={styles.paragraph}>
          - Current weather data: View live updates for temperature, humidity,
          wind speed, atmospheric pressure, and UV index.
        </Text>
        <Text style={styles.paragraph}>
          - 7-day forecasts: Get detailed predictions for the upcoming week,
          including daily highs and lows, chance of rain, and wind conditions.
        </Text>
        <Text style={styles.paragraph}>
          - Hourly updates: Plan your day with precise, hour-by-hour forecasts.
        </Text>
        <Text style={styles.paragraph}>
          - Severe weather alerts: Receive timely notifications about extreme
          weather events such as thunderstorms, hurricanes, or heatwaves.
        </Text>
        <Text style={styles.paragraph}>
          - Interactive weather maps: Explore radar, satellite imagery, and
          weather patterns with dynamic maps.
        </Text>
        <Text style={styles.paragraph}>
          - Location search: Find real-time weather data for any city or town,
          with automatic detection of your current location.
        </Text>
        <Text style={styles.paragraph}>
          - Customization options: Personalize the app by choosing your
          preferred units (Celsius/Fahrenheit) and display modes (light/dark
          themes).
        </Text>
        <Text style={styles.paragraph}>
          - Widget support: Get quick weather updates directly on your home
          screen with customizable widgets.
        </Text>

        <Text style={styles.sectionTitle}>Our Data Sources:</Text>
        <Text style={styles.paragraph}>
          Our app utilizes reliable weather data from trusted sources like the
          National Weather Service (NWS), European Centre for Medium-Range
          Weather Forecasts (ECMWF), and other global meteorological agencies.
          This ensures that you receive up-to-date and accurate weather
          forecasts, no matter where you are.
        </Text>

        <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        <Text style={styles.paragraph}>
          We prioritize accuracy and user experience. By combining advanced
          weather models with a user-friendly design, we offer an intuitive
          experience that makes checking the weather quick and easy. Our app is
          constantly updated with new features and improvements, ensuring that
          you always have the best tools to stay informed.
        </Text>

        <Text style={styles.sectionTitle}>User Privacy:</Text>
        <Text style={styles.paragraph}>
          We respect your privacy. Our app only uses location data to provide
          you with accurate weather information and does not store or share any
          personal information. You can control location access from your
          device's privacy settings at any time.
        </Text>

        <Text style={styles.sectionTitle}>User Support & Feedback:</Text>
        <Text style={styles.paragraph}>
          We're always looking to improve! If you have any suggestions,
          questions, or encounter any issues, feel free to reach out to our
          support team at support@weatherapp.com. We value your feedback and are
          here to ensure you have the best possible experience.
        </Text>

        <Text style={styles.sectionTitle}>Future Updates:</Text>
        <Text style={styles.paragraph}>
          We are constantly working on new features to enhance the app. Upcoming
          updates include more detailed radar layers, air quality monitoring,
          and integration with smart home devices. Stay tuned for more!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
