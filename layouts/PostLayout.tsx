import { headers } from 'next/headers';

import Image from '@/components/Image';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import TOCInline from '@/components/TOCInline';
import Tag from '@/components/Tag';
import WalineComment from '@/components/WalineComment';
import BlogMeta from '@/components/blog/BlogMeta';
import Reactions from '@/components/blog/PageReactions';
import siteMetadata from '@/data/siteMetadata';
import type { BlogPostProps } from '@/types/bloglist';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default async function PostLayout({
  content,
  authorDetails,
  next,
  toc,
  prev,
  children,
}: BlogPostProps) {
  const { slug, readingTime, date, title, tags } = content;
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || '121.0.0.1';
  const slugNormalized = `blog/${slug}`;

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString(
                      siteMetadata.locale,
                      postDateTemplate,
                    )}
                  </time>
                </dd>
              </dl>
              <PageTitle>{title}</PageTitle>

              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd>
                    <BlogMeta
                      className="flex justify-center"
                      language={content.language || 'English'}
                      readingTime={readingTime}
                      slug={slugNormalized}
                    />
                  </dd>
                </div>
              </dl>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li
                      key={author.name}
                      className="flex items-center space-x-2"
                    >
                      {author.avatar && (
                        <Image
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                          height={38}
                          src={author.avatar}
                          width={38}
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {author.name}
                        </dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              href={author.twitter}
                            >
                              {author.twitter
                                .replace('https://twitter.com/', '@')
                                .replace('https://x.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-6 dark:prose-invert">
                {toc && (
                  <div className="toc -ml-16 -mt-8">
                    <TOCInline toc={toc} />
                  </div>
                )}
                {children}
              </div>
              <div className="sticky bottom-4 z-10 mb-2 w-full max-w-md transform border-none outline-none lg:sticky lg:bottom-4 lg:left-1/2 lg:w-auto lg:-translate-x-1/4">
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
            </div>

            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-2 xl:py-4">
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev?.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next?.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-1 xl:pt-4">
                <Link
                  aria-label="Back to the blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  href="/blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
