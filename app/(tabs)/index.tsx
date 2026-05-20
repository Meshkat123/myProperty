import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  Alert,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import EmptyStateScreen from "@/components/EmptyStateScreen";
import FilterTabs from "@/components/FilterTabs";
import FloatingActionButton from "@/components/FloatingActionButton";
import Header from "@/components/Header";
import MapViewComponent from "@/components/MapViewComponent";
import PropertyList from "@/components/PropertyList";
import ResultsHeader from "@/components/ResultsHeader";
import SearchBar from "@/components/SearchBar";

import { PropertyColors } from "@/constants/theme";
import { useProperties } from "@/context/PropertyContext";
import { usePropertyFilter } from "@/hooks/usePropertyFilter";
import { homeScreenStyles as styles } from "@/styles/homeScreen";

export default function HomeScreen() {
  const router = useRouter();
  const { deleteProperty } = useProperties();

  const {
    refreshing,
    filteredProperties,
    quickStats,
    featured,
    regularProperties,
    isFiltered,
    handleSearch,
    handleFilter,
    handleClearFilters,
    onRefresh,
  } = usePropertyFilter();

  const handlePropertyPress = useCallback(
    (id: string) => {
      router.push({ pathname: "/property/[id]", params: { id } });
    },
    [router],
  );

  const handleLocationPress = useCallback(
    (location: string, lat: number, lng: number) => {
      router.push({
        pathname: "/(tabs)/map",
        params: { lat: lat.toString(), lng: lng.toString(), location },
      });
    },
    [router],
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push({ pathname: "/property/create-form", params: { id } });
    },
    [router],
  );

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert(
        "Delete Property",
        "Are you sure you want to delete this property? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => deleteProperty(id),
          },
        ],
      );
    },
    [deleteProperty],
  );

  if (filteredProperties.length === 0) {
    return <EmptyStateScreen onClear={handleClearFilters} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={PropertyColors.primary}
              colors={[PropertyColors.primary]}
              progressBackgroundColor={PropertyColors.cardSurface}
            />
          }
        >
          <Header />
          <SearchBar onSearch={handleSearch} />

          {/* Create Property CTA */}
          <Pressable
            style={({ pressed }) => [
              styles.createCard,
              pressed && styles.createCardPressed,
            ]}
            onPress={() => router.push("/property/add")}
          >
            <View style={styles.createIconCircle}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
            <View style={styles.createTextContainer}>
              <Text style={styles.createTitle}>Add New Property</Text>
              <Text style={styles.createSubtitle}>
                List your land, flat, or pond
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={PropertyColors.primary}
            />
          </Pressable>
          <FilterTabs onTabChange={handleFilter} />
          {/* <QuickStats stats={quickStats} /> */}
          <ResultsHeader
            count={filteredProperties.length}
            showClear={isFiltered}
            onClear={handleClearFilters}
          />
          <PropertyList
            featured={featured}
            regularProperties={regularProperties}
            onPropertyPress={handlePropertyPress}
            onLocationPress={handleLocationPress}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <MapViewComponent />
        </ScrollView>

        <FloatingActionButton />
      </View>
    </SafeAreaView>
  );
}
