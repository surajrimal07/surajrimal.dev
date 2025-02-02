import type { Blog } from 'contentlayer/generated';
import type { CoreContent } from 'pliny/utils/contentlayer';
import { formatDate } from 'pliny/utils/formatDate';
import { FaFire } from 'react-icons/fa';
import { IoLanguage } from 'react-icons/io5';
import { PiHourglassLowFill } from 'react-icons/pi';

import Link from '@/components/Link';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import Twemoji from '@/components/Twemoji';
import AnimatedCounter from '@/components/animata/text/counter';
import Avatar from '@/components/homepage/Avatar';
import BlogLinks from '@/components/homepage/BlogLinks';
import GithubContributions from '@/components/homepage/GithubContributions';
import Greeting from '@/components/homepage/Greeting';
import Heading from '@/components/homepage/Heading';
import NewsletterForm from '@/components/homepage/NewsletterForm';
import PopularTags from '@/components/homepage/PopularTags';
import PrivateContributions from '@/components/homepage/PrivateContributions';
import ShortDescription from '@/components/homepage/ShortDescription';
import { Technologies } from '@/components/homepage/Technologies';
import { Separator } from '@/components/ui/cool-separator';
import { MAX_DISPLAY } from '@/constants';
import siteMetadata from '@/data/siteMetadata';
import { getPopularPosts } from '@/lib/pageView';

interface PostWithViews {
  post: CoreContent<Blog>;
  views: number;
}

function BlogPost({ post, views }: PostWithViews) {
  const { slug, date, readingTime, title, summary, language } = post;

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
                    className="text-gray-900 dark:text-gray-100"
                    href={`/blog/${slug}`}
                  >
                    {title}
                  </Link>
                </h2>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {summary}
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <FaFire className="mr-1 h-4 w-4" />
                <AnimatedCounter className="text-sm" targetValue={views} />
              </div>
              <div className="flex items-center">
                <PiHourglassLowFill className="mr-1 h-4 w-4" />
                <AnimatedCounter
                  className="text-sm"
                  targetValue={Math.ceil(readingTime.minutes)}
                />
                <span className="ml-1.5 whitespace-nowrap text-sm">
                  Minutes
                </span>
              </div>
              <div className="flex items-center">
                <IoLanguage className="h-4 w-4" />
                <span className="ml-1.5 text-sm">{language ?? 'English'}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default async function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  const popularSlugs = await getPopularPosts(
    posts.map((post) => post.slug),
    MAX_DISPLAY,
  );

  const popularPosts: PostWithViews[] = posts
    .filter((post) => popularSlugs.some((p) => p.slug === post.slug))
    .map((post) => ({
      post,
      views: popularSlugs.find((p) => p.slug === post.slug)?.views || 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, MAX_DISPLAY);

  return (
    <div>
      <ScrollTopAndComment showScrollToComment={false} />
      <Greeting />

      <div className="mb-2 flex flex-col justify-between md:flex-row md:space-x-8 md:space-y-0">
        <div className="mb-4 mt-4 flex justify-center md:mb-0 md:block">
          <Avatar />
        </div>
        <div className="my-auto flex flex-col text-lg leading-8 text-gray-600 dark:text-gray-400">
          <Heading />
          <ShortDescription />
          <BlogLinks />
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
          Popular Posts
          <Twemoji name="popular-post" size="md" />
        </h1>
        <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
          Here are some of my most popular posts sorted by engagement.
        </p>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!popularPosts.length && <li className="py-6">No posts found.</li>}
        {popularPosts.map((postWithViews) => (
          <BlogPost key={postWithViews.post.slug} {...postWithViews} />
        ))}
      </ul>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            aria-label="All posts"
            className="text-primary hover:text-red-400 dark:hover:text-red-400"
            href="/blog"
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
