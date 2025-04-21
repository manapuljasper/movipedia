import React from "react";
import { render } from "@testing-library/react-native";
import MovieItem from "@components/movies/MovieItem";
import { Movie } from "@services/movieApi";

describe("MovieItem", () => {
  const mockMovie: Movie = {
    id: 1,
    title: "Test Movie",
    overview: "Test overview",
    poster_path: "/testpath.jpg",
    release_date: "2025-01-01",
    vote_average: 8.5,
  };

  it("renders poster image when poster_path is provided", () => {
    const { getByTestId } = render(<MovieItem movie={mockMovie} />);
    const poster = getByTestId("movie-poster");
    expect(poster.props.source.uri).toContain(mockMovie.poster_path);
  });

  it("renders placeholder when poster_path is null", () => {
    const noImageMovie = { ...mockMovie, poster_path: null };
    const { getByTestId } = render(<MovieItem movie={noImageMovie} />);
    expect(getByTestId("poster-placeholder")).toBeTruthy();
  });

  it("displays title and formatted date", () => {
    const { getByTestId } = render(<MovieItem movie={mockMovie} />);
    expect(getByTestId("movie-title").props.children).toBe(mockMovie.title);
    expect(getByTestId("movie-date").props.children).toBe(
      new Date(mockMovie.release_date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  });
});
