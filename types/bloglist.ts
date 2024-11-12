import { ReactNode } from 'react';

import { Authors, Blog, Snippets } from 'contentlayer/generated';
import { Toc } from 'pliny/mdx-plugins';
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
  highlightTag?: string;
  language: string;
  views: number;
  shares: number;
  thumbnail?: string;
}

export interface BlogPostProps {
  content: CoreContent<Blog> | CoreContent<Snippets>;
  authorDetails: CoreContent<Authors>[];
  children: ReactNode;
  toc?: Toc;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export interface SnippetsLayoutProps {
  posts: CoreContent<Snippets>[];
  title: string;
  initialDisplayPosts?: CoreContent<Snippets>[];
  pagination?: PaginationProps;
  children?: ReactNode;
}
