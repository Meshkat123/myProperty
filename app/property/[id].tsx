import DocumentViewer from "@/components/DocumentViewer";
import { PropertyColors } from "@/constants/theme";
import { properties } from "@/types/propertydata";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");
const HERO_HEIGHT = height * 0.52;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export default function PropertyDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const property = properties.find((p) => p.id === id);

  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [mapType, setMapType] = useState<"standard" | "satellite">("satellite");

  // Document viewer state
  const [docViewerVisible, setDocViewerVisible] = useState(false);
  const [currentDocUrl, setCurrentDocUrl] = useState<string | undefined>(
    undefined,
  );
  const [currentDocType, setCurrentDocType] = useState<"image" | "pdf">(
    "image",
  );

  const getDocumentType = (url?: string): "image" | "pdf" => {
    if (!url) return "image";
    const lowerUrl = url.toLowerCase();
    return lowerUrl.endsWith(".pdf") ? "pdf" : "image";
  };

  const openDocument = (url: string | null | undefined, title: string) => {
    if (!url || url.trim() === "") {
      Alert.alert("No document", "Document not available");
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentDocUrl(url);
    setCurrentDocType(getDocumentType(url));
    setDocViewerVisible(true);
  };

  const handleGetDirections = async () => {
    try {
      if (!property) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const destination = `${property.latitude},${property.longitude}`;
      let url: string;

      if (Platform.OS === "ios") {
        const googleMapsUrl = `comgooglemaps://?daddr=${destination}&directionsmode=driving&dir_action=navigate`;
        const canOpen = await Linking.canOpenURL(googleMapsUrl);
        url = canOpen
          ? googleMapsUrl
          : `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving&dir_action=navigate`;
      } else {
        url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving&dir_action=navigate`;
      }

      await Linking.openURL(url);
    } catch {
      Alert.alert("Error", "Unable to open directions. Please try again.");
    }
  };

  const handleGetDirectionsFrom = async (
    startLat: number,
    startLng: number,
  ) => {
    try {
      if (!property) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const origin = `${startLat},${startLng}`;
      const destination = `${property.latitude},${property.longitude}`;
      let url: string;

      if (Platform.OS === "ios") {
        const googleMapsUrl = `comgooglemaps://?saddr=${origin}&daddr=${destination}&directionsmode=driving`;
        const canOpen = await Linking.canOpenURL(googleMapsUrl);
        url = canOpen
          ? googleMapsUrl
          : `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
      } else {
        url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
      }

      await Linking.openURL(url);
    } catch {
      Alert.alert("Error", "Unable to open directions. Please try again.");
    }
  };

  const nearbyProperties = useMemo(() => {
    if (!property) return [];
    return properties
      .filter((p) => p.id !== property.id)
      .map((p) => ({
        ...p,
        distance: getDistance(
          property.latitude,
          property.longitude,
          p.latitude,
          p.longitude,
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4);
  }, [property]);

  const images = useMemo(() => {
    if (!property) return [];
    return [property.image, ...(property.gallery || [])].filter(Boolean);
  }, [property]);

  if (!property) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={60} color="#888" />
        <Text style={styles.errorTitle}>Property not available</Text>
        <Text style={styles.errorSub}>It may have been removed.</Text>
      </View>
    );
  }

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar barStyle="light-content" translucent />

        {/* BACKGROUND */}
        <View style={styles.bg} />

        <AnimatedScrollView showsVerticalScrollIndicator={false}>
          {/* HERO */}
          <View style={styles.hero}>
            <Image
              source={{ uri: images[activeImageIdx] }}
              style={styles.heroImage}
            />

            <View style={styles.heroOverlayDark} />
            <View style={styles.heroOverlayFade} />

            {/* BACK */}
            <Pressable style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </Pressable>

            {/* FAVORITE */}
            <Pressable
              style={styles.favBtn}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setIsFavorite(!isFavorite);
              }}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={22}
                color={isFavorite ? PropertyColors.primary : "#fff"}
              />
            </Pressable>

            {/* TITLE */}
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{property.title}</Text>
              <Text style={styles.heroPrice}>{property.price}</Text>
            </View>
          </View>

          {/* OVERVIEW */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <View style={styles.divider} />

            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Ionicons name="bed" size={18} color={PropertyColors.primary} />
                <Text style={styles.statValue}>{property.bedrooms}</Text>
                <Text style={styles.statLabel}>Beds</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons
                  name="water"
                  size={18}
                  color={PropertyColors.primary}
                />
                <Text style={styles.statValue}>{property.bathrooms}</Text>
                <Text style={styles.statLabel}>Baths</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons
                  name="resize"
                  size={18}
                  color={PropertyColors.primary}
                />
                <Text style={styles.statValue}>{property.area}</Text>
                <Text style={styles.statLabel}>Area</Text>
              </View>
            </View>
          </View>

          {/* DOCUMENTS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Documents</Text>
            <View style={styles.divider} />
            {(property.dolil || property.taxDocument) && (
              <View style={styles.documentsRow}>
                {property.dolil && (
                  <Pressable
                    style={styles.docItemActive}
                    onPress={() =>
                      openDocument(property.dolil, "Property Dolil")
                    }
                  >
                    <Ionicons
                      name="document-text-outline"
                      size={18}
                      color={PropertyColors.primary}
                    />
                    <Text style={styles.docLabel}>
                      Dolil{" "}
                      {property.dolil?.split("#")[1] ||
                        property.dolil?.split("/").pop()?.split(".")[0] ||
                        "Document"}
                    </Text>
                  </Pressable>
                )}
                {property.taxDocument && (
                  <Pressable
                    style={styles.docItemActive}
                    onPress={() =>
                      openDocument(property.taxDocument, "Property Tax")
                    }
                  >
                    <Ionicons
                      name="receipt-outline"
                      size={18}
                      color={PropertyColors.primary}
                    />
                    <Text style={styles.docLabel}>
                      Tax{" "}
                      {property.taxDocument?.split(" ")[0] ||
                        property.taxDocument?.split("/").pop()?.split(".")[0] ||
                        "Document"}
                    </Text>
                  </Pressable>
                )}
              </View>
            )}
          </View>

          {/* DESCRIPTION */}
          <Animated.View entering={FadeInUp}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Description</Text>
              <View style={styles.divider} />
              <Text style={styles.desc}>{property.description}</Text>
            </View>
          </Animated.View>

          {/* MAP */}
          <Animated.View entering={FadeInUp.delay(100)}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Location</Text>
              <View style={styles.divider} />

              <View style={{ position: "relative" }}>
                <MapView
                  style={styles.map}
                  mapType={mapType}
                  showsUserLocation
                  showsMyLocationButton
                  region={{
                    latitude: property.latitude,
                    longitude: property.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: property.latitude,
                      longitude: property.longitude,
                    }}
                    title={property.title}
                    pinColor={PropertyColors.primary}
                  />
                  {nearbyProperties.map((np) => (
                    <Marker
                      key={`nearby-${np.id}`}
                      coordinate={{
                        latitude: np.latitude,
                        longitude: np.longitude,
                      }}
                      title={np.title}
                      pinColor="#4dabf7"
                    />
                  ))}
                </MapView>

                <View style={styles.mapBadge}>
                  <Text style={{ color: "#fff", fontSize: 12 }}>
                    Tap for directions
                  </Text>
                </View>

                <Pressable
                  style={styles.mapTypeToggle}
                  onPress={() =>
                    setMapType((prev) =>
                      prev === "satellite" ? "standard" : "satellite",
                    )
                  }
                >
                  <Ionicons
                    name={mapType === "satellite" ? "map" : "globe"}
                    size={16}
                    color="#fff"
                  />
                  <Text style={styles.mapTypeToggleText}>
                    {mapType === "satellite" ? "Standard" : "Satellite"}
                  </Text>
                </Pressable>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.mapBtn,
                  { transform: [{ scale: pressed ? 0.96 : 1 }] },
                ]}
                onPress={handleGetDirections}
              >
                <Text style={styles.mapBtnText}>
                  Get Directions from My Location
                </Text>
              </Pressable>
            </View>
          </Animated.View>

          {/* NEARBY PROPERTIES */}
          {nearbyProperties.length > 0 && (
            <Animated.View entering={FadeInUp.delay(150)}>
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Nearby Properties</Text>
                <View style={styles.divider} />

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {nearbyProperties.map((np) => (
                    <View key={np.id} style={styles.nearbyCard}>
                      <Image
                        source={{ uri: np.image }}
                        style={styles.nearbyImage}
                      />
                      <Text style={styles.nearbyTitle} numberOfLines={1}>
                        {np.title}
                      </Text>
                      <Text style={styles.nearbyLocation} numberOfLines={1}>
                        {np.location}
                      </Text>
                      <Text style={styles.nearbyDistance}>
                        {np.distance.toFixed(1)} km away
                      </Text>
                      <Pressable
                        style={({ pressed }) => [
                          styles.nearbyBtn,
                          { transform: [{ scale: pressed ? 0.96 : 1 }] },
                        ]}
                        onPress={() =>
                          handleGetDirectionsFrom(np.latitude, np.longitude)
                        }
                      >
                        <Text style={styles.nearbyBtnText}>Directions</Text>
                      </Pressable>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Animated.View>
          )}

          {/* GALLERY */}
          {images.length > 1 && (
            <Animated.View entering={FadeInUp.delay(200)}>
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Gallery</Text>
                <View style={styles.divider} />

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {images.map((img, i) => (
                    <Pressable key={i} onPress={() => setActiveImageIdx(i)}>
                      <Image source={{ uri: img }} style={styles.galleryImg} />
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </Animated.View>
          )}

          {/* AGENT */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Agent</Text>
              <View style={styles.divider} />

              <View style={styles.agentRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {property.agent?.slice(0, 2).toUpperCase() || "NA"}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.agentName}>
                    {property.agent || "N/A"}
                  </Text>
                  <Text style={styles.agentSub}>Real Estate Consultant</Text>
                </View>

                <Pressable
                  style={styles.callBtn}
                  onPress={() => Alert.alert("Calling agent...")}
                >
                  <Ionicons name="call" size={18} color="#fff" />
                </Pressable>
              </View>
            </View>
          </Animated.View>

          <View style={{ height: 100 }} />
        </AnimatedScrollView>

        {/* CTA */}
        {/* <View
          style={[
            styles.bottomBar,
            { paddingBottom: insets.bottom },
            { marginBottom: 20 },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              styles.cta,
              { transform: [{ scale: pressed ? 0.96 : 1 }] },
            ]}
          >
            <Text style={styles.ctaText}>Schedule Visit</Text>
          </Pressable>
        </View> */}
      </View>

      {/* Document Viewer Modal */}
      <DocumentViewer
        visible={docViewerVisible}
        documentUrl={currentDocUrl}
        documentType={currentDocType}
        title={property.dolil || property.taxDocument || "Document"}
        onClose={() => {
          setDocViewerVisible(false);
          setCurrentDocUrl(undefined);
        }}
      />
    </>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0f1a" },
  bg: { ...StyleSheet.absoluteFillObject, backgroundColor: "#0b0f1a" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  errorSub: { color: "#888" },

  hero: { height: HERO_HEIGHT },
  heroImage: { width: "100%", height: "100%" },

  heroOverlayDark: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  heroOverlayFade: {
    position: "absolute",
    bottom: 0,
    height: 140,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  heroContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  heroTitle: { color: "#fff", fontSize: 26, fontWeight: "800" },
  heroPrice: { color: PropertyColors.primary, fontSize: 20, fontWeight: "700" },

  backBtn: {
    position: "absolute",
    top: 20,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 20,
  },

  favBtn: {
    position: "absolute",
    top: 20,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 20,
  },

  card: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 10,
  },

  statsGrid: { flexDirection: "row", justifyContent: "space-between" },

  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    marginHorizontal: 4,
  },

  statValue: { color: "#fff", fontWeight: "800", marginTop: 4 },
  statLabel: { color: "#aaa", fontSize: 11 },

  desc: { color: "#ccc", lineHeight: 20 },

  /* Documents styles */
  documentsRow: {
    flexDirection: "row",
    gap: 12,
  },
  docItemActive: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    backgroundColor: "rgba(89, 179, 255, 0.2)",
    borderWidth: 1,
    borderColor: PropertyColors.primary + "30",
    borderRadius: 14,
  },
  docLabel: {
    color: "#ccc",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },

  map: { height: 320, borderRadius: 16 },

  mapBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  mapTypeToggle: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  mapTypeToggleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  mapBtn: {
    marginTop: 12,
    backgroundColor: PropertyColors.primary,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  mapBtnText: { color: "#fff", fontWeight: "700" },

  galleryImg: {
    width: 130,
    height: 100,
    borderRadius: 12,
    marginRight: 10,
  },

  agentRow: { flexDirection: "row", alignItems: "center", gap: 14 },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PropertyColors.primary + "30",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: PropertyColors.primary + "55",
  },

  avatarText: { color: PropertyColors.primary, fontWeight: "800" },

  agentName: { color: "#fff", fontWeight: "700" },
  agentSub: { color: "#888" },

  callBtn: {
    backgroundColor: PropertyColors.primary,
    padding: 10,
    borderRadius: 20,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#0b0f1a",
  },

  cta: {
    backgroundColor: PropertyColors.primary,
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: PropertyColors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },

  ctaText: { color: "#fff", fontWeight: "800" },

  nearbyCard: {
    width: 160,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  nearbyImage: {
    width: "100%",
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },

  nearbyTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  nearbyLocation: {
    color: "#aaa",
    fontSize: 11,
    marginTop: 2,
  },

  nearbyDistance: {
    color: PropertyColors.primary,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },

  nearbyBtn: {
    marginTop: 8,
    backgroundColor: PropertyColors.primary,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  nearbyBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
});
