import { memo } from "react";
import type { Book } from "../types/book";

interface BookCardProps {
  book: Book;
  actionButton: React.ReactNode;
  onClick?: () => void;
}

export const BookCard = memo(({ book, actionButton, onClick }: BookCardProps) => {
  return (
    <div 
      className={`rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md ${
        onClick ? 'cursor-pointer hover:border-blue-300' : ''
      }`}
      onClick={onClick}
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
      <h3 className="mb-2 text-lg font-semibold truncate" title={book.title}>
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
      <div onClick={(e) => e.stopPropagation()}>
        {actionButton}
      </div>
    </div>
  );
});

BookCard.displayName = "BookCard";
