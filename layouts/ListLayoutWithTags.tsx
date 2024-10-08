'use client';

import React, { useEffect, useRef, useState } from 'react';

import tagData from 'app/tag-data.json';
import type { Blog } from 'contentlayer/generated';
import { slug } from 'github-slugger';
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
import { getBlogShares, getBlogView } from '@/lib/pageView';

import PostWithThumbnail from './PostWithThumbnail';
import PostWithoutThumbnail from './PostWithoutThumbnail';

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
            sharing insights into my personal life and finance.
          </p>
          <PlaceholdersAndVanishInput
            placeholders={blogSearchPlaceholders}
            onChange={(e) => setSearchValue(e.target.value)}
            onSubmit={onSubmit}
          />
        </div>
      </div>
      <div className="flex sm:space-x-10">
        <div className="hidden h-full max-h-screen min-w-[195px] max-w-[210px] flex-wrap overflow-auto rounded border pt-5 shadow-md dark:border-gray-700 dark:bg-black sm:flex md:block">
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
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags, thumbnail } = post;
            const views = viewCounts.get(path) || 0;
            const shares = shareCounts.get(path) || 0;

            if (thumbnail) {
              return (
                <PostWithThumbnail
                  key={path}
                  path={path}
                  date={date}
                  title={title}
                  summary={summary || ''}
                  tags={tags}
                  thumbnail={thumbnail}
                  views={views}
                  shares={shares}
                  setOpenShareMenuSlug={setOpenShareMenuSlug}
                  openShareMenuSlug={openShareMenuSlug}
                  ipaddress={ipaddress}
                />
              );
            } else {
              return (
                <PostWithoutThumbnail
                  key={path}
                  path={path}
                  date={date}
                  title={title}
                  summary={summary || ''}
                  tags={tags}
                  views={views}
                  shares={shares}
                  setOpenShareMenuSlug={setOpenShareMenuSlug}
                  openShareMenuSlug={openShareMenuSlug}
                  ipaddress={ipaddress}
                />
              );
            }

            // return (
            //   <li
            //     key={path}
            //     className="group relative mb-3.5 flex transform cursor-pointer flex-wrap border border-gray-200 bg-opacity-50 p-px py-px transition-transform duration-300 hover:scale-105 hover:border-0 dark:border-gray-700 dark:bg-opacity-50 dark:hover:border-0"
            //   >
            //     <div className="absolute bottom-0 left-0 h-[0.5px] w-full origin-left scale-x-0 transform bg-primary-500 transition-transform duration-300 group-hover:scale-x-100" />
            //     <div className="absolute bottom-0 left-0 h-full w-[0.5px] origin-bottom scale-y-0 transform bg-primary-500 transition-transform duration-300 group-hover:scale-y-100" />
            //     <div className="absolute left-0 top-0 h-[0.5px] w-full origin-right scale-x-0 transform bg-primary-500 transition-transform duration-300 group-hover:scale-x-100" />
            //     <div className="absolute bottom-0 right-0 h-full w-[0.5px] origin-top scale-y-0 transform bg-primary-500 transition-transform duration-300 group-hover:scale-y-100" />
            //     <article className="flex space-x-4 px-0">
            //       {thumbnail && ( //instead of doing this i am seperating the code in two different components
            //         <div className="flex-shrink-0 p-0.5 sm:w-[100px] md:w-[200px]">
            //           <Image
            //             src={thumbnail}
            //             alt={`${title} thumbnail`}
            //             width={300}
            //             height={200}
            //             className="h-40 w-60 rounded-md object-cover"
            //           />
            //         </div>
            //       )}
            //       <div className="flex flex-col justify-between pl-2">
            //         <div>
            //           <h2 className="text-2xl font-bold leading-8 tracking-tight">
            //             <Link
            //               href={`/${path}`}
            //               className="text-gray-900 dark:text-gray-100"
            //             >
            //               {title}
            //             </Link>
            //           </h2>
            //           <div className="mt-2 flex flex-wrap">
            //             {tags?.map((tag) => <Tag key={tag} text={tag} />)}
            //           </div>
            //           <div className="prose mt-2 max-w-none text-gray-500 dark:text-gray-400">
            //             {summary}
            //           </div>
            //         </div>
            //         <div className="mt-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
            //           <dl className="flex items-center">
            //             <dt className="sr-only">Published on</dt>
            //             <dd className="flex items-center text-sm leading-6">
            //               <time
            //                 dateTime={date}
            //                 suppressHydrationWarning
            //                 className="flex items-center"
            //               >
            //                 <MdOutlineAccessTime className="mr-1 h-4 w-4" />
            //                 {formatDate(date, siteMetadata.locale)}
            //                 {` (${timeAgoText})`}
            //               </time>
            //             </dd>
            //           </dl>
            //           <span>&middot;</span>
            //           <div className="flex items-center">
            //             <MdInsights className="mr-1 h-4 w-4" />
            //             <span className="flex items-center gap-1.5 text-sm">
            //               <AnimatedCounter targetValue={views} /> Views
            //             </span>
            //           </div>
            //           <span>&middot;</span>
            //           <div className="relative flex items-center">
            //             <IoMdShare
            //               className="mr-1 h-4 w-4 cursor-pointer"
            //               onClick={() =>
            //                 setOpenShareMenuSlug(
            //                   openShareMenuSlug === path ? null : path
            //                 )
            //               }
            //             />
            //             {openShareMenuSlug === path && (
            //               <div ref={shareMenuRef}>
            //                 <ShareButton
            //                   ip={ipaddress}
            //                   slug={path}
            //                   url={`${process.env.NEXT_PUBLIC_URL}/${path}`}
            //                   onShareComplete={() => setOpenShareMenuSlug(null)}
            //                 />
            //               </div>
            //             )}
            //             <span
            //               className="flex items-center gap-1.5 text-sm"
            //               title="Number of share(s)"
            //             >
            //               <AnimatedCounter targetValue={shares} /> Shares
            //             </span>
            //           </div>
            //         </div>
            //       </div>
            //     </article>
            //   </li>
            // );
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
