import type { SearchResponse, PaginationParams } from "../types/book";

import { useQuery } from "@tanstack/react-query";

const searchBooks = async (
  query: string,
  pagination: PaginationParams,
  signal?: AbortSignal
): Promise<SearchResponse> => {
  if (!query) return { docs: [], numFound: 0, start: 0, numFoundExact: true };

  const offset = (pagination.page - 1) * pagination.limit;
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(
      query
    )}&offset=${offset}&limit=${pagination.limit}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();
  return data;
};

export const useBooks = (query: string, pagination: PaginationParams) => {
  return useQuery({
    queryKey: ["books", query, pagination.page, pagination.limit],
    queryFn: ({ signal }) => searchBooks(query, pagination, signal),
    enabled: !!query,
  });
};
