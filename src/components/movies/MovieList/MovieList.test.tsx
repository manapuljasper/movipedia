import React from "react";
import { render } from "@testing-library/react-native";
import MovieList from "@components/movies/MovieList";
import { Movie } from "@services/movieApi";

describe("MovieList", () => {
  const movies: Movie[] = [
    {
      id: 1,
      title: "One",
      overview: "",
      poster_path: null,
      release_date: "2025-01-01",
      vote_average: 7,
    },
    {
      id: 2,
      title: "Two",
      overview: "",
      poster_path: "/path.jpg",
      release_date: "2025-02-02",
      vote_average: 8,
    },
  ];

  it("renders correct number of movie items", () => {
    const { getByTestId, queryAllByTestId } = render(
      <MovieList movies={movies} />
    );
    const items = queryAllByTestId("movie-title");
    expect(items.length).toBe(movies.length);
  });
});
