import { memo, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Book } from "../types/book";

interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookDetailsModal = memo(({ book, isOpen, onClose }: BookDetailsModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) {
    return null;
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
          <button
            onClick={onClose}
            className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                  alt={book.title}
                  className="w-48 h-72 object-cover rounded-lg shadow-md mx-auto md:mx-0"
                />
              ) : (
                <div className="w-48 h-72 bg-gray-200 rounded-lg flex items-center justify-center mx-auto md:mx-0">
                  <div className="text-center text-gray-500">
                    <svg
                      className="mx-auto h-16 w-16 mb-4"
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
                    <p className="text-lg">No Cover</p>
                  </div>
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {book.title}
                </h3>
                {book.author_name && book.author_name.length > 0 && (
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-medium">Author{book.author_name.length > 1 ? 's' : ''}:</span>{' '}
                    {book.author_name.join(", ")}
                  </p>
                )}
              </div>

              {book.first_publish_year && (
                <div>
                  <p className="text-base text-gray-600">
                    <span className="font-medium">First Published:</span> {book.first_publish_year}
                  </p>
                </div>
              )}

              {book.subject && book.subject.length > 0 && (
                <div>
                  <p className="text-base text-gray-600 mb-2">
                    <span className="font-medium">Subjects:</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.slice(0, 10).map((subject, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                    {book.subject.length > 10 && (
                      <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                        +{book.subject.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Book ID:</span> {book.key}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
});

BookDetailsModal.displayName = "BookDetailsModal";
