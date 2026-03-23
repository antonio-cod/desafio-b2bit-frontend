export interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  authorId: number;
  createdAt: string;
  authorName: string;
  likesCount: number;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}
