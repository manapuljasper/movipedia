export interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  // add any other fields you need…
}

export interface MoviePage {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string; // "Trailer", "Teaser", etc.
}

export interface VideoPage {
  id: number;
  results: Video[];
}

const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Fetches a paginated list of popular movies.
 * @param page which page of results to fetch (defaults to 1)
 */
export async function fetchMovies(page = 1): Promise<MoviePage> {
  const url = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB fetch error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as MoviePage;
  return data;
}

/**
 * Fetches details for a single movie by its TMDB ID.
 * @param movieId the TMDB movie ID
 */
export async function fetchMovieById(movieId: string): Promise<Movie> {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB fetch error: ${res.status} ${res.statusText}`);
  }

  const movie = (await res.json()) as Movie;
  return movie;
}

/**
 * Fetches videos (including trailers) for a given movie ID.
 */
export async function fetchMovieVideos(movieId: number): Promise<VideoPage> {
  const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB videos fetch error: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as VideoPage;
  return data;
}

/**
 * Fetches a paginated search for movies matching `query`.
 */
export async function fetchSearchMovies(
  query: string,
  page = 1
): Promise<MoviePage> {
  const url =
    `${BASE_URL}/search/movie` +
    `?api_key=${TMDB_API_KEY}` +
    `&language=en-US` +
    `&query=${encodeURIComponent(query)}` +
    `&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB search fetch error: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as MoviePage;
}
