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

const TMDB_API_KEY = "6256afe136671b12f4ca075cf0800929";
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
