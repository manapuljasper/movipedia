import { MovieList } from "@/src/components/movies/MovieList/MovieList";
import { useMovies } from "@hooks/movies/useMovies";
import { Text, View, StyleSheet } from "react-native";

export default function MoviesScreen() {
  const { data, isLoading, error } = useMovies();

  if (isLoading) return <Text>Loading movies…</Text>;
  if (error) return <Text>Error loading movies.</Text>;

  return (
    <View style={{ flex: 1 }}>
      <MovieList movies={data?.results ?? []} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
