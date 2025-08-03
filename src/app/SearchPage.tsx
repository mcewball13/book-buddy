import { useCallback, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookSearch } from "../sections/search/view/BookSearch";
import { useBooks } from "../hooks/useBooks";
import { useSearchState } from "../hooks/useSearchState";
import { searchFormSchema, type SearchFormData } from "../types/search-form";

export const SearchPage = () => {
  const { query, pagination, updateQuery, updatePage } = useSearchState();

  const {
    data: searchResponse,
    isLoading,
    error,
  } = useBooks(query, pagination);

  const methods = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query,
    },
    mode: "onChange",
  });

  const onSubmit = useCallback((data: SearchFormData) => {
    updateQuery(data.query);
  }, [updateQuery]);

  const handlePageChange = useCallback((page: number) => {
    updatePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [updatePage]);

  const searchProps = useMemo(
    () => ({
      books: searchResponse?.docs,
      totalItems: searchResponse?.numFound || 0,
      currentPage: pagination.page,
      itemsPerPage: pagination.limit,
      isLoading,
      error,
      onSubmit,
      onPageChange: handlePageChange,
    }),
    [
      searchResponse?.docs,
      searchResponse?.numFound,
      pagination.page,
      pagination.limit,
      isLoading,
      error,
      onSubmit,
      handlePageChange,
    ]
  );

  return (
    <FormProvider {...methods}>
      <BookSearch {...searchProps} />
    </FormProvider>
  );
};
