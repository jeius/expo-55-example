import React from "react";
import type { ViewProps } from "react-native";
import { StyleSheet, View } from "react-native";
import {
  GoogleMapsView,
  GoogleMapsViewRef,
  RNAndroidLocationPriority,
  RNIOSLocationAccuracy,
  type RNGoogleMapsPlusViewProps,
  type RNInitialProps,
  type RNLocation,
  type RNLocationConfig,
  type RNMapPadding,
  type RNMapUiSettings,
  type RNMapZoomConfig,
} from "react-native-google-maps-plus";
import { callback } from "react-native-nitro-modules";

import { PHILIPPINES_COORDINATES } from "@/constants";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "./useColorScheme";

type Props = Pick<ViewProps, "style" | "children"> &
  RNGoogleMapsPlusViewProps & {
    mapRef?: React.RefObject<GoogleMapsViewRef | null>;
    offset?: EdgeInsets;
    containerStyle?: ViewProps["style"];
    containerClassName?: ViewProps["className"];
  };

const MAP_ZOOM_CONFIG: RNMapZoomConfig = { min: 0, max: 20 };

const LOCATION_CONFIG: RNLocationConfig = {
  android: {
    priority: RNAndroidLocationPriority.PRIORITY_HIGH_ACCURACY,
    interval: 3000,
    minUpdateInterval: 3000,
  },
  ios: {
    desiredAccuracy: RNIOSLocationAccuracy.ACCURACY_BEST,
    distanceFilterMeters: 10,
  },
};

const UI_SETTINGS: RNMapUiSettings = {
  allGesturesEnabled: true,
  compassEnabled: true,
  indoorLevelPickerEnabled: false,
  mapToolbarEnabled: false,
  myLocationButtonEnabled: false,
  rotateEnabled: true,
  scrollEnabled: true,
  scrollDuringRotateOrZoomEnabled: true,
  tiltEnabled: true,
  zoomControlsEnabled: false,
  zoomGesturesEnabled: true,
  consumeOnMarkerPress: false,
  consumeOnMyLocationButtonPress: false,
};

const DEFAULT_LOCATION: RNLocation = {
  center: PHILIPPINES_COORDINATES,
  altitude: 0,
  accuracy: 0,
  bearing: 0,
  speed: 0,
  time: 0,
};

function createUISettings(overrides: RNMapUiSettings = {}) {
  return { ...UI_SETTINGS, ...overrides };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function wrapCallback<T extends (...args: any[]) => void>(
  propCallback: T | undefined,
  fallback?: (...args: Parameters<T>) => void,
) {
  return callback({
    f: ((...args: Parameters<T>) => {
      propCallback?.(...args);
      fallback?.(...args);
    }) as T,
  });
}

export default function MapView({
  children,
  offset,
  containerClassName,
  containerStyle,
  ...props
}: Props) {
  const theme = useColorScheme();
  const insets = useSafeAreaInsets();

  const uiSettings = createUISettings(props.uiSettings);

  const mapPadding: RNMapPadding = {
    top: insets.top + 16 + (offset?.top ?? 0),
    left: insets.left + 16 + (offset?.left ?? 0),
    bottom: insets.bottom + 16 + (offset?.bottom ?? 0),
    right: insets.right + 16 + (offset?.right ?? 0),
  };

  const initialProps: RNInitialProps = {
    camera: { center: DEFAULT_LOCATION.center, zoom: 12 },
    backgroundColor: theme === "dark" ? "#4f4f4f" : "#FFFFFF",
  };

  return (
    <View style={containerStyle} className={containerClassName ?? "flex-1"}>
      <GoogleMapsView
        {...props}
        initialProps={{ ...initialProps, ...props.initialProps }}
        uiSettings={uiSettings}
        myLocationEnabled={props.myLocationEnabled ?? true}
        trafficEnabled={props.trafficEnabled ?? false}
        indoorEnabled={props.indoorEnabled ?? false}
        style={[StyleSheet.absoluteFill, props.style]}
        userInterfaceStyle={props.userInterfaceStyle ?? theme}
        mapType={props.mapType ?? "normal"}
        mapZoomConfig={props.mapZoomConfig ?? MAP_ZOOM_CONFIG}
        mapPadding={props.mapPadding ?? mapPadding}
        locationConfig={props.locationConfig ?? LOCATION_CONFIG}
        onMapPress={wrapCallback(props.onMapPress)}
        onMapLongPress={wrapCallback(props.onMapLongPress)}
        onPoiPress={wrapCallback(props.onPoiPress)}
        onMarkerPress={wrapCallback(props.onMarkerPress)}
        onPolylinePress={wrapCallback(props.onPolylinePress)}
        onPolygonPress={wrapCallback(props.onPolygonPress)}
        onCirclePress={wrapCallback(props.onCirclePress)}
        onMarkerDragStart={wrapCallback(props.onMarkerDragStart)}
        onMarkerDrag={wrapCallback(props.onMarkerDrag)}
        onMarkerDragEnd={wrapCallback(props.onMarkerDragEnd)}
        onIndoorBuildingFocused={wrapCallback(props.onIndoorBuildingFocused)}
        onIndoorLevelActivated={wrapCallback(props.onIndoorLevelActivated)}
        onInfoWindowPress={wrapCallback(props.onInfoWindowPress)}
        onInfoWindowClose={wrapCallback(props.onInfoWindowClose)}
        onInfoWindowLongPress={wrapCallback(props.onInfoWindowLongPress)}
        onMyLocationPress={wrapCallback(props.onMyLocationPress)}
        onMyLocationButtonPress={wrapCallback(props.onMyLocationButtonPress)}
        onCameraChangeStart={wrapCallback(props.onCameraChangeStart)}
        onCameraChange={wrapCallback(props.onCameraChange)}
        onCameraChangeComplete={wrapCallback(props.onCameraChangeComplete)}
        onMapReady={wrapCallback(props.onMapReady)}
        onMapLoaded={wrapCallback(props.onMapLoaded)}
        onMapError={wrapCallback(props.onMapError, (e) =>
          console.warn("Map error:", e),
        )}
        onLocationUpdate={wrapCallback(props.onLocationUpdate)}
        onLocationError={wrapCallback(props.onLocationError, (e) =>
          console.warn("Location error:", e),
        )}
      />

      {children}
    </View>
  );
}
