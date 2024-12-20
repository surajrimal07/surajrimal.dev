import { headers } from 'next/headers';

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
import type { BlogPostProps } from '@/types/bloglist';

export default async function PostLayout({
  content,
  authorDetails,
  next,
  toc,
  prev,
  children,
}: BlogPostProps) {
  const { slug, date, title, tags, readingTime, thumbnail } = content;
  const headersList = await headers();
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
                  priority
                  alt={title}
                  className="rounded-md"
                  height={410}
                  src={thumbnail}
                  width={784}
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
                    language={content.language || 'English'}
                    readingTime={readingTime}
                    slug={slugNormalized}
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
            <Reactions ip={ip} slug={slugNormalized} />
          </div>

          <div
            className="max-w-full pb-4 pt-2 text-center text-gray-700 dark:text-gray-300"
            id="comment"
          >
            <WalineComment
              // biome-ignore lint/style/noNonNullAssertion: <explanation>
              serverURL={process.env.NEXT_PUBLIC_COMMENT_SERVER_URL!}
            />
          </div>

          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    aria-label={`Previous post: ${prev.title}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    href={`/${prev.path}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    aria-label={`Next post: ${next.title}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    href={`/${next.path}`}
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
