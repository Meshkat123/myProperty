import { PropertyColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInDown
} from "react-native-reanimated";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function Header() {
  const greeting = useMemo(() => getGreeting(), []);

  return (
    <Animated.View
      entering={FadeInDown.duration(600).springify()}
      style={styles.container}
    >
      <View style={styles.left}>
        <Text style={styles.greeting}>
          {greeting}, <Text style={styles.greetingName}>User</Text> 👋
        </Text>
        <Text style={styles.title}>
          Find Your{"\n"}
          <Text style={styles.titleAccent}>Dream Home</Text>
        </Text>
      </View>

      <View style={styles.right}>
        <Pressable
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={PropertyColors.textSecondary}
          />
          <View style={styles.notificationBadge} />
        </Pressable>

        <View style={styles.avatarWrapper}>
          <View style={styles.avatarGradient}>
            <Text style={styles.avatarLetter}>U</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingTop: 60,
  },
  left: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "500",
    color: PropertyColors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  greetingName: {
    color: PropertyColors.textPrimary,
    fontWeight: "700",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: PropertyColors.textPrimary,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  titleAccent: {
    color: PropertyColors.primary,
  },
  right: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
    alignItems: "center",
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PropertyColors.glass,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  pressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.8,
  },
  notificationBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: PropertyColors.primary,
    borderWidth: 2,
    borderColor: PropertyColors.cardSurface,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    padding: 2,
    backgroundColor: PropertyColors.primary + "40",
  },
  avatarGradient: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: PropertyColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarLetter: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
