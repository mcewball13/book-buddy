import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookSearch } from "../sections/search/BookSearch";
import { useBooks } from "../hooks/useBooks";
import { searchFormSchema, type SearchFormData } from "../types/search-form";
import type { PaginationParams } from "../types/book";

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 12,
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

    // reset to first page when searching
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FormProvider {...methods}>
      <BookSearch
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
