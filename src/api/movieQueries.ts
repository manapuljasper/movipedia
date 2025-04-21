import {
  fetchMovieById,
  fetchMovies,
  fetchMovieVideos,
  MoviePage,
  VideoPage,
} from "../services/movieApi";

export const MOVIES_QUERY_KEYS = {
  list: ["movies"],
  movie: (id?: string) => ["movie", id],
  movieVideos: (id?: string) => ["movie-video", id],
};

export function getMoviesPage({ pageParam = 1 }): Promise<MoviePage> {
  return fetchMovies(pageParam);
}

export function getMovie(id: string) {
  return fetchMovieById(id);
}

export function getMovieVideos(id: string): Promise<VideoPage> {
  return fetchMovieVideos(Number(id));
}
