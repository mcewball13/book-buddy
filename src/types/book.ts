export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
}

export interface SearchResponse {
  docs: Book[];
  numFound: number;
  start: number;
  numFoundExact: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
