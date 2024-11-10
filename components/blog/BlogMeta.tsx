import Image from 'next/image';

import { FaFire, FaRegHourglassHalf } from 'react-icons/fa6';
import { IoMdShare } from 'react-icons/io';

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
  const { total } = await getBlogShares(`/${slug}`);

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
      <div className="flex items-center space-x-2">
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
                  className="text-xs text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
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

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base">
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="ml-1">{timeAgoText}</span>
        </div>

        <div className="flex items-center">
          <FaRegHourglassHalf className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
          <AnimatedCounter targetValue={Math.ceil(readingTime.minutes)} />
          <span className="ml-1">Min</span>
        </div>

        <div className="flex items-center">
          <LanguageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="ml-1.5">{language}</span>
        </div>

        <div className="flex items-center">
          <FaFire className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="ml-1.5">
            <PageView hideViewsInSmallDevice={true} shouldIncrement={false} />
          </span>
        </div>

        <div className="flex items-center">
          <IoMdShare className="h-4 w-4 sm:h-5 sm:w-5" />
          <AnimatedCounter targetValue={total} />
          <span className="ml-1.5 hidden sm:inline">Shares</span>
        </div>
      </div>
    </div>
  );
};

export default BlogMeta;
