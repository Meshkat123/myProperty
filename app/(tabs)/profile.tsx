import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PropertyColors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 100,
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <FontAwesome5 name="user" size={36} color="#fff" />
          </View>

          <ThemedText style={styles.name}>
            {user?.name ?? "Guest User"}
          </ThemedText>
          <ThemedText style={styles.email}>
            {user?.email ?? "No email"}
          </ThemedText>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <StatItem value="12" label="Properties" />
          <StatItem value="5" label="Bookings" />
          <StatItem value="4.8" label="Rating" />
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <ActionItem icon="user-edit" label="Edit Profile" />
          <ActionItem icon="cog" label="Settings" />
          <ActionItem icon="heart" label="Favorites" />
          <ActionItem icon="bookmark" label="Saved Properties" />
        </View>

        {/* Logout */}
        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed,
          ]}
          onPress={handleLogout}
        >
          <FontAwesome5 name="sign-out-alt" size={16} color="#fff" />
          <ThemedText style={styles.logoutText}>Log Out</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

/* ================= COMPONENTS ================= */

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <View style={styles.statItem}>
    <Text style={styles.statNumber}>{value}</Text>
    <ThemedText style={styles.statLabel}>{label}</ThemedText>
  </View>
);

const ActionItem = ({ icon, label }: { icon: string; label: string }) => (
  <Pressable style={styles.actionItem}>
    <View style={styles.actionLeft}>
      <View style={styles.iconBox}>
        <FontAwesome5 name={icon} size={14} color="#fff" />
      </View>
      <Text style={styles.actionText}>{label}</Text>
    </View>

    <FontAwesome5
      name="chevron-right"
      size={14}
      color={PropertyColors.textSecondary}
    />
  </Pressable>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: PropertyColors.background,
  },

  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },

  avatarWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: PropertyColors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  name: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "700",
    color: PropertyColors.textPrimary,
  },

  email: {
    fontSize: 14,
    color: PropertyColors.textSecondary,
    marginTop: 4,
  },

  statsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 30,

    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: PropertyColors.textPrimary,
  },

  statLabel: {
    fontSize: 12,
    color: PropertyColors.textSecondary,
    marginTop: 4,
  },

  section: {
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 20,

    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },

  actionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: PropertyColors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  actionText: {
    fontSize: 15,
    fontWeight: "500",
    color: PropertyColors.textPrimary,
  },

  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: PropertyColors.primary,
    borderRadius: 14,
    paddingVertical: 16,
  },

  logoutButtonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
