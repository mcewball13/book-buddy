import type { Book } from "../types/book";

import { useState, useEffect, useCallback, useMemo } from "react";

import { STORAGE_KEY } from "../config";

export const useReadingList = () => {
  const [readingList, setReadingList] = useState<Book[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList));
  }, [readingList]);

  const addToReadingList = useCallback((book: Book) => {
    setReadingList((current) => {
      if (current.some((b) => b.key === book.key)) {
        return current;
      }
      return [...current, book];
    });
  }, []);

  const removeFromReadingList = useCallback((bookKey: string) => {
    setReadingList((current) => current.filter((book) => book.key !== bookKey));
  }, []);

  // Memoize the reading list keys for faster lookup
  const readingListKeys = useMemo(
    () => new Set(readingList.map((book) => book.key)),
    [readingList]
  );

  const isInReadingList = useCallback(
    (bookKey: string) => {
      return readingListKeys.has(bookKey);
    },
    [readingListKeys]
  );

  return {
    readingList,
    addToReadingList,
    removeFromReadingList,
    isInReadingList,
  };
};
