import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchView } from "./app/SearchView";
import { ReadingListView } from "./app/ReadingListView";
import { Navigation } from "./components/Navigation";
import "./App.css";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const showNavigation = location.pathname !== "/";

  return (
    <>
      {showNavigation && <Navigation />}
      <main>
        <Routes>
          <Route path="/search" element={<SearchView />} />
          <Route path="/reading-list" element={<ReadingListView />} />
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
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppContent />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
