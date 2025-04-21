import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useMovieVideos } from "@hooks/movies/useMovieVideos";
import { WebView } from "react-native-webview";
import LoadingScreen from "@/src/components/LoadingScreen";
import ErrorScreen from "@/src/components/ErrorScreen";

const { width } = Dimensions.get("window");
const videoHeight = (width / 16) * 9;

type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

export default function MovieTrailersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, error } = useMovieVideos(id);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (isLoading) return <LoadingScreen />;
  if (error || !data) return <ErrorScreen />;

  const trailers = data.results.filter(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  const renderView = () => {
    if (trailers.length === 0) {
      return <Text style={styles.noTrailers}>No trailers available.</Text>;
    }

    if (selectedVideo) {
      return (
        <View style={styles.webviewContainer} testID="video-player">
          <WebView
            source={{
              uri: `https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`,
            }}
            style={{ width, height: videoHeight }}
            allowsFullscreenVideo
          />
          <Pressable
            onPress={() => setSelectedVideo(null)}
            style={styles.backButton}
            testID="back-button"
          >
            <Text style={styles.backText}>Back to List</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <FlatList
        data={trailers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => setSelectedVideo(item)}
            testID="trailer-item"
          >
            <Text style={styles.trailerName}>{item.name}</Text>
          </Pressable>
        )}
      />
    );
  };

  return (
    <View style={styles.container} testID="movie-trailers-screen">
      {renderView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  noTrailers: { fontSize: 16, color: "#666" },
  item: { paddingVertical: 12 },
  trailerName: { fontSize: 18, color: "#1E90FF" },
  webviewContainer: { flex: 1, alignItems: "center" },
  backButton: { marginTop: 12 },
  backText: { fontSize: 16, color: "#1E90FF" },
});
