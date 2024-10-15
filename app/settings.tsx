import React, { useState, useContext } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import {
  Appbar,
  List,
  Switch,
  Divider,
  Portal,
  Modal,
  RadioButton,
  Button,
} from "react-native-paper";
import { router } from "expo-router";
import { SettingsContext } from "@/hooks/useSettingsContext";

const Settings = () => {
  const settings = useContext(SettingsContext);

  if (!settings) {
    throw new Error("SettingsContext must be used within a SettingsProvider");
  }

  const {
    rainAlerts,
    setRainAlerts,
    dailyForecast,
    setDailyForecast,
    temperatureUnit,
    setTemperatureUnit,
    windUnit,
    setWindUnit,
    pressureUnit,
    setPressureUnit,
    visibilityUnit,
    setVisibilityUnit,
  } = settings;

  const [modalsVisible, setModalsVisible] = useState({
    temperature: false,
    wind: false,
    pressure: false,
    visibility: false,
  });

  const openModal = (modalName) =>
    setModalsVisible({ ...modalsVisible, [modalName]: true });
  const closeAllModals = () =>
    setModalsVisible({
      temperature: false,
      wind: false,
      pressure: false,
      visibility: false,
    });

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
            title="Rain alerts"
            titleStyle={{ color: "#000" }}
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

        <View style={styles.section}>
          <List.Subheader style={styles.subheader}>Units</List.Subheader>

          <List.Item
            title="Temperature"
            titleStyle={{ color: "#000" }}
            description={temperatureUnit}
            onPress={() => openModal("temperature")}
          />
          <List.Item
            title="Wind"
            titleStyle={{ color: "#000" }}
            description={windUnit}
            onPress={() => openModal("wind")}
          />
          <List.Item
            title="Air pressure"
            titleStyle={{ color: "#000" }}
            description={pressureUnit}
            onPress={() => openModal("pressure")}
          />
          <List.Item
            title="Visibility"
            titleStyle={{ color: "#000" }}
            description={visibilityUnit}
            onPress={() => openModal("visibility")}
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

      <Portal>
        <Modal
          contentContainerStyle={styles.modalContainer}
          visible={modalsVisible.temperature}
          onDismiss={closeAllModals}
        >
          <RadioButton.Group
            onValueChange={setTemperatureUnit}
            value={temperatureUnit}
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
            onPress={closeAllModals}
          >
            Done
          </Button>
        </Modal>

        <Modal
          contentContainerStyle={styles.modalContainer}
          visible={modalsVisible.wind}
          onDismiss={closeAllModals}
        >
          <RadioButton.Group onValueChange={setWindUnit} value={windUnit}>
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
            onPress={closeAllModals}
          >
            Done
          </Button>
        </Modal>

        <Modal
          contentContainerStyle={styles.modalContainer}
          visible={modalsVisible.pressure}
          onDismiss={closeAllModals}
        >
          <RadioButton.Group
            onValueChange={setPressureUnit}
            value={pressureUnit}
          >
            <RadioButton.Item
              label="Hectopascals (hPa)"
              color="#627E75"
              labelStyle={{ color: "#000" }}
              value="Hectopascals (hPa)"
            />
            <RadioButton.Item
              label="Inches of mercury (inHg)"
              color="#627E75"
              labelStyle={{ color: "#000" }}
              value="Inches of mercury (inHg)"
            />
          </RadioButton.Group>
          <Button
            buttonColor="#627E75"
            labelStyle={{ color: "#fff" }}
            onPress={closeAllModals}
          >
            Done
          </Button>
        </Modal>

        <Modal
          contentContainerStyle={styles.modalContainer}
          visible={modalsVisible.visibility}
          onDismiss={closeAllModals}
        >
          <RadioButton.Group
            onValueChange={setVisibilityUnit}
            value={visibilityUnit}
          >
            <RadioButton.Item
              color="#627E75"
              labelStyle={{ color: "#000" }}
              label="Kilometres (km)"
              value="Kilometres (km)"
            />
            <RadioButton.Item
              labelStyle={{ color: "#000" }}
              color="#627E75"
              label="Miles (mi)"
              value="Miles (mi)"
            />
          </RadioButton.Group>
          <Button
            buttonColor="#627E75"
            labelStyle={{ color: "#fff" }}
            onPress={closeAllModals}
          >
            Done
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

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
