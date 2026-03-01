import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "MapView Issue Reproduction",
        headerLargeTitle: true,
      }}
    />
  );
}
