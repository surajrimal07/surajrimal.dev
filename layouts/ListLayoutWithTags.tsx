/* eslint-disable jsx-a11y/anchor-is-valid */
'use client';

import Link from '@/components/Link';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import tagData from 'app/tag-data.json';
import type { Blog } from 'contentlayer/generated';
import { motion } from 'framer-motion';
import { slug } from 'github-slugger';
import { LuArrowRightCircle } from 'react-icons/lu';

import AnimatedCounter from '@/components/animata/text/counter';
import { getBlogShares, getBlogView } from '@/lib/pageView';
import { usePathname } from 'next/navigation';
import { CoreContent } from 'pliny/utils/contentlayer';
import { formatDate } from 'pliny/utils/formatDate';
import { useEffect, useState } from 'react';
import { IoMdShare } from 'react-icons/io';
import { MdInsights } from 'react-icons/md';

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

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const basePath = pathname.split('/')[1];
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`} rel="prev">
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
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

export default function ListLayoutWithTags({ posts, title, initialDisplayPosts = [], pagination }: ListLayoutProps) {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState('');
  const [viewCounts, setViewCounts] = useState(new Map());
  const [shareCounts, setShareCounts] = useState(new Map());

  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  const displayPosts = initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts;

  useEffect(() => {
    const fetchCounts = async (slug) => {
      const views = await getBlogView(slug);
      const shares = await getBlogShares(slug);
      setViewCounts((prev) => new Map(prev).set(slug, views));
      setShareCounts((prev) => new Map(prev).set(slug, shares));
    };

    displayPosts.forEach((post) => {
      fetchCounts(post.path);
    });
  }, [displayPosts]);

  // const handleShareClick = async (slug) => {
  //   const updatedShares = await updateBlogShares(slug);
  //   setShareCounts((prev) => new Map(prev).set(slug, updatedShares));
  // };

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            I primarily cover web development and tech topics, occasionally sharing insights into my personal life.
          </p>
          <div className="relative max-w-prose mx-auto">
            <label>
              <span className="sr-only">Search articles</span>
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
            </label>
            <motion.svg
              className="absolute right-3 top-2 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              whileHover={{ scale: 1.2, stroke: '#ef4444', transition: { duration: 0.2 } }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </motion.svg>
          </div>
        </div>
      </div>
      <div className="flex sm:space-x-24">
        <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
          <div className="px-6 py-4">
            {pathname.startsWith('/blog') ? (
              <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
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
                        className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
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
              <li key={path} className="py-5">
                <article className="flex flex-col space-y-2 xl:space-y-0">
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
                      <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                        {title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap mt-2">{tags?.map((tag) => <Tag key={tag} text={tag} />)}</div>
                    <div className="mt-2 prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>

                    <div className="mt-2 text-slate-400 dark:text-slate-400 flex items-center gap-2">
                      <MdInsights className="h-4 w-4" />
                      <span className="flex items-center gap-1.5" title="Number of view(s)">
                        <AnimatedCounter targetValue={views} /> Views
                      </span>
                      <span>&middot;</span>
                      <IoMdShare className="h-4 w-4" />
                      <span className="flex items-center gap-1.5" title="Number of share(s)">
                        <AnimatedCounter targetValue={shares} /> Shares
                      </span>
                    </div>
                    <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                      <div
                        className={
                          'mt-1 text-primary hover:text-red-400 dark:hover:text-red-400 flex items-center gap-1 text-sm font-semibold'
                        }
                      >
                        Read more <LuArrowRightCircle className="h-3 w-3" />
                      </div>
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </>
  );
}
