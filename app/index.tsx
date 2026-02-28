import MapView from "@/components/MapView";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Map() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1" style={{ paddingTop: insets.top }}>
      <MapView />
    </View>
  );
}
