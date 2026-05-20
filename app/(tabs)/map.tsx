import { ThemedView } from "@/components/themed-view";
import { PropertyColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

interface Property {
  latitude: number;
  longitude: number;
  location: string;
}

export default function MapScreen() {
  const {
    lat: propertyLatStr,
    lng: propertyLngStr,
    location,
  } = useLocalSearchParams<{ lat: string; lng: string; location: string }>();

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState("");
  const mapRef = useRef<MapView>(null);

  const propertyLocation: Property = {
    latitude: parseFloat(propertyLatStr || "23.0225"),
    longitude: parseFloat(propertyLngStr || "72.5714"),
    location: (location as string) || "Property Location",
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      // Fit map to show both locations
      mapRef.current?.fitToSuppliedMarkers(["user", "property"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    })();
  }, []);

  const routeCoordinates = userLocation
    ? [
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        {
          latitude: propertyLocation.latitude,
          longitude: propertyLocation.longitude,
        },
      ]
    : [];

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <Text>{error}</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="navigate" size={28} color={PropertyColors.primary} />
        <Text style={styles.headerTitle}>
          Directions to {propertyLocation.location}
        </Text>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: propertyLocation.latitude,
          longitude: propertyLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            identifier="user"
            title="Your Location"
            pinColor="blue"
          />
        )}
        <Marker
          coordinate={propertyLocation}
          identifier="property"
          title={propertyLocation.location}
          pinColor="green"
        />
        {routeCoordinates.length > 1 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#000"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={4}
          />
        )}
      </MapView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
});
