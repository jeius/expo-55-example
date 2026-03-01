import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <StatusBar
        style={isDark ? "light" : "dark"}
        animated
        hideTransitionAnimation="slide"
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "left",
          tabBarActiveTintColor: isDark ? "#fff" : "#000",
          tabBarInactiveTintColor: isDark ? "#999" : "#ccc",
          tabBarStyle: {
            backgroundColor: isDark ? "#1a1a1a" : "#fff",
            borderTopColor: isDark ? "#333" : "#eee",
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "800",
            marginTop: 6,
          },
          tabBarIcon: () => null,
          tabBarIconStyle: { width: 0, height: 0 },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="(maps)"
          options={{
            title: "Maps",
            tabBarLabel: "Maps",
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
