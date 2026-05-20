import { PropertyColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface EmptyStateScreenProps {
  onClear: () => void;
}

function EmptyStateScreen({ onClear }: EmptyStateScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, styles.emptyContainer]}>
        <Animated.View
          entering={FadeIn.duration(600)}
          style={styles.emptyStateLarge}
        >
          <View style={styles.emptyIconContainerLarge}>
            <Ionicons
              name="home-outline"
              size={56}
              color={PropertyColors.primary}
            />
          </View>
          <Text style={styles.emptyTitleLarge}>No Properties Found</Text>
          <Text style={styles.emptyTextLarge}>
            We couldn't find any properties matching your search or filters. Try
            adjusting your criteria.
          </Text>
          <Pressable style={styles.emptyCtaButton} onPress={onClear}>
            <Text style={styles.emptyCtaText}>Clear All Filters</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: PropertyColors.background,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyStateLarge: {
    alignItems: "center",
    padding: 24,
    maxWidth: 320,
  },
  emptyIconContainerLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: PropertyColors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitleLarge: {
    fontSize: 22,
    fontWeight: "bold",
    color: PropertyColors.textPrimary,
    marginBottom: 10,
    textAlign: "center",
  },
  emptyTextLarge: {
    fontSize: 15,
    color: PropertyColors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyCtaButton: {
    backgroundColor: PropertyColors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 20,
    shadowColor: PropertyColors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  emptyCtaText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default memo(EmptyStateScreen);
