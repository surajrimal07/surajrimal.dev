'use client';

import { useState } from 'react';

import Link from '@/components/Link';
import { useCurrentPath } from '@/components/PathProvider';
import Tag from '@/components/Tag';
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
import { snippetSearchPlaceholders } from '@/data/snippetSearchData';
import type { PaginationProps, SnippetsLayoutProps } from '@/types/bloglist';

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

export default function SnippetsLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: SnippetsLayoutProps) {
  const [searchValue, setSearchValue] = useState('');

  const filteredPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredPosts;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue('');
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {title}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          I primarily cover web development and tech topics, occasionally
          sharing insights into my personal life and finance.
        </p>
        <PlaceholdersAndVanishInput
          placeholders={snippetSearchPlaceholders}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={onSubmit}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 py-0 md:grid-cols-2 lg:grid-cols-3">
        {!displayPosts.length && <p>No posts found.</p>}
        {displayPosts.map((post) => (
          <div key={post.slug} className="h-full">
            <div className="bg-day dark:bg-night group relative flex transform cursor-pointer flex-wrap border border-gray-200 bg-opacity-50 p-px py-px transition duration-500 hover:scale-105 dark:border-gray-700 dark:bg-opacity-50">
              <div className="duration-400 absolute bottom-0 left-0 h-[0.5px] w-full origin-left scale-x-0 transform bg-primary-500 transition group-hover:scale-x-100" />
              <div className="duration-400 absolute bottom-0 left-0 h-full w-[0.5px] origin-bottom scale-y-0 transform bg-primary-500 transition group-hover:scale-y-100" />
              <div className="duration-400 absolute left-0 top-0 h-[0.5px] w-full origin-right scale-x-0 transform bg-primary-500 transition group-hover:scale-x-100" />
              <div className="duration-400 absolute bottom-0 right-0 h-full w-[0.5px] origin-top scale-y-0 transform bg-primary-500 transition group-hover:scale-y-100" />
              <div className="bg-day dark:bg-night relative space-y-2 rounded-2xl p-4">
                <article>
                  <h2 className="text-2xl font-bold leading-8 tracking-tight">
                    <Link
                      className="text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500"
                      href={`/snippets/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="prose prose-base max-w-none text-gray-500 dark:text-gray-400">
                    {post.summary}
                  </div>
                  <div className="mt-2 flex flex-wrap">
                    {post.tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <div className="mt-8">
          <Paginations
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </div>
      )}
    </div>
  );
}
