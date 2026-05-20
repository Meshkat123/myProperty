import { createPropertyCardStyles } from "@/constants/styles";
import { PropertyColors } from "@/constants/theme";
import { Property } from "@/types/property";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

interface PropertyCardProps {
  property: Property;
  style?: ViewStyle;
  isFeatured?: boolean;
  onPress?: () => void;
  onLocationPress?: (location: string, lat: number, lng: number) => void;
  index?: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

/* ---------------- COMPONENT ---------------- */
export default function PropertyCard({
  property,
  style,
  isFeatured = false,
  onPress,
  onLocationPress,
  index = 0,
  onEdit,
  onDelete,
}: PropertyCardProps) {
  const router = useRouter();
  const propertyCardStyles = createPropertyCardStyles();

  const getStatusLabel = (status?: Property["status"]) => {
    switch (status) {
      case "occupied":
        return { label: "Occupied", color: PropertyColors.green };
      case "vacant":
        return { label: "Available", color: PropertyColors.primary };
      case "maintenance":
        return { label: "Maintenance", color: PropertyColors.orange };
      default:
        return { label: "Available", color: PropertyColors.primary };
    }
  };

  const statusInfo = getStatusLabel(property.status);

  const handleMorePress = () => {
    const options: {
      text: string;
      onPress?: () => void;
      style?: "cancel" | "destructive";
    }[] = [{ text: "Cancel", style: "cancel" }];

    if (onEdit) {
      options.push({
        text: "Edit",
        onPress: () => onEdit(property.id),
      });
    }

    if (onDelete) {
      options.push({
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(property.id),
      });
    }

    Alert.alert(property.title, "Choose an action", options);
  };

  const hasDolil = !!property.dolil;
  const hasTaxDocument = !!property.taxDocument;

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100)
        .duration(500)
        .springify()}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          style,
          pressed && styles.pressed,
        ]}
      >
        {/* IMAGE SECTION */}
        <View
          style={[styles.imageContainer, isFeatured && styles.featuredImage]}
        >
          <Image source={{ uri: property.image }} style={styles.image} />

          {/* Gradient overlay */}
          <View style={styles.gradientOverlay} pointerEvents="none" />

          {/* Featured badge */}
          {isFeatured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>
          )}

          {/* Status badge on image */}
          <View
            style={[
              styles.statusBadgeOnImage,
              { backgroundColor: statusInfo.color + "E6" },
            ]}
          >
            <Text style={styles.statusBadgeText}>{statusInfo.label}</Text>
          </View>

          {/* Favorite button */}
          <Pressable
            style={propertyCardStyles.favoriteBtn}
            onPress={(e) => {
              e.stopPropagation();
              // TODO: toggle favorite
            }}
          >
            <Ionicons
              name="heart-outline"
              size={22}
              color="rgba(255,255,255,0.9)"
            />
          </Pressable>

          {/* More options button */}
          {(onEdit || onDelete) && (
            <Pressable
              style={styles.moreBtn}
              onPress={(e) => {
                e.stopPropagation();
                handleMorePress();
              }}
            >
              <Ionicons
                name="ellipsis-horizontal"
                size={22}
                color="rgba(255,255,255,0.9)"
              />
            </Pressable>
          )}
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          {/* Title & Price Row */}
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {property.title}
            </Text>
            <Text style={styles.price}>{property.price}</Text>
          </View>

          {/* Property Details: Beds, Baths, Area */}
          {(property.bedrooms || property.bathrooms || property.area) && (
            <View style={styles.detailsRow}>
              {property.bedrooms !== undefined && (
                <View style={styles.detailItem}>
                  <Ionicons
                    name="bed-outline"
                    size={14}
                    color={PropertyColors.textSecondary}
                  />
                  <Text style={styles.detailText}>
                    {property.bedrooms} Beds
                  </Text>
                </View>
              )}
              {property.bathrooms !== undefined && (
                <View style={styles.detailItem}>
                  <Ionicons
                    name="water-outline"
                    size={14}
                    color={PropertyColors.textSecondary}
                  />
                  <Text style={styles.detailText}>
                    {property.bathrooms} Baths
                  </Text>
                </View>
              )}
              {property.area && (
                <View style={styles.detailItem}>
                  <Ionicons
                    name="resize-outline"
                    size={14}
                    color={PropertyColors.textSecondary}
                  />
                  <Text style={styles.detailText}>{property.area}</Text>
                </View>
              )}
            </View>
          )}

          {/* LOCATION */}
          <Pressable
            style={styles.locationRow}
            onPress={() =>
              onLocationPress?.(
                property.location,
                property.latitude,
                property.longitude,
              )
            }
          >
            <Ionicons
              name="location"
              size={14}
              color={PropertyColors.primary}
            />
            <Text style={styles.locationText} numberOfLines={1}>
              {property.location}
            </Text>
          </Pressable>

          {/* DOCUMENTS STATUS */}
          {(property.dolil || property.taxDocument) && (
            <View style={styles.documentsRow}>
              <View style={[styles.docItem, hasDolil && styles.docItemActive]}>
                <Ionicons
                  name="document-text-outline"
                  size={14}
                  color={
                    hasDolil
                      ? PropertyColors.primary
                      : PropertyColors.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.docText,
                    hasDolil && { color: PropertyColors.primary },
                  ]}
                >
                  Dolil
                </Text>
              </View>
              <View
                style={[styles.docItem, hasTaxDocument && styles.docItemActive]}
              >
                <Ionicons
                  name="receipt-outline"
                  size={14}
                  color={
                    hasTaxDocument
                      ? PropertyColors.primary
                      : PropertyColors.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.docText,
                    hasTaxDocument && { color: PropertyColors.primary },
                  ]}
                >
                  Tax Doc
                </Text>
              </View>
            </View>
          )}

          {/* CTA */}
          <Pressable
            style={styles.ctaButton}
            onPress={() =>
              router.push({
                pathname: "/property/[id]",
                params: { id: property.id },
              })
            }
          >
            <Text style={styles.ctaText}>View Details</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color="#FFFFFF"
              style={styles.ctaIcon}
            />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  imageContainer: {
    height: 200,
    overflow: "hidden",
    position: "relative",
  },
  featuredImage: {
    height: 260,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    // Subtle translucent dark overlay for better text readability
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  featuredBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: PropertyColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  featuredBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  statusBadgeOnImage: {
    position: "absolute",
    bottom: 16,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    zIndex: 10,
  },
  statusBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  moreBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  content: {
    padding: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: PropertyColors.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    color: PropertyColors.primary,
    letterSpacing: -0.3,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
    paddingVertical: 4,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  detailText: {
    fontSize: 13,
    fontWeight: "500",
    color: PropertyColors.textSecondary,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
    paddingVertical: 2,
  },
  locationText: {
    fontSize: 13,
    fontWeight: "500",
    color: PropertyColors.primary,
    flex: 1,
  },
  documentsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 14,
    paddingVertical: 4,
  },
  docItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  docItemActive: {
    backgroundColor: PropertyColors.primary + "15",
    borderWidth: 1,
    borderColor: PropertyColors.primary + "30",
  },
  docText: {
    fontSize: 12,
    fontWeight: "500",
    color: PropertyColors.textSecondary,
  },
  ctaButton: {
    backgroundColor: PropertyColors.primary + "18",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: PropertyColors.primary + "30",
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "700",
    color: PropertyColors.primary,
  },
  ctaIcon: {
    marginLeft: 2,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
});
