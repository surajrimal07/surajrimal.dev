'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import type { Blog } from 'contentlayer/generated';
import type { CoreContent } from 'pliny/utils/contentlayer';

import { useCurrentPath } from '@/components/PathProvider';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { blogSearchPlaceholders } from '@/data/blogSearchData';
import PostCard from '@/layouts/BlogList';
import { getBlogShares, getPageViews } from '@/lib/pageView';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[];
  tagTitle: string;
  initialDisplayPosts?: CoreContent<Blog>[];
  pagination?: PaginationProps;
}

function Paginations({ totalPages, currentPage }: PaginationProps) {
  const pathname = useCurrentPath();
  const basePath = pathname.split('/')[1];
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {!prevPage ? (
            <PaginationPrevious
              aria-disabled="true"
              className="pointer-events-none opacity-50"
              href="#"
            />
          ) : (
            <PaginationPrevious
              href={
                currentPage - 1 === 1
                  ? `/${basePath}/`
                  : `/${basePath}/page/${currentPage - 1}`
              }
              rel="prev"
            />
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={`/${basePath}/page/${totalPages}`}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          {!nextPage ? (
            <PaginationNext
              aria-disabled="true"
              className="pointer-events-none opacity-50"
              href="#"
            />
          ) : (
            <PaginationNext
              href={`/${basePath}/page/${currentPage + 1}`}
              rel="next"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default function ListLayout({
  posts,
  tagTitle,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('');
  const [viewCounts, setViewCounts] = useState(new Map());
  const [shareCounts, setShareCounts] = useState(new Map());

  const heading = `Tagged with ${tagTitle}`;

  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts;

  useEffect(() => {
    const fetchCounts = async (slug: string) => {
      const views = await getPageViews(`/${slug}`, false);
      const { total } = await getBlogShares(slug);
      setViewCounts((prev) => new Map(prev).set(slug, views));
      setShareCounts((prev) => new Map(prev).set(slug, total));
    };

    for (const post of displayPosts) {
      fetchCounts(post.path);
    }
  }, [displayPosts]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue('');
  };

  return (
    <>
      <div className="divide-y divide-accent-foreground dark:divide-accent">
        <div className="space-y-1 py-8 md:space-y-3">
          <p className="text-4xl font-bold leading-9 tracking-tight text-foreground sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            {heading}
          </p>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Here you&apos;ll find{' '}
            <span className="font-bold text-red-500">{posts.length}</span>{' '}
            pieces of content I&apos;ve written about{' '}
            <span className="font-bold text-red-500">{tagTitle}</span>
          </p>

          <PlaceholdersAndVanishInput
            placeholders={blogSearchPlaceholders}
            onChange={(e) => setSearchValue(e.target.value)}
            onSubmit={onSubmit}
          />
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post: CoreContent<Blog>) => {
            const { path, date, title, summary, tags, thumbnail } = post;
            const views = viewCounts.get(path) || 0;
            const shares = shareCounts.get(path) || 0;
            return (
              <PostCard
                key={path}
                date={date}
                highlightTag={tagTitle.toLowerCase()}
                language={post.language || 'English'}
                path={path}
                shares={shares}
                summary={summary || ''}
                tags={tags}
                thumbnail={thumbnail}
                title={title}
                views={views}
              />
            );
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <div className="mt-8">
          <Paginations
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </div>
      )}
    </>
  );
}
