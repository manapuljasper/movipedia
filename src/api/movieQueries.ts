import {
  fetchMovieById,
  fetchMovies,
  fetchMovieVideos,
  fetchSearchMovies,
  MoviePage,
  VideoPage,
} from "../services/movieApi";

export const MOVIES_QUERY_KEYS = {
  list: ["movies"],
  movie: (id?: string) => ["movie", id],
  movieVideos: (id?: string) => ["movie-video", id],
  search: (queryString: string) => ["search-movie", queryString],
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

export function getSearchMovies({
  query,
  pageParam = 1,
}: {
  query: string;
  pageParam?: number;
}): Promise<MoviePage> {
  return fetchSearchMovies(query, pageParam);
}
