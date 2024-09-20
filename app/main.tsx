import { formatDate } from 'pliny/utils/formatDate';

import siteMetadata from '@/data/siteMetadata';

import Divider from '@/components/Divider';
import Avatar from '@/components/homepage/Avatar';
import BlogLinks from '@/components/homepage/BlogLinks';
import GithubContributions from '@/components/homepage/GithubContributions';
import Greeting from '@/components/homepage/Greeting';
import Heading from '@/components/homepage/Heading';
import PopularTags from '@/components/homepage/PopularTags';
import PrivateContributions from '@/components/homepage/PrivateContributions';
import ShortDescription from '@/components/homepage/ShortDescription';
import { Technologies } from '@/components/homepage/Technologies';
import TypedBios from '@/components/homepage/TypedBios';
import Link from '@/components/Link';
import Tag from '@/components/Tag';
import Twemoji from '@/components/Twemoji';
import NewsletterForm from 'pliny/ui/NewsletterForm';

const MAX_DISPLAY = 1;

export default function Home({ posts }) {
  return (
    <div>
      <Greeting />
      <div className="flex flex-col justify-between md:my-4 md:pb-5 xl:flex-row">
        <Avatar />
        <div className="my-auto flex flex-col text-lg leading-8 text-gray-600 dark:text-gray-400">
          <Heading />
          <TypedBios />
          <ShortDescription />
          <BlogLinks />
          <p className="flex">
            <span className="mr-2">Happy reading</span>
            <Twemoji emoji="clinking-beer-mugs" />
          </p>
        </div>
      </div>

      <Divider />
      <PopularTags />
      <Divider />
      <Technologies />
      <Divider marginTop="4" />
      <GithubContributions />
      <Divider marginTop="4" />
      <PrivateContributions />
      <Divider marginTop="4" />
      <div className="space-y-2 py-1 md:space-y-5">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 ">
          Recent Posts
          <Twemoji size="twa-sm" emoji="writing-hand" />
        </h1>
        <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">{siteMetadata.description}</p>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && 'No posts found.'}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { slug, date, title, summary, tags } = post;
          return (
            <li key={slug} className="py-6">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-primary hover:text-red-400 dark:hover:text-red-400"
                        aria-label={`Read "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link href="/blog" className="text-primary hover:text-red-400 dark:hover:text-red-400" aria-label="All posts">
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-2">
          <NewsletterForm />
        </div>
      )}
    </div>
  );
}
