import { headers } from 'next/headers';

import { genPageMetadata } from 'app/seo';
import { allBlogs } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';

import ListLayoutTags from '@/layouts/ListLayoutWithTags';

const POSTS_PER_PAGE = 5;

export const metadata = genPageMetadata({ title: 'Blog' });

export default function BlogPage() {
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || '121.0.0.1';

  const posts = allCoreContent(sortPosts(allBlogs));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <ListLayoutTags
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
      ipaddress={ip}
    />
  );
}
