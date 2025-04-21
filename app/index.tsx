import MovieItem from "@/src/components/movies/MovieItem";
import { MovieList } from "@/src/components/movies/MovieList/MovieList";
import { useMovies } from "@hooks/movies/useMovies";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

export default function MoviesScreen() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies();

  if (isLoading) return <Text>Loading movies…</Text>;
  if (isError) return <Text>Error loading movies.</Text>;

  // flatten all pages’ results into one array
  const movies = data?.pages.flatMap((page) => page.results);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem movie={item} />}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ margin: 16 }} />
          ) : null
        }
      />
    </View>
  );
}
