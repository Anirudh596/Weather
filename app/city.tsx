import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";

const City = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#ffffff" }}>
        <Appbar.BackAction onPress={() => router.back()} color="#000" />
        <Appbar.Content title="Cities" color="#000" />
        <Appbar.Action
          icon={"plus"}
          onPress={() => router.push("/selectCity")}
        />
      </Appbar.Header>
    </SafeAreaView>
  );
};

export default City;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
