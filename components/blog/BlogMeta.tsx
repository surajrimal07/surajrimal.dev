import Image from 'next/image';

import { formatDate } from 'pliny/utils/formatDate';

import type { BlogMetaProps } from '@/types/index';

import Link from '../Link';
import { Twemoji } from '../Twemoji';
import PageView from '../homepage/PageView';

const BlogMeta = ({ date, authorDetails, readingTime }: BlogMetaProps) => {
  return (
    <dl className="flex items-center gap-2 font-semibold text-gray-500 dark:text-gray-400">
      {authorDetails.map((author) => (
        <li className="flex items-center space-x-2" key={author.name}>
          {author.avatar && (
            <Image
              src={author.avatar}
              width={38}
              height={38}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
          )}
          <div className="flex flex-col whitespace-nowrap text-sm font-medium leading-5">
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
      <span className="mx-2">{` • `}</span>
      <time dateTime={date} className="flex items-center">
        <Twemoji emoji="calendar" size="1" />
        <span className="ml-1 md:ml-2">{formatDate(date)}</span>
      </time>
      <span className="mx-2">{` • `}</span>
      <div className="flex items-center">
        <Twemoji emoji="hourglass-not-done" size="1" />
        <span className="ml-1.5 md:ml-2">
          {Math.ceil(readingTime.minutes)} mins read
        </span>
      </div>
      <span className="mx-2">{` • `}</span>
      <div className="flex items-center">
        <Twemoji emoji="eye" size="1" />
      </div>
      <PageView />
    </dl>
  );
};

export default BlogMeta;
