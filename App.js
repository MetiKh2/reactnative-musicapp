import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView, StatusBar, Text } from "react-native";
import { AudioProvider } from "./src/context/AudioContext";
import StackNavigator from "./src/navigation/StackNavigator";
export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(true);

  return assetsLoaded ? (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <AudioProvider>
        <StackNavigator />
      </AudioProvider>
    </SafeAreaView>
  ) : (
    <ActivityIndicator size="small"></ActivityIndicator>
  );
}
