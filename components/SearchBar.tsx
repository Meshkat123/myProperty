import { PropertyColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterPress?: () => void;
}

export default function SearchBar({ onSearch, onFilterPress }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    onSearch?.(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
  };

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      isFocused ? PropertyColors.primary + "80" : "transparent",
      { duration: 200 },
    ),
    shadowOpacity: withTiming(isFocused ? 0.5 : 0.3, { duration: 200 }),
    shadowRadius: withSpring(isFocused ? 16 : 12),
  }));

  return (
    <Animated.View style={[styles.container, animatedBorderStyle]}>
      <Ionicons
        name="search"
        size={20}
        color={PropertyColors.textSecondary}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search properties, cities, amenities..."
        placeholderTextColor={PropertyColors.textSecondary}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        returnKeyType="search"
      />

      {query.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearBtn}>
          <Ionicons
            name="close-circle"
            size={20}
            color={PropertyColors.textSecondary}
          />
        </Pressable>
      )}

      <View style={styles.divider} />

      <Pressable
        style={({ pressed }) => [styles.filterBtn, pressed && styles.pressed]}
        onPress={onFilterPress}
      >
        <Ionicons
          name="options-outline"
          size={20}
          color={PropertyColors.primary}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PropertyColors.searchBg,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    marginHorizontal: 24,
    borderWidth: 1.5,
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: PropertyColors.textPrimary,
    fontSize: 15,
    includeFontPadding: false,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  clearBtn: {
    padding: 4,
    marginRight: 4,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginRight: 8,
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: PropertyColors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.92 }],
  },
});
