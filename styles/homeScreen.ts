import { PropertyColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const homeScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: PropertyColors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 160,
  },
  createCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 10,
    marginBottom: 20,
    padding: 16,
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PropertyColors.primary + "30",
    gap: 14,
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  createCardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  createIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PropertyColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  createTextContainer: {
    flex: 1,
  },
  createTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: PropertyColors.textPrimary,
    marginBottom: 2,
  },
  createSubtitle: {
    fontSize: 13,
    color: PropertyColors.textSecondary,
  },
});
