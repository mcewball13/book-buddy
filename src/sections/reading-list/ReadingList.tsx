import { memo } from "react";
import { ReadingListBookCard } from "../../components/ReadingListBookCard";
import { BookDetailsModal } from "../../components/BookDetailsModal";
import { useModal } from "../../hooks/useModal";
import type { Book } from "../../types/book";

interface ReadingListProps {
  books: Book[];
  onRemoveBook: (bookKey: string) => void;
}

export const ReadingList = memo(({ books, onRemoveBook }: ReadingListProps) => {
  const { selectedBook, isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className="container mx-auto px-4 py-8">
      {books.length === 0 ? (
        <p className="text-center text-gray-600">
          Your reading list is empty. Start by adding some books from the search
          page!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <ReadingListBookCard
              key={book.key}
              book={book}
              onRemoveFromReadingList={onRemoveBook}
              onBookClick={openModal}
            />
          ))}
        </div>
      )}
      
      <BookDetailsModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
});

ReadingList.displayName = "ReadingList";
