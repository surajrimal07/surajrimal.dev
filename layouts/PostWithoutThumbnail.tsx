import React from 'react';

import clsx from 'clsx';
import { formatDate } from 'pliny/utils/formatDate';
import { FaFire } from 'react-icons/fa6';
import { IoMdShare } from 'react-icons/io';

import Link from '@/components/Link';
import Tag from '@/components/Tag';
import AnimatedCounter from '@/components/animata/text/counter';
import { CalendarIcon, LanguageIcon } from '@/components/social-icons/icons';
import siteMetadata from '@/data/siteMetadata';

interface PostWithoutThumbnailProps {
  path: string;
  date: string;
  title: string;
  summary: string;
  language: string;
  tags: string[];
  views: number;
  shares: number;
  setOpenShareMenuSlug: (slug: string | null) => void;
  openShareMenuSlug: string | null;
  ipaddress: string;
}

export const PostWithoutThumbnail: React.FC<PostWithoutThumbnailProps> = ({
  path,
  date,
  title,
  summary,
  tags,
  language,
  views,
  shares,
}) => {
  return (
    <li className="group relative mb-3.5 transform cursor-pointer rounded-lg border border-gray-200 bg-opacity-50 p-3 hover:bg-zinc-200/50 dark:border-gray-700 dark:hover:bg-zinc-900/50">
      <article>
        <div>
          <h2 className="text-xl font-bold leading-8 tracking-tight sm:text-2xl">
            <Link
              href={`/${path}`}
              className="text-gray-900 dark:text-gray-100"
            >
              {title}
            </Link>
          </h2>
          <div className="mt-2 flex flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
          <div className="prose mt-3 max-w-none text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            {summary}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          <div className="flex items-center">
            <CalendarIcon className={clsx('mr-1 h-3 w-3 sm:h-4 sm:w-4')} />
            <time dateTime={date} suppressHydrationWarning>
              {formatDate(date, siteMetadata.locale)}
            </time>
          </div>
          <span>&middot;</span>
          <div className="flex items-center">
            <LanguageIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="ml-1">{language}</span>
          </div>
          <span>&middot;</span>
          <div className="flex items-center">
            <FaFire className="mr-1 h-3 w-3" />
            <span className="flex items-center gap-1">
              <AnimatedCounter targetValue={views} />
              <span className="hidden sm:inline">Views</span>
            </span>
          </div>

          <span>&middot;</span>
          <div className="relative flex items-center">
            <IoMdShare className="mr-1 h-3 w-3" />
            <span
              className="flex items-center gap-1"
              title="Number of share(s)"
            >
              <AnimatedCounter targetValue={shares} />
              <span className="hidden sm:inline">Shares</span>
            </span>
          </div>
        </div>
      </article>
    </li>
  );
};

export default PostWithoutThumbnail;
