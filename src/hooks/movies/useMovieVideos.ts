import { useQuery } from "@tanstack/react-query";
import { MOVIES_QUERY_KEYS, getMovieVideos } from "@api/movieQueries";

export function useMovieVideos(id: string) {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.movieVideos(id),
    queryFn: () => getMovieVideos(id),
  });
}
