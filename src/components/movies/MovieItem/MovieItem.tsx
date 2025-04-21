import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
  ImageSourcePropType,
} from "react-native";
import { Movie } from "@services/movieApi";
import { Link, useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const posterWidth = width / 3;
const posterHeight = posterWidth * 1.5;

type MovieItemProps = {
  movie: Movie;
};

export const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    router.push(`/movies/${movie.id}`);
  };

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPress={handlePress} testID="movie-item-pressable">
      <View style={styles.card}>
        {movie.poster_path ? (
          <View>
            {/* Placeholder underneath image */}
            <Animated.View
              style={[
                styles.placeholder,
                {
                  opacity: opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                },
              ]}
            />
            {/* Fade-in poster image */}
            <Animated.Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={[styles.poster, { opacity }]}
              resizeMode="cover"
              onLoad={onLoad}
              testID="movie-poster"
            />
          </View>
        ) : (
          <View
            style={[styles.poster, styles.placeholder]}
            testID="poster-placeholder"
          >
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.title} testID="movie-title">
            {movie.title}
          </Text>
          <Text style={styles.date} testID="movie-date">
            {formatDate(movie.release_date)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  poster: {
    width: posterWidth,
    height: posterHeight,
  },
  placeholder: {
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#666",
    fontSize: 12,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
});

export default MovieItem;
