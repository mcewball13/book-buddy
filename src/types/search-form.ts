import { z } from "zod";

export const searchFormSchema = z.object({
  query: z
    .string()
    .min(1, "Please enter a search term")
    .min(2, "Search term must be at least 2 characters")
    .max(100, "Search term is too long")
    .regex(
      /^[a-zA-Z0-9\s\-'.,]+$/,
      "Please enter valid characters only (letters, numbers, spaces, hyphens, apostrophes, periods, and commas)"
    ),
});

export type SearchFormData = z.infer<typeof searchFormSchema>;
