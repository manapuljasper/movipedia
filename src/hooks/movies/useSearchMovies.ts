import { useInfiniteQuery } from "@tanstack/react-query";
import { MOVIES_QUERY_KEYS, getSearchMovies } from "@api/movieQueries";

export function useSearchMovies(query: string) {
  return useInfiniteQuery({
    queryKey: MOVIES_QUERY_KEYS.search(query),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getSearchMovies({ query, pageParam }),
    enabled: query.length > 0,
    getNextPageParam: (last) =>
      last.page < last.total_pages ? last.page + 1 : undefined,
  });
}
