import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBooks } from "../useBooks";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useBooks", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it("returns empty array when query is empty", async () => {
    const { result } = renderHook(() => useBooks(""), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });

  it("fetches books when query is provided", async () => {
    const mockBooks = [
      {
        key: "/works/123",
        title: "Test Book",
        author_name: ["Test Author"],
      },
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: mockBooks }),
    });

    const { result } = renderHook(() => useBooks("test"), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockBooks);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://openlibrary.org/search.json?q=test"
    );
  });

  it("handles error when API call fails", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useBooks("test"), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
