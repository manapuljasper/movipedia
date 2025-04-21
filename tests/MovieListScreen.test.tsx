import React from "react";
import { render } from "@testing-library/react-native";
import IndexScreen from "../app/index";
import { useMovies } from "@hooks/movies/useMovies";

jest.mock("@hooks/movies/useMovies");

describe("IndexScreen", () => {
  const mockMoviesPage = {
    results: [
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
    ],
  };

  it("renders loading state", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    const { getByText } = render(<IndexScreen />);
    expect(getByText("Loading movies…")).toBeTruthy();
  });

  it("renders error state", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("fail"),
    });
    const { getByText } = render(<IndexScreen />);
    expect(getByText("Error loading movies.")).toBeTruthy();
  });

  it("renders MovieList when data is present", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: mockMoviesPage,
      isLoading: false,
      error: null,
    });
    const { getByTestId } = render(<IndexScreen />);
    expect(getByTestId("movie-list")).toBeTruthy();
  });
});
