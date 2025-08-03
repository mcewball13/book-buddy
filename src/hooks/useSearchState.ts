import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export const useSearchState = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchState must be used within a SearchProvider");
  }
  return context;
};
