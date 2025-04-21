import { useQuery } from "@tanstack/react-query";
import { MOVIES_QUERY_KEYS, getMovies } from "../api/movieQueries";

export function useMovies() {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.list,
    queryFn: getMovies,
  });
}
