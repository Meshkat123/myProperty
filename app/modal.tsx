import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PropertyColors } from "@/constants/theme";
import { Property } from "@/types/property";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddPropertyModal() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    location: "",
    type: "land",
    latitude: 23.0225,
    longitude: 72.5714,
  });

  const handleSubmit = () => {
    if (!form.title || !form.price || !form.location || !form.image) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const newProperty: Property = {
      id: Date.now().toString(),
      title: form.title,
      price: form.price,
      image: form.image,
      location: form.location,
      type: form.type as "land" | "pond" | "flat",
      latitude: form.latitude,
      longitude: form.longitude,
      status: "vacant",
    };

    console.log("New property added:", newProperty);
    // TODO: Pass to parent or store globally
    Alert.alert("Success", "Property added successfully!");
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={PropertyColors.primary}
          />
        </Pressable>
        <ThemedText type="title" style={styles.title}>
          Add New Property
        </ThemedText>
      </View>

      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}
      >
        <View style={styles.field}>
          <Text style={styles.label}>Type *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.type}
              onValueChange={(value: string) =>
                setForm({ ...form, type: value as any })
              }
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Land" value="land" />
              <Picker.Item label="Flat" value="flat" />
              <Picker.Item label="Pond" value="pond" />
            </Picker>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter property title"
            value={form.title}
            onChangeText={(text) => setForm({ ...form, title: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Price *</Text>
          <TextInput
            style={styles.input}
            placeholder="$2,400 / mo or $1,850,000"
            value={form.price}
            onChangeText={(text) => setForm({ ...form, price: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Location *</Text>
          <TextInput
            style={styles.input}
            placeholder="Downtown, Sector 5"
            value={form.location}
            onChangeText={(text) => setForm({ ...form, location: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Image URL *</Text>
          <TextInput
            style={styles.input}
            placeholder="https://images.unsplash.com/..."
            value={form.image}
            onChangeText={(text) => setForm({ ...form, image: text })}
          />
        </View>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Add Property</Text>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    textAlign: "center",
    marginLeft: -24,
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 20,
    paddingBottom: 40,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  picker: {
    height: 50,
  },
  pickerItem: {
    fontSize: 16,
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: PropertyColors.primary,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
