export type SearchResult = {
  id: string;
  type: "school" | "department" | "material";
  title: string;
  subtitle?: string;
  slug: string;
  schoolSlug?: string;
};

export type SearchResponse = {
  results: number;
  total: number;
  page: number;
  totalPages: number;
  data: {
    results: SearchResult[];
  };
};
