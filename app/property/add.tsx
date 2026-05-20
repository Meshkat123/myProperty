import { PropertyColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PropertyType = "land" | "flat" | "pond";

interface OptionItem {
  type: PropertyType;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const options: OptionItem[] = [
  {
    type: "land",
    title: "Add Land",
    subtitle: "Register a land plot or commercial land",
    icon: "leaf",
    color: "#10B981",
  },
  {
    type: "flat",
    title: "Add Flat",
    subtitle: "Register an apartment or flat unit",
    icon: "business",
    color: "#F59E0B",
  },
  {
    type: "pond",
    title: "Add Pond",
    subtitle: "Register a pond-side property or retreat",
    icon: "water",
    color: "#3B82F6",
  },
];

export default function AddPropertyTypeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSelect = (type: PropertyType) => {
    router.push({
      pathname: "/property/create-form",
      params: { type },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={28}
            color={PropertyColors.primary}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Create Property</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Select Property Type</Text>
        <Text style={styles.subheading}>
          Choose the category that best describes your property
        </Text>

        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <Pressable
              key={option.type}
              style={({ pressed }) => [
                styles.optionCard,
                pressed && styles.optionCardPressed,
                { borderLeftColor: option.color, borderLeftWidth: 4 },
              ]}
              onPress={() => handleSelect(option.type)}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: option.color + "20" },
                ]}
              >
                <Ionicons name={option.icon} size={28} color={option.color} />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={22}
                color={PropertyColors.textSecondary}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PropertyColors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: PropertyColors.cardSurface,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: PropertyColors.textPrimary,
  },
  placeholder: {
    width: 36,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: PropertyColors.textPrimary,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    color: PropertyColors.textSecondary,
    marginBottom: 32,
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 20,
    padding: 20,
    gap: 16,
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  optionCardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: PropertyColors.textPrimary,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 13,
    color: PropertyColors.textSecondary,
    lineHeight: 18,
  },
});
