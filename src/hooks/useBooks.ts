import { useQuery } from "@tanstack/react-query";
import { Book } from "../types/book";

const searchBooks = async (query: string): Promise<Book[]> => {
  if (!query) return [];

  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();
  return data.docs;
};

export const useBooks = (query: string) => {
  return useQuery({
    queryKey: ["books", query],
    queryFn: () => searchBooks(query),
    enabled: !!query,
  });
};
