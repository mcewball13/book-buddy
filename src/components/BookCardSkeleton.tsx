export const BookCardSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm animate-pulse">
      <div className="mb-4 h-48 w-full bg-gray-300 rounded"></div>

      <div className="mb-2 h-6 bg-gray-300 rounded w-3/4"></div>

      <div className="mb-4 h-4 bg-gray-300 rounded w-1/2"></div>

      <div className="mb-2 h-4 bg-gray-300 rounded w-1/3"></div>

      <div className="mb-4 h-4 bg-gray-300 rounded w-2/3"></div>

      <div className="h-10 w-full bg-gray-300 rounded"></div>
    </div>
  );
};

export const BookGridSkeleton = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
};
