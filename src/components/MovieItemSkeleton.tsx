// src/components/movies/MovieItemSkeleton.tsx

import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const posterWidth = width / 3;
const posterHeight = posterWidth * 1.5;

type MovieItemSkeletonProps = {};

const MovieItemSkeleton: React.FC<MovieItemSkeletonProps> = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  // Animate translation from -width to +width
  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-posterWidth, posterWidth],
  });

  return (
    <View style={styles.linkContainer}>
      <View style={styles.card}>
        {/* Poster skeleton */}
        <View style={styles.posterSkeleton}>
          <Animated.View
            style={[styles.shimmer, { transform: [{ translateX }] }]}
            testID="skeleton-shimmer"
          >
            <LinearGradient
              colors={[
                "rgba(255,255,255,0)",
                "rgba(255,255,255,0.6)",
                "rgba(255,255,255,0)",
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
        {/* Text lines skeleton */}
        <View style={styles.info}>
          <View style={styles.lineSkeleton} />
          <View style={[styles.lineSkeleton, styles.lineShort]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  posterSkeleton: {
    width: posterWidth,
    height: posterHeight,
    backgroundColor: "#E1E9EE",
    overflow: "hidden",
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  lineSkeleton: {
    width: "80%",
    height: 16,
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
    marginTop: 8,
  },
  lineShort: {
    width: "60%",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: posterHeight,
    width: posterWidth,
  },
});

export default MovieItemSkeleton;
