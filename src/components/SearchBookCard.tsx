import { memo, useCallback } from "react";
import { BookCard } from "./BookCard";
import { Button } from "./form/Button";
import type { Book } from "../types/book";

interface SearchBookCardProps {
  book: Book;
  isInReadingList: boolean;
  onAddToReadingList: (book: Book) => void;
}

export const SearchBookCard = memo(
  ({ book, isInReadingList, onAddToReadingList }: SearchBookCardProps) => {
    const handleAddToList = useCallback(() => {
      if (!isInReadingList) {
        onAddToReadingList(book);
      }
    }, [book, isInReadingList, onAddToReadingList]);

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

    return <BookCard book={book} actionButton={actionButton} />;
  }
);

SearchBookCard.displayName = "SearchBookCard";
