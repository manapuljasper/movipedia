import React from "react";
import { render } from "@testing-library/react-native";
import MovieDetailScreen from "../app/movies/[id]";
import { useMovie } from "@hooks/movies/useMovie";

jest.mock("@hooks/movies/useMovie");

describe("MovieDetailScreen", () => {
  const mockMovie = {
    id: 1,
    title: "Test Movie",
    overview: "This is a test overview.",
    poster_path: "/path.jpg",
    release_date: "2025-01-01",
    vote_average: 8,
  };

  it("renders loading state", () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    const { getByText } = render(<MovieDetailScreen />);
    expect(getByText("Loading movie...")).toBeTruthy();
  });

  it("renders error state", () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("fail"),
    });
    const { getByText } = render(<MovieDetailScreen />);
    expect(getByText("Error loading movie.")).toBeTruthy();
  });

  it("renders movie details when data is present", () => {
    (useMovie as jest.Mock).mockReturnValue({
      data: mockMovie,
      isLoading: false,
      error: null,
    });
    const { getByTestId } = render(<MovieDetailScreen />);
    expect(getByTestId("detail-title").props.children).toBe(mockMovie.title);
    expect(getByTestId("detail-overview").props.children).toBe(
      mockMovie.overview
    );
  });
});
