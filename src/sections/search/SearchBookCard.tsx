  import { memo, useCallback } from "react";
import { BookCard } from "../../components/BookCard";
import { Button } from "../../components/form/Button";
import type { Book } from "../../types/book";

interface SearchBookCardProps {
  book: Book;
  isInReadingList: boolean;
  onAddToReadingList: (book: Book) => void;
  onBookClick?: (book: Book) => void;
}

export const SearchBookCard = memo(
  ({ book, isInReadingList, onAddToReadingList, onBookClick }: SearchBookCardProps) => {
    const handleAddToList = useCallback(() => {
      if (!isInReadingList) {
        onAddToReadingList(book);
      }
    }, [book, isInReadingList, onAddToReadingList]);

    const handleBookClick = useCallback(() => {
      onBookClick?.(book);
    }, [book, onBookClick]);

    const actionButton = (
      <Button
        variant={isInReadingList ? "secondary" : "primary"}
        onClick={handleAddToList}
        disabled={isInReadingList}
        className="w-full"
      >
        {isInReadingList ? "Added to List" : "Add to Reading List"}
      </Button>
    );

    return <BookCard book={book} actionButton={actionButton} onClick={handleBookClick} />;
  }
);

SearchBookCard.displayName = "SearchBookCard";
