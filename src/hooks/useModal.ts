import { useState, useCallback } from "react";
import type { Book } from "../types/book";

interface UseModalReturn {
  selectedBook: Book | null;
  isModalOpen: boolean;
  openModal: (book: Book) => void;
  closeModal: () => void;
}

export function useModal(): UseModalReturn {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedBook(null);
  }, []);

  return {
    selectedBook,
    isModalOpen,
    openModal,
    closeModal,
  };
}
