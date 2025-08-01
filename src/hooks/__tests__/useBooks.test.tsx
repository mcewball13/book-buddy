import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBooks } from "../useBooks";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useBooks hook", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("is disabled when query is empty", () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useBooks("", { page: 1, limit: 12 }), {
      wrapper,
    });

    // When query is empty, React Query disables the query
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("fetches books from API with correct parameters", async () => {
    const mockResponse = {
      docs: [{ key: "/works/123", title: "Test Book" }],
      numFound: 1,
      start: 0,
      numFoundExact: true,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const wrapper = createWrapper();
    const { result } = renderHook(
      () => useBooks("test query", { page: 2, limit: 10 }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponse);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://openlibrary.org/search.json?q=test%20query&offset=10&limit=10"
    );
  });

  it("handles API errors", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    const wrapper = createWrapper();
    const { result } = renderHook(
      () => useBooks("test", { page: 1, limit: 12 }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("is disabled when query is empty", () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useBooks("", { page: 1, limit: 12 }), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
