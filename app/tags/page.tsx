import { genPageMetadata } from 'app/seo';
import tagData from 'app/tag-data.json';
import { slug } from 'github-slugger';

import Link from '@/components/Link';
import Tag from '@/components/Tag';

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Things I blog about',
});

export default async function Page() {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mb-2 mr-5 mt-2">
                <Tag count={tagCounts[t]} text={t} />
                <Link
                  aria-label={`View posts tagged ${t}`}
                  href={`/tags/${slug(t)}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
