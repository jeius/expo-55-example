import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-slate-950"
      contentContainerClassName="p-6 gap-6"
    >
      {/* Issue Title */}
      <View className="gap-3">
        <Text className="text-2xl font-bold text-slate-900 dark:text-white">
          MapView Tile Loading Issue
        </Text>
        <Text className="text-sm text-slate-600 dark:text-slate-400">
          Google Maps tiles fail to load in normal mode but work correctly when
          liteMode is enabled.
        </Text>
      </View>

      {/* Issue Description */}
      <View className="gap-3 rounded-lg bg-amber-50 p-4 dark:bg-amber-950">
        <Text className="font-semibold text-amber-900 dark:text-amber-100">
          Issue Description
        </Text>
        <Text className="text-sm leading-6 text-amber-800 dark:text-amber-200">
          When initializing the MapView with initialProps.liteMode set to false
          (or undefined), the Google Maps tiles fail to render on the map.
          However, when liteMode is set to true, the map tiles load and display
          correctly.
        </Text>
      </View>

      {/* Expected Behavior */}
      <View className="gap-3 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
        <Text className="font-semibold text-blue-900 dark:text-blue-100">
          Expected Behavior
        </Text>
        <Text className="text-sm leading-6 text-blue-800 dark:text-blue-200">
          Map tiles should load and display correctly regardless of the liteMode
          setting. The liteMode option should only affect performance features,
          not the core map rendering functionality.
        </Text>
      </View>

      {/* Reproduction Steps */}
      <View className="gap-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
        <Text className="font-semibold text-slate-900 dark:text-white">
          Reproduction Steps
        </Text>
        <View className="gap-2">
          <Text className="text-sm text-slate-700 dark:text-slate-300">
            1. Navigate to the "Maps" tab
          </Text>
          <Text className="text-sm text-slate-700 dark:text-slate-300">
            2. View the "Broken" screen with liteMode=false
          </Text>
          <Text className="text-sm text-slate-700 dark:text-slate-300">
            3. Observe that map tiles do not render
          </Text>
          <Text className="text-sm text-slate-700 dark:text-slate-300">
            4. View the "Working" screen with liteMode=true
          </Text>
          <Text className="text-sm text-slate-700 dark:text-slate-300">
            5. Observe that map tiles render correctly
          </Text>
        </View>
      </View>

      {/* Navigation Link */}
      <View className="gap-2 pt-4">
        <Link href="/(maps)/broken" asChild>
          <Text
            role="button"
            className="rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white dark:bg-blue-500"
          >
            View Maps →
          </Text>
        </Link>
      </View>

      {/* Environment Info */}
      <View className="gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
        <Text className="font-semibold text-slate-900 dark:text-white">
          Environment
        </Text>
        <View className="gap-1">
          <Text className="text-xs text-slate-600 dark:text-slate-400">
            • Package: react-native-google-maps-plus v1.11.0
          </Text>
          <Text className="text-xs text-slate-600 dark:text-slate-400">
            • Expo: ~55.0.4
          </Text>
          <Text className="text-xs text-slate-600 dark:text-slate-400">
            • React Native: 0.83.2
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
