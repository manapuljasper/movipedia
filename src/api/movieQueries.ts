import {
  fetchMovieById,
  fetchMovies,
  fetchMovieVideos,
  VideoPage,
} from "../services/movieApi";

export const MOVIES_QUERY_KEYS = {
  list: ["movies"],
  movie: (id?: string) => ["movie", id],
  movieVideos: (id?: string) => ["movie-video", id],
};

export function getMovies(page = 1) {
  return fetchMovies(page);
}

export function getMovie(id: string) {
  return fetchMovieById(id);
}

export function getMovieVideos(id: string): Promise<VideoPage> {
  return fetchMovieVideos(Number(id));
}
