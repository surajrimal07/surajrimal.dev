import { ReactNode } from 'react';

import type { Authors, Blog, Snippets } from 'contentlayer/generated';
import { Toc } from 'pliny/mdx-plugins';
import { CoreContent } from 'pliny/utils/contentlayer';

import Comments from '@/components/Comments';
import Image from '@/components/Image';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import TOCInline from '@/components/TOCInline';
import BlogMeta from '@/components/blog/BlogMeta';
import BlogTags from '@/components/blog/BlogTags';
import siteMetadata from '@/data/siteMetadata';

interface LayoutProps {
  content: CoreContent<Blog> | CoreContent<Snippets>;
  authorDetails: CoreContent<Authors>[];
  children: ReactNode;
  toc?: Toc;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  toc,
  prev,
  children,
}: LayoutProps) {
  const { slug, date, title, tags, readingTime, thumbnail } = content;

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <header>
          <div className="dark:border-gray space-y-1 border-b border-gray-400 pb-5">
            {thumbnail && (
              <div className="relative -mx-6 mt-6 md:-mx-8">
                <Image
                  src={thumbnail}
                  alt={title}
                  width={784}
                  height={410}
                  className="rounded-md"
                  priority
                />
              </div>
            )}
            <div className="space-y-6">
              <PageTitle>{title}</PageTitle>
              <BlogTags tags={tags} />
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <BlogMeta
                    authorDetails={authorDetails}
                    date={date}
                    slug={slug}
                    readingTime={readingTime}
                  />
                </div>
              </dl>
            </div>
          </div>
        </header>

        <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose max-w-none pb-8 pt-0 dark:prose-invert">
              {toc && (
                <div className="toc -mt-8">
                  <TOCInline toc={toc} />
                </div>
              )}
              {children}
            </div>
          </div>

          {/* Comments section */}
          {siteMetadata.comments && (
            <div
              className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
              id="comment"
            >
              <Comments slug={slug} />
            </div>
          )}

          {/* Footer with navigation links */}
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  );
}
