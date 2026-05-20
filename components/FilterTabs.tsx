import { PropertyColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInRight
} from "react-native-reanimated";

const tabs = [
  { id: "all", label: "All", icon: "home-outline" },
  { id: "land", label: "Land", icon: "leaf-outline" },
  { id: "pond", label: "Pond", icon: "water-outline" },
  { id: "flat", label: "Flat", icon: "business-outline" },
];

interface FilterTabsProps {
  onTabChange?: (tabId: string) => void;
}

export default function FilterTabs({ onTabChange }: FilterTabsProps) {
  const [activeTab, setActiveTab] = useState("all");

  const handlePress = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;

          return (
            <Pressable
              key={tab.id}
              style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
              onPress={() => handlePress(tab.id)}
            >
              <Animated.View
                entering={FadeInRight.delay(index * 80).duration(400)}
                style={[styles.tabInner, isActive && styles.activeTabInner]}
              >
                <View style={styles.tabContent}>
                  <Ionicons
                    name={tab.icon as any}
                    size={18}
                    color={isActive ? "#FFFFFF" : PropertyColors.textSecondary}
                    style={styles.tabIcon}
                  />
                  <Text
                    style={[styles.tabLabel, isActive && styles.activeTabLabel]}
                    numberOfLines={1}
                  >
                    {tab.label}
                  </Text>
                </View>
              </Animated.View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 20,
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  content: {
    gap: 8,
    paddingHorizontal: 4,
  },
  tab: {
    paddingHorizontal: 2,
  },
  tabInner: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "transparent",
  },
  activeTabInner: {
    backgroundColor: PropertyColors.primary,
    borderColor: PropertyColors.primary + "60",
    shadowColor: PropertyColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  pressed: {
    transform: [{ scale: 0.94 }],
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabIcon: {
    marginBottom: 1,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: PropertyColors.textSecondary,
  },
  activeTabLabel: {
    color: "#FFFFFF",
  },
});
