import NewsletterForm from 'pliny/ui/NewsletterForm';
import { formatDate } from 'pliny/utils/formatDate';
import { FaRegHourglassHalf } from 'react-icons/fa6';

import Link from '@/components/Link';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import Tag from '@/components/Tag';
import Twemoji from '@/components/Twemoji';
import AnimatedCounter from '@/components/animata/text/counter';
import Avatar from '@/components/homepage/Avatar';
import BlogLinks from '@/components/homepage/BlogLinks';
import GithubContributions from '@/components/homepage/GithubContributions';
import Greeting from '@/components/homepage/Greeting';
import Heading from '@/components/homepage/Heading';
import PopularTags from '@/components/homepage/PopularTags';
import PrivateContributions from '@/components/homepage/PrivateContributions';
import ShortDescription from '@/components/homepage/ShortDescription';
import { Technologies } from '@/components/homepage/Technologies';
import { LanguageIcon } from '@/components/social-icons/icons';
import { Separator } from '@/components/ui/cool-separator';
import { MAX_DISPLAY } from '@/constants';
import siteMetadata from '@/data/siteMetadata';
import { timeAgo } from '@/utils/timeAgo';

const renderPost = (post) => {
  const { slug, date, readingTime, title, summary, tags } = post;
  const timeAgoText = timeAgo(new Date(date));
  return (
    <li key={slug} className="py-6">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>
                {formatDate(date, siteMetadata.locale)}
              </time>
            </dd>
          </dl>

          <div className="space-y-1 xl:col-span-3">
            <div className="space-y-2">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link
                    href={`/blog/${slug}`}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </Link>
                </h2>
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {summary}
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <FaRegHourglassHalf className="h-3 w-3" />

                <AnimatedCounter targetValue={Math.ceil(readingTime.minutes)} />
                <span className="ml-1.5 whitespace-nowrap">Min</span>
              </div>
              <div className="flex items-center">
                <LanguageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="ml-1.5">{post.language ?? 'English'}</span>
              </div>
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
};

export default function Home({ posts }) {
  return (
    <div>
      <ScrollTopAndComment showScrollToComment={false} />
      <Greeting />
      <div className="flex flex-col justify-between md:my-4 md:pb-5 xl:flex-row">
        <Avatar />
        <div className="my-auto flex flex-col text-lg leading-8 text-gray-600 dark:text-gray-400">
          <Heading />
          <ShortDescription />
          <BlogLinks />
          <p className="flex">
            <Twemoji emoji="clinking-beer-mugs" /> &nbsp;
            <span className="mr-2">Happy reading</span>
          </p>
        </div>
      </div>

      <Separator gradient />
      <PopularTags />
      <Separator gradient />
      <Technologies />
      <Separator gradient marginTop={15} />
      <GithubContributions />
      <Separator gradient marginTop={15} />
      <PrivateContributions />
      <Separator gradient marginTop={15} />
      <div className="space-y-2 py-1 md:space-y-5">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Recent Posts
          <Twemoji size="twa-sm" emoji="writing-hand" />
        </h1>
        <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
          {siteMetadata.description}
        </p>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && <li className="py-6">No posts found.</li>}
        {posts.slice(0, MAX_DISPLAY).map(renderPost)}
      </ul>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary hover:text-red-400 dark:hover:text-red-400"
            aria-label="All posts"
          >
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
