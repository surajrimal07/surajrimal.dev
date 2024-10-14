import React from 'react';

import clsx from 'clsx';
import { formatDate } from 'pliny/utils/formatDate';
import { FaFire } from 'react-icons/fa6';
import { IoMdShare } from 'react-icons/io';

import Image from '@/components/Image';
import Link from '@/components/Link';
import Tag from '@/components/Tag';
import AnimatedCounter from '@/components/animata/text/counter';
import ShareButton from '@/components/blog/ShareButton';
import { CalendarIcon, LanguageIcon } from '@/components/social-icons/icons';
import siteMetadata from '@/data/siteMetadata';

interface PostWithThumbnailProps {
  path: string;
  date: string;
  title: string;
  summary: string;
  tags: string[];
  thumbnail: string;
  language;
  views: number;
  shares: number;
  setOpenShareMenuSlug: (slug: string | null) => void;
  openShareMenuSlug: string | null;
  ipaddress: string;
}

export const PostWithThumbnail: React.FC<PostWithThumbnailProps> = ({
  path,
  date,
  title,
  summary,
  tags,
  language,
  thumbnail,
  views,
  shares,
  setOpenShareMenuSlug,
  openShareMenuSlug,
  ipaddress,
}) => {
  return (
    <li className="group relative mb-3.5 flex transform cursor-pointer flex-wrap rounded-lg border border-gray-200 p-px py-px hover:bg-zinc-200/50 dark:border-gray-700 dark:hover:bg-zinc-900/50">
      <article className="flex flex-col space-x-2 px-0 sm:flex-row">
        <div className="flex-shrink-0 p-0.5 sm:w-[100px] md:w-[200px]">
          <Image
            src={thumbnail}
            alt={`${title} thumbnail`}
            width={200}
            height={200}
            className="h-40 w-full rounded-md object-cover sm:order-1"
          />
        </div>
        <div className="ml-0 flex flex-col justify-start">
          <h2 className="text-2xl font-bold leading-8 tracking-tight">
            <Link
              href={`/${path}`}
              className="text-gray-900 dark:text-gray-100"
            >
              {title}
            </Link>
          </h2>
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
          <div className="prose mt-1 max-w-none text-gray-500 dark:text-gray-400">
            {summary}
          </div>

          <div className="mt-1 flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <dl className="flex items-center">
              <dt className="sr-only">Published on</dt>
              <dd className="flex items-center text-sm leading-6">
                <time
                  dateTime={date}
                  suppressHydrationWarning
                  className="flex items-center"
                >
                  <CalendarIcon className={clsx('mr-1 h-4 w-4')} />
                  {formatDate(date, siteMetadata.locale)}
                </time>
              </dd>
            </dl>
            <span>&middot;</span>
            <div className="flex items-center">
              <LanguageIcon className="h-4 w-4" />
              <span className="ml-1">{language}</span>
            </div>
            <span>&middot;</span>
            <div className="flex items-center">
              <FaFire className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="flex items-center gap-1.5 text-sm">
                <AnimatedCounter targetValue={views} /> Views
              </span>
            </div>
            <span>&middot;</span>
            <div className="relative flex items-center">
              <IoMdShare
                className="mr-1 h-4 w-4 cursor-pointer"
                onClick={() =>
                  setOpenShareMenuSlug(openShareMenuSlug === path ? null : path)
                }
              />
              {openShareMenuSlug === path && (
                <ShareButton
                  ip={ipaddress}
                  slug={path}
                  url={`${process.env.NEXT_PUBLIC_URL}/${path}`}
                  onShareComplete={() => setOpenShareMenuSlug(null)}
                />
              )}
              <span
                className="flex items-center gap-1.5 text-sm"
                title="Number of share(s)"
              >
                <AnimatedCounter targetValue={shares} /> Shares
              </span>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

export default PostWithThumbnail;
