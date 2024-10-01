'use client';

import { ReactNode, useState } from 'react';

import { Snippets } from 'contentlayer/generated';
import { Search } from 'lucide-react';
import { CoreContent } from 'pliny/utils/contentlayer';

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

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

interface SnippetsLayoutProps {
  posts: CoreContent<Snippets>[];
  title: string;
  initialDisplayPosts?: CoreContent<Snippets>[];
  pagination?: PaginationProps;
  children?: ReactNode;
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
        <div className="relative">
          <input
            aria-label="Search snippets"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search snippets"
            className="block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 py-0 md:grid-cols-2 lg:grid-cols-3">
        {!displayPosts.length && <p>No posts found.</p>}
        {displayPosts.map((post) => (
          <div key={post.slug} className="h-full">
            <div className="bg-day dark:bg-night group relative flex transform cursor-pointer flex-wrap border border-gray-200 bg-opacity-50 p-px py-px transition duration-200 hover:scale-105 dark:border-gray-700 dark:bg-opacity-50">
              <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-primary-500 duration-200 group-hover:scale-x-100" />
              <div className="absolute bottom-0 left-0 h-full w-0.5 origin-bottom scale-y-0 transform bg-primary-500 duration-200 group-hover:scale-y-100" />
              <div className="absolute left-0 top-0 h-0.5 w-full origin-right scale-x-0 transform bg-primary-500 duration-200 group-hover:scale-x-100" />
              <div className="absolute bottom-0 right-0 h-full w-0.5 origin-top scale-y-0 transform bg-primary-500 duration-200 group-hover:scale-y-100" />

              <div className="bg-day dark:bg-night relative space-y-2 rounded-2xl p-4">
                <article>
                  <h2 className="text-2xl font-bold leading-8 tracking-tight">
                    <Link
                      href={`/snippets/${post.slug}`}
                      className="text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500"
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
