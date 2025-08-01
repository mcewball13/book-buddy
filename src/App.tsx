import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchContainer } from "./containers/SearchContainer";
import { ReadingListContainer } from "./containers/ReadingListContainer";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow">
            <div className="container mx-auto px-4">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Link to="/" className="text-xl font-bold text-blue-600">
                    BookBuddy
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/search"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Search
                  </Link>
                  <Link
                    to="/reading-list"
                    className="text-gray-700 hover:text-blue-600"
                  >
                    Reading List
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main>
            <Routes>
              <Route path="/search" element={<SearchContainer />} />
              <Route path="/reading-list" element={<ReadingListContainer />} />
              <Route
                path="/"
                element={
                  <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="mb-8 text-4xl font-bold">
                      Welcome to BookBuddy
                    </h1>
                    <p className="mb-8 text-xl text-gray-600">
                      Discover your next favorite book
                    </p>
                    <Link
                      to="/search"
                      className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                    >
                      Start Searching
                    </Link>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
