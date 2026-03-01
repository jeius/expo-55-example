import MapView from "@/components/MapView";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function WorkingMapScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      {/* Header Info */}
      <View className="border-b border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
        <Text className="text-sm font-semibold text-slate-900 dark:text-white">
          Scenario 2: Working (liteMode=true)
        </Text>
        <Text className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          Map tiles load correctly
        </Text>
      </View>

      {/* Map Container */}
      <View className="flex-1">
        <MapView initialProps={{ liteMode: true }} />
      </View>

      {/* Status Bar */}
      <View className="border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <View className="h-3 w-3 rounded-full bg-green-500" />
            <Text className="text-sm text-slate-700 dark:text-slate-300">
              Expected: Map tiles visible
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="h-3 w-3 rounded-full bg-green-500" />
            <Text className="text-sm text-slate-700 dark:text-slate-300">
              Actual: Map tiles visible ✓
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation */}
      <View className="border-t border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
        <View className="flex-row gap-3">
          <Link href="/(maps)/broken" asChild>
            <Pressable className="flex-1 rounded-lg border border-slate-300 bg-slate-100 py-2 dark:border-slate-600 dark:bg-slate-800">
              <Text className="text-center font-semibold text-slate-900 dark:text-white">
                ← Broken
              </Text>
            </Pressable>
          </Link>
          <Link href="/" asChild>
            <Pressable className="flex-1 rounded-lg bg-blue-600 py-2 dark:bg-blue-700">
              <Text className="text-center font-semibold text-white">Home</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
