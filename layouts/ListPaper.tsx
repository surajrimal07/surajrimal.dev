import Link from '@/components/Link';
import type { Paper } from 'contentlayer/generated';
import type { CoreContent } from 'pliny/utils/contentlayer';

interface PapersListLayoutProps {
  papers: CoreContent<Paper>[];
  title: string;
  description?: string;
}

export default function PapersListLayout({
  papers,
  title,
  description,
}: PapersListLayoutProps) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          {description && (
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 pt-8">
          {papers.map((paper) => (
            <Link
              key={paper.title}
              href={`/papers/${paper.slug}`}
              className="bg-gray-900 dark:bg-gray-800 rounded-lg overflow-hidden hover:opacity-75 transition-opacity duration-200"
            >
              {paper.thumbnail && (
                <div className="relative h-48 w-full">
                  <img
                    src={paper.thumbnail}
                    alt={paper.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {paper.category && (
                    <span className="inline-block bg-gray-800 dark:bg-gray-700 rounded px-2 py-1 text-xs text-gray-200">
                      {paper.category}
                    </span>
                  )}
                  {paper.conference && (
                    <span className="inline-block bg-gray-800 dark:bg-gray-700 rounded px-2 py-1 text-xs text-gray-200">
                      {paper.conference}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-white">{paper.title}</h2>

                {paper.summary && (
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {paper.summary}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <span className="inline-block">
                      {paper.paperauthors?.[0]}
                    </span>
                  </div>
                  <time dateTime={paper.year?.toString()}>{paper.year}</time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
