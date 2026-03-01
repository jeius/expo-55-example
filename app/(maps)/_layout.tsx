import { Stack } from "expo-router";

export default function MapsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "MapView Scenarios",
      }}
    >
      <Stack.Screen name="broken" options={{ headerTitle: "Broken Map" }} />
      <Stack.Screen name="working" options={{ headerTitle: "Working Map" }} />
    </Stack>
  );
}
