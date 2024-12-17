import { genPageMetadata } from 'app/seo';
import { allSnippets } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';

import SnippetsLayout from '@/layouts/SnippetsLayout';

const POSTS_PER_PAGE = 6;

export const metadata = genPageMetadata({ title: 'Snippets' });

export default function Snippet() {
  const posts = allCoreContent(sortPosts(allSnippets));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <SnippetsLayout
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      posts={posts}
      title="All Snippets"
    />
  );
}
