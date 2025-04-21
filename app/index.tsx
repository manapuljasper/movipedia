import ErrorScreen from "@/src/components/ErrorScreen";
import LoadingScreen from "@/src/components/LoadingScreen";
import MovieItem from "@/src/components/movies/MovieItem";
import { MovieList } from "@/src/components/movies/MovieList/MovieList";
import { useSearchMovies } from "@/src/hooks/movies/useSearchMovies";
import { useMovies } from "@hooks/movies/useMovies";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";

export default function MoviesScreen() {
  const [search, setSearch] = useState("");
  const listQuery = useMovies();
  const searchQuery = useSearchMovies(search);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = search ? searchQuery : listQuery;

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  // flatten all pages’ results into one array
  const movies = data?.pages.flatMap((page) => page.results);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies..."
        value={search}
        onChangeText={setSearch}
        clearButtonMode="while-editing"
        placeholderTextColor={"gray"}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem movie={item} />}
        contentContainerStyle={styles.list}
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchInput: {
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    color: "black",
  },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
});
