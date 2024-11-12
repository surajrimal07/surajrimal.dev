import { headers } from 'next/headers';
import { ReactNode } from 'react';

import type { Authors, Blog, Snippets } from 'contentlayer/generated';
import { Toc } from 'pliny/mdx-plugins';
import { CoreContent } from 'pliny/utils/contentlayer';

import Image from '@/components/Image';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import TOCInline from '@/components/TOCInline';
import WalineComment from '@/components/WalineComment';
import BlogMeta from '@/components/blog/BlogMeta';
import BlogTags from '@/components/blog/BlogTags';
import Reactions from '@/components/blog/PageReactions';

export interface BlogPostProps {
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
}: BlogPostProps) {
  const { slug, date, title, tags, readingTime, thumbnail } = content;
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || '121.0.0.1';
  const slugNormalized = `blog/${slug}`;

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
            <div className="space-y-4">
              <PageTitle>{title}</PageTitle>
              <BlogTags tags={tags} />
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <BlogMeta
                    authorDetails={authorDetails}
                    date={date}
                    slug={slugNormalized}
                    readingTime={readingTime}
                    language={content.language || 'English'}
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
                <div className="toc -mt-8 ml-16">
                  <TOCInline toc={toc} />
                </div>
              )}
              {children}
            </div>
          </div>
          <div className="sticky bottom-4 z-10 mb-2 w-full max-w-md transform border-none outline-none lg:sticky lg:bottom-4 lg:left-1/2 lg:w-auto lg:-translate-x-1/2">
            <Reactions slug={slugNormalized} ip={ip} />
          </div>

          <div
            className="max-w-full pb-4 pt-2 text-center text-gray-700 dark:text-gray-300"
            id="comment"
          >
            <WalineComment
              serverURL={process.env.NEXT_PUBLIC_COMMENT_SERVER_URL!}
            />
          </div>

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
