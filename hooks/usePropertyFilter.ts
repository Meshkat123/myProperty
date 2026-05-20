import { useProperties } from "@/context/PropertyContext";
import { Property } from "@/types/property";
import { useCallback, useMemo, useState } from "react";

const FILTER_DELAY = 1500;

export type FilterType = "all" | "land" | "pond" | "flat";

export function usePropertyFilter() {
  const { properties } = useProperties();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [refreshing, setRefreshing] = useState(false);

  const filteredProperties = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return properties.filter((property: Property) => {
      const matchesFilter =
        activeFilter === "all" || property.type === activeFilter;
      const matchesSearch =
        query === "" ||
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter, properties]);

  const quickStats = useMemo(
    () => [
      {
        label: "All",
        count: properties.length,
        icon: "home-outline" as const,
        color: "#e66849",
      },
      {
        label: "Land",
        count: properties.filter((p: Property) => p.type === "land").length,
        icon: "leaf-outline" as const,
        color: "#10B981",
      },
      {
        label: "Pond",
        count: properties.filter((p: Property) => p.type === "pond").length,
        icon: "water-outline" as const,
        color: "#3B82F6",
      },
      {
        label: "Flat",
        count: properties.filter((p: Property) => p.type === "flat").length,
        icon: "business-outline" as const,
        color: "#F59E0B",
      },
    ],
    [properties],
  );

  const featured = filteredProperties[0] ?? null;
  const regularProperties = filteredProperties.slice(1);
  const isFiltered = searchQuery !== "" || activeFilter !== "all";
  const hasNoResults = filteredProperties.length === 0;
  const hasOnlyOneResult = filteredProperties.length === 1;

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilter = useCallback((tabId: string) => {
    setActiveFilter(tabId as FilterType);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setActiveFilter("all");
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, FILTER_DELAY);
  }, []);

  return {
    properties,
    searchQuery,
    activeFilter,
    refreshing,
    filteredProperties,
    quickStats,
    featured,
    regularProperties,
    isFiltered,
    hasNoResults,
    hasOnlyOneResult,
    handleSearch,
    handleFilter,
    handleClearFilters,
    onRefresh,
  };
}
