import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import { PropertyColors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";

const { width, height } = Dimensions.get("window");

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

const SLIDES: Slide[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    title: "Welcome to MyProperty",
    subtitle: "Your all-in-one solution to manage properties with ease.",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    title: "Track Everything",
    subtitle: "Keep tabs on lands, flats, and ponds in one place.",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    title: "Get Started",
    subtitle: "Swipe through and tap Next to enter your dashboard.",
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const { completeWelcome } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const handleNext = useCallback(() => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      completeWelcome();
      router.replace("/(tabs)");
    }
  }, [activeIndex, completeWelcome, router]);

  const handleSkip = useCallback(() => {
    completeWelcome();
    router.replace("/(tabs)");
  }, [completeWelcome, router]);

  const renderItem: ListRenderItem<Slide> = useCallback(
    ({ item }) => (
      <View style={styles.slide}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </ImageBackground>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEnabled
        bounces={false}
      />

      {/* Skip Button */}
      <Pressable
        style={({ pressed }) => [
          styles.skipButton,
          pressed && styles.skipButtonPressed,
        ]}
        onPress={handleSkip}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </Pressable>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {SLIDES.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
          />
        ))}
      </View>

      {/* Next Button */}
      <Pressable
        style={({ pressed }) => [
          styles.nextButton,
          pressed && styles.nextButtonPressed,
        ]}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>
          {activeIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
        </Text>
        <FontAwesome5
          name="arrow-right"
          size={16}
          color="#fff"
          style={styles.buttonIcon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PropertyColors.background,
  },
  slide: {
    width,
    height,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  textContainer: {
    paddingHorizontal: 32,
    paddingBottom: 180,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 24,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  activeDot: {
    backgroundColor: PropertyColors.primary,
    width: 24,
    borderRadius: 5,
  },
  nextButton: {
    position: "absolute",
    bottom: 32,
    left: 32,
    right: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PropertyColors.primary,
    borderRadius: 14,
    height: 56,
    shadowColor: PropertyColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  nextButtonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  buttonIcon: {
    marginLeft: 8,
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 32,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  skipButtonPressed: {
    opacity: 0.7,
  },
  skipButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
