import { PropertyColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MapViewComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.mockMap}>
        {/* Mock water/land pattern or just blue */}
      </View>
      {/* Mock markers */}
      <View style={[styles.marker, { left: "20%", top: "30%" }]} />
      <View style={[styles.marker, { right: "25%", top: "50%" }]} />
      <View style={[styles.marker, { left: "40%", top: "75%" }]} />
      <View style={[styles.marker, { right: "10%", bottom: "20%" }]} />
      <View
        style={[
          styles.marker,
          styles.activeMarker,
          { left: "60%", top: "40%" },
        ]}
      />
      {/* Overlay */}
      <View style={styles.overlayContainer}>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>14 Properties</Text>
          <Text style={styles.statsSub}>8 Occupied • 6 Available</Text>
        </View>
        <Pressable style={styles.mapCta}>
          <Text style={styles.mapCtaText}>View All Locations</Text>
          <Ionicons
            name="map-outline"
            size={20}
            color={PropertyColors.textPrimary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: PropertyColors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  mockMap: {
    flex: 1,
    backgroundColor: PropertyColors.blueMap,
  },
  marker: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  activeMarker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PropertyColors.primary,
  },
  overlayContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsContainer: {
    gap: 4,
  },
  stats: {
    fontSize: 18,
    fontWeight: "700",
    color: PropertyColors.textPrimary,
  },
  statsSub: {
    fontSize: 14,
    color: PropertyColors.textSecondary,
  },
  mapCta: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: PropertyColors.glass,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  mapCtaText: {
    fontSize: 16,
    fontWeight: "600",
    color: PropertyColors.textPrimary,
  },
});
