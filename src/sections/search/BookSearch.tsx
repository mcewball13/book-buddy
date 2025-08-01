import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "../../components/form/TextField";
import { Button } from "../../components/form/Button";
import { Pagination } from "../../components/Pagination";
import { BookGridSkeleton } from "../../components/BookCardSkeleton";
import { SearchBookCard } from "../../components/SearchBookCard";
import { BookDetailsModal } from "../../components/BookDetailsModal";
import { useModal } from "../../hooks/useModal";
import type { Book } from "../../types/book";
import { useReadingList } from "../../hooks/useReadingList";
import type { SearchFormData } from "../../types/search-form";

interface BookSearchProps {
  books?: Book[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  error: Error | null;
  onSubmit: (data: SearchFormData) => void;
  onPageChange: (page: number) => void;
}

export const BookSearch = memo(
  ({
    books,
    totalItems,
    currentPage,
    itemsPerPage,
    isLoading,
    error,
    onSubmit,
    onPageChange,
  }: BookSearchProps) => {
    const {
      handleSubmit,
      formState: { isValid },
    } = useFormContext<SearchFormData>();
    const { addToReadingList, isInReadingList } = useReadingList();
    const { selectedBook, isModalOpen, openModal, closeModal } = useModal();

    return (
      <div className="container py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <div className="flex gap-4 justify-center">
            <div className="flex-1 max-w-md">
              <TextField
                name="query"
                placeholder="Enter book title or author..."
                required
              />
            </div>
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!isValid || isLoading}
              className="h-10"
            >
              Search
            </Button>
          </div>
        </form>

        {error && (
          <div className="mb-8 rounded-md bg-red-50 p-4 text-red-700">
            An error occurred while searching for books.
          </div>
        )}

        {isLoading ? (
          <BookGridSkeleton count={itemsPerPage} />
        ) : books && books.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <SearchBookCard
                  key={book.key}
                  book={book}
                  isInReadingList={isInReadingList(book.key)}
                  onAddToReadingList={addToReadingList}
                  onBookClick={openModal}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={onPageChange}
            />
          </>
        ) : (
          <p className="text-center text-gray-600">
            {books?.length === 0
              ? "No books found. Try a different search."
              : "Search for books by title or author."}
          </p>
        )}
        
        <BookDetailsModal
          book={selectedBook}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    );
  }
);

BookSearch.displayName = "BookSearch";
