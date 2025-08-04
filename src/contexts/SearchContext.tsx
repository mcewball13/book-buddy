import { createContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { PaginationParams } from "../types/book";

interface SearchState {
  query: string;
  pagination: PaginationParams;
}

interface SearchContextType {
  query: string;
  pagination: PaginationParams;
  updateQuery: (query: string) => void;
  updatePage: (page: number) => void;
  updateLimit: (limit: number) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const defaultState: SearchState = {
  query: "",
  pagination: { page: 1, limit: 12 },
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchState, setSearchState] = useState<SearchState>(defaultState);

  const updateQuery = useCallback((query: string) => {
    setSearchState((current) => ({
      ...current,
      query,
      pagination: { ...current.pagination, page: 1 },
    }));
  }, []);

  const updatePage = useCallback((page: number) => {
    setSearchState((current) => ({
      ...current,
      pagination: { ...current.pagination, page },
    }));
  }, []);

  const updateLimit = useCallback((limit: number) => {
    setSearchState((current) => ({
      ...current,
      pagination: { ...current.pagination, limit, page: 1 },
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchState(defaultState);
  }, []);

  const value: SearchContextType = {
    query: searchState.query,
    pagination: searchState.pagination,
    updateQuery,
    updatePage,
    updateLimit,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext };
