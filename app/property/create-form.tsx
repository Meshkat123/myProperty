import { PropertyColors } from "@/constants/theme";
import { useProperties } from "@/context/PropertyContext";
import { Property } from "@/types/property";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PropertyType = "land" | "flat" | "pond";

const STATUS_OPTIONS: { label: string; value: Property["status"] }[] = [
  { label: "Vacant", value: "vacant" },
  { label: "Occupied", value: "occupied" },
  { label: "Maintenance", value: "maintenance" },
];

function getMapDelta(type: PropertyType) {
  switch (type) {
    case "flat":
      return { latitudeDelta: 0.0005, longitudeDelta: 0.0005 };
    case "land":
      return { latitudeDelta: 0.001, longitudeDelta: 0.001 };
    case "pond":
      return { latitudeDelta: 0.02, longitudeDelta: 0.02 };
    default:
      return { latitudeDelta: 0.02, longitudeDelta: 0.02 };
  }
}

export default function CreatePropertyFormScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { type: rawType, id } = useLocalSearchParams();
  const { properties, addProperty, updateProperty } = useProperties();

  const isEditMode = Boolean(id);
  const existingProperty = isEditMode
    ? properties.find((p) => p.id === id)
    : undefined;

  const propertyType = isEditMode
    ? (existingProperty?.type as PropertyType) || "land"
    : (rawType as PropertyType) || "land";

  const [form, setForm] = useState({
    title: existingProperty?.title || "",
    price: existingProperty?.price || "",
    image: existingProperty?.image || "",
    location: existingProperty?.location || "",
    description: existingProperty?.description || "",
    area: existingProperty?.area || "",
    latitude: existingProperty?.latitude?.toString() || "23.0225",
    longitude: existingProperty?.longitude?.toString() || "72.5714",
    bedrooms: existingProperty?.bedrooms?.toString() || "",
    bathrooms: existingProperty?.bathrooms?.toString() || "",
    status: existingProperty?.status || ("vacant" as Property["status"]),
    agent: existingProperty?.agent || "",
    phone: existingProperty?.phone || "",
    dolil: existingProperty?.dolil || "",
    taxDocument: existingProperty?.taxDocument || "",
  });
  const [isGeocoding, setIsGeocoding] = useState(false);

  const geocodeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mapRef = useRef<MapView | null>(null);

  const isLand = propertyType === "land";

  // Debounced geocoding when location changes
  useEffect(() => {
    if (!form.location.trim()) {
      setIsGeocoding(false);
      return;
    }
    setIsGeocoding(true);
    if (geocodeTimeoutRef.current) {
      clearTimeout(geocodeTimeoutRef.current);
    }
    geocodeTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await Location.geocodeAsync(form.location.trim());
        if (results && results.length > 0) {
          const { latitude, longitude } = results[0];
          setForm((prev) => ({
            ...prev,
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
          }));
          mapRef.current?.animateToRegion(
            {
              latitude,
              longitude,
              ...getMapDelta(propertyType),
            },
            500,
          );
        }
      } catch (error) {
        // silently fail if geocoding doesn't work
      } finally {
        setIsGeocoding(false);
      }
    }, 800);
    return () => {
      if (geocodeTimeoutRef.current) {
        clearTimeout(geocodeTimeoutRef.current);
      }
    };
  }, [form.location, propertyType]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera permission is needed to take photos.",
      );
      return false;
    }
    return true;
  };

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Photo library permission is needed to select images.",
      );
      return false;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      handleChange("image", result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      handleChange("image", result.assets[0].uri);
    }
  };

  const handlePickDolil = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      handleChange("dolil", result.assets[0].uri);
    }
  };

  const handlePickTaxDocument = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      handleChange("taxDocument", result.assets[0].uri);
    }
  };

  const validate = () => {
    if (
      !form.title.trim() ||
      !form.price.trim() ||
      !form.location.trim() ||
      !form.image.trim()
    ) {
      Alert.alert("Error", "Please fill all required fields (*)");
      return false;
    }
    const lat = parseFloat(form.latitude);
    const lng = parseFloat(form.longitude);
    if (isNaN(lat) || isNaN(lng)) {
      Alert.alert("Error", "Latitude and Longitude must be valid numbers");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const propertyData: Property = {
      id: isEditMode ? (id as string) : Date.now().toString(),
      title: form.title.trim(),
      price: form.price.trim(),
      image: form.image.trim(),
      location: form.location.trim(),
      type: propertyType,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      description: form.description.trim() || undefined,
      area: form.area.trim() || undefined,
      status: form.status,
      bedrooms: isLand ? 0 : parseInt(form.bedrooms || "0", 10) || undefined,
      bathrooms: isLand ? 0 : parseInt(form.bathrooms || "0", 10) || undefined,
      agent: form.agent.trim() || undefined,
      phone: form.phone.trim() || undefined,
      dolil: form.dolil.trim() || undefined,
      taxDocument: form.taxDocument.trim() || undefined,
      gallery: existingProperty?.gallery || [],
    };

    if (isEditMode) {
      updateProperty(propertyData);
      Alert.alert("Success", "Property updated successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } else {
      addProperty(propertyData);
      Alert.alert("Success", "Property added successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  };

  const renderInput = (
    label: string,
    field: keyof typeof form,
    placeholder: string,
    options?: {
      required?: boolean;
      numeric?: boolean;
      multiline?: boolean;
    },
  ) => (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {options?.required ? " *" : ""}
      </Text>
      <TextInput
        style={[styles.input, options?.multiline && styles.textArea]}
        placeholder={placeholder}
        placeholderTextColor={PropertyColors.textSecondary + "80"}
        value={form[field]}
        onChangeText={(text) => handleChange(field, text)}
        keyboardType={options?.numeric ? "numeric" : "default"}
        multiline={options?.multiline}
      />
    </View>
  );

  const renderImagePicker = () => (
    <View style={styles.field}>
      <Text style={styles.label}>Property Image *</Text>
      <View style={styles.imagePickerContainer}>
        {form.image ? (
          <View style={styles.imagePreviewWrapper}>
            <Image
              source={{ uri: form.image }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
            <Pressable
              style={styles.removeImageBtn}
              onPress={() => handleChange("image", "")}
            >
              <Ionicons name="close-circle" size={24} color="#EF4444" />
            </Pressable>
          </View>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons
              name="image-outline"
              size={40}
              color={PropertyColors.textSecondary}
            />
            <Text style={styles.imagePlaceholderText}>No image selected</Text>
          </View>
        )}

        <View style={styles.imageButtonRow}>
          <Pressable
            style={({ pressed }) => [
              styles.imageButton,
              pressed && styles.imageButtonPressed,
            ]}
            onPress={handleTakePhoto}
          >
            <Ionicons name="camera" size={18} color={PropertyColors.primary} />
            <Text style={styles.imageButtonText}>Take Photo</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.imageButton,
              pressed && styles.imageButtonPressed,
            ]}
            onPress={handlePickImage}
          >
            <Ionicons name="images" size={18} color={PropertyColors.primary} />
            <Text style={styles.imageButtonText}>Gallery</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  const renderDocumentPicker = (
    label: string,
    field: keyof Pick<typeof form, "dolil" | "taxDocument">,
  ) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.imagePickerContainer}>
        {form[field] ? (
          <View style={styles.imagePreviewWrapper}>
            <Image
              source={{ uri: form[field] }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
            <Pressable
              style={styles.removeImageBtn}
              onPress={() => handleChange(field, "")}
            >
              <Ionicons name="close-circle" size={24} color="#EF4444" />
            </Pressable>
          </View>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons
              name="document-outline"
              size={40}
              color={PropertyColors.textSecondary}
            />
            <Text style={styles.imagePlaceholderText}>
              No document selected
            </Text>
          </View>
        )}

        <View style={styles.imageButtonRow}>
          <Pressable
            style={({ pressed }) => [
              styles.imageButton,
              pressed && styles.imageButtonPressed,
            ]}
            onPress={
              field === "dolil" ? handlePickDolil : handlePickTaxDocument
            }
          >
            <Ionicons
              name="document"
              size={18}
              color={PropertyColors.primary}
            />
            <Text style={styles.imageButtonText}>Select Document</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  const latNum = parseFloat(form.latitude) || 23.0225;
  const lngNum = parseFloat(form.longitude) || 72.5714;

  const headerTitle = isEditMode
    ? `Edit ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}`
    : `Add ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}`;

  const submitText = isEditMode ? "Update Property" : "Save Property";

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={28}
            color={PropertyColors.primary}
          />
        </Pressable>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderInput("Title", "title", "Luxury Land Plot Panorama", {
          required: true,
        })}
        {renderInput("Price", "price", "$3,250,000 or $2,400 / mo", {
          required: true,
        })}
        {/* Location with geocoding indicator */}
        <View style={styles.field}>
          <Text style={styles.label}>
            Location <Text style={{ color: PropertyColors.primary }}>*</Text>
          </Text>
          <View style={styles.locationRow}>
            <TextInput
              style={[styles.input, styles.locationInput]}
              placeholder="Downtown, Sector 5"
              placeholderTextColor={PropertyColors.textSecondary + "80"}
              value={form.location}
              onChangeText={(text) => handleChange("location", text)}
            />
            {isGeocoding && (
              <ActivityIndicator
                size="small"
                color={PropertyColors.primary}
                style={styles.geocodeSpinner}
              />
            )}
            {!isGeocoding && form.location.trim().length > 0 && (
              <Ionicons
                name="locate"
                size={20}
                color={PropertyColors.primary}
                style={styles.geocodeIcon}
              />
            )}
          </View>
        </View>
        {renderImagePicker()}
        {renderInput("Area", "area", "5000 sq ft")}
        {renderInput("Description", "description", "Enter description...", {
          multiline: true,
        })}
        {!isLand && (
          <>
            {renderInput("Bedrooms", "bedrooms", "3", { numeric: true })}
            {renderInput("Bathrooms", "bathrooms", "2", { numeric: true })}
          </>
        )}
        <View style={styles.field}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusRow}>
            {STATUS_OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => handleChange("status", opt.value!)}
                style={[
                  styles.statusBtn,
                  form.status === opt.value && styles.statusBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.statusBtnText,
                    form.status === opt.value && styles.statusBtnTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          {renderInput("Latitude", "latitude", "23.0225", { numeric: true })}
          {renderInput("Longitude", "longitude", "72.5714", { numeric: true })}
        </View>
        {/* Map Preview */}
        <View style={styles.mapSection}>
          <Text style={styles.mapLabel}>Preview on Map</Text>
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              mapType="satellite"
              region={{
                latitude: latNum,
                longitude: lngNum,
                ...getMapDelta(propertyType),
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
            >
              <Marker
                coordinate={{ latitude: latNum, longitude: lngNum }}
                title={form.title || "New Property"}
                description={form.location || ""}
              />
            </MapView>
          </View>
        </View>
        {renderDocumentPicker("Property Dolil", "dolil")}
        {renderDocumentPicker("Property Tax Document", "taxDocument")}
        {renderInput("Agent Name", "agent", "John Doe")}
        {renderInput("Phone", "phone", "+91 98765 43210", { numeric: true })}
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>{submitText}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PropertyColors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: PropertyColors.cardSurface,
    marginBottom: 8,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: PropertyColors.textPrimary,
  },
  placeholder: {
    width: 36,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  field: {
    marginBottom: 16,
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: PropertyColors.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: PropertyColors.textPrimary,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  statusRow: {
    flexDirection: "row",
    gap: 10,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: PropertyColors.cardSurface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
  },
  statusBtnActive: {
    backgroundColor: PropertyColors.primary + "25",
    borderColor: PropertyColors.primary,
  },
  statusBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: PropertyColors.textSecondary,
  },
  statusBtnTextActive: {
    color: PropertyColors.primary,
  },
  submitButton: {
    marginTop: 12,
    backgroundColor: PropertyColors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: PropertyColors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  submitText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  imagePickerContainer: {
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    padding: 16,
    gap: 12,
  },
  imagePreviewWrapper: {
    position: "relative",
    alignSelf: "center",
  },
  imagePreview: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  removeImageBtn: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: PropertyColors.background,
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: 200,
    height: 150,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 8,
  },
  imagePlaceholderText: {
    fontSize: 13,
    color: PropertyColors.textSecondary,
  },
  imageButtonRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: PropertyColors.primary + "15",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PropertyColors.primary + "30",
  },
  imageButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  imageButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: PropertyColors.primary,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationInput: {
    flex: 1,
  },
  geocodeSpinner: {
    marginLeft: 10,
  },
  geocodeIcon: {
    marginLeft: 10,
  },
  mapSection: {
    marginBottom: 16,
  },
  mapLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: PropertyColors.textSecondary,
    marginBottom: 6,
  },
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
