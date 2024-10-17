import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
  BackHandler, // Used to handle the back button on Android
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";

const Webpage = () => {
  const { url } = useLocalSearchParams(); // Retrieve the URL from search params
  const webViewRef = useRef(null); // Ref to control WebView
  const [canGoBack, setCanGoBack] = useState(false); // State to track if WebView can go back

  useEffect(() => {
    // Handle the Android back button press
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack(); // Go back in WebView's history
        return true; // Prevent default back action
      }
      return false; // Allow default back action if no history
    };

    // Add event listener for Android back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    // Cleanup the event listener
    return () => backHandler.remove();
  }, [canGoBack]);

  if (!url) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No URL provided</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }} // Load the URL from params
        style={styles.webView}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack); // Track if WebView can go back
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
      />
    </SafeAreaView>
  );
};

export default Webpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  webView: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
