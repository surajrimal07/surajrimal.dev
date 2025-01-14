import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import Tag from '@/components/Tag';
import type { Paper } from 'contentlayer/generated';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { ReactNode } from 'react';

interface PaperLayoutProps {
  content: CoreContent<Paper>;
  children: ReactNode;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export default function PaperLayout({
  content,
  next,
  prev,
  children,
}: PaperLayoutProps) {
  const {
    title,
    paperauthors,
    year,
    conference,
    doi,
    readingDate,
    tags,
    summary,
  } = content;

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Reading Date</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={readingDate}>
                      Read on {new Date(readingDate).toLocaleDateString()}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="flex justify-center gap-5">
                <span className="text-gray-500 dark:text-gray-400">
                  {conference} {year}
                </span>
                {doi && (
                  <Link
                    href={`https://doi.org/${doi}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    DOI: {doi}
                  </Link>
                )}
              </div>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              )}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Authors
                </h3>
                <div className="mt-1 flex flex-wrap justify-center gap-2">
                  {paperauthors.map((author) => (
                    <span
                      key={author}
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      {author}
                    </span>
                  ))}
                </div>
              </div>
              {summary && (
                <div className="mt-4 prose dark:prose-invert">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Summary
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {summary}
                  </p>
                </div>
              )}
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
                {children}
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
            {prev && (
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/papers/${prev.path}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; {prev.title}
                </Link>
              </div>
            )}
            {next && (
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/papers/${next.path}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {next.title} &rarr;
                </Link>
              </div>
            )}
          </div>
        </footer>
      </article>
    </SectionContainer>
  );
}
