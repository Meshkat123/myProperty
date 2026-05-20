import { Property } from "@/types/property";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import PropertyCard from "./PropertyCard";
import SectionHeader from "./SectionHeader";

interface PropertyListProps {
  featured: Property | null;
  regularProperties: Property[];
  onPropertyPress: (id: string) => void;
  onLocationPress: (location: string, lat: number, lng: number) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function PropertyList({
  featured,
  regularProperties,
  onPropertyPress,
  onLocationPress,
  onEdit,
  onDelete,
}: PropertyListProps) {
  return (
    <>
      {featured && (
        <>
          <SectionHeader title="Featured Property" />
          <PropertyCard
            property={featured}
            isFeatured
            onPress={() => onPropertyPress(featured.id)}
            onLocationPress={onLocationPress}
            style={styles.featuredCard}
            index={0}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </>
      )}

      {regularProperties.length > 0 && <SectionHeader title="Explore More" />}

      {regularProperties.map((property, index) => (
        <View key={`${property.id}-${index}`} style={styles.listItemWrapper}>
          <PropertyCard
            property={property}
            onPress={() => onPropertyPress(property.id)}
            onLocationPress={onLocationPress}
            style={styles.listCard}
            index={index + 1}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  featuredCard: {
    marginHorizontal: 24,
    marginBottom: 8,
  },
  listItemWrapper: {
    marginBottom: 16,
  },
  listCard: {
    marginHorizontal: 24,
  },
});

export default memo(PropertyList);
