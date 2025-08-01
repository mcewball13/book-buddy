import { memo, useCallback } from "react";
import { BookCard } from "./BookCard";
import { Button } from "./form/Button";
import type { Book } from "../types/book";

interface ReadingListBookCardProps {
  book: Book;
  onRemoveFromReadingList: (bookKey: string) => void;
}

export const ReadingListBookCard = memo(
  ({ book, onRemoveFromReadingList }: ReadingListBookCardProps) => {
    const handleRemoveFromList = useCallback(() => {
      onRemoveFromReadingList(book.key);
    }, [book.key, onRemoveFromReadingList]);

    const actionButton = (
      <Button
        variant="secondary"
        onClick={handleRemoveFromList}
        className="w-full"
      >
        Remove from List
      </Button>
    );

    return <BookCard book={book} actionButton={actionButton} />;
  }
);

ReadingListBookCard.displayName = "ReadingListBookCard";
