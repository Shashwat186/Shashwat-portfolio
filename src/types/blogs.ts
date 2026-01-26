export interface Blog {
  title: string;
  slug: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}
