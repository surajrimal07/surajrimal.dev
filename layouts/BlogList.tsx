import React from 'react';

import clsx from 'clsx';
import { formatDate } from 'pliny/utils/formatDate';
import { FaFire } from 'react-icons/fa6';
import { IoMdShare } from 'react-icons/io';

import Image from '@/components/Image';
import Link from '@/components/Link';
import Tag from '@/components/Tag';
import AnimatedCounter from '@/components/animata/text/counter';
import { CalendarIcon, LanguageIcon } from '@/components/social-icons/icons';
import siteMetadata from '@/data/siteMetadata';
import { PostCardProps } from '@/types/bloglist';

const PostCard: React.FC<PostCardProps> = ({
  path,
  date,
  title,
  highlightTag,
  summary,
  tags,
  language,
  views,
  shares,
  thumbnail,
}) => {
  const hasThumbnail = Boolean(thumbnail);

  return (
    <li
      className={clsx(
        'group relative mb-3.5 transform cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700',
        'hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50',
        hasThumbnail ? 'p-px py-px' : 'p-3'
      )}
    >
      <article
        className={
          hasThumbnail ? 'flex flex-col space-x-2 px-0 sm:flex-row' : undefined
        }
      >
        {hasThumbnail && (
          <div className="flex-shrink-0 p-0.5 sm:w-[100px] md:w-[200px]">
            <Image
              src={thumbnail!}
              alt={`${title} thumbnail`}
              width={200}
              height={200}
              className="h-40 w-full rounded-md object-cover sm:order-1"
            />
          </div>
        )}
        <div
          className={clsx(
            hasThumbnail ? 'ml-0 flex flex-col justify-start' : undefined
          )}
        >
          <h2
            className={clsx(
              'font-bold leading-8 tracking-tight',
              hasThumbnail ? 'text-2xl' : 'text-xl sm:text-2xl'
            )}
          >
            <Link
              href={`/${path}`}
              className="text-gray-900 dark:text-gray-100"
            >
              {title}
            </Link>
          </h2>
          <div className={clsx('flex flex-wrap', !hasThumbnail && 'mt-2')}>
            {tags.map((tag) => (
              <Tag key={tag} text={tag} highlight={tag === highlightTag!} />
            ))}
          </div>
          <div
            className={clsx(
              'prose max-w-none text-gray-500 dark:text-gray-400',
              hasThumbnail ? 'mt-1' : 'mt-3',
              !hasThumbnail && 'text-sm sm:text-base'
            )}
          >
            {summary}
          </div>

          <div
            className={clsx(
              'flex items-center gap-2 text-gray-500 dark:text-gray-400',
              hasThumbnail ? 'mt-1' : 'mt-4',
              !hasThumbnail && 'text-xs sm:text-sm'
            )}
          >
            <div className="flex items-center">
              <CalendarIcon
                className={clsx(
                  'mr-1',
                  hasThumbnail ? 'h-4 w-4' : 'h-3 w-3 sm:h-4 sm:w-4'
                )}
              />
              <time dateTime={date} suppressHydrationWarning>
                {formatDate(date, siteMetadata.locale)}
              </time>
            </div>
            <span>&middot;</span>
            <div className="flex items-center">
              <LanguageIcon
                className={hasThumbnail ? 'h-4 w-4' : 'h-3 w-3 sm:h-4 sm:w-4'}
              />
              <span className="ml-1">{language}</span>
            </div>
            <span>&middot;</span>
            <div className="flex items-center">
              <FaFire
                className={clsx('mr-1', hasThumbnail ? 'h-4 w-4' : 'h-3 w-3')}
              />
              <span className="flex items-center gap-1">
                <AnimatedCounter targetValue={views} />
                <span className={hasThumbnail ? 'inline' : 'hidden sm:inline'}>
                  Views
                </span>
              </span>
            </div>
            <span>&middot;</span>
            <div className="relative flex items-center">
              <IoMdShare
                className={clsx(
                  'mr-1',
                  hasThumbnail ? 'h-4 w-4 cursor-pointer' : 'h-3 w-3'
                )}
              />
              <span
                className="flex items-center gap-1"
                title="Number of share(s)"
              >
                <AnimatedCounter targetValue={shares} />
                <span className={hasThumbnail ? 'inline' : 'hidden sm:inline'}>
                  Shares
                </span>
              </span>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

export default PostCard;
