import { Redirect, Tabs } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { PropertyColors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";

/* Animated Tab Icon */
const AnimatedTabIcon = ({ focused, name, color }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.2 : 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, [focused, scale]);

  return (
    <Animated.View
      style={[
        styles.iconContainer,
        {
          transform: [{ scale }],
          backgroundColor: focused
            ? PropertyColors.primary
            : PropertyColors.glass,
          shadowOpacity: focused ? 0.4 : 0.1,
        },
      ]}
    >
      <IconSymbol
        size={22}
        name={name}
        type="fontawesome"
        color={focused ? "#fff" : color}
      />
    </Animated.View>
  );
};

export default function TabLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          height: 80,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
        },

        tabBarBackground: () => <View style={styles.tabBackground} />,

        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon
              focused={focused}
              name="house.fill"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="property"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon
              focused={focused}
              name="building.2.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon
              focused={focused}
              name="person.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBackground: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    height: 70,
    borderRadius: 30,
    backgroundColor: "#131728",
    shadowColor: "#d12f1a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 10,
  },

  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
});
