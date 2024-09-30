import Link from '@/components/Link';
import { Twemoji } from '@/components/Twemoji';
import popularTags from '@/data/popularTags';

import BrandIcon from '../BrandIcon';

const PopularTags = () => {
  return (
    <>
      <div className="space-y-2 py-1 md:space-y-5">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Popular Tags <Twemoji size="twa-xs" emoji="rocket" />
        </h1>
        <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
          Popular tags feature the most widely discussed topics.
        </p>
      </div>
      <div className="popular-tags grid grid-cols-3 gap-4 py-4 xl:grid-cols-6">
        {popularTags.map((popularTag) => {
          const { slug, iconType, href, title } = popularTag;

          const className = `${slug} flex w-[128px] justify-center space-x-2 rounded-lg p-3`;

          return (
            <Link key={slug} href={href} className={className}>
              <BrandIcon type={iconType} className="h-6 w-6" />
              <div className="my-auto text-white">{title}</div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default PopularTags;
