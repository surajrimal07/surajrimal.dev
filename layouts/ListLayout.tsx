'use client';

import React, { useEffect, useRef, useState } from 'react';

import type { Blog } from 'contentlayer/generated';
import { slug as githubSlugger } from 'github-slugger';
import { CoreContent } from 'pliny/utils/contentlayer';
import { formatDate } from 'pliny/utils/formatDate';
import { IoMdShare } from 'react-icons/io';
import { MdInsights } from 'react-icons/md';

import Image from '@/components/Image';
import Link from '@/components/Link';
import { useCurrentPath } from '@/components/PathProvider';
import AnimatedCounter from '@/components/animata/text/counter';
import { Badge } from '@/components/ui/badge';
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
import { Separator } from '@/components/ui/separator';
import siteMetadata from '@/data/siteMetadata';
import { getBlogShares, getBlogView } from '@/lib/pageView';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
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

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('');
  const [viewCounts, setViewCounts] = useState(new Map());
  const [shareCounts, setShareCounts] = useState(new Map());

  const [openShareMenuSlug, setOpenShareMenuSlug] = useState<string | null>(
    null
  );
  const shareMenuRef = useRef<HTMLDivElement | null>(null);

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
    const fetchCounts = async (slug) => {
      const views = await getBlogView(slug);
      const { total } = await getBlogShares(slug);
      setViewCounts((prev) => new Map(prev).set(slug, views));
      setShareCounts((prev) => new Map(prev).set(slug, total));
    };

    displayPosts.forEach((post) => {
      fetchCounts(post.path);
    });
  }, [displayPosts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target as Node)
      ) {
        setOpenShareMenuSlug(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue('');
  };

  const placeholders = [
    "What's the first rule of Fight Club?",
    'Who is Tyler Durden?',
    'Where is Andrew Laeddis Hiding?',
    'Write a Javascript method to reverse a string',
    'How to assemble your own PC?',
  ];

  return (
    <>
      <div className="divide-y divide-accent-foreground dark:divide-accent">
        <div className="space-y-2 py-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-foreground sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            I primarily cover web development and tech topics, occasionally
            sharing insights into my personal life.
          </p>

          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e) => setSearchValue(e.target.value)}
            onSubmit={onSubmit}
          />
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags, thumbnail } = post;
            const views = viewCounts.get(path) || 0;
            const shares = shareCounts.get(path) || 0;
            return (
              <li key={path} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-5 xl:items-start xl:gap-4 xl:space-y-0">
                  <div className="xl:col-span-2">
                    <Link href={`/${path}`}>
                      <Image
                        src={thumbnail || ''}
                        alt={`${title} thumbnail`}
                        width={1200}
                        height={630}
                        className="mb-4 h-fit w-full rounded-md object-contain"
                      />
                    </Link>
                  </div>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/${path}`} className="text-foreground">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags?.map((tag) => (
                          <Badge key={tag} className="mr-2" variant={'outline'}>
                            <Link
                              href={`/tags/${githubSlugger(tag)}`}
                              className="text-sm font-medium uppercase text-primary hover:brightness-125 dark:hover:brightness-125"
                            >
                              {tag.split(' ').join('-')}
                            </Link>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      {summary}
                    </div>
                    <div>
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="flex gap-1 text-base font-medium leading-6 text-muted-foreground">
                          <span className="flex items-center justify-center gap-2">
                            <MdInsights className="h-4 w-4" />
                            <span
                              className="flex items-center gap-1.5 text-sm"
                              title="Number of view(s)"
                            >
                              <AnimatedCounter targetValue={views} /> Views
                            </span>
                            <span>・</span>
                            <div className="relative">
                              <IoMdShare className="h-4 w-4" />
                            </div>
                            <span
                              className="flex items-center gap-1.5 text-sm"
                              title="Number of share(s)"
                            >
                              <AnimatedCounter targetValue={shares} /> Shares
                            </span>
                            <span>・</span>
                            <time dateTime={date}>
                              {formatDate(date, siteMetadata.locale)}
                            </time>
                          </span>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </article>
                <Separator />
              </li>
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
