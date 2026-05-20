import { PropertyColors } from "@/constants/theme";
import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ResultsHeaderProps {
  count: number;
  showClear: boolean;
  onClear: () => void;
}

function ResultsHeader({ count, showClear, onClear }: ResultsHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.resultsText}>
        {count} {count === 1 ? "property" : "properties"} found
      </Text>
      {showClear && (
        <Pressable style={styles.clearFiltersBtn} onPress={onClear}>
          <Text style={styles.clearFiltersText}>Clear Filters</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 4,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: "600",
    color: PropertyColors.textSecondary,
  },
  clearFiltersBtn: {
    backgroundColor: PropertyColors.primary + "15",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  clearFiltersText: {
    fontSize: 12,
    fontWeight: "700",
    color: PropertyColors.primary,
  },
});

export default memo(ResultsHeader);
