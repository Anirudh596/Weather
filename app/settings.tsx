import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  ScrollView,
} from "react-native";
import {
  Appbar,
  List,
  Divider,
  Switch,
  Modal,
  Portal,
  RadioButton,
  Button,
} from "react-native-paper";

const Settings = () => {
  // Switch states
  const [rainAlerts, setRainAlerts] = useState(false);
  const [dailyForecast, setDailyForecast] = useState(false);

  // States for unit selection modals
  const [selectedTemperatureUnit, setSelectedTemperatureUnit] =
    useState("Celsius (°C)");
  const [selectedWindUnit, setSelectedWindUnit] = useState(
    "Miles per hour (mph)"
  );
  const [selectedPressureUnit, setSelectedPressureUnit] =
    useState("Hectopascals (hPa)");
  const [selectedVisibilityUnit, setSelectedVisibilityUnit] =
    useState("Kilometres (km)");

  // Modal visibility states
  const [isTemperatureModalVisible, setTemperatureModalVisible] =
    useState(false);
  const [isWindModalVisible, setWindModalVisible] = useState(false);
  const [isPressureModalVisible, setPressureModalVisible] = useState(false);
  const [isVisibilityModalVisible, setVisibilityModalVisible] = useState(false);

  // Function to close all modals
  const closeAllModals = () => {
    setTemperatureModalVisible(false);
    setWindModalVisible(false);
    setPressureModalVisible(false);
    setVisibilityModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#ffffff" }}>
        <Appbar.BackAction onPress={() => router.back()} color="#000" />
        <Appbar.Content title="Settings" color="#000" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.section}>
          <List.Subheader style={styles.subheader}>
            Weather alerts
          </List.Subheader>

          <List.Item
            titleStyle={{ color: "#000" }}
            title="Rain alerts"
            right={() => (
              <Switch
                color="#627E75"
                value={rainAlerts}
                onValueChange={() => setRainAlerts(!rainAlerts)}
              />
            )}
          />

          <List.Item
            titleStyle={{ color: "#000" }}
            descriptionStyle={{ color: "#999" }}
            title="Daily weather forecasts"
            description="Get the weather forecast for your current location after you turn off the first alarm between 4:00 and 10:00 am."
            right={() => (
              <Switch
                color="#627E75"
                value={dailyForecast}
                onValueChange={() => setDailyForecast(!dailyForecast)}
              />
            )}
          />

          <Divider />
        </View>

        {/* Units Section */}
        <View style={styles.section}>
          <List.Subheader style={styles.subheader}>Units</List.Subheader>

          {/* Temperature */}
          <List.Item
            titleStyle={{ color: "#000" }}
            title="Temperature"
            description={selectedTemperatureUnit}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => setTemperatureModalVisible(true)}
          />

          {/* Wind */}
          <List.Item
            titleStyle={{ color: "#000" }}
            title="Wind"
            description={selectedWindUnit}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => setWindModalVisible(true)}
          />

          {/* Air Pressure */}
          <List.Item
            titleStyle={{ color: "#000" }}
            title="Air pressure"
            description={selectedPressureUnit}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => setPressureModalVisible(true)}
          />

          {/* Visibility */}
          <List.Item
            titleStyle={{ color: "#000" }}
            title="Visibility"
            description={selectedVisibilityUnit}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => setVisibilityModalVisible(true)}
          />

          <Divider />
        </View>

        {/* About Weather Section */}
        <View style={styles.section}>
          <List.Item
            titleStyle={{ color: "#000" }}
            title="About Weather"
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => router.push("/about")}
          />
        </View>
      </ScrollView>

      {/* Modal for Temperature Unit */}
      <Portal>
        <Modal
          visible={isTemperatureModalVisible}
          onDismiss={closeAllModals}
          contentContainerStyle={styles.modalContainer}
        >
          <RadioButton.Group
            onValueChange={(value) => setSelectedTemperatureUnit(value)}
            value={selectedTemperatureUnit}
          >
            <RadioButton.Item
              color="#627E75"
              labelStyle={{ color: "#000" }}
              label="Celsius (°C)"
              value="Celsius (°C)"
            />
            <RadioButton.Item
              color="#627E75"
              labelStyle={{ color: "#000" }}
              label="Fahrenheit (°F)"
              value="Fahrenheit (°F)"
            />
          </RadioButton.Group>
          <Button
            buttonColor="#627E75"
            labelStyle={{ color: "#fff" }}
            mode="contained"
            onPress={closeAllModals}
          >
            Done
          </Button>
        </Modal>

        {/* Modal for Wind Unit */}
        <Modal
          visible={isWindModalVisible}
          onDismiss={closeAllModals}
          contentContainerStyle={styles.modalContainer}
        >
          <RadioButton.Group
            onValueChange={(value) => setSelectedWindUnit(value)}
            value={selectedWindUnit}
          >
            <RadioButton.Item
              color="#627E75"
              labelStyle={{ color: "#000" }}
              label="Miles per hour (mph)"
              value="Miles per hour (mph)"
            />
            <RadioButton.Item
              color="#627E75"
              labelStyle={{ color: "#000" }}
              label="Meters per second (m/s)"
              value="Meters per second (m/s)"
            />
            <RadioButton.Item
              color="#627E75"
              labelStyle={{ color: "#000" }}
              label="Kilometres per hour (km/h)"
              value="Kilometres per hour (km/h)"
            />
          </RadioButton.Group>
          <Button
            buttonColor="#627E75"
            labelStyle={{ color: "#fff" }}
            mode="contained"
            onPress={closeAllModals}
          >
            Done
          </Button>
        </Modal>

        {/* Modal for Pressure Unit */}
        <Modal
          visible={isPressureModalVisible}
          onDismiss={closeAllModals}
          contentContainerStyle={styles.modalContainer}
        >
          <RadioButton.Group
            onValueChange={(value) => setSelectedPressureUnit(value)}
            value={selectedPressureUnit}
          >
            <RadioButton.Item
              color="#627E75"
              labelStyle={{ color: "#000" }}
              label="Hectopascals (hPa)"
              value="Hectopascals (hPa)"
            />
            <RadioButton.Item
              color="#627E75"
              labelStyle={{ color: "#000" }}
              label="Inches of mercury (inHg)"
              value="Inches of mercury (inHg)"
            />
          </RadioButton.Group>
          <Button
            buttonColor="#627E75"
            labelStyle={{ color: "#fff" }}
            mode="contained"
            onPress={closeAllModals}
          >
            Done
          </Button>
        </Modal>

        {/* Modal for Visibility Unit */}
        <Modal
          visible={isVisibilityModalVisible}
          onDismiss={closeAllModals}
          contentContainerStyle={styles.modalContainer}
        >
          <RadioButton.Group
            onValueChange={(value) => setSelectedVisibilityUnit(value)}
            value={selectedVisibilityUnit}
          >
            <RadioButton.Item
              color="#627E75"
              labelStyle={{ color: "#000" }}
              label="Kilometres (km)"
              value="Kilometres (km)"
            />
            <RadioButton.Item
              color="#627E75"
              labelStyle={{ color: "#000" }}
              label="Miles (mi)"
              value="Miles (mi)"
            />
          </RadioButton.Group>
          <Button
            buttonColor="#627E75"
            labelStyle={{ color: "#fff" }}
            mode="contained"
            onPress={closeAllModals}
          >
            Done
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

// Styles for Settings Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    paddingBottom: 20,
  },
  section: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  subheader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 16,
    borderRadius: 8,
  },
});

export default Settings;
