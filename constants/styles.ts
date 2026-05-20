import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { PropertyColors } from "./theme";

/* ---------------- SHADOWS ---------------- */
export const Shadows = StyleSheet.create({
  card: {
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  small: {
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.45,
    shadowRadius: 25,
    elevation: 20,
  },
  subtle: {
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  hero: {
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 15,
  },
});

/* ---------------- SPACING ---------------- */
export const Spacings = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/* ---------------- BORDER RADIUS ---------------- */
export const BorderRadii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/* ---------------- TYPOGRAPHY (STRICT TEXT STYLE ONLY) ---------------- */
export const Typography: Record<string, TextStyle> = {
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 38,
    letterSpacing: -0.5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  cardPrice: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },

  priceLarge: {
    fontSize: 32,
    fontWeight: "800",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  locationText: {
    fontSize: 14,
    fontWeight: "500",
  },
};

/* ---------------- GLOBAL STYLES (STRICT VIEW STYLE ONLY) ---------------- */
const globalStyles = StyleSheet.create<{
  container: ViewStyle;
  safeArea: ViewStyle;
  background: ViewStyle;
  cardSurface: ViewStyle;
  glass: ViewStyle;
  searchBg: ViewStyle;
  ctaButton: ViewStyle;
  statusBadge: ViewStyle;
  row: ViewStyle;
  locationRow: ViewStyle;
  contentPadding: ViewStyle;
  overlay: ViewStyle;
  imageContainer: ViewStyle;
  featuredImageContainer: ViewStyle;
  propertyCardContainer: ViewStyle;
  pressedScale: ViewStyle;
  sectionTitle: TextStyle;
  headerContainer: ViewStyle;
  headerLeft: ViewStyle;
  headerGreeting: TextStyle;
  searchContainer: ViewStyle;
  filterContainer: ViewStyle;
  mapContainer: ViewStyle;
}>({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  background: {
    backgroundColor: PropertyColors.background,
  },

  cardSurface: {
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: BorderRadii.xxl,
    ...Shadows.card,
  },

  glass: {
    backgroundColor: PropertyColors.glass,
  },

  searchBg: {
    backgroundColor: PropertyColors.searchBg,
  },

  ctaButton: {
    backgroundColor: PropertyColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
    paddingVertical: 4,
  },

  contentPadding: {
    padding: 20,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: PropertyColors.overlay,
  },

  imageContainer: {
    height: 200,
    overflow: "hidden",
  },

  featuredImageContainer: {
    height: 260,
    overflow: "hidden",
  },

  propertyCardContainer: {
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 24,
    overflow: "hidden",
    ...Shadows.card,
  },

  pressedScale: {
    transform: [{ scale: 0.96 }],
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingTop: 60,
  },

  headerLeft: {
    flex: 1,
  },

  headerGreeting: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PropertyColors.searchBg,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 24,
    marginHorizontal: 24,
    ...Shadows.small,
  },

  filterContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    ...Shadows.subtle,
  },

  mapContainer: {
    height: 300,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 24,
    overflow: "hidden",
    ...Shadows.card,
  },
});

/* ---------------- PROPERTY CARD HELPERS ---------------- */
export const createPropertyCardStyles = () =>
  StyleSheet.create({
    favoriteBtn: {
      position: "absolute",
      top: 16,
      right: 16,
      backgroundColor: PropertyColors.glass,
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    },
  });

/* ---------------- HEADER HELPERS ---------------- */
export const createHeaderStyles = () =>
  StyleSheet.create({
    right: {
      flexDirection: "row",
      gap: 16,
      marginTop: 8,
    },
    iconBtn: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: PropertyColors.glass,
      justifyContent: "center",
      alignItems: "center",
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: PropertyColors.primary,
    },
  });

export { globalStyles };
export default globalStyles;
