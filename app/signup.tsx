import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PropertyColors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

/* ------------------------------------------------------------------ */
/*  AnimatedSection – reusable fade + slide up                        */
/* ------------------------------------------------------------------ */
interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  style?: any;
}

function AnimatedSection({ children, delay = 0, style }: AnimatedSectionProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(28);

  React.useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 700 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 700 }));
  }, [delay, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Screen                                                       */
/* ------------------------------------------------------------------ */
export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const buttonScale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    if (!isLoading) {
      buttonScale.value = withTiming(0.97, { duration: 120 });
    }
  }, [buttonScale, isLoading]);

  const handlePressOut = useCallback(() => {
    if (!isLoading) {
      buttonScale.value = withTiming(1, { duration: 120 });
    }
  }, [buttonScale, isLoading]);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleSignup = async () => {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = signup(name, email, password, profilePicture);
      setIsLoading(false);

      if (!success) {
        Alert.alert("Error", "Failed to create account");
      }
    }, 800);
  };

  const inputWrapperStyle = (field: string) => [
    styles.inputWrapper,
    focusedField === field && styles.inputWrapperFocused,
  ];

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Decorative background blobs */}
          <View style={[styles.blob, styles.blobTop]} />
          <View style={[styles.blob, styles.blobBottom]} />

          {/* Back button */}
          <AnimatedSection delay={0} style={styles.backButtonWrap}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
              hitSlop={8}
            >
              <FontAwesome5
                name="arrow-left"
                size={20}
                color={PropertyColors.textPrimary}
              />
            </Pressable>
          </AnimatedSection>

          {/* Header / Brand */}
          <AnimatedSection delay={100} style={styles.headerContainer}>
            <View style={styles.logoCircle}>
              <FontAwesome5 name="home" size={32} color="#fff" />
            </View>
            <ThemedText style={styles.headerTitle}>Create Account</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Join MyProperty and start managing your real estate journey
            </ThemedText>
          </AnimatedSection>

          {/* Profile Picture */}
          <AnimatedSection delay={200} style={styles.avatarSection}>
            <Pressable onPress={pickImage} style={styles.avatarContainer}>
              {profilePicture ? (
                <Image
                  source={{ uri: profilePicture }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <FontAwesome5
                    name="camera"
                    size={24}
                    color={PropertyColors.textSecondary}
                  />
                </View>
              )}
              <View style={styles.avatarOverlay}>
                <FontAwesome5 name="camera" size={14} color="#fff" />
              </View>
            </Pressable>
            <ThemedText style={styles.avatarLabel}>
              {profilePicture ? "Change Photo" : "Add Profile Photo"}
            </ThemedText>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={300} style={styles.formContainer}>
            {/* Name */}
            <View style={inputWrapperStyle("name")}>
              <FontAwesome5
                name="user"
                size={16}
                color={
                  focusedField === "name"
                    ? PropertyColors.primary
                    : PropertyColors.textSecondary
                }
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={PropertyColors.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Email */}
            <View style={inputWrapperStyle("email")}>
              <FontAwesome5
                name="envelope"
                size={16}
                color={
                  focusedField === "email"
                    ? PropertyColors.primary
                    : PropertyColors.textSecondary
                }
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
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Password */}
            <View style={inputWrapperStyle("password")}>
              <FontAwesome5
                name="lock"
                size={16}
                color={
                  focusedField === "password"
                    ? PropertyColors.primary
                    : PropertyColors.textSecondary
                }
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={PropertyColors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
              <Pressable
                onPress={() => setShowPassword((p) => !p)}
                style={styles.eyeIcon}
                hitSlop={8}
              >
                <FontAwesome5
                  name={showPassword ? "eye-slash" : "eye"}
                  size={16}
                  color={PropertyColors.textSecondary}
                />
              </Pressable>
            </View>

            {/* CTA Button */}
            <Animated.View style={[styles.buttonWrap, buttonAnimatedStyle]}>
              <Pressable
                style={[
                  styles.signupButton,
                  isLoading && styles.signupButtonDisabled,
                ]}
                onPress={handleSignup}
                disabled={isLoading}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <ThemedText style={styles.signupButtonText}>
                      Create Account
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
            </Animated.View>

            {/* Terms */}
            <View style={styles.termsWrap}>
              <ThemedText style={styles.termsText}>
                By signing up, you agree to our{" "}
                <ThemedText style={styles.termsLink}>
                  Terms of Service
                </ThemedText>{" "}
                and{" "}
                <ThemedText style={styles.termsLink}>Privacy Policy</ThemedText>
              </ThemedText>
            </View>
          </AnimatedSection>

          {/* Divider */}
          {/* <AnimatedSection delay={500} style={styles.dividerWrap}>
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <ThemedText style={styles.dividerText}>
                or continue with
              </ThemedText>
              <View style={styles.dividerLine} />
            </View>
          </AnimatedSection> */}

          {/* Social Buttons */}
          {/* <AnimatedSection delay={650} style={styles.socialWrap}>
            <Pressable style={styles.socialButton}>
              <FontAwesome5 name="google" size={18} color="#fff" />
              <ThemedText style={styles.socialButtonText}>
                Continue with Google
              </ThemedText>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <FontAwesome5 name="apple" size={20} color="#fff" />
              <ThemedText style={styles.socialButtonText}>
                Continue with Apple
              </ThemedText>
            </Pressable>
          </AnimatedSection> */}

          {/* Footer */}
          <AnimatedSection delay={800} style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Already have an account?{" "}
            </ThemedText>
            <Pressable onPress={() => router.back()}>
              <ThemedText style={styles.footerLink}>
                Sign In{" "}
                <FontAwesome5
                  name="arrow-right"
                  size={12}
                  color={PropertyColors.primary}
                />
              </ThemedText>
            </Pressable>
          </AnimatedSection>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                            */
/* ------------------------------------------------------------------ */
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
    paddingVertical: 60,
    paddingTop: Platform.OS === "ios" ? 80 : 60,
  },

  /* Decorative blobs */
  blob: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: PropertyColors.primaryMuted,
  },
  blobTop: {
    top: -80,
    right: -100,
    opacity: 0.6,
  },
  blobBottom: {
    bottom: 100,
    left: -120,
    opacity: 0.35,
  },

  /* Back button */
  backButtonWrap: {
    position: "absolute",
    top: Platform.OS === "ios" ? 48 : 28,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PropertyColors.glass,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Header */
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: PropertyColors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: PropertyColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: PropertyColors.textPrimary,
    marginBottom: 10,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: PropertyColors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 12,
  },

  /* Avatar */
  avatarSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: PropertyColors.cardSurface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: PropertyColors.glass,
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: PropertyColors.cardSurface,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PropertyColors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: PropertyColors.background,
  },
  avatarLabel: {
    marginTop: 10,
    fontSize: 13,
    color: PropertyColors.textSecondary,
    fontWeight: "500",
  },

  /* Form */
  formContainer: {
    gap: 14,
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 16,
    paddingHorizontal: 18,
    height: 58,
    borderWidth: 1.5,
    borderColor: PropertyColors.glass,
    shadowColor: PropertyColors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputWrapperFocused: {
    borderColor: PropertyColors.primary,
    shadowColor: PropertyColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
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
  eyeIcon: {
    padding: 6,
    marginLeft: 4,
  },

  /* CTA */
  buttonWrap: {
    marginTop: 6,
  },
  signupButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PropertyColors.primary,
    borderRadius: 16,
    height: 58,
    shadowColor: PropertyColors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },
  signupButtonDisabled: {
    opacity: 0.55,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  buttonIcon: {
    marginLeft: 8,
  },

  /* Terms */
  termsWrap: {
    marginTop: 14,
    alignItems: "center",
  },
  termsText: {
    color: PropertyColors.textSecondary,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: PropertyColors.primary,
    fontWeight: "600",
  },

  /* Divider */
  dividerWrap: {
    marginBottom: 20,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: PropertyColors.glass,
  },
  dividerText: {
    color: PropertyColors.textSecondary,
    fontSize: 13,
    marginHorizontal: 12,
  },

  /* Social */
  socialWrap: {
    gap: 12,
    marginBottom: 28,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PropertyColors.cardSurface,
    borderRadius: 14,
    height: 52,
    borderWidth: 1,
    borderColor: PropertyColors.glass,
    gap: 10,
  },
  socialButtonText: {
    color: PropertyColors.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },

  /* Footer */
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
