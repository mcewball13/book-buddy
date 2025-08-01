import { Book } from "../types/book";
import { Button } from "../components/form/Button";

interface ReadingListPresenterProps {
  books: Book[];
  onRemoveBook: (bookKey: string) => void;
}

export const ReadingListPresenter = ({
  books,
  onRemoveBook,
}: ReadingListPresenterProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Reading List</h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-600">
          Your reading list is empty. Start by adding some books from the search
          page!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book.key}
              className="rounded-lg border border-gray-200 p-4 shadow-sm"
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
                variant="secondary"
                onClick={() => onRemoveBook(book.key)}
                className="w-full"
              >
                Remove from List
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
