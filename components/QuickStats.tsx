import { PropertyColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

interface QuickStatItem {
  label: string;
  count: number;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}

interface QuickStatsProps {
  stats: QuickStatItem[];
}

function QuickStats({ stats }: QuickStatsProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(500)}
      style={styles.container}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {stats.map((stat, index) => (
          <Animated.View
            key={stat.label}
            entering={FadeInRight.delay(index * 80).duration(400)}
            style={styles.statCard}
          >
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: stat.color + "18" },
              ]}
            >
              <Ionicons name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text style={styles.statCount}>{stat.count}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Animated.View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 24,
    gap: 12,
  },
  statCard: {
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    minWidth: 90,
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statCount: {
    fontSize: 20,
    fontWeight: "800",
    color: PropertyColors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: PropertyColors.textSecondary,
  },
});

export default memo(QuickStats);
