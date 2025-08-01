import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { SearchPresenter } from "../presenters/SearchPresenter";
import { useBooks } from "../hooks/useBooks";

interface SearchForm {
  query: string;
}

export const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: books, isLoading, error } = useBooks(searchQuery);

  const methods = useForm<SearchForm>({
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (data: SearchForm) => {
    setSearchQuery(data.query);
  };

  return (
    <FormProvider {...methods}>
      <SearchPresenter
        books={books}
        isLoading={isLoading}
        error={error}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};
