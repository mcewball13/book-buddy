import { useState, useEffect } from "react";
import { Book } from "../types/book";

const STORAGE_KEY = "bookbuddy_reading_list";

export const useReadingList = () => {
  const [readingList, setReadingList] = useState<Book[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList));
  }, [readingList]);

  const addToReadingList = (book: Book) => {
    setReadingList((current) => {
      if (current.some((b) => b.key === book.key)) {
        return current;
      }
      return [...current, book];
    });
  };

  const removeFromReadingList = (bookKey: string) => {
    setReadingList((current) => current.filter((book) => book.key !== bookKey));
  };

  const isInReadingList = (bookKey: string) => {
    return readingList.some((book) => book.key === bookKey);
  };

  return {
    readingList,
    addToReadingList,
    removeFromReadingList,
    isInReadingList,
  };
};
