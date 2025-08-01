import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b border-gray-200 bg-white ">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Book Buddy
          </Link>

          <div className="flex space-x-1">
            <Link
              to="/search"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive("/search")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              Search Books
            </Link>
            <Link
              to="/reading-list"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive("/reading-list")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              Reading List
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
