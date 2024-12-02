'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import tagData from 'app/tag-data.json';
import { Blog } from 'contentlayer/generated';
import { slug } from 'github-slugger';
import debounce from 'lodash.debounce';
import { CoreContent } from 'pliny/utils/contentlayer';

import Link from '@/components/Link';
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
import { ListLayoutProps, PaginationProps } from '@/types/bloglist';

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
              href="#"
              aria-disabled="true"
              className="pointer-events-none opacity-50"
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
              href="#"
              aria-disabled="true"
              className="pointer-events-none opacity-50"
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

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = useCurrentPath();
  const [searchValue, setSearchValue] = useState('');
  const [viewCounts, setViewCounts] = useState(new Map());
  const [shareCounts, setShareCounts] = useState(new Map());

  // Memoize the filtered blog posts based on the search value
  const filteredBlogPosts = useMemo(() => {
    return posts.filter((post) => {
      const searchContent = post.title + post.summary + post.tags.join(' ');
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [posts, searchValue]);

  // Memoize tag counts and sorted tags
  const tagCounts = useMemo(() => tagData as Record<string, number>, []);
  const sortedTags = useMemo(() => {
    const tagKeys = Object.keys(tagCounts);
    return tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);
  }, [tagCounts]);

  // Memoize the posts to be displayed
  const displayPosts = useMemo(() => {
    return initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts;
  }, [initialDisplayPosts, searchValue, filteredBlogPosts]);

  // Debounced fetchCounts to prevent excessive API calls
  const debouncedFetch = useMemo(
    () =>
      debounce(async (slug: string) => {
        const views = await getPageViews(`/${slug}`, false);
        const { total } = await getBlogShares(slug);
        setViewCounts((prev) => new Map(prev).set(slug, views));
        setShareCounts((prev) => new Map(prev).set(slug, total));
      }, 300),
    []
  );

  const fetchCounts = useCallback(
    (slug: string) => {
      debouncedFetch(slug);
    },
    [debouncedFetch]
  );

  useEffect(() => {
    displayPosts.forEach((post) => {
      fetchCounts(post.path);
    });
    // Cleanup the debounced function on unmount
    return () => {
      debouncedFetch.cancel();
    };
  }, [displayPosts, fetchCounts, debouncedFetch]);

  // Memoized onChange handler
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  // Memoized onSubmit handler
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue('');
  }, []);

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            I primarily cover web development and tech topics, occasionally
            sharing insights into my personal life and finance.
          </p>
          <PlaceholdersAndVanishInput
            placeholders={blogSearchPlaceholders}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
      <div className="flex sm:space-x-6">
        <div className="hidden h-full max-h-screen min-w-[210px] max-w-[210px] flex-wrap overflow-auto rounded border pt-5 shadow-md dark:border-gray-700 dark:bg-black sm:flex md:block">
          <div className="px-3 py-1">
            {pathname.startsWith('/blog') ? (
              <h3 className="font-bold uppercase text-primary-500">
                All Posts
              </h3>
            ) : (
              <Link
                href={`/blog`}
                className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
              >
                All Posts
              </Link>
            )}
            <ul>
              {sortedTags.map((t) => (
                <li key={t} className="my-3">
                  {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                    <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                      {`${t} (${tagCounts[t]})`}
                    </h3>
                  ) : (
                    <Link
                      href={`/tags/${slug(t)}`}
                      className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
                      aria-label={`View posts tagged ${t}`}
                    >
                      {`${t} (${tagCounts[t]})`}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
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
                path={path}
                date={date}
                title={title}
                summary={summary || ''}
                tags={tags}
                language={post.language || 'English'}
                views={views}
                shares={shares}
                thumbnail={thumbnail}
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
