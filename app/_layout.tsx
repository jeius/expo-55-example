import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { Stack } from "expo-router";
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

  useEffect(() => {
    getCurrentPosition();
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        animated
        hideTransitionAnimation="slide"
      />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}

async function getCurrentPosition(
  options: Location.LocationOptions = {
    accuracy: Location.Accuracy.High,
    timeInterval: 1000,
  },
) {
  const { canAskAgain, granted } =
    await Location.getForegroundPermissionsAsync();

  if (!granted && !canAskAgain) {
    throw new Error("Location permission was permanently denied");
  }

  if (!granted && canAskAgain) {
    const { status: newStatus } =
      await Location.requestForegroundPermissionsAsync();
    switch (newStatus) {
      case Location.PermissionStatus.DENIED:
        throw new Error("Location permission was denied");
      case Location.PermissionStatus.UNDETERMINED:
        throw new Error("Location permission is undetermined");
      default:
        break;
    }
  }

  console.log("🧭 Getting current location...");
  return Location.getCurrentPositionAsync(options);
}
