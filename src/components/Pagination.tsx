import { memo, useMemo, useCallback } from "react";
import { Button } from "./form/Button";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = memo(
  ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
  }: PaginationProps) => {
    const totalPages = useMemo(
      () => Math.ceil(totalItems / itemsPerPage),
      [totalItems, itemsPerPage]
    );

    const pageNumbers = useMemo(() => {
      const pages = [];
      const showPages = 5;

      let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
      let endPage = Math.min(totalPages, startPage + showPages - 1);

      if (endPage - startPage + 1 < showPages) {
        startPage = Math.max(1, endPage - showPages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }, [currentPage, totalPages]);

    const { startItem, endItem } = useMemo(
      () => ({
        startItem: (currentPage - 1) * itemsPerPage + 1,
        endItem: Math.min(currentPage * itemsPerPage, totalItems),
      }),
      [currentPage, itemsPerPage, totalItems]
    );

    const handlePrevious = useCallback(() => {
      onPageChange(currentPage - 1);
    }, [onPageChange, currentPage]);

    const handleNext = useCallback(() => {
      onPageChange(currentPage + 1);
    }, [onPageChange, currentPage]);

    const handleFirstPage = useCallback(() => {
      onPageChange(1);
    }, [onPageChange]);

    const handleLastPage = useCallback(() => {
      onPageChange(totalPages);
    }, [onPageChange, totalPages]);

    if (totalPages <= 1) {
      return null;
    }

    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <p className="text-sm text-gray-600">
          Showing {startItem} to {endItem} of {totalItems} results
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm"
          >
            Previous
          </Button>

          {pageNumbers[0] > 1 && (
            <>
              <Button
                variant="secondary"
                onClick={handleFirstPage}
                className="px-3 py-1 text-sm"
              >
                1
              </Button>
              {pageNumbers[0] > 2 && <span className="text-gray-400">...</span>}
            </>
          )}

          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "primary" : "secondary"}
              onClick={() => onPageChange(page)}
              className="px-3 py-1 text-sm"
            >
              {page}
            </Button>
          ))}

          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="text-gray-400">...</span>
              )}
              <Button
                variant="secondary"
                onClick={handleLastPage}
                className="px-3 py-1 text-sm"
              >
                {totalPages}
              </Button>
            </>
          )}

          <Button
            variant="secondary"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";
