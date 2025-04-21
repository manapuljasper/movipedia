import { fetchMovieList, fetchMovieById } from "../services/movieApi";

export const MOVIES_QUERY_KEYS = {
  list: ["movies"],
  movie: (id?: string) => ["movie", id],
};

export function getMovies() {
  return fetchMovieList();
}

export function getMovie(id: string) {
  return fetchMovieById(id);
}
