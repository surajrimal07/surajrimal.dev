/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */
'use client';

import { useEffect, useRef, useState } from 'react';

import tagData from 'app/tag-data.json';
import type { Blog } from 'contentlayer/generated';
import { slug } from 'github-slugger';
import { CoreContent } from 'pliny/utils/contentlayer';
import { formatDate } from 'pliny/utils/formatDate';
import { IoMdShare } from 'react-icons/io';
import { MdInsights } from 'react-icons/md';

import Link from '@/components/Link';
import { useCurrentPath } from '@/components/PathProvider';
import Tag from '@/components/Tag';
import AnimatedCounter from '@/components/animata/text/counter';
import ShareButton from '@/components/blog/ShareButton';
import { Separator } from '@/components/ui/cool-separator';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import siteMetadata from '@/data/siteMetadata';
import { getBlogShares, getBlogView } from '@/lib/pageView';

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
  initialDisplayPosts?: CoreContent<Blog>[];
  pagination?: PaginationProps;
  ipaddress: string;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = useCurrentPath();
  const basePath = pathname.split('/')[1];
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1
                ? `/${basePath}/`
                : `/${basePath}/page/${currentPage - 1}`
            }
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  );
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  ipaddress,
}: ListLayoutProps) {
  const pathname = useCurrentPath();
  const [searchValue, setSearchValue] = useState('');
  const [viewCounts, setViewCounts] = useState(new Map());
  const [shareCounts, setShareCounts] = useState(new Map());
  const [openShareMenuSlug, setOpenShareMenuSlug] = useState<string | null>(
    null
  );
  const shareMenuRef = useRef<HTMLDivElement | null>(null);

  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

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

  const placeholders = [
    "What's the first rule of Fight Club?",
    'Who is Tyler Durden?',
    'Where is Andrew Laeddis Hiding?',
    'Write a Javascript method to reverse a string',
    'How to assemble your own PC?',
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue('');
  };

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
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
          {/* <div className="relative mx-auto max-w-prose">
            <label>
              <span className="sr-only">Search articles</span>
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-red-500 focus:ring-red-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
            </label>
            <motion.svg
              className="absolute right-3 top-2 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              whileHover={{
                scale: 1.2,
                stroke: '#ef4444',
                transition: { duration: 0.2 },
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </motion.svg>
          </div> */}
        </div>
      </div>
      <div className="flex sm:space-x-10">
        <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded border pt-5 shadow-md dark:border-gray-700 dark:bg-black sm:flex">
          <div className="px-10 py-2">
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
              {sortedTags.map((t) => {
                return (
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
                );
              })}
            </ul>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags } = post;
            const views = viewCounts.get(path) || 0;
            const shares = shareCounts.get(path) || 0;

            return (
              <li key={path} className="py-2">
                <article className="flex flex-col space-y-2 px-2 py-2 transition duration-200 hover:scale-105 hover:rounded-xl hover:border hover:border-red-500 dark:hover:border-red-500 xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date} suppressHydrationWarning>
                        {formatDate(date, siteMetadata.locale)}
                      </time>
                    </dd>
                  </dl>
                  <div>
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link
                        href={`/${path}`}
                        className="text-gray-900 dark:text-gray-100"
                      >
                        {title}
                      </Link>
                    </h2>
                    <div className="mt-2 flex flex-wrap">
                      {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                    </div>
                    <div className="prose mt-2 max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-slate-400 dark:text-slate-400">
                      <MdInsights className="h-4 w-4" />
                      <span
                        className="flex items-center gap-1.5 text-sm"
                        title="Number of view(s)"
                      >
                        <AnimatedCounter targetValue={views} /> Views
                      </span>
                      <span>&middot;</span>
                      <div className="relative">
                        <IoMdShare
                          className="h-4 w-4 cursor-pointer"
                          onClick={() =>
                            setOpenShareMenuSlug(
                              openShareMenuSlug === path ? null : path
                            )
                          }
                        />
                        {openShareMenuSlug === path && (
                          <div ref={shareMenuRef}>
                            <ShareButton
                              ip={ipaddress}
                              slug={path}
                              url={process.env.NEXT_PUBLIC_URL + `/${path}`}
                              onShareComplete={() => setOpenShareMenuSlug(null)}
                            />
                          </div>
                        )}
                      </div>
                      <span
                        className="flex items-center gap-1.5 text-sm"
                        title="Number of share(s)"
                      >
                        <AnimatedCounter targetValue={shares} /> Shares
                      </span>
                    </div>
                    {/* <Link
                      href={`/${path}`}
                      className="text-gray-900 dark:text-gray-100"
                    >
                      <div
                        className={
                          'mt-1 flex items-center gap-1 text-sm font-semibold text-primary hover:text-red-400 dark:hover:text-red-400'
                        }
                      >
                        Read more <LuArrowRightCircle className="h-3 w-3" />
                      </div>
                    </Link> */}
                  </div>
                </article>
                <Separator gradient />
              </li>
            );
          })}
        </ul>
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        )}
      </div>
    </>
  );
}
