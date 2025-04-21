// src/hooks/useMovie.ts

import { useQuery } from "@tanstack/react-query";
import { getMovie, MOVIES_QUERY_KEYS } from "@api/movieQueries";

export function useMovie(id: string) {
  return useQuery({
    queryKey: MOVIES_QUERY_KEYS.movie(id.toString()),
    queryFn: () => getMovie(id),
  });
}
