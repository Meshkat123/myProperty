import FilterTabs from "@/components/FilterTabs";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PropertyColors } from "@/constants/theme";
import { useProperties } from "@/context/PropertyContext";
import { Property } from "@/types/property";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";

export default function PropertyScreen() {
  const routerHook = useRouter();
  const { properties, deleteProperty } = useProperties();

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (tabId: string) => {
    setActiveFilter(tabId);
  };

  const handlePropertyPress = (id: string) => {
    routerHook.push({
      pathname: "/property/[id]",
      params: { id },
    });
  };

  const handleLocationPress = (location: string, lat: number, lng: number) => {
    routerHook.push({
      pathname: "/(tabs)/map",
      params: {
        lat: lat.toString(),
        lng: lng.toString(),
        location,
      },
    });
  };

  const handleEdit = (id: string) => {
    routerHook.push({
      pathname: "/property/create-form",
      params: { id },
    });
  };

  const handleDelete = (id: string) => {
    const property = properties.find((p) => p.id === id);
    Alert.alert(
      "Delete Property",
      `Are you sure you want to delete "${property?.title ?? "this property"}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteProperty(id),
        },
      ],
    );
  };

  // ✅ FILTER LOGIC (clean)
  const filteredProperties = properties.filter((property) => {
    const matchesFilter =
      activeFilter === "all" || property.type === activeFilter;

    const matchesSearch =
      searchQuery === "" ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const renderProperty = ({ item }: { item: Property }) => (
    <View style={styles.propertyItem}>
      <PropertyCard
        property={item}
        onPress={() => handlePropertyPress(item.id)}
        onLocationPress={handleLocationPress}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} type="title">
        My Properties
      </ThemedText>

      <SearchBar onSearch={handleSearch} />

      <FilterTabs onTabChange={handleFilterChange} />

      <FlatList
        data={filteredProperties}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />

      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={() => routerHook.push("/property/add")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </ThemedView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: PropertyColors.background,
  },

  title: {
    marginBottom: 16,
    fontSize: 28,
    color: PropertyColors.textPrimary,
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 140,
  },

  propertyItem: {
    marginBottom: 16,
  },

  fab: {
    position: "absolute",
    bottom: 40,
    right: 24,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PropertyColors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.45,
    shadowRadius: 25,
    elevation: 20,
  },

  fabPressed: {
    transform: [{ scale: 0.96 }],
  },
});
