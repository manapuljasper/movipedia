import { fetchMovieById, fetchMovies } from "../services/movieApi";

export const MOVIES_QUERY_KEYS = {
  list: ["movies"],
  movie: (id?: string) => ["movie", id],
};

export function getMovies(page = 1) {
  return fetchMovies(page);
}

export function getMovie(id: number) {
  return fetchMovieById(id);
}
