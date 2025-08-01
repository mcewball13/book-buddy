<<<<<<< Updated upstream
import { Button } from "../../components/form/Button";

=======
import { memo } from "react";
import { ReadingListBookCard } from "../../components/ReadingListBookCard";
import { BookDetailsModal } from "../../components/BookDetailsModal";
import { useModal } from "../../hooks/useModal";
>>>>>>> Stashed changes
import type { Book } from "../../types/book";

interface ReadingListPresenterProps {
  books: Book[];
  onRemoveBook: (bookKey: string) => void;
}

<<<<<<< Updated upstream
export const ReadingListPresenter = ({
  books,
  onRemoveBook,
}: ReadingListPresenterProps) => {
=======
export const ReadingList = memo(({ books, onRemoveBook }: ReadingListProps) => {
  const { selectedBook, isModalOpen, openModal, closeModal } = useModal();

>>>>>>> Stashed changes
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
            <div
              key={book.key}
<<<<<<< Updated upstream
              className="rounded-lg border border-gray-200 p-4 shadow-sm"
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
                variant="secondary"
                onClick={() => onRemoveBook(book.key)}
                className="w-full"
              >
                Remove from List
              </Button>
            </div>
=======
              book={book}
              onRemoveFromReadingList={onRemoveBook}
              onBookClick={openModal}
            />
>>>>>>> Stashed changes
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
};
