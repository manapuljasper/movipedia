import React from "react";
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, Link, useRouter } from "expo-router";
import { useMovie } from "@hooks/movies/useMovie";

const { width } = Dimensions.get("window");
const posterWidth = width;
const posterHeight = posterWidth * 1.5;

export default function MovieDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: movie, isLoading, error } = useMovie(id);

  const handleNavigateToTrailer = () => {
    router.push(`/movies/${id}/trailers`);
  };

  if (isLoading) return <Text>Loading movie...</Text>;
  if (error || !movie) return <Text>Error loading movie.</Text>;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      testID="movie-detail-screen"
    >
      {movie.poster_path && (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.poster}
          resizeMode="cover"
          testID="detail-poster"
        />
      )}
      <Text style={styles.title} testID="detail-title">
        {movie.title}
      </Text>
      <Text style={styles.date} testID="detail-date">
        {formatDate(movie.release_date)}
      </Text>
      <Text style={styles.overview} testID="detail-overview">
        {movie.overview}
      </Text>

      <TouchableOpacity
        onPress={handleNavigateToTrailer}
        testID="trailers-link"
      >
        <Text style={styles.link}>View Trailers</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  poster: {
    width: posterWidth,
    height: posterHeight,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  date: { fontSize: 16, color: "#666", marginBottom: 16 },
  overview: { fontSize: 16, lineHeight: 22 },
  link: { marginTop: 16, fontSize: 16, color: "#1E90FF", fontWeight: "bold" },
});
