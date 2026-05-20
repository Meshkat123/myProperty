import { PropertyColors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface DocumentViewerProps {
  visible: boolean;
  documentUrl?: string;
  documentType: "image" | "pdf" | null;
  onClose: () => void;
  title: string;
}

export default function DocumentViewer({
  visible,
  documentUrl,
  documentType,
  onClose,
  title,
}: DocumentViewerProps) {
  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    if (!visible) {
      setImageLoading(true);
      setImageError(false);
    }
  }, [visible]);

  const openExternal = async () => {
    if (!documentUrl) return;

    try {
      const supported = await Linking.canOpenURL(documentUrl);
      if (supported) {
        await Linking.openURL(documentUrl);
      } else {
        Alert.alert("Error", "Cannot open this file");
      }
    } catch {
      Alert.alert("Error", "Failed to open document");
    }
  };

  const downloadDocument = async () => {
    if (!documentUrl) return;

    try {
      const { documentDirectory, downloadAsync } =
        await import("expo-file-system");

      const fileName =
        title.replace(/[^a-z0-9]/gi, "_").toLowerCase() +
        (documentUrl.toLowerCase().endsWith(".pdf") ? ".pdf" : ".jpg");

      const localPath = documentDirectory + fileName;

      await downloadAsync(documentUrl, localPath);

      Alert.alert("Downloaded", `Saved as: ${fileName}`);
    } catch {
      Alert.alert("Download Failed", "Try again");
    }
  };

  const renderContent = () => {
    if (!documentUrl) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons name="document-outline" size={64} color="#888" />
          <Text style={styles.errorTitle}>No Document</Text>
          <Text style={styles.errorText}>No document URL provided</Text>
        </View>
      );
    }

    const type =
      documentType ||
      (documentUrl.toLowerCase().endsWith(".pdf") ? "pdf" : "image");

    if (type === "image") {
      return (
        <View style={styles.imageContainer}>
          {imageLoading && (
            <View style={styles.loadingOverlay}>
              <Text style={styles.loadingText}>Loading image...</Text>
            </View>
          )}

          <Image
            source={{ uri: documentUrl }}
            style={[styles.fullImage, imageLoading && { opacity: 0.5 }]}
            resizeMode="contain"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />

          {imageError && (
            <View style={styles.errorOverlay}>
              <Ionicons name="image-outline" size={64} color="#fff" />
              <Text style={styles.errorOverlayText}>Failed to load image</Text>
            </View>
          )}

          <View style={styles.actionRow}>
            <Pressable style={styles.actionBtn} onPress={downloadDocument}>
              <Ionicons name="download-outline" size={20} color="#fff" />
              <Text style={styles.actionBtnText}>Download</Text>
            </Pressable>
          </View>
        </View>
      );
    }

    if (type === "pdf") {
      return (
        <View style={styles.pdfContainer}>
          <Ionicons name="document-outline" size={80} color="#888" />
          <Text style={styles.pdfTitle}>{title}</Text>
          <Text style={styles.pdfSubtitle}>PDF preview not supported</Text>

          <View style={styles.actionRow}>
            <Pressable style={styles.actionBtn} onPress={openExternal}>
              <Ionicons name="open-outline" size={20} color="#fff" />
              <Text style={styles.actionBtnText}>Open</Text>
            </Pressable>

            <Pressable style={styles.actionBtn} onPress={downloadDocument}>
              <Ionicons name="download-outline" size={20} color="#fff" />
              <Text style={styles.actionBtnText}>Download</Text>
            </Pressable>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={26} color="#fff" />
            </Pressable>
          </View>

          {/* CONTENT */}
          <ScrollView
            style={styles.content}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            {renderContent()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
  },

  container: {
    flex: 1,
    paddingTop: 50,
  },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  content: {
    flex: 1,
  },

  imageContainer: {
    alignItems: "center",
  },

  fullImage: {
    width: screenWidth,
    height: screenHeight * 0.7, // ✅ FIXED HEIGHT
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    width: screenWidth,
    height: screenHeight * 0.7,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#fff",
    fontSize: 16,
  },

  errorOverlay: {
    position: "absolute",
    top: 0,
    width: screenWidth,
    height: screenHeight * 0.7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,0,0,0.7)",
  },

  errorOverlayText: {
    color: "#fff",
    marginTop: 10,
  },

  pdfContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },

  pdfTitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },

  pdfSubtitle: {
    color: "#aaa",
    marginBottom: 20,
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  actionBtn: {
    backgroundColor: PropertyColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  actionBtnText: {
    color: "#fff",
    fontWeight: "700",
  },

  errorContainer: {
    alignItems: "center",
    padding: 40,
  },

  errorTitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },

  errorText: {
    color: "#ccc",
  },
});
