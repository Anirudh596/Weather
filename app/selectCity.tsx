import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Appbar, Chip, Divider } from "react-native-paper";
import axios from "axios";
import { router } from "expo-router";
import { useCity } from "@/hooks/CityProvider";

const SelectCity = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const { updateCity } = useCity();

  const searchCity = async () => {
    if (searchText.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const apiKey = "94549b414a583a918b5f33c1d479000e"; // Replace with your OpenWeather API key
      const encodedCity = encodeURIComponent(searchText); // Encode city name
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}`
      );

      const cityData = response.data;
      const city = {
        name: cityData.name,
        latitude: cityData.coord.lat,
        longitude: cityData.coord.lon,
      };

      setSearchResults([city]); // Set the results to the fetched city
    } catch (error) {
      console.error("Error fetching city data", error);
      setSearchResults([]); // Clear results on error
    }
  };

  const selectCity = (name: string, latitude: number, longitude: number) => {
    updateCity(name, latitude, longitude);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#ffffff" }}>
        <Appbar.Action icon="arrow-left" onPress={() => router.back()} />
        <Appbar.Content title="Add City" color="#000" />
        <Appbar.Action
          icon="cancel"
          onPress={() => router.back()}
          color="#000"
        />
      </Appbar.Header>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            searchCity(); // Trigger search on text change
          }}
        />
      </View>

      {/* City Search Results */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {searchResults.map((city, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectCity(city.name, city.latitude, city.longitude)}
          >
            <Chip style={styles.cityChip}>{city.name}</Chip>
          </TouchableOpacity>
        ))}

        <Divider style={styles.divider} />

        {/* Top Cities */}
        <View style={styles.citySection}>
          <Text style={styles.sectionTitle}>Top cities</Text>
          <View style={styles.chipContainer}>
            {["New Delhi", "Kolkata", "Mumbai", "Chennai", "Lucknow"].map(
              (city) => (
                <Chip key={city} style={styles.cityChip}>
                  {city}
                </Chip>
              )
            )}
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Top Cities - World */}
        <View style={styles.citySection}>
          <Text style={styles.sectionTitle}>Top cities - World</Text>
          <View style={styles.chipContainer}>
            {[
              "New York",
              "Paris",
              "London",
              "Tokyo",
              "Rome",
              "Dubai",
              "Moscow",
              "Sydney",
              "Singapore",
              "Beijing",
              "Athens",
            ].map((city) => (
              <Chip key={city} style={styles.cityChip}>
                {city}
              </Chip>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectCity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#F1F1F1",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  citySection: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  cityChip: {
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#F1F1F1",
  },
  divider: {
    marginVertical: 20,
  },
});
