import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Movie } from "@services/movieApi";
import MovieItem from "../MovieItem";

type MovieListProps = {
  movies: Movie[];
};

export const MovieList: React.FC<MovieListProps> = ({ movies }) => (
  <FlatList
    data={movies}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={styles.list}
    renderItem={({ item }) => <MovieItem movie={item} />}
    testID="movie-list"
  />
);

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default MovieList;
