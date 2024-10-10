import Image from 'next/image';

import { ReaderIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { formatDate } from 'pliny/utils/formatDate';
import { IoMdShare } from 'react-icons/io';
import { MdInsights } from 'react-icons/md';

import { getBlogShares } from '@/lib/pageView';
import type { BlogMetaProps } from '@/types/index';
import { timeAgo } from '@/utils/timeAgo';

import Link from '../Link';
import AnimatedCounter from '../animata/text/counter';
import PageView from '../homepage/PageView';
import { CalendarIcon, LanguageIcon } from '../social-icons/icons';

const BlogMeta = async ({
  date,
  authorDetails,
  readingTime,
  slug,
  language,
}: BlogMetaProps) => {
  const timeAgoText = timeAgo(new Date(date));
  const { total } = await getBlogShares(slug);

  return (
    <div className="flex">
      <div className="mr-8">
        {authorDetails.map((author) => (
          <div className="flex items-center space-x-2" key={author.name}>
            {author.avatar && (
              <Image
                src={author.avatar}
                width={38}
                height={38}
                alt={`${author.name}'s avatar`}
                className="h-10 w-10 rounded-full"
              />
            )}
            <div className="flex flex-col text-sm font-medium md:text-base">
              <span>{author.name}</span>
              {author.twitter && (
                <Link
                  href={author.twitter}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {author.twitter
                    .replace('https://twitter.com/', '@')
                    .replace('https://x.com/', '@')}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex h-[40px] flex-col justify-around">
        <div className="flex items-center space-x-16">
          <div className="flex items-center">
            <CalendarIcon className={clsx('h-4 w-4 sm:h-5 sm:w-5')} />
            <time dateTime={date} className="ml-2 whitespace-nowrap">
              {formatDate(date)}
            </time>
            <span className="ml-1">{`(${timeAgoText})`}</span>
          </div>

          <div className="flex items-center">
            <ReaderIcon className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
            <AnimatedCounter targetValue={Math.ceil(readingTime.minutes)} />
            <span className="ml-1.5 whitespace-nowrap">mins read</span>
          </div>

          <div className="flex items-center">
            <LanguageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="ml-1.5">{language}</span>
          </div>
        </div>

        <div className="flex items-center space-x-64">
          <div className="flex items-center">
            <MdInsights className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="ml-1.5">
              <PageView />
            </span>
          </div>

          <div className="flex items-center">
            <IoMdShare className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
            <AnimatedCounter targetValue={total} />
            <span className="ml-1.5">Shares</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogMeta;
