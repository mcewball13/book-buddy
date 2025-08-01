import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchPresenter } from "../sections/search/search";
import { useBooks } from "../hooks/useBooks";
import { searchFormSchema, type SearchFormData } from "../types/search-form";
import type { PaginationParams } from "../types/book";

export const SearchView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 12, // 12 books per page (fits nicely in grid)
  });

  const {
    data: searchResponse,
    isLoading,
    error,
  } = useBooks(searchQuery, pagination);

  const methods = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: SearchFormData) => {
    setSearchQuery(data.query);
    // Reset to first page when searching
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FormProvider {...methods}>
      <SearchPresenter
        books={searchResponse?.docs}
        totalItems={searchResponse?.numFound || 0}
        currentPage={pagination.page}
        itemsPerPage={pagination.limit}
        isLoading={isLoading}
        error={error}
        onSubmit={onSubmit}
        onPageChange={handlePageChange}
      />
    </FormProvider>
  );
};
