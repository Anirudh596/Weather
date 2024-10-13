import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
