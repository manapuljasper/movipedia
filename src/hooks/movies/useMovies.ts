import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MOVIES_QUERY_KEYS, getMoviesPage } from "@api/movieQueries";

export function useMovies(page = 1) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: MOVIES_QUERY_KEYS.list,
    queryFn: ({ pageParam }) => getMoviesPage({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
}
