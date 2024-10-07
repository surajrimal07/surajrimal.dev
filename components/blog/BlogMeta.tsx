import Image from 'next/image';

import { formatDate } from 'pliny/utils/formatDate';

import type { BlogMetaProps } from '@/types/index';
import { timeAgo } from '@/utils/timeAgo';

import Link from '../Link';
import { Twemoji } from '../Twemoji';
import PageView from '../homepage/PageView';

const BlogMeta = ({ date, authorDetails, readingTime }: BlogMetaProps) => {
  const timeAgoText = timeAgo(new Date(date));

  return (
    <ul className="lg:text-md flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 md:text-base xl:text-lg">
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
          <div className="lg:text-md flex flex-col text-sm font-medium leading-5 md:text-base xl:text-lg">
            <span className="text-gray-900 dark:text-gray-100">
              {author.name}
            </span>
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

      <span className="mx-2 hidden sm:block">{` • `}</span>

      <li className="flex items-center">
        <Twemoji emoji="calendar" size="1" />
        <time dateTime={date} className="ml-1 whitespace-nowrap md:ml-2">
          {formatDate(date)}
        </time>
        <span className="ml-1 md:ml-2">{`(${timeAgoText})`}</span>
      </li>

      <span className="mx-2 hidden sm:block">{` • `}</span>

      <li className="flex items-center">
        <Twemoji emoji="hourglass-not-done" size="1" />
        <span className="ml-1.5 whitespace-nowrap md:ml-2">
          {Math.ceil(readingTime.minutes)} mins read
        </span>
      </li>

      <span className="mx-2 hidden sm:block">{` • `}</span>

      <li className="flex items-center">
        <Twemoji emoji="eye" size="1" />
        <span className="ml-1">
          {' '}
          <PageView />
        </span>
      </li>
    </ul>
  );
};

export default BlogMeta;
