import { useFormContext } from "react-hook-form";
import { TextField } from "../../components/form/TextField";
import { Button } from "../../components/form/Button";
import { Pagination } from "../../components/Pagination";
import { BookGridSkeleton } from "../../components/BookCardSkeleton";
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

export const BookSearch = ({
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
            {books.map((book) => {
              const inReadingList = isInReadingList(book.key);
              return (
                <div
                  key={book.key}
                  className="rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt={book.title}
                      className="mb-4 h-48 w-full object-cover rounded"
                    />
                  ) : (
                    <div className="mb-4 h-48 w-full bg-gray-200 rounded flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <svg
                          className="mx-auto h-12 w-12 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <p className="text-sm">No Cover</p>
                      </div>
                    </div>
                  )}
                  <h3
                    className="mb-2 text-lg font-semibold truncate"
                    title={book.title}
                  >
                    {book.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {book.author_name?.join(", ")}
                  </p>
                  {book.first_publish_year && (
                    <p className="mb-2 text-sm text-gray-600">
                      Published: {book.first_publish_year}
                    </p>
                  )}
                  {book.subject && (
                    <p className="mb-4 text-sm text-gray-600">
                      Subjects: {book.subject.slice(0, 3).join(", ")}
                      {book.subject.length > 3 && "..."}
                    </p>
                  )}
                  <Button
                    variant={inReadingList ? "secondary" : "primary"}
                    onClick={() => !inReadingList && addToReadingList(book)}
                    disabled={inReadingList}
                    className="w-full"
                  >
                    {inReadingList ? "Added to List" : "Add to Reading List"}
                  </Button>
                </div>
              );
            })}
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
    </div>
  );
};
