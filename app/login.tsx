import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PropertyColors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { isLoggedIn, hasSeenWelcome, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isLoggedIn) {
    if (!hasSeenWelcome) {
      return <Redirect href="/welcome" />;
    }
    return <Redirect href="/(tabs)" />;
  }

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);

      if (!success) {
        Alert.alert("Error", "Invalid email or password");
      }
    }, 800);
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo / Brand */}
          <View style={styles.brandContainer}>
            <View style={styles.logoCircle}>
              <FontAwesome5 name="home" size={40} color="#fff" />
            </View>
            <ThemedText style={styles.appName}>MyProperty</ThemedText>
            <ThemedText style={styles.tagline}>
              Manage your properties with ease
            </ThemedText>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <FontAwesome5
                name="envelope"
                size={16}
                color={PropertyColors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={PropertyColors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputWrapper}>
              <FontAwesome5
                name="lock"
                size={16}
                color={PropertyColors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={PropertyColors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <ThemedText style={styles.loginButtonText}>
                    Sign In
                  </ThemedText>
                  <FontAwesome5
                    name="arrow-right"
                    size={16}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                </>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Don&apos;t have an account?{" "}
            </ThemedText>
            <Pressable onPress={() => router.push("/signup")}>
              <ThemedText style={styles.footerLink}>Sign Up</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PropertyColors.background,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 40,
  },

  brandContainer: {
    alignItems: "center",
    marginBottom: 48,
  },

  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: PropertyColors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: PropertyColors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },

  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: PropertyColors.textPrimary,
    marginBottom: 8,
  },

  tagline: {
    fontSize: 14,
    color: PropertyColors.textSecondary,
  },

  formContainer: {
    gap: 16,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: PropertyColors.glass,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    color: PropertyColors.textPrimary,
    fontSize: 16,
    height: "100%",
  },

  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PropertyColors.primary,
    borderRadius: 14,
    height: 56,
    marginTop: 8,

    shadowColor: PropertyColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },

  loginButtonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },

  loginButtonDisabled: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  buttonIcon: {
    marginLeft: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },

  footerText: {
    color: PropertyColors.textSecondary,
    fontSize: 14,
  },

  footerLink: {
    color: PropertyColors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
});
