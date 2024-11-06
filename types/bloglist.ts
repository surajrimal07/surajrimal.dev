import { Blog } from 'contentlayer/generated';
import { CoreContent } from 'pliny/utils/contentlayer';

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
export interface ListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
  initialDisplayPosts?: CoreContent<Blog>[];
  pagination?: PaginationProps;
}

export interface PostCardProps {
  path: string;
  date: string;
  title: string;
  summary: string;
  tags: string[];
  language: string;
  views: number;
  shares: number;
  thumbnail?: string;
}
