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
import { CalendarIcon } from '../social-icons/icons';

const BlogMeta = async ({
  date,
  authorDetails,
  readingTime,
  slug,
}: BlogMetaProps) => {
  const timeAgoText = timeAgo(new Date(date));
  const { total } = await getBlogShares(slug);

  return (
    <ul className="lg:text-md flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 md:text-base xl:text-base">
      {authorDetails.map((author) => (
        <li className="flex items-center space-x-2" key={author.name}>
          {author.avatar && (
            <Image
              src={author.avatar}
              width={38}
              height={38}
              alt={`${author.name}'s avatar`}
              className="h-10 w-10 rounded-full"
            />
          )}
          <div className="lg:text-md flex flex-col text-sm font-medium leading-5 md:text-base xl:text-base">
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
        </li>
      ))}

      <span className="mx-1 hidden sm:block">{` • `}</span>

      <li className="flex items-center">
        <CalendarIcon className={clsx('h-4 w-4 sm:h-5 sm:w-5')} />

        <time dateTime={date} className="whitespace-nowrap md:ml-2">
          {formatDate(date)}
        </time>
        <span className="ml-1 md:ml-2">{`(${timeAgoText})`}</span>
      </li>

      <span className="mx-1 hidden sm:block">{` • `}</span>

      <li className="flex items-center">
        <ReaderIcon className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
        <AnimatedCounter targetValue={Math.ceil(readingTime.minutes)} />
        <span className="ml-1.5 whitespace-nowrap md:ml-2">mins read</span>
      </li>

      <span className="mx-1 hidden sm:block">{` • `}</span>

      <li className="flex items-center">
        <MdInsights className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="ml-1.5">
          <PageView />
        </span>
      </li>

      <span className="mx-1 hidden sm:block">{` • `}</span>

      <li className="flex items-center">
        <IoMdShare className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
        <AnimatedCounter targetValue={total} />
        <span className="ml-1.5 whitespace-nowrap md:ml-2">Shares</span>
      </li>
    </ul>
  );
};

export default BlogMeta;
