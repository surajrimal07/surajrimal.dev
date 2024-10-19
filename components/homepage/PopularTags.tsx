import BrandIcon from '@/components/BrandIcon';
import Link from '@/components/Link';
import { Twemoji } from '@/components/Twemoji';
import popularTags from '@/data/popularTags';

const PopularTags = () => {
  return (
    <div className="w-full">
      <div className="space-y-2 py-1 md:space-y-5">
        <h1 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-2xl md:text-3xl lg:text-4xl">
          Popular Tags <Twemoji size="twa-xs" emoji="rocket" />
        </h1>
        <p className="!mt-2 text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base lg:text-lg">
          Popular tags feature the most widely discussed topics.
        </p>
      </div>
      <div className="popular-tags grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
        {popularTags.map(({ slug, iconType, href, title }) => (
          <Link
            key={slug}
            href={href}
            className={`${slug} flex items-center justify-center space-x-2 rounded-lg p-2 sm:p-3`}
          >
            <BrandIcon
              type={iconType}
              className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
            />
            <span className="text-xs text-white sm:text-sm md:text-base">
              {title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
