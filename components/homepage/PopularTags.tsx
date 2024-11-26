import BrandIcon from '@/components/BrandIcon';
import Link from '@/components/Link';
import { Twemoji } from '@/components/Twemoji';
import { MAX_TAGS_IN_HOME } from '@/constants/index';
import { getAllTags } from '@/lib/tags';

const PopularTags = async () => {
  const popularTags = await getAllTags();

  const limitedTags = popularTags.slice(0, MAX_TAGS_IN_HOME);

  return (
    <div className="w-full">
      <div className="space-y-2 py-1 md:space-y-5">
        <h1 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-2xl md:text-3xl lg:text-4xl">
          Popular Tags <Twemoji size="md" hexcode="1f680" />
        </h1>
        <p className="!mt-2 text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base lg:text-lg">
          Popular tags feature the most widely discussed topics.
        </p>
      </div>
      <div className="popular-tags grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
        {limitedTags.map(({ slug, icon_type, href, title }) => (
          <Link
            key={slug}
            href={href}
            className={`${slug} flex items-center justify-center space-x-2 rounded-lg p-2 sm:p-3`}
          >
            <BrandIcon
              type={icon_type}
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
