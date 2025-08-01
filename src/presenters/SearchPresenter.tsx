import { useFormContext } from "react-hook-form";
import { TextField } from "../components/form/TextField";
import { Button } from "../components/form/Button";
import { Book } from "../types/book";
import { useReadingList } from "../hooks/useReadingList";

interface SearchPresenterProps {
  books?: Book[];
  isLoading: boolean;
  error: unknown;
  onSubmit: (data: { query: string }) => void;
}

export const SearchPresenter = ({
  books,
  isLoading,
  error,
  onSubmit,
}: SearchPresenterProps) => {
  const { handleSubmit } = useFormContext();
  const { addToReadingList, isInReadingList } = useReadingList();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Search Books</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <TextField
              name="query"
              label="Search books"
              placeholder="Enter book title or author..."
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" isLoading={isLoading}>
              Search
            </Button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mb-8 rounded-md bg-red-50 p-4 text-red-700">
          An error occurred while searching for books.
        </div>
      )}

      {books && books.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => {
            const inReadingList = isInReadingList(book.key);
            return (
              <div
                key={book.key}
                className="rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                {book.cover_i && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    className="mb-4 h-48 w-full object-cover"
                  />
                )}
                <h3 className="mb-2 text-lg font-semibold">{book.title}</h3>
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
