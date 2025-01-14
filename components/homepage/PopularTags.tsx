import Link from '@/components/Link';
import Twemoji from '@/components/Twemoji';
import IconsBundle from '@/components/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { MAX_TAGS_IN_HOME } from '@/constants/index';
import { getAllTags } from '@/lib/tags';

export default async function PopularTags() {
  const popularTags = await getAllTags();
  const limitedTags = popularTags.slice(0, MAX_TAGS_IN_HOME);

  return (
    <>
      <div className="space-y-2 py-1 md:space-y-5">
        <h1 className="text-xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 sm:text-2xl md:text-3xl lg:text-4xl">
          Popular Tags <Twemoji name="popular-tags" size="sd" />
        </h1>
        <p className="!mt-2 text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base lg:text-lg">
          Popular tags feature the most widely discussed topics.
        </p>
      </div>
      <div className="popular-tags grid grid-cols-2 gap-2 py-4 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
        {limitedTags.length > 0
          ? limitedTags.map(({ slug, icon_type, href, title }) => (
              <Link
                key={slug}
                className={`${slug} group flex h-12 items-center justify-center space-x-2 rounded-lg bg-gray-800 p-2 sm:h-12 sm:p-3`}
                href={href}
                style={{ minWidth: '100px' }}
              >
                <div className="relative flex-shrink-0">
                  <IconsBundle
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    hover={false}
                    iconColor="white"
                    iconType="icon"
                    kind={icon_type}
                    size={6}
                  />
                </div>
                <span className="whitespace-nowrap text-xs text-white sm:text-sm md:text-base">
                  {title}
                </span>
              </Link>
            ))
          : Array.from({ length: MAX_TAGS_IN_HOME }).map((_, idx) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={idx}
                className="group flex h-12 items-center justify-center space-x-2 rounded-lg bg-gray-800 p-2 sm:h-12 sm:p-3"
                style={{ minWidth: '100px' }}
              >
                <Skeleton className="h-6 w-6 sm:h-8 sm:w-8" />
                <Skeleton className="ml-2 h-4 w-16 sm:h-5 sm:w-20" />
              </div>
            ))}
      </div>
    </>
  );
}
